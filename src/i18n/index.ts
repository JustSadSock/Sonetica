export type Lang = 'en' | 'ru' | 'uk';

const cache: Record<Lang, Record<string, string>> = { en: {}, ru: {}, uk: {} };
let current: Lang = 'en';
const KEY = 'sonetica-lang';

function flatten(obj: any, prefix = ''): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (typeof v === 'string') out[key] = v;
    else Object.assign(out, flatten(v, key));
  }
  return out;
}

export async function loadLang(lang: Lang): Promise<void> {
  if (Object.keys(cache[lang]).length === 0) {
    const res = await fetch(`/i18n/${lang}.json`);
    const data = await res.json();
    cache[lang] = flatten(data);
  }
  current = lang;
  try { localStorage.setItem(KEY, lang); } catch {}
}

export function applyTranslations(): void {
  document.querySelectorAll<HTMLElement>('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (key) el.textContent = t(key);
  });
  document.querySelectorAll<HTMLElement>('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (key) (el as HTMLInputElement | HTMLTextAreaElement).setAttribute('placeholder', t(key));
  });
}

export function t(key: string): string {
  const val = cache[current][key];
  if (val == null) {
    console.warn(`Missing i18n key: ${key}`);
    return key;
  }
  return val;
}

export function getLang(): Lang {
  return current;
}

export async function initLang(): Promise<void> {
  const boot = (globalThis as any).__bootLang as Lang | undefined;
  await loadLang(boot ?? 'en');
  applyTranslations();
}
