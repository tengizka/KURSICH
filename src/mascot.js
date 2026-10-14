// Курсич — SVG-персонаж. Чёрные кудри, круглые очки.
// Глаза моргают (CSS .m-blink), голова слегка покачивается,
// в обычной позе руки опущены; машет только в эмоции celebrate.

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
    extra: `<text x="30" y="40" font-size="17" class="m-star">⭐</text><text x="182" y="70" font-size="12" class="m-star2">✨</text>`,
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
    extra: `<text x="168" y="44" font-size="18" class="m-star">🏆</text>`,
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
    eyes: `<text x="86" y="112" text-anchor="middle" font-size="16">❤️</text><text x="134" y="112" text-anchor="middle" font-size="16">❤️</text>`,
    mouth: `<path d="M96 124 Q110 140 124 124 Q110 129 96 124Z" fill="#7c2d12"/>`,
    extra: '',
  },
};

// Руки: обычно опущены вдоль тела. celebrate — машет одной рукой.
const ARMS = {
  normal: (c) => `
    <path d="M60 172 Q44 184 42 202" stroke="${c}" stroke-width="14" fill="none" stroke-linecap="round"/>
    <path d="M160 172 Q176 184 178 202" stroke="${c}" stroke-width="14" fill="none" stroke-linecap="round"/>
    <circle cx="42" cy="204" r="7.5" fill="#ffd3a6"/><circle cx="178" cy="204" r="7.5" fill="#ffd3a6"/>`,
  celebrate: (c) => `
    <path d="M60 172 Q44 184 42 202" stroke="${c}" stroke-width="14" fill="none" stroke-linecap="round"/>
    <circle cx="42" cy="204" r="7.5" fill="#ffd3a6"/>
    <g class="m-wave"><path d="M160 170 Q182 156 188 132" stroke="${c}" stroke-width="14" fill="none" stroke-linecap="round"/><circle cx="189" cy="129" r="7.5" fill="#ffd3a6"/></g>`,
  think: (c) => `
    <path d="M60 172 Q44 184 42 202" stroke="${c}" stroke-width="14" fill="none" stroke-linecap="round"/>
    <circle cx="42" cy="204" r="7.5" fill="#ffd3a6"/>
    <path d="M160 172 Q178 168 168 148" stroke="${c}" stroke-width="14" fill="none" stroke-linecap="round"/>
    <circle cx="166" cy="145" r="7.5" fill="#ffd3a6"/>`,
};

export function mascotSVG(emotion = 'idle', extraClass = '') {
  const f = FACES[emotion] || FACES.idle;
  const armsFn = emotion === 'celebrate' ? ARMS.celebrate : emotion === 'think' ? ARMS.think : ARMS.normal;
  const hoodie = emotion === 'sleepy' ? '#6366f1' : '#58cc02';
  const dark = emotion === 'sleepy' ? '#4f46e5' : '#46a302';
  return `
  <svg class="mascot-svg ${extraClass}" viewBox="0 0 220 222" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Курсич">
    <ellipse cx="110" cy="212" rx="58" ry="7" fill="#000" opacity="0.07"/>
    <g class="m-breathe">
      <path d="M60 220 Q58 164 110 164 Q162 164 160 220 Z" fill="${hoodie}"/>
      <path d="M88 196 h44 v18 a6 6 0 0 1 -6 6 h-32 a6 6 0 0 1 -6 -6 Z" fill="${dark}" opacity=".5"/>
      <path d="M90 166 Q110 179 130 166" stroke="${dark}" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M101 168 v10 M119 168 v10" stroke="${dark}" stroke-width="4" stroke-linecap="round"/>
      ${armsFn(dark)}
    </g>
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
