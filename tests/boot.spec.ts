// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { applyBootSettings } from '../src/state/boot';

describe('boot settings', () => {
  it('applies stored preferences before app init', () => {
    localStorage.setItem('sonetica-theme','dark');
    localStorage.setItem('sonetica-font','PT Serif');
    localStorage.setItem('sonetica-lang','ru');
    applyBootSettings();
    expect(document.documentElement.dataset.theme).toBe('dark');
    expect(document.documentElement.style.getPropertyValue('--app-font')).toContain('PT Serif');
    // @ts-ignore
    expect(window.__bootLang).toBe('ru');
  });
});
