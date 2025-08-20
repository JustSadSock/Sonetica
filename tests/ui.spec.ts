// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { setTheme } from '../src/ui/theme';
import { applyFont } from '../src/ui/fonts';

describe('theme', () => {
  it('sets data-theme attribute', () => {
    setTheme('dark');
    expect(document.body.dataset.theme).toBe('dark');
    setTheme('light');
    expect(document.body.dataset.theme).toBe('light');
  });
});

describe('font', () => {
  it('updates css variable', () => {
    applyFont('PT Serif');
    expect(document.documentElement.style.getPropertyValue('--app-font')).toContain('PT Serif');
  });
});
