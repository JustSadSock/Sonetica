export function toNFC(s: string): string {
  return s.normalize('NFC');
}

export function stripCombining(s: string): string {
  return s
    .normalize('NFD')
    .replace(/и\u0306/g, 'й')
    .replace(/е\u0308/g, 'ё')
    .replace(/Е\u0308/g, 'Ё')
    .replace(/[\u0300-\u036f]/g, '')
    .normalize('NFC');
}

export function tokenize(line: string): string[] {
  const clean = stripCombining(toNFC(line.toLowerCase()));
  const words = clean.match(/[a-яё]+/g);
  return words ? words : [];
}
