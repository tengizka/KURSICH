// ─────────────────────────────────────────────────────────────
//  КУРСИЧ — кудрявый мальчик в очках. Полностью векторный (SVG).
//  Эмоции: idle, happy, think, celebrate, sad, surprised,
//          proud, sleepy, wink, love, oops
// ─────────────────────────────────────────────────────────────

const FACES = {
  idle: {
    eyes: `<circle cx="86" cy="104" r="5.5" fill="#26231f"/><circle cx="134" cy="104" r="5.5" fill="#26231f"/>
           <circle cx="88" cy="102" r="1.8" fill="#fff"/><circle cx="136" cy="102" r="1.8" fill="#fff"/>`,
    mouth: `<path d="M98 128 Q110 137 122 128" stroke="#26231f" stroke-width="3.5" fill="none" stroke-linecap="round"/>`,
    extra: '',
  },
  happy: {
    eyes: `<path d="M76 106 Q86 95 96 106" stroke="#26231f" stroke-width="4" fill="none" stroke-linecap="round"/>
           <path d="M124 106 Q134 95 144 106" stroke="#26231f" stroke-width="4" fill="none" stroke-linecap="round"/>`,
    mouth: `<path d="M95 124 Q110 142 125 124 Q110 130 95 124Z" fill="#7c2d12"/><path d="M101 133 Q110 139 119 133 Q110 136 101 133Z" fill="#fb7185"/>`,
    extra: '',
  },
  think: {
    eyes: `<circle cx="86" cy="101" r="5.5" fill="#26231f"/><circle cx="134" cy="101" r="5.5" fill="#26231f"/>
           <path d="M74 88 Q86 82 97 88" stroke="#5b3a29" stroke-width="4" fill="none" stroke-linecap="round"/>
           <path d="M123 88 Q134 82 146 88" stroke="#5b3a29" stroke-width="4" fill="none" stroke-linecap="round"/>`,
    mouth: `<path d="M100 132 Q110 128 120 132" stroke="#26231f" stroke-width="3.5" fill="none" stroke-linecap="round"/>`,
    extra: `<g class="mascot-think"><circle cx="172" cy="52" r="14" fill="#fff" stroke="#e5e0d5" stroke-width="2.5"/><text x="172" y="59" text-anchor="middle" font-size="17" font-weight="900" fill="#f59e0b" font-family="Nunito,sans-serif">?</text><circle cx="156" cy="72" r="6" fill="#fff" stroke="#e5e0d5" stroke-width="2"/><circle cx="148" cy="84" r="3.5" fill="#fff" stroke="#e5e0d5" stroke-width="1.5"/></g>`,
  },
  celebrate: {
    eyes: `<path d="M76 104 Q86 92 96 104" stroke="#26231f" stroke-width="4" fill="none" stroke-linecap="round"/>
           <path d="M124 104 Q134 92 144 104" stroke="#26231f" stroke-width="4" fill="none" stroke-linecap="round"/>`,
    mouth: `<ellipse cx="110" cy="132" rx="11" ry="12" fill="#7c2d12"/><ellipse cx="110" cy="138" rx="7" ry="5" fill="#fb7185"/>`,
    extra: `<text x="34" y="42" font-size="20" class="mascot-star">⭐</text><text x="168" y="34" font-size="16" class="mascot-star2">⭐</text><text x="182" y="76" font-size="13" class="mascot-star">✨</text>`,
  },
  sad: {
    eyes: `<circle cx="86" cy="106" r="5" fill="#26231f"/><circle cx="134" cy="106" r="5" fill="#26231f"/>
           <path d="M75 90 Q86 96 97 91" stroke="#5b3a29" stroke-width="4" fill="none" stroke-linecap="round"/>
           <path d="M123 91 Q134 96 145 90" stroke="#5b3a29" stroke-width="4" fill="none" stroke-linecap="round"/>`,
    mouth: `<path d="M98 138 Q110 128 122 138" stroke="#26231f" stroke-width="3.5" fill="none" stroke-linecap="round"/>`,
    extra: `<path d="M62 112 q-6 12 0 16 q6 -4 0 -16Z" fill="#38bdf8" class="mascot-tear"/><path d="M158 112 q-6 12 0 16 q6 -4 0 -16Z" fill="#38bdf8" class="mascot-tear"/>`,
  },
  oops: {
    eyes: `<circle cx="86" cy="104" r="5" fill="#26231f"/><circle cx="134" cy="104" r="6.5" fill="#26231f"/>
           <circle cx="88" cy="102" r="1.6" fill="#fff"/><circle cx="136" cy="102" r="2" fill="#fff"/>`,
    mouth: `<path d="M98 133 Q104 128 110 133 Q116 138 122 133" stroke="#26231f" stroke-width="3.5" fill="none" stroke-linecap="round"/>`,
    extra: `<path d="M168 60 q4 -14 14 -16 q-2 12 -14 16Z" fill="#a3e635"/><circle cx="176" cy="38" r="3" fill="#fbbf24"/>`,
  },
  surprised: {
    eyes: `<circle cx="86" cy="104" r="8" fill="#fff" stroke="#26231f" stroke-width="2.5"/><circle cx="86" cy="105" r="4" fill="#26231f"/>
           <circle cx="134" cy="104" r="8" fill="#fff" stroke="#26231f" stroke-width="2.5"/><circle cx="134" cy="105" r="4" fill="#26231f"/>`,
    mouth: `<ellipse cx="110" cy="133" rx="8" ry="10" fill="#7c2d12"/>`,
    extra: `<text x="170" y="48" font-size="22" font-weight="900" fill="#ef4444" font-family="Nunito,sans-serif" class="mascot-bang">!</text>`,
  },
  proud: {
    eyes: `<g><rect x="68" y="94" width="36" height="20" rx="9" fill="#26231f"/><rect x="116" y="94" width="36" height="20" rx="9" fill="#26231f"/><rect x="72" y="97" width="12" height="5" rx="2.5" fill="#fff" opacity=".35"/><rect x="120" y="97" width="12" height="5" rx="2.5" fill="#fff" opacity=".35"/></g>`,
    mouth: `<path d="M97 127 Q110 138 124 126" stroke="#26231f" stroke-width="3.5" fill="none" stroke-linecap="round"/><path d="M118 124 l7 -4" stroke="#26231f" stroke-width="3" stroke-linecap="round"/>`,
    extra: `<text x="166" y="46" font-size="20" class="mascot-star">🏆</text>`,
  },
  sleepy: {
    eyes: `<path d="M77 104 Q86 110 95 104" stroke="#26231f" stroke-width="3.5" fill="none" stroke-linecap="round"/>
           <path d="M125 104 Q134 110 143 104" stroke="#26231f" stroke-width="3.5" fill="none" stroke-linecap="round"/>`,
    mouth: `<ellipse cx="110" cy="131" rx="6" ry="7" fill="#7c2d12"/>`,
    extra: `<text x="164" y="52" font-size="19" font-weight="900" fill="#818cf8" font-family="Nunito,sans-serif" class="mascot-zzz">Z</text><text x="178" y="38" font-size="14" font-weight="900" fill="#a5b4fc" font-family="Nunito,sans-serif" class="mascot-zzz2">z</text><text x="188" y="27" font-size="10" font-weight="900" fill="#c7d2fe" font-family="Nunito,sans-serif" class="mascot-zzz">z</text>`,
  },
  wink: {
    eyes: `<path d="M76 104 Q86 110 96 104" stroke="#26231f" stroke-width="4" fill="none" stroke-linecap="round"/>
           <circle cx="134" cy="104" r="5.5" fill="#26231f"/><circle cx="136" cy="102" r="1.8" fill="#fff"/>`,
    mouth: `<path d="M97 126 Q112 139 125 125" stroke="#26231f" stroke-width="3.5" fill="none" stroke-linecap="round"/><ellipse cx="122" cy="131" rx="5" ry="3.5" fill="#fb7185"/>`,
    extra: '',
  },
  love: {
    eyes: `<text x="86" y="112" text-anchor="middle" font-size="17">❤️</text><text x="134" y="112" text-anchor="middle" font-size="17">❤️</text>`,
    mouth: `<path d="M95 124 Q110 142 125 124 Q110 130 95 124Z" fill="#7c2d12"/>`,
    extra: `<text x="36" y="50" font-size="15" class="mascot-star">💛</text><text x="172" y="44" font-size="13" class="mascot-star2">💛</text>`,
  },
};

// Позы рук: обычная / празднование (руки вверх)
const ARMS = {
  normal: `<path d="M52 176 Q34 162 36 142" stroke="#46a302" stroke-width="15" fill="none" stroke-linecap="round"/>
           <path d="M168 176 Q186 162 184 142" stroke="#46a302" stroke-width="15" fill="none" stroke-linecap="round"/>
           <circle cx="36" cy="140" r="8" fill="#ffcf9f"/><circle cx="184" cy="140" r="8" fill="#ffcf9f"/>`,
  celebrate: `<path d="M54 168 Q28 138 30 108" stroke="#46a302" stroke-width="15" fill="none" stroke-linecap="round"/>
              <path d="M166 168 Q192 138 190 108" stroke="#46a302" stroke-width="15" fill="none" stroke-linecap="round"/>
              <circle cx="30" cy="105" r="8.5" fill="#ffcf9f"/><circle cx="190" cy="105" r="8.5" fill="#ffcf9f"/>`,
  think: `<path d="M52 176 Q34 162 36 142" stroke="#46a302" stroke-width="15" fill="none" stroke-linecap="round"/>
          <path d="M168 176 Q188 166 176 148" stroke="#46a302" stroke-width="15" fill="none" stroke-linecap="round"/>
          <circle cx="36" cy="140" r="8" fill="#ffcf9f"/><circle cx="174" cy="145" r="8" fill="#ffcf9f"/>`,
};

export function mascotSVG(emotion = 'happy', extraClass = '') {
  const f = FACES[emotion] || FACES.happy;
  const arms = emotion === 'celebrate' ? ARMS.celebrate : emotion === 'think' ? ARMS.think : ARMS.normal;
  const hoodie = emotion === 'proud' ? '#8b5cf6' : emotion === 'sleepy' ? '#6366f1' : '#58cc02';
  const hoodieDark = emotion === 'proud' ? '#7c3aed' : emotion === 'sleepy' ? '#4f46e5' : '#46a302';
  return `
  <svg class="mascot-svg ${extraClass}" viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Курсич — кудрявый мальчик в очках">
    <!-- тело / худи -->
    <path d="M58 218 Q58 162 110 162 Q162 162 162 218 Z" fill="${hoodie}"/>
    <path d="M92 166 h36 l-6 26 h-24 Z" fill="${hoodieDark}" opacity=".55"/>
    <circle cx="110" cy="182" r="4" fill="#fff" opacity=".8"/>
    <path d="M88 164 Q110 178 132 164" stroke="${hoodieDark}" stroke-width="5" fill="none" stroke-linecap="round"/>
    ${arms.replaceAll('#46a302', hoodieDark)}
    <!-- уши -->
    <circle cx="57" cy="106" r="10" fill="#ffcf9f"/><circle cx="163" cy="106" r="10" fill="#ffcf9f"/>
    <circle cx="57" cy="106" r="4.5" fill="#f0a868"/><circle cx="163" cy="106" r="4.5" fill="#f0a868"/>
    <!-- лицо -->
    <ellipse cx="110" cy="104" rx="54" ry="50" fill="#ffcf9f"/>
    <!-- румянец -->
    <ellipse cx="72" cy="122" rx="9" ry="5.5" fill="#fb9a7a" opacity=".65"/>
    <ellipse cx="148" cy="122" rx="9" ry="5.5" fill="#fb9a7a" opacity=".65"/>
    <!-- веснушки -->
    <circle cx="80" cy="116" r="1.4" fill="#e08a4c"/><circle cx="88" cy="119" r="1.4" fill="#e08a4c"/><circle cx="132" cy="119" r="1.4" fill="#e08a4c"/><circle cx="140" cy="116" r="1.4" fill="#e08a4c"/>
    <!-- нос -->
    <path d="M108 112 Q113 118 108 122" stroke="#e08a4c" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    ${f.eyes}
    ${f.mouth}
    <!-- очки -->
    <g stroke="#26231f" stroke-width="3.5">
      <circle cx="86" cy="104" r="21" fill="#ffffff" fill-opacity="0.06"/>
      <circle cx="134" cy="104" r="21" fill="#ffffff" fill-opacity="0.06"/>
      <path d="M107 100 Q110 96 113 100" fill="none" stroke-linecap="round"/>
      <path d="M65 100 L54 94 M155 100 L166 94" stroke-linecap="round"/>
    </g>
    <path d="M72 90 Q80 82 92 84" stroke="#fff" stroke-width="3" opacity=".45" fill="none" stroke-linecap="round"/>
    <!-- КУДРИ -->
    <g fill="#4a2c17">
      <circle cx="62" cy="66" r="15"/><circle cx="78" cy="52" r="17"/><circle cx="98" cy="44" r="18"/>
      <circle cx="120" cy="44" r="17"/><circle cx="140" cy="52" r="16"/><circle cx="156" cy="66" r="14"/>
      <circle cx="54" cy="84" r="12"/><circle cx="166" cy="84" r="12"/>
      <circle cx="86" cy="58" r="13" fill="#5d3a1f"/><circle cx="110" cy="54" r="14" fill="#5d3a1f"/><circle cx="132" cy="58" r="12" fill="#5d3a1f"/>
      <circle cx="72" cy="70" r="9" fill="#6b4423"/><circle cx="148" cy="70" r="9" fill="#6b4423"/><circle cx="104" cy="40" r="9" fill="#6b4423"/>
    </g>
    <path d="M84 48 Q92 42 100 47" stroke="#8a5a2e" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M122 46 Q130 41 137 46" stroke="#8a5a2e" stroke-width="3" fill="none" stroke-linecap="round"/>
    ${f.extra}
  </svg>`;
}

export const EMOTIONS = Object.keys(FACES);
