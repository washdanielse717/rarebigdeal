const fs = require('fs');
const path = require('path');

const csvFilePath = path.join(
  __dirname,
  '../data/config/export-app-page-views.csv',
);

function parseCSV() {
  const data = fs.readFileSync(csvFilePath, 'utf8');
  const lines = data.split('\n');
  const products = {};

  lines.forEach((line, index) => {
    if (index === 0 || !line.trim()) return; // Skip header and empty lines
    const [series] = line.split(',');
    const productName = series.split('/')[2];
    products[productName] = index;
  });

  return products;
}

const products = parseCSV();

function getLeaderboardPosition(productName) {
  return products[productName] || -1;
}

module.exports = { getLeaderboardPosition };
