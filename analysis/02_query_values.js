const fs = require('fs');
const readline = require('readline');
const { parsePlistFiles, sanitizeKey, uuidRegex, indexRegex } = require('./utils');

// Directory containing the extracted info.plist files
const PLISTS_DIR = 'extracted_info_plists';
const ALL_KEYS_FILE = 'all_keys.json';

// Read all keys from the previously generated file
const allKeys = JSON.parse(fs.readFileSync(ALL_KEYS_FILE, 'utf8'));

// Initialize readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> ',
});

// Function to normalize keys by replacing UUIDs and indices
function normalizeKey(key) {
  return key
    .replace(uuidRegex, '<UID>')
    .replace(indexRegex, '<INDEX>');
}

// Function to recursively normalize object keys
function normalizeObjectKeys(obj) {
  if (typeof obj !== 'object' || obj === null) return obj;

  const normalized = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      const sanitizedKey = normalizeKey(key);
      normalized[sanitizedKey] = normalizeObjectKeys(obj[key]);
    }
  }
  return normalized;
}

// Function to collect possible values for each key
function collectValues(obj, key, valuesMap) {
  const parts = key.split('.');
  let current = obj;
  const keyPath = [];

  for (let i = 0; i < parts.length; i++) {
    const part = sanitizeKey(parts[i]);
    keyPath.push(part);
    const currentKey = keyPath.join('.');

    if (current && typeof current === 'object' && part in current) {
      current = current[part];
    } else {
      return;
    }

    if (i === parts.length - 1) {
      const normalizedKey = normalizeKey(currentKey);
      if (!valuesMap[normalizedKey]) {
        valuesMap[normalizedKey] = new Set();
      }
      valuesMap[normalizedKey].add(JSON.stringify(current));
    }
  }
}

// Function to extract values from plist files
function extractValues() {
  const valuesMap = {};

  // Parse plist files
  const plistObjects = parsePlistFiles(PLISTS_DIR);

  // Normalize object keys
  const normalizedPlistObjects = plistObjects.map(normalizeObjectKeys);

  // Collect values from plist files
  normalizedPlistObjects.forEach(obj => {
    allKeys.forEach(key => {
      collectValues(obj, key, valuesMap);
    });
  });

  return valuesMap;
}

// Function to convert possible values to TypeScript literal types
function toLiteralTypes(possibleValues) {
  return Array.from(possibleValues).map(value => JSON.parse(value)) // Parse JSON strings
    .map(value => typeof value === 'string' ? `'${value}'` : value) // Wrap strings in single quotes
    .join(' | ');
}

// Function to prompt user for key and display possible values
async function promptUserForKey(valuesMap) {
  return new Promise((resolve) => {
    rl.question('Enter the key to check possible values: ', (key) => {
      const normalizedKey = normalizeKey(key);
      if (valuesMap[normalizedKey]) {
        console.log(`Key: ${normalizedKey}`);
        const literalTypes = toLiteralTypes(valuesMap[normalizedKey]);
        console.log(`Possible Values: ${literalTypes}`);
      } else {
        console.log(`No values found for key: ${normalizedKey}`);
      }
      resolve();
    });
  });
}

// Main function to execute the script
async function main() {
  // Extract values from plist files
  const valuesMap = extractValues();

  // REPL loop to prompt user for key and display possible values
  rl.prompt();
  rl.on('line', async (line) => {
    await promptUserForKey(valuesMap);
    rl.prompt();
  }).on('close', () => {
    console.log('Goodbye!');
    process.exit(0);
  });
}

// Execute the main function
main();
