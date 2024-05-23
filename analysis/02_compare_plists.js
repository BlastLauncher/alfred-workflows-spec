const fs = require('fs');
const plist = require('plist');
const path = require('path');

// Directory containing the extracted info.plist files
const PLISTS_DIR = 'extracted_info_plists';
const ALL_KEYS_FILE = 'all_keys.json';
const COMPARISON_RESULT_FILE = 'comparison_result.json';

// Read all keys from the previously generated file
const allKeys = JSON.parse(fs.readFileSync(ALL_KEYS_FILE, 'utf8'));

// Function to check keys in an object
function checkKeys(obj, keys) {
  const result = {};
  keys.forEach(key => {
    const parts = key.split('.');
    let current = obj;
    let found = true;
    for (const part of parts) {
      if (current && typeof current === 'object' && part in current) {
        current = current[part];
      } else {
        found = false;
        break;
      }
    }
    result[key] = found;
  });
  return result;
}

// Function to compare plist files
function comparePlistFiles() {
  const comparisonResult = {};

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
      const keyPresence = checkKeys(obj, allKeys);
      comparisonResult[file] = keyPresence;
    } catch (parseErr) {
      console.error(`Unable to parse plist file: ${filePath}`, parseErr);
    }
  });

  // Write comparison results to a file
  fs.writeFileSync(COMPARISON_RESULT_FILE, JSON.stringify(comparisonResult, null, 2));
  console.log(`Comparison results are saved to ${COMPARISON_RESULT_FILE}`);
}

// Execute the function
comparePlistFiles();
