import { initFonts } from './ui/fonts';
import { initLang, t } from './i18n';
import { seedExtendedLex } from './analysis/dict';
import { initSettingsPanel } from './ui/SettingsPanel';
import { initEditor } from './ui/editor';
import { initTabs } from './ui/layout';
import { initAnalysis } from './ui/analysis';

async function boot() {
  await initLang();
  document.documentElement.lang = (window as any).__bootLang ?? 'en';
  await initFonts();
  seedExtendedLex();
  const settingsRoot = document.getElementById('settings-panel');
  if (settingsRoot) initSettingsPanel(settingsRoot);
  const editor = document.getElementById('editor') as HTMLTextAreaElement | null;
  const copyBtn = document.getElementById('copy-btn') as HTMLButtonElement | null;
  if (editor) initEditor(editor, copyBtn || undefined);
  const analysisRoot = document.getElementById('analysis-panel');
  if (editor && analysisRoot) initAnalysis(analysisRoot, editor);
  initTabs();
  registerServiceWorker();
}

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
  bar.textContent = t('ui.updateReady');
  const btn = document.createElement('button');
  btn.textContent = t('ui.reload');
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

boot();
