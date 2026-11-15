(function () {
  var btn = document.getElementById('menuBtn');
  var nav = document.getElementById('mobileNav');
  if (btn && nav) {
    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
        btn.setAttribute('aria-label', 'Abrir menu');
      });
    });
  }
  // Maré viva no topo (mesma animação do app BLUXXY); para quando sai da tela ou com "reduzir movimento"
  var svg = document.getElementById('mare');
  if (svg && window.ResizeObserver) {
    var tras = svg.querySelector('.tras'), frente = svg.querySelector('.frente');
    var reduz = window.matchMedia('(prefers-reduced-motion: reduce)');
    var W = 0, H = 0, Y0 = 52, visivel = true, raf = 0;
    var sup = function (amp, k, vel, t, sobe) {
      var d = 'M-10 ' + H;
      for (var px = -10; px <= W + 10; px += 8) d += 'L' + px + ' ' + (Y0 + sobe + amp * Math.sin(px * k + t * vel) + amp * 0.5 * Math.sin(px * k * 2.3 - t * vel * 0.7)).toFixed(1);
      return d + 'L' + (W + 10) + ' ' + H + 'Z';
    };
    var desenhar = function (t) { tras.setAttribute('d', sup(8, 0.010, -1.1, t, -14)); frente.setAttribute('d', sup(7, 0.015, 1.5, t, 6)); };
    var quadro = function (now) { desenhar(now / 1000); raf = (visivel && !reduz.matches) ? requestAnimationFrame(quadro) : 0; };
    var ajustar = function () { W = svg.clientWidth; H = svg.clientHeight; svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H); desenhar(0); if (!raf && visivel && !reduz.matches) raf = requestAnimationFrame(quadro); };
    new ResizeObserver(ajustar).observe(svg);
    if (window.IntersectionObserver) new IntersectionObserver(function (e) { visivel = e[0].isIntersecting; if (visivel && !raf && !reduz.matches) raf = requestAnimationFrame(quadro); }).observe(svg);
  }

  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
