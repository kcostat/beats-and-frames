// Escala cada pagina de 1920x1080 para caber na janela e dispara as animacoes ao entrar na tela.
(function () {
  var stages = Array.prototype.slice.call(document.querySelectorAll('.stage'));
  function fit() {
    var w = window.innerWidth, h = window.innerHeight;
    var k = Math.min(w / 1920, h / 1080);
    stages.forEach(function (st) {
      st.firstElementChild.style.transform = 'scale(' + k + ') translate(-50%, -50%)';
    });
  }
  window.addEventListener('resize', fit);
  fit();
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) e.target.classList.add('on'); });
  }, { threshold: 0.5 });
  stages.forEach(function (st) { io.observe(st); });
  function current() {
    var y = window.scrollY, best = 0, dist = Infinity;
    stages.forEach(function (st, i) { var dd = Math.abs(st.offsetTop - y); if (dd < dist) { dist = dd; best = i; } });
    return best;
  }
  document.addEventListener('keydown', function (ev) {
    var next = ['ArrowDown', 'ArrowRight', 'PageDown', ' '].indexOf(ev.key) >= 0;
    var prev = ['ArrowUp', 'ArrowLeft', 'PageUp'].indexOf(ev.key) >= 0;
    if (!next && !prev) return;
    ev.preventDefault();
    var i = Math.max(0, Math.min(stages.length - 1, current() + (next ? 1 : -1)));
    stages[i].scrollIntoView({ behavior: 'smooth' });
  });
})();
