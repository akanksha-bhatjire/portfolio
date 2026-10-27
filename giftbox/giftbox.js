/* GIFT BOX — temporary birthday intro for Akanksha (28 October).
   To remove: delete the /giftbox folder and the <!-- GIFTBOX --> block at the top of index.html. */
(function () {
  var root = document.documentElement;
  var reduce = false;
  try { reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}
  var HEART = '<svg viewBox="0 0 32 29" aria-hidden="true"><path fill="currentColor" d="M16 29s-1.3-.9-3.2-2.4C7.4 22.4 0 16.6 0 9.2 0 4.1 3.9 0 8.7 0c3 0 5.6 1.6 7.3 4 1.7-2.4 4.3-4 7.3-4C28.1 0 32 4.1 32 9.2c0 7.4-7.4 13.2-12.8 17.4C17.3 28.1 16 29 16 29z"/></svg>';
  var OUT = 'cubic-bezier(.22,1,.36,1)', INOUT = 'cubic-bezier(.65,0,.35,1)', SOFT = 'cubic-bezier(.33,0,.2,1)';

  function el(tag, cls, html) { var n = document.createElement(tag); if (cls) n.className = cls; if (html != null) n.innerHTML = html; return n; }
  function A(node, frames, o) {
    o = o || {}; if (!o.fill) o.fill = 'both';
    if (reduce) { o.duration = 1; o.delay = 0; }
    return node.animate ? node.animate(frames, o) : { finished: Promise.resolve() };
  }

  function build() {
    var gb = el('div', 'gb');
    gb.setAttribute('role', 'dialog'); gb.setAttribute('aria-modal', 'true');
    gb.setAttribute('aria-label', 'A birthday gift for Akanksha'); gb.setAttribute('data-lenis-prevent', '');
    var canvas = el('canvas'); gb.appendChild(canvas);
    var skip = el('button', 'gb-skip', 'Skip'); skip.type = 'button'; gb.appendChild(skip);

    var stage = el('div', 'gb-stage');
    stage.appendChild(el('div', 'gb-hint', '<small>For my Akanksha</small><b>A little something for you</b>'));
    stage.appendChild(el('div', 'gb-tap', 'Tap the gift to open'));

    var gift = el('div', 'gb-gift'), bob = el('div', 'gb-bob');
    gift.appendChild(el('div', 'gb-shadow'));
    var glow = el('div', 'gb-glow'); bob.appendChild(glow);
    var mouth = el('div', 'gb-mouth'); bob.appendChild(mouth);

    var letter = el('div', 'gb-letter',
      '<div class="gb-heart-row" aria-hidden="true">' + HEART + HEART + HEART + '</div>' +
      '<div class="gb-k">28 October</div>' +
      '<h1>Happy Birthday<span>my love</span></h1>' +
      '<h2>Akanksha</h2>' +
      '<div class="gb-rule" aria-hidden="true"></div>' +
      '<p>Thank you for being in my life. Here&rsquo;s to your 24th, and to every beautiful day we share.</p>' +
      '<button type="button" class="gb-btn">Open your website</button>');
    bob.appendChild(letter);

    var body = el('div', 'gb-body'); var rv = el('div', 'gb-rv'), rh = el('div', 'gb-rh');
    body.appendChild(rv); body.appendChild(rh); bob.appendChild(body);
    var lid = el('div', 'gb-lid'), lf = el('div', 'gb-lid-face'), lrv = el('div', 'gb-rv');
    lf.appendChild(lrv); lid.appendChild(lf);
    var bow = el('div', 'gb-bow');
    var tl = el('div', 'gb-tail l'), tr = el('div', 'gb-tail r'), ll = el('div', 'gb-loop l'), lr = el('div', 'gb-loop r'), kn = el('div', 'gb-knot');
    [tl, tr, ll, lr, kn].forEach(function (n) { bow.appendChild(n); });
    lid.appendChild(bow); bob.appendChild(lid);
    var hit = el('button', 'gb-hit'); hit.type = 'button'; hit.setAttribute('aria-label', 'Open your gift'); bob.appendChild(hit);

    gift.appendChild(bob); stage.appendChild(gift); gb.appendChild(stage); document.body.appendChild(gb);
    return { gb: gb, canvas: canvas, gift: gift, bob: bob, glow: glow, mouth: mouth, letter: letter, btn: letter.querySelector('.gb-btn'),
      body: body, rv: rv, rh: rh, lid: lid, lrv: lrv, bow: bow, ll: ll, lr: lr, kn: kn, tl: tl, tr: tr, hit: hit, skip: skip };
  }

  /* gentle confetti: a single soft shower */
  function confetti(canvas, origin) {
    if (reduce) return function () {};
    var ctx = canvas.getContext('2d'), dpr = Math.min(window.devicePixelRatio || 1, 2);
    function size() { canvas.width = innerWidth * dpr; canvas.height = innerHeight * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); }
    size(); window.addEventListener('resize', size);
    var colors = ['#c2aaec', '#8f70cc', '#efd08a', '#d2ab55', '#f2b3c8', '#ffffff'];
    var parts = [], running = true, r = origin.getBoundingClientRect(), ox = r.left + r.width / 2, oy = r.top + r.height * .3;
    for (var i = 0; i < 110; i++) {
      var a = -Math.PI / 2 + (Math.random() - .5) * 1.9, v = 9 + Math.random() * 9;
      parts.push({ x: ox + (Math.random() - .5) * 40, y: oy, vx: Math.cos(a) * v, vy: Math.sin(a) * v,
        w: 5 + Math.random() * 6, h: 3 + Math.random() * 4, r: Math.random() * 6.28, vr: (Math.random() - .5) * .2,
        c: colors[(Math.random() * colors.length) | 0], t: Math.random() * 6.28, heart: Math.random() < .15 });
    }
    function heart(s) { ctx.beginPath(); ctx.moveTo(0, s * .3); ctx.bezierCurveTo(0, 0, -s * .5, 0, -s * .5, s * .3);
      ctx.bezierCurveTo(-s * .5, s * .6, 0, s * .8, 0, s); ctx.bezierCurveTo(0, s * .8, s * .5, s * .6, s * .5, s * .3);
      ctx.bezierCurveTo(s * .5, 0, 0, 0, 0, s * .3); ctx.fill(); }
    (function loop() {
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      for (var i = parts.length - 1; i >= 0; i--) {
        var p = parts[i]; p.t += .05;
        p.vy = Math.min(p.vy + .14, 2.4); p.vx *= .985; p.x += p.vx + Math.sin(p.t) * .6; p.y += p.vy; p.r += p.vr;
        if (p.y > innerHeight + 30) { parts.splice(i, 1); continue; }
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.fillStyle = p.c; ctx.globalAlpha = .92;
        if (p.heart) heart(p.w * 1.5); else ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h * Math.abs(Math.cos(p.t * 2)) + .8);
        ctx.restore();
      }
      if (running || parts.length) requestAnimationFrame(loop);
    })();
    return function () { running = false; };
  }

  function hearts(gb) {
    if (reduce) return function () {};
    var on = true;
    (function one() {
      if (!on) return;
      var h = el('span', 'gb-heart', HEART), s = 12 + Math.random() * 14;
      h.style.width = h.style.height = s + 'px'; h.style.left = (8 + Math.random() * 84) + '%';
      h.style.color = ['#e48aac', '#c2aaec', '#d2ab55'][(Math.random() * 3) | 0];
      h.style.setProperty('--dx', ((Math.random() - .5) * 80) + 'px'); h.style.animationDuration = (8 + Math.random() * 4) + 's';
      gb.appendChild(h); setTimeout(function () { h.remove(); }, 12500);
      setTimeout(one, 650 + Math.random() * 500);
    })();
    return function () { on = false; };
  }

  function start() {
    root.classList.add('gb-on');
    var ui = build();
    var opened = false, done = false, auto, stopC = function () {}, stopH = function () {};
    function block(e) { e.preventDefault(); e.stopPropagation(); }
    ui.gb.addEventListener('wheel', block, { passive: false });
    ui.gb.addEventListener('touchmove', block, { passive: false });

    // size the folded letter so it sits hidden inside the box
    var W, H, LW, LH, s0, s1, inside, risen;
    function measure() {
      W = ui.bob.offsetWidth; H = ui.bob.offsetHeight; LW = ui.letter.offsetWidth; LH = ui.letter.offsetHeight;
      s0 = Math.min((W * .7) / LW, (H * .5) / LH); s1 = Math.min(s0 * 1.25, (W * .8) / LW);
      inside = 'translate(-50%, calc(-50% + ' + (H * .69 - H * .5) + 'px)) scale(' + s0 + ')';
      risen = 'translate(-50%, calc(-50% + ' + (H * .38 - H * .5 - LH * s1 / 2 - 12) + 'px)) scale(' + s1 + ')';
    }
    measure();

    function open() {
      if (opened) return; opened = true;
      ui.gb.classList.add('gb-open'); ui.hit.style.display = 'none';
      measure();

      // 1. the bow is pulled up and lifts away (0–700ms)
      A(ui.ll, [{ transform: 'rotate(-12deg) scale(1)' }, { transform: 'rotate(-4deg) scale(.55,.8)' }], { duration: 600, easing: INOUT });
      A(ui.lr, [{ transform: 'rotate(12deg) scale(1)' }, { transform: 'rotate(4deg) scale(.55,.8)' }], { duration: 600, easing: INOUT });
      A(ui.tl, [{ transform: 'rotate(22deg)' }, { transform: 'rotate(4deg) scaleY(.6)' }], { duration: 600, easing: INOUT });
      A(ui.tr, [{ transform: 'rotate(-22deg)' }, { transform: 'rotate(-4deg) scaleY(.6)' }], { duration: 600, easing: INOUT });
      A(ui.bow, [{ transform: 'translateY(0)', opacity: 1 }, { transform: 'translateY(-' + (H * .5) + 'px)', opacity: 0 }],
        { duration: 750, delay: 380, easing: SOFT });

      // 2. the ribbon slides off the box, following the bow (400–1250ms)
      A(ui.lrv, [{ transform: 'translateY(0)' }, { transform: 'translateY(-105%)' }], { duration: 520, delay: 420, easing: INOUT });
      A(ui.rv, [{ transform: 'translateY(0)' }, { transform: 'translateY(-105%)' }], { duration: 700, delay: 560, easing: INOUT });
      A(ui.rh, [{ clipPath: 'inset(0 0 0 0)' }, { clipPath: 'inset(0 50% 0 50%)' }], { duration: 650, delay: 620, easing: INOUT });

      // 3. the lid lifts off (1300–2500ms)
      A(ui.lid, [{ transform: 'translateY(0) rotate(0)', opacity: 1 },
        { transform: 'translateY(-' + (H * .22) + 'px) rotate(-4deg)', opacity: 1, offset: .45 },
        { transform: 'translate(' + (W * .35) + 'px, -' + (H * .9) + 'px) rotate(-14deg)', opacity: 0 }],
        { duration: 1200, delay: 1300, easing: SOFT });

      // 4. warm light from inside (1500ms)
      A(ui.glow, [{ transform: 'translate(-50%,-50%) scale(.3)', opacity: 0 }, { transform: 'translate(-50%,-50%) scale(1)', opacity: 1 }],
        { duration: 1400, delay: 1500, easing: OUT });

      // 5. the letter rises out of the box (1800–2900ms)
      var rise = A(ui.letter, [{ transform: inside, opacity: 1 }, { transform: risen, opacity: 1 }], { duration: 1200, delay: 1800, easing: OUT, fill: 'forwards' });
      setTimeout(function () { stopC = confetti(ui.canvas, ui.gift); stopH = hearts(ui.gb); }, reduce ? 0 : 3300);

      // 6. the box settles away and the letter comes to the centre
      rise.finished.then(function () {
        var r = ui.bob.getBoundingClientRect();
        var dx = innerWidth / 2 - (r.left + r.width / 2), dy = innerHeight / 2 - (r.top + r.height / 2);
        ui.letter.classList.add('gb-front');
        A(ui.letter, [{ transform: risen }, { transform: 'translate(calc(-50% + ' + dx + 'px), calc(-50% + ' + dy + 'px)) scale(1)' }],
          { duration: 1100, delay: 200, easing: OUT });
        [ui.body, ui.mouth, ui.glow].forEach(function (n) {
          A(n, [{ opacity: getComputedStyle(n).opacity }, { opacity: 0 }], { duration: 700, delay: 150, easing: 'ease' });
        });
        A(ui.gift.querySelector('.gb-shadow'), [{ opacity: 1 }, { opacity: 0 }], { duration: 700, delay: 150 });
        setTimeout(function () { ui.btn.classList.add('show'); }, reduce ? 0 : 1500);
      });
      auto = setTimeout(reveal, 15000);
    }

    function reveal() {
      if (done) return; done = true; clearTimeout(auto);
      try { window.scrollTo(0, 0); } catch (e) {}
      root.classList.add('gb-rising', 'gb-start'); root.classList.remove('gb-on');
      var rt = document.getElementById('root'); if (rt) void rt.offsetWidth;
      requestAnimationFrame(function () { requestAnimationFrame(function () { root.classList.remove('gb-start'); }); });
      ui.gb.classList.add('gb-fade');
      setTimeout(function () { stopC(); stopH(); ui.gb.remove(); root.classList.remove('gb-rising'); }, 1500);
    }

    ui.hit.addEventListener('click', open);
    ui.btn.addEventListener('click', reveal);
    ui.skip.addEventListener('click', reveal);
    document.addEventListener('keydown', function (e) { if (!done && e.key === 'Escape') reveal(); });
  }

  if (document.body) start(); else document.addEventListener('DOMContentLoaded', start);
})();
