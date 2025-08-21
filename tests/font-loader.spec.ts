// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest';
import { loadFamily } from '../src/fonts/loader';

describe('font loader', () => {
  it('caches repeated loads', async () => {
    const loadSpy = vi.fn().mockResolvedValue({});
    // @ts-ignore
    document.fonts = { load: loadSpy };
    await loadFamily('Foo');
    await loadFamily('Foo');
    // Первый вызов запрашивает 4 варианта (400/700, normal/italic)
    expect(loadSpy).toHaveBeenCalledTimes(4);
    // Второй вызов берётся из кэша (0 дополнительных вызовов)
    await loadFamily('Foo');
    expect(loadSpy).toHaveBeenCalledTimes(4);
  });
});
