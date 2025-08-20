import { initFonts } from './ui/fonts';

function registerServiceWorker(): void {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
      try {
        await navigator.serviceWorker.register('sw.js');
      } catch {
        return; // ignore failures in development
      }
      navigator.serviceWorker.addEventListener('message', (ev) => {
        if (ev.data?.type === 'sw-updated') showUpdatePrompt();
      });
    });
  }
}

function showUpdatePrompt(): void {
  const bar = document.createElement('div');
  bar.textContent = 'Доступна новая версия';
  const btn = document.createElement('button');
  btn.textContent = 'Обновить';
  btn.onclick = () => location.reload();
  Object.assign(bar.style, {
    position: 'fixed', bottom: '10px', left: '10px',
    background: '#fff', border: '1px solid #b79a4b',
    padding: '8px 12px', borderRadius: '6px',
    boxShadow: '0 2px 6px #0002', zIndex: '1000'
  });
  bar.appendChild(btn);
  document.body.appendChild(bar);
}

initFonts();
registerServiceWorker();
