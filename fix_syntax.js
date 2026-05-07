const fs = require('fs');
const path = 'C:/Users/dmateo/Downloads/FixLab Web-20260429T063734Z-3-001/script.js';

let content = fs.readFileSync(path, 'utf8');

// Fix 1: updateOne - fix the closing (simpler approach)
content = content.replace(
  /(FixLabDB\.updateOne\(FixLabDB\.collections\.USERS, \{ email \}, \{ \$set: \{ name, passwordHash: FixLabDB\.hashPassword\(password\))\s+)\}/,
  '$1})'
);

// Fix 2: Remove extra ); from window.FixLabDB line
content = content.replace(
  /(window\.FixLabDB = FixLabDB;)\);/,
  '$1'
);

// Fix 3: Ensure proper if-else structure
// Find the pattern where if (existing) block is not properly closed
const lines = content.split('\n');
const fixedLines = [];
let inUpdateOne = false;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  // Fix updateOne line
  if (line.includes('FixLabDB.updateOne(') && line.includes('password)') && !line.trim().endsWith(');')) {
    // Fix the closing of updateOne
    const fixed = line.replace(/\}\s*$/, '});');
    fixedLines.push(fixed);
    continue;
  }
  
  // Fix window.FixLabDB line
  if (line.includes('window.FixLabDB = FixLabDB;);')) {
    fixedLines.push(line.replace(');', ';'));
    continue;
  }
  
  fixedLines.push(line);
}

content = fixedLines.join('\n');

fs.writeFileSync(path, content);
console.log('Fixed syntax errors');
