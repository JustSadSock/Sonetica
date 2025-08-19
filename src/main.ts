import { initFonts } from './ui/fonts';

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
registerServiceWorker();
