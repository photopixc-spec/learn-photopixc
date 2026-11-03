/**
 * PhotoPixC Learn - Mobile App Packaging Script (v2.1)
 * Bundles the website into www/ for Capacitor Android compilation.
 * Injects Mobile-First Redesign (Bottom Nav, Streak, Sticky Lesson Bar)
 * Normalizes all links to explicit .html files for Android local WebView.
 * Leaves all root production source files 100% untouched.
 */
const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const WWW_DIR = path.join(ROOT_DIR, 'www');

console.log('🚀 Preparing web assets for PhotoPixC Learn Android App v2.1...');

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
  'app-native-bridge.js',
  'mobile-app.css',
  'mobile-app.js'
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
    fs.cpSync(src, dest, {
      recursive: true,
      filter: (source) => {
        const basename = path.basename(source);
        if (basename.endsWith('-INSTRUCTIONS.txt') || 
            basename.endsWith('-INSTRUCTIONS-BN.txt') || 
            (basename.startsWith('README-') && basename.endsWith('.txt')) ||
            (basename === 'fonts' && source.includes('google-ads'))) {
          return false;
        }
        return true;
      }
    });
    console.log(`📁 Copied directory: ${item}`);
  } else {
    fs.copyFileSync(src, dest);
    console.log(`📄 Copied file: ${item}`);
  }
}

// 3. Normalize portal.js for local Android WebView
const portalPath = path.join(WWW_DIR, 'portal.js');
if (fs.existsSync(portalPath)) {
  let pContent = fs.readFileSync(portalPath, 'utf8');
  pContent = pContent.replace(/\/google-ads\//g, 'google-ads/index.html');
  fs.writeFileSync(portalPath, pContent, 'utf8');
}

// 4. Inject native bridge and mobile app redesign into HTML entrypoints in www/
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
    const depth = relPath.split('/').length - 1;
    const bridgePath = depth > 0 ? '../'.repeat(depth) + 'app-native-bridge.js' : './app-native-bridge.js';
    const mobileCssPath = depth > 0 ? '../'.repeat(depth) + 'mobile-app.css' : './mobile-app.css';
    const mobileJsPath = depth > 0 ? '../'.repeat(depth) + 'mobile-app.js' : './mobile-app.js';

    // A. Inject viewport-fit=cover for notch safe areas
    if (!content.includes('viewport-fit=cover')) {
      content = content.replace('name="viewport" content="width=device-width,initial-scale=1"', 'name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"');
      content = content.replace('name="viewport" content="width=device-width, initial-scale=1"', 'name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"');
    }

    // B. Inject mobile-app.css in <head>
    if (!content.includes('mobile-app.css')) {
      content = content.replace('</head>', `  <link rel="stylesheet" href="${mobileCssPath}">\n</head>`);
      console.log(`🎨 Injected mobile-app.css into www/${relPath}`);
    }

    // C. Inject native bridge and mobile-app.js before </body>
    if (!content.includes('app-native-bridge.js')) {
      const scriptTags = `\n  <!-- PhotoPixC Native Android Bridge & Mobile Redesign -->\n  <script src="${bridgePath}"></script>\n  <script src="${mobileJsPath}"></script>\n</body>`;
      content = content.replace('</body>', scriptTags);
      console.log(`🔌 Injected Native Bridge & Mobile Controller into www/${relPath}`);
    }

    // D. Normalize all links for Android local WebView
    if (depth === 0) {
      // Root index.html
      content = content
        .replace(/href="\/google-ads\/"/g, 'href="google-ads/index.html"')
        .replace(/href="\/meta-ads\/"/g, 'href="meta-ads/index.html"')
        .replace(/href="\/quranic-arabic\/"/g, 'href="quranic-arabic/index.html"')
        .replace(/href="\/skill-lab-45\/"/g, 'href="skill-lab-45/index.html"')
        .replace(/href="\/google-ads\/#/g, 'href="google-ads/index.html#')
        .replace(/href="\/meta-ads\/#/g, 'href="meta-ads/index.html#');
    } else {
      // Sub-apps (google-ads/, meta-ads/, etc.)
      content = content
        .replace(/href="\/"/g, 'href="../index.html"')
        .replace(/href="\/google-ads\/"/g, 'href="../google-ads/index.html"')
        .replace(/href="\/meta-ads\/"/g, 'href="../meta-ads/index.html"')
        .replace(/href="\/quranic-arabic\/"/g, 'href="../quranic-arabic/index.html"')
        .replace(/href="\/skill-lab-45\/"/g, 'href="../skill-lab-45/index.html"')
        .replace(/href="\/google-ads\/#/g, 'href="../google-ads/index.html#')
        .replace(/href="\/meta-ads\/#/g, 'href="../meta-ads/index.html#');
    }

    fs.writeFileSync(filePath, content, 'utf8');
  }
}

console.log('✅ Web assets & Mobile Redesign successfully prepared in www/');
