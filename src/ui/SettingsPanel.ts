import { subscribe, setLang, setTheme, setFont, getSettings } from '../state/settings';
import { fonts } from './fonts';
import { t } from '../i18n';
import { mergeLex } from '../analysis/dict';

export function initSettingsPanel(root: HTMLElement): void {
  const langSel = root.querySelector<HTMLSelectElement>('select[name="lang"]');
  const themeSel = root.querySelector<HTMLSelectElement>('select[name="theme"]');
  const fontSel = root.querySelector<HTMLSelectElement>('select[name="font"]');
  const dictInput = root.querySelector<HTMLInputElement>('input[name="dict"]');
  const dictBtn = root.querySelector<HTMLButtonElement>('button[name="loadDict"]');

  // populate font options
  fonts.forEach(f => {
    const o = document.createElement('option');
    o.value = f; o.textContent = f;
    fontSel?.appendChild(o);
  });

  // sync with state
  subscribe(s => {
    if (langSel) langSel.value = s.lang;
    if (themeSel) themeSel.value = s.theme;
    if (fontSel && !fontSel.disabled) fontSel.value = s.font;
  });
  const st = getSettings();
  if (langSel) langSel.value = st.lang;
  if (themeSel) themeSel.value = st.theme;
  if (fontSel) fontSel.value = st.font;

  langSel?.addEventListener('change', e => setLang((e.target as HTMLSelectElement).value as any));
  themeSel?.addEventListener('change', e => setTheme((e.target as HTMLSelectElement).value as any));
  fontSel?.addEventListener('change', async e => {
    const val = (e.target as HTMLSelectElement).value;
    if (!fontSel) return;
    fontSel.disabled = true;
    const opt = fontSel.options[fontSel.selectedIndex];
    const prev = opt.textContent;
    opt.textContent = t('ui.loading');
    try {
      await setFont(val);
    } finally {
      fontSel.disabled = false;
      opt.textContent = prev || val;
    }
  });

  dictBtn?.addEventListener('click', async () => {
    const url = dictInput?.value.trim();
    if (!url) return;
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (Array.isArray(data)) {
        mergeLex(data);
        window.dispatchEvent(new CustomEvent('lex-updated'));
        alert(t('settings.loaded'));
      } else {
        throw new Error('bad');
      }
    } catch {
      alert(t('settings.loadError'));
    }
  });
}
