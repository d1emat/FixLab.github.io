var fs = require('fs');
var path = 'C:/Users/dmateo/Downloads/FixLab Web-20260429T063734Z-3-001/script.js';

var content = fs.readFileSync(path, 'utf8');

// Fix 1: Remove any backticks from $set
content = content.replace(/\`\$set\`/g, '$set');

// Fix 2: Fix the updateOne line
// Find lines with updateOne and fix the closing
var lines = content.split('\n');
var result = [];
var i = 0;

while (i < lines.length) {
  var line = lines[i];
  
  // Fix updateOne lines with extra spaces
  if (line.indexOf('FixLabDB.updateOne(') >= 0 && line.indexOf('password)') >= 0 && !line.trim().endsWith(');')) {
    line = line.replace(/\}\s*$/, '});');
  }
  
  // Fix window.FixLabDB line with extra );
  if (line.indexOf('window.FixLabDB = FixLabDB;)') >= 0) {
    line = line.replace(');', ';');
  }
  
  // Fix if-else structure: if we hit } followed by comment about FixLabDB
  if (line.trim() === '}' && i + 1 < lines.length && lines[i+1].indexOf('Hacer FixLabDB') >= 0) {
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
console.log('Fixed syntax errors with Node.js');
