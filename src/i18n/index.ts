export type Lang = 'en' | 'ru' | 'uk';

const cache: Record<Lang, Record<string,string>> = { en: {}, ru: {}, uk: {} };
let current: Lang = 'en';
const KEY = 'sonetica-lang';

export async function loadLang(lang: Lang): Promise<void> {
  if (Object.keys(cache[lang]).length === 0) {
    const res = await fetch(`/i18n/${lang}.json`);
    const data = await res.json();
    cache[lang] = data;
  }
  current = lang;
  try { localStorage.setItem(KEY, lang); } catch {}
}

export function t(key: string): string {
  return cache[current][key] ?? key;
}

export function getLang(): Lang {
  return current;
}

export async function initLang(): Promise<void> {
  let lang: Lang = 'en';
  try {
    const stored = localStorage.getItem(KEY) as Lang | null;
    if (stored) lang = stored;
  } catch {}
  await loadLang(lang);
}
