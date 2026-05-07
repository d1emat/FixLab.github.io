var fs = require('fs');
var path = 'C:/Users/dmateo/Downloads/FixLab Web-20260429T063734Z-3-001/script.js';

var content = fs.readFileSync(path, 'utf8');

// Fix 1: Remove backticks from $set if present
content = content.replace(/\`\$set\`/g, '$set');

// Fix 2: Fix the updateOne line 
content = content.replace(
  /(FixLabDB\.updateOne\(FixLabDB\.collections\.USERS, \{ email \}, \{ )\$set(:[^}]+\})\);/g,
  '$1$set$2});'
);

// Fix 3: Fix the if-else structure - remove misplaced window.FixLabDB line
var lines = content.split('\n');
var result = [];
var i = 0;

while (i < lines.length) {
  var line = lines[i];
  
  // If we hit a line with just } and next line is comment about FixLabDB
  if (line.trim() === '}' && i + 1 < lines.length && lines[i+1].indexOf('Hacer FixLabDB') >= 0) {
    result.push(line);  // keep the }
    i += 3;  // skip the comment and window.FixLabDB line and the extra }
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
console.log('Fixed syntax errors cleanly');
