// Курсич — только голова. Чёрные кудри, круглые очки, глаза моргают.

const OPEN_EYES = `
  <g class="m-blink">
    <circle cx="86" cy="104" r="5.6" fill="#221d18"/>
    <circle cx="134" cy="104" r="5.6" fill="#221d18"/>
    <circle cx="88.2" cy="101.8" r="1.9" fill="#fff"/>
    <circle cx="136.2" cy="101.8" r="1.9" fill="#fff"/>
  </g>`;
const CLOSED_HAPPY = `
  <path d="M76 106 Q86 95 96 106" stroke="#221d18" stroke-width="4" fill="none" stroke-linecap="round"/>
  <path d="M124 106 Q134 95 144 106" stroke="#221d18" stroke-width="4" fill="none" stroke-linecap="round"/>`;

const FACES = {
  idle: { eyes: OPEN_EYES, mouth: `<path d="M99 128 Q110 136 121 128" stroke="#221d18" stroke-width="3.4" fill="none" stroke-linecap="round"/>`, extra: '' },
  happy: { eyes: CLOSED_HAPPY, mouth: `<path d="M96 124 Q110 140 124 124 Q110 129 96 124Z" fill="#7c2d12"/><path d="M102 132 Q110 137 118 132 Q110 135 102 132Z" fill="#fb7185"/>`, extra: '' },
  think: {
    eyes: OPEN_EYES,
    mouth: `<path d="M101 132 Q110 129 119 132" stroke="#221d18" stroke-width="3.4" fill="none" stroke-linecap="round"/>`,
    extra: `<g class="m-think"><circle cx="174" cy="50" r="13" fill="#fff" stroke="#e7e2d9" stroke-width="2.5"/><text x="174" y="57" text-anchor="middle" font-size="16" font-weight="900" fill="#f59e0b" font-family="Nunito,sans-serif">?</text><circle cx="159" cy="69" r="5.5" fill="#fff" stroke="#e7e2d9" stroke-width="2"/><circle cx="151" cy="80" r="3.2" fill="#fff" stroke="#e7e2d9" stroke-width="1.5"/></g>`,
  },
  celebrate: {
    eyes: CLOSED_HAPPY,
    mouth: `<ellipse cx="110" cy="132" rx="10" ry="11" fill="#7c2d12"/><ellipse cx="110" cy="137" rx="6.5" ry="4.6" fill="#fb7185"/>`,
    extra: `<path class="m-star" d="M32 28 L34.8 35.2 L42 38 L34.8 40.8 L32 48 L29.2 40.8 L22 38 L29.2 35.2 Z" fill="#ffc800"/><path class="m-star2" d="M184 61 L185.96 66.04 L191 68 L185.96 69.96 L184 75 L182.04 69.96 L177 68 L182.04 66.04 Z" fill="#1cb0f6"/>`,
  },
  sad: {
    eyes: OPEN_EYES,
    mouth: `<path d="M99 137 Q110 128 121 137" stroke="#221d18" stroke-width="3.4" fill="none" stroke-linecap="round"/>`,
    extra: `<path d="M63 114 q-5 11 0 15 q5 -4 0 -15Z" fill="#38bdf8" class="m-tear"/>`,
  },
  oops: {
    eyes: OPEN_EYES,
    mouth: `<path d="M99 133 Q104 128 110 133 Q116 138 121 133" stroke="#221d18" stroke-width="3.4" fill="none" stroke-linecap="round"/>`,
    extra: `<path d="M170 58 q3 -13 13 -15 q-2 11 -13 15Z" fill="#a3e635"/>`,
  },
  surprised: {
    eyes: `<g class="m-blink"><circle cx="86" cy="104" r="7.6" fill="#fff" stroke="#221d18" stroke-width="2.4"/><circle cx="86" cy="105" r="3.8" fill="#221d18"/><circle cx="134" cy="104" r="7.6" fill="#fff" stroke="#221d18" stroke-width="2.4"/><circle cx="134" cy="105" r="3.8" fill="#221d18"/></g>`,
    mouth: `<ellipse cx="110" cy="133" rx="7.5" ry="9.5" fill="#7c2d12"/>`,
    extra: `<text x="172" y="46" font-size="21" font-weight="900" fill="#ef4444" font-family="Nunito,sans-serif" class="m-bang">!</text>`,
  },
  proud: {
    eyes: `<g><rect x="69" y="95" width="34" height="18" rx="9" fill="#221d18"/><rect x="117" y="95" width="34" height="18" rx="9" fill="#221d18"/><rect x="73" y="98" width="11" height="4.6" rx="2.3" fill="#fff" opacity=".35"/><rect x="121" y="98" width="11" height="4.6" rx="2.3" fill="#fff" opacity=".35"/></g>`,
    mouth: `<path d="M98 127 Q110 137 123 126" stroke="#221d18" stroke-width="3.4" fill="none" stroke-linecap="round"/>`,
    extra: '',
  },
  sleepy: {
    eyes: `<path d="M77 104 Q86 110 95 104" stroke="#221d18" stroke-width="3.4" fill="none" stroke-linecap="round"/><path d="M125 104 Q134 110 143 104" stroke="#221d18" stroke-width="3.4" fill="none" stroke-linecap="round"/>`,
    mouth: `<ellipse cx="110" cy="131" rx="5.5" ry="6.5" fill="#7c2d12"/>`,
    extra: `<text x="166" y="52" font-size="17" font-weight="900" fill="#818cf8" font-family="Nunito,sans-serif" class="m-zzz">Z</text><text x="179" y="39" font-size="12" font-weight="900" fill="#a5b4fc" font-family="Nunito,sans-serif" class="m-zzz2">z</text>`,
  },
  wink: {
    eyes: `<path d="M76 104 Q86 110 96 104" stroke="#221d18" stroke-width="3.8" fill="none" stroke-linecap="round"/><g class="m-blink"><circle cx="134" cy="104" r="5.6" fill="#221d18"/><circle cx="136.2" cy="101.8" r="1.9" fill="#fff"/></g>`,
    mouth: `<path d="M98 126 Q112 138 124 125" stroke="#221d18" stroke-width="3.4" fill="none" stroke-linecap="round"/>`,
    extra: '',
  },
  love: {
    eyes: `<path d="M86 112s-9-5.6-9-11a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 5.4-9 11-9 11z" fill="#ff4b6e"/><path d="M134 112s-9-5.6-9-11a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 5.4-9 11-9 11z" fill="#ff4b6e"/>`,
    mouth: `<path d="M96 124 Q110 140 124 124 Q110 129 96 124Z" fill="#7c2d12"/>`,
    extra: '',
  },
};

export function mascotSVG(emotion = 'idle', extraClass = '') {
  const f = FACES[emotion] || FACES.idle;
  return `
  <svg class="mascot-svg ${extraClass}" viewBox="0 22 220 142" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Курсич">
    <g class="m-head">
      <circle cx="57" cy="107" r="9.5" fill="#ffd3a6"/><circle cx="163" cy="107" r="9.5" fill="#ffd3a6"/>
      <ellipse cx="110" cy="105" rx="53" ry="49" fill="#ffd3a6"/>
      <ellipse cx="73" cy="122" rx="8.5" ry="5" fill="#fb9a7a" opacity=".55"/>
      <ellipse cx="147" cy="122" rx="8.5" ry="5" fill="#fb9a7a" opacity=".55"/>
      <path d="M108 113 Q112 118 108 122" stroke="#e09a5f" stroke-width="2.4" fill="none" stroke-linecap="round"/>
      ${f.eyes}
      ${f.mouth}
      <g stroke="#221d18" stroke-width="3.4">
        <circle cx="86" cy="104" r="20.5" fill="#fff" fill-opacity="0.05"/>
        <circle cx="134" cy="104" r="20.5" fill="#fff" fill-opacity="0.05"/>
        <path d="M106.5 100 Q110 96.5 113.5 100" fill="none" stroke-linecap="round"/>
        <path d="M65.5 100 L55 95 M154.5 100 L165 95" stroke-linecap="round"/>
      </g>
      <path d="M73 91 Q80 84 91 85" stroke="#fff" stroke-width="2.8" opacity=".4" fill="none" stroke-linecap="round"/>
      <g class="m-hair">
        <g fill="#17120e">
          <circle cx="63" cy="67" r="14.5"/><circle cx="79" cy="53" r="16.5"/><circle cx="99" cy="45" r="17.5"/>
          <circle cx="121" cy="45" r="16.5"/><circle cx="141" cy="53" r="15.5"/><circle cx="156" cy="67" r="13.5"/>
          <circle cx="55" cy="84" r="11.5"/><circle cx="165" cy="84" r="11.5"/>
        </g>
        <g fill="#241c16">
          <circle cx="87" cy="59" r="12.5"/><circle cx="110" cy="55" r="13.5"/><circle cx="132" cy="59" r="11.5"/>
          <circle cx="73" cy="71" r="8.5"/><circle cx="147" cy="71" r="8.5"/><circle cx="104" cy="41" r="8.5"/>
        </g>
        <path d="M84 49 Q92 43 100 48" stroke="#57463a" stroke-width="2.8" fill="none" stroke-linecap="round"/>
        <path d="M122 47 Q130 42 137 47" stroke="#57463a" stroke-width="2.8" fill="none" stroke-linecap="round"/>
      </g>
      ${f.extra}
    </g>
  </svg>`;
}

export const EMOTIONS = Object.keys(FACES);

// Курсич-финансист: та же голова + галстук и монетка.
export function mascotFinancierSVG() {
  return `<span class="financier">${mascotSVG('proud')}
    <svg class="fin-tie" viewBox="0 0 100 64" fill="none" aria-hidden="true">
      <path d="M42 4 h16 l-3 12 h-10 Z" fill="#d33131"/>
      <path d="M44 16 h12 l6 34 -12 12 -12 -12 Z" fill="#ff4b4b"/>
    </svg>
    <span class="fin-coin">₽</span></span>`;
}

// Только кудри — для заставки.
export function mascotCurlsSVG() {
  return `<svg class="mascot-svg" viewBox="38 20 144 82" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Кудри Курсича">
    <defs><clipPath id="curlCut"><rect x="30" y="10" width="160" height="86"/></clipPath></defs>
    <g class="m-hair" clip-path="url(#curlCut)">
      <ellipse cx="110" cy="66" rx="64" ry="38" fill="#17120e"/>
      <g fill="#17120e">
        <circle cx="56" cy="54" r="17"/><circle cx="79" cy="40" r="19"/><circle cx="104" cy="35" r="20"/>
        <circle cx="129" cy="39" r="18"/><circle cx="151" cy="50" r="16"/><circle cx="166" cy="66" r="14"/>
        <circle cx="48" cy="72" r="14"/>
        <circle cx="64" cy="88" r="12"/><circle cx="84" cy="92" r="12"/><circle cx="104" cy="93" r="12"/>
        <circle cx="124" cy="93" r="12"/><circle cx="144" cy="92" r="12"/><circle cx="160" cy="88" r="12"/>
      </g>
      <g stroke="#5a4a3d" stroke-width="2.8" fill="none" stroke-linecap="round">
        <path d="M66 58a8 8 0 1 1 8 8"/><path d="M96 48a8 8 0 1 1 8 8"/>
        <path d="M126 52a8 8 0 1 1 8 8"/><path d="M148 68a7 7 0 1 1 7 7"/>
      </g>
    </g>
    <rect x="42" y="94" width="136" height="4" rx="2" fill="#17120e"/>
  </svg>`;
}
