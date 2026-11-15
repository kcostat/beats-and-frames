async function init() {
  const res = await fetch('data/catalogo.json');
  const catalog = await res.json();
  const tabsEl = document.getElementById('series-tabs');
  const detailEl = document.getElementById('series-detail');

  function renderSeries(s) {
    const modeLabel = s.legal_mode === 'rss_direct'
      ? 'Player HTML5 Direto / Feed RSS Aberto'
      : 'Embed Mixcloud / YouTube (Royalties Licenciados)';

    const epsHtml = s.episodes.map(ep => {
      const img = ep.cover ? `<img class="ep-cover" src="${ep.cover}" alt="${ep.title}" loading="lazy" />` : '';
      const items = ep.items.slice(0, 12).map(it => `<li>${it.title}</li>`).join('');
      return `
        <article class="ep-card">
          ${img}
          <div class="ep-body">
            <div class="ep-code">${ep.code} • ${s.lang}</div>
            <h4 class="ep-title">${ep.title}</h4>
            <ol class="ep-list">${items}</ol>
            <div class="ep-footer">${modeLabel}</div>
          </div>
        </article>
      `;
    }).join('');

    detailEl.innerHTML = `
      <div class="series-banner">
        <span class="badge">${s.badge} • ${s.lang}</span>
        <h3>${s.title}</h3>
        <div>${s.subtitle}</div>
        <p>${s.description}</p>
      </div>
      <div class="ep-grid">${epsHtml}</div>
    `;
  }

  catalog.forEach((s, idx) => {
    const btn = document.createElement('button');
    btn.className = 'tab-btn' + (idx === 0 ? ' active' : '');
    btn.textContent = s.title.split(':')[0].replace('História do Rádio Musical — ', 'Rádio ');
    btn.onclick = () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderSeries(s);
    };
    tabsEl.appendChild(btn);
  });

  if (catalog.length) renderSeries(catalog[0]);
}

init();
