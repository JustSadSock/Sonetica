import { tokenize } from './text';
import { rhymeKey, rhymeScore, RhymeMode } from './rhyme';

export function splitStanzas(text: string): string[][] {
  return text
    .trim()
    .split(/\r?\n\s*\r?\n/)
    .map(st => st.split(/\r?\n/).filter(l => l.trim().length > 0));
}

export function stanzaScheme(lines: string[], mode: RhymeMode, minTail: number): string {
  const keys: string[] = [];
  const labels: string[] = [];
  let nextChar = 65; // 'A'
  lines.forEach(line => {
    const words = tokenize(line);
    const last = words[words.length - 1] || '';
    const key = rhymeKey(last, mode);
    let label = '';
    for (let i = 0; i < keys.length; i++) {
      if (rhymeScore(key, keys[i]) >= minTail) { label = labels[i]; break; }
    }
    if (!label) { label = String.fromCharCode(nextChar++); keys.push(key); }
    labels.push(label);
  });
  return labels.join('');
}
