var fs = require('fs');
var path = 'C:/Users/dmateo/Downloads/FixLab Web-20260429T063734Z-3-001/script.js';

var content = fs.readFileSync(path, 'utf8');

// Fix 1: Fix the updateOne line that has extra spaces
// Find: FixLabDB.updateOne(FixLabDB.collections.USERS, { email }, { $set: { name, passwordHash: FixLabDB.hashPassword(password)   });
// Replace with: FixLabDB.updateOne(FixLabDB.collections.USERS, { email }, { $set: { name, passwordHash: FixLabDB.hashPassword(password) } });

var badUpdateOne = 'FixLabDB.updateOne(FixLabDB.collections.USERS, { email }, { $set: { name, passwordHash: FixLabDB.hashPassword(password)   });';
var goodUpdateOne = 'FixLabDB.updateOne(FixLabDB.collections.USERS, { email }, { $set: { name, passwordHash: FixLabDB.hashPassword(password) } });';
content = content.replace(badUpdateOne, goodUpdateOne);

// Fix 2: Remove extra ); from window.FixLabDB line
content = content.replace('window.FixLabDB = FixLabDB;);', 'window.FixLabDB = FixLabDB;');

// Fix 3: Fix the if-else structure
// The problem is that the if (existing) { block is not properly closed before else
// Let's find the pattern and fix it
var lines = content.split('\n');
var result = [];
var i = 0;

while (i < lines.length) {
  var line = lines[i];
  
  // Check if this is the problematic pattern
  if (line.trim() === '}' && i + 3 < lines.length && 
      lines[i+1].indexOf('Hacer FixLabDB') >= 0) {
    // This } closes the if (existing) block
    result.push(line);
    // Skip the next two lines (comment and window.FixLabDB line)
    i += 3; // skip }, comment, window.FixLabDB line
    continue;
  }
  
  // Fix window.FixLabDB line with extra );
  if (line.indexOf('window.FixLabDB = FixLabDB;)') >= 0) {
    line = line.replace(');', ';');
  }
  
  result.push(line);
  i++;
}

content = result.join('\n');

fs.writeFileSync(path, content);
console.log('Fixed all syntax issues');
