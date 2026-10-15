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

const EYES_OPEN = OPEN_EYES;
const STAR_EYE = (cx) => `<path class="m-spark" d="M${cx} 92 L${cx+3.2} 100.8 L${cx+9} 104 L${cx+3.2} 107.2 L${cx} 116 L${cx-3.2} 107.2 L${cx-9} 104 L${cx-3.2} 100.8 Z" fill="#ffc800" stroke="#e0a800" stroke-width="1.6" stroke-linejoin="round"/>`;
const HEART_EYE = (cx) => `<path d="M${cx} 113s-10-6.2-10-12.2A5.6 5.6 0 0 1 ${cx} 94.8a5.6 5.6 0 0 1 10 6c0 6-10 12.2-10 12.2z" fill="#ff4b6e"/>`;
const SUNGLASSES = `<g><rect x="66" y="94" width="38" height="20" rx="10" fill="#221d18"/><rect x="116" y="94" width="38" height="20" rx="10" fill="#221d18"/><rect x="71" y="98" width="12" height="5" rx="2.5" fill="#fff" opacity=".35"/><rect x="121" y="98" width="12" height="5" rx="2.5" fill="#fff" opacity=".35"/></g>`;
const M_SMILE = `<path d="M99 128 Q110 136 121 128" stroke="#221d18" stroke-width="3.4" fill="none" stroke-linecap="round"/>`;
const M_GRIN = `<path d="M96 124 Q110 140 124 124 Q110 129 96 124Z" fill="#7c2d12"/><path d="M102 132 Q110 137 118 132 Q110 135 102 132Z" fill="#fb7185"/>`;
const M_OPEN = `<ellipse cx="110" cy="132" rx="10" ry="11" fill="#7c2d12"/><ellipse cx="110" cy="137" rx="6.5" ry="4.6" fill="#fb7185"/>`;
const M_WAVY = `<path d="M99 133 Q104 128 110 133 Q116 138 121 133" stroke="#221d18" stroke-width="3.4" fill="none" stroke-linecap="round"/>`;
const M_FROWN = `<path d="M99 137 Q110 128 121 137" stroke="#221d18" stroke-width="3.4" fill="none" stroke-linecap="round"/>`;
const M_FLAT = `<path d="M101 132 L119 132" stroke="#221d18" stroke-width="3.4" fill="none" stroke-linecap="round"/>`;
const SPARKS = `<path class="m-star" d="M32 28 L34.8 35.2 L42 38 L34.8 40.8 L32 48 L29.2 40.8 L22 38 L29.2 35.2 Z" fill="#ffc800"/><path class="m-star2" d="M184 61 L185.96 66.04 L191 68 L185.96 69.96 L184 75 L182.04 69.96 L177 68 L182.04 66.04 Z" fill="#1cb0f6"/>`;

const FACES = {
  idle: { eyes: EYES_OPEN, mouth: M_SMILE, extra: '' },
  happy: { eyes: CLOSED_HAPPY, mouth: M_GRIN, extra: '' },
  think: { eyes: `<g class="m-blink"><circle cx="86" cy="100" r="5.6" fill="#221d18"/><circle cx="134" cy="100" r="5.6" fill="#221d18"/><circle cx="88.2" cy="97.8" r="1.9" fill="#fff"/><circle cx="136.2" cy="97.8" r="1.9" fill="#fff"/></g>`, mouth: `<path d="M101 132 Q110 129 119 132" stroke="#221d18" stroke-width="3.4" fill="none" stroke-linecap="round"/>`, extra: `<g class="m-think"><circle cx="174" cy="50" r="13" fill="#fff" stroke="#e7e2d9" stroke-width="2.5"/><text x="174" y="57" text-anchor="middle" font-size="16" font-weight="900" fill="#f59e0b" font-family="Nunito,sans-serif">?</text><circle cx="159" cy="69" r="5.5" fill="#fff" stroke="#e7e2d9" stroke-width="2"/><circle cx="151" cy="80" r="3.2" fill="#fff" stroke="#e7e2d9" stroke-width="1.5"/></g>` },
  celebrate: { eyes: CLOSED_HAPPY, mouth: M_OPEN, extra: SPARKS },
  sad: { eyes: EYES_OPEN, mouth: M_FROWN, extra: `<path d="M63 114 q-5 11 0 15 q5 -4 0 -15Z" fill="#38bdf8" class="m-tear"/>` },
  oops: { eyes: EYES_OPEN, mouth: M_WAVY, extra: `<path d="M170 58 q3 -13 13 -15 q-2 11 -13 15Z" fill="#a3e635"/>` },
  surprised: { eyes: `<g class="m-blink"><circle cx="86" cy="104" r="7.6" fill="#fff" stroke="#221d18" stroke-width="2.4"/><circle cx="86" cy="105" r="3.8" fill="#221d18"/><circle cx="134" cy="104" r="7.6" fill="#fff" stroke="#221d18" stroke-width="2.4"/><circle cx="134" cy="105" r="3.8" fill="#221d18"/></g>`, mouth: `<ellipse cx="110" cy="133" rx="7.5" ry="9.5" fill="#7c2d12"/>`, extra: `<text x="172" y="46" font-size="21" font-weight="900" fill="#ef4444" font-family="Nunito,sans-serif" class="m-bang">!</text>` },
  proud: { eyes: SUNGLASSES, mouth: `<path d="M98 127 Q110 137 123 126" stroke="#221d18" stroke-width="3.4" fill="none" stroke-linecap="round"/>`, extra: '' },
  sleepy: { eyes: `<path d="M77 104 Q86 110 95 104" stroke="#221d18" stroke-width="3.4" fill="none" stroke-linecap="round"/><path d="M125 104 Q134 110 143 104" stroke="#221d18" stroke-width="3.4" fill="none" stroke-linecap="round"/>`, mouth: `<ellipse cx="110" cy="131" rx="5.5" ry="6.5" fill="#7c2d12"/>`, extra: `<text x="166" y="52" font-size="17" font-weight="900" fill="#818cf8" font-family="Nunito,sans-serif" class="m-zzz">Z</text><text x="179" y="39" font-size="12" font-weight="900" fill="#a5b4fc" font-family="Nunito,sans-serif" class="m-zzz2">z</text>` },
  wink: { eyes: `<path d="M76 104 Q86 110 96 104" stroke="#221d18" stroke-width="3.8" fill="none" stroke-linecap="round"/><g class="m-blink"><circle cx="134" cy="104" r="5.6" fill="#221d18"/><circle cx="136.2" cy="101.8" r="1.9" fill="#fff"/></g>`, mouth: `<path d="M98 126 Q112 138 124 125" stroke="#221d18" stroke-width="3.4" fill="none" stroke-linecap="round"/>`, extra: '' },
  love: { eyes: HEART_EYE(86) + HEART_EYE(134), mouth: M_GRIN, extra: `<path class="m-float-heart" d="M178 92s-6-3.7-6-7.3a3.4 3.4 0 0 1 6-2 3.4 3.4 0 0 1 6 2c0 3.6-6 7.3-6 7.3z" fill="#ff86a6"/>` },
  star: { eyes: STAR_EYE(86) + STAR_EYE(134), mouth: M_GRIN, extra: SPARKS },
  laugh: { eyes: CLOSED_HAPPY, mouth: M_OPEN, extra: `<path d="M58 112 q-6 10 -1 14 q6 -3 1 -14Z" fill="#38bdf8" class="m-tear"/><path d="M162 112 q6 10 1 14 q-6 -3 -1 -14Z" fill="#38bdf8" class="m-tear"/>` },
  cool: { eyes: SUNGLASSES, mouth: `<path d="M100 129 Q112 134 122 126" stroke="#221d18" stroke-width="3.4" fill="none" stroke-linecap="round"/>`, extra: SPARKS },
  dizzy: { eyes: `<g stroke="#221d18" stroke-width="3.6" stroke-linecap="round"><path d="M79 97 l14 14 M93 97 l-14 14"/><path d="M127 97 l14 14 M141 97 l-14 14"/></g>`, mouth: M_WAVY, extra: `<g class="m-orbit"><path d="M32 40 L33.4 43.6 L37 45 L33.4 46.4 L32 50 L30.6 46.4 L27 45 L30.6 43.6 Z" fill="#ce82ff"/><path d="M186 34 L187.4 37.6 L191 39 L187.4 40.4 L186 44 L184.6 40.4 L181 39 L184.6 37.6 Z" fill="#ffc800"/></g>` },
  worried: { eyes: EYES_OPEN, mouth: M_WAVY, extra: `<g stroke="#e09a5f" stroke-width="2.6" fill="none" stroke-linecap="round"><path d="M74 84 Q84 79 94 83"/><path d="M126 83 Q136 79 146 84"/></g><path d="M168 96 q-6 12 0 17 q6 -5 0 -17Z" fill="#38bdf8" class="m-tear"/>` },
  angry: { eyes: EYES_OPEN, mouth: M_FROWN, extra: `<g stroke="#221d18" stroke-width="3.4" stroke-linecap="round"><path d="M72 82 L96 90"/><path d="M148 82 L124 90"/></g><g stroke="#ef4444" stroke-width="2.6" stroke-linecap="round" class="m-bang"><path d="M178 44 v12 M172 50 h12"/></g>` },
  shy: { eyes: `<g class="m-blink"><circle cx="86" cy="108" r="5.4" fill="#221d18"/><circle cx="134" cy="108" r="5.4" fill="#221d18"/></g>`, mouth: `<path d="M102 130 Q110 135 118 130" stroke="#221d18" stroke-width="3.2" fill="none" stroke-linecap="round"/>`, extra: `<ellipse cx="70" cy="122" rx="11" ry="6" fill="#fb7185" opacity=".65"/><ellipse cx="150" cy="122" rx="11" ry="6" fill="#fb7185" opacity=".65"/>` },
  money: { eyes: `<text x="86" y="113" text-anchor="middle" font-size="19" font-weight="900" fill="#46a302" font-family="Nunito,sans-serif">₽</text><text x="134" y="113" text-anchor="middle" font-size="19" font-weight="900" fill="#46a302" font-family="Nunito,sans-serif">₽</text>`, mouth: M_GRIN, extra: `<g class="m-bob"><circle cx="182" cy="52" r="11" fill="url(#gGold)" stroke="#e0a800" stroke-width="2"/><text x="182" y="58" text-anchor="middle" font-size="12" font-weight="900" fill="#a86e00" font-family="Nunito,sans-serif">₽</text></g>` },
  excited: { eyes: STAR_EYE(86) + STAR_EYE(134), mouth: M_OPEN, extra: SPARKS },
  cry: { eyes: EYES_OPEN, mouth: `<ellipse cx="110" cy="136" rx="8" ry="7" fill="#7c2d12"/>`, extra: `<path d="M66 112 q-6 16 0 24 q6 -8 0 -24Z" fill="#38bdf8" class="m-tear"/><path d="M154 112 q6 16 0 24 q-6 -8 0 -24Z" fill="#38bdf8" class="m-tear"/>` },
  determined: { eyes: EYES_OPEN, mouth: M_FLAT, extra: `<g stroke="#221d18" stroke-width="3.2" stroke-linecap="round"><path d="M73 85 L95 87"/><path d="M147 85 L125 87"/></g>` },
  confused: { eyes: `<g class="m-blink"><circle cx="86" cy="104" r="5.6" fill="#221d18"/><circle cx="88.2" cy="101.8" r="1.9" fill="#fff"/></g><path d="M124 104 Q134 110 144 104" stroke="#221d18" stroke-width="3.8" fill="none" stroke-linecap="round"/>`, mouth: M_WAVY, extra: `<g class="m-think"><circle cx="174" cy="50" r="13" fill="#fff" stroke="#e7e2d9" stroke-width="2.5"/><text x="174" y="57" text-anchor="middle" font-size="15" font-weight="900" fill="#1cb0f6" font-family="Nunito,sans-serif">?!</text></g>` },
  amazed: { eyes: `<g class="m-blink"><circle cx="86" cy="104" r="8" fill="#fff" stroke="#221d18" stroke-width="2.4"/><circle cx="86" cy="105" r="4" fill="#221d18"/><circle cx="134" cy="104" r="8" fill="#fff" stroke="#221d18" stroke-width="2.4"/><circle cx="134" cy="105" r="4" fill="#221d18"/></g>`, mouth: M_OPEN, extra: SPARKS },
  bored: { eyes: `<g><circle cx="86" cy="106" r="5" fill="#221d18"/><circle cx="134" cy="106" r="5" fill="#221d18"/><path d="M74 100 h24 M122 100 h24" stroke="#ffd3a6" stroke-width="7" stroke-linecap="round"/></g>`, mouth: M_FLAT, extra: '' },
  kiss: { eyes: CLOSED_HAPPY, mouth: `<path d="M110 134s-5-3-5-6a2.8 2.8 0 0 1 5-1.6A2.8 2.8 0 0 1 115 128c0 3-5 6-5 6z" fill="#ff4b6e"/>`, extra: `<path class="m-float-heart" d="M60 78s-6-3.7-6-7.3a3.4 3.4 0 0 1 6-2 3.4 3.4 0 0 1 6 2c0 3.6-6 7.3-6 7.3z" fill="#ff86a6"/>` },
  party: { eyes: CLOSED_HAPPY, mouth: M_OPEN, extra: `<g class="m-bob"><path d="M96 16 L122 4 L118 30 Z" fill="#ff86d0"/><circle cx="122" cy="4" r="4.5" fill="#ffc800"/></g><g class="m-star"><rect x="30" y="52" width="7" height="7" rx="2" fill="#1cb0f6" transform="rotate(20 33 55)"/><rect x="182" y="80" width="7" height="7" rx="2" fill="#58cc02" transform="rotate(-15 185 83)"/></g>` },
  dreamy: { eyes: `<path d="M77 104 Q86 110 95 104" stroke="#221d18" stroke-width="3.4" fill="none" stroke-linecap="round"/><path d="M125 104 Q134 110 143 104" stroke="#221d18" stroke-width="3.4" fill="none" stroke-linecap="round"/>`, mouth: M_SMILE, extra: `<path class="m-star" d="M176 30a10 10 0 1 0 8 16 12 12 0 0 1-8-16z" fill="#fde68a"/>` },
  genius: { eyes: EYES_OPEN, mouth: M_SMILE, extra: `<g class="m-bob"><circle cx="176" cy="42" r="11" fill="#fde68a" stroke="#f59e0b" stroke-width="2.4"/><path d="M172 52 h8 M173.5 56 h5" stroke="#f59e0b" stroke-width="2.4" stroke-linecap="round"/><path d="M176 24 v-4 M162 30 l-3-3 M190 30 l3-3" stroke="#f59e0b" stroke-width="2.4" stroke-linecap="round"/></g>` },
  silly: { eyes: `<path d="M76 104 Q86 110 96 104" stroke="#221d18" stroke-width="3.8" fill="none" stroke-linecap="round"/><g class="m-blink"><circle cx="134" cy="104" r="5.6" fill="#221d18"/><circle cx="136.2" cy="101.8" r="1.9" fill="#fff"/></g>`, mouth: `<path d="M99 127 Q110 135 121 127" stroke="#221d18" stroke-width="3.4" fill="none" stroke-linecap="round"/><path d="M104 132 q6 10 12 0 q-2 12 -6 12 q-4 0 -6 -12Z" fill="#fb7185"/>`, extra: '' },
};

export const OUTFITS = {
  none: '',
  financier: `<g><path d="M103 150 h14 l-2.5 9 h-9 Z" fill="#d33131"/><path d="M104.5 159 h11 l4 5 h-19 Z" fill="#ff4b4b"/></g>`,
  detective: `<g><ellipse cx="110" cy="52" rx="52" ry="10" fill="#8d6e63"/><path d="M72 52 a38 26 0 0 1 76 0 Z" fill="#a1887f"/><circle cx="168" cy="126" r="15" fill="#fff" fill-opacity=".18" stroke="#5d4037" stroke-width="4"/><path d="M179 137 l12 12" stroke="#5d4037" stroke-width="5" stroke-linecap="round"/></g>`,
  builder: `<g><path d="M64 58 a46 34 0 0 1 92 0 l0 6 -92 0 Z" fill="#ffc800"/><rect x="56" y="60" width="108" height="9" rx="4.5" fill="#e0a800"/><rect x="102" y="30" width="16" height="18" rx="4" fill="#e0a800"/></g>`,
  cosmonaut: `<g><circle cx="110" cy="102" r="76" fill="#bfe9ff" fill-opacity=".22" stroke="#dbeafe" stroke-width="5"/><path d="M52 62 a76 76 0 0 1 40-22" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round" opacity=".7"/></g>`,
  artist: `<g><ellipse cx="82" cy="34" rx="30" ry="12" fill="#ff4b4b" transform="rotate(-14 82 34)"/><circle cx="104" cy="24" r="4.5" fill="#d33131"/><circle cx="66" cy="126" r="3.4" fill="#1cb0f6"/><circle cx="72" cy="134" r="2.8" fill="#ffc800"/></g>`,
  coder: `<g><path d="M50 106 a60 60 0 0 1 120 0" fill="none" stroke="#334155" stroke-width="7"/><rect x="42" y="98" width="17" height="27" rx="8" fill="#334155"/><rect x="161" y="98" width="17" height="27" rx="8" fill="#334155"/><rect x="46" y="104" width="9" height="15" rx="4.5" fill="#1cb0f6"/><rect x="165" y="104" width="9" height="15" rx="4.5" fill="#1cb0f6"/></g>`,
  seller: `<g><path d="M66 56 a44 30 0 0 1 88 0 Z" fill="#58cc02"/><path d="M60 56 h100 l14 10 a6 6 0 0 1-4 10 H70 Z" fill="#46a302"/><g class="m-bob"><path d="M172 108 h16 v14 l-8 6 -8 -6 Z" fill="#ffc800"/><circle cx="180" cy="113" r="2.4" fill="#fff"/></g></g>`,
  traveler: `<g><rect x="64" y="93" width="40" height="21" rx="10.5" fill="#0f172a"/><rect x="116" y="93" width="40" height="21" rx="10.5" fill="#0f172a"/><path d="M104 100 h12 M64 100 l-12-4 M156 100 l12-4" stroke="#0f172a" stroke-width="4" stroke-linecap="round"/><rect x="70" y="97" width="13" height="5" rx="2.5" fill="#fff" opacity=".4"/></g>`,
  graduate: `<g><path d="M110 22 L162 42 L110 62 L58 42 Z" fill="#263238"/><path d="M84 52 v14 q26 12 52 0 V52 L110 62 Z" fill="#37474f"/><path d="M162 42 v20" stroke="#ffc800" stroke-width="4" stroke-linecap="round"/><circle cx="162" cy="66" r="4.5" fill="#ffc800" class="m-bob"/></g>`,
};

export function mascotSVG(emotion = 'idle', outfit = 'none') {
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
      ${OUTFITS[outfit] || ''}
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
