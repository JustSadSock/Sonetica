import { loadFamily } from '../fonts/loader';

export const fonts = [
  'Noto Serif',
  'PT Serif',
  'IBM Plex Serif',
  'Merriweather',
  'STIX Two Text'
];

export function initFonts(): Promise<void> {
  return applyFont(loadFontPreference());
}

export async function applyFont(label: string): Promise<void> {
  // Загружаем гарнитуру (все основные варианты), объявленную в fonts.css
  await loadFamily(label);
  document.documentElement.style.setProperty('--app-font', `'${label}', serif`);
  try { localStorage.setItem('sonetica-font', label); } catch {}
}

export function loadFontPreference(): string {
  try {
    return localStorage.getItem('sonetica-font') || fonts[0]!;
  } catch {
    return fonts[0]!;
  }
}
