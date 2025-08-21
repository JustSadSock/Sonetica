import { t } from '../i18n';

export const DEMO_TEXT = `Ти́хий зво́н плывё́т из до́ма,
Све́тлый па́мятный огнь гори́т.
Над поля́ми ве́ет ко́мья,
И душа́ моя́ дрожи́т.`;

export function initEditor(el: HTMLTextAreaElement, copyBtn?: HTMLButtonElement): void {
  if (!el.value) el.value = DEMO_TEXT;
  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(el.value);
        alert(t('ui.ok'));
      } catch {
        alert(t('ui.error'));
      }
    });
  }
}
