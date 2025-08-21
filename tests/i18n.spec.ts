// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest';
import { loadLang, t, getLang, applyTranslations } from '../src/i18n';
import fs from 'node:fs';

// mock fetch to serve local dictionaries
(global as any).fetch = async (url: string) => {
  const data = JSON.parse(fs.readFileSync(`public${url}`, 'utf8'));
  return { json: async () => data } as Response;
};

describe('i18n', () => {
  it('loads and switches languages', async () => {
    await loadLang('en');
    expect(getLang()).toBe('en');
    expect(t('settings.title')).toBe('Settings');

    await loadLang('ru');
    expect(getLang()).toBe('ru');
    expect(t('settings.title')).toBe('Настройки');

    await loadLang('uk');
    expect(getLang()).toBe('uk');
    expect(t('settings.title')).toBe('Налаштування');
  });

  it('warns when key missing', async () => {
    await loadLang('en');
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    expect(t('no.such.key')).toBe('no.such.key');
    expect(warn).toHaveBeenCalled();
    warn.mockRestore();
  });

  it('applies DOM translations', async () => {
    document.body.innerHTML = '<span data-i18n="settings.title"></span>';
    await loadLang('en');
    applyTranslations();
    expect(document.body.textContent).toContain('Settings');
  });
});
