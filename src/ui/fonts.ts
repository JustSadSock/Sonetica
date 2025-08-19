export const fonts = [
  'Noto Serif',
  'PT Serif',
  'IBM Plex Serif',
  'Merriweather',
  'STIX Two Text'
];

export function initFonts(): void {
  applyFont(loadFontPreference());
}

export function applyFont(label: string): void {
  document.documentElement.style.setProperty('--app-font', `'${label}', serif`);
  localStorage.setItem('sonetica-font', label);
}

export function loadFontPreference(): string {
  return localStorage.getItem('sonetica-font') || fonts[0]!;
}
