import { describe, it, expect } from 'vitest';
import { countSyllables } from '../vowels';

describe('countSyllables', () => {
  it('counts Cyrillic vowels including yo and i', () => {
    const YO = '\u0435\u0308';
    expect(countSyllables('умчалась')).toBe(3);
    expect(countSyllables('плывёт')).toBe(2);
    expect(countSyllables(`по${YO}т`)).toBe(2);
    expect(countSyllables('вьюга')).toBe(2);
    expect(countSyllables('и')).toBe(1);
    expect(countSyllables('всё')).toBe(1);
  });
});
