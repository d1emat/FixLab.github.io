const fs = require('fs');
const path = 'C:/Users/dmateo/Downloads/FixLab Web-20260429T063734Z-3-001/script.js';

let content = fs.readFileSync(path, 'utf8');

// Fix 1: Fix the updateOne line - it has extra spaces before closing
// Find: FixLabDB.updateOne(FixLabDB.collections.USERS, { email }, { $set: { name, passwordHash: FixLabDB.hashPassword(password)   });
// Replace with: FixLabDB.updateOne(FixLabDB.collections.USERS, { email }, { $set: { name, passwordHash: FixLabDB.hashPassword(password) });
content = content.replace(
  /(FixLabDB\.updateOne\(FixLabDB\.collections\.USERS, \{ email \}, \{ \$set: \{ name, passwordHash: FixLabDB\.hashPassword\(password\))\s+\}\);/g,
  '$1});'
);

// Fix 2: Fix the if-else structure
// Find: } \r\n\r\n// Hacer FixLabDB accesible globalmente\r\nwindow.FixLabDB = FixLabDB;\r\n} else {
// Replace with: } \r\n  }\r\n} else {
content = content.replace(
  /\}\r?\n\r?\n\/\/ Hacer FixLabDB accesible globalmente\r?\nwindow\.FixLabDB = FixLabDB;\r?\n\} else \{/g,
  '}\r\n  }\r\n} else {'
);

// Fix 3: Remove extra ); from window.FixLabDB line if still present
content = content.replace(/window\.FixLabDB = FixLabDB;\);/g, 'window.FixLabDB = FixLabDB;');

fs.writeFileSync(path, content);
console.log('Fixed syntax errors using hex-aware approach');
