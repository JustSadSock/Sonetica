import { describe, it, expect } from 'vitest';
import { seedExtendedLex, lookupStress } from '../src/analysis/dict';

describe('stress lookup', () => {
  it('returns stress index for горит', () => {
    seedExtendedLex();
    expect(lookupStress('горит')).toBe(1);
  });
});
