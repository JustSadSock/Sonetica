import { readFileSync, mkdirSync } from 'node:fs';
import sharp from 'sharp';

const src = 'public/icons/icon.svg';
const outDir = 'public/icons';
const sizes = [192, 512];

mkdirSync(outDir, { recursive: true });
const svg = readFileSync(src);
await Promise.all(sizes.map(s =>
  sharp(svg).resize(s, s).png().toFile(`${outDir}/icon-${s}.png`)
));
console.log('icons generated');
