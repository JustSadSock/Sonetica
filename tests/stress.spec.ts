import { describe, it, expect } from 'vitest';
import { seedExtendedLex, lookupStress } from '../src/analysis/dict';

describe('stress lookup', () => {
  it('returns stress index for words including variants', () => {
    seedExtendedLex();
    expect(lookupStress('горит')).toBe(1);
    expect(lookupStress('ДРОЖИ́Т')).toBe(1);
    expect(lookupStress('дрожит')).toBe(1);
  });
});
