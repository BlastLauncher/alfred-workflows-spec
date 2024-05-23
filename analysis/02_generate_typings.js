const fs = require('fs');
const path = require('path');
const { parsePlistFiles, sanitizeKey, setNestedProperty } = require('./utils');

// Directory containing the extracted info.plist files
const PLISTS_DIR = 'extracted_info_plists';
const ALL_KEYS_FILE = 'all_keys.json';
const TYPINGS_FILE = 'typings.d.ts';

// Array of keys to exclude and set directly to string type
const exclusionList = [
  'bundleid',
  'createdby',
  'description',
  'name',
  'version',
  'webaddress',
];

// Read all keys from the previously generated file
const allKeys = JSON.parse(fs.readFileSync(ALL_KEYS_FILE, 'utf8'));

// Function to collect possible values for each key
function collectValues(obj, key, valuesMap) {
  const parts = key.split('.');
  let current = obj;
  let keyPath = [];

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
      if (!valuesMap[currentKey]) {
        valuesMap[currentKey] = new Set();
      }
      valuesMap[currentKey].add(typeof current === 'string' || typeof current === 'boolean' || typeof current === 'number' ? current : JSON.stringify(current));
    }
  }
}

// Function to extract values from plist files
function extractValues() {
  const valuesMap = {};

  // Parse plist files
  const plistObjects = parsePlistFiles(PLISTS_DIR);

  // Collect values from plist files
  plistObjects.forEach(obj => {
    allKeys.forEach(key => {
      collectValues(obj, key, valuesMap);
    });
  });

  return valuesMap;
}

// Function to convert a Set of values to TypeScript union type or primitive type
function convertToTypeScriptType(key, values) {
  if (exclusionList.includes(key)) {
    return 'string';
  }

  const types = Array.from(values);
  if (types.every(value => value === 'true' || value === 'false')) {
    return 'boolean';
  } else if (types.every(value => !isNaN(Number(value)))) {
    return 'number';
  } else {
    return types.length > 0 ? types.map(value => JSON.stringify(value)).join(' | ') : 'string';
  }
}

// Helper function to generate nested TypeScript types
function generateNestedTypings(valuesMap) {
  const root = {};

  Object.keys(valuesMap).forEach(key => {
    const type = convertToTypeScriptType(key, valuesMap[key]);
    setNestedProperty(root, key, type);
  });

  return root;
}

// Function to generate TypeScript typings
function generateTypeScriptText(obj, indentLevel = 1) {
  const indent = '  '.repeat(indentLevel);
  const keys = Object.keys(obj);
  let text = '{\n';

  keys.forEach((key, idx) => {
    if (typeof obj[key] === 'object') {
      text += `${indent}"${key}": ${generateTypeScriptText(obj[key], indentLevel + 1)}${idx < keys.length - 1 ? ',' : ''}\n`;
    } else {
      text += `${indent}"${key}": ${obj[key]}${idx < keys.length - 1 ? ',' : ''}\n`;
    }
  });

  text += `${'  '.repeat(indentLevel - 1)}}`;

  return text;
}

// Main function to execute the script
function main() {
  const valuesMap = extractValues();
  const nestedTypings = generateNestedTypings(valuesMap);
  const typingText = `type ExtractedPlistTypes = ${generateTypeScriptText(nestedTypings)};\n`;

  fs.writeFileSync(TYPINGS_FILE, typingText);
  console.log(`TypeScript typings are saved to ${TYPINGS_FILE}`);
}

// Execute the main function
main();
