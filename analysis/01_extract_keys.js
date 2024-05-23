const fs = require('fs');
const plist = require('plist');
const path = require('path');

// Directory containing the extracted info.plist files
const PLISTS_DIR = 'extracted_info_plists';
const ALL_KEYS_FILE = 'all_keys.json';
const USER_DEFINED_VARIABLES_FILE = 'user_defined_variables.txt';

// Regular expressions to match UUIDs and numeric indices
const uuidRegex = /[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}/i;
const indexRegex = /^\d+$/;

// Function to sanitize keys
function sanitizeKey(key) {
  if (uuidRegex.test(key)) {
    return '<UID>';
  } else if (indexRegex.test(key)) {
    return '<INDEX>';
  }
  return key;
}

// Function to traverse an object and collect all keys as paths
function collectKeys(obj, keysSet, variableKeysSet, prefix = '') {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const sanitizedKey = sanitizeKey(key);
      let fullKey = prefix ? `${prefix}.${sanitizedKey}` : sanitizedKey;

      // Detect if the key belongs to variables
      if (fullKey.includes('.variables.') || fullKey.startsWith('variables.')) {
        const variableKey = fullKey.includes('.variables.')
          ? fullKey.split('.variables.')[1]
          : fullKey.split('variables.')[1];

        if (variableKey) {
          variableKeysSet.add(variableKey);
          fullKey = fullKey.includes('.variables.')
            ? `${prefix}.variables.<VARIABLE>`
            : 'variables.<VARIABLE>';
        }
      }

      keysSet.add(fullKey);

      if (typeof obj[key] === 'object' && obj[key] !== null) {
        collectKeys(obj[key], keysSet, variableKeysSet, fullKey);
      }
    }
  }
}
// Function to extract keys from plist files
function extractKeys() {
  const keysSet = new Set();
  const variableKeysSet = new Set();

  // Read all files in the directory
  const files = fs.readdirSync(PLISTS_DIR);

  // Filter .plist files
  const plistFiles = files.filter(file => path.extname(file) === '.plist');

  plistFiles.forEach(file => {
    const filePath = path.join(PLISTS_DIR, file);

    // Read and parse the plist file
    const data = fs.readFileSync(filePath, 'utf8');
    try {
      const obj = plist.parse(data);
      collectKeys(obj, keysSet, variableKeysSet);
    } catch (parseErr) {
      console.error(`Unable to parse plist file: ${filePath}`, parseErr);
    }
  });

  // Write all keys to a file
  fs.writeFileSync(ALL_KEYS_FILE, JSON.stringify(Array.from(keysSet).toSorted(), null, 2));
  console.log(`Extracted keys are saved to ${ALL_KEYS_FILE}`);

  // Write user-defined variables to a file
  fs.writeFileSync(USER_DEFINED_VARIABLES_FILE, JSON.stringify(Array.from(variableKeysSet).toSorted(), null, 2));
  console.log(`User-defined variables are saved to ${USER_DEFINED_VARIABLES_FILE}`);
}

// Execute the function
extractKeys();
