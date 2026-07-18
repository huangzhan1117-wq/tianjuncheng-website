import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const assets = path.join(root, "assets");
const width = 1200;
const height = 720;

const defs = `
  <defs>
    <linearGradient id="sky" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0" stop-color="#e8f6ff"/>
      <stop offset="0.72" stop-color="#f8fbfd"/>
      <stop offset="1" stop-color="#e4eadf"/>
    </linearGradient>
    <linearGradient id="glass" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="#d6f1fb"/>
      <stop offset="1" stop-color="#84b8c9"/>
    </linearGradient>
    <linearGradient id="greenBody" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="#6f8f42"/>
      <stop offset="1" stop-color="#253c39"/>
    </linearGradient>
    <linearGradient id="boom" x1="0" x2="1" y1="0" y2="0">
      <stop offset="0" stop-color="#b3c65b"/>
      <stop offset="1" stop-color="#557e2d"/>
    </linearGradient>
    <filter id="softShadow" x="-20%" y="-40%" width="140%" height="180%">
      <feDropShadow dx="0" dy="24" stdDeviation="18" flood-color="#18313b" flood-opacity="0.28"/>
    </filter>
    <filter id="grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/>
      <feColorMatrix type="saturate" values="0"/>
      <feComponentTransfer>
        <feFuncA type="table" tableValues="0 0.045"/>
      </feComponentTransfer>
    </filter>
  </defs>
`;

const base = (content) => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  ${defs}
  <rect width="1200" height="720" fill="url(#sky)"/>
  <path d="M0 525 C210 500 360 538 565 520 C820 498 980 510 1200 488 V720 H0Z" fill="#d7dfd2"/>
  <path d="M0 585 C260 555 410 590 650 568 C870 548 1035 560 1200 540 V720 H0Z" fill="#cbd4c6"/>
  <g opacity="0.45" stroke="#aeb9ad" stroke-width="2">
    ${Array.from({ length: 16 }, (_, i) => `<path d="M${i * 92 - 120} 600 L${i * 92 + 120} 720"/>`).join("")}
  </g>
  <ellipse cx="590" cy="585" rx="450" ry="68" fill="#182f36" opacity="0.16"/>
  <g filter="url(#softShadow)">
    ${content}
  </g>
  <rect width="1200" height="720" fill="transparent" filter="url(#grain)"/>
</svg>`;

const wheel = (cx, cy, r = 52) => `
  <g>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="#20282a" stroke="#0d1718" stroke-width="6"/>
    <circle cx="${cx}" cy="${cy}" r="${r * 0.58}" fill="#73807b" stroke="#e3ebe2" stroke-width="5"/>
    ${Array.from({ length: 8 }, (_, i) => {
      const a = (Math.PI * 2 * i) / 8;
      const x = cx + Math.cos(a) * r * 0.44;
      const y = cy + Math.sin(a) * r * 0.44;
      return `<line x1="${cx}" y1="${cy}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="#263534" stroke-width="5"/>`;
    }).join("")}
    <circle cx="${cx}" cy="${cy}" r="9" fill="#edf2e9"/>
  </g>`;

const cab = (x, y, scale = 1, color = "#385f5b") => `
  <g transform="translate(${x} ${y}) scale(${scale})">
    <path d="M0 88 L24 24 L128 0 L188 34 L196 116 L14 116 Z" fill="${color}" stroke="#173736" stroke-width="5" stroke-linejoin="round"/>
    <path d="M38 30 L116 14 L158 43 L146 91 L32 91 Z" fill="url(#glass)" stroke="#21494a" stroke-width="4"/>
    <line x1="102" y1="21" x2="92" y2="92" stroke="#23484a" stroke-width="5"/>
    <rect x="16" y="94" width="164" height="24" rx="8" fill="#223534"/>
    <circle cx="42" cy="104" r="5" fill="#e6d15b"/>
  </g>`;

const boom = (x1, y1, x2, y2, h = 42) => {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy);
  const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
  const trusses = Array.from({ length: 13 }, (_, i) => {
    const x = (len * i) / 12;
    return `<path d="M${x} 0 L${x + 44} ${h}" stroke="#d3df78" stroke-width="5"/>`;
  }).join("");
  return `
    <g transform="translate(${x1} ${y1}) rotate(${angle})">
      <rect x="0" y="0" width="${len}" height="${h}" rx="8" fill="url(#boom)" stroke="#3d6f2b" stroke-width="4"/>
      <path d="M0 ${h - 8} L${len} ${h - 8}" stroke="#315f31" stroke-width="10"/>
      ${trusses}
    </g>`;
};

const hook = (x, y, scale = 1) => `
  <g transform="translate(${x} ${y}) scale(${scale})">
    <line x1="0" y1="-118" x2="0" y2="-14" stroke="#2b302e" stroke-width="5"/>
    <rect x="-25" y="-24" width="50" height="44" rx="6" fill="#343b39"/>
    <path d="M18 5 C-18 4 -26 50 6 58 C-14 42 -1 22 20 25" fill="none" stroke="#343b39" stroke-width="9" stroke-linecap="round"/>
  </g>`;

const stabilizers = `
  <line x1="855" y1="505" x2="1040" y2="505" stroke="#4c5b59" stroke-width="9"/>
  <line x1="866" y1="522" x2="1030" y2="586" stroke="#4c5b59" stroke-width="9"/>
  <rect x="1010" y="582" width="74" height="15" rx="7" fill="#4c5b59"/>
`;

function crane({ end, wheels = [285, 520, 632], body = "#405a53", boomColor = true }) {
  return `
    ${boom(468, 318, end[0], end[1], boomColor ? 42 : 50)}
    ${hook(end[0] + 18, end[1] + 128, 1)}
    <rect x="210" y="395" width="640" height="116" rx="23" fill="${body}" stroke="#1e3838" stroke-width="5"/>
    <rect x="290" y="328" width="202" height="92" rx="19" fill="#4b6b63" stroke="#1d3a39" stroke-width="5"/>
    <rect x="348" y="342" width="100" height="52" rx="11" fill="url(#glass)" stroke="#234b4c" stroke-width="4"/>
    ${cab(690, 300, 1.08, "#345653")}
    <rect x="438" y="316" width="132" height="68" rx="10" fill="#526d60" stroke="#1e3835" stroke-width="4"/>
    <rect x="225" y="416" width="96" height="50" rx="11" fill="#b3be4b"/>
    <rect x="198" y="502" width="672" height="30" rx="14" fill="#222d2c"/>
    ${wheel(285, 535, 54)}
    ${wheels.map((x) => wheel(x, 535, 54)).join("")}
    ${stabilizers}
  `;
}

const scenes = {
  "equip-20t.webp": crane({ end: [1038, 188], wheels: [520, 638], body: "#435d55" }),
  "equip-25t.webp": crane({ end: [1080, 166], wheels: [520, 638], body: "#3d5c56" }),
  "equip-50t.webp": crane({ end: [1110, 138], wheels: [510, 622, 735], body: "#405f59" }),
  "equip-70t.webp": crane({ end: [1142, 122], wheels: [508, 620, 732], body: "#385956" }),
  "equip-aerial.webp": `
    <rect x="210" y="420" width="635" height="98" rx="24" fill="url(#greenBody)" stroke="#21413c" stroke-width="5"/>
    ${cab(240, 334, 1.1, "#45635b")}
    <rect x="522" y="356" width="104" height="72" rx="12" fill="#59715b" stroke="#21413c" stroke-width="5"/>
    <line x1="590" y1="366" x2="875" y2="236" stroke="#689a42" stroke-width="36" stroke-linecap="round"/>
    <line x1="596" y1="402" x2="902" y2="274" stroke="#386a3d" stroke-width="20" stroke-linecap="round"/>
    <line x1="870" y1="250" x2="1010" y2="190" stroke="#689a42" stroke-width="30" stroke-linecap="round"/>
    <rect x="993" y="154" width="118" height="66" rx="11" fill="#558941" stroke="#295134" stroke-width="5"/>
    <line x1="1005" y1="176" x2="1100" y2="176" stroke="#d6df7a" stroke-width="6"/>
    <rect x="210" y="508" width="642" height="29" rx="14" fill="#222d2c"/>
    ${wheel(320, 542, 54)}${wheel(655, 542, 54)}${wheel(770, 542, 54)}
  `,
  "equip-excavator.webp": `
    <rect x="260" y="500" width="568" height="66" rx="33" fill="#252d2c"/>
    ${Array.from({ length: 12 }, (_, i) => `<circle cx="${312 + i * 42}" cy="526" r="15" fill="#717b77"/>`).join("")}
    <rect x="230" y="456" width="464" height="58" rx="19" fill="#5f8138" stroke="#31562e" stroke-width="5"/>
    <rect x="342" y="365" width="256" height="142" rx="23" fill="#4c624f" stroke="#213734" stroke-width="5"/>
    <rect x="388" y="382" width="146" height="72" rx="12" fill="url(#glass)" stroke="#21484a" stroke-width="5"/>
    <line x1="590" y1="396" x2="750" y2="245" stroke="#343f3c" stroke-width="40" stroke-linecap="round"/>
    <line x1="736" y1="252" x2="930" y2="354" stroke="#343f3c" stroke-width="34" stroke-linecap="round"/>
    <line x1="918" y1="350" x2="988" y2="464" stroke="#343f3c" stroke-width="30" stroke-linecap="round"/>
    <path d="M960 468 L1068 478 L1017 550 L935 522 Z" fill="#283230" stroke="#111b1a" stroke-width="5"/>
  `,
  "equip-truck-crane.webp": `
    <rect x="170" y="420" width="696" height="100" rx="22" fill="#40594f" stroke="#1d3836" stroke-width="5"/>
    ${cab(190, 320, 1.1, "#405f59")}
    <rect x="470" y="336" width="106" height="88" rx="13" fill="#587158" stroke="#213d39" stroke-width="5"/>
    <line x1="540" y1="360" x2="880" y2="235" stroke="#658f36" stroke-width="36" stroke-linecap="round"/>
    <line x1="570" y1="392" x2="912" y2="280" stroke="#396b2e" stroke-width="20" stroke-linecap="round"/>
    ${hook(922, 390, 0.88)}
    <rect x="170" y="510" width="706" height="29" rx="14" fill="#222d2c"/>
    ${wheel(280, 545, 52)}${wheel(600, 545, 52)}${wheel(715, 545, 52)}
    <line x1="870" y1="508" x2="1035" y2="508" stroke="#4c5b59" stroke-width="9"/>
  `,
  "equip-flatbed.webp": `
    ${cab(178, 328, 1.16, "#405f59")}
    <rect x="388" y="412" width="612" height="82" rx="15" fill="#4c665c" stroke="#213736" stroke-width="5"/>
    <rect x="405" y="388" width="575" height="35" fill="#6a923b"/>
    ${Array.from({ length: 7 }, (_, i) => `<line x1="${422 + i * 86}" y1="388" x2="${390 + i * 86}" y2="423" stroke="#cadb73" stroke-width="6"/>`).join("")}
    <rect x="175" y="496" width="840" height="33" rx="14" fill="#222d2c"/>
    ${wheel(300, 540, 52)}${wheel(520, 540, 52)}${wheel(690, 540, 52)}${wheel(860, 540, 52)}
  `,
};

for (const [name, content] of Object.entries(scenes)) {
  const svg = base(content);
  await sharp(Buffer.from(svg)).webp({ quality: 86, effort: 6 }).toFile(path.join(assets, name));
}

console.log("created 8 high-resolution equipment assets");
