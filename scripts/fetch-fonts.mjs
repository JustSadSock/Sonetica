import { execSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const fonts = [
  { id: 'noto-serif', family: 'Noto Serif' },
  { id: 'pt-serif', family: 'PT Serif' },
  { id: 'ibm-plex-serif', family: 'IBM Plex Serif' },
  { id: 'merriweather', family: 'Merriweather' },
  { id: 'stix-two-text', family: 'STIX Two Text' }
];

function curl(url) {
  return execSync(`curl -L -s "${url}"`);
}

// Download fonts into public assets so they can be served without being committed
// The woff2 files are ignored via .gitignore
mkdirSync('public/assets/fonts', { recursive: true });

for (const font of fonts) {
  const url = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(font.family)}:ital,wght@0,400;0,700;1,400;1,700&display=swap&subset=cyrillic`;
  const css = curl(url).toString('utf8');
  const faceRe = /@font-face\s*{[^}]+}/g;
  let match;
  while ((match = faceRe.exec(css)) !== null) {
    const block = match[0];
    const srcMatch = block.match(/src: url\(([^)]+)\)/);
    const weightMatch = block.match(/font-weight: (\d+)/);
    const styleMatch = block.match(/font-style: (\w+)/);
    if (!srcMatch || !weightMatch || !styleMatch) continue;
    const file = curl(srcMatch[1]);
    const filename = `${font.id}-${weightMatch[1]}-${styleMatch[1]}.woff2`;
    writeFileSync(path.join('public/assets/fonts', filename), file);
    console.log('saved', filename);
  }
}
