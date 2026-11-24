/* BLUXXY — Manual interativo: pontos nas telas, tour guiado, busca, sumário, simulador de alcance. */
(function () {
  'use strict';
  var D = document, W = window;
  var reduz = W.matchMedia && W.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // posição de cada botão nas capturas: [esquerda, topo, largura, altura] em % da tela (medidas no próprio app)
  var P = {"cel-inicio":{"regiao":[75.1,1.1,10.3,4.5],"notif":[87.4,1,10.3,4.7],"radar":[4.1,13.4,44.2,5.2],"abas":[34.5,6.8,30.9,5],"fantasma":[65.5,6.8,30.9,5],"mapa":[3.8,20.1,92.3,50],"barco":[3.6,71.2,40.2,4],"ancorar":[45.3,71.2,21.9,4],"lista":[3.8,81.5,92.3,5.5],"dock":[0,88.2,20,11.8]},"cel-radar-lista":{"lista":[3.6,81.4,92.8,18.6]},"cel-cartao":{"fotos":[2.8,6.1,94.4,43.6],"verif":[53.9,52.1,5.1,2.4],"online":[79.3,52.2,13.3,2.1],"mare":[7.4,68.6,65.1,4.6],"respostas":[7.4,68.6,85.1,31.4]},"cel-cartao-2":{"onda":[7.4,69.6,71.8,5.2],"salvar":[81.3,69.6,11.3,5.2],"chat":[7.4,75.8,85.1,5.2],"mar":[7.4,82.2,27.3,4.3],"bloq":[36.3,82.2,27.4,4.3],"denun":[65.2,82.2,27.4,4.3],"puxar":[7.4,20.5,65.1,4.6]},"cel-fantasma":{"botao":[23.8,47.1,52.3,5.2]},"cel-praia":{"mares":[3.6,28.8,92.8,11.1],"busca":[14.1,15.6,79,2.3],"cidade":[14.1,22,79,2.3],"texto":[18.5,43.7,77.4,8],"publicar":[4.1,58.4,31.9,5.2],"vis":[45.2,53.4,38.4,4],"feed":[3.6,67.1,92.8,32.9],"fab":[81,82,14.4,6.6]},"cel-atividades":{},"cel-ondas":{"abas":[3.6,46.2,25.7,4.5],"enviadas":[30.8,46.2,23.5,4.5]},"cel-conversas":{"convites":[4.1,29.6,91.8,17.9],"abas":[4.1,23.4,45.1,4.7],"ilhas":[50.8,23.4,45.1,4.7],"cota":[5.1,48.7,89.7,2.1],"itens":[4.1,52.2,91.8,23.9]},"cel-conversa":{"cab":[3.8,15.4,92.3,8.2],"opcoes":[82.3,17.1,10.3,4.7],"msgs":[3.8,23.6,92.3,59.8],"anexo":[6.9,84.8,11.3,5.2],"mic":[68.5,84.8,11.3,5.2],"caixa":[20.3,84.7,46.2,5.3],"enviar":[81.8,84.8,11.3,5.2]},"cel-ilhas":{"cidade":[4.1,32.7,91.8,7.3],"codigo":[4.1,49.7,48.3,5]},"cel-ilha-chat":{"cab":[3.8,15.4,92.3,8.2],"gestao":[82.3,17.1,10.3,4.7],"msgs":[3.8,23.6,92.3,59.8]},"cel-ilha-gestao":{"membros":[7.4,24.9,29.4,4.7],"pedidos":[37.8,24.9,27.3,4.7],"ajustes":[66.1,24.9,26.5,4.7],"eventos":[7.4,53.9,85.1,26.8],"destruir":[7.4,83.9,33.2,4.7]},"cel-ilha-ajustes":{"convite":[7.4,48,85.1,11.4],"modelos":[7.4,71.5,85.1,10.7],"farol":[80.3,87.7,12.3,3.3]},"cel-perfil":{"foto":[7.9,17.6,29.7,13.7],"nivel":[50.3,22,21.8,2],"completo":[3.6,49.5,92.8,24.8],"ajuda":[3.6,76,92.8,21]},"cel-entrar":{"email":[9,24.8,82.1,5],"entrar":[9,40.5,82.1,5.7]},"cel-permissoes":{"local":[9,28.1,82.1,22.1],"notif":[9,51.6,82.1,15.9],"camera":[9,68.9,82.1,15.9],"mic":[9,86.3,82.1,13.7]},"cel-idade":{"play":[9,39.8,82.1,5.7]}};
  function $(s, r) { return (r || D).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || D).querySelectorAll(s)); }
  function el(t, c, x) { var e = D.createElement(t); if (c) e.className = c; if (x != null) e.textContent = x; return e; }
  function caixa(tela, r) { var c = el('div', 'caixa-ponto'); c.style.left = r[0] + '%'; c.style.top = r[1] + '%'; c.style.width = r[2] + '%'; c.style.height = r[3] + '%'; tela.appendChild(c); return c; }

  /* ---------- pontos numerados nas telas ---------- */
  $$('figure.cel[data-tela]').forEach(function (fig) {
    var nome = fig.getAttribute('data-tela'), mapa = P[nome] || {}, tela = $('.cel-tela', fig);
    var lista = $('ol.pontos[data-para="' + nome + '"]'); if (!lista || !tela) return;
    $$('li', lista).forEach(function (li, i) {
      var r = mapa[li.getAttribute('data-k')];
      if (!r) { li.classList.add('sem-pino'); return; }
      var cx = Math.min(94, Math.max(6, r[0] + r[2] / 2)), cy = Math.min(96, Math.max(3, r[1] + r[3] / 2));
      var b = el('button', 'pino', String(i + 1)); b.type = 'button'; b.style.left = cx + '%'; b.style.top = cy + '%';
      b.setAttribute('aria-label', (i + 1) + ': ' + (li.querySelector('b') ? li.querySelector('b').textContent : 'detalhe'));
      var cx2 = caixa(tela, r);
      function liga(on) { b.classList.toggle('on', on); li.classList.toggle('on', on); cx2.classList.toggle('on', on); }
      b.addEventListener('mouseenter', function () { liga(true); }); b.addEventListener('mouseleave', function () { liga(false); });
      b.addEventListener('focus', function () { liga(true); }); b.addEventListener('blur', function () { liga(false); });
      b.addEventListener('click', function (e) { e.stopPropagation(); $$('.pino.on, ol.pontos li.on, .caixa-ponto.on').forEach(function (x) { x.classList.remove('on'); }); liga(true);
        var r2 = li.getBoundingClientRect(); if (r2.top < 70 || r2.bottom > innerHeight) li.scrollIntoView({ behavior: reduz ? 'auto' : 'smooth', block: 'center' }); });
      li.addEventListener('mouseenter', function () { liga(true); }); li.addEventListener('mouseleave', function () { liga(false); });
      tela.appendChild(b);
    });
  });

  /* ---------- ampliar ---------- */
  var zoom = $('#m-zoom'), zImg = $('#m-zoom-img');
  function ampliar(src, alt) { zImg.src = src; zImg.alt = alt || ''; zoom.hidden = false; $('.m-zoom-x', zoom).focus(); }
  function fecharZoom() { zoom.hidden = true; zImg.removeAttribute('src'); }
  $$('figure.cel .cel-tela img, .pc-moldura img').forEach(function (img) { img.addEventListener('click', function () { ampliar(img.currentSrc || img.src, img.alt); }); });
  zoom.addEventListener('click', fecharZoom);
  D.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !zoom.hidden) fecharZoom(); });

  /* ---------- sumário: seção atual, menu no celular ---------- */
  var sum = $('#m-sumario'), sumBtn = $('#m-sumario-btn'), atual = $('#m-sumario-atual');
  var links = $$('#m-sumario-nav a');
  sumBtn.addEventListener('click', function () { var ab = sum.classList.toggle('aberto'); sumBtn.setAttribute('aria-expanded', String(ab)); });
  links.forEach(function (a) { a.addEventListener('click', function () { sum.classList.remove('aberto'); sumBtn.setAttribute('aria-expanded', 'false'); }); });
  var secs = $$('.m-sec');
  if (W.IntersectionObserver) {
    var vistas = {};
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { vistas[e.target.id] = e.isIntersecting ? e.intersectionRatio : 0; });
      var melhor = null, mv = 0; secs.forEach(function (s) { if ((vistas[s.id] || 0) > mv) { mv = vistas[s.id]; melhor = s.id; } });
      if (melhor) links.forEach(function (a) { var on = a.getAttribute('href') === '#' + melhor; a.classList.toggle('on', on); if (on) atual.textContent = '· ' + a.textContent.replace(/^[\d.▶ ]+/, ''); });
    }, { rootMargin: '-80px 0px -45% 0px', threshold: [0, .1, .3, .6] });
    secs.forEach(function (s) { io.observe(s); });
    var rv = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('visto'); rv.unobserve(e.target); } }); }, { rootMargin: '0px 0px -8% 0px' });
    if (!reduz) $$('.m-card, figure.cel, .pc, .m-nivel, .m-plano, .m-glossario > div, .m-fluxo > div').forEach(function (x) { x.classList.add('revela'); rv.observe(x); });
  }

  /* ---------- leitura e voltar ao topo ---------- */
  var barra = $('#leitura'), topo = $('#m-topo');
  function rolar() { var h = D.documentElement, max = h.scrollHeight - h.clientHeight; barra.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + '%'; topo.hidden = h.scrollTop < 900; }
  W.addEventListener('scroll', rolar, { passive: true }); rolar();
  topo.addEventListener('click', function () { W.scrollTo({ top: 0, behavior: reduz ? 'auto' : 'smooth' }); });

  /* ---------- telas girando no topo ---------- */
  var slides = $$('#hero-slides img'), si = 0;
  if (slides.length > 1 && !reduz) setInterval(function () { slides[si].classList.remove('on'); si = (si + 1) % slides.length; slides[si].classList.add('on'); }, 3200);

  /* ---------- busca ---------- */
  var busca = $('#m-busca'), res = $('#m-busca-res');
  var tira = function (s) { return String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); };
  var indice = secs.filter(function (s) { return s.id !== 'tour'; }).map(function (s) {
    var h = $('h2', s); return { id: s.id, titulo: (($('.m-num', s) || {}).textContent || '') + '. ' + (h ? h.textContent : ''), extra: tira(s.getAttribute('data-busca')), texto: tira(s.textContent), bruto: s.textContent.replace(/\s+/g, ' ') };
  });
  function trecho(t, q) { var i = tira(t).indexOf(q); if (i < 0) return ''; var a = Math.max(0, i - 40); return (a ? '…' : '') + t.slice(a, i + q.length + 70).trim() + '…'; }
  function buscar() {
    var q = tira(busca.value).trim(); while (res.firstChild) res.removeChild(res.firstChild);
    if (q.length < 2) { res.hidden = true; return; }
    var termos = q.split(/\s+/);
    var achados = indice.map(function (x) { var pts = 0; termos.forEach(function (t) { if (x.extra.indexOf(t) >= 0) pts += 3; if (tira(x.titulo).indexOf(t) >= 0) pts += 4; if (x.texto.indexOf(t) >= 0) pts += 1; }); return { x: x, pts: pts }; })
      .filter(function (r) { return r.pts > 0; }).sort(function (a, b) { return b.pts - a.pts; }).slice(0, 6);
    if (!achados.length) { res.appendChild(el('li', 'vazio', 'Nada encontrado. Tente outra palavra (ex.: onda, ilha, áudio).')); res.hidden = false; return; }
    achados.forEach(function (r) {
      var li = el('li'), a = el('a'); a.href = '#' + r.x.id; a.appendChild(el('b', null, r.x.titulo));
      var t = trecho(r.x.bruto, termos[0]); if (t) a.appendChild(el('small', null, t));
      a.addEventListener('click', function () { res.hidden = true; }); li.appendChild(a); res.appendChild(li);
    });
    res.hidden = false;
  }
  busca.addEventListener('input', buscar);
  busca.addEventListener('keydown', function (e) { if (e.key === 'Enter') { var a = $('a', res); if (a) { e.preventDefault(); a.click(); location.hash = a.getAttribute('href'); } } if (e.key === 'Escape') { busca.value = ''; buscar(); } });
  D.addEventListener('keydown', function (e) { if (e.key === '/' && D.activeElement !== busca && !/input|textarea|select/i.test(D.activeElement.tagName)) { e.preventDefault(); busca.focus(); busca.scrollIntoView({ block: 'center' }); } });

  /* ---------- simulador de alcance ---------- */
  var cb = $('#calc-barco'), cm = $('#calc-mar'), cc = $('#calc-mare');
  function calc() { var mn = +cb.value + 5 + (cm.checked ? 25 : 0) + (cc.checked ? 20 : 0); $('#calc-mn').textContent = mn; $('#calc-km').textContent = (mn * 1.852).toLocaleString('pt-BR', { maximumFractionDigits: 1 }); $('#calc-barra').style.width = Math.min(100, mn / 100 * 100) + '%'; }
  [cb, cm, cc].forEach(function (x) { x.addEventListener('change', calc); }); calc();

  /* ---------- tour guiado ---------- */
  var PASSOS = [
    ['Começo', 'cel-entrar', 'email', 'Entrar no BLUXXY', 'Crie a conta com e-mail e senha (ou Google no Android). Um código de 6 números chega no seu e-mail para confirmar.'],
    ['Começo', 'cel-permissoes', 'local', 'Permissões', 'Só a localização aproximada é obrigatória: o aparelho calcula uma área de ~550 m e a posição exata nunca sai do celular.'],
    ['Começo', 'cel-idade', 'play', 'Confirmar 18+', 'O BLUXXY é só para maiores de 18. A Google Play informa a faixa de idade da sua conta — nunca a data de nascimento.'],
    ['Mar', 'cel-inicio', 'mapa', 'O mar', 'Barcos são pessoas, ilhas são grupos. Arraste para navegar e toque em qualquer um para abrir.'],
    ['Mar', 'cel-inicio', 'radar', 'Ligar o radar', 'Com o radar ligado, aparece todo mundo que está no alcance da sua embarcação.'],
    ['Mar', 'cel-inicio', 'barco', 'Sua embarcação', 'Jet ski, lancha, catamarã ou iate: cada uma alcança uma distância (em milhas náuticas). O nível libera as maiores.'],
    ['Mar', 'cel-radar-lista', 'lista', 'No seu radar', 'A lista de quem está perto, com distância aproximada. Mande uma onda direto daqui.'],
    ['Pessoas', 'cel-cartao', 'respostas', 'Cartão do tripulante', 'Fotos ou avatar, selo azul de verificado e perguntas para puxar assunto.'],
    ['Pessoas', 'cel-cartao-2', 'onda', 'Mandar uma onda', 'É o "oi, curti você". Se a pessoa devolver, vira conexão e a conversa abre sozinha.'],
    ['Pessoas', 'cel-cartao-2', 'bloq', 'Bloquear e denunciar', 'Um toque e vocês somem um para o outro. Denúncias graves têm prioridade máxima.'],
    ['Pessoas', 'cel-ondas', 'abas', 'Suas ondas', 'Recebidas, enviadas e conexões. Devolva uma onda para conectar.'],
    ['Praia', 'cel-praia', 'mares', 'Maré do dia', 'Fotos e textos que somem em 24 horas, para suas conexões e seguidores.'],
    ['Praia', 'cel-praia', 'texto', 'Publicar na Praia', 'Escreva, anexe foto ou vídeo e escolha quem pode ver.'],
    ['Conversas', 'cel-conversas', 'convites', 'Convites para conversar', 'Aceite ou recuse. Quem puxou assunto já chega com a mensagem.'],
    ['Conversas', 'cel-conversa', 'msgs', 'A conversa', 'Toque duas vezes numa mensagem para reagir. ✓✓ indica que foi lida.'],
    ['Conversas', 'cel-conversa', 'mic', 'Mensagem de áudio', 'Toque no microfone para gravar (até 2 minutos) e toque de novo para enviar.'],
    ['Ilhas', 'cel-ilhas', 'cidade', 'A ilha da sua cidade', 'Uma praça pública, sem dono: quem está na cidade entra com um toque. As mensagens somem em 7 dias.'],
    ['Ilhas', 'cel-ilha-gestao', 'eventos', 'Encontros', 'Marque data, hora e local. A ilha é avisada e cada um responde Vou ou Talvez.'],
    ['Ilhas', 'cel-ilha-ajustes', 'convite', 'Convite da sua ilha', 'Gere um código para chamar gente de qualquer lugar. Troque ou desligue quando quiser.'],
    ['Perfil', 'cel-perfil', 'completo', 'Seu perfil', 'Complete fotos, perguntas e verificação: perfis completos recebem muito mais ondas.'],
    ['Perfil', 'cel-perfil', 'ajuda', 'Pronto para zarpar!', 'O tour do app e este manual ficam sempre em Ajustes de Perfil › Ajuda. Boa navegação! 🌊']
  ];
  var tImg = $('#tour-img'), tLuz = $('#tour-luz'), tT = $('#tour-titulo'), tX = $('#tour-texto'), tC = $('#tour-cont'), tB = $('#tour-barra'), tCaps = $('#tour-capitulos');
  var ti = 0, auto = null;
  var caps = []; PASSOS.forEach(function (p, i) { if (!caps.some(function (c) { return c[0] === p[0]; })) caps.push([p[0], i]); });
  caps.forEach(function (c) { var li = el('li'), b = el('button', null, c[0]); b.type = 'button'; b.addEventListener('click', function () { parar(); ir(c[1]); }); li.appendChild(b); tCaps.appendChild(li); });
  PASSOS.forEach(function (p) { var im = new Image(); im.src = 'assets/manual/' + p[1] + '.webp'; });
  function ir(i) {
    ti = (i + PASSOS.length) % PASSOS.length; var p = PASSOS[ti], src = 'assets/manual/' + p[1] + '.webp', r = (P[p[1]] || {})[p[2]];
    var mostra = function () {
      tImg.classList.remove('troca');
      if (r) { tLuz.hidden = false; var m = 1.2; tLuz.style.left = (r[0] - m) + '%'; tLuz.style.top = (r[1] - m * .5) + '%'; tLuz.style.width = (r[2] + m * 2) + '%'; tLuz.style.height = (r[3] + m) + '%'; } else tLuz.hidden = true;
    };
    if (tImg.getAttribute('src') !== src) { tImg.classList.add('troca'); setTimeout(function () { tImg.src = src; if (tImg.complete) mostra(); else tImg.onload = mostra; }, 180); } else mostra();
    tT.textContent = p[3]; tX.textContent = p[4]; tC.textContent = 'Passo ' + (ti + 1) + ' de ' + PASSOS.length + ' · ' + p[0];
    tB.style.width = ((ti + 1) / PASSOS.length * 100) + '%';
    $$('button', tCaps).forEach(function (b) { b.classList.toggle('on', b.textContent === p[0]); });
  }
  function parar() { if (auto) { clearInterval(auto); auto = null; } var b = $('#tour-play'); b.setAttribute('aria-pressed', 'false'); b.textContent = '⏵ Automático'; }
  function tocar() { var b = $('#tour-play'); if (auto) return parar(); b.setAttribute('aria-pressed', 'true'); b.textContent = '⏸ Pausar'; auto = setInterval(function () { if (ti === PASSOS.length - 1) return parar(); ir(ti + 1); }, 5200); }
  $('#tour-prox').addEventListener('click', function () { parar(); ir(ti + 1); });
  $('#tour-ant').addEventListener('click', function () { parar(); ir(ti - 1); });
  $('#tour-play').addEventListener('click', tocar);
  var palco = $('#tour-palco'), noPalco = false;
  if (W.IntersectionObserver) new IntersectionObserver(function (e) { noPalco = e[0].isIntersecting; }, { threshold: .4 }).observe(palco);
  D.addEventListener('keydown', function (e) { if (!noPalco || /input|textarea|select/i.test(D.activeElement.tagName)) return; if (e.key === 'ArrowRight') { parar(); ir(ti + 1); } if (e.key === 'ArrowLeft') { parar(); ir(ti - 1); } });
  var x0 = null; palco.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
  palco.addEventListener('touchend', function (e) { if (x0 == null) return; var dx = e.changedTouches[0].clientX - x0; x0 = null; if (Math.abs(dx) > 50) { parar(); ir(ti + (dx < 0 ? 1 : -1)); } });
  $$('[data-abrir-tour]').forEach(function (b) { b.addEventListener('click', function () { $('#tour').scrollIntoView({ behavior: reduz ? 'auto' : 'smooth', block: 'start' }); ir(0); if (!reduz && !auto) setTimeout(tocar, 600); }); });
  ir(0);
})();
