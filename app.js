const VIDEO_GROUPS = [
  {
    id: 'direcao',
    label: 'Direção & Comerciais (11)',
    videos: [
      { id: '_sOtOC1IOZw', tag: 'Portfólio • Comercial', title: 'Best Commercial Work — Direção & Montagem' },
      { id: 'iRX4hQe8Kf8', tag: 'TV • Abertura', title: 'Abertura MasterChef 2023' },
      { id: 'MU_pSA7fd24', tag: 'TV • Making Of', title: 'Making Of — Abertura MasterChef 2024' },
      { id: 'SORH6YecwmY', tag: 'TV • Making Of', title: 'Abertura MasterChef — Making Of' },
      { id: '7wOhthRJRkI', tag: 'Branded Content • The Body Shop', title: 'Quebradeiras do Babaçu do Maranhão' },
      { id: 'OvWO7CfaYr8', tag: 'Campanha • Comercial', title: "McDonald's — Dia das Mulheres" },
      { id: 'NBzyq-o-FxE', tag: 'Filme Institucional', title: 'Institucional Loggi' },
      { id: '7nPCvczbfdk', tag: "Campanha • Director's Cut", title: "LaSaga AD — Director's Cut" },
      { id: 'DtLi-rz_s7s', tag: 'Videoclipe • Mano Chao', title: 'LA MENTIRA — Direção: Kiko Costato' },
      { id: 'lUcKHVAhNgA', tag: 'Campanha • Direção', title: 'VEMPROCENTRO' },
      { id: 'UQ6MxIi0E-A', tag: 'Motion & Vinheta', title: 'Vinheta Associados Retoque' }
    ]
  },
  {
    id: 'anjos',
    label: 'Anjos da Estrada — Discovery (7)',
    videos: [
      { id: 'MU-wvdVBrzg', tag: 'Discovery Channel • 47 min', title: 'Anjos da Estrada — Episódios 01 & 02' },
      { id: 'zCQHplxeXws', tag: 'Discovery Channel • 47 min', title: 'Anjos da Estrada — Episódios 03 & 04' },
      { id: 'eFR70UzO2vY', tag: 'Discovery Channel • 47 min', title: 'Anjos da Estrada — Episódios 05 & 06' },
      { id: 'Wd1J-Qb63NI', tag: 'Discovery Channel • 47 min', title: 'Anjos da Estrada — Episódios 07 & 08' },
      { id: 'fDutoer3SBc', tag: 'Discovery Channel • 47 min', title: 'Anjos da Estrada — Episódios 09 & 10' },
      { id: 'Opc4eL0M1MY', tag: 'Discovery Channel • 47 min', title: 'Anjos da Estrada — Episódios 11 & 12' },
      { id: '3zkcjmGO_c4', tag: 'Discovery Channel • Final', title: 'Anjos da Estrada — Ep. 13: Anjos da Guarda' }
    ]
  },
  {
    id: 'laboratorio',
    label: 'O Laboratório da Luta (5)',
    videos: [
      { id: 'dE5iHyM_VVo', tag: 'Temp. 1 • Ep. 02 (28 min)', title: 'Laboratório da Luta — Bethe Correia' },
      { id: 'FYiRyBCUoJs', tag: 'Mixer Films • Promo', title: 'O Laboratório da Luta — Promo Oficial' },
      { id: 'z7ouozm_bEA', tag: 'Mixer Films • 2ª Temp.', title: 'O Laboratório da Luta — 2ª Temporada' },
      { id: '6yRI50qVHxw', tag: 'Mixer Films • 3ª Temp.', title: 'O Laboratório da Luta — 3ª Temporada' },
      { id: 'mq5YQXZsitE', tag: 'Sensei SporTV', title: 'Ciência aplicada às Artes Marciais' }
    ]
  },
  {
    id: 'turistinha',
    label: 'Turistinha Espacial (7)',
    link: { url: 'https://www.youtube.com/@turistinhaespacial', text: '▶ Ver canal completo no YouTube' },
    videos: [
      { id: 'wm2gcUkSnUg', tag: 'Tema Oficial • PT-BR', title: 'Turistinha Espacial — Música Tema' },
      { id: 'D7MNCJAGOeY', tag: 'Episódio Especial', title: 'Turistinha Espacial em "Natal dos Animais"' },
      { id: 'jA6L6iOw7II', tag: 'Episódio • English', title: "It's Vacation Time with the Little Space Tourist!" },
      { id: 'ZZLHNONNT08', tag: 'Lyric Video', title: 'Natal dos Animais — Lyric Video' },
      { id: 'Q_jktf2-_qs', tag: 'Musical • PT-BR', title: 'Cante com o Turistinha! Explore o Mundo!' },
      { id: 'NK0IVCqo0Js', tag: 'Episódio • Español', title: 'Turistita Espacial — Versión en Español' },
      { id: 'ROpB3awHKL0', tag: 'Theme • English', title: 'Little Space Tourist — English Version' }
    ]
  }
];

function initVideos() {
  const tabsEl = document.getElementById('video-tabs');
  const gridEl = document.getElementById('video-grid');
  const extraEl = document.getElementById('video-extra');

  function renderGroup(group) {
    gridEl.innerHTML = group.videos.map(v => `
      <article class="video-card">
        <div class="video-wrap" data-yt="${v.id}" data-title="${v.title.replace(/"/g, '&quot;')}">
          <img src="https://i.ytimg.com/vi/${v.id}/hqdefault.jpg" alt="${v.title.replace(/"/g, '&quot;')}" loading="lazy" />
          <button class="play-btn" type="button" aria-label="Reproduzir ${v.title.replace(/"/g, '&quot;')}">▶</button>
        </div>
        <div class="video-meta">
          <div class="video-tag">${v.tag}</div>
          <h3>${v.title}</h3>
        </div>
      </article>
    `).join('');

    extraEl.innerHTML = group.link
      ? `<a href="${group.link.url}" target="_blank" rel="noopener" class="btn-ghost">${group.link.text}</a>`
      : '';

    gridEl.querySelectorAll('.video-wrap').forEach(wrap => {
      wrap.addEventListener('click', () => {
        if (wrap.classList.contains('playing')) return;
        const id = wrap.dataset.yt;
        const title = wrap.dataset.title;
        wrap.classList.add('playing');
        wrap.innerHTML = `<iframe src="https://www.youtube.com/embed/${id}?autoplay=1" title="${title}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
      });
    });
  }

  VIDEO_GROUPS.forEach((group, idx) => {
    const btn = document.createElement('button');
    btn.className = 'tab-btn' + (idx === 0 ? ' active' : '');
    btn.textContent = group.label;
    btn.onclick = () => {
      tabsEl.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderGroup(group);
    };
    tabsEl.appendChild(btn);
  });

  renderGroup(VIDEO_GROUPS[0]);
}

async function initCatalog() {
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
      tabsEl.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderSeries(s);
    };
    tabsEl.appendChild(btn);
  });

  if (catalog.length) renderSeries(catalog[0]);
}

initVideos();
initCatalog();
