import { tokenize } from '../analysis/text';
import { hasWord } from '../analysis/dict';
import { rhymeKey } from '../analysis/rhyme';
import { t } from '../i18n';

function render(root: HTMLElement, text: string): void {
  root.innerHTML = '';
  const stanzas = text.trim().split(/\n\s*\n/);
  const stanzaSchemes: string[] = [];
  let lineNum = 1;
  stanzas.forEach((stanza) => {
    const lines = stanza.split(/\n/).filter(l => l);
    const scheme: string[] = [];
    const map: Record<string, string> = {};
    let next = 65;
    lines.forEach((line, i) => {
      const words = tokenize(line);
      const last = words[words.length - 1] || '';
      const key = rhymeKey(last, 'exact');
      let letter = map[key];
      if (!letter) { letter = String.fromCharCode(next++); map[key] = letter; }
      scheme[i] = letter;
      const lineDiv = document.createElement('div');
      lineDiv.className = 'line';
      const lnum = document.createElement('span');
      lnum.className = 'lnum';
      lnum.textContent = String(lineNum++);
      const ltext = document.createElement('span');
      ltext.className = 'ltext';
      ltext.textContent = line;
      lineDiv.appendChild(lnum);
      lineDiv.appendChild(ltext);
      const ul = document.createElement('ul');
      words.forEach(w => {
        const li = document.createElement('li');
        li.textContent = `${w}: ${hasWord(w) ? t('analysis.inDict') : t('analysis.notInDict')}`;
        ul.appendChild(li);
      });
      lineDiv.appendChild(ul);
      root.appendChild(lineDiv);
    });
    stanzaSchemes.push(scheme.join(''));
  });
  const schemeDiv = document.createElement('div');
  schemeDiv.textContent = `${t('analysis.scheme')}: ${stanzaSchemes.join(' / ')}`;
  root.prepend(schemeDiv);
}

export function initAnalysis(root: HTMLElement, editor: HTMLTextAreaElement): void {
  const update = () => render(root, editor.value);
  editor.addEventListener('input', update);
  window.addEventListener('lex-updated', update);
  update();
}
