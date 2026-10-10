const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.ts')) results.push(file);
    }
  });
  return results;
}

const files = walk('src');
let updated = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('Pathora')) {
    // Basic replacements
    content = content.replace(/PathoraTravel/g, 'Tripper');
    content = content.replace(/Pathora Travel/g, 'Tripper');
    
    // JSX Component replacements
    content = content.replace(/Pathora<span className="text-primary">Travel<\/span>/g, 'Trip<span className="text-primary">per<\/span>');
    content = content.replace(/Pathora<span className="text-emerald-400">Travel<\/span>/g, 'Trip<span className="text-emerald-400">per<\/span>');
    content = content.replace(/Pathora<span className="text-\[\#0f6b4f\]">Travel<\/span>/g, 'Trip<span className="text-[#0f6b4f]">per<\/span>');
    
    // Fallback for any remaining Pathora references
    content = content.replace(/Pathora/g, 'Tripper');

    fs.writeFileSync(file, content, 'utf8');
    updated++;
    console.log('Updated: ' + file);
  }
});

console.log('Total files updated: ' + updated);
