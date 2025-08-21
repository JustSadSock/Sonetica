import type { Lang } from '../i18n';
import { loadLang, applyTranslations } from '../i18n';
import type { Theme } from '../ui/theme';
import { setTheme as applyTheme } from '../ui/theme';
import { applyFont, loadFontPreference } from '../ui/fonts';

type Settings = {
  theme: Theme;
  font: string;
  lang: Lang;
};

let state: Settings = {
  theme: (document.documentElement.dataset.theme as Theme) || 'light',
  font: loadFontPreference(),
  lang: (globalThis as any).__bootLang || 'en'
};

const subs = new Set<(s: Settings) => void>();
function notify() { subs.forEach((cb) => cb(state)); }

export function getSettings(): Settings { return state; }
export function subscribe(cb: (s: Settings) => void): void { subs.add(cb); }

export async function setLang(lang: Lang): Promise<void> {
  await loadLang(lang);
  applyTranslations();
  document.documentElement.lang = lang;
  state = { ...state, lang };
  notify();
}

export async function setFont(font: string): Promise<void> {
  await applyFont(font);
  state = { ...state, font };
  notify();
}

export function setTheme(theme: Theme): void {
  applyTheme(theme);
  state = { ...state, theme };
  notify();
}
