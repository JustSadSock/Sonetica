import { describe, it, expect } from 'vitest';
import { seedMiniLex, mergeLex, hasWord, lookupStress } from '../src/analysis/dict';

describe('dictionary merging', () => {
  it('adds new words and preserves stress', () => {
    seedMiniLex();
    expect(hasWord('горит')).toBe(false);
    mergeLex([
      ['горит', 1],
      ['дрожит', 1]
    ]);
    expect(hasWord('горит')).toBe(true);
    expect(lookupStress('дрожит')).toBe(1);
  });
});
