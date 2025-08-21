// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { initEditor, DEMO_TEXT } from '../src/ui/editor';
import { loadLang } from '../src/i18n';

// mock fetch for i18n
(global as any).fetch = async () => ({ json: async () => ({ ui: { ok: 'OK', error: 'Error' } }) }) as Response;
// stub alert
// @ts-ignore
global.alert = () => {};

beforeEach(async () => {
  await loadLang('en');
});

describe('editor', () => {
  it('inserts demo text when empty', () => {
    const ta = document.createElement('textarea');
    initEditor(ta);
    expect(ta.value).toBe(DEMO_TEXT);
  });

  it('copies text to clipboard', async () => {
    const ta = document.createElement('textarea');
    ta.value = 'abc';
    const btn = document.createElement('button');
    const write = vi.fn().mockResolvedValue(undefined);
    // @ts-ignore
    global.navigator.clipboard = { writeText: write };
    initEditor(ta, btn);
    btn.click();
    await Promise.resolve();
    expect(write).toHaveBeenCalledWith('abc');
  });
});
