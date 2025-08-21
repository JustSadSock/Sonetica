#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

// Генерируем PNG-иконки из SVG, чтобы не хранить бинарники в git.
// В манифесте можно оставить SVG, но PNG полезны для совместимости.

const iconsDir = path.resolve('public/icons');
const svgSrc = path.join(iconsDir, 'icon.svg');

if (!fs.existsSync(svgSrc)) {
  console.warn('[gen-icons] public/icons/icon.svg not found — skip PNG generation');
  process.exit(0);
}

async function build() {
  const targets = [180, 192, 512];
  for (const size of targets) {
    const out = path.join(iconsDir, `icon-${size}.png`);
    const buf = fs.readFileSync(svgSrc);
    await sharp(buf, { density: 384 })
      .resize(size, size)
      .png()
      .toFile(out);
    console.log('[gen-icons] wrote', out);
  }
}

build().catch((e) => {
  console.error('[gen-icons] failed:', e);
  process.exit(1);
});
