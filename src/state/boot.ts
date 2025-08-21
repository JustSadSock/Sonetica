export function applyBootSettings(): void {
  try {
    const theme = localStorage.getItem('sonetica-theme');
    if (theme) document.documentElement.dataset.theme = theme;
    const font = localStorage.getItem('sonetica-font');
    if (font) document.documentElement.style.setProperty('--app-font', `'${font}', serif`);
    (globalThis as any).__bootLang = localStorage.getItem('sonetica-lang') || 'en';
  } catch {
    (globalThis as any).__bootLang = 'en';
  }
}
