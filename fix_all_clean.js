var fs = require('fs');
var path = 'C:/Users/dmateo/Downloads/FixLab Web-20260429T063734Z-3-001/script.js';

var content = fs.readFileSync(path, 'utf8');

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
// Find: } \n\n// Hacer FixLabDB \nwindow.FixLabDB = FixLabDB;\n} else {
// Replace with: } \n  }\n} else {
content = content.replace(
  /\}\r?\n\r?\n\/\/ Hacer FixLabDB accesible globalmente\r?\nwindow\.FixLabDB = FixLabDB;\r?\n\} else \{/g,
  '}\r\n  }\r\n} else {'
);

fs.writeFileSync(path, content);
console.log('Fixed all syntax errors cleanly');
