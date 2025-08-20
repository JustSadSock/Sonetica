export type Lang = 'en' | 'ru' | 'uk';

const cache: Record<Lang, Record<string,string>> = { en: {}, ru: {}, uk: {} };
let current: Lang = 'en';

export async function loadLang(lang: Lang): Promise<void> {
  if (Object.keys(cache[lang]).length === 0) {
    const res = await fetch(`/i18n/${lang}.json`);
    const data = await res.json();
    cache[lang] = data;
  }
  current = lang;
}

export function t(key: string): string {
  return cache[current][key] ?? key;
}

export function getLang(): Lang {
  return current;
}
