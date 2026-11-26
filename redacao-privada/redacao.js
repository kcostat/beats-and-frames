// redacao.js — Sala Editorial Beats & Frames
const PIN_CORRETO = "2027";

let DADOS_EDITORIAIS = [];
let pautaAtivaIdx = 0;

function verificarPin() {
  const input = document.getElementById("pin-input");
  const erro = document.getElementById("pin-erro");
  const lembrar = document.getElementById("lembrar-dispositivo")?.checked;

  if (input.value.trim() === PIN_CORRETO) {
    sessionStorage.setItem("redacao_autenticada", "true");
    if (lembrar) {
      localStorage.setItem("redacao_autenticada", "true");
    }
    desbloquear();
  } else {
    erro.style.display = "block";
    input.value = "";
    input.focus();
  }
}

function desbloquear() {
  document.getElementById("gate").style.display = "none";
  document.getElementById("app-header").style.display = "block";
  document.getElementById("app-main").style.display = "block";
  carregarDados();
}

function sair() {
  sessionStorage.removeItem("redacao_autenticada");
  localStorage.removeItem("redacao_autenticada");
  location.reload();
}

function alternarTema() {
  document.body.classList.toggle("theme-dark");
}

function mudarAba(nomeAba) {
  document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));
  document.querySelectorAll(".panel").forEach(p => p.classList.remove("active"));
  
  event.target.classList.add("active");
  const painel = document.getElementById(`panel-${nomeAba}`);
  if (painel) painel.classList.add("active");
}

function copiarConteudo(elemId) {
  const elem = document.getElementById(elemId);
  if (!elem) return;
  const texto = elem.innerText;
  navigator.clipboard.writeText(texto).then(() => {
    const btn = event.target;
    const txtOriginal = btn.innerText;
    btn.innerText = "Copiado! ✓";
    setTimeout(() => { btn.innerText = txtOriginal; }, 2000);
  });
}

async function carregarDados() {
  try {
    const res = await fetch("data/materias.json");
    if (res.ok) {
      DADOS_EDITORIAIS = await res.json();
    }
  } catch (e) {
    console.warn("Falha ao carregar materias.json via fetch, usando mock local", e);
  }

  if (!DADOS_EDITORIAIS || DADOS_EDITORIAIS.length === 0) {
    DADOS_EDITORIAIS = getDadosExemplo();
  }

  renderizarNavPautas();
  selecionarPauta(0);
}

function renderizarNavPautas() {
  const nav = document.getElementById("pautas-list");
  nav.innerHTML = "";
  DADOS_EDITORIAIS.forEach((item, idx) => {
    const chip = document.createElement("button");
    chip.className = `pauta-chip ${idx === pautaAtivaIdx ? "active" : ""}`;
    chip.innerText = item.badge || item.titulo;
    chip.onclick = () => selecionarPauta(idx);
    nav.appendChild(chip);
  });
}

function selecionarPauta(idx) {
  pautaAtivaIdx = idx;
  const pauta = DADOS_EDITORIAIS[idx];
  if (!pauta) return;

  // Atualiza chips
  document.querySelectorAll(".pauta-chip").forEach((c, i) => {
    c.classList.toggle("active", i === idx);
  });

  // Metadados
  document.getElementById("pauta-badge").innerText = pauta.badge || "PAUTA";
  document.getElementById("pauta-data").innerText = pauta.data || "Atualizado";
  document.getElementById("pauta-titulo").innerText = pauta.titulo || "";
  document.getElementById("pauta-sub").innerText = pauta.subtitulo || "";

  // Painel 1: Reportagem
  document.getElementById("texto-reportagem").innerHTML = pauta.reportagem_html || "<p>Nenhum texto disponível.</p>";

  // Painel 2: Podcast
  document.getElementById("texto-podcast").innerHTML = pauta.podcast_html || "<p>Nenhum roteiro de podcast disponível.</p>";

  // Painel 3: Vídeo (Tabela)
  document.getElementById("tabela-video").innerHTML = pauta.video_html || "<p>Nenhum roteiro de vídeo disponível.</p>";

  // Painel 4: Aspas
  renderizarAspas(pauta.aspas || []);

  // Painel 5: Transcrição
  document.getElementById("texto-transcricao").innerHTML = pauta.transcricao_html || "<p>Nenhuma transcrição disponível.</p>";
}

function renderizarAspas(aspas) {
  const container = document.getElementById("grid-aspas");
  container.innerHTML = "";
  if (!aspas || aspas.length === 0) {
    container.innerHTML = "<p>Nenhuma aspa de ouro catalogada.</p>";
    return;
  }
  aspas.forEach(a => {
    const card = document.createElement("div");
    card.className = "aspa-card";
    card.innerHTML = `
      <p class="aspa-quote">“${a.texto}”</p>
      <div class="aspa-meta">
        <span class="badge">${a.categoria || 'SONORA'}</span>
        <span class="tc-ref">${a.timecode || ''}</span>
      </div>
    `;
    container.appendChild(card);
  });
}

function getDadosExemplo() {
  return [
    {
      id: "pauta_tailandia_gl",
      badge: "PAUTA 01 · TAILÂNDIA",
      data: "Novembro 2026 · Marie Claire / Beats & Frames",
      titulo: "O fenômeno das séries de amor entre mulheres",
      subtitulo: "Final feliz, romance construído com calma e mulheres no centro da narrativa. A revolução das séries Girls Love em Bangkok.",
      reportagem_html: `
        <p>Durante décadas, o amor entre mulheres apareceu na teledramaturgia como trama secundária, fetiche ou tragédia inescapável. Nas produtoras de Bangkok, no entanto, uma nova geração de roteiristas decidiu subverter a lógica: o afeto feminino virou protagonista com final feliz, narrativa de respeito e audiências estratosféricas na casa das centenas de milhões de visualizações.</p>
        <blockquote>
          “Quando nós escrevemos a primeira temporada, a única certeza era: nós não vamos matar as personagens no final. Elas têm direito à felicidade.” 
          <span class="tc-ref">[04:15]</span>
        </blockquote>
        <h3>A Economia do Afeto</h3>
        <p>O que começou como produções independentes no YouTube tornou-se uma indústria de quase 5 bilhões de bahts (cerca de R$ 790 milhões). Em 2025, o governo tailandês passou a incentivar financeiramente a exportação desse formato, trazendo atrizes consagradas para o Brasil em eventos com ingressos esgotados em minutos.</p>
      `,
      podcast_html: `
        <div class="podcast-block">
          <h4>[ABERTURA / TEASER]</h4>
          <p><strong>[SOBE TRILHA ELETRÔNICA DELICADA - AMBIÊNCIA DE BANGKOK]</strong></p>
          <p><strong>NARRADOR (OFF):</strong> Você está prestes a ouvir como duas jovens atrizes em um estúdio simples de Bangkok transformaram a forma como o mundo assiste ao romance entre mulheres.</p>
          <p><strong>[INSERT SONORA 01 - 04:15 a 04:42]:</strong> <em>“Quando nós escrevemos a primeira temporada, a única certeza era: nós não vamos matar as personagens no final...”</em></p>
          <p><strong>NARRADOR (OFF):</strong> Essa é a história do fenômeno Girls Love da Tailândia. Um mercado de centenas de milhões de dólares que cruzou o Pacífico e conquistou o Brasil.</p>
        </div>
      `,
      video_html: `
        <table class="video-table">
          <thead>
            <tr>
              <th class="col-cena">CENA</th>
              <th class="col-video">VÍDEO (Planos & B-Roll)</th>
              <th class="col-audio">ÁUDIO (Locução / Sonoras)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="col-cena">01</td>
              <td>Plano aberto em slow-motion: multidão em frente a um telão em Bangkok com cartazes de fãs. Letreiro: BANGKOK, TAILÂNDIA.</td>
              <td>[SOM AMBIENTE DE GRITOS DE FÃS + TRILHA ELEGANTE SOBE E CORTA PRO OFF DO REPÓRTER]</td>
            </tr>
            <tr>
              <td class="col-cena">02</td>
              <td>Corte para close no rosto da produtora entrevistada. GC: NOME DA PRODUTORA / DIRETORA DE DRAMA.</td>
              <td><strong>SONORA [04:15 - 04:38]:</strong> “Quando nós escrevemos a primeira temporada, a única certeza era: nós não vamos matar as personagens no final.”</td>
            </tr>
          </tbody>
        </table>
      `,
      aspas: [
        { texto: "Quando nós escrevemos a primeira temporada, a única certeza era: nós não vamos matar as personagens no final. Elas têm direito à felicidade.", timecode: "04:15", categoria: "SONORA FORTE (OURO)" },
        { texto: "O mercado internacional acordou para nós quando vimos que quase 40% dos comentários vinham da América Latina traduzidos por fãs.", timecode: "11:22", categoria: "MERCADO / CONTEXTO" }
      ],
      transcricao_html: `
        <p><strong>[00:00]</strong> Olá, estamos iniciando a gravação da entrevista aqui em Bangkok para a Marie Claire e Beats & Frames.</p>
        <p><strong>[04:15]</strong> Quando nós escrevemos a primeira temporada, a única certeza era: nós não vamos matar as personagens no final. Elas têm direito à felicidade.</p>
        <p><strong>[11:22]</strong> O mercado internacional acordou para nós quando vimos que quase 40% dos comentários vinham da América Latina traduzidos por fãs.</p>
      `
    }
  ];
}

// Checa autenticação inicial
window.addEventListener("DOMContentLoaded", () => {
  if (
    sessionStorage.getItem("redacao_autenticada") === "true" ||
    localStorage.getItem("redacao_autenticada") === "true"
  ) {
    desbloquear();
  }
});
