function updateStats() {
  const img = document.getElementById('img');
  const rect = img.getBoundingClientRect();
  const stats = document.getElementById('stats');
  const dpr = window.devicePixelRatio || 1;
  const vw = document.documentElement.clientWidth;
  const vwUsable = vw - 32; // 左右16pxの余白込みの実効幅
  const scale = rect.width / img.naturalWidth;
  stats.innerHTML = [
    `デバイスPixel比 (DPR): <code>${dpr}</code>`,
    `ビューポート幅: <code>${vw}px</code> / 実効画像領域: <code>${Math.round(vwUsable)}px</code>`,
    `画像の自然サイズ: <code>${img.naturalWidth}×${img.naturalHeight}px</code>`,
    `現在の描画サイズ: <code>${Math.round(rect.width)}×${Math.round(rect.height)}px</code>`,
    `縮小率（描画/自然）: <code>${scale.toFixed(3)}</code>`,
  ].map(s => `<div>${s}</div>`).join('');
}

window.addEventListener('load', () => {
  const img = document.getElementById('img');
  const srcSelect = document.getElementById('srcSelect');
  const maxSelect = document.getElementById('maxSelect');

  srcSelect.addEventListener('change', () => {
    img.src = srcSelect.value;
  });

  maxSelect.addEventListener('change', () => {
    if (maxSelect.value === 'none') {
      img.style.maxWidth = 'none';
    } else {
      img.style.maxWidth = maxSelect.value + 'px';
    }
    updateStats();
  });

  img.addEventListener('load', updateStats);
  window.addEventListener('resize', updateStats);
  updateStats();
});
