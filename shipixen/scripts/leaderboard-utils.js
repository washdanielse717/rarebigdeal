const fs = require('fs');
const path = require('path');

const csvFilePath = path.join(
  __dirname,
  '../data/config/export-hog-popular.csv',
);

function parseCSV() {
  const data = fs.readFileSync(csvFilePath, 'utf8');
  const lines = data.split('\n');
  const products = {};

  lines.forEach((line, index) => {
    if (index === 0 || !line.trim()) return; // Skip header and empty lines
    const [series] = line.split(',');
    const seriesParts = series.split('/');
    if (seriesParts.length < 3) return; // Skip lines without expected format
    const productName = seriesParts[2];
    products[productName] = index;
  });

  return products;
}

const products = parseCSV();

function getLeaderboardPosition(productName) {
  return products[productName] || -1;
}

module.exports = { getLeaderboardPosition };
