const fs = require('fs');
const path = 'C:/Users/dmateo/Downloads/FixLab Web-20260429T063734Z-3-001/script.js';

let content = fs.readFileSync(path, 'utf8');

// Fix 1: Fix the updateOne line - remove extra spaces before closing
content = content.replace(
  /(FixLabDB\.updateOne\(FixLabDB\.collections\.USERS, \{ email \}, \{ \$set: \{ name, passwordHash: FixLabDB\.hashPassword\(password\))\s+\}\);/g,
  '$1});'
);

// Fix 2: Fix the if-else structure
// The } after updateOne should close the if block, not be followed by window.FixLabDB
const lines = content.split('\n');
const result = [];
let inIfBlock = false;

for (let i = 0; i < lines.length; i++) {
  let line = lines[i];
  
  // Check if this is the if (existing) line
  if (line.includes('if (existing) {')) {
    inIfBlock = true;
  }
  
  // If we're in if block and hit a line with just } followed by comments
  if (inIfBlock && line.trim() === '}' && i < lines.length - 1) {
    // Check if next line is a comment
    if (lines[i+1].includes('// Hacer FixLabDB')) {
      // This } closes the if block, add proper closing
      result.push(line);
      inIfBlock = false;
      continue;
    }
  }
  
  // Fix window.FixLabDB line with extra );
  if (line.includes('window.FixLabDB = FixLabDB;);')) {
    line = line.replace(');', ';');
  }
  
  result.push(line);
}

content = result.join('\n');

// Now fix the if-else structure more precisely
// Find: } \n\n// Hacer FixLabDB\nwindow.FixLabDB = FixLabDB;\n} else {
// Replace with: } \n  }\n} else {
content = content.replace(
  /\}\r?\n\r?\n\/\/ Hacer FixLabDB accesible globalmente\r?\nwindow\.FixLabDB = FixLabDB;\r?\n\} else \{/g,
  '}\r\n  }\r\n} else {'
);

fs.writeFileSync(path, content);
console.log('Fixed syntax errors');
