export interface LexEntry { st: number; f?: number }

const LEX = new Map<string, LexEntry>();

const POEM_WORDS: [string, number][] = [
  ['взошла',1],['заря',1],['и',-1],['тьма',0],['умчалась',1],['скользит',1],['лучом',1],['по',-1],
  ['крышам',0],['свет',0],['леса',1],['дрожат',1],['проснулась',1],['малость',0],['новый',0],['день',0],
  ['приносит',1],['след',0],['тихий',0],['звон',0],['плывёт',1],['из',-1],['дома',0],['вечер',0],
  ['стягивает',0],['дым',0],['город',0],['дышит',0],['сонным',0],['гномом',0],['тихо',0],['стучит',0],
  ['снег',0],['над',-1],['ным',0],['звонит',1]
];

const DEMO_LEX_MIN = [
  "любовь","кровь","сон","дождь","окно","огонь","порог","дорога","берёза","мороз","весна","луна","земля","лес","река",
  "вечер","смех","тень","судьба","звезда","поэт","муза","стих","радость","печаль","свобода","вода","слова","мост","простор","покой","звонит"
];
const DEMO_STRESS: Record<string, number> = {
  "любовь":0,"кровь":0,"сон":0,"дождь":0,"окно":1,"огонь":1,"порог":1,"дорога":1,"берёза":1,"мороз":1,"весна":1,"луна":1,"земля":1,
  "лес":0,"река":1,"вечер":0,"смех":0,"тень":0,"судьба":1,"звезда":1,"поэт":1,"муза":0,"стих":0,"радость":0,"печаль":0,
  "свобода":2,"вода":1,"слова":1,"мост":0,"простор":1,"покой":1,"звонит":1
};

export function seedMiniLex(): void {
  LEX.clear();
  for (const [w, st] of POEM_WORDS) {
    LEX.set(w, { st, f: 90 });
  }
  for (const w of DEMO_LEX_MIN) {
    LEX.set(w, { st: DEMO_STRESS[w] ?? 0, f: 100 });
  }
}

export function seedExtendedLex(): void {
  seedMiniLex();
  const EXTRA: [string, number][] = [
    ["люблю",1],["кровавый",1],["огнём",1],["берега",2],["берег",0],["мостом",1],["простом",1],["порогом",1],
    ["луной",1],["лунами",1],["реки",1],["окна",1],["окне",1],["век",0],["вечный",0],["зов",0],["молчание",1],
    ["гроза",1],["трава",1],["земной",1],["высокий",1],["глубокий",1],["тихий",0],["гордый",0],["свет",0],["тень",0],
    ["свободой",2],["слезой",1],["письмо",1],["перо",1],["строка",1],["рифма",0],["ритм",0],
    ["ночь",0],["день",0],["раны",0],["раны́",1],["песни",0],["экран",1],["стекло",1],["огня",1],
    ["судьбой",1],["звездой",1],["ветер",0],["камень",0],["вода",1],["виной",1],["дороги",1],["дорогой",2],
  ];
  for (const [w, st] of EXTRA) {
    LEX.set(w, { st, f: 80 });
  }
}

seedMiniLex();

const OV_KEY = 'sonetica_overrides_v1';
let OV: Record<string, number> = {};

export function loadOverrides(): void {
  if (typeof localStorage === 'undefined') return;
  try { OV = JSON.parse(localStorage.getItem(OV_KEY) || '{}'); }
  catch { OV = {}; }
}

function persistOverrides(): void {
  if (typeof localStorage === 'undefined') return;
  try { localStorage.setItem(OV_KEY, JSON.stringify(OV)); } catch {}
}

export function setOverride(word: string, idx: number): void {
  OV[word.toLowerCase()] = idx;
  persistOverrides();
}

export function overrides(): Record<string, number> { return OV; }

export function lookupStress(word: string): number | undefined {
  const w = word.toLowerCase();
  return OV[w] ?? LEX.get(w)?.st;
}

export function hasWord(word: string): boolean {
  return LEX.has(word.toLowerCase());
}

export function allWords(): IterableIterator<[string, LexEntry]> {
  return LEX.entries();
}

loadOverrides();
