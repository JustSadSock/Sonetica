// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { initTabs } from '../src/ui/layout';

describe('mobile tabs layout', () => {
  it('switches panels', () => {
    document.body.innerHTML = `
      <div class="layout" data-tab="editor">
        <section id="editor-panel" role="tabpanel" aria-labelledby="tab-editor" aria-hidden="false"></section>
        <section id="analysis-panel" role="tabpanel" aria-labelledby="tab-analysis" aria-hidden="true" hidden></section>
      </div>
      <div role="tablist">
        <button id="tab-editor" role="tab" tabindex="0" aria-controls="editor-panel" aria-selected="true"></button>
        <button id="tab-analysis" role="tab" tabindex="-1" aria-controls="analysis-panel" aria-selected="false"></button>
      </div>`;
    initTabs();
    const layout = document.querySelector('.layout')!;
    const editorTab = document.getElementById('tab-editor') as HTMLButtonElement;
    const analysisTab = document.getElementById('tab-analysis') as HTMLButtonElement;
    const editorPanel = document.getElementById('editor-panel')!;
    const analysisPanel = document.getElementById('analysis-panel')!;
    expect(editorTab.getAttribute('aria-selected')).toBe('true');
    expect(editorTab.tabIndex).toBe(0);
    expect(editorPanel.getAttribute('aria-hidden')).toBe('false');
    expect(!editorPanel.hasAttribute('hidden')).toBe(true);
    expect(analysisTab.getAttribute('aria-selected')).toBe('false');
    expect(analysisTab.tabIndex).toBe(-1);
    expect(analysisPanel.getAttribute('aria-hidden')).toBe('true');
    expect(analysisPanel.hasAttribute('hidden')).toBe(true);
    analysisTab.click();
    expect(layout.dataset.tab).toBe('analysis');
    expect(analysisTab.getAttribute('aria-selected')).toBe('true');
    expect(analysisTab.tabIndex).toBe(0);
    expect(editorTab.getAttribute('aria-selected')).toBe('false');
    expect(editorTab.tabIndex).toBe(-1);
    expect(analysisPanel.getAttribute('aria-hidden')).toBe('false');
    expect(!analysisPanel.hasAttribute('hidden')).toBe(true);
    expect(editorPanel.getAttribute('aria-hidden')).toBe('true');
    expect(editorPanel.hasAttribute('hidden')).toBe(true);
    analysisTab.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
    expect(layout.dataset.tab).toBe('editor');
    expect(editorTab.getAttribute('aria-selected')).toBe('true');
    expect(editorTab.tabIndex).toBe(0);
    expect(analysisTab.getAttribute('aria-selected')).toBe('false');
    expect(analysisTab.tabIndex).toBe(-1);
    expect(analysisPanel.getAttribute('aria-hidden')).toBe('true');
    expect(analysisPanel.hasAttribute('hidden')).toBe(true);
  });
});
