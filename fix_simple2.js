const fs = require('fs');
const path = 'C:/Users/dmateo/Downloads/FixLab Web-20260429T063734Z-3-001/script.js';

let content = fs.readFileSync(path, 'utf8');

// Fix 1: Fix window.FixLabDB line with extra );
content = content.replace('window.FixLabDB = FixLabDB;);', 'window.FixLabDB = FixLabDB;');

// Fix 2: The updateOne line needs proper closing
// Find the pattern: FixLabDB.updateOne(...)   }); followed by }
const lines = content.split('\n');
const result = [];
let prevLine = '';

for (let line of lines) {
  // Fix updateOne lines
  if (line.includes('FixLabDB.updateOne(') && line.includes('password)') && line.includes('   });')) {
    line = line.replace('   });', ' });');
  }
  
  // Fix if (existing) block - add closing } before else
  if (prevLine.includes('FixLabDB.updateOne(') && line.trim() === '}' && 
      result.length > 0 && result[result.length-1].includes('updateOne')) {
    // This } is the closing of if block, keep it
  }
  
  result.push(line);
  prevLine = line;
}

content = result.join('\n');

// Fix 3: Ensure if-else structure is correct
// Find: } \n // Hacer FixLabDB \n window.FixLabDB... \n } else {
const badPattern = '}\n\n// Hacer FixLabDB accesible globalmente\nwindow.FixLabDB = FixLabDB;\n} else {';
const goodPattern = '  }\n} else {';
content = content.replace(badPattern, goodPattern);

fs.writeFileSync(path, content);
console.log('Fixed syntax errors');
