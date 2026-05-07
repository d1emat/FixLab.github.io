const fs = require('fs');
const path = 'C:/Users/dmateo/Downloads/FixLab Web-20260429T063734Z-3-001/script.js';

let content = fs.readFileSync(path, 'utf8');

// Fix 1: Fix the updateOne line - it has extra spaces before closing
content = content.replace(
  /(FixLabDB\.updateOne\(FixLabDB\.collections\.USERS, \{ email \}, \{ \$set: \{ name, passwordHash: FixLabDB\.hashPassword\(password\))\s+\})\)/,
  '$1})'
);

// Fix 2: Fix the if-else structure
// The issue is that the } after updateOne closes the if block, but window.FixLabDB line is inside
// We need to move window.FixLabDB outside the if-else block
const oldPattern = '      FixLabDB.updateOne(FixLabDB.collections.USERS, { email }, { $set: { name, passwordHash: FixLabDB.hashPassword(password)   }\n}\n\n// Hacer FixLabDB accesible globalmente\nwindow.FixLabDB = FixLabDB;\n    } else {';
const newPattern = '      FixLabDB.updateOne(FixLabDB.collections.USERS, { email }, { $set: { name, passwordHash: FixLabDB.hashPassword(password) } });    } else {';

content = content.replace(oldPattern, newPattern);

fs.writeFileSync(path, content);
console.log('Fixed syntax errors');
