const fs = require('fs');
['messages/en.json', 'messages/bn.json'].forEach(f => {
  let c = fs.readFileSync(f, 'utf8');
  if (c.includes('Pathora')) {
    c = c.replace(/Pathora/g, 'Tripper');
    fs.writeFileSync(f, c, 'utf8');
    console.log('Updated ' + f);
  }
});
