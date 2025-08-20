import { tokenize } from './text';
import { countSyllables } from './vowels';
import { stressIndex } from './stress';

export type MeterKey = 'iamb'|'trochee'|'anapest'|'dactyl'|'amphibrach';

const PATTERNS: Record<MeterKey, (0|1)[]> = {
  iamb: [0,1],
  trochee: [1,0],
  anapest: [0,0,1],
  dactyl: [1,0,0],
  amphibrach: [0,1,0],
};

const NAMES: Record<MeterKey, string> = {
  iamb: 'ямб',
  trochee: 'хорей',
  anapest: 'анапест',
  dactyl: 'дактиль',
  amphibrach: 'амфибрахий',
};

export interface MeterResult { key: MeterKey|null; name: string; mismatches: number; expectedMask: (0|1)[]; }

export function lineStressMask(line: string): (0|1)[] {
  const words = tokenize(line);
  const mask: (0|1)[] = [];
  for (const w of words) {
    const syll = countSyllables(w);
    const idx = stressIndex(w);
    for (let i = 0; i < syll; i++) {
      mask.push(i === idx ? 1 : 0);
    }
  }
  return mask;
}

function expected(pattern: (0|1)[], len: number, offset: number): (0|1)[] {
  const arr: (0|1)[] = [];
  for (let i = 0; i < len; i++) {
    arr.push(pattern[(i + offset) % pattern.length]);
  }
  return arr;
}

export function bestMeter(mask: (0|1)[], tol: number, anacrusis: number): MeterResult {
  let best: MeterResult = { key: null, name: '', mismatches: mask.length, expectedMask: [] };
  let bestOffset = Infinity;
  (Object.keys(PATTERNS) as MeterKey[]).forEach(key => {
    const pattern = PATTERNS[key];
    for (let offset = 0; offset <= anacrusis; offset++) {
      const exp = expected(pattern, mask.length, offset);
      let mis = 0;
      for (let i = 0; i < mask.length; i++) if (mask[i] !== exp[i]) mis++;
      if (mis < best.mismatches || (mis === best.mismatches && offset < bestOffset)) {
        best = { key, name: NAMES[key], mismatches: mis, expectedMask: exp };
        bestOffset = offset;
      }
    }
  });
  if (best.mismatches <= tol) return best;
  return { key: null, name: '', mismatches: best.mismatches, expectedMask: best.expectedMask };
}
