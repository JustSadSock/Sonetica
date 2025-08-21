export function initTabs(): void {
  const layout = document.querySelector<HTMLElement>('.layout');
  const editorPanel = document.getElementById('editor-panel');
  const analysisPanel = document.getElementById('analysis-panel');
  const editorTab = document.getElementById('tab-editor');
  const analysisTab = document.getElementById('tab-analysis');
  if (!layout || !editorPanel || !analysisPanel || !editorTab || !analysisTab) return;
  const setTabState = (
    tab: HTMLButtonElement,
    panel: HTMLElement,
    selected: boolean,
  ): void => {
    tab.setAttribute('aria-selected', selected ? 'true' : 'false');
    tab.tabIndex = selected ? 0 : -1;
    panel.toggleAttribute('hidden', !selected);
    panel.setAttribute('aria-hidden', selected ? 'false' : 'true');
  };

  const select = (tab: 'editor' | 'analysis') => {
    layout.dataset.tab = tab;
    if (tab === 'editor') {
      setTabState(editorTab as HTMLButtonElement, editorPanel as HTMLElement, true);
      setTabState(analysisTab as HTMLButtonElement, analysisPanel as HTMLElement, false);
    } else {
      setTabState(analysisTab as HTMLButtonElement, analysisPanel as HTMLElement, true);
      setTabState(editorTab as HTMLButtonElement, editorPanel as HTMLElement, false);
    }
  };
  editorTab.addEventListener('click', () => select('editor'));
  analysisTab.addEventListener('click', () => select('analysis'));

  const onKey = (e: KeyboardEvent) => {
    const tabs = [editorTab as HTMLButtonElement, analysisTab as HTMLButtonElement];
    const i = tabs.indexOf(document.activeElement as HTMLButtonElement);
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault();
      const next = e.key === 'ArrowRight' ? (i + 1) % tabs.length : (i - 1 + tabs.length) % tabs.length;
      tabs[next]?.focus();
      select(next === 0 ? 'editor' : 'analysis');
    }
  };
  editorTab.addEventListener('keydown', onKey);
  analysisTab.addEventListener('keydown', onKey);

  editorTab.setAttribute('aria-controls', 'editor-panel');
  analysisTab.setAttribute('aria-controls', 'analysis-panel');

  select('editor');
}
