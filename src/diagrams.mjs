const number = (value, fallback, max = 100) => Number.isFinite(Number(value)) && Number(value) > 0 ? Math.min(Number(value), max) : fallback;
const dimension = (x1, y1, x2, y2, label, vertical = false) => `<g class="dimension"><path d="M${x1} ${y1}L${x2} ${y2}"/><path d="M${x1 - 4} ${y1 - 4}l8 8M${x2 - 4} ${y2 - 4}l8 8"/><text x="${(x1 + x2) / 2 + (vertical ? -13 : 0)}" y="${(y1 + y2) / 2 - (vertical ? 0 : 10)}" text-anchor="middle" ${vertical ? `transform="rotate(-90 ${(x1 + x2) / 2 - 13} ${(y1 + y2) / 2})"` : ''}>${label}</text></g>`;

export function diagram(kind, data, compact = false) {
  const width = number(data.width, kind === 'deck' ? 16 : 8);
  const depth = number(data.depth, kind === 'deck' ? 12 : 10);
  const scale = Math.min(310 / width, 215 / depth);
  const w = width * scale;
  const h = depth * scale;
  const x = (480 - w) / 2;
  const y = 68;
  const dimensions = dimension(x, y + h + 35, x + w, y + h + 35, `${width} ft`) + dimension(x - 25, y, x - 25, y + h, `${depth} ft`, true);
  const content = kind === 'deck'
    ? `<rect class="house" x="${x - 20}" y="${y - 27}" width="${w + 40}" height="27"/><text class="drawing-label" x="240" y="${y - 10}" text-anchor="middle">EXISTING HOUSE</text>
       <rect class="deck-floor" x="${x}" y="${y}" width="${w}" height="${h}"/>
       ${Array.from({ length: Math.floor(w / 14) - 1 }, (_, i) => `<path class="board" d="M${x + (i + 1) * 14} ${y}v${h}"/>`).join('')}
       <path class="guard-line" d="M${x} ${y}v${h}h${w}V${y}"/>
       ${[0.13, 0.87].flatMap(a => [0.2, 0.82].map(b => `<rect class="post" x="${x + w * a - 4}" y="${y + h * b - 4}" width="8" height="8"/>`)).join('')}
       <rect class="label-backdrop" x="177" y="${y + h / 2 - 16}" width="126" height="44" rx="2"/>
       <text class="drawing-title" x="240" y="${y + h / 2 + 2}" text-anchor="middle">${width * depth} sq ft</text>
       <text class="drawing-label" x="240" y="${y + h / 2 + 18}" text-anchor="middle">PROPOSED DECK</text>`
    : `<rect class="bath-floor" x="${x}" y="${y}" width="${w}" height="${h}"/>
       <path class="wall" d="M${x + w * .35} ${y + h}H${x}V${y}h${w}v${h}h-${w * .32}"/>
       <path class="door" d="M${x + w * .35} ${y + h}v-${w * .33}a${w * .33} ${w * .33} 0 0 1 ${w * .33} ${w * .33}" />
       <rect class="fixture" x="${x + 9}" y="${y + 9}" width="${w * .43}" height="${h * .33}" rx="4"/>
       <rect class="fixture-inner" x="${x + 15}" y="${y + 15}" width="${w * .43 - 12}" height="${h * .33 - 12}" rx="9"/>
       <text class="drawing-label" x="${x + 9 + w * .215}" y="${y + h * .22}" text-anchor="middle">BATH</text>
       <rect class="fixture" x="${x + w * .66}" y="${y + 11}" width="${w * .24}" height="${h * .1}" rx="2"/>
       <ellipse class="fixture" cx="${x + w * .78}" cy="${y + 11 + h * .19}" rx="${w * .1}" ry="${h * .1}"/>
       <rect class="fixture" x="${x + 9}" y="${y + h * .53}" width="${w * .3}" height="${h * .25}" rx="2"/>
       <ellipse class="fixture-inner" cx="${x + 9 + w * .15}" cy="${y + h * .65}" rx="${w * .09}" ry="${h * .065}"/>
       <circle class="fan" cx="${x + w * .73}" cy="${y + h * .62}" r="13"/><path class="fan" d="M${x + w * .73 - 8} ${y + h * .62}h16m-8-8v16"/>
       <text class="drawing-label" x="${x + w * .73}" y="${y + h * .62 + 29}" text-anchor="middle">EXHAUST</text>`;
  return `<svg class="blueprint ${compact ? 'compact' : ''}" viewBox="0 0 480 355" role="img" aria-label="${kind === 'deck' ? 'Deck' : 'Bathroom'} concept plan, ${width} by ${depth} feet. ${kind === 'bathroom' ? 'Fixture locations are illustrative, not a clearance calculation.' : 'Posts are symbolic, not engineered spacing.'}">
    <defs><pattern id="grid-${kind}-${compact}" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" class="grid-line"/></pattern></defs>
    <rect width="480" height="355" fill="url(#grid-${kind}-${compact})"/>
    ${content}${dimensions}
    <text class="drawing-note" x="18" y="339">CONCEPT ONLY / NOT FOR CONSTRUCTION</text>
    <g class="north"><path d="M449 47V24m-5 7 5-7 5 7"/><text x="449" y="17" text-anchor="middle">N*</text></g>
  </svg>`;
}
