import { countSyllables, isVowel } from './vowels';
import { stripCombining, toNFC } from './text';
import { lookupStress } from './dict';

export function stressIndex(wordRaw: string): number {
  const lower = toNFC(wordRaw.toLowerCase());
  const nfd = lower.normalize('NFD');
  let vowelIdx = -1;
  let accentIdx: number | undefined;
  for (let i = 0; i < nfd.length; i++) {
    const ch = nfd[i];
    const next = nfd[i + 1];
    if (ch === 'е' && next === '\u0308') { // decomposed ё
      vowelIdx++;
      return vowelIdx;
    }
    const base = stripCombining(ch);
    if (isVowel(base)) {
      vowelIdx++;
      if (next === "'" || next === '’') return vowelIdx;
      if (next && /[\u0301\u0300]/.test(next)) accentIdx = vowelIdx;
    }
  }
  const plain = stripCombining(lower);
  const dictIdx = lookupStress(plain);
  if (dictIdx !== undefined) return dictIdx;
  if (accentIdx !== undefined) return accentIdx;
  const syll = countSyllables(plain);
  if (syll <= 0) return -1;
  return syll === 1 ? 0 : syll - 1;
}
