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
