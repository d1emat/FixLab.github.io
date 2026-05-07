const fs = require('fs');
const path = 'C:/Users/dmateo/Downloads/FixLab Web-20260429T063734Z-3-001/script.js';

let content = fs.readFileSync(path, 'utf8');

// Fix 1: Fix updateOne lines that have extra spaces before closing
const lines = content.split('\n');
const fixedLines = [];

for (let line of lines) {
  // Fix updateOne lines with extra spaces
  if (line.includes('FixLabDB.updateOne(') && line.includes('password)') && !line.trim().endsWith(');')) {
    // Replace the malformed ending with proper ending
    line = line.replace(/\}\s*$/, '});');
  }
  
  // Fix window.FixLabDB line with extra );
  if (line.includes('window.FixLabDB = FixLabDB;)')) {
    line = line.replace(');', ';');
  }
  
  fixedLines.push(line);
}

content = fixedLines.join('\n');
fs.writeFileSync(path, content);
console.log('Fixed syntax errors');
