import { describe, it, expect } from 'vitest';
import { lineStressMask, bestMeter } from '../src/analysis/meter';
import { tokenize } from '../src/analysis/text';
import { rhymeKey } from '../src/analysis/rhyme';
import { seedExtendedLex } from '../src/analysis/dict';

const poem = [
  'Ти́хий зво́н плывё́т из до́ма,',
  'Све́тлый па́мятный огнь гори́т.',
  'Над поля́ми ве́ет ко́мья,',
  'И душа́ моя́ дрожи́т.'
];

seedExtendedLex();

describe('meter and rhyme', () => {
  it('detects trochee with 8 syllables and AABB rhyme', () => {
    const masks = poem.map(lineStressMask);
    masks.forEach((m, i) => {
      if (i < 3) expect(m.length).toBe(8);
      else expect(m.length).toBeGreaterThanOrEqual(7);
      const mres = bestMeter(m, 1, 0);
      expect(mres.key).not.toBeNull();
      expect(mres.mismatches).toBeLessThanOrEqual(1);
    });
    const lastWords = poem.map(l => {
      const words = tokenize(l);
      return words[words.length - 1];
    });
    const tails = lastWords.map(w => rhymeKey(w, 'exact'));
    // Lines 2 and 4 rhyme on "-ит"
    expect(tails[1]).toBe(tails[3]);
  });
});
