import { describe, it, expect } from 'vitest';
import { countSyllables } from '../src/analysis/vowels';

describe('syllable counter', () => {
  it('handles ё, accents and punctuation', () => {
    expect(countSyllables('лёгкий')).toBe(2);
    expect(countSyllables('зима́')).toBe(2);
    expect(countSyllables('мир!')).toBe(1);
  });
});
