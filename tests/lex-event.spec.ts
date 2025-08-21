// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest';
import { initSettingsPanel } from '../src/ui/SettingsPanel';

// mock fetch for dictionary
const dict = [['горит',1]] as [string, number][];
// @ts-ignore
global.fetch = vi.fn(async () => ({ json: async () => dict })) as any;
// mock alert
// @ts-ignore
global.alert = () => {};

describe('dictionary load event', () => {
  it('dispatches lex-updated', async () => {
    document.body.innerHTML = `
      <div id="root">
        <select name="lang"></select>
        <select name="theme"></select>
        <select name="font"></select>
        <div class="dict"><input name="dict"/><button name="loadDict" type="button"></button></div>
      </div>`;
    const root = document.getElementById('root')!;
    initSettingsPanel(root);
    const spy = vi.fn();
    window.addEventListener('lex-updated', spy);
    (root.querySelector('input[name="dict"]') as HTMLInputElement).value = 'https://example.com/dict.json';
    (root.querySelector('button[name="loadDict"]') as HTMLButtonElement).click();
    await Promise.resolve();
    await Promise.resolve();
    expect(spy).toHaveBeenCalled();
  });
});
