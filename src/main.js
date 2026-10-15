import './style.css';
import { COURSE, OTHER_COURSES, ACHIEVEMENTS, totalLessons } from './course.js';
import { mascotSVG, mascotFinancierSVG } from './mascot.js';
import { UNIT_ART, CAT_ART, LESSON_ART, COURSE_ART, CARD2_ART } from './illustrations.js';
import { icon, LESSON_ICON, UNIT_ICON, COURSE_ICON, ACH_ICON } from './icons.js';

// ── Telegram ───────────────────────────────
const tg = window.Telegram?.WebApp;
// Статичное приложение: фиксируем экран, запрещаем сворачивание свайпом.
try {
  tg?.ready();
  tg?.expand();
  tg?.setHeaderColor?.('#ffffff'); tg?.setBackgroundColor?.('#ffffff');
  // Не сворачиваться при свайпе вниз (Bot API 7.7+)
  if (typeof tg?.disableVerticalSwipes === 'function') tg.disableVerticalSwipes();
  // Случайное закрытие — только с подтверждением
  if (typeof tg?.enableClosingConfirmation === 'function') tg.enableClosingConfirmation();
  // Держать приложение развёрнутым
  tg?.onEvent?.('viewportChanged', (e) => { if (e?.isStateStable) { try { tg.expand(); } catch (err) {} } });
} catch (e) {}
// Режим Fullsize: развёрнуто на всю высоту, но без Fullscreen.
try { tg?.exitFullscreen?.(); } catch (e) {}
const tgUser = tg?.initDataUnsafe?.user || null;
const tgName = tgUser?.first_name || '';
const tgPhoto = tgUser?.photo_url || '';
const haptic = (t = 'light') => { try { tg?.HapticFeedback?.impactOccurred(t); } catch (e) {} };
const notify = (t) => { try { tg?.HapticFeedback?.notificationOccurred(t); } catch (e) {} };

// ── Состояние ───────────────────────────────
const KEY = 'kursich_state_v2';
const todayStr = () => new Date().toISOString().slice(0, 10);
const defaultState = () => ({ xp: 0, hearts: 5, streak: 0, bestStreak: 0, lastDay: null, completed: {}, seenAch: [], name: '', onboarded: false, sound: false, dark: false });
let state = (() => {
  try {
    const cur = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (cur) return { ...defaultState(), ...cur };
    // перенос прогресса из первой версии (знакомство при этом показывается заново)
    const old = JSON.parse(localStorage.getItem('kursich_state_v1') || 'null');
    if (old) return { ...defaultState(), xp: old.xp || 0, hearts: old.hearts ?? 5, streak: old.streak || 0, bestStreak: old.bestStreak || 0, lastDay: old.lastDay || null, completed: old.completed || {}, seenAch: old.seenAch || [] };
    return defaultState();
  } catch (e) { return defaultState(); }
})();
function save() { localStorage.setItem(KEY, JSON.stringify(state)); }
(function touchStreak() {
  const t = todayStr();
  if (state.lastDay !== t) {
    const y = new Date(Date.now() - 864e5).toISOString().slice(0, 10);
    state.streak = state.lastDay === y ? state.streak + 1 : 1;
    state.bestStreak = Math.max(state.bestStreak || 0, state.streak);
    state.lastDay = t; state.hearts = 5; save();
  }
})();
// Короткий звук — только если включён в настройках. Музыки в приложении нет.
let audioCtx = null;
function beep(ok) {
  if (!state.sound) return;
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    const o = audioCtx.createOscillator(), g = audioCtx.createGain();
    o.connect(g); g.connect(audioCtx.destination);
    o.frequency.value = ok ? 880 : 220; g.gain.value = 0.06;
    o.start(); g.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.18); o.stop(audioCtx.currentTime + 0.2);
  } catch (e) {}
}

const app = document.getElementById('app');
const allLessons = COURSE.units.flatMap((u) => u.lessons.map((l) => ({ ...l, unit: u })));
const doneCount = () => Object.keys(state.completed).length;
const level = () => Math.floor(state.xp / 100) + 1;
const firstUndoneIdx = () => allLessons.findIndex((l) => !state.completed[l.id]);
const isUnlocked = (i) => { const f = firstUndoneIdx(); return f === -1 || i <= f; };
const esc = (s) => String(s || '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function toast(msg) {
  const el = document.createElement('div'); el.className = 'toast'; el.textContent = msg;
  document.getElementById('toast-root').appendChild(el);
  setTimeout(() => { el.style.opacity = '0'; el.style.transition = 'opacity .3s'; setTimeout(() => el.remove(), 320); }, 2300);
}
function confetti(n = 60) {
  const root = document.getElementById('confetti-root');
  const colors = ['#58cc02', '#1cb0f6', '#ffc800', '#ff4b4b', '#ce82ff', '#ff9600'];
  for (let i = 0; i < n; i++) {
    const p = document.createElement('div'); p.className = 'confetti-piece';
    const s = 6 + Math.random() * 8;
    p.style.cssText = `left:${Math.random() * 100}%;width:${s}px;height:${s * (Math.random() > .5 ? 1 : .4)}px;background:${colors[i % colors.length]};animation-duration:${1.6 + Math.random() * 1.8}s;animation-delay:${Math.random() * .35}s;border-radius:${Math.random() > .5 ? '50%' : '3px'}`;
    root.appendChild(p); setTimeout(() => p.remove(), 4200);
  }
}
function checkAchievements() {
  ACHIEVEMENTS.forEach((a) => {
    if (!state.seenAch.includes(a.id) && a.check(state)) {
      state.seenAch.push(a.id); save();
      setTimeout(() => { toast(`Достижение: ${a.title}`); notify('success'); }, 500);
    }
  });
}

// ── Навигация ───────────────────────────────
let flow = 'intro'; // intro (при каждом заходе) → splash → name → tutorial → app
let introTimer = null;
let tutIdx = 0;
let appTab = 'courses'; // courses | profile | ach | settings
let inPath = false;
let catView = 'catalog'; // catalog | finance
let scrollCurrent = false;

function applyTheme() { document.body.classList.toggle('dark', !!state.dark); }
function render() {
  applyTheme();
  document.querySelectorAll('.feedback,.modal-back').forEach((e) => e.remove());
  if (flow !== 'app') return renderOnboarding();
  renderApp();
}

// ── Онбординг ───────────────────────────────
function renderOnboarding() {
  app.classList.remove('in-lesson');
  if (flow === 'intro') {
    const letters = 'курсич'.split('').map((ch, i) => `<span class="intro-letter" style="animation-delay:${0.55 + i * 0.11}s">${ch}</span>`).join('');
    app.innerHTML = `<div class="intro-screen">
      <div class="intro-wave w1"></div><div class="intro-wave w2"></div>
      <div class="intro-content">
        <div class="intro-mascot">${mascotSVG('happy')}</div>
        <div class="intro-word">${letters}</div>
        <div class="intro-made">made tengizka</div>
      </div>
    </div>`;
    if (!introTimer) {
      introTimer = setTimeout(() => {
        introTimer = null;
        flow = state.onboarded ? 'app' : 'splash';
        if (flow === 'app') appTab = 'courses';
        render();
      }, 2800);
    }
    return;
  }
  if (flow === 'splash') {
    app.innerHTML = `<div class="onboard splash">
      <div class="spacer"></div>
      <div class="splash-mascot">${mascotSVG('celebrate')}</div>
      <div class="wordmark">курсич</div>
      <div class="splash-tag">Короткие уроки. По пять минут в день.</div>
      <button class="btn white" id="ob-start">Начать</button>
      <div class="spacer"></div>
    </div>`;
    document.getElementById('ob-start').onclick = () => { haptic('medium'); flow = 'name'; render(); };
    return;
  }
  if (flow === 'name') {
    app.innerHTML = `<div class="onboard">
      <div class="ob-mascot">${mascotSVG('idle')}</div>
      <div class="ob-title">Как тебя зовут?</div>
      <p class="ob-text">Так я буду к тебе обращаться.</p>
      <form id="name-form" style="display:contents">
        <input class="name-input" id="name-in" maxlength="24" placeholder="Твоё имя" value="${esc(state.name || tgName)}" autocomplete="name" enterkeyhint="done">
        <div class="spacer"></div>
        <button class="btn" id="ob-name" type="submit" ${!(state.name || tgName) ? 'disabled' : ''}>Дальше</button>
      </form>
    </div>`;
    const inp = document.getElementById('name-in'), btn = document.getElementById('ob-name');
    const form = document.getElementById('name-form');
    inp.addEventListener('input', () => { btn.disabled = !inp.value.trim(); });
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!inp.value.trim()) return;
      inp.blur();
      state.name = inp.value.trim(); save(); haptic('medium'); tutIdx = 0; flow = 'tutorial'; render();
    });
    return;
  }
  // tutorial
  const steps = [
    { e: 'happy', t: `Привет${state.name ? ', ' + esc(state.name) : ''}!`, b: 'Я Курсич. Будем учиться понемногу — по одному короткому уроку в день.' },
    { e: 'think', t: 'Сначала — понятно, потом — вопросы', b: 'В каждом уроке я сначала объясняю тему простыми словами. И только потом спрашиваю.' },
    { e: 'wink', t: 'Ошибся? Ничего страшного', b: 'Подскажу, объясню ещё раз и ругать не буду. Главное — идти дальше.' },
  ];
  const s = steps[tutIdx], last = tutIdx === steps.length - 1;
  app.innerHTML = `<div class="onboard">
    <button class="skip" id="ob-skip" style="align-self:flex-end">Пропустить</button>
    <div class="ob-mascot">${mascotSVG(s.e)}</div>
    <div class="ob-title">${s.t}</div>
    <p class="ob-text">${s.b}</p>
    <div class="spacer"></div>
    <div class="dots">${steps.map((_, i) => `<i class="${i === tutIdx ? 'on' : ''}"></i>`).join('')}</div>
    <button class="btn" id="ob-next">${last ? 'К курсам' : 'Дальше'}</button>
  </div>`;
  document.getElementById('ob-skip').onclick = finishOnboarding;
  document.getElementById('ob-next').onclick = () => { haptic(); if (last) finishOnboarding(); else { tutIdx++; render(); } };
}
function finishOnboarding() { state.onboarded = true; save(); flow = 'app'; appTab = 'courses'; inPath = false; haptic('medium'); render(); confetti(40); }

// ── Каркас приложения ───────────────────────────────
function topbar() {
  return `<div class="topbar"><button class="logo" id="logo-egg" aria-label="курсич">${'курсич'.split('').map((c, i) => `<span style="--i:${i}">${c}</span>`).join('')}</button>
    <div class="stat"><span class="gem">${icon('star',18)} <b>${state.xp}</b></span><button class="heart stat-btn" data-hearts>${icon('heart',18)} <b>∞</b></button></div></div>`;
}
function tabbar() {
  const act = (id) => (appTab === id || (id === 'profile' && (appTab === 'ach' || appTab === 'settings')) ? 'active' : '');
  return `<nav class="tabbar">
    <button class="tab ${act('courses')}" data-tab="courses"><span class="ti">${icon('book',24)}</span>Курсы</button>
    <button class="tab ${act('profile')}" data-tab="profile"><span class="ti">${icon('user',24)}</span>Профиль</button></nav>`;
}
function resetScroll() { const sc = document.getElementById('app-scroll') || app; sc.scrollTo(0, 0); }
function renderApp() {
  applyTheme(); app.classList.remove('in-lesson');
  let html = '';
  if (appTab === 'courses') html = inPath ? pathHtml() : (catView === 'finance' ? financeHtml() : catalogHtml());
  else if (appTab === 'profile') html = profileHtml();
  else if (appTab === 'ach') html = achHtml();
  else if (appTab === 'settings') html = settingsHtml();
  app.innerHTML = topbar() + `<div class="app-scroll" id="app-scroll">${html}</div>` + tabbar();
  bindApp();
}

// ── Каталог: категории и курсы ───────────────────────────────
const TILE_COLORS = ['#1cb0f6', '#ce82ff', '#ff9600', '#ff4b4b', '#ff86d0'];
const OTHER_CATS = [
  { id: 'career', title: 'Карьера', desc: 'Работа, доход, своё дело', art: 'career', grad: 'linear-gradient(135deg,#ffcf5c,#ff9600)' },
  { id: 'tech', title: 'Технологии', desc: 'Компьютеры и интернет', art: 'tech', grad: 'linear-gradient(135deg,#56ccf2,#1cb0f6)' },
  { id: 'lang', title: 'Языки', desc: 'Английский и другие', art: 'lang', grad: 'linear-gradient(135deg,#7ed3fc,#38bdf8)' },
  { id: 'art', title: 'Творчество', desc: 'Рисование, музыка, хобби', art: 'art', grad: 'linear-gradient(135deg,#e0aaff,#ce82ff)' },
];
function catalogHtml() {
  return `<div class="screen">
    <div class="bg-decor"><span style="top:70px;right:22px">✦</span><span style="top:210px;left:14px">✦</span><span style="top:430px;right:36px">✦</span></div>
    <div class="greet-row"><div class="gm">${mascotSVG('idle')}</div>
      <div><h2>Привет${state.name ? ', ' + esc(state.name) : ''}!</h2><p>Что учим сегодня?</p></div></div>
    <button class="cat-card" id="open-fin-cat">
      <div class="cat-art">${mascotFinancierSVG()}</div>
      <div class="cat-text"><h3>Финансы</h3><p>Деньги, вклады, кредиты, инвестиции</p>
      <span class="pill cat-pill">${doneCount() ? `Идёт курс · ${doneCount()}/${totalLessons}` : 'Есть открытый курс'}</span></div>
      <div class="cat-chev">›</div>
    </button>
    ${OTHER_CATS.map((c) => `<button class="cat-card small" data-locked-cat="${c.id}">
      <div class="cat-art small-art" style="background:${c.grad}">${CAT_ART[c.art]}</div>
      <div class="cat-text"><h3>${c.title}</h3><p>${c.desc}</p><span class="pill soon">${icon('lock',13)} Скоро</span></div>
      <div class="cat-chev">›</div></button>`).join('')}
  </div>`;
}
function financeHtml() {
  const finLocked = OTHER_COURSES.filter((c) => c.cat === 'finance');
  return `<div class="screen">
    <button class="menu-row" id="back-catalog" style="border:0;padding:10px 0 0"><span style="font-size:20px">‹</span> Все темы</button>
    <div class="cat-card hero-cat" style="cursor:default">
      <div class="cat-art">${mascotFinancierSVG()}</div>
      <div class="cat-text"><h3>Финансы</h3><p>Курсич в галстуке — значит, говорим о деньгах.</p></div>
    </div>
    <div class="course-grid">
      <button class="course-tile open" id="open-fin">
        <div class="te tile-art">${COURSE_ART[COURSE.id] || ''}</div><h3>${COURSE.title}</h3><p>${COURSE.subtitle}</p>
        <span class="pill">${doneCount() ? `Пройдено ${doneCount()} из ${totalLessons}` : 'Начать'}</span>
      </button>
      ${finLocked.map((c, i) => `<button class="course-tile locked" data-locked="${c.id}">
        <div class="te tile-art">${COURSE_ART[c.id] || ''}</div><h3>${c.title}</h3><p>${c.desc}</p>
        <span class="pill soon">${icon('lock',13)} Скоро</span></button>`).join('')}
    </div>
  </div>`;
}
function showHeartsModal() {
  const back = document.createElement('div'); back.className = 'modal-back';
  back.innerHTML = `<div class="modal-card"><div class="mm">${mascotSVG('happy')}</div>
    <h3>Учись спокойно</h3><p>Мы хотим, чтобы ты спокойно учился новому. Ошибки — часть учёбы, поэтому сердечки у тебя не заканчиваются.</p>
    <button class="btn" id="modal-ok">Хорошо</button></div>`;
  document.body.appendChild(back);
  const close = () => back.remove();
  back.addEventListener('click', (e) => { if (e.target === back) close(); });
  document.getElementById('modal-ok').onclick = () => { haptic(); close(); };
}
function showLockedCatModal(cat) {
  const back = document.createElement('div'); back.className = 'modal-back';
  back.innerHTML = `<div class="modal-card"><div class="mm">${mascotSVG('sleepy')}</div>
    <h3>В разработке</h3><p>Тема «${esc(cat.title)}» ещё готовится.</p>
    <button class="btn" id="modal-ok">Понятно</button></div>`;
  document.body.appendChild(back);
  const close = () => back.remove();
  back.addEventListener('click', (e) => { if (e.target === back) close(); });
  document.getElementById('modal-ok').onclick = () => { haptic(); close(); };
}
function showLockedModal(course) {
  const back = document.createElement('div'); back.className = 'modal-back';
  back.innerHTML = `<div class="modal-card"><div class="mm">${mascotSVG('sleepy')}</div>
    <h3>В разработке</h3><p>Курс «${esc(course.title)}» ещё пишется.</p>
    <button class="btn" id="modal-ok">Понятно</button></div>`;
  document.body.appendChild(back);
  const close = () => back.remove();
  back.addEventListener('click', (e) => { if (e.target === back) close(); });
  document.getElementById('modal-ok').onclick = () => { haptic(); close(); };
}

// ── Путь курса ───────────────────────────────
const OFFSETS = [0, 52, 84, 52, 0, -52, -84, -52]; // зигзаг как в Duolingo: влево-вправо
const UNIT_DECOR = { u1: ['🧾', '💸'], u2: ['💳', '🧮'], u3: ['📄', '⏳'], u4: ['📊', '🪙'], u5: ['🧾', '🏠'], u6: ['📱', '🔐'] };
function pathHtml() {
  let gi = -1;
  const units = COURSE.units.map((u) => {
    const pts = u.lessons.map((l, li) => ({ x: 170 + OFFSETS[li % OFFSETS.length], y: 70 + li * 172 }));
    const d = pts.map((p, i) => i === 0 ? `M ${p.x} ${p.y}` : `C ${pts[i-1].x} ${pts[i-1].y + 70}, ${p.x} ${p.y - 70}, ${p.x} ${p.y}`).join(' ');
    const trail = `<svg class="path-trail" viewBox="0 0 340 ${pts.length * 172 + 30}" preserveAspectRatio="none" aria-hidden="true"><path d="${d}" fill="none" stroke="${u.color}" stroke-width="9" stroke-linecap="round" stroke-dasharray="0.1 17" opacity=".5"/></svg>`;
    const nodes = u.lessons.map((l, li) => {
      gi++;
      const done = !!state.completed[l.id], unlocked = isUnlocked(gi), current = unlocked && !done;
      return `<div class="node-wrap" style="transform:translateX(${OFFSETS[li % OFFSETS.length]}px)">
        ${current ? '<div class="start-bubble">СТАРТ</div>' : ''}
        <button class="node ${done ? 'done' : ''} ${!unlocked ? 'locked' : ''} ${current ? 'current' : ''}" style="--nd:${u.dark};background:${done ? '' : u.color}" data-lesson="${l.id}" ${!unlocked ? 'disabled' : ''}>${done ? icon('check',30) : !unlocked ? icon('lock',25) : `<span class="node-art">${LESSON_ART[l.id] || ''}</span>`}</button>
        <div class="node-label ${!unlocked ? 'locked' : ''}">${l.title}</div>
        <div class="mini-progress">+${l.xp} XP</div></div>`;
    }).join('');
    const ud = u.lessons.filter((l) => state.completed[l.id]).length;
    return `<div class="unit-banner" style="background:${u.color}"><div class="uicon">${icon(UNIT_ICON[u.id] || 'book',32)}</div>
      <div><h2>${u.title}</h2><p>${u.desc}</p></div><div class="ubadge">${ud}/${u.lessons.length}</div></div>
      <div class="path">${trail}<div class="path-art">${UNIT_ART[u.id]}</div>${nodes}</div>`;
  }).join('');
  return `<div class="screen" style="padding-top:10px">
    <button class="menu-row" id="back-catalog" style="border:0;padding:6px 0 2px"><span style="font-size:20px">‹</span> Финансы</button>
    <h2 class="st" style="margin-top:6px">${COURSE.title}</h2>
    <p class="sub">${doneCount()} из ${totalLessons} уроков · уровень ${level()}</p>
    <div class="bar" style="margin:0 2px 8px"><i style="width:${Math.max(3, (doneCount() / totalLessons) * 100)}%"></i></div>
    ${units}</div>`;
}

// ── Профиль / достижения / настройки ───────────────────────────────
function profileHtml() {
  const got = ACHIEVEMENTS.filter((a) => a.check(state)).length;
  return `<div class="screen">
    <div class="cardbox" style="display:flex;gap:14px;align-items:center;margin-top:14px">
      ${tgPhoto ? `<img class="tg-avatar" src="${esc(tgPhoto)}" alt="">` : `<div class="tg-initial">${esc((state.name || 'К')[0].toUpperCase())}</div>`}
      <div><div style="font-size:19px;font-weight:900">${esc(state.name) || 'Ученик'}</div>
      <div style="font-weight:800;color:var(--muted);font-size:13px;margin-top:3px">Уровень ${level()} · ${state.xp} XP</div>
      <div style="font-weight:800;color:var(--muted);font-size:13px">${state.streak} дн. — серия заходов · уроков: ${doneCount()}/${totalLessons}</div></div>
    </div>
    <div class="cardbox" style="padding:4px 16px">
      <button class="menu-row" id="go-ach"><span class="mi" style="background:#fff3cf;color:#b45309">${icon('trophy',22)}</span>Достижения<span style="margin-left:auto;font-weight:900;color:var(--muted);font-size:13px">${got}/${ACHIEVEMENTS.length}</span><span class="chev">›</span></button>
      <button class="menu-row" id="go-settings"><span class="mi" style="background:#eef2f5;color:#52616b">${icon('sliders',22)}</span>Настройки<span class="chev">›</span></button>
    </div>
  </div>`;
}
function achHtml() {
  return `<div class="screen">
    <button class="menu-row" data-back-profile style="border:0;padding:10px 0 0"><span style="font-size:20px">‹</span> Профиль</button>
    <h2 class="st">Достижения</h2>
    <div class="cardbox" style="padding:4px 16px">
    ${ACHIEVEMENTS.map((a) => { const on = a.check(state); return `<div class="ach ${on ? '' : 'off'}"><div class="ae">${icon(ACH_ICON[a.id] || 'star',26)}</div><div><h4>${a.title}</h4><p>${a.desc}</p></div>${on ? '<div style="margin-left:auto;color:#46a302;font-weight:900">✓</div>' : ''}</div>`; }).join('')}
    </div></div>`;
}
function settingsHtml() {
  return `<div class="screen">
    <button class="menu-row" data-back-profile style="border:0;padding:10px 0 0"><span style="font-size:20px">‹</span> Профиль</button>
    <h2 class="st">Настройки</h2>
    <div class="cardbox" style="padding:6px 16px">
      <div class="menu-row" style="cursor:default"><span class="mi" style="background:#e5f7d0;color:#3f8f04">${icon('user',22)}</span>Имя
        <input class="name-input" id="set-name" style="margin-left:auto;width:46%;padding:9px 10px;font-size:15px;text-align:right" maxlength="24" value="${esc(state.name)}"></div>
      <div class="menu-row" style="cursor:default"><span class="mi" style="background:#eef2f5;color:#52616b">${icon('moon',22)}</span>Тёмная тема
        <label class="switch"><input type="checkbox" id="set-dark" ${state.dark ? 'checked' : ''}><i></i></label></div>
      <div class="menu-row" style="cursor:default"><span class="mi" style="background:#eef2f5;color:#52616b">${icon('bell',22)}</span>Звуковые эффекты
        <label class="switch"><input type="checkbox" id="set-sound" ${state.sound ? 'checked' : ''}><i></i></label></div>
    </div>
    <div class="cardbox" style="padding:6px 16px">
      <div class="menu-row" style="cursor:default"><span class="mi" style="background:#eef2f5;color:#52616b">${icon('info',22)}</span>О приложении
        <span style="margin-left:auto;font-weight:800;color:var(--muted);font-size:13px">курсич · версия 1.1</span></div>
      <div class="menu-row" style="cursor:default"><span class="mi" style="background:#eef2f5;color:#52616b">${icon('calendar',22)}</span>Материалы курсов
        <span style="margin-left:auto;font-weight:800;color:var(--muted);font-size:13px">актуальны на октябрь 2026</span></div>
    </div>
    <button class="btn ghost" id="redo-ob" style="margin-bottom:12px">Пройти знакомство заново</button>
    <button class="btn ghost" id="reset-all" style="color:#ff4b4b">Сбросить прогресс</button>
  </div>`;
}

function bindApp() {
  const egg = document.getElementById('logo-egg');
  if (egg) egg.onclick = () => {
    egg.classList.remove('play'); void egg.offsetWidth; egg.classList.add('play');
    haptic('medium');
    setTimeout(() => egg.classList.remove('play'), 1100);
  };
  app.querySelectorAll('[data-hearts]').forEach((b) => b.onclick = () => { haptic(); showHeartsModal(); });
  app.querySelectorAll('[data-tab]').forEach((b) => b.onclick = () => { appTab = b.dataset.tab; if (appTab === 'courses') inPath = inPath && false; haptic(); renderApp(); resetScroll(); });
  const openFinCat = document.getElementById('open-fin-cat');
  if (openFinCat) openFinCat.onclick = () => { catView = 'finance'; haptic('medium'); renderApp(); resetScroll(); };
  app.querySelectorAll('[data-locked-cat]').forEach((b) => b.onclick = () => { haptic(); const c = OTHER_CATS.find((x) => x.id === b.dataset.lockedCat); if (c) showLockedCatModal(c); });
  const openFin = document.getElementById('open-fin');
  if (openFin) openFin.onclick = () => { inPath = true; scrollCurrent = true; haptic('medium'); renderApp(); };
  app.querySelectorAll('[data-locked]').forEach((b) => b.onclick = () => { haptic(); const c = OTHER_COURSES.find((x) => x.id === b.dataset.locked); if (c) showLockedModal(c); });
  const backs = app.querySelectorAll('#back-catalog');
  backs.forEach((back) => back.onclick = () => { if (inPath) { inPath = false; } else { catView = 'catalog'; } haptic(); renderApp(); resetScroll(); });
  if (inPath && scrollCurrent) {
    scrollCurrent = false;
    requestAnimationFrame(() => setTimeout(() => {
      const cur = app.querySelector('.node.current') || app.querySelector('.node:not(.locked):last-of-type');
      if (cur) cur.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }, 60));
  }
  app.querySelectorAll('[data-lesson]').forEach((b) => b.onclick = () => { haptic('medium'); startLesson(b.dataset.lesson); });
  const goAch = document.getElementById('go-ach'); if (goAch) goAch.onclick = () => { appTab = 'ach'; haptic(); renderApp(); resetScroll(); };
  const goSet = document.getElementById('go-settings'); if (goSet) goSet.onclick = () => { appTab = 'settings'; haptic(); renderApp(); resetScroll(); };
  app.querySelectorAll('[data-back-profile]').forEach((b) => b.onclick = () => { appTab = 'profile'; haptic(); renderApp(); resetScroll(); });
  const nameIn = document.getElementById('set-name');
  if (nameIn) nameIn.addEventListener('change', () => { state.name = nameIn.value.trim(); save(); toast('Имя сохранено'); });
  const darkIn = document.getElementById('set-dark');
  if (darkIn) darkIn.addEventListener('change', () => { state.dark = darkIn.checked; save(); applyTheme(); });
  const soundIn = document.getElementById('set-sound');
  if (soundIn) soundIn.addEventListener('change', () => { state.sound = soundIn.checked; save(); if (state.sound) beep(true); });
  const redo = document.getElementById('redo-ob');
  if (redo) redo.onclick = () => { state.onboarded = false; save(); flow = 'splash'; render(); resetScroll(); };
  const reset = document.getElementById('reset-all');
  if (reset) reset.onclick = () => {
    if (confirm('Сбросить прогресс, XP и достижения?')) {
      const keep = { name: state.name, onboarded: true, sound: state.sound, dark: state.dark };
      state = { ...defaultState(), ...keep, lastDay: todayStr(), streak: 1, bestStreak: 1 };
      save(); appTab = 'courses'; inPath = false; renderApp(); toast('Прогресс сброшен');
    }
  };
}

// ── Урок: теория → вопросы → закрепление ───────────────────────────────
let L = null;
function startLesson(lessonId) {
  const lesson = allLessons.find((l) => l.id === lessonId);
  if (!lesson) return;
  const steps = [
    ...lesson.cards.map((c, ci) => ({ kind: 'theory', ci, ...c })),
    ...lesson.quiz.map((q) => ({ kind: 'quiz', ...q })),
    { kind: 'recap' },
  ];
  L = { lesson, steps, idx: 0, correct: 0, totalQ: lesson.quiz.length, theoryN: lesson.cards.length, selected: null, checked: false };
  try { tg?.BackButton?.show(); tg.BackButton.onClick(exitLesson); } catch (e) {}
  renderLesson();
}
function exitLesson() { L = null; try { tg?.BackButton?.hide(); } catch (e) {} appTab = 'courses'; inPath = true; scrollCurrent = true; render(); }

function renderLesson() {
  app.classList.add('in-lesson');
  const step = L.steps[L.idx];
  const progress = Math.round((L.idx / L.steps.length) * 100);
  let body = '';
  if (step.kind === 'theory') {
    const n = L.steps.slice(0, L.idx + 1).filter((s) => s.kind === 'theory').length;
    body = `<span class="phase-tag theory">${icon('book',14)} Сначала разберёмся · ${n} из ${L.theoryN}</span>
      <div class="mascot-row"><div class="mwrap">${mascotSVG('idle')}</div>
        <div class="bubble"><b>${step.t}</b><br>${step.b}</div></div>
      <div class="theory-visual">${(step.ci === 1 && CARD2_ART[L.lesson.id]) || LESSON_ART[L.lesson.id] || ''}</div>
      <div class="sticky-cta"><button class="btn" id="next">Понятно</button></div>`;
  } else if (step.kind === 'quiz') {
    const n = L.steps.slice(0, L.idx + 1).filter((s) => s.kind === 'quiz').length;
    body = `<span class="phase-tag">${icon('help',14)} Вопрос ${n} из ${L.totalQ}</span>
      <div class="mascot-row" style="align-items:center"><div class="q-mascot">${mascotSVG('think')}</div>
        <div class="bubble" style="font-size:17px"><b>${step.q}</b></div></div>
      <div id="opts">${step.options.map((o, i) => `<button class="opt" data-opt="${i}">${o}</button>`).join('')}</div>
      <div class="sticky-cta"><button class="btn" id="check" disabled>Проверить</button></div>`;
  } else { // recap
    body = `<span class="phase-tag recap">${icon('target',14)} Закрепим</span>
      <h2 style="margin-top:14px">Главное из урока</h2>
      ${L.lesson.cards.map((c, i) => { const short = (c.b.split(/(?<=\.)\s/)[0] || c.b); return `<div class="recap-item"><span class="rn">${i + 1}</span><div><b>${c.t}</b><p>${short}</p></div></div>`; }).join('')}
      <div class="sticky-cta"><button class="btn" id="next">Готово</button></div>`;
  }
  app.innerHTML = `<div class="lesson-shell">
    <div class="lesson-head"><button class="xclose" id="lx">✕</button>
      <div class="bar lbar"><i style="width:${progress}%;background:linear-gradient(90deg,#58cc02,#8ee000)"></i></div>
      <button class="hearts-live" data-hearts>${icon('heart',19)} ∞</button></div>
    <div class="lesson-body slide-in" style="padding-bottom:120px">${body}</div></div>`;
  document.getElementById('lx').onclick = () => { haptic(); exitLesson(); };
  app.querySelectorAll('[data-hearts]').forEach((b) => b.onclick = () => { haptic(); showHeartsModal(); });
  const next = document.getElementById('next');
  if (next) next.onclick = () => { haptic(); advance(); };
  if (step.kind === 'quiz') {
    const checkBtn = document.getElementById('check');
    app.querySelectorAll('[data-opt]').forEach((b) => b.onclick = () => {
      if (L.checked) return;
      L.selected = Number(b.dataset.opt); haptic();
      app.querySelectorAll('[data-opt]').forEach((x) => x.classList.toggle('sel', x === b));
      checkBtn.disabled = false;
    });
    checkBtn.onclick = checkAnswer;
  }
}
function checkAnswer() {
  const cta = app.querySelector('.lesson-body .sticky-cta'); if (cta) cta.remove();
  const step = L.steps[L.idx];
  const ok = L.selected === step.correct;
  L.checked = true;
  if (ok) { L.correct++; notify('success'); beep(true); } else { notify('error'); haptic('heavy'); beep(false); }
  app.querySelectorAll('[data-opt]').forEach((b) => {
    b.disabled = true; const i = Number(b.dataset.opt);
    if (i === step.correct) b.classList.add('right'); else if (i === L.selected) b.classList.add('wrong');
  });
  const fb = document.createElement('div');
  fb.className = `feedback ${ok ? 'ok' : 'bad'}`;
  fb.innerHTML = `<div class="fb-mascot" style="animation:pop .45s ease">${mascotSVG(ok ? 'happy' : 'oops')}</div>
    <h3>${ok ? 'Верно!' : 'Почти получилось'}</h3><p>${step.explain}</p>
    <button class="btn ${ok ? '' : 'red'}" id="fb-next">Дальше</button>`;
  document.body.appendChild(fb);
  document.getElementById('fb-next').onclick = () => { fb.remove(); haptic(); advance(); };
}
function advance() {
  L.idx++;
  if (L.idx >= L.steps.length) return finishLesson();
  L.selected = null; L.checked = false;
  renderLesson(); resetScroll();
}
function finishLesson() {
  app.classList.add('in-lesson');
  const lesson = L.lesson;
  const acc = L.totalQ ? L.correct / L.totalQ : 1;
  const firstTime = !state.completed[lesson.id];
  state.completed[lesson.id] = Math.max(state.completed[lesson.id] || 0, acc);
  const xpGain = firstTime ? Math.round(lesson.xp * (0.5 + 0.5 * acc)) + (acc === 1 ? 5 : 0) : 2;
  state.xp += xpGain; save();
  const perfect = acc === 1;
  app.innerHTML = `<div class="app-scroll"><div class="result">
    <div class="mwrap">${mascotSVG('proud')}</div>
    <div class="big-xp">+${xpGain} XP</div>
    <h2 style="margin:0;font-size:23px;font-weight:900">${perfect ? 'Всё верно!' : 'Урок пройден'}</h2>
    <div class="result-stats">
      <div class="rstat"><b style="color:#46a302">${Math.round(acc * 100)}%</b><span>Точность</span></div>
      <div class="rstat"><b style="color:#ff9600">${L.correct}/${L.totalQ}</b><span>Верно</span></div>
      <div class="rstat"><b style="color:#1cb0f6">${icon('heart',18)} ∞</b><span>Сердец</span></div>
    </div>
    <button class="btn" id="to-path">К урокам</button>
    <button class="btn ghost" id="retry" style="margin-top:12px">Пройти ещё раз</button>
  </div></div>`;
  if (firstTime) confetti(perfect ? 80 : 45);
  notify('success'); checkAchievements();
  document.getElementById('to-path').onclick = () => { haptic(); exitLesson(); };
  document.getElementById('retry').onclick = () => { haptic(); startLesson(lesson.id); };
}

render();
