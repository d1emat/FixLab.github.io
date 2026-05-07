const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

let fixed = 0;
files.forEach(file => {
  const filePath = path.join('.', file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Fix initial-scale=1.0 to initial-scale=1
  const newContent = content.replace(/initial-scale=1\.0/g, 'initial-scale=1');
  
  if (newContent !== content) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log('Fixed:', file);
    fixed++;
  }
});

console.log(`\\nFixed ${fixed} files.`);
