#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const dir = path.resolve('public/i18n');
const base = JSON.parse(fs.readFileSync(path.join(dir, 'en.json'), 'utf8'));
const ru = JSON.parse(fs.readFileSync(path.join(dir, 'ru.json'), 'utf8'));
const uk = JSON.parse(fs.readFileSync(path.join(dir, 'uk.json'), 'utf8'));

function flatten(obj, prefix = '') {
  const res = {};
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === 'object') {
      Object.assign(res, flatten(v, key));
    } else {
      res[key] = true;
    }
  }
  return res;
}

const baseKeys = Object.keys(flatten(base));
function check(langObj, name) {
  const keys = Object.keys(flatten(langObj));
  const miss = baseKeys.filter((k) => !keys.includes(k));
  if (miss.length) {
    console.error(`Missing keys in ${name}: ${miss.join(', ')}`);
    process.exit(1);
  }
}

check(ru, 'ru');
check(uk, 'uk');
console.log('i18n:check ok');
