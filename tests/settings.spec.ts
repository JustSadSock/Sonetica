// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { getSettings, setTheme, setFont, setLang } from '../src/state/settings';

// mock FontFace
// @ts-ignore
global.FontFace = class { constructor() {} load() { return Promise.resolve(this); } };
// @ts-ignore
document.fonts = { add: () => {} };

// mock fetch for i18n
global.fetch = async () => ({ json: async () => ({}) }) as Response;

describe('settings state', () => {
  it('applies theme, font and language', async () => {
    await setFont('PT Serif');
    setTheme('dark');
    await setLang('uk');
    const s = getSettings();
    expect(s.font).toBe('PT Serif');
    expect(s.theme).toBe('dark');
    expect(s.lang).toBe('uk');
    expect(localStorage.getItem('sonetica-font')).toBe('PT Serif');
    expect(localStorage.getItem('sonetica-lang')).toBe('uk');
    expect(document.documentElement.dataset.theme).toBe('dark');
    expect(document.documentElement.lang).toBe('uk');
  });
});
