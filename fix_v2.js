const fs = require('fs');
const path = 'C:/Users/dmateo/Downloads/FixLab Web-20260429T063734Z-3-001/script.js';

let content = fs.readFileSync(path, 'utf8');

// Fix 1: Fix the updateOne line - ensure it ends with });
const lines = content.split('\n');
const result = [];
let i = 0;

while (i < lines.length) {
  let line = lines[i];
  
  // Fix updateOne line with extra spaces
  if (line.includes('FixLabDB.updateOne(') && line.includes('password)') && !line.trim().endsWith(');')) {
    line = line.replace(/\}\s*$/, '});');
  }
  
  // Fix window.FixLabDB line with extra );
  if (line.includes('window.FixLabDB = FixLabDB;);')) {
    line = line.replace(');', ';');
  }
  
  // Fix if-else structure: if we hit a line with just } followed by comment about FixLabDB
  if (line.trim() === '}' && i + 1 < lines.length && lines[i+1].includes('// Hacer FixLabDB')) {
    // This } closes the if (existing) block
    result.push(line);
    // Skip the next two lines (comment and window.FixLabDB line)
    i += 3; // skip }, comment, window.FixLabDB line
    continue;
  }
  
  result.push(line);
  i++;
}

content = result.join('\n');

fs.writeFileSync(path, content);
console.log('Fixed syntax errors in script.js');
