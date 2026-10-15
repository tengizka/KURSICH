import './style.css';
import { COURSE, OTHER_COURSES, ACHIEVEMENTS, totalLessons } from './course.js';
import { mascotSVG, mascotFinancierSVG, mascotCurlsSVG } from './mascot.js';
import { UNIT_ART, CAT_ART, LESSON_ART, COURSE_ART, CARD2_ART, GRACE_ART } from './illustrations.js';
import { icon, LESSON_ICON, UNIT_ICON, COURSE_ICON, ACH_ICON } from './icons.js';
import curlsUrl from './assets/curls.png';

// ── Словарик сокращений: пунктирная подсказка-облачко ──
const GLOSSARY = {
  'ИИС-3': { full: 'Индивидуальный инвестиционный счёт (третий тип)', text: 'Особый счёт для инвестиций. Государство возвращает часть налога, но деньги лежат минимум 5 лет.' },
  'ИИС': { full: 'Индивидуальный инвестиционный счёт', text: 'Особый счёт для инвестиций с подарком от государства — возвратом части налога.' },
  'НДФЛ': { full: 'Налог на доходы физических лиц', text: 'Налог, который берут с твоих доходов: зарплаты, продажи и прочего заработка.' },
  'ПСК': { full: 'Полная стоимость кредита', text: 'Сколько отдашь банку сверху на самом деле: проценты, страховки и все сборы вместе.' },
  'БКИ': { full: 'Бюро кредитных историй', text: 'Организации, где хранится досье о твоих кредитах: что брал и как платил.' },
  'БПИФ': { full: 'Биржевой паевой инвестиционный фонд', text: 'Готовая корзина из многих компаний. Покупается на бирже одной сделкой.' },
  'АСВ': { full: 'Агентство по страхованию вкладов', text: 'Через него государство возвращает вклады, если банк закрылся. До 1,4 млн ₽ в одном банке.' },
  'СФР': { full: 'Социальный фонд России', text: 'Государственный фонд, который собирает взносы и платит пенсии.' },
  'НПД': { full: 'Налог на профессиональный доход', text: 'Маленький налог самозанятых: 4% с денег от людей и 6% — от фирм.' },
  'ПДС': { full: 'Программа долгосрочных сбережений', text: 'Копишь долго сам, а государство докладывает до 36 000 ₽ в год.' },
  'ОФЗ': { full: 'Облигации федерального займа', text: 'Государство берёт деньги в долг у людей и платит за это проценты.' },
  'НПФ': { full: 'Негосударственный пенсионный фонд', text: 'Фонд, где копятся деньги на будущую пенсию.' },
  'СБП': { full: 'Система быстрых платежей', text: 'Переводы по номеру телефона. Быстро и обычно без комиссии.' },
  'МФЦ': { full: 'Многофункциональный центр', text: '«Мои документы»: госуслуги вживую, помогают с бумагами бесплатно.' },
  'МФО': { full: 'Микрофинансовая организация', text: 'Даёт маленькие займы «до зарплаты», но очень дорого. Осторожно.' },
  'ГПХ': { full: 'Договор гражданско-правового характера', text: 'Договор на конкретную работу или услугу, когда тебя не берут в штат.' },
  'ОСНО': { full: 'Общая система налогообложения', text: 'Обычные налоги для бизнеса, без льготных режимов.' },
  'ИП': { full: 'Индивидуальный предприниматель', text: 'Человек, который официально открыл своё маленькое дело.' },
  'ЦБ': { full: 'Центральный банк (Банк России)', text: 'Главный банк страны. Следит за банками и ценами и решает, какая будет ключевая ставка.' },
  'QR-код': { full: 'QR — Quick Response, «быстрый отклик»', text: 'Квадратный код: навёл камеру — оплатил или перешёл по ссылке.' },
  'QR': { full: 'QR — Quick Response, «быстрый отклик»', text: 'Квадратный код: навёл камеру — оплатил или перешёл по ссылке. Проверяй, не наклеен ли поверх настоящего.' },
  '2FA': { full: 'Двухфакторная аутентификация', text: 'Двойная защита входа: пароль плюс код из сообщения или приложения.' },
  'СМС': { full: 'Короткое текстовое сообщение', text: 'Банк присылает в нём коды. Код из СМС никому не называй — даже «сотруднику банка».' },
  'ФИО': { full: 'Фамилия, имя, отчество', text: 'Полное имя человека по документам.' },
  'Минфин': { full: 'Министерство финансов', text: 'Ведомство, которое отвечает за деньги государства.' },
};
const ABBR_KEYS = Object.keys(GLOSSARY).sort((a, b) => b.length - a.length).map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
const ABBR_RE = new RegExp('(^|[^А-Яа-яЁёA-Za-z0-9])(' + ABBR_KEYS.join('|') + ')(?![А-Яа-яЁёA-Za-z0-9])', 'g');
let lessonSeen = null; // термины, уже подсвеченные в этом уроке
function seenBefore(key) { if (!lessonSeen) return false; if (lessonSeen.has(key)) return true; lessonSeen.add(key); return false; }
function abbr(t) {
  const first = String(t).replace(ABBR_RE, (m, p1, term) => (seenBefore(term) ? p1 + '<span class="abbr seen" data-t="' + term + '" role="button" aria-label="Что значит ' + term + '">' + term + '</span>' : p1 + '<span class="abbr" data-t="' + term + '" role="button" aria-label="Что значит ' + term + '">' + term + '</span>'));
  return first.split(/(<[^>]+>)/g).map((part) => (part.startsWith('<') ? part : part.replace(TERM_RE, (m, p1, word) => p1 + termSpan(word)))).join('');
}

// ── Сложные слова: тот же пунктир и облачко ──
const TERMS = [
  { name: 'Ключевая ставка', pat: 'ключев[а-яёь]* ставк[а-яёь]*', full: 'Главная ставка страны', text: 'Её устанавливает ЦБ. От неё зависят проценты по вкладам и кредитам: ставка выше — кредиты дороже, вклады выгоднее.' },
  { name: 'Сложный процент', pat: 'сложн[а-яёь]* процент[а-яёь]*', full: 'Проценты на проценты', text: 'Заработанные проценты тоже начинают приносить доход. Как снежный ком: со временем растёт всё быстрее.' },
  { name: 'Кредитная история', pat: 'кредитн[а-яёь]* истори[а-яёь]*', full: 'Досье о твоих кредитах', text: 'Запись о том, какие кредиты ты брал и вовремя ли платил. Хорошая история — банки доверяют тебе больше.' },
  { name: 'Кредитное плечо', pat: 'кредитн[а-яёь]* плеч[а-яёь]*', full: 'Вложения на занятые деньги', text: 'Инвестируешь не только свои деньги, но и взятые в долг. Ошибка бьёт вдвое больнее — новичкам так нельзя.' },
  { name: 'Финансовая пирамида', pat: 'финансов[а-яёь]* пирамид[а-яёь]*', full: 'Обман, а не заработок', text: 'Старым участникам платят из денег новых людей. Новые закончились — всё рухнуло, последние теряют деньги.' },
  { name: 'Подушка безопасности', pat: 'финансов[а-яёь]* подушк[а-яёь]*', full: 'Запас денег на чёрный день', text: 'Выручит, если сломался телефон или пропал доход. Обычно это траты на 3–6 месяцев жизни, лежат на отдельном вкладе.' },
  { name: 'Подушка безопасности', pat: 'подушк[а-яёь]* безопасност[а-яёь]*', full: 'Запас денег на чёрный день', text: 'Выручит, если сломался телефон или пропал доход. Обычно это траты на 3–6 месяцев жизни, лежат на отдельном вкладе.' },
  { name: 'Налоговый вычет', pat: 'налогов[а-яёь]* вычет[а-яёь]*', full: 'Возврат части уплаченного налога', text: 'Государство возвращает часть налога за лечение, учёбу, спорт, жильё и инвестиции. Чеки сохраняй!' },
  { name: 'Период охлаждения', pat: 'период[а-яёь]* охлаждени[а-яёь]*', full: 'Пауза перед большим кредитом', text: 'Кредит выдают не сразу, а после ожидания. Это время спокойно подумать головой, а не хватать на эмоциях.' },
  { name: 'Цифровой рубль', pat: 'цифров[а-яёь]* руб[а-яёь]*', full: 'Третья форма рубля', text: 'Те же рубли, только в электронном кошельке государства. Не криптовалюта, открывается только по твоему желанию.' },
  { name: 'Грейс-период', pat: 'грейс-период[а-яёь]*', full: 'Льготные дни по кредитке', text: 'Время, когда можно вернуть банку деньги за покупки и не платить проценты. Обычно около 50 дней.' },
  { name: 'Диверсификация', pat: 'диверсификаци[а-яёь]*', full: 'Правило «не клади всё в одно место»', text: 'Деньги делят между разными вариантами: вклад, облигации, фонды. Упало одно — остальное держится.' },
  { name: 'Рефинансирование', pat: 'рефинансир[а-яёь]*', full: 'Замена старого кредита новым, дешевле', text: 'Берёшь кредит под меньший процент и закрываешь им старый дорогой. Платить каждый месяц становится легче.' },
  { name: 'Софинансирование', pat: 'софинансир[а-яёь]*', full: 'Государство докладывает к твоим деньгам', text: 'Кладёшь свои — государство добавляет сверху. Так работает ПДС: до 36 000 ₽ в год.' },
  { name: 'Криптовалюта', pat: 'криптовалют[а-яёь]*', full: 'Цифровые деньги без банка и государства', text: 'Их цену никто не гарантирует: может резко вырасти и так же резко упасть. Это не вклад и не рубли.' },
  { name: 'Облигация', pat: 'облигаци[а-яёь]*', full: 'Долговая бумага', text: 'Ты даёшь деньги в долг государству или компании. Тебе платят проценты, а в срок возвращают всю сумму.' },
  { name: 'Инфляция', pat: 'инфляци[а-яёь]*', full: 'Рост цен со временем', text: 'На те же 100 ₽ постепенно покупаешь меньше товаров. Деньги без дела от инфляции потихоньку «худеют».' },
  { name: 'Доходность', pat: 'доходност[а-яёь]*', full: 'Сколько заработали вложения', text: 'Показывают в процентах за год. Вложил 100 ₽ и заработал 13 ₽ за год — доходность 13%.' },
  { name: 'Самозапрет', pat: 'самозапрет[а-яёь]*', full: 'Твой личный запрет на кредиты', text: 'На Госуслугах запрещаешь выдавать кредиты на своё имя. Тогда их не оформят даже мошенники с твоими данными.' },
  { name: 'Котировки', pat: 'котиров[а-яёь]*', full: 'Цены на бирже прямо сейчас', text: 'Как ценники, которые всё время меняются: почём в эту минуту акция или валюта.' },
  { name: 'Просадка', pat: 'просад[а-яёь]*', full: 'Временное падение цены вложений', text: 'Акции подешевели на время. Если не продавать в этот момент, убыток остаётся только «на бумаге».' },
  { name: 'Дипфейк', pat: 'дипфейк[а-яёь]*', full: 'Подделка, сделанная программой', text: 'Фальшивый голос или видео: «мама» по телефону может оказаться программой. Защита — семейное кодовое слово и перезвон.' },
  { name: 'Квишинг', pat: 'квишинг[а-яёь]*', full: 'Обман с поддельными QR-кодами', text: 'Мошенники наклеивают свой код поверх настоящего — и деньги уходят им, а не магазину.' },
  { name: 'Майнинг', pat: 'майнинг[а-яёь]*|майнить', full: 'Добыча криптовалюты компьютерами', text: 'Компьютеры решают задачки и получают за это цифровые монеты. У обычного рубля майнинга нет.' },
  { name: 'Эмитент', pat: 'эмитент[а-яёь]*', full: 'Тот, кто выпустил бумагу', text: 'Государство или компания, чьи акции или облигации ты купил. Эмитент обещает платить проценты и вернуть деньги.' },
  { name: 'Кэшбэк', pat: 'кэшбэк[а-яёь]*', full: 'Возврат части денег за покупки', text: 'Купил на 100 ₽ — банк вернул обратно, например, 5 ₽. Приятно, но покупать лишнее ради кэшбэка невыгодно.' },
  { name: 'Брокер', pat: 'брокер[а-яёь]*', full: 'Помощник для покупок на бирже', text: 'Самому на биржу нельзя — нужен брокер, компания с разрешением ЦБ. Через её приложение покупают акции и облигации.' },
  { name: 'Акция', pat: 'акци[а-яёь]*', full: 'Кусочек компании', text: 'Купил акцию — стал владельцем маленького кусочка фирмы. Фирма растёт — дорожает и кусочек, падает — дешевеет.' },
  { name: 'Портфель', pat: 'портфел[а-яёь]*', full: 'Все твои вложения вместе', text: 'Вклад, облигации и фонды одним словом. Как рюкзак: важен результат в целом, а не один предмет внутри.' },
  { name: 'Лицензия', pat: 'лицензи[а-яёь]*', full: 'Официальное разрешение ЦБ', text: 'Документ, который разрешает компании работать с деньгами людей. Нет лицензии — доверять ей деньги нельзя.' },
  { name: 'Комиссия', pat: 'комисси[а-яёь]*', full: 'Плата за услугу', text: 'Сколько банк или брокер берёт себе за операцию. Маленькие комиссии за годы съедают заметную часть дохода.' },
  { name: 'Горизонт', pat: 'горизонт[а-яёь]*', full: 'Срок, на который кладёшь деньги', text: 'Горизонт 10 лет — деньги не понадобятся 10 лет. Чем дольше срок, тем спокойнее переживать временные падения.' },
  { name: 'Купоны', pat: 'купон[а-яёь]*', full: 'Проценты по облигации', text: 'Регулярные выплаты тому, кто дал деньги в долг через облигацию. Название осталось от бумажных времён.' },
  { name: 'Номинал', pat: 'номинал[а-яёь]*', full: 'Сумма, которую вернут в конце', text: 'По облигации в срок возвращают именно номинал — обычно 1 000 ₽ за одну бумагу.' },
  { name: 'Актив', pat: 'актив(а|ы|ов|ами|е|у)?', full: 'То, во что вложены деньги', text: 'Вклад, акция, облигация — всё это активы. Они могут дорожать, дешеветь и приносить доход.' },
  { name: 'Бюджет', pat: 'бюджет[а-яёь]*', full: 'План денег', text: 'Сколько денег придёт и на что они уйдут. С планом деньги перестают утекать неизвестно куда.' },
  { name: 'Вклад', pat: 'вклад[а-яёь]*', full: 'Деньги в банке под процент', text: 'Ты даёшь банку свои деньги на время, а банк платит тебе за это проценты. До 1,4 млн ₽ защищает государство.' },
  { name: 'Вычет', pat: 'вычет[а-яёь]*', full: 'Возврат части уплаченного налога', text: 'Государство возвращает часть налога за лечение, учёбу, спорт, жильё и инвестиции. Чеки сохраняй!' },
  { name: 'Подушка безопасности', pat: 'подушк[а-яёь]*', full: 'Запас денег на чёрный день', text: 'Выручит, если сломался телефон или пропал доход. Обычно это траты на 3–6 месяцев жизни, лежат на отдельном вкладе.' },
];
const TERM_MAP = {};
TERMS.forEach((x) => { TERM_MAP[x.name] = { full: x.full, text: x.text }; });
const TERM_RE = new RegExp('(^|[^А-Яа-яЁёA-Za-z0-9])(' + TERMS.map((x) => x.pat).join('|') + ')(?![А-Яа-яЁёA-Za-z0-9])', 'gi');
const TERM_TESTS = TERMS.map((x) => ({ name: x.name, re: new RegExp('^(?:' + x.pat + ')$', 'i') }));
function termSpan(word) {
  const hit = TERM_TESTS.find((x) => x.re.test(word));
  if (!hit) return word;
  if (seenBefore(hit.name)) return '<span class="abbr seen" data-t="' + hit.name + '" role="button" aria-label="Что значит: ' + hit.name + '">' + word + '</span>';
  return '<span class="abbr" data-t="' + hit.name + '" role="button" aria-label="Что значит: ' + hit.name + '">' + word + '</span>';
}
let abbrPop = null;
function hideAbbr() { if (abbrPop) { abbrPop.remove(); abbrPop = null; } }
function showAbbr(el) {
  const term = el.dataset.t; const g = GLOSSARY[term] || TERM_MAP[term]; if (!g) return;
  const same = abbrPop && abbrPop.dataset.term === term;
  hideAbbr(); if (same) return;
  abbrPop = document.createElement('div');
  abbrPop.id = 'abbr-pop'; abbrPop.dataset.term = term;
  abbrPop.innerHTML = '<div class="abbr-pop-t">' + term + '</div><div class="abbr-pop-f">' + g.full + '</div><p>' + g.text + '</p>';
  document.body.appendChild(abbrPop);
  const r = el.getBoundingClientRect();
  const w = Math.min(300, window.innerWidth - 24);
  abbrPop.style.width = w + 'px';
  const h = abbrPop.offsetHeight;
  const left = Math.min(Math.max(12, r.left + r.width / 2 - w / 2), window.innerWidth - w - 12);
  let top = r.top - h - 14;
  if (top < 76) { top = r.bottom + 14; abbrPop.classList.add('below'); }
  abbrPop.style.left = left + 'px'; abbrPop.style.top = top + 'px';
  abbrPop.style.setProperty('--tail', Math.min(Math.max(20, r.left + r.width / 2 - left - 8), w - 36) + 'px');
  requestAnimationFrame(() => abbrPop && abbrPop.classList.add('show'));
  try { sfx('pop'); } catch (e) {}
}
document.addEventListener('click', (e) => {
  const a = e.target.closest && e.target.closest('.abbr');
  if (a) { e.preventDefault(); e.stopPropagation(); showAbbr(a); return; }
  if (abbrPop && !(e.target.closest && e.target.closest('#abbr-pop'))) hideAbbr();
}, true);
window.addEventListener('scroll', hideAbbr, { capture: true, passive: true });


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
// Видимое нажатие: класс ставится в момент касания, до срабатывания click
document.addEventListener('pointerdown', (e) => {
  const b = e.target.closest('button');
  if (!b || b.disabled) return;
  b.classList.add('is-pressed');
  setTimeout(() => b.classList.remove('is-pressed'), 240);
}, { passive: true });
['pointerup', 'pointercancel', 'pointerleave'].forEach((ev) =>
  document.addEventListener(ev, (e) => {
    const b = e.target.closest && e.target.closest('button');
    if (b) setTimeout(() => b.classList.remove('is-pressed'), 90);
  }, { passive: true }));

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
// ── Звуки: синтезатор, без файлов. Работает, если звук включён в настройках ──
let audioCtx = null;
function tone(freq, delay = 0, dur = 0.16, type = 'sine', vol = 0.09, slideTo = null) {
  const t0 = audioCtx.currentTime + delay;
  const o = audioCtx.createOscillator(), g = audioCtx.createGain();
  o.type = type; o.frequency.setValueAtTime(freq, t0);
  if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, t0 + dur);
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(vol, t0 + 0.015);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  o.connect(g); g.connect(audioCtx.destination);
  o.start(t0); o.stop(t0 + dur + 0.05);
}
function sfx(name) {
  if (!state.sound) return;
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    if (name === 'click') { tone(620, 0, 0.07, 'triangle', 0.05); }
    else if (name === 'pop') { tone(420, 0, 0.1, 'sine', 0.08, 760); }
    else if (name === 'correct') { tone(659, 0, 0.14, 'sine', 0.1); tone(880, 0.09, 0.22, 'sine', 0.1); tone(1318, 0.09, 0.18, 'sine', 0.035); }
    else if (name === 'wrong') { tone(233, 0, 0.16, 'triangle', 0.07); tone(174, 0.1, 0.24, 'triangle', 0.06); }
    else if (name === 'complete') {
      [523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.11, 0.24, 'sine', 0.1));
      tone(1319, 0.46, 0.42, 'sine', 0.09); tone(659, 0.46, 0.42, 'sine', 0.05); tone(784, 0.46, 0.42, 'sine', 0.05);
    }
    else if (name === 'open') { tone(392, 0, 0.1, 'sine', 0.06, 523); tone(523, 0.07, 0.14, 'sine', 0.06, 659); }
  } catch (e) {}
}
function beep(ok) { sfx(ok ? 'correct' : 'wrong'); }
// звук по умолчанию включён один раз (дальше — как выставит пользователь)
if (!state.soundSeen) { state.sound = true; state.soundSeen = true; save(); }

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
  hideAbbr();
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
        <div class="intro-mascot curls"><img class="curls-img" src="${curlsUrl}" alt=""></div>
        <div class="intro-word">${letters}</div>
      </div>
      <div class="intro-made">made tengizka</div>
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
      <div class="splash-mascot curls"><img class="curls-img" src="${curlsUrl}" alt=""></div>
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
  const act = (id) => (appTab === id || (id === 'profile' && (appTab === 'ach' || appTab === 'settings' || appTab === 'dict')) ? 'active' : '');
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
  else if (appTab === 'dict') html = dictHtml();
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
      <div style="font-weight:800;color:var(--muted);font-size:13px">Уроков пройдено: ${doneCount()} из ${totalLessons}</div></div>
    </div>
    <div class="cardbox" style="padding:4px 16px">
      <button class="menu-row" id="go-dict"><span class="mi" style="background:#ddf4ff;color:#1899d6">${icon('book',22)}</span>Словарь терминов<span style="margin-left:auto;font-weight:900;color:var(--muted);font-size:13px">если забыл слово</span><span class="chev">›</span></button>
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

function dictHtml() {
  const items = [
    ...Object.entries(GLOSSARY).filter(([k]) => k !== 'QR').map(([name, g]) => ({ name, full: g.full, text: g.text })),
    ...Object.entries(TERM_MAP).map(([name, g]) => ({ name, full: g.full, text: g.text })),
  ].sort((x, y) => x.name.localeCompare(y.name, 'ru'));
  return `<div class="screen">
    <button class="menu-row" data-back-profile style="border:0;padding:10px 0 0"><span style="font-size:20px">‹</span> Профиль</button>
    <h2 class="st">Словарь</h2>
    <p class="sub" style="margin-top:-6px">Забыл слово из урока — найди его здесь. В самих уроках слова подчёркиваются только при первой встрече.</p>
    <input class="name-input dict-search" id="dict-search" type="text" placeholder="Найти слово…" autocomplete="off">
    <div class="cardbox" style="padding:4px 16px;margin-top:14px">
      ${items.map((it) => `<div class="dict-item" data-s="${(it.name + ' ' + it.full + ' ' + it.text).toLowerCase()}"><div class="dict-term">${it.name}</div><div class="dict-full">${it.full}</div><p>${it.text}</p></div>`).join('')}
      <div class="dict-item" id="dict-empty" style="display:none;text-align:center;color:var(--muted);font-weight:800">Такого слова пока нет 🤔</div>
    </div></div>`;
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
  const goDict = document.getElementById('go-dict'); if (goDict) goDict.onclick = () => { appTab = 'dict'; haptic(); renderApp(); resetScroll(); };
  const ds = document.getElementById('dict-search');
  if (ds) ds.addEventListener('input', () => {
    const v = ds.value.trim().toLowerCase(); let any = false;
    app.querySelectorAll('.dict-item[data-s]').forEach((it) => { const show = !v || it.dataset.s.includes(v); it.style.display = show ? '' : 'none'; if (show) any = true; });
    const e = document.getElementById('dict-empty'); if (e) e.style.display = any ? 'none' : '';
  });
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
  steps.forEach((st, i) => { st.uid = i; });
  L = { lesson, steps, idx: 0, correct: 0, totalQ: lesson.quiz.length, theoryN: lesson.cards.length, selected: null, checked: false, pendingRepeat: false };
  lessonSeen = new Set();
  sfx('open');
  try { tg?.BackButton?.show(); tg.BackButton.onClick(exitLesson); } catch (e) {}
  renderLesson();
}
function exitLesson() { L = null; lessonSeen = null; try { tg?.BackButton?.hide(); } catch (e) {} appTab = 'courses'; inPath = true; scrollCurrent = true; render(); }

function renderLesson() {
  hideAbbr();
  app.classList.add('in-lesson');
  const step = L.steps[L.idx];
  const progress = Math.round((L.idx / L.steps.length) * 100);
  let body = '';
  if (step.kind === 'theory') {
    const n = L.steps.slice(0, L.idx + 1).filter((s) => s.kind === 'theory').length;
    body = `<span class="phase-tag theory">${icon('book',16)} Сначала разберёмся · ${n} из ${L.theoryN}</span>
      <div class="mascot-row"><div class="mwrap">${mascotSVG('idle')}</div>
        <div class="bubble"><b>${abbr(step.t)}</b><br>${abbr(step.b)}</div></div>
      <div class="theory-visual">${step.ci >= 2 ? GRACE_ART : ((step.ci === 1 && CARD2_ART[L.lesson.id]) || LESSON_ART[L.lesson.id] || '')}</div>
      <div class="sticky-cta"><button class="btn" id="next">Понятно</button></div>`;
  } else if (step.kind === 'quiz') {
    const n = L.steps.slice(0, L.idx + 1).filter((s) => s.kind === 'quiz' && !s.isRepeat).length;
    body = (step.isRepeat
      ? `<span class="phase-tag recap">${icon('history',16)} Повторим — было с ошибкой</span>`
      : `<span class="phase-tag">${icon('help',16)} Вопрос ${n} из ${L.totalQ}</span>`)
      + `<div class="mascot-row" style="align-items:center"><div class="q-mascot">${mascotSVG('idle')}</div>
        <div class="bubble" style="font-size:17px"><b>${abbr(step.q)}</b></div></div>
      <div id="opts">${step.options.map((o, i) => `<button class="opt" data-opt="${i}">${abbr(o)}</button>`).join('')}</div>
      <div class="sticky-cta"><button class="btn" id="check" disabled>Проверить</button></div>`;
  } else { // recap
    body = `<span class="phase-tag recap">${icon('target',16)} Закрепим</span>
      <h2 style="margin-top:14px">Главное из урока</h2>
      ${L.lesson.cards.map((c, i) => { const parts = c.b.split(/(?<=\.)\s/).filter(Boolean); const short = parts.length > 1 ? parts[1] : parts[0]; return `<div class="recap-item"><span class="rn">${i + 1}</span><div><b>${abbr(c.t)}</b><p>${abbr(short)}</p></div></div>`; }).join('')}
      <div class="sticky-cta"><button class="btn" id="next">Готово</button></div>`;
  }
  app.innerHTML = `<div class="lesson-shell">
    <div class="lesson-head"><button class="xclose" id="lx">✕</button><button class="lback" id="lback" ${L.idx === 0 ? 'disabled' : ''} aria-label="Назад">‹</button>
      <div class="bar lbar"><i style="width:${progress}%;background:linear-gradient(90deg,#58cc02,#8ee000)"></i></div>
      <button class="hearts-live" data-hearts>${icon('heart',19)} ∞</button></div>
    <div class="lesson-body slide-in" style="padding-bottom:120px">${body}</div></div>`;
  document.getElementById('lx').onclick = () => { haptic(); exitLesson(); };
  const lb = document.getElementById('lback');
  if (lb) lb.onclick = () => {
    if (L.idx === 0) return;
    document.querySelectorAll('.feedback').forEach((e) => e.remove());
    haptic(); sfx('click');
    L.idx--; L.checked = false;
    const prev = L.steps[L.idx];
    L.selected = prev && prev.kind === 'quiz' ? (prev.savedSelected ?? null) : null;
    renderLesson();
  };
  app.querySelectorAll('[data-hearts]').forEach((b) => b.onclick = () => { haptic(); showHeartsModal(); });
  const next = document.getElementById('next');
  if (next) next.onclick = () => { haptic(); sfx('pop'); advance(); };
  if (step.kind === 'quiz') {
    const checkBtn = document.getElementById('check');
    if (L.selected !== null && L.selected !== undefined) {
      checkBtn.disabled = false;
      app.querySelectorAll('[data-opt]').forEach((x) => x.classList.toggle('sel', Number(x.dataset.opt) === L.selected));
    }
    app.querySelectorAll('[data-opt]').forEach((b) => b.onclick = () => {
      if (L.checked) return;
      L.selected = Number(b.dataset.opt); step.savedSelected = L.selected; haptic(); sfx('click');
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
  if (!step.counted) {
    step.counted = true;
    if (ok) L.correct++;
  }
  L.pendingRepeat = !ok;
  if (ok) { notify('success'); beep(true); } else { notify('error'); haptic('heavy'); beep(false); }
  app.querySelectorAll('[data-opt]').forEach((b) => {
    b.disabled = true; const i = Number(b.dataset.opt);
    if (i === step.correct) b.classList.add('right'); else if (i === L.selected) b.classList.add('wrong');
  });
  const fb = document.createElement('div');
  fb.className = `feedback ${ok ? 'ok' : 'bad'}`;
  fb.innerHTML = `<div class="fb-mascot" style="animation:pop .45s ease">${mascotSVG(ok ? 'happy' : 'oops')}</div>
    <h3>${ok ? 'Верно!' : 'Почти получилось'}</h3><p>${abbr(step.explain)}</p>
    <button class="btn ${ok ? '' : 'red'}" id="fb-next">Дальше</button>`;
  document.body.appendChild(fb);
  document.getElementById('fb-next').onclick = () => {
    fb.remove(); haptic(); sfx('pop');
    if (L.pendingRepeat) {
      L.pendingRepeat = false;
      const recapIdx = L.steps.findIndex((x, i2) => x.kind === 'recap' && i2 > L.idx);
      const copy = { ...step, isRepeat: true, counted: true, savedSelected: null };
      if (recapIdx === -1) L.steps.push(copy); else L.steps.splice(recapIdx, 0, copy);
    }
    advance();
  };
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
  notify('success'); sfx('complete'); checkAchievements();
  document.getElementById('to-path').onclick = () => { haptic(); exitLesson(); };
  document.getElementById('retry').onclick = () => { haptic(); startLesson(lesson.id); };
}

render();
