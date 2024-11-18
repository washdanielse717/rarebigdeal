const { readmePath } = require('./settings');
const fs = require('fs');

async function parseReadme() {
  const readmeContent = fs.readFileSync(readmePath, 'utf-8');
  const lines = readmeContent.split('\n');

  let currentCategory = '';
  let currentSubcategory = '';
  const apps = [];

  for (const line of lines) {
    if (line.startsWith('## ')) {
      currentCategory = line.replace('## ', '').trim();
    } else if (line.startsWith('### ')) {
      currentSubcategory = line.replace('### ', '').trim();
    } else if (line.startsWith('|')) {
      const parts = line.split('|').map((part) => part.trim());
      if (parts.length >= 5 && parts[2].startsWith('[')) {
        const name = parts[2].match(/\[(.*?)\]/)[1];
        const website = parts[2].match(/\((.*?)\)/)[1];
        const description = parts[3];
        const deal = parts[4];

        apps.push({
          name,
          website,
          description,
          deal,
          category: currentCategory,
          subcategory: currentSubcategory,
        });
      }
    }
  }

  return apps;
}

module.exports = { parseReadme };
