const fs = require('fs');
const path = 'C:/Users/dmateo/Downloads/FixLab Web-20260429T063734Z-3-001/script.js';

let content = fs.readFileSync(path, 'utf8');

// Fix 1: Fix the updateOne line that has extra spaces
// Find: FixLabDB.updateOne(FixLabDB.collections.USERS, { email }, { $set: { name, passwordHash: FixLabDB.hashPassword(password)   });
// Replace with: FixLabDB.updateOne(FixLabDB.collections.USERS, { email }, { $set: { name, passwordHash: FixLabDB.hashPassword(password) });

content = content.replace(
  /(FixLabDB\.updateOne\(FixLabDB\.collections\.USERS, \{ email \}, \{ \$set: \{ name, passwordHash: FixLabDB\.hashPassword\(password\))\s+\}\);/g,
  '$1});'
);

// Fix 2: Remove extra ); from window.FixLabDB line
content = content.replace(/window\.FixLabDB = FixLabDB;\);/g, 'window.FixLabDB = FixLabDB;');

// Fix 3: Fix the if-else structure
// The problem is that the } after updateOne is followed by comment and window.FixLabDB line
// We need to remove those lines and properly close the if block
const lines = content.split('\n');
const result = [];
let i = 0;

while (i < lines.length) {
  const line = lines[i];
  
  // If we find a line with just } and next line is comment about FixLabDB
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
console.log('Fixed all syntax errors');
