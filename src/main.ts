import './styles/base.css';
import { fonts, initFonts, applyFont, loadFontPreference } from './ui/fonts';

function setupFontSelector(): void {
  const select = document.getElementById('fontSelect') as HTMLSelectElement | null;
  if (!select) return;
  fonts.forEach((label) => {
    const opt = document.createElement('option');
    opt.value = label;
    opt.textContent = label;
    select.appendChild(opt);
  });
  const current = loadFontPreference();
  select.value = current;
  applyFont(current);
  select.addEventListener('change', () => applyFont(select.value));
}

function registerServiceWorker(): void {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js').catch(() => {
        // ignore failures in development
      });
    });
  }
}

initFonts();
setupFontSelector();
registerServiceWorker();
