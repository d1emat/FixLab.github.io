const fs = require('fs');
const path = 'C:/Users/dmateo/Downloads/FixLab Web-20260429T063734Z-3-001/script.js';

let content = fs.readFileSync(path, 'utf8');

// Fix 1: Fix the updateOne line that has extra spaces before closing
// Find lines with updateOne and fix them
const lines = content.split('\n');
const result = [];

for (let i = 0; i < lines.length; i++) {
  let line = lines[i];
  
  // Fix updateOne lines with extra spaces before closing
  if (line.includes('FixLabDB.updateOne(') && line.includes('password)') && !line.trim().endsWith(');')) {
    // Replace the malformed ending with proper ending
    line = line.replace(/\}\s*$/, '});');
  }
  
  // Fix window.FixLabDB line with extra );
  if (line.includes('window.FixLabDB = FixLabDB;);')) {
    line = line.replace(');', ';');
  }
  
  result.push(line);
}

content = result.join('\n');

// Fix 2: Fix the if-else structure
// Find the pattern where we have:
//   } (closing if block)
//   // Hacer FixLabDB accesible globalmente
//   window.FixLabDB = FixLabDB;
//   } else {
// And replace with:
//   } (closing if block)
//   } (closing else block)
// } else {

const lines2 = content.split('\n');
const result2 = [];
let skipNext = 0;

for (let i = 0; i < lines2.length; i++) {
  if (skipNext > 0) {
    skipNext--;
    continue;
  }
  
  const line = lines2[i];
  
  // Check if this is the problematic pattern
  if (line.trim() === '}' && 
      i + 3 < lines2.length &&
      lines2[i+1].includes('// Hacer FixLabDB') &&
      lines2[i+2].includes('window.FixLabDB = FixLabDB;') &&
      lines2[i+3].trim() === '} else {') {
    // This is the problematic pattern
    result2.push(line); // Keep the }
    result2.push('  }'); // Add closing for if block
    // Skip the next 3 lines (comment, window.FixLabDB, and } else {)
    skipNext = 3;
    continue;
  }
  
  result2.push(line);
}

content = result2.join('\n');

fs.writeFileSync(path, content);
console.log('Fixed syntax errors in script.js');
