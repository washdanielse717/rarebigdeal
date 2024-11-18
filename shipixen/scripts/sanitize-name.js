function sanitizeName(name) {
  return name
    .replace(/[^a-zA-Z0-9]/g, '-')
    .replace(/-+/g, '-')
    .toLowerCase();
}

module.exports = { sanitizeName };
