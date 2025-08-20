import { isVowel } from './vowels';
import { rhymeTailFromStress } from './phonetics';
import { stressIndex } from './stress';

export type RhymeMode = 'exact'|'assonance'|'consonance';

export function rhymeKey(word: string, mode: RhymeMode): string {
  const idx = stressIndex(word);
  const tail = rhymeTailFromStress(word, idx);
  if (mode === 'assonance') {
    return [...tail].filter(c => isVowel(c)).join('');
  }
  if (mode === 'consonance') {
    return [...tail].filter(c => !isVowel(c)).join('');
  }
  return tail;
}

export function rhymeScore(a: string, b: string): number {
  let i = 0;
  while (i < a.length && i < b.length) {
    if (a[a.length - 1 - i] !== b[b.length - 1 - i]) break;
    i++;
  }
  return i;
}
