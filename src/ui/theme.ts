export type Theme = 'light' | 'dark';
const KEY = 'sonetica-theme';

export function setTheme(t: Theme): void {
  if (t === 'dark') enableDark();
  else enableLight();
}

export function loadTheme(): Theme {
  let t: Theme = 'light';
  try {
    const stored = localStorage.getItem(KEY) as Theme | null;
    if (stored === 'dark') t = 'dark';
  } catch {}
  setTheme(t);
  return t;
}

export function enableDark(): void {
  document.documentElement.dataset.theme = 'dark';
  const r = document.documentElement.style;
  r.setProperty('--paper','#101110');
  r.setProperty('--paper2','#171917');
  r.setProperty('--ink','#EDEBE6');
  r.setProperty('--ink2','#C7C0B5');
  r.setProperty('--sep','#2a2c2a');
  r.setProperty('--gold','#8e824d');
  r.setProperty('--accent','#8aa0e6');
  setThemeColor('#101110');
  try { localStorage.setItem(KEY,'dark'); } catch {}
}

export function enableLight(): void {
  document.documentElement.dataset.theme = 'light';
  document.documentElement.style.cssText='';
  setThemeColor('#b79a4b');
  try { localStorage.setItem(KEY,'light'); } catch {}
}

function setThemeColor(hex: string): void {
  let meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('name', 'theme-color');
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', hex);
}

export function toggleTheme(): void {
  const current = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
  setTheme(current === 'dark' ? 'light' : 'dark');
}
