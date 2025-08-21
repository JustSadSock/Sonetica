// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest';
import { setTheme } from '../src/ui/theme';
import { applyFont } from '../src/ui/fonts';

describe('theme', () => {
  it('sets data-theme attribute', () => {
    setTheme('dark');
    expect(document.documentElement.dataset.theme).toBe('dark');
    setTheme('light');
    expect(document.documentElement.dataset.theme).toBe('light');
  });
});

describe('font', () => {
  it('updates css variable', async () => {
    // Мокаем CSS Font Loading API
    const load = vi.fn().mockResolvedValue({});
    // @ts-ignore
    document.fonts = { load };
    await applyFont('PT Serif');
    expect(document.documentElement.style.getPropertyValue('--app-font')).toContain('PT Serif');
    expect(load).toHaveBeenCalled();
  });
});
