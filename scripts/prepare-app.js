/**
 * PhotoPixC Learn - Mobile App Packaging Script
 * Bundles the website into www/ for Capacitor Android compilation.
 * Leaves all root production source files 100% untouched.
 */
const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const WWW_DIR = path.join(ROOT_DIR, 'www');

console.log('🚀 Preparing web assets for PhotoPixC Learn Android App...');

// 1. Clean previous www build
if (fs.existsSync(WWW_DIR)) {
  fs.rmSync(WWW_DIR, { recursive: true, force: true });
}
fs.mkdirSync(WWW_DIR, { recursive: true });

// 2. Directories and files to copy
const ITEMS_TO_COPY = [
  'index.html',
  'portal.js',
  'google-ads',
  'meta-ads',
  'skill-lab-45',
  'quranic-arabic',
  'shared',
  'app-native-bridge.js'
];

for (const item of ITEMS_TO_COPY) {
  const src = path.join(ROOT_DIR, item);
  const dest = path.join(WWW_DIR, item);

  if (!fs.existsSync(src)) {
    console.warn(`⚠️ Warning: ${item} not found at ${src}`);
    continue;
  }

  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.cpSync(src, dest, { recursive: true });
    console.log(`📁 Copied directory: ${item}`);
  } else {
    fs.copyFileSync(src, dest);
    console.log(`📄 Copied file: ${item}`);
  }
}

// 3. Inject native bridge into HTML entrypoints in www/
const HTML_ENTRYPOINTS = [
  'index.html',
  'google-ads/index.html',
  'meta-ads/index.html',
  'skill-lab-45/index.html',
  'quranic-arabic/index.html'
];

for (const relPath of HTML_ENTRYPOINTS) {
  const filePath = path.join(WWW_DIR, relPath);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    // Calculate relative path to app-native-bridge.js
    const depth = relPath.split('/').length - 1;
    const bridgePath = depth > 0 ? '../'.repeat(depth) + 'app-native-bridge.js' : './app-native-bridge.js';

    if (!content.includes('app-native-bridge.js')) {
      const scriptTag = `\n  <!-- PhotoPixC Native Android Bridge -->\n  <script src="${bridgePath}"></script>\n</body>`;
      content = content.replace('</body>', scriptTag);
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`🔌 Injected Native Bridge into www/${relPath}`);
    }
  }
}

console.log('✅ Web assets successfully prepared in www/');
