// Загрузка гарнитуры через CSS Font Loading API, без прямых URL.
// Мы уже подключили public/assets/fonts/fonts.css, который объявляет @font-face для всех весов.
// Здесь просто гарантируем, что нужные варианты подгружены, прежде чем применять их в UI.

const cache: Record<string, Promise<void>> = Object.create(null);

const variants: Array<[string, number]> = [
  ['normal', 400],
  ['normal', 700],
  ['italic', 400],
  ['italic', 700],
];

export function loadFamily(family: string): Promise<void> {
  if (Object.prototype.hasOwnProperty.call(cache, family)) return cache[family];
  const fonts = (document as any).fonts;
  const p = Promise.all(
    variants.map(([style, weight]) => {
      // спецификация допускает строку формата "italic 700 1em Family"
      const face = `${style} ${weight} 1em "${family}"`;
      return fonts?.load ? fonts.load(face) : Promise.resolve();
    })
  ).then(() => {});
  cache[family] = p;
  return p;
}
