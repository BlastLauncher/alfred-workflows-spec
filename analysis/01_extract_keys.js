const fs = require('fs');
const { parsePlistFiles, sanitizeKey } = require('./utils');

// Directory containing the extracted info.plist files
const PLISTS_DIR = 'extracted_info_plists';
const ALL_KEYS_FILE = 'all_keys.json';
const USER_DEFINED_VARIABLES_FILE = 'user_defined_variables.txt';

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

  // Parse plist files
  const plistObjects = parsePlistFiles(PLISTS_DIR);

  // Collect keys from plist files
  plistObjects.forEach(obj => {
    collectKeys(obj, keysSet, variableKeysSet);
  });

  // Write all keys to a file
  fs.writeFileSync(ALL_KEYS_FILE, JSON.stringify(Array.from(keysSet).sort(), null, 2));
  console.log(`Extracted keys are saved to ${ALL_KEYS_FILE}`);

  // Write user-defined variables to a file
  fs.writeFileSync(USER_DEFINED_VARIABLES_FILE, JSON.stringify(Array.from(variableKeysSet).sort(), null, 2));
  console.log(`User-defined variables are saved to ${USER_DEFINED_VARIABLES_FILE}`);
}

// Execute the function
extractKeys();
