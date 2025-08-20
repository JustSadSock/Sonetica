import { stripCombining } from './text';
import { isVowel } from './vowels';
import { stressIndex } from './stress';

export function g2pLite(word: string, stressIdx: number = stressIndex(word)): string {
  let w = stripCombining(word.toLowerCase());
  w = w.replace(/[ъь]/g, '');
  w = w.replace(/щ/g, 'шч');
  w = w.replace(/ё/g, 'о');
  let v = -1;
  let out = '';
  for (const ch of w) {
    if (isVowel(ch)) {
      v++;
      let repl = ch;
      if (ch === 'о' && v !== stressIdx) repl = 'а';
      if (ch === 'е' && v !== stressIdx) repl = 'и';
      out += repl;
    } else {
      out += ch;
    }
  }
  const final = { б:'п', в:'ф', г:'к', д:'т', ж:'ш', з:'с' } as const;
  out = out.replace(/[бвгджз]$/g, c => final[c as keyof typeof final]);
  out = out.replace(/([сшжчщ])т$/u, '$1');
  return out;
}

export function rhymeTailFromStress(word: string, stressIdx: number): string {
  const ph = g2pLite(word, stressIdx);
  let v = -1;
  for (let i = 0; i < ph.length; i++) {
    const ch = ph[i];
    if (isVowel(ch)) {
      v++;
      if (v === stressIdx) {
        return ph.slice(i);
      }
    }
  }
  return ph;
}
