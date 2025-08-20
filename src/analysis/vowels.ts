import { stripCombining } from './text';

export const VOWELS = new Set([
  'а','е','ё','и','о','у','ы','э','ю','я'
]);

export function isVowel(ch: string): boolean {
  const base = stripCombining(ch.toLowerCase());
  return VOWELS.has(base);
}

export function countSyllables(word: string): number {
  const nfd = word.toLowerCase().normalize('NFD');
  let count = 0;
  for (let i = 0; i < nfd.length; i++) {
    const ch = nfd[i];
    const next = nfd[i + 1];
    if (ch === 'и' && next === '\u0306') { // skip й
      i++;
      continue;
    }
    if (ch === 'е' && next === '\u0308') { // decomposed ё
      count++;
      i++;
      while (i + 1 < nfd.length && /[\u0300-\u036f]/.test(nfd[i + 1])) i++;
      continue;
    }
    if (VOWELS.has(ch)) {
      count++;
      while (i + 1 < nfd.length && /[\u0300-\u036f]/.test(nfd[i + 1])) i++;
    }
  }
  return count;
}
