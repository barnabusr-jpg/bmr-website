// scripts/lint-jsonld.js
const fs = require('fs');
const path = require('path');

const TARGET_DIR = path.join(process.cwd(), 'src');
const SCRIPT_REGEX = /<script[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi;

/**
 * Recursively walks directory to collect all source files.
 */
function getAllFiles(dirPath, arrayOfFiles = []) {
  if (!fs.existsSync(dirPath)) return arrayOfFiles;

  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllFiles(fullPath, arrayOfFiles);
    } else if (/\.(tsx?|jsx?|html)$/.test(file)) {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

try {
  const files = getAllFiles(TARGET_DIR);
  let bad = [];

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');

    // Fast-path check before running full regex
    if (!content.includes('application/ld+json')) continue;

    let match;
    // Reset regex state for each file
    SCRIPT_REGEX.lastIndex = 0;

    while ((match = SCRIPT_REGEX.exec(content)) !== null) {
      const block = match[0];
      if (block && block.includes('™')) {
        const snippetMatch = block.match(/.{0,80}™.{0,80}/);
        const relativePath = path.relative(process.cwd(), file);
        bad.push({
          file: relativePath,
          match: snippetMatch ? snippetMatch[0].trim() : 'contains ™',
        });
      }
    }
  }

  if (bad.length) {
    console.error('\n❌ Found literal ™ inside application/ld+json blocks:');
    bad.forEach((b) => {
      console.error(`  - ${b.file} -> "${b.match}"`);
    });
    console.error('\nFix: Wrap the text with sanitizeForJsonLd() or remove ™ from structured data.\n');
    process.exit(1);
  }

  console.log('✅ JSON-LD block sanitization verified: 0 ™ symbols found across source files.');
} catch (error) {
  console.error('❌ Error executing JSON-LD lint scan:', error);
  process.exit(1);
}
