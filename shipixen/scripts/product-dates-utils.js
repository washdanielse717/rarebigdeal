const productDates = require('../data/config/product-dates');

function getProductDates(productName) {
  return productDates[productName] || null;
}

module.exports = { getProductDates };
