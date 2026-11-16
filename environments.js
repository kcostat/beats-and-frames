// Interactive Studio Environments ("Ambientes") for each of the 6 Audio-Series
// Pure Web Audio API + Canvas (zero external APIs, works offline & on GitHub Pages)

const ENV_I18N = {
  pt: {
    badge_env: 'AMBIENTE INTERATIVO',
    voltagem_t1: {
      title: 'SYNTH STUDIO CONSOLE',
      sub: 'Toque o teclado ou teste os sintetizadores clássicos citados nos episódios.',
      patch_label: 'MOTOR SONORO',
      cutoff: 'CUTOFF',
      res: 'RESSONÂNCIA',
      delay: 'ECO / DELAY',
      demo_btn: 'SEQUÊNCIA DEMO ▶',
      stop_btn: 'PARAR ■'
    },
    voltagem_t2: {
      title: 'MASTERING & FORMAT ERA MACHINE',
      sub: 'Compare a resposta sonora e dinâmica das eras da indústria fonográfica.',
      era_label: 'FORMATO DA ERA',
      test_tone: 'OUVIR TESTE DE ERA ▶',
      dynamic_label: 'ALCANCE DINÂMICO'
    },
    radio_br: {
      title: 'DIAL VINTAGE AM / FM BRASIL',
      sub: 'Sintonize as frequências históricas que moldaram o rádio musical brasileiro.',
      tune_label: 'SINTONIA',
      static_btn: 'VARREDURA DE DIAL ▶'
    },
    radio_eua: {
      title: 'TOP 40 ON-AIR BROADCAST CONSOLE',
      sub: 'Mesa de transmissão americana: do Top 40 de Todd Storz à era dos algoritmos.',
      on_air: 'NO AR',
      jingle_btn: 'DISPARAR VINHETA TOP 40 ▶',
      siren_btn: 'SINAL DE HORÁRIO ▶'
    },
    radio_uk: {
      title: 'OFFSHORE PIRATE SHIP & BBC RECEIVER',
      sub: 'Receptor do Mar do Norte: navios piratas, BBC Radio 1, John Peel e Rinse FM.',
      siren_btn: 'DUB SIREN PIRATA ▶',
      carrier_btn: 'ONDA CURTA UK ▶'
    },
    lendas_br: {
      title: 'TAPE DECK & ARQUIVO CONFIDENCIAL',
      sub: 'Gravador de rolo e dossiês sonoros dos casos investigados na série.',
      drone_btn: 'ATMOSFERA DE FITA ▶',
      stop_btn: 'PARAR FITA ■'
    }
  },
  en: {
    badge_env: 'INTERACTIVE ENVIRONMENT',
    voltagem_t1: {
      title: 'SYNTH STUDIO CONSOLE',
      sub: 'Play the keyboard or audition iconic synthesizers featured in the episodes.',
      patch_label: 'SOUND ENGINE',
      cutoff: 'CUTOFF',
      res: 'RESONANCE',
      delay: 'ECHO / DELAY',
      demo_btn: 'PLAY DEMO SEQUENCE ▶',
      stop_btn: 'STOP ■'
    },
    voltagem_t2: {
      title: 'MASTERING & FORMAT ERA MACHINE',
      sub: 'Compare the tonal response and dynamics across music industry eras.',
      era_label: 'ERA FORMAT',
      test_tone: 'AUDITION ERA TONE ▶',
      dynamic_label: 'DYNAMIC RANGE'
    },
    radio_br: {
      title: 'VINTAGE AM / FM BRAZIL DIAL',
      sub: 'Tune across the landmark frequencies that shaped Brazilian music radio.',
      tune_label: 'TUNING',
      static_btn: 'DIAL STATIC SWEEP ▶'
    },
    radio_eua: {
      title: 'TOP 40 ON-AIR BROADCAST CONSOLE',
      sub: 'US broadcast desk: from Todd Storz’s Top 40 to modern algorithm radio.',
      on_air: 'ON AIR',
      jingle_btn: 'FIRE TOP 40 STINGER ▶',
      siren_btn: 'TIME SIGNAL ▶'
    },
    radio_uk: {
      title: 'OFFSHORE PIRATE SHIP & BBC RECEIVER',
      sub: 'North Sea receiver: offshore pirate ships, BBC Radio 1, John Peel & Rinse FM.',
      siren_btn: 'PIRATE DUB SIREN ▶',
      carrier_btn: 'UK SHORTWAVE ▶'
    },
    lendas_br: {
      title: 'TAPE DECK & CLASSIFIED ARCHIVE',
      sub: 'Reel-to-reel tape deck and sonic dossiers of the series’ cases.',
      drone_btn: 'PLAY TAPE ATMOSPHERE ▶',
      stop_btn: 'STOP TAPE ■'
    }
  },
  es: {
    badge_env: 'ENTORNO INTERACTIVO',
    voltagem_t1: {
      title: 'SYNTH STUDIO CONSOLE',
      sub: 'Toca el teclado o prueba los sintetizadores icónicos de los episodios.',
      patch_label: 'MOTOR SONORO',
      cutoff: 'CUTOFF',
      res: 'RESONANCIA',
      delay: 'ECO / DELAY',
      demo_btn: 'SECUENCIA DEMO ▶',
      stop_btn: 'DETENER ■'
    },
    voltagem_t2: {
      title: 'MASTERING & FORMAT ERA MACHINE',
      sub: 'Compara la respuesta sonora y dinámica de las eras de la industria musical.',
      era_label: 'FORMATO DE ERA',
      test_tone: 'ESCUCHAR TONO DE ERA ▶',
      dynamic_label: 'RANGO DINÁMICO'
    },
    radio_br: {
      title: 'DIAL VINTAGE AM / FM BRASIL',
      sub: 'Sintoniza las frecuencias históricas que moldearon la radio musical brasileña.',
      tune_label: 'SINTONÍA',
      static_btn: 'BARRIDO DE DIAL ▶'
    },
    radio_eua: {
      title: 'TOP 40 ON-AIR BROADCAST CONSOLE',
      sub: 'Consola de radio estadounidense: del Top 40 de Todd Storz a la era del algoritmo.',
      on_air: 'AL AIRE',
      jingle_btn: 'DISPARAR JINGLE TOP 40 ▶',
      siren_btn: 'SEÑAL HORARIA ▶'
    },
    radio_uk: {
      title: 'OFFSHORE PIRATE SHIP & BBC RECEIVER',
      sub: 'Receptor del Mar del Norte: barcos piratas, BBC Radio 1, John Peel y Rinse FM.',
      siren_btn: 'DUB SIREN PIRATA ▶',
      carrier_btn: 'ONDA CORTA UK ▶'
    },
    lendas_br: {
      title: 'TAPE DECK & ARCHIVO CONFIDENCIAL',
      sub: 'Grabadora de cinta y expedientes sonoros de los casos investigados.',
      drone_btn: 'ATMOSFERA DE CINTA ▶',
      stop_btn: 'DETENER CINTA ■'
    }
  }
};

let audioCtx = null;
let analyserNode = null;
let seqTimer = null;
let droneNodes = null;

function ensureAudio() {
  if (!audioCtx) {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    audioCtx = new Ctx();
    analyserNode = audioCtx.createAnalyser();
    analyserNode.fftSize = 256;
    analyserNode.connect(audioCtx.destination);
  }
  if (audioCtx.state === 'suspended') audioCtx.resume();
  return audioCtx;
}

function stopAllEnvAudio() {
  if (seqTimer) {
    clearInterval(seqTimer);
    seqTimer = null;
  }
  if (droneNodes) {
    try { droneNodes.forEach(n => n.stop && n.stop()); } catch (_) {}
    droneNodes = null;
  }
}

function playSynthNote(freq, patch = 'moog', cutoff = 1800, res = 6, delayMix = 0.25) {
  const ctx = ensureAudio();
  const now = ctx.currentTime;
  const osc1 = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const filter = ctx.createBiquadFilter();
  const gain = ctx.createGain();

  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(cutoff, now);
  filter.Q.setValueAtTime(res, now);

  if (patch === 'theremin') {
    osc1.type = 'sine';
    osc2.type = 'triangle';
    osc1.frequency.setValueAtTime(freq * 0.96, now);
    osc1.frequency.exponentialRampToValueAtTime(freq, now + 0.14);
    osc2.frequency.setValueAtTime(freq * 1.003, now);
  } else if (patch === 'acid') {
    osc1.type = 'sawtooth';
    osc2.type = 'square';
    osc1.frequency.setValueAtTime(freq, now);
    osc2.frequency.setValueAtTime(freq * 0.5, now);
    filter.frequency.setValueAtTime(Math.min(cutoff * 2.2, 7000), now);
    filter.frequency.exponentialRampToValueAtTime(Math.max(cutoff * 0.35, 180), now + 0.24);
  } else if (patch === 'dx7') {
    osc1.type = 'sine';
    osc2.type = 'sine';
    osc1.frequency.setValueAtTime(freq, now);
    osc2.frequency.setValueAtTime(freq * 2.0, now);
  } else {
    // Minimoog fat saw
    osc1.type = 'sawtooth';
    osc2.type = 'sawtooth';
    osc1.frequency.setValueAtTime(freq, now);
    osc2.frequency.setValueAtTime(freq * 1.006, now);
  }

  gain.gain.setValueAtTime(0.001, now);
  gain.gain.linearRampToValueAtTime(0.22, now + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

  osc1.connect(filter);
  osc2.connect(filter);
  filter.connect(gain);
  gain.connect(analyserNode);

  if (delayMix > 0.05) {
    const delay = ctx.createDelay();
    const fb = ctx.createGain();
    delay.delayTime.value = 0.22;
    fb.gain.value = Math.min(delayMix, 0.55);
    gain.connect(delay);
    delay.connect(fb);
    fb.connect(delay);
    delay.connect(analyserNode);
  }

  osc1.start(now);
  osc2.start(now);
  osc1.stop(now + 0.5);
  osc2.stop(now + 0.5);
}

function playStaticSweep(duration = 0.45, centerFreq = 1200) {
  const ctx = ensureAudio();
  const len = Math.floor(ctx.sampleRate * duration);
  const buf = ctx.createBuffer(1, len, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * 0.25;

  const src = ctx.createBufferSource();
  src.buffer = buf;
  const bp = ctx.createBiquadFilter();
  bp.type = 'bandpass';
  bp.frequency.setValueAtTime(400, ctx.currentTime);
  bp.frequency.exponentialRampToValueAtTime(centerFreq, ctx.currentTime + duration);
  bp.Q.value = 3;

  const g = ctx.createGain();
  g.gain.setValueAtTime(0.28, ctx.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

  src.connect(bp);
  bp.connect(g);
  g.connect(analyserNode);
  src.start();
}

function drawScope(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas || !analyserNode) return;
  const c = canvas.getContext('2d');
  const buf = new Uint8Array(analyserNode.frequencyBinCount);

  function frame() {
    if (!document.getElementById(canvasId)) return;
    requestAnimationFrame(frame);
    analyserNode.getByteTimeDomainData(buf);
    c.fillStyle = '#0c0f12';
    c.fillRect(0, 0, canvas.width, canvas.height);

    c.strokeStyle = 'rgba(255,255,255,0.06)';
    c.beginPath();
    c.moveTo(0, canvas.height / 2);
    c.lineTo(canvas.width, canvas.height / 2);
    c.stroke();

    c.strokeStyle = '#e61e6b';
    c.lineWidth = 2;
    c.beginPath();
    const slice = canvas.width / buf.length;
    for (let i = 0; i < buf.length; i++) {
      const y = (buf[i] / 128.0) * (canvas.height / 2);
      if (i === 0) c.moveTo(0, y);
      else c.lineTo(i * slice, y);
    }
    c.stroke();
  }
  frame();
}

window.renderSeriesEnvironment = function renderSeriesEnvironment(container, seriesId, lang) {
  stopAllEnvAudio();
  const t = ENV_I18N[lang] || ENV_I18N.pt;
  const txt = t[seriesId] || t.voltagem_t1;

  if (seriesId === 'voltagem_t1') {
    const notes = [
      { n: 'C3', f: 130.81 }, { n: 'C#3', f: 138.59, blk: true },
      { n: 'D3', f: 146.83 }, { n: 'D#3', f: 155.56, blk: true },
      { n: 'E3', f: 164.81 }, { n: 'F3', f: 174.61 },
      { n: 'F#3', f: 185.00, blk: true }, { n: 'G3', f: 196.00 },
      { n: 'G#3', f: 207.65, blk: true }, { n: 'A3', f: 220.00 },
      { n: 'A#3', f: 233.08, blk: true }, { n: 'B3', f: 246.94 },
      { n: 'C4', f: 261.63 }
    ];
    container.innerHTML = `
      <div class="env-console">
        <div class="env-head">
          <div>
            <span class="env-badge">${t.badge_env}</span>
            <h4>${txt.title}</h4>
            <p>${txt.sub}</p>
          </div>
          <canvas id="env-scope" width="260" height="68"></canvas>
        </div>
        <div class="env-controls-row">
          <div class="env-group">
            <label>${txt.patch_label}</label>
            <div class="env-pills" id="patch-pills">
              <button type="button" class="env-pill active" data-patch="moog">MINIMOOG</button>
              <button type="button" class="env-pill" data-patch="theremin">THEREMIN</button>
              <button type="button" class="env-pill" data-patch="acid">TB-303 ACID</button>
              <button type="button" class="env-pill" data-patch="dx7">DX7 FM</button>
            </div>
          </div>
          <div class="env-sliders">
            <label>${txt.cutoff} <input id="env-cutoff" type="range" min="200" max="6000" value="1800" /></label>
            <label>${txt.res} <input id="env-res" type="range" min="1" max="18" value="6" /></label>
            <label>${txt.delay} <input id="env-delay" type="range" min="0" max="0.55" step="0.05" value="0.25" /></label>
          </div>
          <button type="button" class="env-action" id="env-seq-btn">${txt.demo_btn}</button>
        </div>
        <div class="synth-keys" id="synth-keys">
          ${notes.map(k => `<button type="button" class="s-key ${k.blk ? 'blk' : ''}" data-freq="${k.f}">${k.n}</button>`).join('')}
        </div>
      </div>
    `;

    let patch = 'moog';
    const getParams = () => ({
      cutoff: Number(document.getElementById('env-cutoff').value),
      res: Number(document.getElementById('env-res').value),
      delay: Number(document.getElementById('env-delay').value)
    });

    container.querySelectorAll('[data-patch]').forEach(b => {
      b.onclick = () => {
        container.querySelectorAll('[data-patch]').forEach(x => x.classList.remove('active'));
        b.classList.add('active');
        patch = b.dataset.patch;
      };
    });

    container.querySelectorAll('.s-key').forEach(k => {
      k.onclick = () => {
        const p = getParams();
        playSynthNote(Number(k.dataset.freq), patch, p.cutoff, p.res, p.delay);
        drawScope('env-scope');
      };
    });

    const seqBtn = document.getElementById('env-seq-btn');
    const arp = [130.81, 164.81, 196.00, 261.63, 196.00, 155.56, 220.00, 146.83];
    let step = 0;
    seqBtn.onclick = () => {
      if (seqTimer) {
        stopAllEnvAudio();
        seqBtn.textContent = txt.demo_btn;
        return;
      }
      ensureAudio();
      drawScope('env-scope');
      seqBtn.textContent = txt.stop_btn;
      seqTimer = setInterval(() => {
        const p = getParams();
        playSynthNote(arp[step % arp.length], patch, p.cutoff, p.res, p.delay);
        step++;
      }, 210);
    };
    return;
  }

  if (seriesId === 'voltagem_t2') {
    const eras = [
      { id: '1920', label: '1920s SHELLAC 78RPM', bw: '300Hz – 3kHz', dr: '24 dB', f: 900, q: 4 },
      { id: '1968', label: '1968 VINYL LP', bw: '35Hz – 16kHz', dr: '45 dB', f: 4200, q: 1.2 },
      { id: '1984', label: '1984 CASSETTE TAPE', bw: '45Hz – 14kHz', dr: '52 dB', f: 3200, q: 1.5 },
      { id: '2001', label: '2001 MP3 128KBPS', bw: '20Hz – 16kHz', dr: '68 dB', f: 5200, q: 0.9 },
      { id: '2024', label: '2024 STREAMING MASTER', bw: '20Hz – 20kHz', dr: '-9 LUFS', f: 7500, q: 0.7 }
    ];
    container.innerHTML = `
      <div class="env-console">
        <div class="env-head">
          <div>
            <span class="env-badge">${t.badge_env}</span>
            <h4>${txt.title}</h4>
            <p>${txt.sub}</p>
          </div>
          <div class="env-readout" id="era-readout">1968 VINYL LP • 35Hz – 16kHz</div>
        </div>
        <div class="env-controls-row">
          <div class="env-pills">
            ${eras.map((e, i) => `<button type="button" class="env-pill ${i === 1 ? 'active' : ''}" data-era="${i}">${e.label}</button>`).join('')}
          </div>
          <button type="button" class="env-action" id="era-play-btn">${txt.test_tone}</button>
        </div>
      </div>
    `;
    let currentEra = eras[1];
    container.querySelectorAll('[data-era]').forEach(b => {
      b.onclick = () => {
        container.querySelectorAll('[data-era]').forEach(x => x.classList.remove('active'));
        b.classList.add('active');
        currentEra = eras[Number(b.dataset.era)];
        document.getElementById('era-readout').textContent = `${currentEra.label} • ${currentEra.bw} • ${txt.dynamic_label}: ${currentEra.dr}`;
        playSynthNote(220, 'moog', currentEra.f, currentEra.q, 0.1);
      };
    });
    document.getElementById('era-play-btn').onclick = () => {
      [220, 277.18, 329.63].forEach((freq, i) => {
        setTimeout(() => playSynthNote(freq, 'moog', currentEra.f, currentEra.q, 0.15), i * 160);
      });
    };
    return;
  }

  if (seriesId === 'radio_br') {
    const stations = [
      { freq: 580, name: 'RÁDIO NACIONAL • ERA DE OURO (1936)' },
      { freq: 720, name: 'ELDORADO / JOVEM PAN AM (1960s)' },
      { freq: 890, name: '89 FM A RÁDIO ROCK (1985)' },
      { freq: 1001, name: 'TRANSAMÉRICA POP FM (1990s)' },
      { freq: 1075, name: 'PODCAST & STREAMING BRASIL (HOJE)' }
    ];
    container.innerHTML = `
      <div class="env-console">
        <div class="env-head">
          <div>
            <span class="env-badge">${t.badge_env}</span>
            <h4>${txt.title}</h4>
            <p>${txt.sub}</p>
          </div>
          <div class="env-readout" id="br-station">${stations[0].name}</div>
        </div>
        <div class="env-controls-row">
          <div class="env-sliders" style="flex:1">
            <label>${txt.tune_label}: <span id="br-mhz">580 AM</span>
              <input id="br-dial" type="range" min="540" max="1080" value="580" />
            </label>
          </div>
          <button type="button" class="env-action" id="br-sweep">${txt.static_btn}</button>
        </div>
      </div>
    `;
    const dial = document.getElementById('br-dial');
    dial.oninput = () => {
      const v = Number(dial.value);
      const unit = v < 880 ? `${v} AM` : `${(v / 10).toFixed(1)} FM`;
      document.getElementById('br-mhz').textContent = unit;
      const nearest = stations.reduce((a, b) => Math.abs(b.freq - v) < Math.abs(a.freq - v) ? b : a);
      document.getElementById('br-station').textContent = nearest.name;
    };
    dial.onchange = () => playStaticSweep(0.28, Number(dial.value) * 2);
    document.getElementById('br-sweep').onclick = () => playStaticSweep(0.55, 2400);
    return;
  }

  if (seriesId === 'radio_eua') {
    container.innerHTML = `
      <div class="env-console">
        <div class="env-head">
          <div>
            <span class="env-badge">${t.badge_env}</span>
            <h4>${txt.title}</h4>
            <p>${txt.sub}</p>
          </div>
          <div class="env-onair">● ${txt.on_air}</div>
        </div>
        <div class="env-controls-row">
          <button type="button" class="env-action" id="us-jingle">${txt.jingle_btn}</button>
          <button type="button" class="env-pill" id="us-time">${txt.siren_btn}</button>
        </div>
      </div>
    `;
    document.getElementById('us-jingle').onclick = () => {
      [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => setTimeout(() => playSynthNote(f, 'dx7', 4800, 2, 0.3), i * 110));
    };
    document.getElementById('us-time').onclick = () => playSynthNote(1000, 'theremin', 3000, 1, 0.1);
    return;
  }

  if (seriesId === 'radio_uk') {
    container.innerHTML = `
      <div class="env-console">
        <div class="env-head">
          <div>
            <span class="env-badge">${t.badge_env}</span>
            <h4>${txt.title}</h4>
            <p>${txt.sub}</p>
          </div>
          <div class="env-readout">199m MW • NORTH SEA / LONDON</div>
        </div>
        <div class="env-controls-row">
          <button type="button" class="env-action" id="uk-siren">${txt.siren_btn}</button>
          <button type="button" class="env-pill" id="uk-carrier">${txt.carrier_btn}</button>
        </div>
      </div>
    `;
    document.getElementById('uk-siren').onclick = () => {
      [880, 660, 880, 660].forEach((f, i) => setTimeout(() => playSynthNote(f, 'acid', 2400, 9, 0.45), i * 130));
    };
    document.getElementById('uk-carrier').onclick = () => playStaticSweep(0.6, 1600);
    return;
  }

  // lendas_br
  container.innerHTML = `
    <div class="env-console">
      <div class="env-head">
        <div>
          <span class="env-badge">${t.badge_env}</span>
          <h4>${txt.title}</h4>
          <p>${txt.sub}</p>
        </div>
        <div class="env-readout">REEL-TO-REEL • 7.5 IPS</div>
      </div>
      <div class="env-controls-row">
        <button type="button" class="env-action" id="lendas-drone">${txt.drone_btn}</button>
      </div>
    </div>
  `;
  const btn = document.getElementById('lendas-drone');
  btn.onclick = () => {
    if (droneNodes) {
      stopAllEnvAudio();
      btn.textContent = txt.drone_btn;
      return;
    }
    const ctx = ensureAudio();
    const o1 = ctx.createOscillator();
    const o2 = ctx.createOscillator();
    const g = ctx.createGain();
    o1.type = 'sine'; o1.frequency.value = 65.4;
    o2.type = 'triangle'; o2.frequency.value = 98.0;
    g.gain.value = 0.08;
    o1.connect(g); o2.connect(g); g.connect(analyserNode);
    o1.start(); o2.start();
    droneNodes = [o1, o2];
    btn.textContent = txt.stop_btn;
  };
};

const ENV_TIMELINES = {
  voltagem_t1: [
    { year: '1920', pt: ['Theremin', 'Léon Theremin cria o primeiro instrumento eletrônico tocado sem contato físico, usando campos eletromagnéticos.'], en: ['Theremin', 'Léon Theremin invents the first electronic instrument played without physical touch via electromagnetic fields.'], es: ['Theremin', 'Léon Theremin crea el primer instrumento electrónico tocado sin contacto físico mediante campos electromagnéticos.'], freq: 440, patch: 'theremin' },
    { year: '1964', pt: ['Moog Modular', 'Bob Moog e Wendy Carlos inauguram a síntese subtrativa controlada por tensão e o clássico filtro ladder.'], en: ['Moog Modular', 'Bob Moog and Wendy Carlos pioneer voltage-controlled subtractive synthesis and the iconic ladder filter.'], es: ['Moog Modular', 'Bob Moog y Wendy Carlos inauguran la síntesis sustractiva controlada por voltaje y el filtro ladder.'], freq: 146.83, patch: 'moog' },
    { year: '1970', pt: ['Minimoog Model D', 'O primeiro sintetizador portátil de palco com painel fixo que levou a síntese ao rock, funk e soul.'], en: ['Minimoog Model D', 'The first portable stage synthesizer with a hardwired panel that brought synthesis to rock, funk and soul.'], es: ['Minimoog Model D', 'El primer sintetizador portátil de escenario que llevó la síntesis al rock, funk y soul.'], freq: 130.81, patch: 'moog' },
    { year: '1980', pt: ['Roland TR-808', 'Bateria eletrônica analógica cujo sub-grave moldou o hip-hop, electro, Miami bass e funk carioca.'], en: ['Roland TR-808', 'Analog drum machine whose booming sub-bass shaped hip-hop, electro, Miami bass and funk.'], es: ['Roland TR-808', 'Caja de ritmos analógica cuyo subgrave moldeó el hip-hop, el electro y el funk.'], freq: 65.4, patch: 'moog' },
    { year: '1982', pt: ['TB-303 & MIDI', 'O baixo ácido que gerou o Acid House em Chicago e o protocolo MIDI conectando todas as marcas.'], en: ['TB-303 & MIDI', 'The squelchy bassline that sparked Acid House and the universal MIDI protocol linking all gear.'], es: ['TB-303 & MIDI', 'El bajo ácido que originó el Acid House y el protocolo MIDI conectando todos los equipos.'], freq: 110, patch: 'acid' },
    { year: '1983', pt: ['Yamaha DX7', 'Síntese FM digital com pianos elétricos cristalinos e sinos metálicos que dominaram os anos 80.'], en: ['Yamaha DX7', 'Digital FM synthesis delivering glassy electric pianos and metallic bells across 1980s pop.'], es: ['Yamaha DX7', 'Síntesis FM digital con pianos eléctricos cristalinos y campanas que definieron los años 80.'], freq: 523.25, patch: 'dx7' },
    { year: 'BR', pt: ['Brasil Eletrônico', 'De Lincoln Olivetti e César Camargo Mariano a Tom Zé e Egberto Gismonti reinventando a MPB com synths.'], en: ['Electronic Brazil', 'From Lincoln Olivetti and César Camargo Mariano to Tom Zé and Egberto Gismonti reinventing MPB.'], es: ['Brasil Electrónico', 'De Lincoln Olivetti y César Camargo Mariano a Tom Zé reinventando la MPB con sintetizadores.'], freq: 220, patch: 'moog' }
  ],
  voltagem_t2: [
    { year: '1890', pt: ['Tin Pan Alley', 'Editoras de partituras em Nova York criam o primeiro modelo industrial de hits populares.'], en: ['Tin Pan Alley', 'New York sheet-music publishers establish the first industrial hit-making machine.'], es: ['Tin Pan Alley', 'Editoriales de partituras en Nueva York crean el primer modelo industrial de éxitos.'], freq: 261.63, patch: 'theremin' },
    { year: '1948', pt: ['Vinil LP 33 RPM', 'A Columbia lança o Long Play em microssulco, transformando o álbum em narrativa artística.'], en: ['33 RPM Vinyl LP', 'Columbia introduces the microgroove Long Play, turning the album into an art form.'], es: ['Vinilo LP 33 RPM', 'Columbia lanza el Long Play, transformando el álbum en obra artística completa.'], freq: 196, patch: 'moog' },
    { year: '1979', pt: ['Walkman & K7', 'A portabilidade pessoal e a cultura das mixtapes gravadas em casa.'], en: ['Walkman & Cassette', 'Personal portable listening and home-recorded mixtape culture.'], es: ['Walkman & Casete', 'La escucha portátil personal y la cultura de las mixtapes caseras.'], freq: 220, patch: 'moog' },
    { year: '1999', pt: ['Napster & MP3', 'O compartilhamento P2P quebra a distribuição física e força a reinvenção das gravadoras.'], en: ['Napster & MP3', 'P2P file sharing disrupts physical retail and forces major labels to reinvent.'], es: ['Napster & MP3', 'El intercambio P2P rompe la distribución física y obliga a reinventar la industria.'], freq: 329.63, patch: 'dx7' },
    { year: '2008+', pt: ['Streaming & Algoritmo', 'Da posse à assinatura: playlists editoriais, algoritmos de recomendação e IA generativa.'], en: ['Streaming & Algorithm', 'From ownership to access: editorial playlists, recommendation feeds and AI.'], es: ['Streaming & Algoritmo', 'De la propiedad al acceso: playlists, algoritmos de recomendación e IA.'], freq: 440, patch: 'dx7' }
  ],
  radio_br: [
    { year: '1922', pt: ['Rádio Sociedade', 'Roquette-Pinto realiza as primeiras transmissões educativas e musicais no Rio de Janeiro.'], en: ['Rádio Sociedade', 'Roquette-Pinto launches Brazil’s first educational and musical radio broadcasts.'], es: ['Rádio Sociedade', 'Roquette-Pinto realiza las primeras transmisiones educativas y musicales en Brasil.'] },
    { year: '1936', pt: ['Rádio Nacional', 'A Era de Ouro: orquestras ao vivo, auditórios lotados, cantoras do rádio e radionovelas.'], en: ['Rádio Nacional', 'The Golden Era: live studio orchestras, packed auditoriums and radio queens.'], es: ['Rádio Nacional', 'La Era de Oro: orquestas en vivo, auditorios llenos y estrellas de la radio.'] },
    { year: '1960s', pt: ['AM & O Jabá', 'A disputa intensa pelas paradas AM, discotecagem ao vivo e os bastidores do jabá.'], en: ['AM & Payola', 'Fierce battles for AM charts, live DJs and behind-the-scenes payola.'], es: ['AM & Payola', 'La batalla por las listas AM, locutores estrella y la trastienda del jabá.'] },
    { year: '1970s', pt: ['Guerra do FM', 'Som estéreo de alta fidelidade abre espaço para rock, soul, MPB e novas programações.'], en: ['FM Revolution', 'Stereo hi-fi opens the dial to rock, soul, MPB and curated musical programming.'], es: ['Revolución FM', 'El estéreo de alta fidelidad abre espacio al rock, soul y nueva programación.'] },
    { year: '1985+', pt: ['89 Rock & Digital', 'Segmentação FM jovem nos anos 80/90 até a migração para web rádios e podcasts.'], en: ['89 Rock & Digital', 'Youth FM segmentation in the 80s/90s evolving into web radio and podcasts.'], es: ['89 Rock & Digital', 'Segmentación FM juvenil hasta la transición a radios web y podcasts.'] }
  ],
  radio_eua: [
    { year: '1906', pt: ['Fessenden', 'Reginald Fessenden transmite voz e violino sem fio pela primeira vez na véspera de Natal.'], en: ['Fessenden', 'Reginald Fessenden broadcasts voice and violin wirelessly on Christmas Eve.'], es: ['Fessenden', 'Reginald Fessenden transmite voz y violín por primera vez en Nochebuena.'] },
    { year: '1953', pt: ['Todd Storz Top 40', 'Nasce o formato de alta rotação baseado nas músicas mais tocadas nas jukeboxes.'], en: ['Todd Storz Top 40', 'High-rotation format born from watching diners replay the same jukebox hits.'], es: ['Todd Storz Top 40', 'Nace el formato de alta rotación inspirado en las canciones más repetidas en jukeboxes.'] },
    { year: '1959', pt: ['Escândalo Payola', 'O Congresso investiga pagamentos ocultos a DJs como Alan Freed para tocar discos.'], en: ['Payola Scandal', 'Congressional hearings expose hidden payments to DJs like Alan Freed for airplay.'], es: ['Escándalo Payola', 'El Congreso investiga pagos ocultos a DJs como Alan Freed por rotación en antena.'] },
    { year: '1996', pt: ['Clear Channel', 'Desregulamentação permite grandes conglomerados unificarem redes de emissoras.'], en: ['Clear Channel', 'Telecom deregulation enables nationwide consolidation and syndicated radio.'], es: ['Clear Channel', 'La desregulación permite grandes cadenas nacionales de emisoras.'] },
    { year: '2020s', pt: ['TikTok & Airplay', 'Vídeos curtos verticais passam a ditar o que entra nas paradas de rádio tradicionais.'], en: ['TikTok & Airplay', 'Short vertical videos dictate which tracks break into traditional radio charts.'], es: ['TikTok & Airplay', 'Los videos cortos verticales pasan a dictar qué suena en las radios.'] }
  ],
  radio_uk: [
    { year: '1922', pt: ['Monopólio BBC', 'Lord Reith define a missão pública: informar, educar e entreter — com música pop restrita.'], en: ['BBC Monopoly', 'Lord Reith sets the public service remit — leaving youth pop underserved.'], es: ['Monopolio BBC', 'Lord Reith define la misión pública, dejando poco espacio al pop juvenil.'] },
    { year: '1964', pt: ['Radio Caroline', 'Navios ancorados fora das águas territoriais no Mar do Norte transmitem rock 24h por dia.'], en: ['Radio Caroline', 'Offshore pirate ships in the North Sea broadcast non-stop rock around the clock.'], es: ['Radio Caroline', 'Barcos piratas en el Mar del Norte transmiten rock las 24 horas.'] },
    { year: '1967', pt: ['BBC Radio 1 & Peel', 'O governo cria a Radio 1 e John Peel transforma suas Sessions no templo da música alternativa.'], en: ['BBC Radio 1 & Peel', 'BBC launches Radio 1 and John Peel turns his Sessions into an indie institution.'], es: ['BBC Radio 1 & Peel', 'Nace Radio 1 y John Peel convierte sus Sessions en templo alternativo.'] },
    { year: '1994', pt: ['Rinse FM Londres', 'Transmissores piratas em prédios de Londres incubam jungle, UK garage, grime e dubstep.'], en: ['Rinse FM London', 'Rooftop pirate transmitters incubate jungle, UK garage, grime and dubstep.'], es: ['Rinse FM Londres', 'Emisoras piratas en azoteas incuban jungle, UK garage, grime y dubstep.'] },
    { year: '2010s', pt: ['DAB & Web UK', 'NTS, BBC 6 Music e rádios comunitárias conectam cenas locais ao mundo todo.'], en: ['DAB & Web UK', 'NTS, BBC 6 Music and community stations connect local underground scenes globally.'], es: ['DAB & Web UK', 'NTS y BBC 6 Music conectan las escenas locales con el mundo entero.'] }
  ],
  lendas_br: [
    { year: '1950s', pt: ['Imprensa Popular', 'Jornais sensacionalistas transformam boatos urbanos em manchetes nacionais inesquecíveis.'], en: ['Tabloid Press', 'Sensationalist newspapers turn urban rumors into unforgettable front-page stories.'], es: ['Prensa Popular', 'Periódicos sensacionalistas convierten rumores urbanos en portadas inolvidables.'] },
    { year: '1970s', pt: ['Lendas Urbanas', 'Relatos de escolas, hospitais e túneis se espalham pelo boca a boca nas grandes cidades.'], en: ['Urban Legends', 'Tales from schools, hospitals and tunnels spread by word of mouth across cities.'], es: ['Leyendas Urbanas', 'Relatos de escuelas, hospitales y túneles se propagan boca a boca.'] },
    { year: '1977', pt: ['Operação Prato', 'A Força Aérea Brasileira documenta fenômenos luminosos misteriosos em Colares, no Pará.'], en: ['Operação Prato', 'Brazilian Air Force documents unexplained aerial light phenomena in Colares, Pará.'], es: ['Operación Plato', 'La Fuerza Aérea Brasileña documenta fenómenos luminosos en Colares, Pará.'] },
    { year: '1986', pt: ['Noite dos OVNIs', 'Radares civis e militares registram 21 objetos não identificados nos céus do Sudeste.'], en: ['Official UFO Night', 'Civilian and military radars track 21 unidentified objects over southeastern Brazil.'], es: ['Noche de los OVNIs', 'Radares civiles y militares registran 21 objetos no identificados en el cielo.'] },
    { year: '1996', pt: ['Caso Varginha', 'O episódio mais famoso e debatido dos arquivos ufológicos e jornalísticos do Brasil.'], en: ['Varginha Incident', 'Brazil’s most famous and debated UFO and investigative journalism mystery.'], es: ['Caso Varginha', 'El episodio más famoso y debatido de los archivos ufológicos de Brasil.'] }
  ]
};

(function hookTimelineIntoEnv() {
  const orig = window.renderSeriesEnvironment;
  window.renderSeriesEnvironment = function (container, seriesId, lang) {
    orig(container, seriesId, lang);
    const list = ENV_TIMELINES[seriesId];
    const box = container.querySelector('.env-console');
    if (!list || !box) return;

    const l = lang === 'en' || lang === 'es' ? lang : 'pt';
    const heading = l === 'en' ? 'INTERACTIVE TIMELINE' : l === 'es' ? 'LÍNEA DE TIEMPO INTERACTIVA' : 'LINHA DO TEMPO INTERATIVA';

    const wrap = document.createElement('div');
    wrap.className = 'env-timeline';
    wrap.innerHTML = `
      <div class="tl-label">${heading}</div>
      <div class="tl-track">
        ${list.map((it, i) => `<button type="button" class="tl-node ${i === 0 ? 'active' : ''}" data-tl="${i}"><span>${it.year}</span><small>${it[l][0]}</small></button>`).join('')}
      </div>
      <div class="tl-detail" id="tl-detail">
        <strong>${list[0].year} — ${list[0][l][0]}</strong>
        <p>${list[0][l][1]}</p>
      </div>
    `;
    box.appendChild(wrap);

    wrap.querySelectorAll('.tl-node').forEach(node => {
      node.onclick = () => {
        wrap.querySelectorAll('.tl-node').forEach(n => n.classList.remove('active'));
        node.classList.add('active');
        const item = list[Number(node.dataset.tl)];
        document.getElementById('tl-detail').innerHTML = `<strong>${item.year} — ${item[l][0]}</strong><p>${item[l][1]}</p>`;
        if (item.freq) {
          playSynthNote(item.freq, item.patch || 'moog', 1900, 5, 0.25);
          drawScope('env-scope');
        } else {
          playStaticSweep(0.22, 1500);
        }
      };
    });
  };
})();
