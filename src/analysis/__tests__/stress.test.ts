import { describe, it, expect } from 'vitest';
import { stressIndex } from '../stress';

const COMBINING_ACUTE = '\u0301';

describe('stressIndex', () => {
  it('detects stress via apostrophe', () => {
    expect(stressIndex("звони'т")).toBe(1);
  });
  it('detects stress via combining acute', () => {
    expect(stressIndex(`звони${COMBINING_ACUTE}т`)).toBe(1);
  });
  it('detects stress via combining acute without dict', () => {
    expect(stressIndex(`молок${COMBINING_ACUTE}о`)).toBe(2);
  });
  it('handles yo as stressed', () => {
    expect(stressIndex('ёлка')).toBe(0);
  });
  it('treats зво́нит as last stressed', () => {
    expect(stressIndex(`зво${COMBINING_ACUTE}нит`)).toBe(1);
  });
  it('uses dictionary when unmarked', () => {
    expect(stressIndex('звонит')).toBe(1);
  });
});

