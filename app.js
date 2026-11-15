const WORKS = [
  { id: 'iRX4hQe8Kf8', cat: 'series', label: 'SÉRIES', title: 'MASTERCHEF BRASIL', client: 'BAND / ENDEMOL SHINE', specs: ['DIREÇÃO', 'ABERTURAS', '2023–2024', 'TV / STREAMING'] },
  { id: 'MU_pSA7fd24', cat: 'conteudo', label: 'CONTEÚDO', title: 'MAKING OF MASTERCHEF 2024', client: 'BAND / ENDEMOL SHINE', specs: ['DIREÇÃO', 'MAKING OF', '2024', 'BASTIDORES'] },
  { id: 'SORH6YecwmY', cat: 'conteudo', label: 'CONTEÚDO', title: 'ABERTURA MASTERCHEF — MK OF', client: 'BAND / ENDEMOL SHINE', specs: ['DIREÇÃO', 'MAKING OF', 'TV', 'BASTIDORES'] },
  { id: '_sOtOC1IOZw', cat: 'publicidade', label: 'PUBLICIDADE', title: 'BEST COMMERCIAL WORK', client: 'PORTFÓLIO COMERCIAL', specs: ['DIREÇÃO', 'MONTAGEM', 'REEL', 'PUBLICIDADE'] },
  { id: 'OvWO7CfaYr8', cat: 'publicidade', label: 'PUBLICIDADE', title: "MCDONALD'S — DIA DAS MULHERES", client: "MCDONALD'S BRASIL", specs: ['DIREÇÃO', 'CAMPANHA', 'PUBLICIDADE', 'DIGITAL'] },
  { id: 'NBzyq-o-FxE', cat: 'publicidade', label: 'PUBLICIDADE', title: 'INSTITUCIONAL LOGGI', client: 'LOGGI', specs: ['DIREÇÃO', 'INSTITUCIONAL', 'FILME', 'MARCA'] },
  { id: '7wOhthRJRkI', cat: 'documentario', label: 'DOCUMENTÁRIO', title: 'QUEBRADEIRAS DO BABAÇU', client: 'THE BODY SHOP BRASIL', specs: ['DIREÇÃO', 'DOCUMENTÁRIO', 'MARANHÃO', 'IMPACTO'] },
  { id: '7nPCvczbfdk', cat: 'publicidade', label: 'PUBLICIDADE', title: "LASAGA AD — DIRECTOR'S CUT", client: 'LASAGA', specs: ['DIREÇÃO', "DIRECTOR'S CUT", 'CAMPANHA', 'FILME'] },
  { id: 'DtLi-rz_s7s', cat: 'musica', label: 'MÚSICA', title: 'LA MENTIRA — MANO CHAO', client: 'VÍDEO: KIKO COSTATO', specs: ['DIREÇÃO', 'VIDEOCLIPE', 'MÚSICA', 'AUTORAL'] },
  { id: 'lUcKHVAhNgA', cat: 'conteudo', label: 'CONTEÚDO', title: 'VEMPROCENTRO', client: 'ATLETA / CENTRO SP', specs: ['DIREÇÃO', 'CONTEÚDO', 'CIDADE', 'CULTURA'] },
  { id: '7p7JCRoGMxU', cat: 'documentario', label: 'DOCUMENTÁRIO', title: 'GORJEIOS', client: 'DIREÇÃO KIKO COSTATO', specs: ['DIREÇÃO', 'AUTORAL', 'CURTA', 'CINEMA'] },
  { id: 'UQ6MxIi0E-A', cat: 'publicidade', label: 'PUBLICIDADE', title: 'VINHETA ASSOCIADOS RETOQUE', client: 'ASSOCIADOS RETOQUE', specs: ['MOTION', 'VINHETA', 'IDENTIDADE', 'DESIGN'] },

  // Anjos da Estrada — Discovery Channel
  { id: 'MU-wvdVBrzg', cat: 'series', label: 'SÉRIES', title: 'ANJOS DA ESTRADA — EP. 01 & 02', client: 'DISCOVERY CHANNEL', specs: ['DIREÇÃO', 'SÉRIE TV', '47 MIN', 'DOCUMENTAL'] },
  { id: 'zCQHplxeXws', cat: 'series', label: 'SÉRIES', title: 'ANJOS DA ESTRADA — EP. 03 & 04', client: 'DISCOVERY CHANNEL', specs: ['DIREÇÃO', 'SÉRIE TV', '47 MIN', 'DOCUMENTAL'] },
  { id: 'eFR70UzO2vY', cat: 'series', label: 'SÉRIES', title: 'ANJOS DA ESTRADA — EP. 05 & 06', client: 'DISCOVERY CHANNEL', specs: ['DIREÇÃO', 'SÉRIE TV', '47 MIN', 'DOCUMENTAL'] },
  { id: 'Wd1J-Qb63NI', cat: 'series', label: 'SÉRIES', title: 'ANJOS DA ESTRADA — EP. 07 & 08', client: 'DISCOVERY CHANNEL', specs: ['DIREÇÃO', 'SÉRIE TV', '47 MIN', 'DOCUMENTAL'] },
  { id: 'fDutoer3SBc', cat: 'series', label: 'SÉRIES', title: 'ANJOS DA ESTRADA — EP. 09 & 10', client: 'DISCOVERY CHANNEL', specs: ['DIREÇÃO', 'SÉRIE TV', '47 MIN', 'DOCUMENTAL'] },
  { id: 'Opc4eL0M1MY', cat: 'series', label: 'SÉRIES', title: 'ANJOS DA ESTRADA — EP. 11 & 12', client: 'DISCOVERY CHANNEL', specs: ['DIREÇÃO', 'SÉRIE TV', '47 MIN', 'DOCUMENTAL'] },
  { id: '3zkcjmGO_c4', cat: 'series', label: 'SÉRIES', title: 'ANJOS DA ESTRADA — EP. 13 (FINAL)', client: 'DISCOVERY CHANNEL', specs: ['DIREÇÃO', 'SÉRIE TV', 'EP. FINAL', 'DOCUMENTAL'] },

  // O Laboratório da Luta (Apenas 1ª Temporada)
  { id: 'dE5iHyM_VVo', cat: 'series', label: 'SÉRIES', title: 'LABORATÓRIO DA LUTA — EP. 02', client: 'MIXER FILMS / COMBATE', specs: ['DIREÇÃO', 'BETHE CORREIA', '28 MIN', '1ª TEMPORADA'] },
  { id: 'FYiRyBCUoJs', cat: 'conteudo', label: 'CONTEÚDO', title: 'LABORATÓRIO DA LUTA — PROMO 1ª TEMP.', client: 'MIXER FILMS / COMBATE', specs: ['DIREÇÃO', '1ª TEMPORADA', 'PROMO', 'COMBATE'] },
  { id: 'mq5YQXZsitE', cat: 'documentario', label: 'DOCUMENTÁRIO', title: 'CIÊNCIA NAS ARTES MARCIAIS', client: 'SENSEI SPORTV', specs: ['DIREÇÃO', 'SPORTV', 'ESPECIAL', 'MATÉRIA'] },

  // Turistinha Espacial
  { id: 'wm2gcUkSnUg', cat: 'musica', label: 'MÚSICA', title: 'TURISTINHA ESPACIAL — TEMA', client: 'SÉRIE ORIGINAL • PT-BR', specs: ['CRIAÇÃO', 'MÚSICA TEMA', 'ANIMAÇÃO', 'FAMÍLIA'] },
  { id: 'D7MNCJAGOeY', cat: 'series', label: 'SÉRIES', title: 'TURISTINHA — NATAL DOS ANIMAIS', client: 'SÉRIE ORIGINAL', specs: ['CRIAÇÃO', 'ESPECIAL', 'ANIMAÇÃO', 'FAMÍLIA'] },
  { id: 'jA6L6iOw7II', cat: 'series', label: 'SÉRIES', title: "IT'S VACATION TIME!", client: 'LITTLE SPACE TOURIST', specs: ['CRIAÇÃO', 'ENGLISH', 'EPISÓDIO', 'ANIMAÇÃO'] },
  { id: 'ZZLHNONNT08', cat: 'musica', label: 'MÚSICA', title: 'NATAL DOS ANIMAIS — LYRIC', client: 'TURISTINHA ESPACIAL', specs: ['MÚSICA', 'LYRIC VIDEO', 'ANIMAÇÃO', 'INFANTIL'] },
  { id: 'Q_jktf2-_qs', cat: 'musica', label: 'MÚSICA', title: 'CANTE COM O TURISTINHA!', client: 'TURISTINHA ESPACIAL', specs: ['MÚSICA', 'PT-BR', 'EXPLORAR', 'INFANTIL'] },
  { id: 'NK0IVCqo0Js', cat: 'series', label: 'SÉRIES', title: 'TURISTITA ESPACIAL — ESPAÑOL', client: 'SÉRIE ORIGINAL', specs: ['CRIAÇÃO', 'ESPAÑOL', 'EPISÓDIO', 'ANIMAÇÃO'] },
  { id: 'ROpB3awHKL0', cat: 'musica', label: 'MÚSICA', title: 'LITTLE SPACE TOURIST — THEME', client: 'ENGLISH VERSION', specs: ['CRIAÇÃO', 'MÚSICA TEMA', 'ENGLISH', 'ANIMAÇÃO'] }
];

const FILTERS = [
  { id: 'all', label: 'TODOS' },
  { id: 'publicidade', label: 'PUBLICIDADE' },
  { id: 'documentario', label: 'DOCUMENTÁRIO' },
  { id: 'musica', label: 'MÚSICA' },
  { id: 'conteudo', label: 'CONTEÚDO' },
  { id: 'series', label: 'SÉRIES' }
];

function initWork() {
  const filtersEl = document.getElementById('work-filters');
  const stageEl = document.getElementById('featured-stage');
  const stripEl = document.getElementById('thumb-strip');

  let currentCat = 'all';
  let currentList = WORKS;
  let currentIndex = 0;

  function renderStage(playing = false) {
    const item = currentList[currentIndex] || currentList[0];
    const num = String(currentIndex + 1).padStart(2, '0');
    const total = String(currentList.length).padStart(2, '0');

    stageEl.innerHTML = `
      <div class="featured-info">
        <div>
          <div class="featured-cat">${item.label}</div>
          <h3 class="featured-title">${item.title}</h3>
          <div class="featured-client">${item.client}</div>
          <div class="featured-specs">${item.specs.map(s => `| ${s}`).join('<br>')}</div>
        </div>
        <button class="play-pill" id="stage-play-btn" type="button">
          <span class="play-circle">▶</span>
          <span>PLAY FILM &gt;&gt;</span>
        </button>
      </div>
      <div class="featured-media" id="stage-media">
        ${playing
          ? `<iframe src="https://www.youtube.com/embed/${item.id}?autoplay=1" title="${item.title}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
          : `<img src="https://i.ytimg.com/vi/${item.id}/hqdefault.jpg" alt="${item.title}" />`
        }
        <div class="stage-controls">
          <span>${num}<br>/<br>${total}</span>
          <button id="prev-work" type="button" aria-label="Anterior">‹</button>
          <button id="next-work" type="button" aria-label="Próximo">›</button>
        </div>
      </div>
    `;

    document.getElementById('stage-play-btn').onclick = () => renderStage(true);
    document.getElementById('prev-work').onclick = () => {
      currentIndex = (currentIndex - 1 + currentList.length) % currentList.length;
      renderStage(false);
      renderThumbs();
    };
    document.getElementById('next-work').onclick = () => {
      currentIndex = (currentIndex + 1) % currentList.length;
      renderStage(false);
      renderThumbs();
    };
  }

  function renderThumbs() {
    stripEl.innerHTML = currentList.map((w, idx) => `
      <article class="thumb-card ${idx === currentIndex ? 'active' : ''}" data-idx="${idx}">
        <div class="thumb-img-wrap">
          <img src="https://i.ytimg.com/vi/${w.id}/hqdefault.jpg" alt="${w.title}" loading="lazy" />
        </div>
        <div class="thumb-client">${w.client}</div>
        <div class="thumb-sub">${w.title}</div>
      </article>
    `).join('');

    stripEl.querySelectorAll('.thumb-card').forEach(card => {
      card.onclick = () => {
        currentIndex = Number(card.dataset.idx);
        renderStage(true);
        renderThumbs();
        stageEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      };
    });
  }

  function setFilter(catId) {
    currentCat = catId;
    currentList = catId === 'all' ? WORKS : WORKS.filter(w => w.cat === catId);
    currentIndex = 0;
    filtersEl.querySelectorAll('.filter-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.cat === catId);
    });
    renderStage(false);
    renderThumbs();
  }

  FILTERS.forEach(f => {
    const btn = document.createElement('button');
    btn.className = 'filter-btn' + (f.id === 'all' ? ' active' : '');
    btn.dataset.cat = f.id;
    btn.textContent = f.label;
    btn.onclick = () => setFilter(f.id);
    filtersEl.appendChild(btn);
  });

  document.querySelectorAll('.cat-tile').forEach(tile => {
    tile.addEventListener('click', () => setFilter(tile.dataset.cat));
  });

  renderStage(false);
  renderThumbs();
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
      const items = ep.items.slice(0, 10).map(it => `<li>${it.title}</li>`).join('');
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
    btn.className = 'filter-btn' + (idx === 0 ? ' active' : '');
    btn.textContent = s.title.split(':')[0].replace('História do Rádio Musical — ', 'Rádio ');
    btn.onclick = () => {
      tabsEl.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderSeries(s);
    };
    tabsEl.appendChild(btn);
  });

  if (catalog.length) renderSeries(catalog[0]);
}

initWork();
initCatalog();
