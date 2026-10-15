import './style.css';
import { COURSE, OTHER_COURSES, ACHIEVEMENTS, totalLessons } from './course.js';
import { EXTRA_COURSES } from './courses2.js';
import { EXTRA_COURSES_2 } from './courses3.js';
import { mascotSVG, mascotFinancierSVG, mascotCurlsSVG, mascotTopicSVG } from './mascot.js';
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
const NEW_TERMS = [
  { name: 'Алгоритм', pat: 'алгоритм[а-яёь]*', cat: 'Технологии и ИИ', full: 'Пошаговый рецепт для машины', text: 'Точный порядок шагов, по которому компьютер решает задачу. Лента соцсетей — тоже алгоритм: он подбирает, что тебе показать.' },
  { name: 'Нейросеть', pat: 'нейросет[а-яёь]*', cat: 'Технологии и ИИ', full: 'Программа, которая учится на примерах', text: 'Ей показывают миллионы примеров — и она начинает продолжать текст, рисовать и отвечать. Не думает, а предсказывает вероятное.' },
  { name: 'Промпт', pat: 'промпт[а-яёь]*', cat: 'Технологии и ИИ', full: 'Запрос к нейросети', text: 'Как ты сформулировал задание — такой и результат. Роль, задача, формат и пример в запросе творят чудеса.' },
  { name: 'ИИ-агент', pat: 'агент[а-яёь]*', cat: 'Технологии и ИИ', full: 'Нейросеть, которая сама делает шаги', text: 'Ему дают цель, а он планирует и выполняет действия программами. Решения и отправки — только после проверки человеком.' },
  { name: 'Галлюцинация ИИ', pat: 'галлюцинаци[а-яёь]*', cat: 'Технологии и ИИ', full: 'Уверенная выдумка нейросети', text: 'Модель гладко выдумывает несуществующие факты, цитаты и даты. Лечится только проверкой по источникам.' },
  { name: 'Блокчейн', pat: 'блокчейн[а-яёь]*', cat: 'Технологии и ИИ', full: 'Цепочка записей у тысяч компьютеров', text: 'Общий журнал операций, который хранят все участники сразу. Поэтому записи в криптовалюте нельзя подделать задним числом.' },
  { name: 'Seed-фраза', pat: 'seed-фраз[а-яёь]*', cat: 'Безопасность', full: 'Главный ключ от криптокошелька', text: '12–24 слова, которые открывают полный доступ к деньгам. Кто знает фразу — владеет кошельком. Никому её не показывают.' },
  { name: 'Фишинг', pat: 'фишинг[а-яёь]*', cat: 'Безопасность', full: 'Поддельные письма и сайты', text: 'Притворяются банком или сервисом и выманивают пароль или код. Признаки: срочность и ссылка не на официальный адрес.' },
  { name: 'Скоринг', pat: 'скоринг[а-яёь]*', cat: 'Технологии и ИИ', full: 'Автоматическая оценка надёжности', text: 'Алгоритм банка по данным присваивает балл: дадут ли кредит и под какой процент. Хорошая история платежей балл поднимает.' },
  { name: 'Ипотека', pat: 'ипотек[а-яёь]*', cat: 'Кредиты и жильё', full: 'Кредит на покупку жилья', text: 'Банк даёт большую часть цены квартиры, ты возвращаешь годами. Пока долг не закрыт, квартира в залоге у банка.' },
  { name: 'Первоначальный взнос', pat: 'первоначальн[а-яёь]* взнос[а-яёь]*', cat: 'Кредиты и жильё', full: 'Твоя часть цены жилья сразу', text: 'Деньги, которые платишь продавцу из своих при покупке в ипотеку. Больше взнос — меньше кредит и переплата.' },
  { name: 'Резюме', pat: 'резюме', cat: 'Работа и продажи', full: 'Короткий рассказ о твоём опыте', text: 'Один экран: кто ты, что умеешь и какие результаты уже делал. Рекрутер смотрит на него секунд десять — пиши цифрами.' },
  { name: 'Рекрутер', pat: 'рекрутер[а-яёь]*', cat: 'Работа и продажи', full: 'Человек, который ищет сотрудников', text: 'Читает резюме пачками и приглашает на собеседования. Его задача — быстро понять, подходишь ли ты на роль.' },
  { name: 'Оффер', pat: 'оффер[а-яёь]*', cat: 'Работа и продажи', full: 'Конкретное предложение клиенту', text: 'Что, для кого, какой результат и за сколько — одной фразой. «Лендинг для психологов за 7 дней» сильнее, чем «делаю сайты».' },
  { name: 'Возражение', pat: 'возражени[а-яёь]*', cat: 'Работа и продажи', full: 'Сомнение клиента, а не отказ', text: '«Дорого» обычно значит «не вижу ценности». Возражение лечат вопросом и конкретикой, а не спором.' },
  { name: 'Переговоры', pat: 'переговор[а-яёь]*', cat: 'Работа и продажи', full: 'Разговор, где ищут решение для обеих сторон', text: 'За позициями прячутся интересы. Договориться о них — значит оставить обе стороны довольными сделкой.' },
  { name: 'Фриланс', pat: 'фриланс[а-яёь]*', cat: 'Работа и продажи', full: 'Работа проектами на разных заказчиков', text: 'Без одного начальника: сам ищешь заказы, сам отвечаешь за сроки и оплату. Свобода в обмен на самодисциплину.' },
  { name: 'Маркетплейс', pat: 'маркетплейс[а-яёь]*', cat: 'Работа и продажи', full: 'Большой онлайн-рынок', text: 'Площадка, где продают тысячи продавцов: WB, Ozon и другие. Покупатель выбирает по фото, цене, рейтингу и отзывам.' },
  { name: 'Юнит-экономика', pat: 'юнит-экономик[а-яёь]*', cat: 'Работа и продажи', full: 'Математика одного товара или заказа', text: 'Цена минус все расходы на единицу: себестоимость, комиссии, логистика, возвраты. Остаток и есть настоящая прибыль.' },
  { name: 'Монетизация', pat: 'монетизаци[а-яёь]*', cat: 'Работа и продажи', full: 'Превращение внимания в деньги', text: 'Услуги, продукты, реклама и партнёрки. Маленькая лояльная аудитория может зарабатывать больше огромной случайной.' },
  { name: 'Личный бренд', pat: 'личн[а-яёь]* бренд[а-яёь]*', cat: 'Работа и продажи', full: 'Что о тебе знают и думают люди', text: 'Тема, стиль и репутация в одном. Бренд — это упакованная правда о тебе, а не выдуманный персонаж.' },
  { name: 'Дофамин', pat: 'дофамин[а-яёь]*', cat: 'Деньги и мозг', full: '«Гормон предвкушения»', text: 'Мозг вспыхивает от ожидания покупки сильнее, чем от самой вещи. Поэтому корзина радует, а полка — уже нет.' },
  { name: 'Прокрастинация', pat: 'прокрастинаци[а-яёь]*', cat: 'Учёба и творчество', full: 'Привычка откладывать на потом', text: 'Не лень, а защита от страшного и непонятного. Лечится первым шагом на пять минут и убранным телефоном.' },
  { name: 'Волатильность', pat: 'волатильност[а-яёь]*', cat: 'Инвестиции', full: 'Как сильно прыгает цена', text: 'Криптовалюта волатильна: плюс 30% за неделю и минус 50% за месяц для неё норма. Вклад не волатилен вообще.' },
  { name: 'Хук', pat: 'хук[а-яёь]*', cat: 'Учёба и творчество', full: 'Крючок в первые секунды видео', text: 'Фраза или кадр, которые обещают пользу и останавливают палец. Без хука видео листают, не досмотрев.' },
  { name: 'Субтитры', pat: 'субтитр[а-яёь]*', cat: 'Учёба и творчество', full: 'Текст речи прямо на видео', text: 'Половина зрителей смотрит без звука. Субтитры удерживают тех, кто иначе просто пролистал бы.' },
  { name: 'Силуэт', pat: 'силуэт[а-яёь]*', cat: 'Учёба и творчество', full: 'Очертание предмета одной тенью', text: 'Хороший персонаж или логотип узнаётся по силуэту без деталей. Сначала форма — потом украшения.' },
  { name: 'Конфликт', pat: 'конфликт[а-яёь]*', cat: 'Учёба и творчество', full: 'Столкновение желания и препятствия', text: 'Двигатель истории и переговоров. Бывает с людьми, обстоятельствами и с самим собой.' },
];
TERMS.push(...NEW_TERMS);
const TERM_MAP = {};
TERMS.forEach((x) => { TERM_MAP[x.name] = { full: x.full, text: x.text, cat: x.cat }; });
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
const defaultState = () => ({ xp: 0, hearts: 5, streak: 0, bestStreak: 0, lastDay: null, completed: {}, seenAch: [], name: '', onboarded: false, sound: false, dark: false, outfit: 'none' });
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
const ALL_COURSES = [{ ...COURSE, cat: 'finance' }, ...EXTRA_COURSES, ...EXTRA_COURSES_2];
const allLessons = ALL_COURSES.flatMap((co) => co.units.flatMap((u) => u.lessons.map((l) => ({ ...l, unit: u, course: co }))));
const courseLessons = (co) => co.units.flatMap((u) => u.lessons);
const courseDone = (co) => courseLessons(co).filter((l) => state.completed[l.id]).length;
let curCourse = ALL_COURSES[0];
const doneCount = () => allLessons.filter((l) => state.completed[l.id]).length;
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
  ACHIEVEMENTS.forEach((a, i) => {
    if (!state.seenAch.includes(a.id) && a.check(state)) {
      state.seenAch.push(a.id); save();
      setTimeout(() => showAchPop(a), 600 + i * 2400);
    }
  });
}
function showAchPop(a) {
  document.querySelectorAll('.ach-pop').forEach((e) => e.remove());
  const el = document.createElement('div');
  el.className = 'ach-pop';
  el.innerHTML = `<div class="ach-pop-ic">${icon(ACH_ICON[a.id] || 'trophy', 38)}</div>
    <div class="ach-pop-text"><span>Достижение открыто</span><b>${a.title}</b><p>${a.desc}</p></div>
    <div class="ach-pop-m">${mascotSVG('celebrate', state.outfit)}</div>`;
  document.body.appendChild(el);
  sfx('complete'); notify('success'); haptic('medium'); confetti(26);
  const kill = () => { el.classList.add('out'); setTimeout(() => el.remove(), 380); };
  el.onclick = () => { haptic(); kill(); };
  setTimeout(() => { if (el.isConnected) kill(); }, 3400);
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
  if (appTab === 'courses') html = inPath ? pathHtml(curCourse) : (catView === 'catalog' ? catalogHtml() : catHtml(catView));
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
  const topics = ALL_CATS.map((c) => {
    const courses = ALL_COURSES.filter((x) => x.cat === c.id);
    const total = courses.reduce((n, x) => n + courseLessons(x).length, 0);
    const done = courses.reduce((n, x) => n + courseDone(x), 0);
    return { ...c, total, done, nCourses: courses.length };
  });
  const word = (n) => n % 10 === 1 && n !== 11 ? 'курс' : [2, 3, 4].includes(n % 10) && ![12, 13, 14].includes(n % 100) ? 'курса' : 'курсов';
  return `<div class="screen">
    <div class="bg-decor"><span style="top:70px;right:22px">✦</span><span style="top:210px;left:14px">✦</span><span style="top:430px;right:36px">✦</span></div>
    <div class="greet-row"><div class="gm">${mascotSVG('idle', state.outfit)}</div>
      <div><h2>Привет${state.name ? ', ' + esc(state.name) : ''}!</h2><p>Что учим сегодня?</p></div></div>
    ${topics.map((t) => `<button class="cat-card" data-cat="${t.id}">
      <div class="cat-art">${t.id === 'finance' ? mascotFinancierSVG() : mascotTopicSVG(t.id)}</div>
      <div class="cat-text"><h3>${t.title}</h3><p>${t.desc}</p>
      <span class="pill cat-pill">${t.nCourses} ${word(t.nCourses)} · ${t.done} из ${t.total} уроков</span></div>
      <div class="cat-chev">›</div>
    </button>`).join('')}
  </div>`;
}
const COURSE_SUB = {
  'finlit-2026': 'Основы', invest: 'Рост денег', crypto: 'Рост денег', flat: 'Жильё и мышление', psymoney: 'Жильё и мышление',
  sales: 'Продажи и бизнес', business: 'Продажи и бизнес', market: 'Продажи и бизнес', marketing: 'Продажи и бизнес',
  brand: 'Карьера и развитие', career: 'Карьера и развитие', freelance: 'Карьера и развитие', talks: 'Карьера и развитие', learn: 'Карьера и развитие',
  ai: 'ИИ и алгоритмы', ai2: 'ИИ и алгоритмы', algo: 'ИИ и алгоритмы', code: 'Код и безопасность', cyber: 'Код и безопасность',
  eng: 'Старт и практика', engt: 'Старт и практика', draw: 'Рисунок', design: 'Дизайн и видео', video: 'Дизайн и видео', story: 'Истории',
};
const ALL_CATS = [{ id: 'finance', title: 'Финансы', desc: 'Деньги, вклады, кредиты, инвестиции' }, ...OTHER_CATS];
function catHtml(catId) {
  const cat = ALL_CATS.find((c) => c.id === catId) || ALL_CATS[0];
  const courses = ALL_COURSES.filter((c) => c.cat === catId);
  return `<div class="screen">
    <button class="menu-row" id="back-catalog" style="border:0;padding:10px 0 0"><span style="font-size:20px">‹</span> Карта мира</button>
    <div class="cat-card hero-cat" style="cursor:default">
      <div class="cat-art">${catId === 'finance' ? mascotFinancierSVG() : mascotTopicSVG(catId)}</div>
      <div class="cat-text"><h3>${cat.title}</h3><p>${catId === 'finance' ? 'Курсич в галстуке — значит, говорим о деньгах.' : cat.desc}</p></div>
    </div>
    ${(() => { const groups = []; courses.forEach((c) => { const sub = COURSE_SUB[c.id] || 'Курсы'; let g = groups.find((x) => x.sub === sub); if (!g) { g = { sub, items: [] }; groups.push(g); } g.items.push(c); });
      return groups.map((g) => `<h3 class="subhead">${g.sub}</h3><div class="course-grid">${g.items.map((c) => { const d = courseDone(c), t = courseLessons(c).length; return `<button class="course-tile open" data-course="${c.id}">
        <div class="te tile-art">${COURSE_ART[c.id] || c.art || ''}</div><h3>${c.title}</h3><p>${c.subtitle || c.desc || ''}</p>
        <span class="pill">${d ? `Пройдено ${d} из ${t}` : 'Начать'}</span></button>`; }).join('')}</div>`).join(''); })()}
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
function pathHtml(course) {
  const flat = courseLessons(course);
  const firstUndone = flat.findIndex((l) => !state.completed[l.id]);
  const cat = ALL_CATS.find((c) => c.id === course.cat);
  let gi = -1;
  const units = course.units.map((u) => {
    const pts = u.lessons.map((l, li) => ({ x: 170 + OFFSETS[li % OFFSETS.length], y: 70 + li * 172 }));
    const d = pts.map((p, i) => i === 0 ? `M ${p.x} ${p.y}` : `C ${pts[i-1].x} ${pts[i-1].y + 70}, ${p.x} ${p.y - 70}, ${p.x} ${p.y}`).join(' ');
    const trail = `<svg class="path-trail" viewBox="0 0 340 ${pts.length * 172 + 30}" preserveAspectRatio="none" aria-hidden="true"><path d="${d}" fill="none" stroke="${u.color}" stroke-width="9" stroke-linecap="round" stroke-dasharray="0.1 17" opacity=".5"/></svg>`;
    const nodes = u.lessons.map((l, li) => {
      gi++;
      const done = !!state.completed[l.id], unlocked = firstUndone === -1 || gi <= firstUndone, current = unlocked && !done;
      return `<div class="node-wrap" style="transform:translateX(${OFFSETS[li % OFFSETS.length]}px)">
        ${current ? '<div class="start-bubble">СТАРТ</div>' : ''}
        <button class="node ${done ? 'done' : ''} ${!unlocked ? 'locked' : ''} ${current ? 'current' : ''}" style="--nd:${u.dark};background:${done ? '' : u.color}" data-lesson="${l.id}" ${!unlocked ? 'disabled' : ''}>${done ? icon('check',30) : !unlocked ? icon('lock',25) : `<span class="node-art">${LESSON_ART[l.id] || l.art || ''}</span>`}</button>
        <div class="node-label ${!unlocked ? 'locked' : ''}">${l.title}</div>
        <div class="mini-progress">+${l.xp} XP</div></div>`;
    }).join('');
    const ud = u.lessons.filter((l) => state.completed[l.id]).length;
    return `<div class="unit-banner" style="background:${u.color}"><div class="uicon">${icon(UNIT_ICON[u.id] || 'book',32)}</div>
      <div><h2>${u.title}</h2><p>${u.desc}</p></div><div class="ubadge">${ud}/${u.lessons.length}</div></div>
      <div class="path">${trail}<div class="path-art">${UNIT_ART[u.id] || course.art || ''}</div>${nodes}</div>`;
  }).join('');
  const dc = courseDone(course);
  return `<div class="screen" style="padding-top:10px">
    <button class="menu-row" id="back-catalog" style="border:0;padding:6px 0 2px"><span style="font-size:20px">‹</span> ${cat ? cat.title : 'Темы'}</button>
    <h2 class="st" style="margin-top:6px">${course.title}</h2>
    <p class="sub">${dc} из ${flat.length} уроков · уровень ${level()}</p>
    <div class="bar" style="margin:0 2px 8px"><i style="width:${Math.max(3, (dc / flat.length) * 100)}%"></i></div>
    ${units}
    <button class="train-card" data-training="${course.id}"><span class="train-ic">${icon('zap',26)}</span><span class="train-text"><b>Тренировка</b><p>Случайные вопросы из этого курса вперемешку. Повторяй, когда захочешь закрепить.</p></span><span class="chev">›</span></button></div>`;
}

// ── Профиль / достижения / настройки ───────────────────────────────
const OUTFIT_LIST = [
  { id: 'none', name: 'Курсич', req: null },
  { id: 'financier', name: 'Финансист', course: 'invest', req: 'Пройди курс «Инвестиции»' },
  { id: 'detective', name: 'Детектив', course: 'finlit-2026', req: 'Пройди «Финансовую грамотность»' },
  { id: 'builder', name: 'Строитель', course: 'flat', req: 'Пройди «Квартирный вопрос»' },
  { id: 'cosmonaut', name: 'Космонавт', course: 'crypto', req: 'Пройди «Криптовалюта»' },
  { id: 'seller', name: 'Продавец', course: 'sales', req: 'Пройди «Продажи без впаривания»' },
  { id: 'coder', name: 'Программист', course: 'code', req: 'Пройди «Первый код»' },
  { id: 'artist', name: 'Художник', course: 'draw', req: 'Пройди «Рисование: первые шаги»' },
  { id: 'traveler', name: 'Путешественник', course: 'engt', req: 'Пройди «Английский в путешествии»' },
  { id: 'blogger', name: 'Блогер', course: 'brand', req: 'Пройди «Личный бренд и блог»' },
  { id: 'hacker', name: 'Хакер', course: 'cyber', req: 'Пройди «Кибербезопасность»' },
  { id: 'graduate', name: 'Выпускник', req: 'Заверши любые 3 курса' },
];
function outfitUnlocked(o) {
  if (!o.req) return true;
  if (o.id === 'graduate') return ALL_COURSES.filter((c) => courseLessons(c).length && courseDone(c) === courseLessons(c).length).length >= 3;
  const c = ALL_COURSES.find((x) => x.id === o.course);
  return !!c && courseDone(c) === courseLessons(c).length;
}
function profileHtml() {
  const got = ACHIEVEMENTS.filter((a) => a.check(state)).length;
  return `<div class="screen">
    <div class="cardbox" style="display:flex;gap:14px;align-items:center;margin-top:14px">
      ${tgPhoto ? `<img class="tg-avatar" src="${esc(tgPhoto)}" alt="">` : `<div class="tg-initial">${esc((state.name || 'К')[0].toUpperCase())}</div>`}
      <div><div style="font-size:19px;font-weight:900">${esc(state.name) || 'Ученик'}</div>
      <div style="font-weight:800;color:var(--muted);font-size:13px;margin-top:3px">Уровень ${level()} · ${state.xp} XP</div>
      <div style="font-weight:800;color:var(--muted);font-size:13px">Уроков пройдено: ${doneCount()} из ${allLessons.length}</div></div>
    </div>
    <div class="cardbox" style="padding:4px 16px">
      <button class="menu-row" id="go-dict"><span class="mi" style="background:#ddf4ff;color:#1899d6">${icon('book',22)}</span>Словарь терминов<span style="margin-left:auto;font-weight:900;color:var(--muted);font-size:13px">если забыл слово</span><span class="chev">›</span></button>
      <button class="menu-row" id="go-ach"><span class="mi" style="background:#fff3cf;color:#b45309">${icon('trophy',22)}</span>Достижения<span style="margin-left:auto;font-weight:900;color:var(--muted);font-size:13px">${got}/${ACHIEVEMENTS.length}</span><span class="chev">›</span></button>
      <button class="menu-row" id="go-settings"><span class="mi" style="background:#eef2f5;color:#52616b">${icon('sliders',22)}</span>Настройки<span class="chev">›</span></button>
    </div>
    <div class="cardbox">
      <h3 style="margin:2px 0 4px;font-size:17px;font-weight:900">Коллекция Курсичей</h3>
      <p style="margin:0 0 10px;color:var(--muted);font-weight:700;font-size:13px">Образы открываются за пройденные курсы. Выбери, в каком виде Курсич встречает тебя в уроках.</p>
      <div class="outfit-grid">
      ${OUTFIT_LIST.map((o) => { const un = outfitUnlocked(o); const sel = state.outfit === o.id; return `<button class="outfit ${sel ? 'sel' : ''}" data-outfit="${o.id}" ${un ? '' : 'disabled'}><span class="outfit-m">${mascotSVG('happy', o.id)}</span><span class="outfit-n">${o.name}</span><span class="outfit-r">${un ? (sel ? 'Выбран' : 'Надеть') : o.req}</span></button>`; }).join('')}
      </div>
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

const TERM_CAT = {
  'Инфляция': 'Деньги и банки', 'Ключевая ставка': 'Деньги и банки', 'Вклад': 'Деньги и банки', 'Бюджет': 'Деньги и банки', 'Подушка безопасности': 'Деньги и банки', 'Кэшбэк': 'Деньги и банки', 'Цифровой рубль': 'Деньги и банки', 'Лицензия': 'Деньги и банки', 'Комиссия': 'Деньги и банки',
  'Диверсификация': 'Инвестиции', 'Сложный процент': 'Инвестиции', 'Облигация': 'Инвестиции', 'Акция': 'Инвестиции', 'Брокер': 'Инвестиции', 'Доходность': 'Инвестиции', 'Просадка': 'Инвестиции', 'Котировки': 'Инвестиции', 'Эмитент': 'Инвестиции', 'Купоны': 'Инвестиции', 'Номинал': 'Инвестиции', 'Портфель': 'Инвестиции', 'Актив': 'Инвестиции', 'Горизонт': 'Инвестиции', 'Кредитное плечо': 'Инвестиции', 'Финансовая пирамида': 'Инвестиции', 'Криптовалюта': 'Инвестиции', 'Майнинг': 'Инвестиции',
  'Кредитная история': 'Кредиты и жильё', 'Рефинансирование': 'Кредиты и жильё', 'Самозапрет': 'Кредиты и жильё', 'Период охлаждения': 'Кредиты и жильё', 'Грейс-период': 'Кредиты и жильё',
  'Налоговый вычет': 'Налоги', 'Вычет': 'Налоги', 'Софинансирование': 'Налоги',
  'Дипфейк': 'Безопасность', 'Квишинг': 'Безопасность',
};
const DICT_ORDER = ['Сокращения', 'Деньги и банки', 'Инвестиции', 'Кредиты и жильё', 'Налоги', 'Работа и продажи', 'Технологии и ИИ', 'Безопасность', 'Деньги и мозг', 'Учёба и творчество', 'Общее'];
function dictHtml() {
  const items = [
    ...Object.entries(GLOSSARY).filter(([k]) => k !== 'QR').map(([name, g]) => ({ name, full: g.full, text: g.text, cat: 'Сокращения' })),
    ...Object.entries(TERM_MAP).map(([name, g]) => ({ name, full: g.full, text: g.text, cat: g.cat || TERM_CAT[name] || 'Общее' })),
  ].sort((x, y) => x.name.localeCompare(y.name, 'ru'));
  const secs = DICT_ORDER.map((cat) => ({ cat, items: items.filter((i) => i.cat === cat) })).filter((g) => g.items.length);
  return `<div class="screen">
    <button class="menu-row" data-back-profile style="border:0;padding:10px 0 0"><span style="font-size:20px">‹</span> Профиль</button>
    <h2 class="st">Словарь</h2>
    <p class="sub" style="margin-top:-6px">Забыл слово из урока — найди его здесь, по категориям. В самих уроках слова подчёркиваются только при первой встрече.</p>
    <input class="name-input dict-search" id="dict-search" type="text" placeholder="Найти слово…" autocomplete="off">
    ${secs.map((g) => `<section class="dict-sec"><h3 class="subhead">${g.cat}</h3><div class="cardbox" style="padding:4px 16px">
      ${g.items.map((it) => `<div class="dict-item" data-s="${(it.name + ' ' + it.full + ' ' + it.text).toLowerCase()}"><div class="dict-term">${it.name}</div><div class="dict-full">${it.full}</div><p>${it.text}</p></div>`).join('')}
    </div></section>`).join('')}
    <div class="dict-item" id="dict-empty" style="display:none;text-align:center;color:var(--muted);font-weight:800;padding:14px">Такого слова пока нет</div>
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
  app.querySelectorAll('[data-tab]').forEach((b) => b.onclick = () => { if (b.dataset.tab === appTab) return; appTab = b.dataset.tab; if (appTab === 'courses') inPath = inPath && false; haptic(); renderApp(); resetScroll(); });
  app.querySelectorAll('[data-cat]').forEach((b) => b.onclick = () => { catView = b.dataset.cat; haptic('medium'); renderApp(); resetScroll(); });
  const tcar = document.getElementById('topic-carousel');
  if (tcar) tcar.addEventListener('scroll', () => {
    const i = Math.round(tcar.scrollLeft / (tcar.firstElementChild ? tcar.firstElementChild.offsetWidth + 12 : 1));
    document.querySelectorAll('#topic-dots i').forEach((el, j) => el.classList.toggle('on', j === i));
  }, { passive: true });
  app.querySelectorAll('[data-course]').forEach((b) => b.onclick = () => { const c = ALL_COURSES.find((x) => x.id === b.dataset.course); if (!c) return; curCourse = c; inPath = true; scrollCurrent = true; haptic('medium'); renderApp(); });
  app.querySelectorAll('[data-outfit]').forEach((b) => b.onclick = () => { state.outfit = b.dataset.outfit; save(); haptic('medium'); sfx('pop'); renderApp(); });
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
  app.querySelectorAll('[data-training]').forEach((b) => b.onclick = () => { haptic('medium'); sfx('open'); startTraining(b.dataset.training); });
  const goAch = document.getElementById('go-ach'); if (goAch) goAch.onclick = () => { appTab = 'ach'; haptic(); renderApp(); resetScroll(); };
  const goSet = document.getElementById('go-settings'); if (goSet) goSet.onclick = () => { appTab = 'settings'; haptic(); renderApp(); resetScroll(); };
  const goDict = document.getElementById('go-dict'); if (goDict) goDict.onclick = () => { appTab = 'dict'; haptic(); renderApp(); resetScroll(); };
  const ds = document.getElementById('dict-search');
  if (ds) ds.addEventListener('input', () => {
    const v = ds.value.trim().toLowerCase(); let any = false;
    app.querySelectorAll('.dict-item[data-s]').forEach((it) => { const show = !v || it.dataset.s.includes(v); it.style.display = show ? '' : 'none'; if (show) any = true; });
    app.querySelectorAll('.dict-sec').forEach((sec) => { sec.style.display = [...sec.querySelectorAll('.dict-item')].some((it) => it.style.display !== 'none') ? '' : 'none'; });
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
  initLesson(lesson);
}
function startTraining(courseId) {
  const course = ALL_COURSES.find((c) => c.id === courseId);
  if (!course) return;
  const pool = courseLessons(course).flatMap((l) => l.quiz).filter((q) => ['single', 'bool', 'dialog', 'case'].includes(q.type));
  const picked = [...pool].sort(() => Math.random() - 0.5).slice(0, 6);
  initLesson({ id: 'train-' + course.id, title: 'Тренировка', xp: 5, cards: [], quiz: picked, course, training: true });
}
function initLesson(lesson) {
  const steps = [
    ...lesson.cards.map((c, ci) => ({ kind: 'theory', ci, ...c })),
    ...lesson.quiz.map((q) => ({ kind: 'quiz', ...q })),
  ];
  const pool = lesson.training ? [] : allLessons.filter((x) => x.id !== lesson.id && lesson.course && x.course && x.course.id === lesson.course.id && state.completed[x.id]).flatMap((x) => x.quiz.filter((q) => q.type === 'single' || q.type === 'bool'));
  if (pool.length) {
    const mq = pool[Math.floor(Date.now() / 1000) % pool.length];
    steps.splice(steps.length - 1, 0, { kind: 'quiz', ...mq, isMix: true, counted: true });
  }
  steps.forEach((st, i) => { st.uid = i; });
  L = { lesson, steps, idx: 0, correct: 0, totalQ: lesson.quiz.length, theoryN: lesson.cards.length, selected: null, checked: false, pendingRepeat: false, streak: 0 };
  curCourse = lesson.course || curCourse;
  lessonSeen = new Set();
  sfx('open');
  try { tg?.BackButton?.show(); tg.BackButton.onClick(exitLesson); } catch (e) {}
  renderLesson();
}
function exitLesson() { L = null; lessonSeen = null; try { tg?.BackButton?.hide(); } catch (e) {} appTab = 'courses'; catView = curCourse.cat || 'finance'; inPath = true; scrollCurrent = true; render(); }

function renderLesson() {
  hideAbbr();
  app.classList.add('in-lesson');
  const step = L.steps[L.idx];
  const progress = Math.round((L.idx / L.steps.length) * 100);
  let body = '';
  if (step.kind === 'theory') {
    const n = L.steps.slice(0, L.idx + 1).filter((s) => s.kind === 'theory').length;
    const theoryEmo = ['idle', 'think', 'amazed', 'happy'][step.ci % 4];
    body = `<span class="phase-tag theory">${icon('book',16)} ${L.lesson.article ? 'Статья' : 'Сначала разберёмся'} · ${n} из ${L.theoryN}</span>
      <div class="mascot-row"><div class="mwrap">${mascotSVG(theoryEmo, state.outfit)}</div>
        <div class="bubble"><b>${abbr(step.t)}</b><br>${abbr(step.b)}</div></div>
      <div class="theory-visual">${step.ci >= 2 ? GRACE_ART : ((step.ci === 1 && CARD2_ART[L.lesson.id]) || LESSON_ART[L.lesson.id] || L.lesson.art || '')}</div>
      <div class="sticky-cta"><button class="btn" id="next">Понятно</button></div>`;
  } else if (step.kind === 'quiz') {
    const n = L.steps.slice(0, L.idx + 1).filter((s) => s.kind === 'quiz' && !s.isRepeat).length;
    const tag = step.isRepeat
      ? `<span class="phase-tag recap">${icon('history',16)} Повторим — было с ошибкой</span>`
      : step.isMix
        ? `<span class="phase-tag recap">${icon('history',16)} Микс-повторение · из пройденного</span>`
        : `<span class="phase-tag">${icon('help',16)} Вопрос ${n} из ${L.totalQ}</span>`;
    let inner = '';
    if (step.type === 'dialog') {
      inner = `<div class="chat">${step.chat.map((m) => `<div class="chat-row"><div class="chat-name">${m.n}</div><div class="chat-bubble">${m.t}</div></div>`).join('')}</div>
      <div class="bubble" style="font-size:16px;margin-bottom:12px"><b>${abbr(step.q)}</b></div>
      <div id="opts">${step.options.map((o, i) => `<button class="opt" data-opt="${i}">${o}</button>`).join('')}</div>`;
    } else if (step.type === 'order') {
      if (!step.sel) step.sel = step.savedOrder ? [...step.savedOrder] : [];
      const rot = step.items.map((t, i) => ({ t, i })).sort((a, b) => ((a.i + step.uid) % step.items.length) - ((b.i + step.uid) % step.items.length));
      const mixed = [...rot.slice(1), rot[0]];
      inner = `<div class="bubble" style="font-size:16px;margin-bottom:12px"><b>${abbr(step.q)}</b></div>
      <div class="order-sel" id="order-sel"></div>
      <div class="order-pool">${mixed.map((x) => `<button class="order-chip" data-ord="${x.i}">${x.t}</button>`).join('')}</div>`;
    } else {
      inner = `${step.type === 'case' && step.doc ? `<div class="doc-card"><div class="doc-title">${step.doc.title}</div><p>${step.doc.lines.join('<br>')}</p></div>` : ''}
      <div class="mascot-row" style="align-items:center"><div class="q-mascot">${mascotSVG('think', state.outfit)}</div>
        <div class="bubble" style="font-size:17px"><b>${abbr(step.q)}</b></div></div>
      <div id="opts">${step.options.map((o, i) => `<button class="opt" data-opt="${i}">${o}</button>`).join('')}</div>`;
    }
    body = tag + inner + `<div class="sticky-cta"><button class="btn" id="check" disabled>Проверить</button></div>`;
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
    if (step.type === 'order') {
      const selBox = document.getElementById('order-sel');
      const paint = () => {
        selBox.innerHTML = step.sel.length
          ? step.sel.map((oi, pos) => `<button class="order-chip picked" data-unsel="${pos}"><b>${pos + 1}</b>${step.items[oi]}</button>`).join('')
          : '<span class="order-hint">Нажимай шаги внизу по порядку</span>';
        app.querySelectorAll('[data-ord]').forEach((b) => { b.style.display = step.sel.includes(Number(b.dataset.ord)) ? 'none' : ''; });
        checkBtn.disabled = step.sel.length !== step.items.length || L.checked;
      };
      app.querySelectorAll('[data-ord]').forEach((b) => b.onclick = () => {
        if (L.checked) return;
        step.sel.push(Number(b.dataset.ord)); step.savedOrder = [...step.sel]; haptic(); sfx('click'); paint();
      });
      selBox.addEventListener('click', (e) => {
        const b = e.target.closest('[data-unsel]'); if (!b || L.checked) return;
        step.sel.splice(Number(b.dataset.unsel), 1); step.savedOrder = [...step.sel]; haptic(); sfx('click'); paint();
      });
      paint();
    }
  }
}
function checkAnswer() {
  const cta = app.querySelector('.lesson-body .sticky-cta'); if (cta) cta.remove();
  const step = L.steps[L.idx];
  const ok = step.type === 'order'
    ? (step.sel && step.sel.length === step.items.length && step.sel.every((v, i) => v === i))
    : L.selected === step.correct;
  L.checked = true;
  if (!step.isMix) L.streak = ok ? (L.streak || 0) + 1 : 0;
  if (!step.counted) {
    step.counted = true;
    if (ok) L.correct++;
  }
  L.pendingRepeat = !ok && !step.isMix;
  if (ok) { notify('success'); beep(true); } else { notify('error'); haptic('heavy'); beep(false); }
  app.querySelectorAll('[data-opt]').forEach((b) => {
    b.disabled = true; const i = Number(b.dataset.opt);
    if (i === step.correct) b.classList.add('right'); else if (i === L.selected) b.classList.add('wrong');
  });
  const fb = document.createElement('div');
  fb.className = `feedback ${ok ? 'ok' : 'bad'}`;
  const fbEmo = ok ? (L.streak >= 5 ? 'party' : L.streak >= 3 ? 'star' : 'happy') : 'oops';
  fb.innerHTML = `<div class="fb-mascot" style="animation:pop .45s ease">${mascotSVG(fbEmo, state.outfit)}</div>
    <h3>${ok ? 'Верно!' : 'Почти получилось'}</h3>${ok && L.streak >= 3 ? `<div class="streak-line">${icon('star',16)} Серия: ${L.streak} верных подряд!</div>` : ''}<p>${abbr(step.explain)}</p>
    <button class="btn ${ok ? '' : 'red'}" id="fb-next">Дальше</button>`;
  document.body.appendChild(fb);
  if (ok && L.streak >= 5) confetti(30);
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
  const emos = ['party', 'star', 'celebrate', 'excited', 'laugh', 'amazed', 'proud', 'happy'];
  const emo = emos[Math.floor(Date.now() / 977) % emos.length];
  const name = state.name ? ', ' + esc(state.name) : '';
  const phrases = perfect
    ? ['Идеально! Ни одной ошибки', 'Чисто сработано' + name + '!', 'Вот это уровень!', 'Без единого промаха!', 'Так держать' + name + '!']
    : ['Урок пройден' + name + '!', 'Ещё один шаг вперёд!', 'Мозг прокачан!', 'Ты справился' + name + '!', 'Новая тема — в копилку!'];
  const phrase = phrases[Math.floor(Date.now() / 131) % phrases.length];
  const win = document.createElement('div');
  win.className = 'win-screen';
  win.innerHTML = `<div class="win-inner">
    <div class="win-mascot">${mascotSVG(emo, state.outfit)}</div>
    <div class="win-xp">+${xpGain} XP</div>
    <h2>${phrase}</h2>
    <p class="win-sub">${perfect ? 'Все ответы верны. Курсич в полном восторге.' : 'Урок завершён — знания уложились по полочкам.'}</p>
    <div class="result-stats">
      <div class="rstat"><b style="color:#46a302">${Math.round(acc * 100)}%</b><span>Точность</span></div>
      <div class="rstat"><b style="color:#ff9600">${L.correct}/${L.totalQ}</b><span>Верно</span></div>
      <div class="rstat"><b style="color:#1cb0f6">${icon('heart',18)} ∞</b><span>Сердец</span></div>
    </div>
    <button class="btn" id="win-path">К урокам</button>
    <button class="btn ghost" id="win-retry" style="margin-top:12px">Пройти ещё раз</button>
  </div>`;
  document.body.appendChild(win);
  if (firstTime) confetti(perfect ? 90 : 50);
  notify('success'); sfx('complete'); checkAchievements();
  document.getElementById('win-path').onclick = () => { win.remove(); haptic(); exitLesson(); };
  document.getElementById('win-retry').onclick = () => { win.remove(); haptic(); startLesson(lesson.id); };
}

render();
