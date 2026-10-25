/**
 * UPV Campus Guía & Waze Accesible · Prototipo v4
 * Lógica modular para el Tótem del Ágora y Web Colaborativa Waze + Gregal
 */

const $ = id => document.getElementById(id);
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

// Base de datos de destinos en el Campus de Vera
const D = {
  biblioteca: {
    b: [295, 585, 210, 115],
    ic: '📚',
    v: 'Baño / Estudio',
    s: 'Biblioteca 4L',
    vt: 'Biblioteca Central y baño adaptado',
    st: 'Biblioteca Central · 4L',
    t: '2 min a pie (140 m)',
    fl: 'Planta 0 · cota cero',
    x: 400,
    y: 585,
    ax: 315,
    ay: 640,
    n: 'M400 515L400 585',
    a: 'M400 515L270 515L270 640L295 640',
    ns: '1. Avanza 80 m recto → 2. Cruza la puerta automática Sur → 3. Baño y ascensor ancho a 10 m a tu derecha.',
    as: '⚠️ Puerta principal en mantenimiento: 1. Rodea 60 m por el paseo izquierdo → 2. Entra por la rampa lateral Oeste.',
    m: [
      'Ve hacia el edificio blanco con cristaleras.',
      'Entra por la puerta corredera a ras de suelo.',
      'Gira a la derecha junto a conserjería.'
    ]
  },
  rectorado: {
    b: [75, 585, 175, 110],
    ic: '🎓',
    v: 'Graduación / Acto',
    s: 'Paraninfo 3A',
    vt: 'Salón de Actos (Paraninfo)',
    st: 'Rectorado y Paraninfo · 3A',
    t: '4 min a pie (260 m)',
    fl: 'Planta 0 · rampa suave',
    x: 162,
    y: 585,
    ax: 162,
    ay: 695,
    n: 'M400 515L162 515L162 585',
    a: 'M400 515L265 515L265 720L162 720L162 695',
    ns: '1. Gira a la izquierda por el paseo del Ágora (200 m) → 2. Toma la rampa suave a mano izquierda → 3. Entrada automática.',
    as: '⚠️ Acceso Norte cortado: 1. Baja por el lateral de la Biblioteca → 2. Entra por la puerta trasera accesible.',
    m: [
      'Sigue el paseo pavimentado a tu izquierda.',
      'Busca el edificio de ladrillo con columnas y reloj.',
      'Usa la rampa con barandilla metálica.'
    ]
  },
  casa: {
    b: [535, 395, 195, 125],
    ic: '☕',
    v: 'Cafetería / Médico',
    s: 'Casa Alumno 4K',
    vt: 'Cafetería y Centro de Salud',
    st: 'Casa del Alumno · 4K',
    t: '2 min a pie (150 m)',
    fl: 'Planta 0 y ascensor a planta 1',
    x: 535,
    y: 460,
    ax: 632,
    ay: 520,
    n: 'M400 515L500 515L500 460L535 460',
    a: 'M400 515L632 515',
    ns: '1. Camina 110 m a tu derecha cruzando el Ágora → 2. Entra por la rampa Oeste a nivel de suelo → 3. Ascensor al fondo hacia el Centro Médico.',
    as: '⚠️ Rampa Oeste con aviso: 1. Continúa 40 m más por el paseo ancho → 2. Entra por la puerta Sur automática.',
    m: [
      'Mira a tu derecha, al otro lado de la explanada.',
      'Sigue el camino blanco hasta el edificio con terraza.',
      'Entra por la puerta ancha junto a las bicis.'
    ]
  },
  inf: {
    b: [80, 185, 185, 110],
    ic: '📦',
    v: 'Paquetería / Info',
    s: 'ETSINF 1G',
    vt: 'Paquetería y Conserjería 1G',
    st: 'Escuela de Informática · 1G',
    t: '5 min a pie (340 m)',
    fl: 'Planta 0 · puerta automática',
    x: 172,
    y: 295,
    ax: 80,
    ay: 240,
    n: 'M400 515L400 280L172 280L172 295',
    a: 'M400 515L160 515L160 295',
    ns: '1. Cruza el Ágora hacia el Norte (200 m) → 2. Gira a la izquierda en el cruce arbolado → 3. Conserjería nada más pasar la puerta.',
    as: '⚠️ Ruta alternativa despejada: 1. Ve a la izquierda hasta el vial principal → 2. Sube recto hasta Conserjería 1G.',
    m: [
      'Cruza el jardín hacia el norte por el camino.',
      'En el cruce con bancos, gira a la izquierda.',
      'Entra en el edificio blanco con rótulo 1G.'
    ]
  },
  teleco: {
    b: [520, 185, 205, 110],
    ic: '📡',
    v: 'Exámenes / Evento',
    s: 'ETSIT 4D/4P',
    vt: 'Aulas de exámenes y Salón Teleco',
    st: 'Escuela de Telecomunicación · 4D',
    t: '4 min a pie (290 m)',
    fl: 'Planta 0 + pasarela a planta 1',
    x: 622,
    y: 295,
    ax: 622,
    ay: 185,
    n: 'M400 515L400 280L622 280L622 295',
    a: 'M400 515L640 515L640 295',
    ns: '1. Avanza al Norte por el paseo central → 2. Gira a la derecha en la avenida interna → 3. Rampa accesible en la entrada Sur.',
    as: '⚠️ Desvío sin barreras: 1. Ve a la derecha hasta el paseo Este → 2. Sube recto a la puerta accesible.',
    m: [
      'Camina al norte con el césped a tu izquierda.',
      'Gira a la derecha hacia el edificio con antenas.',
      'La rampa tiene barandilla azul junto a la puerta.'
    ]
  },
  tranvia: {
    b: [295, 82, 210, 58],
    ic: '🚕',
    v: 'Taxi PMR / Tranvía',
    s: 'Tranvía Tarongers',
    vt: 'Taxi adaptado y Tranvía',
    st: 'Salida Norte · Tranvía Tarongers',
    t: '5 min a pie (360 m)',
    fl: 'Cota cero · acera rebajada',
    x: 400,
    y: 140,
    ax: 400,
    ay: 140,
    n: 'M400 515L400 140',
    a: 'M400 515L400 140',
    ns: '1. Todo recto al Norte por el paseo central (360 m sin escalones) → 2. Salida junto a la parada de tranvía y de taxis adaptados.',
    as: '1. Todo recto al Norte hasta la Av. dels Tarongers.',
    m: [
      'Sigue el paseo central sin desviarte.',
      'Cruza la fila de árboles altos; verás las vías.',
      'Junto al paso de cebra hay un rebaje sin bordillo.'
    ]
  }
};

// Estado reactivo de la aplicación
const S = {
  p: 'v',
  sel: 'casa',
  rch: false,
  inc: [
    { id: '1', b: 'casa', t: '♿ Rampa Oeste bloqueada por reparto', tk: 'GRG-8841', st: 'Técnico en camino', blk: true, src: 'Comunidad Waze' },
    { id: '2', b: 'teleco', t: '🛗 Ascensor Sur en revisión', tk: 'GRG-8839', st: 'En reparación', blk: false, src: 'Sensor Gregal' }
  ]
};

const lab = k => S.p == 'v' ? D[k].v : D[k].s;
const ttl = k => S.p == 'v' ? D[k].vt : D[k].st;

const map = $('map');
const tot = $('totem');
const V = { x: 400, y: 500, z: 1 };
const RM = matchMedia('(prefers-reduced-motion:reduce)').matches;
let anim = 0;

/* ---------- Mapa: encuadre, paneo y zoom ---------- */
const dims = () => {
  const r = map.getBoundingClientRect();
  return { w: r.width, h: r.height, l: r.left, t: r.top };
};

function apply() {
  const { w, h } = dims();
  const W = 800 / V.z;
  const H = W * h / w;
  V.x = clamp(V.x, 0, 800);
  V.y = clamp(V.y, 0, 1000);
  map.setAttribute('viewBox', `${V.x - W / 2} ${V.y - H / 2} ${W} ${H}`);
}

function fly(x, y, z) {
  cancelAnimationFrame(anim);
  z = clamp(z, 0.8, 3);
  if (RM) {
    Object.assign(V, { x, y, z });
    return apply();
  }
  const s = { ...V };
  const t0 = performance.now();
  (function f(n) {
    const k = Math.min(1, (n - t0) / 650);
    const e = 1 - Math.pow(1 - k, 3);
    V.x = s.x + (x - s.x) * e;
    V.y = s.y + (y - s.y) * e;
    V.z = s.z + (z - s.z) * e;
    apply();
    if (k < 1) anim = requestAnimationFrame(f);
  })(t0);
}

function insets() {
  const f = tot.getBoundingClientRect();
  const d = $('dest').getBoundingClientRect();
  const s = $('sheet').getBoundingClientRect();
  return S.rch ? { t: 0, b: f.bottom - d.top } : { t: d.bottom - f.top, b: f.bottom - s.top };
}

function focusRoute() {
  const rp = $('rp');
  if (!rp) return;
  const bb = rp.getBBox();
  const { w, h } = dims();
  const i = insets();
  const vh = Math.max(120, h - i.t - i.b);
  const sc = Math.min(w * 0.8 / Math.max(bb.width, 140), vh * 0.8 / Math.max(bb.height, 140));
  const px = bb.x + bb.width / 2;
  const py = bb.y + bb.height / 2;
  const visY = i.t + vh / 2;
  fly(px, py - (visY - h / 2) / sc, sc * 800 / w);
}

function zoomAt(f, fx = 0.5, fy = 0.5) {
  const { w, h } = dims();
  const W = 800 / V.z;
  const H = W * h / w;
  const wx = V.x - W / 2 + fx * W;
  const wy = V.y - H / 2 + fy * H;
  V.z = clamp(V.z * f, 0.8, 3);
  const W2 = 800 / V.z;
  const H2 = W2 * h / w;
  V.x = wx - (fx - 0.5) * W2;
  V.y = wy - (fy - 0.5) * H2;
  apply();
}

const P = new Map();
let moved = 0;
let pd = 0;

const dist = () => {
  const [a, b] = [...P.values()];
  return Math.hypot(a[0] - b[0], a[1] - b[1]) || 1;
};

map.addEventListener('pointerdown', e => {
  P.set(e.pointerId, [e.clientX, e.clientY]);
  moved = 0;
  cancelAnimationFrame(anim);
  pd = P.size == 2 ? dist() : 0;
});

map.addEventListener('pointermove', e => {
  const o = P.get(e.pointerId);
  if (!o) return;
  const { w } = dims();
  const k = 800 / V.z / w;
  P.set(e.pointerId, [e.clientX, e.clientY]);

  if (P.size == 1) {
    const dx = e.clientX - o[0];
    const dy = e.clientY - o[1];
    moved += Math.abs(dx) + Math.abs(dy);
    if (moved > 6) {
      map.setPointerCapture(e.pointerId);
      map.classList.add('drag');
      V.x -= dx * k;
      V.y -= dy * k;
      apply();
    }
  } else {
    const d = dist();
    if (pd) {
      V.z = clamp(V.z * d / pd, 0.8, 3);
      apply();
      moved = 99;
    }
    pd = d;
  }
});

['pointerup', 'pointercancel'].forEach(t => map.addEventListener(t, e => {
  P.delete(e.pointerId);
  map.classList.remove('drag');
  pd = 0;
}));

map.addEventListener('wheel', e => {
  e.preventDefault();
  const { w, h, l, t } = dims();
  zoomAt(e.deltaY < 0 ? 1.15 : 1 / 1.15, (e.clientX - l) / w, (e.clientY - t) / h);
}, { passive: false });

map.addEventListener('keydown', e => {
  const s = 70 / V.z;
  const m = { ArrowLeft: [-s, 0], ArrowRight: [s, 0], ArrowUp: [0, -s], ArrowDown: [0, s] }[e.key];
  if (m) {
    e.preventDefault();
    V.x += m[0];
    V.y += m[1];
    apply();
  } else if (e.key == '+' || e.key == '=') {
    zoomAt(1.3);
  } else if (e.key == '-') {
    zoomAt(1 / 1.3);
  } else if (e.key == '0') {
    focusRoute();
  }
});

addEventListener('resize', apply);

/* ---------- Paneles plegables ---------- */
function tog(b) {
  const open = b.getAttribute('aria-expanded') !== 'true';
  const c = $(b.getAttribute('aria-controls'));
  b.setAttribute('aria-expanded', open);
  c.classList.toggle('closed', !open);
  c.inert = !open;
  if (b.closest('#totem')) setTimeout(focusRoute, 340);
}

/* ---------- Dibujo ---------- */
const ipos = i => {
  const b = D[i.b].b;
  return [b[0] + b[2] - 14, b[1] + 6];
};

function drawB() {
  $('bl').innerHTML = Object.entries(D).map(([k, d]) => {
    const [x, y, w, h] = d.b;
    const on = k == S.sel;
    return `<g class="bld" tabindex="0" role="button" aria-label="${ttl(k)}" onclick="pick('${k}')" onkeydown="if(event.key=='Enter'||event.key==' '){event.preventDefault();pick('${k}')}">
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18" fill="#fff" stroke="${on ? '#1d4ed8' : '#1e293b'}" stroke-width="${on ? 6 : 3}"/>
      <text x="${x + w / 2}" y="${y + h / 2 - (h > 70 ? 4 : -5)}" text-anchor="middle" font-size="${h > 70 ? 26 : 15}" font-weight="800" fill="#0f172a">${d.ic}${h > 70 ? '' : ' ' + lab(k)}</text>
      ${h > 70 ? `<text x="${x + w / 2}" y="${y + h / 2 + 22}" text-anchor="middle" font-size="15" font-weight="800" fill="#0f172a">${lab(k)}</text><text x="${x + w / 2}" y="${y + h / 2 + 40}" text-anchor="middle" font-size="12" font-weight="700" fill="#475569">${d.fl.split(' y ')[0]}</text>` : ''}
    </g>`;
  }).join('');
}

function route() {
  const d = D[S.sel];
  const blk = S.inc.some(i => i.b == S.sel && i.blk);
  const c = blk ? '#b45309' : '#2563eb';
  const p = blk ? d.a : d.n;
  const x = blk ? d.ax : d.x;
  const y = blk ? d.ay : d.y;

  $('rt').innerHTML = `<path id="rp" d="${p}" class="rw"/><path d="${p}" class="ra" stroke="${c}"/><circle cx="${x}" cy="${y}" r="16" fill="${c}" stroke="#fff" stroke-width="3"/><text x="${x}" y="${y + 5}" text-anchor="middle" font-size="14" fill="#fff">♿</text>`;
  $('bT').textContent = '🚶 ' + d.t;
  const e = $('bE');
  e.className = 'badge ' + (blk ? 'warn' : 'ok');
  e.textContent = blk ? '🔄 Desviada a puerta alternativa' : '♿ ' + d.fl;
  $('rT').textContent = ttl(S.sel);
  $('rS').textContent = blk ? d.as : d.ns;
  $('destLbl').textContent = '📍 Destino: ' + lab(S.sel) + (S.p == 'v' ? '' : '');
}

function drawInc() {
  $('ic').innerHTML = S.inc.map(i => {
    const [x, y] = ipos(i);
    return `<g transform="translate(${x} ${y})" class="bld" onclick="pick('${i.b}')">` + (i.blk ?
      `<circle r="26" fill="url(#hz)" opacity=".5"/><polygon points="-10,-18 10,-18 18,-10 18,10 10,18 -10,18 -18,10 -18,-10" fill="#dc2626" stroke="#fff" stroke-width="3"/><text y="6" text-anchor="middle" font-size="15" fill="#fff">⛔</text>` :
      `<polygon points="0,-20 20,16 -20,16" fill="#f59e0b" stroke="#000" stroke-width="2.5"/><text y="12" text-anchor="middle" font-size="14" font-weight="900">!</text>`) + `</g>`;
  }).join('');

  $('avN').textContent = S.inc.length ? S.inc.length + ' activo(s)' : 'todo operativo';
  $('strip').innerHTML = S.inc.length ? S.inc.map(i => `<button class="inc" onclick="pick('${i.b}')">${i.t}<small>${lab(i.b)} · ${i.tk}</small></button>`).join('') : '<p class="steps">✅ Ascensores, rampas y baños adaptados operativos.</p>';
  $('gL').innerHTML = S.inc.length ? S.inc.map(i => `<div class="tk"><div><b>${i.tk} · ${i.st}</b><small>${i.t} · ${lab(i.b)} · ${i.src}</small></div><button class="btn pri" onclick="fix('${i.id}')">✓ Reparado</button></div>`).join('') : '<p class="steps">No hay partes pendientes.</p>';
}

function chips() {
  $('chips').innerHTML = Object.keys(D).map(k => `<button class="btn chip" aria-pressed="${k == S.sel}" onclick="pick('${k}')"><span aria-hidden="true">${D[k].ic}</span>${lab(k)}</button>`).join('');
}

function all(auto) {
  drawB();
  route();
  drawInc();
  chips();
  $('rb').innerHTML = Object.keys(D).map(k => `<option value="${k}" ${k == S.sel ? 'selected' : ''}>${D[k].ic} ${D[k].st}</option>`).join('');
  const b = $('destHd');
  if (auto && b.getAttribute('aria-expanded') == 'true') tog(b);
  else if (auto !== 0) setTimeout(focusRoute, 30);
}

function pick(k) {
  if (moved > 6) return;
  S.sel = k;
  all(1);
}

function persona(p) {
  S.p = p;
  $('pv').setAttribute('aria-pressed', p == 'v');
  $('ps').setAttribute('aria-pressed', p == 's');
  all(0);
}

function floor(n) {
  $('f0').setAttribute('aria-pressed', n == 0);
  $('f1').setAttribute('aria-pressed', n == 1);
  $('ww').setAttribute('opacity', n ? 1 : 0.35);
}

/* ---------- Waze + Gregal ---------- */
function report(t, blk) {
  const b = $('rb').value;
  S.inc.unshift({
    id: '' + Date.now(),
    b,
    t,
    tk: 'GRG-' + (8850 + Math.floor(Math.random() * 140)),
    st: 'Abierto automáticamente',
    blk,
    src: 'Comunidad Waze'
  });
  S.sel = b;
  all(2);
}

function fix(id) {
  S.inc = S.inc.filter(i => i.id != id);
  all(2);
}

/* ---------- Hardware y accesibilidad ---------- */
const pw = w => $('pw').textContent = '⚡ ' + w + ' W';

function lux(v) {
  v = +v;
  const s = v >= 5000;
  tot.classList.toggle('solar', s);
  $('bS').setAttribute('aria-pressed', s);
  $('luxL').textContent = v + ' lx' + (s ? ' · solar auto' : '');
  pw(s ? 85 : Math.round(35 + v / 5000 * 35));
}

function solar() {
  const on = !tot.classList.contains('solar');
  tot.classList.toggle('solar', on);
  $('bS').setAttribute('aria-pressed', on);
}

function eco() {
  const on = !tot.classList.contains('eco');
  tot.classList.toggle('eco', on);
  $('ecoB').setAttribute('aria-pressed', on);
  $('ecoT').textContent = on ? 'Sin nadie (ahorro 75 %)' : 'Usuario delante';
  on ? pw(18) : lux($('lx').value);
}

function reach() {
  S.rch = !S.rch;
  $('ui').classList.toggle('reach', S.rch);
  $('bR').setAttribute('aria-pressed', S.rch);
  setTimeout(focusRoute, 60);
}

function speak(t) {
  if (!('speechSynthesis' in window)) return;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(t);
  u.lang = 'es-ES';
  speechSynthesis.speak(u);
}

const speakRoute = () => speak('Ruta accesible hacia ' + $('rT').textContent + '. ' + $('rS').textContent);
const speakFull = () => speak('Bienvenido al punto accesible del Ágora. Hay ' + S.inc.length + ' avisos activos. ' + $('rT').textContent + '. ' + $('rS').textContent);
const help = () => { speak('Conectando con Conserjería. Un operador le atenderá en cinco segundos.'); };

let lastF;
function openTk() {
  const d = D[S.sel];
  lastF = document.activeElement;
  $('tkL').innerHTML = d.m.map(s => `<li>${s}</li>`).join('');
  $('tkP').textContent = `DESTINO: ${d.vt.toUpperCase()} | ${d.t.toUpperCase()} | AYUDA UPV: EXT. 7000`;
  $('prB').textContent = '🖨️ Imprimir ticket';
  $('tk').hidden = false;
  $('tk').querySelector('button').focus();
}

function closeTk() {
  $('tk').hidden = true;
  lastF && lastF.focus();
}

function printTk() {
  $('prB').textContent = '✅ Ticket en la bandeja inferior';
  speak('Tu ticket con tres referencias visuales está en la bandeja inferior.');
}

function emer() {
  const on = $('em').hidden;
  $('em').hidden = !on;
  if (on) {
    speak('Alerta oficial. Evacuación preventiva. No use los ascensores. Diríjase al jardín central del Ágora.');
  } else if ('speechSynthesis' in window) {
    speechSynthesis.cancel();
  }
}

addEventListener('keydown', e => {
  if (e.key == 'Escape' && !$('tk').hidden) closeTk();
});

// Inicialización
document.querySelectorAll('.collapse.closed').forEach(c => c.inert = true);
all(0);
apply();
setTimeout(focusRoute, 200);
