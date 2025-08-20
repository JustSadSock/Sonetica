import { describe, it, expect } from 'vitest';
import { lineStressMask, bestMeter } from '../meter';
import { stanzaScheme } from '../stanza';

describe('meter detection', () => {
  const tol = 1;
  const an = 1;
  const iambLines = [
    'Взошла заря и тьма умчалась',
    'Скользит лучом по крышам свет',
    'Леса дрожат, проснулась малость',
    'И новый день приносит след',
  ];
  it('detects iamb', () => {
    iambLines.forEach(line => {
      const mask = lineStressMask(line);
      const res = bestMeter(mask, tol, an);
      expect(res.key).toBe('iamb');
      expect(res.mismatches).toBeLessThanOrEqual(tol);
    });
  });

  const trocheeLines = [
    'Тихий звон плывёт из дома',
    'Вечер стягивает дым',
    'Город дышит сонным гномом',
    'Тихо стучит снег над ным',
  ];
  it('detects trochee', () => {
    const tolT = 2;
    trocheeLines.forEach(line => {
      const mask = lineStressMask(line);
      const res = bestMeter(mask, tolT, an);
      expect(res.key).toBe('trochee');
      expect(res.mismatches).toBeLessThanOrEqual(tolT);
    });
  });
});

describe('stanza scheme', () => {
  it('computes ABAB', () => {
    const lines = [
      'Взошла заря и тьма умчалась',
      'Скользит лучом по крышам свет',
      'Леса дрожат, проснулась малость',
      'И новый день приносит след',
    ];
    const scheme = stanzaScheme(lines, 'exact', 2);
    expect(scheme).toBe('ABAB');
  });
});
