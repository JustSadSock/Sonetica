import { describe, it, expect } from 'vitest';
import { loadLang, t, getLang } from '../src/i18n';

// mock fetch to serve local dictionaries
const responses: Record<string, any> = {
  '/i18n/en.json': { hello: 'Hello' },
  '/i18n/ru.json': { hello: 'Привет' },
  '/i18n/uk.json': { hello: 'Привіт' }
};

global.fetch = async (url: string) => {
  return {
    async json() {
      return responses[url as string];
    }
  } as Response;
};

describe('i18n', () => {
  it('loads and switches languages', async () => {
    await loadLang('en');
    expect(getLang()).toBe('en');
    expect(t('hello')).toBe('Hello');

    await loadLang('ru');
    expect(getLang()).toBe('ru');
    expect(t('hello')).toBe('Привет');

    await loadLang('uk');
    expect(getLang()).toBe('uk');
    expect(t('hello')).toBe('Привіт');
  });
});
