const fs = require('fs');
const path = 'C:/Users/dmateo/Downloads/FixLab Web-20260429T063734Z-3-001/script.js';

let content = fs.readFileSync(path, 'utf8');

// Fix 1: window.FixLabDB line with extra );
content = content.replace(/window\.FixLabDB = FixLabDB;\);/g, 'window.FixLabDB = FixLabDB;');

// Fix 2: updateOne block - fix the closing
// Find the pattern where updateOne is followed by } on next line
const lines = content.split('\n');
const result = [];
for (let i = 0; i < lines.length; i++) {
  let line = lines[i];
  
  // Fix updateOne line that doesn't end with );
  if (line.includes('FixLabDB.updateOne(') && line.includes('password)') && !line.trim().endsWith(');')) {
    line = line.replace(/\}\s*$/, '});');
  }
  
  // Fix window.FixLabDB line
  if (line.includes('window.FixLabDB = FixLabDB;);')) {
    line = line.replace(');', ';');
  }
  
  result.push(line);
}

content = result.join('\n');

// Fix 3: Ensure if (existing) block is properly closed
// Find the pattern and fix it
const ifBlockPattern = /(const existing = FixLabDB\.findOne\(FixLabDB\.collections\.USERS, \{ email \}\);\r?\n\s*if \(existing\) \{\r?\n\s*FixLabDB\.updateOne\(FixLabDB\.collections\.USERS, \{ email \}, \{ \$set: \{ name, passwordHash: FixLabDB\.hashPassword\(password\) \} \);)(\r?\n)\}(\r?\n)/;
content = content.replace(ifBlockPattern, '$1$2    }$3');

fs.writeFileSync(path, content);
console.log('Fixed syntax errors');
