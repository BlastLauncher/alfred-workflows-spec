const fs = require('fs');
const path = require('path');
const plist = require('plist');

// Regular expressions to match UUIDs and numeric indices
const uuidRegex = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i;
const indexRegex = /^\d+$/;

module.exports = {
  uuidRegex,
  indexRegex,

  // Function to sanitize keys
  sanitizeKey(key) {
    if (uuidRegex.test(key)) {
      return '<UID>';
    } else if (indexRegex.test(key)) {
      return '<INDEX>';
    }
    return key;
  },

  // Function to read and parse plist files
  parsePlistFiles(directory) {
    const files = fs.readdirSync(directory);
    const plistFiles = files.filter(file => path.extname(file) === '.plist');
    return plistFiles.map(file => {
      const filePath = path.join(directory, file);
      return plist.parse(fs.readFileSync(filePath, 'utf8'));
    });
  },

  // Helper function to set deeply nested properties of an object
  setNestedProperty(obj, path, value) {
    const parts = path.split('.');
    while (parts.length > 1) {
      const part = parts.shift();
      if (!obj[part]) {
        obj[part] = {};
      }
      if (typeof obj[part] !== 'object' || obj[part] === null) {
        obj[part] = {};
      }
      obj = obj[part];
    }
    if (typeof obj === 'object' && obj !== null) {
      obj[parts.shift()] = value;
    }
  }
};
