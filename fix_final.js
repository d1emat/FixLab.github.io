const fs = require('fs');
const path = 'C:/Users/dmateo/Downloads/FixLab Web-20260429T063734Z-3-001/script.js';

let content = fs.readFileSync(path, 'utf8');

// Fix 1: Fix the updateOne line - ensure it ends with });
content = content.replace(
  /(FixLabDB\.updateOne\(FixLabDB\.collections\.USERS, \{ email \}, \{ \$set: \{ name, passwordHash: FixLabDB\.hashPassword\(password\))\s+\})(\})/g,
  '$1})$2'
);

// Fix 2: Remove extra ); from window.FixLabDB line
content = content.replace(/window\.FixLabDB = FixLabDB;\);/g, 'window.FixLabDB = FixLabDB;');

// Fix 3: Ensure proper if-else structure
// The if (existing) { block should have } before else
const lines = content.split('\n');
const result = [];
let inIfBlock = false;

for (let i = 0; i < lines.length; i++) {
  let line = lines[i];
  
  // Check if this is the if (existing) line
  if (line.includes('if (existing) {')) {
    inIfBlock = true;
  }
  
  // If we're in the if block and hit a line with just } followed by //
  if (inIfBlock && line.trim() === '}' && i + 1 < lines.length && lines[i+1].includes('// Hacer FixLabDB')) {
    // This } closes the if block, add proper closing
    result.push(line);
    inIfBlock = false;
    continue;
  }
  
  result.push(line);
}

content = result.join('\n');

fs.writeFileSync(path, content);
console.log('Fixed syntax errors in script.js');
