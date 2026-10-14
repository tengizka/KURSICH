// Небольшие плоские SVG-иллюстрации для разделов и категорий.

const wrap = (inner) => `<svg viewBox="0 0 140 110" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${inner}</svg>`;

export const UNIT_ART = {
  // Копилка
  u1: wrap(`<circle cx="70" cy="26" r="11" fill="#ffc800"/><text x="70" y="31" text-anchor="middle" font-size="12" font-weight="900" fill="#8a6100" font-family="Nunito">₽</text>
    <ellipse cx="70" cy="72" rx="38" ry="28" fill="#ff9fb2"/><circle cx="96" cy="66" r="10" fill="#ff8fa5"/><circle cx="93" cy="64" r="2" fill="#7c2d3e"/><circle cx="99" cy="64" r="2" fill="#7c2d3e"/>
    <path d="M42 56 q-8 -10 2 -14 q8 6 4 14Z" fill="#ff8fa5"/><circle cx="52" cy="70" r="3" fill="#7c2d3e"/><path d="M58 48 h20" stroke="#e56b84" stroke-width="4" stroke-linecap="round"/><path d="M48 98 v6 M92 98 v6" stroke="#e56b84" stroke-width="5" stroke-linecap="round"/>`),
  // Банк
  u2: wrap(`<path d="M70 12 L118 42 H22 Z" fill="#1cb0f6"/><circle cx="70" cy="30" r="6" fill="#fff"/>
    <rect x="28" y="48" width="10" height="36" rx="3" fill="#7ed3fc"/><rect x="48" y="48" width="10" height="36" rx="3" fill="#7ed3fc"/><rect x="82" y="48" width="10" height="36" rx="3" fill="#7ed3fc"/><rect x="102" y="48" width="10" height="36" rx="3" fill="#7ed3fc"/>
    <rect x="20" y="88" width="100" height="8" rx="3" fill="#1899d6"/><rect x="20" y="42" width="100" height="7" rx="3" fill="#1899d6"/>`),
  // Карта и щит
  u3: wrap(`<rect x="14" y="30" width="82" height="54" rx="10" fill="#ce82ff"/><rect x="14" y="44" width="82" height="10" fill="#a560e8"/><rect x="24" y="64" width="26" height="9" rx="4" fill="#fff" opacity=".75"/>
    <path d="M104 38 l20 8 v18 c0 16 -9 26 -20 32 c-11 -6 -20 -16 -20 -32 v-18 Z" fill="#58cc02"/><path d="M96 66 l7 7 l13 -14" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`),
  // График и росток
  u4: wrap(`<path d="M22 92 H122" stroke="#d7dee3" stroke-width="4" stroke-linecap="round"/><path d="M28 78 L54 60 L74 68 L106 36" stroke="#ff9600" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M94 34 h14 v14" stroke="#ff9600" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="28" cy="78" r="5" fill="#ff9600"/><circle cx="54" cy="60" r="5" fill="#ff9600"/><circle cx="74" cy="68" r="5" fill="#ff9600"/>
    <path d="M104 92 q0 -18 12 -24 M104 92 q-2 -14 -14 -18" stroke="#58cc02" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M98 98 h14 l-3 10 h-9 Z" fill="#e2725b"/>`),
  // Калькулятор
  u5: wrap(`<rect x="38" y="14" width="64" height="86" rx="12" fill="#ff6b6b"/><rect x="49" y="25" width="42" height="18" rx="5" fill="#fff"/><text x="84" y="39" text-anchor="end" font-size="13" font-weight="900" fill="#263238" font-family="Nunito">13%</text>
    <g fill="#fff"><circle cx="55" cy="57" r="5"/><circle cx="70" cy="57" r="5"/><circle cx="85" cy="57" r="5"/><circle cx="55" cy="72" r="5"/><circle cx="70" cy="72" r="5"/><circle cx="85" cy="72" r="5"/><circle cx="55" cy="87" r="5"/><circle cx="70" cy="87" r="5"/></g><rect x="81" y="80" width="9" height="14" rx="4" fill="#ffc800"/>`),
  // Щит и замок
  u6: wrap(`<path d="M70 10 l42 16 v30 c0 26 -18 40 -42 50 C46 96 28 82 28 56 V26 Z" fill="#ff86d0"/>
    <path d="M70 20 l32 12 v25 c0 20 -13 31 -32 39 C51 88 38 77 38 57 V32 Z" fill="#ffb3e2"/>
    <rect x="54" y="52" width="32" height="26" rx="7" fill="#263238"/><path d="M60 52 v-8 a10 10 0 0 1 20 0 v8" stroke="#263238" stroke-width="6" fill="none"/><circle cx="70" cy="63" r="4" fill="#fff"/><path d="M70 66 v5" stroke="#fff" stroke-width="3.5" stroke-linecap="round"/>`),
};

export const CAT_ART = {
  career: wrap(`<rect x="28" y="38" width="84" height="56" rx="10" fill="#ff9600"/><path d="M52 38 v-8 a8 8 0 0 1 8 -8 h20 a8 8 0 0 1 8 8 v8" stroke="#cc7700" stroke-width="7" fill="none"/><rect x="28" y="60" width="84" height="9" fill="#cc7700"/><rect x="62" y="56" width="16" height="14" rx="4" fill="#ffc800"/>`),
  tech: wrap(`<rect x="26" y="24" width="88" height="58" rx="9" fill="#263238"/><rect x="33" y="31" width="74" height="44" rx="5" fill="#7ed3fc"/><path d="M48 62 l10 -9 l-10 -9 M66 66 h18" stroke="#1899d6" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M52 90 h36 l6 10 H46 Z" fill="#94a3b8"/>`),
  lang: wrap(`<path d="M24 22 h66 a8 8 0 0 1 8 8 v34 a8 8 0 0 1 -8 8 H48 l-18 16 v-16 a8 8 0 0 1 -6 -8 Z" fill="#1cb0f6"/><text x="61" y="60" text-anchor="middle" font-size="24" font-weight="900" fill="#fff" font-family="Nunito">Aa</text><circle cx="104" cy="66" r="17" fill="#ffc800"/><text x="104" y="72" text-anchor="middle" font-size="15" font-weight="900" fill="#8a6100" font-family="Nunito">Я</text>`),
  art: wrap(`<path d="M70 14 c24 0 42 16 42 36 c0 16 -12 24 -24 24 h-7 a10 10 0 0 0 -8 15 c2 3 1 7 -3 7 c-24 0 -42 -20 -42 -46 c0 -20 18 -36 42 -36Z" fill="#ce82ff"/><circle cx="52" cy="42" r="8" fill="#ff4b4b"/><circle cx="76" cy="32" r="8" fill="#ffc800"/><circle cx="94" cy="48" r="8" fill="#58cc02"/><circle cx="58" cy="66" r="8" fill="#1cb0f6"/>`),
};
