import './style.css';
import { COURSE, OTHER_COURSES, SOURCES, ACHIEVEMENTS, totalLessons } from './course.js';
import { mascotSVG } from './mascot.js';

// ── Telegram Mini App ───────────────────────────────
const tg = window.Telegram?.WebApp;
try {
  tg?.ready(); tg?.expand();
  tg?.setHeaderColor?.('#ffffff'); tg?.setBackgroundColor?.('#ffffff');
} catch (e) { /* вне Telegram тоже работает */ }
const haptic = (type = 'light') => { try { tg?.HapticFeedback?.impactOccurred(type); } catch (e) {} };
const notify = (type) => { try { tg?.HapticFeedback?.notificationOccurred(type); } catch (e) {} };

// ── Состояние ───────────────────────────────
const KEY = 'kursich_state_v1';
const todayStr = () => new Date().toISOString().slice(0, 10);
const defaultState = () => ({ xp: 0, hearts: 5, streak: 0, bestStreak: 0, lastDay: null, completed: {}, seenAch: [] });
let state = (() => { try { return { ...defaultState(), ...JSON.parse(localStorage.getItem(KEY) || '{}') }; } catch (e) { return defaultState(); } })();
function save() { localStorage.setItem(KEY, JSON.stringify(state)); }
// серия дней
(function touchStreak() {
  const t = todayStr();
  if (state.lastDay !== t) {
    const y = new Date(Date.now() - 864e5).toISOString().slice(0, 10);
    state.streak = state.lastDay === y ? state.streak + 1 : 1;
    state.bestStreak = Math.max(state.bestStreak || 0, state.streak);
    state.lastDay = t; state.hearts = 5; save();
  }
})();

const app = document.getElementById('app');
const allLessons = COURSE.units.flatMap((u) => u.lessons.map((l) => ({ ...l, unit: u })));
const doneCount = () => Object.keys(state.completed).length;
const level = () => Math.floor(state.xp / 100) + 1;
const levelProgress = () => (state.xp % 100) / 100;
const firstUndoneIdx = () => allLessons.findIndex((l) => !state.completed[l.id]);
function isUnlocked(globalIdx) { const f = firstUndoneIdx(); return f === -1 || globalIdx <= f; }

function toast(msg) {
  const el = document.createElement('div'); el.className = 'toast'; el.textContent = msg;
  document.getElementById('toast-root').appendChild(el);
  setTimeout(() => { el.style.opacity = '0'; el.style.transition = 'opacity .3s'; setTimeout(() => el.remove(), 320); }, 2400);
}
function confetti(n = 70) {
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
      setTimeout(() => { toast(`${a.emoji} Достижение: ${a.title}!`); notify('success'); }, 500);
    }
  });
}

// ── Каркас ───────────────────────────────
let tab = 'learn';
function topbar() {
  return `<div class="topbar">
    <div class="logo">КУРС<span>ИЧ</span></div>
    <div class="stat">
      <span class="flame">🔥 <b>${state.streak}</b></span>
      <span class="gem">⭐ <b>${state.xp}</b></span>
      <span class="heart">❤️ <b>${state.hearts}</b></span>
    </div></div>`;
}
function tabbar() {
  const t = (id, icon, label) => `<button class="tab ${tab === id ? 'active' : ''}" data-tab="${id}"><span class="ti">${icon}</span>${label}</button>`;
  return `<nav class="tabbar">${t('learn', '🗺️', 'Учиться')}${t('courses', '📚', 'Курсы')}${t('ach', '🏆', 'Награды')}${t('me', '👤', 'Профиль')}</nav>`;
}
function shell(html) {
  app.innerHTML = topbar() + html + tabbar();
  app.querySelectorAll('[data-tab]').forEach((b) => b.onclick = () => { tab = b.dataset.tab; haptic(); render(); window.scrollTo(0, 0); });
  bindHome();
}

// ── Главная: путь уроков ───────────────────────────────
const OFFSETS = [0, 48, 84, 48, 0, -48, -84, -48];
function renderHome() {
  const hour = new Date().getHours();
  const mood = hour >= 23 || hour < 6 ? 'sleepy' : 'happy';
  const greet = hour >= 23 || hour < 6 ? 'Не спишь? Один короткий урок — и спать!' : doneCount() === 0 ? 'Привет! Я Курсич. Начнём с денег — будет легко и по 5 минут!' : doneCount() >= totalLessons ? 'Ты прошёл весь курс! Загляни в награды, чемпион!' : 'С возвращением! Продолжим с того же места?';
  let globalIdx = -1;
  const unitsHtml = COURSE.units.map((u, ui) => {
    const nodes = u.lessons.map((l, li) => {
      globalIdx++;
      const done = !!state.completed[l.id];
      const unlocked = isUnlocked(globalIdx);
      const current = unlocked && !done;
      const off = OFFSETS[li % OFFSETS.length];
      return `<div class="node-wrap" style="transform:translateX(${off}px);animation-delay:${li * 0.07}s">
        ${current ? '<div class="start-bubble">СТАРТ</div>' : ''}
        <button class="node ${done ? 'done' : ''} ${!unlocked ? 'locked' : ''} ${current ? 'current' : ''}"
          style="--nd:${u.dark};background:${done ? '' : u.color}" data-lesson="${l.id}" ${!unlocked ? 'disabled' : ''}>
          ${done ? '✓' : !unlocked ? '🔒' : l.icon}</button>
        <div class="node-label ${!unlocked ? 'locked' : ''}">${l.title}</div>
        ${done ? `<div class="mini-progress">${Math.round((state.completed[l.id] || 0) * 100)}% · +${l.xp} XP</div>` : `<div class="mini-progress">+${l.xp} XP</div>`}
      </div>`;
    }).join('');
    const uDone = u.lessons.filter((l) => state.completed[l.id]).length;
    return `<div class="unit-banner" style="background:${u.color};animation-delay:${ui * 0.05}s">
        <div class="uicon">${u.icon}</div>
        <div><h2>${u.title}</h2><p>${u.desc}</p></div>
        <div class="ubadge">${uDone}/${u.lessons.length}</div></div>
      <div class="path">${nodes}</div>`;
  }).join('');

  shell(`
    <div class="hero">
      <div class="hero-mascot">${mascotSVG(mood)}</div>
      <div style="z-index:1;flex:1">
        <h1>Финансовая грамотность 2026</h1>
        <div class="speech">${greet}</div>
      </div>
    </div>
    <div class="xpwrap">
      <div class="xpmeta"><span>🏅 Уровень ${level()}</span><span>${state.xp % 100} / 100 XP до следующего</span></div>
      <div class="bar"><i style="width:${Math.max(4, levelProgress() * 100)}%"></i></div>
      <div class="xpmeta" style="margin-top:6px"><span>📘 Пройдено уроков: ${doneCount()} из ${totalLessons}</span><span>обновлено: ${COURSE.updated}</span></div>
    </div>
    ${unitsHtml}
    <div style="height:14px"></div>`);
}
function bindHome() {
  app.querySelectorAll('[data-lesson]').forEach((b) => {
    b.onclick = () => { haptic('medium'); startLesson(b.dataset.lesson); };
  });
  app.querySelectorAll('[data-soon]').forEach((b) => b.onclick = () => toast('🔜 Этот курс уже в работе у Курсича!'));
  const back = app.querySelector('[data-back]');
  if (back) back.onclick = () => { render(); };
}

// ── Курсы ───────────────────────────────
const COURSE_COLORS = ['#58cc02', '#1cb0f6', '#ce82ff', '#ff9600', '#ff4b4b', '#ff86d0'];
function renderCourses() {
  shell(`<div class="screen">
    <h2 class="st">📚 Все курсы</h2>
    <p class="sub">Первый курс уже открыт. Остальные Курсич дописывает — они появятся здесь же, в КУРСИЧЕ.</p>
    <button class="course-card" data-goto-learn style="border-color:#b8e986;background:#f4fde9">
      <div class="ce" style="background:#d7ffb8">${COURSE.emoji}</div>
      <div><h3>${COURSE.title} <span style="color:#46a302">· открыт</span></h3>
      <p>${COURSE.subtitle}. ${totalLessons} уроков · обновлено: ${COURSE.updated}</p>
      <span class="pill">Пройдено: ${doneCount()}/${totalLessons}</span></div><div style="margin-left:auto;font-size:22px">›</div>
    </button>
    ${OTHER_COURSES.map((c, i) => `
    <button class="course-card" data-soon>
      <div class="ce" style="background:${COURSE_COLORS[(i + 1) % COURSE_COLORS.length]}22">${c.emoji}</div>
      <div><h3>${c.title}</h3><p>${c.desc}</p><span class="pill soon">🔜 Скоро · ${c.level}</span></div>
      <div style="margin-left:auto;font-size:20px;opacity:.4">🔒</div>
    </button>`).join('')}
  </div>`);
  const g = app.querySelector('[data-goto-learn]');
  if (g) g.onclick = () => { tab = 'learn'; render(); };
  bindHome();
}

// ── Награды ───────────────────────────────
function renderAch() {
  const got = ACHIEVEMENTS.filter((a) => a.check(state)).length;
  shell(`<div class="screen">
    <h2 class="st">🏆 Награды</h2>
    <p class="sub">Получено ${got} из ${ACHIEVEMENTS.length}. Проходи уроки без ошибок и заходи каждый день — Курсич всё замечает.</p>
    <div class="cardbox" style="padding:4px 16px">
    ${ACHIEVEMENTS.map((a) => { const on = a.check(state); return `
      <div class="ach ${on ? '' : 'off'}"><div class="ae">${a.emoji}</div>
      <div><h4>${a.title}</h4><p>${a.desc}</p></div>
      ${on ? '<div style="margin-left:auto;color:#46a302;font-weight:900">✓</div>' : ''}</div>`; }).join('')}
    </div>
    <div class="cardbox" style="display:flex;gap:14px;align-items:center">
      <div style="width:92px;flex:none">${mascotSVG(state.streak >= 3 ? 'proud' : 'wink')}</div>
      <div><h4 style="margin:0 0 4px;font-size:16px;font-weight:900">${state.streak >= 3 ? 'Серия горит! Так держать!' : 'Заходи завтра — серия вырастет!'}</h4>
      <p style="margin:0;font-size:13px;color:var(--muted);font-weight:700;line-height:1.4">Сейчас: 🔥 ${state.streak} дн. · рекорд: ${state.bestStreak || 0} дн. 5 минут в день сильнее, чем 5 часов раз в месяц.</p></div>
    </div>
  </div>`);
}

// ── Профиль / источники / эмоции ───────────────────────────────
function renderMe() {
  const emo = [['idle', 'Обычный'], ['happy', 'Радость'], ['think', 'Думает'], ['celebrate', 'Праздник'], ['sad', 'Грусть'], ['oops', 'Упс!'], ['surprised', 'Сюрприз'], ['proud', 'Гордость'], ['sleepy', 'Сонный'], ['wink', 'Подмигивает'], ['love', 'Влюблён в XP']];
  shell(`<div class="screen">
    <h2 class="st">👤 Профиль</h2>
    <p class="sub">Твой прогресс хранится на этом устройстве и подхватывается при следующем открытии мини-аппа.</p>
    <div class="cardbox" style="display:flex;gap:14px;align-items:center">
      <div style="width:96px;flex:none">${mascotSVG('love')}</div>
      <div>
        <div style="font-size:19px;font-weight:900">Ученик КУРСИЧА</div>
        <div style="font-weight:800;color:var(--muted);font-size:13px;margin-top:3px">🏅 Уровень ${level()} · ⭐ ${state.xp} XP · ❤️ ${state.hearts}</div>
        <div style="font-weight:800;color:var(--muted);font-size:13px">🔥 Серия ${state.streak} дн. · уроков: ${doneCount()}/${totalLessons}</div>
      </div>
    </div>
    <h2 class="st">🎭 Курсич и его эмоции</h2>
    <p class="sub">Наш герой вместо птицы — кудрявый мальчик в очках. Нарисован полностью в SVG: эмоции меняются по ситуации в уроках.</p>
    <div class="gallery">${emo.map(([e, label]) => `<figure>${mascotSVG(e)}<figcaption>${label}</figcaption></figure>`).join('')}</div>
    <h2 class="st">📖 Источники курса</h2>
    <p class="sub">Курс собран по открытым источникам и актуализирован на ${COURSE.updated}. «Слитые» платные курсы мы не используем — только легальные и проверяемые материалы.</p>
    ${SOURCES.map((s) => `<a class="src" href="${s.url}" target="_blank" rel="noopener"><h4>${s.title} ↗</h4><p>${s.desc}</p></a>`).join('')}
    <div class="disclaimer">⚠️ КУРСИЧ — образовательное приложение, а не персональный финансовый советник. Цифры (ключевая ставка 14% на октябрь 2026, лимиты АСВ, ИИС-3 и ПДС) проверяй перед решениями на cbr.ru, в ФНС и на Госуслугах — правила меняются. Инвестиции всегда несут риск.</div>
    <button class="btn ghost" id="reset-btn" style="margin-top:16px;color:#ff4b4b">Сбросить прогресс</button>
  </div>`);
  document.getElementById('reset-btn').onclick = () => {
    if (confirm('Сбросить весь прогресс, XP и награды?')) { state = defaultState(); localStorage.removeItem(KEY); touchReload(); }
  };
}
function touchReload() { const t = todayStr(); state.lastDay = t; state.streak = 1; state.bestStreak = 1; save(); render(); toast('Прогресс сброшен. Начинаем заново! 🌱'); }

function render() {
  if (tab === 'learn') renderHome();
  else if (tab === 'courses') renderCourses();
  else if (tab === 'ach') renderAch();
  else renderMe();
}

// ── Урок ───────────────────────────────
let L = null; // {lesson, steps, idx, correct, wrong, selected, checked, xpEarned}
function startLesson(lessonId) {
  const lesson = allLessons.find((l) => l.id === lessonId);
  if (!lesson) return;
  const steps = [];
  lesson.cards.forEach((c, i) => { steps.push({ kind: 'card', ...c }); if (lesson.quiz[i]) steps.push({ kind: 'quiz', ...lesson.quiz[i] }); });
  lesson.quiz.slice(lesson.cards.length).forEach((q) => steps.push({ kind: 'quiz', ...q }));
  L = { lesson, steps, idx: 0, correct: 0, totalQ: lesson.quiz.length, selected: null, checked: false, finished: false };
  try { tg?.BackButton?.show(); tg.BackButton.onClick(exitLesson); } catch (e) {}
  renderLesson();
}
function exitLesson() { L = null; try { tg?.BackButton?.hide(); } catch (e) {} render(); window.scrollTo(0, 0); }
function lessonProgress() { return Math.round((L.idx / L.steps.length) * 100); }

function renderLesson() {
  const step = L.steps[L.idx];
  const isCard = step.kind === 'card';
  const moodCard = L.idx === 0 ? 'happy' : 'think';
  app.innerHTML = `
  <div style="max-width:480px;margin:0 auto">
    <div class="lesson-head">
      <button class="xclose" id="lx">✕</button>
      <div class="bar lbar"><i style="width:${lessonProgress()}%;background:linear-gradient(90deg,#58cc02,#8ee000)"></i></div>
      <div class="hearts-live">❤️ ${state.hearts}</div>
    </div>
    <div class="lesson-body" style="padding-bottom:120px">
      ${isCard ? `
        <div class="theory-e">${L.lesson.unit.icon} ${L.lesson.title}</div>
        <div class="mascot-row"><div class="mwrap">${mascotSVG(moodCard)}</div>
          <div class="bubble"><b>${step.t}</b><br>${step.b}</div></div>
        <div style="text-align:center;font-size:44px;animation:bob 2.4s ease-in-out infinite">${step.e}</div>
        <div class="sticky-cta"><button class="btn" id="next">Понятно, дальше</button></div>`
      : `
        <div class="theory-e">❓ Вопрос ${L.steps.slice(0, L.idx + 1).filter((s) => s.kind === 'quiz').length} из ${L.totalQ}</div>
        <h2>${step.q}</h2>
        <div id="opts">
        ${step.type === 'num'
          ? `<input class="numinput" id="numin" type="number" inputmode="numeric" placeholder="Введи число, ₽"><div style="font-size:12.5px;color:var(--muted);font-weight:800;margin:-4px 0 10px">Только цифры, без пробелов и знака ₽</div>`
          : step.options.map((o, i) => `<button class="opt" data-opt="${i}">${o}</button>`).join('')}
        </div>
        <div class="sticky-cta"><button class="btn" id="check" disabled>Проверить</button></div>`}
    </div>
  </div>`;
  document.getElementById('lx').onclick = () => { haptic(); exitLesson(); };
  if (isCard) {
    document.getElementById('next').onclick = () => { haptic(); advance(); };
  } else {
    const checkBtn = document.getElementById('check');
    if (step.type === 'num') {
      const inp = document.getElementById('numin');
      inp.addEventListener('input', () => { L.selected = inp.value.trim(); checkBtn.disabled = L.selected === ''; });
      inp.focus();
    } else {
      app.querySelectorAll('[data-opt]').forEach((b) => b.onclick = () => {
        if (L.checked) return;
        L.selected = Number(b.dataset.opt); haptic();
        app.querySelectorAll('[data-opt]').forEach((x) => x.classList.toggle('sel', x === b));
        checkBtn.disabled = false;
      });
    }
    checkBtn.onclick = checkAnswer;
  }
}
function checkAnswer() {
  const step = L.steps[L.idx];
  let ok;
  if (step.type === 'num') ok = Number(L.selected) === Number(step.answer);
  else ok = L.selected === step.correct;
  L.checked = true;
  if (ok) { L.correct++; notify('success'); } else { state.hearts = Math.max(0, state.hearts - 1); save(); notify('error'); haptic('heavy'); }
  // подсветка
  if (step.type !== 'num') {
    app.querySelectorAll('[data-opt]').forEach((b) => {
      b.disabled = true;
      const i = Number(b.dataset.opt);
      if (i === step.correct) b.classList.add('right');
      else if (i === L.selected) b.classList.add('wrong');
    });
  } else {
    const inp = document.getElementById('numin'); if (inp) { inp.disabled = true; inp.style.borderColor = ok ? '#58cc02' : '#ff4b4b'; inp.style.background = ok ? '#d7ffb8' : '#ffdfe0'; }
  }
  const fb = document.createElement('div');
  fb.className = `feedback ${ok ? 'ok' : 'bad'}`;
  fb.innerHTML = `<div class="fb-mascot">${mascotSVG(ok ? 'celebrate' : 'oops')}</div>
    <h3>${ok ? '🎉 Верно!' : '💡 Не совсем'}</h3><p>${step.explain}</p>
    <button class="btn ${ok ? '' : 'red'}" id="fb-next">${ok ? 'Дальше' : 'Понял, дальше'}</button>`;
  document.body.appendChild(fb);
  document.getElementById('fb-next').onclick = () => { fb.remove(); haptic(); advance(); };
}
function advance() {
  L.idx++;
  if (L.idx >= L.steps.length) return finishLesson();
  L.selected = null; L.checked = false;
  renderLesson(); window.scrollTo(0, 0);
}
function finishLesson() {
  const lesson = L.lesson;
  const acc = L.totalQ ? L.correct / L.totalQ : 1;
  const firstTime = !state.completed[lesson.id];
  const prev = state.completed[lesson.id] || 0;
  state.completed[lesson.id] = Math.max(prev, acc);
  const xpGain = firstTime ? Math.round(lesson.xp * (0.5 + 0.5 * acc)) + (acc === 1 ? 5 : 0) : 2;
  state.xp += xpGain; save();
  const perfect = acc === 1;
  app.innerHTML = `<div style="max-width:480px;margin:0 auto"><div class="result">
    <div class="mwrap">${mascotSVG(perfect ? 'celebrate' : 'proud')}</div>
    <div class="big-xp">+${xpGain} XP</div>
    <h2 style="margin:0;font-size:23px;font-weight:900">${perfect ? 'Идеально! Ни одной ошибки 🏆' : 'Урок пройден!'}</h2>
    <p style="color:var(--muted);font-weight:700;margin:8px 0 0">«${lesson.title}» — в твою копилку знаний.</p>
    <div class="result-stats">
      <div class="rstat"><b style="color:#46a302">${Math.round(acc * 100)}%</b><span>Точность</span></div>
      <div class="rstat"><b style="color:#ff9600">${L.correct}/${L.totalQ}</b><span>Верно</span></div>
      <div class="rstat"><b style="color:#1cb0f6">❤️ ${state.hearts}</b><span>Сердец</span></div>
    </div>
    ${state.hearts === 0 ? '<p style="font-weight:800;color:#c62828">Сердечки закончились — они восстановятся завтра (а учиться можно и без них, Курсич не строгий).</p>' : ''}
    <button class="btn" id="to-path">К карте уроков</button>
    <button class="btn ghost" id="retry" style="margin-top:12px">Пройти ещё раз</button>
  </div></div>`;
  if (perfect || firstTime) confetti(perfect ? 90 : 50);
  notify('success'); checkAchievements();
  document.getElementById('to-path').onclick = () => { haptic(); exitLesson(); };
  document.getElementById('retry').onclick = () => { haptic(); startLesson(lesson.id); };
}

// старт
render();
