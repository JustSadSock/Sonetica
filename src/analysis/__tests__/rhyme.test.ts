import { describe, it, expect } from 'vitest';
import { rhymeKey, rhymeScore } from '../rhyme';

describe('rhyme', () => {
  it('matches умчалась-малость', () => {
    const a = rhymeKey('умчалась', 'exact');
    const b = rhymeKey('малость', 'exact');
    expect(a).toBe(b);
  });
  it('distinguishes non-rhyming words', () => {
    const a = rhymeKey('умчалась', 'exact');
    const b = rhymeKey('свет', 'exact');
    expect(rhymeScore(a, b)).toBe(0);
  });
  it('matches свет-след', () => {
    const a = rhymeKey('свет', 'exact');
    const b = rhymeKey('след', 'exact');
    expect(rhymeScore(a, b)).toBeGreaterThan(0);
  });
});

