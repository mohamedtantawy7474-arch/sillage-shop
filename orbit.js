// Scent carousel ("orbit"): a pinned, scroll-driven tour of the catalog, placed between the promise strip and the shop grid.
// The bottle swings out over the top on a wide orbit while the next swings in, the house / scent title wipes across,
// the scent card cross-fades, and a band behind the scene takes the scent's colour. Each stretch of page scroll brings
// the next scent; after the last one the page carries on to the shop. Arrows, thumbnails, the side dots, arrow keys
// and swipes jump too. Everything comes from products.js and the shared helpers in i18n.js (t, money, num, toast),
// and "Add" uses the page's own addToBag(). Needs GSAP + ScrollTrigger (cdnjs); without them the section removes itself.
(() => {
  const sec = document.getElementById('tour');
  if (!sec) return;
  if (!window.gsap || !window.ScrollTrigger || !window.CATALOG || !CATALOG.products.length) { sec.remove(); return; }
  gsap.registerPlugin(ScrollTrigger);

  const P = CATALOG.products, n = P.length, SIZES = CATALOG.sizes;
  // The design is a 960 x 520 canvas, scaled to fit. The bottles' orbit pivots above it (see .orb-orbit transform-origin).
  const ORBIT_X = 299, ORBIT_Y = -450, ORBIT_R = 650;
  const PER = 0.5;          // screen heights of scroll per scent
  const SWING = 50;         // degrees a bottle travels round the pivot
  const ITEM = 118, VISIBLE = 4;
  const NAV = 88;           // room kept for the fixed nav bar
  const ARC_REST = [[50, 98], [46, 124], [60, 126], [40, 100]], ARC_SWEEP = [38, 146];
  const HIDE_1 = 'inset(0% 0% 0% 100%)', HIDE_2 = 'inset(0% 100% 0% 0%)', SHOW = 'inset(0% 0% 0% 0%)';
  const DROP = 'M12 2.8s6.4 6.9 6.4 11.6a6.4 6.4 0 0 1-12.8 0C5.6 9.7 12 2.8 12 2.8z';

  const wrap = i => ((Math.round(i) % n) + n) % n;
  const fit = (chars, max, width, em) => Math.min(max, width / (Math.max(1, chars) * em));
  const stripStart = i => n <= VISIBLE ? 0 : Math.max(0, Math.min(i - 1, n - VISIBLE));
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const tint = p => p.c[1];
  const notesOf = p => (p.notes[LANG] || p.notes.en).split(/\s*[,،]\s*/).filter(Boolean);

  // the band: a thick stroke along the orbit circle, tapering at both ends (degrees, 0 = right, 90 = down)
  function arcPath(a0, a1) {
    const outer = [], inner = [], w = 118;
    for (let i = 0; i <= 48; i++) {
      const tt = i / 48, a = ((a0 + (a1 - a0) * tt) * Math.PI) / 180;
      const h = (w / 2) * Math.pow(Math.sin(Math.PI * tt), 0.45), c = Math.cos(a), s = Math.sin(a);
      outer.push((ORBIT_X + c * (ORBIT_R + h)).toFixed(1) + ' ' + (ORBIT_Y + s * (ORBIT_R + h)).toFixed(1));
      inner.push((ORBIT_X + c * (ORBIT_R - h)).toFixed(1) + ' ' + (ORBIT_Y + s * (ORBIT_R - h)).toFixed(1));
    }
    return 'M' + outer.join('L') + 'L' + inner.reverse().join('L') + 'Z';
  }

  const css = `
.orb-sec{padding:0;position:relative}
.orb-trk{position:relative;width:100%}
.orb-root{position:sticky;top:0;height:100svh;overflow:hidden;width:100%;background:var(--ink);color:var(--paper);container-type:inline-size}
.orb-root:focus-visible{outline-offset:-6px}
.orb-canvas{position:absolute;left:50%;top:calc(50% + ${NAV / 2}px);width:960px;height:520px;transform:translate(-50%,-50%) scale(var(--orb-s,1));direction:ltr}
.orb-arc{position:absolute;left:0;top:0;width:960px;height:520px;overflow:visible;pointer-events:none}
.orb-arc path{opacity:.3}
.orb-pager{position:absolute;left:76px;top:150px;display:flex;flex-direction:column;align-items:center;gap:7px}
.orb-dot{width:14px;height:10px;display:grid;place-items:center;transition:height .45s var(--ease)}
.orb-dot i{display:block;width:3px;height:3px;border-radius:3px;background:var(--paper);opacity:.4;transition:height .45s var(--ease),opacity .3s}
.orb-dot[aria-current] i{height:22px;opacity:.9;background:var(--gold)}
.orb-dot[aria-current]{height:26px}
.orb-bottles{position:absolute;left:130px;top:70px;width:245px;height:270px;touch-action:pan-y}
.orb-orbit{position:absolute;inset:0;transform-origin:69% -192.6%;visibility:hidden;will-change:transform}
.orb-orbit img{display:block;width:100%;height:100%;object-fit:contain;object-position:50% 100%;user-select:none;-webkit-user-drag:none;
  filter:drop-shadow(0 18px 18px rgba(70,45,15,.25)) drop-shadow(0 3px 4px rgba(70,45,15,.15))}
.orb-head{position:absolute;left:388px;top:92px;width:330px;height:170px}
.orb-hd{position:absolute;inset:0;visibility:hidden}
.orb-eye{color:var(--gold);margin:0 0 10px 2px}
.orb-t1,.orb-t2{display:block;white-space:nowrap;margin:0}
.orb-t1{font-family:'Instrument Serif',serif;font-style:italic;font-weight:400;line-height:1.05;color:var(--muted)}
.orb-t2{font-family:'Anton',sans-serif;font-weight:400;text-transform:uppercase;line-height:1;margin-top:4px;letter-spacing:.005em}
.orb-acts{position:absolute;left:4px;top:${280 - 92}px;display:flex;gap:22px;align-items:center;white-space:nowrap}
.orb-acts button,.orb-acts a{display:inline-flex;align-items:center;gap:8px;padding:6px 0;color:var(--paper);transition:color .2s}
.orb-acts button:hover,.orb-acts a:hover{color:var(--gold)}
.orb-acts svg{width:14px;height:14px;fill:var(--gold)}
.orb-card{position:absolute;left:722px;top:110px;width:226px;padding:18px 20px 20px;border-radius:22px;
  background:color-mix(in srgb,var(--ink-2) 80%,transparent);-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);
  border:1px solid var(--line);box-shadow:0 22px 44px -28px rgba(70,45,15,.35)}
.orb-bodies{display:grid}
.orb-body{grid-area:1/1;visibility:hidden}
.orb-rate{position:relative;height:62px;margin:0 0 14px 4px}
.orb-badge{position:absolute;inset-inline-start:0;top:0;width:46px;height:62px;border-radius:10px}
.orb-badge svg{position:absolute;left:17px;bottom:9px;width:12px;height:12px;fill:var(--paper);opacity:.7}
.orb-price{position:absolute;inset-inline-start:10px;top:8px;font-family:var(--display);font-weight:var(--display-w);font-size:30px;line-height:1;white-space:nowrap;font-variant-numeric:tabular-nums}
html[lang=ar] .orb-price{font-size:26px;top:4px}
.orb-fam{font-family:var(--display);font-weight:var(--display-w);text-transform:uppercase;font-size:24px;line-height:1.05;margin:0}
.orb-meta{color:var(--muted);margin:6px 0 10px}
.orb-notes{list-style:none;display:flex;flex-wrap:wrap;gap:5px;margin:0 0 16px;min-height:54px;align-content:flex-start}
.orb-notes li{font-size:12px;padding:4px 10px;border-radius:99px;background:rgba(22,19,15,.06)}
.orb-sizes{display:flex;gap:5px;margin-bottom:10px}
.orb-sizes button{flex:1;padding:8px 0;border:1px solid var(--line);border-radius:9px;transition:border-color .15s,color .15s,background .15s}
.orb-sizes button:hover{border-color:var(--paper)}
.orb-sizes button[aria-pressed=true]{border-color:var(--gold);color:var(--gold);background:rgba(139,94,52,.06)}
.orb-add{width:100%;background:var(--paper);color:var(--ink);font-weight:500;padding:12px 16px;border-radius:999px;transition:background .2s}
.orb-add:hover,.orb-add.done{background:var(--gold)}
.orb-strip{position:absolute;left:130px;top:368px;width:550px;height:122px;display:flex;align-items:center}
.orb-arrow{width:36px;height:36px;display:grid;place-items:center;flex:none;border-radius:50%;transition:color .2s}
.orb-arrow:hover{color:var(--gold)}
.orb-arrow svg{width:11px;height:15px;fill:currentColor}
.orb-win{position:relative;width:${ITEM * VISIBLE}px;height:122px;overflow:hidden;flex:none;margin:0 2px;
  -webkit-mask-image:linear-gradient(90deg,#000 88%,transparent);mask-image:linear-gradient(90deg,#000 88%,transparent)}
.orb-track{position:absolute;left:0;top:0;display:flex;transition:transform .6s cubic-bezier(.65,0,.35,1)}
.orb-th{width:${ITEM}px;height:122px;display:flex;justify-content:center;padding-top:3px}
.orb-th button{width:84px;height:116px;border-radius:14px;display:flex;flex-direction:column;align-items:center;gap:6px;padding-top:9px;transition:background .45s}
.orb-th button[aria-current]{background:var(--ink-2);box-shadow:0 10px 24px -16px rgba(70,45,15,.35)}
.orb-th img{width:56px;height:60px;object-fit:contain;filter:drop-shadow(0 4px 6px rgba(70,45,15,.2));transition:transform .45s}
.orb-th button[aria-current] img{transform:scale(1.06)}
.orb-th span{font-size:10px;line-height:1.2;text-align:center;color:var(--muted);max-width:80px;letter-spacing:.04em;text-transform:uppercase;font-family:'DM Mono',monospace}
.orb-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
[dir=rtl] :is(.orb-card,.orb-acts){direction:rtl}
[dir=rtl] .orb-acts{left:auto;right:4px}
@container (max-width:719px){
  .orb-canvas{position:relative;left:auto;top:auto;width:100%;height:100%;transform:none;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:${NAV}px 16px 16px}
  .orb-arc{width:200%;height:auto;left:-60%;top:${NAV - 40}px}
  .orb-pager{left:16px;top:${NAV + 40}px}
  .orb-bottles{position:relative;left:auto;top:auto;width:min(48vw,26svh);height:min(54vw,28svh);flex:none}
  .orb-head{position:relative;left:auto;top:auto;width:100%;height:118px;margin-top:8px;flex:none}
  .orb-hd{text-align:center}
  .orb-eye{margin:0 0 6px}
  .orb-acts{position:static;justify-content:center;margin-top:8px;gap:22px}
  [dir=rtl] .orb-acts{right:auto}
  .orb-card{position:relative;left:auto;top:auto;width:100%;max-width:420px;margin-top:6px;padding:14px 16px 16px}
  .orb-rate{height:48px;margin-bottom:8px}
  .orb-badge{width:38px;height:48px}
  .orb-badge svg{left:13px;bottom:7px}
  .orb-price{font-size:26px;top:6px}
  .orb-fam{font-size:20px}
  .orb-meta{margin:2px 0 6px}
  .orb-notes{min-height:0;margin-bottom:10px}
  .orb-strip{display:none}
}
@container (max-width:719px) and (max-height:700px){ .orb-meta{display:none} }
`;
  document.head.insertAdjacentHTML('beforeend', `<style>${css}</style>`);

  const sel = {};             // chosen size per product (5 ml by default, like the grid)
  let index = 0, shown = -1, dir = 1, tl = null, seg = 0, st = null, hold = false;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let orbits, heads, bodies, arcEl, dots, thumbs, track, sr, root;
  const arc = { a0: 0, a1: 0 };

  const tryLabel = p => t('orbTry', { ml: t('ml', { n: num(SIZES[0]) }), price: money(p.price[0]) });
  const eyebrow = (p, i) => p.tag ? t('tag_' + p.tag) : t('orbEyebrow', { n: num(i + 1), total: num(n) });

  function render() {
    const drop = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${DROP}"/></svg>`;
    sec.innerHTML = `<div class="orb-trk" style="height:calc(100svh * ${1 + (n - 1) * PER})">
    <div class="orb-root" role="region" aria-roledescription="carousel" aria-label="${esc(t('orbRegion'))}" tabindex="0">
      <div class="orb-canvas">
        <svg class="orb-arc" viewBox="0 0 960 520" aria-hidden="true"><path/></svg>
        <div class="orb-pager" role="group" aria-label="${esc(t('orbChoose'))}">${P.map((p, i) =>
          `<button class="orb-dot" data-go="${i}" aria-label="${esc(p.house + ' ' + p.name)}"><i></i></button>`).join('')}</div>
        <div class="orb-bottles">${P.map(p =>
          `<div class="orb-orbit"><img src="${p.img}" alt="${esc(p.house + ' ' + p.name)}" width="245" height="270" draggable="false" decoding="async"></div>`).join('')}</div>
        <div class="orb-head">${P.map((p, i) => `<div class="orb-hd">
          <p class="orb-eye label">${esc(eyebrow(p, i))}</p>
          <h3 style="margin:0;font:inherit">
            <span class="orb-t1" lang="en" data-max="${fit(p.house.length, 46, 320, .42)}">${esc(p.house)}</span>
            <span class="orb-t2" lang="en" data-max="${fit(p.name.length, 78, 330, .47)}">${esc(p.name)}</span>
          </h3>
          <div class="orb-acts label">
            <button data-try="${p.id}">${drop}${esc(tryLabel(p))}</button>
            <a href="#p-${p.id}" data-view="${p.id}">${esc(t('orbView'))}<span aria-hidden="true">${ICON.arrow}</span></a>
          </div></div>`).join('')}</div>
        <div class="orb-card"><div class="orb-bodies">${P.map(p => {
          const s = sel[p.id] ?? 1;
          return `<div class="orb-body" data-id="${p.id}">
            <div class="orb-rate"><div class="orb-badge" style="background:color-mix(in srgb,${tint(p)} 55%,#fff)">${drop}</div><span class="orb-price">${money(p.price[s])}</span></div>
            <p class="orb-fam">${esc(t('fam_' + p.fam))}</p>
            <p class="orb-meta label">${esc(t('orbNotes'))}</p>
            <ul class="orb-notes">${notesOf(p).map(x => `<li>${esc(x)}</li>`).join('')}</ul>
            <div class="orb-sizes label" role="group">${SIZES.map((z, i) =>
              `<button data-size="${i}" aria-pressed="${i === s}">${esc(t('ml', { n: num(z) }))}</button>`).join('')}</div>
            <button class="orb-add label" data-add="${p.id}">${esc(t('add'))}</button>
          </div>`; }).join('')}</div></div>
        <div class="orb-strip">
          <button class="orb-arrow" data-step="-1" aria-label="${esc(t('orbPrev'))}"><svg viewBox="0 0 12 16" aria-hidden="true"><path d="M11 0v16L0 8z"/></svg></button>
          <div class="orb-win"><div class="orb-track">${P.map((p, i) =>
            `<div class="orb-th"><button data-go="${i}" aria-label="${esc(p.house + ' ' + p.name)}"><img src="${p.img}" alt="" loading="lazy" decoding="async"><span lang="en">${esc(p.name)}</span></button></div>`).join('')}</div></div>
          <button class="orb-arrow" data-step="1" aria-label="${esc(t('orbNext'))}"><svg viewBox="0 0 12 16" aria-hidden="true"><path d="M1 0v16l11-8z"/></svg></button>
        </div>
      </div>
      <p class="orb-sr" aria-live="polite"></p>
    </div></div>`;
    root = sec.querySelector('.orb-root');
    orbits = [...sec.querySelectorAll('.orb-orbit')];
    heads = [...sec.querySelectorAll('.orb-hd')];
    bodies = [...sec.querySelectorAll('.orb-body')];
    dots = [...sec.querySelectorAll('.orb-dot')];
    thumbs = [...sec.querySelectorAll('.orb-th button')];
    arcEl = sec.querySelector('.orb-arc path');
    track = sec.querySelector('.orb-track');
    sr = sec.querySelector('.orb-sr');
    fitCanvas();
    fitTitles();
    new ResizeObserver(fitCanvas).observe(root);
    if (tl) { tl.kill(); tl = null; }
    shown = -1;
    show(index);
  }

  // shrink any title line wider than the space beside the card (measured, since glyph widths vary by font)
  function fitTitles() {
    sec.querySelectorAll('.orb-t1,.orb-t2').forEach(el => {
      el.style.fontSize = el.dataset.max + 'px';
      const w = el.scrollWidth, room = 320;
      if (w > room) el.style.fontSize = Math.floor(el.dataset.max * room / w) + 'px';
    });
  }

  function fitCanvas() {
    root.style.setProperty('--orb-s', String(Math.min(root.clientWidth / 980, (root.clientHeight - NAV) / 540, 1.6)));
  }

  const drawArc = () => arcEl.setAttribute('d', arcPath(arc.a0, arc.a1));
  const parts = i => {
    const h = heads[i];
    return { orbit: orbits[i], head: h, eye: h.querySelector('.orb-eye'), t1: h.querySelector('.orb-t1'), t2: h.querySelector('.orb-t2'), body: bodies[i] };
  };

  // bring scent `to` on stage: animated from the one showing, or set directly the first time / with reduced motion
  function show(to) {
    const from = shown, rest = ARC_REST[to % ARC_REST.length], colour = tint(P[to]);
    if (tl) tl.progress(1).kill();
    dots.forEach((d, i) => d.toggleAttribute('aria-current', i === to));
    thumbs.forEach((b, i) => b.toggleAttribute('aria-current', i === to));
    heads.forEach((h, i) => { h.inert = i !== to; h.setAttribute('aria-hidden', i !== to); });
    bodies.forEach((b, i) => { b.inert = i !== to; b.setAttribute('aria-hidden', i !== to); });
    orbits.forEach((o, i) => o.setAttribute('aria-hidden', i !== to));
    track.style.transform = `translateX(${-stripStart(to) * ITEM}px)`;
    sr.textContent = t('orbSlide', { n: num(to + 1), total: num(n), name: P[to].house + ' ' + P[to].name });
    const b = parts(to);
    if (from === -1 || from === to || reduced.matches) {
      P.forEach((_, i) => { if (i !== to) { const p = parts(i); gsap.set([p.orbit, p.head, p.body], { autoAlpha: 0 }); } });
      gsap.set([b.orbit, b.head, b.body, b.eye], { autoAlpha: 1, rotation: 0, y: 0 });
      gsap.set([b.t1, b.t2], { clipPath: SHOW });
      arc.a0 = rest[0]; arc.a1 = rest[1]; drawArc();
      gsap.set(arcEl, { fill: colour });
      shown = to;
      return;
    }
    const a = parts(from), d = dir;
    tl = gsap.timeline({ onComplete: () => { tl = null; } });
    // bottle: out over the top on the orbit, the next one swings in from the far side
    tl.to(a.orbit, { rotation: SWING * d, duration: .62, ease: 'power2.in' }, 0)
      .set(a.orbit, { autoAlpha: 0, rotation: 0 }, .62)
      .fromTo(b.orbit, { autoAlpha: 1, rotation: -SWING * d }, { rotation: 0, duration: .95, ease: 'power3.out' }, .3);
    // title: house clips away to the right, scent name to the left, then the next wipes in
    tl.to(a.t1, { clipPath: HIDE_1, duration: .42, ease: 'power2.in' }, 0)
      .to(a.t2, { clipPath: HIDE_2, duration: .42, ease: 'power2.in' }, .06)
      .to(a.eye, { autoAlpha: 0, duration: .25 }, 0)
      .set(a.head, { autoAlpha: 0 }, .5)
      .set(b.head, { autoAlpha: 1 }, .5)
      .fromTo(b.eye, { autoAlpha: 0, y: 6 }, { autoAlpha: 1, y: 0, duration: .4, ease: 'power2.out' }, .55)
      .fromTo(b.t1, { clipPath: HIDE_1 }, { clipPath: SHOW, duration: .7, ease: 'power3.out' }, .55)
      .fromTo(b.t2, { clipPath: HIDE_2 }, { clipPath: SHOW, duration: .7, ease: 'power3.out' }, .62);
    // card: cross-fade, the incoming rows rise in turn
    tl.to(a.body, { autoAlpha: 0, y: -6, duration: .3, ease: 'power1.in' }, .05)
      .set(b.body, { autoAlpha: 1, y: 0 }, .4)
      .fromTo(b.body.children, { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: .5, stagger: .05, ease: 'power2.out' }, .4);
    // band: stretches along the orbit with the bottles, then settles, taking the new colour
    tl.to(arc, { a0: ARC_SWEEP[0], a1: ARC_SWEEP[1], duration: .6, ease: 'power2.inOut', onUpdate: drawArc }, 0)
      .to(arc, { a0: rest[0], a1: rest[1], duration: .85, ease: 'power3.out', onUpdate: drawArc }, .6)
      .to(arcEl, { fill: colour, duration: 1.1, ease: 'power1.inOut' }, .1);
    shown = to;
  }

  function select(next, d) {
    if (next === index) return;
    dir = d; index = next;
    show(next);
  }

  // page scroll drives the scent: the stage pins, one stretch of scroll per scent
  function bindScroll() {
    const steps = n - 1;
    if (steps < 1) return;
    st = ScrollTrigger.create({
      trigger: sec.querySelector('.orb-trk'), start: 'top top', end: 'bottom bottom',
      onUpdate: self => {
        if (hold) return;   // a language switch is re-measuring the page; keep the scent that's on screen
        const s = Math.round(self.progress * steps);
        if (s === seg) return;
        const d = s > seg ? 1 : -1;
        seg = s;
        select(s, d);
      },
    });
  }

  // buttons, keys and swipes jump to a scent and move the scroll to its stretch (when the stage is pinned), so both agree
  function go(to, d) {
    if (n < 2) return;
    const next = wrap(to);
    if (next === index) return;
    if (st) {
      const y = st.scroll();
      if (y >= st.start - 1 && y <= st.end + 1) {
        seg = next;
        window.scrollTo({ top: st.start + ((st.end - st.start) * next) / (n - 1), behavior: 'instant' });
      }
    }
    const fwd = ((next - index) % n + n) % n;
    select(next, d ?? (fwd <= n - fwd ? 1 : -1));
  }

  sec.addEventListener('click', e => {
    const el = e.target.closest('[data-go],[data-step],[data-size],[data-add],[data-try],[data-view]');
    if (!el) return;
    if (el.dataset.go != null) go(+el.dataset.go);
    else if (el.dataset.step) go(index + +el.dataset.step, +el.dataset.step);
    else if (el.dataset.size != null) {
      const body = el.closest('.orb-body'), p = P.find(x => x.id === body.dataset.id);
      sel[p.id] = +el.dataset.size;
      body.querySelectorAll('[data-size]').forEach(b => b.setAttribute('aria-pressed', b === el));
      body.querySelector('.orb-price').textContent = money(p.price[sel[p.id]]);
    } else if (el.dataset.add) {
      addToBag(`${el.dataset.add}-${sel[el.dataset.add] ?? 1}`);
      el.textContent = t('added'); el.classList.add('done');
      setTimeout(() => { el.textContent = t('add'); el.classList.remove('done'); }, 1400);
    } else if (el.dataset.try) {
      addToBag(`${el.dataset.try}-0`);
    } else if (el.dataset.view && !document.getElementById('p-' + el.dataset.view)) {
      // the grid is filtered and hides this scent: show all first, then follow the link
      document.querySelector('#filters [data-f="all"]')?.click();
    }
  });

  sec.addEventListener('keydown', e => {
    if (e.target.closest('button,a') && !e.target.classList.contains('orb-root')) return;
    if (e.key === 'ArrowRight') { e.preventDefault(); go(index + 1, 1); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); go(index - 1, -1); }
  });

  let swipe = null;
  sec.addEventListener('pointerdown', e => { if (e.target.closest('.orb-bottles')) swipe = { x: e.clientX, y: e.clientY }; });
  sec.addEventListener('pointerup', e => {
    const s = swipe; swipe = null;
    if (!s) return;
    const dx = e.clientX - s.x;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(e.clientY - s.y) * 1.4) go(index + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
  });
  sec.addEventListener('pointercancel', () => { swipe = null; });

  // where scent i's stretch of scroll starts, and whether the stage is pinned on screen right now
  const stretchTop = i => st.start + ((st.end - st.start) * i) / (n - 1);
  const pinned = () => { if (!st) return false; const y = st.scroll(); return y >= st.start - 1 && y <= st.end + 1; };

  // A language switch rebuilds the markup, so the scroll trigger is rebuilt on the new elements. The other language
  // changes the height of the page above (and its font may still be loading), which would otherwise move the same
  // scroll position onto a different scent: keep the scent that was showing and put the page back on its stretch.
  function anchor(keep, wasPinned) {
    hold = true;
    ScrollTrigger.refresh();
    if (wasPinned && st && n > 1) window.scrollTo({ top: stretchTop(keep), behavior: 'instant' });
    seg = keep;
    if (index !== keep) { index = keep; show(keep); }
    requestAnimationFrame(() => requestAnimationFrame(() => { hold = false; }));
  }
  document.addEventListener('langchange', () => {
    const keep = index, wasPinned = pinned();
    hold = true;
    st?.kill(); st = null;
    seg = keep; render(); bindScroll();
    anchor(keep, wasPinned);
    document.fonts?.ready.then(() => { if (index === keep) anchor(keep, wasPinned); });
  });
  render();
  bindScroll();
  // the grid and fonts above the section settle after load; re-measure the pin then
  addEventListener('load', () => ScrollTrigger.refresh());
  document.fonts?.ready.then(fitTitles);
})();
