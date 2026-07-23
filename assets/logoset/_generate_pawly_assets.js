const fs = require('fs');
const path = require('path');
const { PNG } = require(process.env.TEMP + '/pawly-vector-tools/node_modules/pngjs');
const potrace = require(process.env.TEMP + '/pawly-vector-tools/node_modules/potrace');

const ROOT = 'C:/Users/steve/OneDrive/Documents/Pawly App/img/logoset';
const SRC = 'C:/Users/steve/OneDrive/Pawly App_files/logoset';

const CLAY = '#D97757';
const LINEN = '#FAF9F6';
const WHITE = '#FFFFFF';
const CUT_MARKER = '#00FF00';

const jobs = [
  { name: 'Pawly_AppIcon_Pri', source: 'pawly_app-icon_pri.png', kind: 'app-pri', trim: false },
  { name: 'Pawly_AppIcon_Sec', source: 'pawly_app-icon_sec.png', kind: 'app-sec', trim: false },
  { name: 'Pawly_Wordmark_Pri', source: 'Pawly_wordmark_pri.PNG', kind: 'wordmark', trim: true },
  { name: 'Pawly_Wordmark_Simple', source: 'Pawly_wordmark_simple.PNG', kind: 'wordmark', trim: true },
  { name: 'Pawly_Logo_Pri', source: 'pawly_logo_pri.PNG', kind: 'logo-pri', trim: true },
  { name: 'Pawly_Logo_Stacked', source: 'pawly_logo_stacked.PNG', kind: 'logo-stacked', trim: true },
];

function readPng(file) {
  return PNG.sync.read(fs.readFileSync(file));
}

function luminance(r, g, b) {
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function isClayLike(r, g, b, a) {
  if (a < 20) return false;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const sat = max - min;
  return r > 120 && g > 55 && g < 165 && b < 140 && sat > 28 && r > g + 18 && g > b + 8;
}

function isWhiteLike(r, g, b, a) {
  if (a < 20) return false;
  return luminance(r, g, b) > 205 && Math.max(r, g, b) - Math.min(r, g, b) < 45;
}

function bboxFromPredicate(img, pred) {
  let minX = img.width, minY = img.height, maxX = -1, maxY = -1;
  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      const i = (y * img.width + x) * 4;
      if (pred(img.data[i], img.data[i + 1], img.data[i + 2], img.data[i + 3], x, y)) {
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
      }
    }
  }
  if (maxX < minX || maxY < minY) return { x: 0, y: 0, w: img.width, h: img.height };
  return { x: minX, y: minY, w: maxX - minX + 1, h: maxY - minY + 1 };
}

function expandBox(b, pad, img) {
  const x = Math.max(0, b.x - pad);
  const y = Math.max(0, b.y - pad);
  const maxX = Math.min(img.width, b.x + b.w + pad);
  const maxY = Math.min(img.height, b.y + b.h + pad);
  return { x, y, w: maxX - x, h: maxY - y };
}

function makeMask(img, box, pred, margin = 0) {
  const out = new PNG({ width: box.w + margin * 2, height: box.h + margin * 2 });
  for (let y = 0; y < out.height; y++) {
    for (let x = 0; x < out.width; x++) {
      const sx = box.x + x - margin;
      const sy = box.y + y - margin;
      let on = false;
      if (sx >= 0 && sy >= 0 && sx < img.width && sy < img.height) {
        const i = (sy * img.width + sx) * 4;
        on = pred(img.data[i], img.data[i + 1], img.data[i + 2], img.data[i + 3], sx, sy);
      }
      const oi = (y * out.width + x) * 4;
      const v = on ? 0 : 255;
      out.data[oi] = v;
      out.data[oi + 1] = v;
      out.data[oi + 2] = v;
      out.data[oi + 3] = 255;
    }
  }
  return out;
}

function maskFromBoolean(width, height, isOn) {
  const out = new PNG({ width, height });
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const oi = (y * width + x) * 4;
      const v = isOn(x, y) ? 0 : 255;
      out.data[oi] = v;
      out.data[oi + 1] = v;
      out.data[oi + 2] = v;
      out.data[oi + 3] = 255;
    }
  }
  return out;
}

function enclosedWhiteMask(img, box, margin = 0, limitPred) {
  const w = box.w + margin * 2;
  const h = box.h + margin * 2;
  const white = new Uint8Array(w * h);
  const outside = new Uint8Array(w * h);
  const qx = [];
  const qy = [];

  function at(x, y) { return y * w + x; }
  function sampleWhite(x, y) {
    const sx = box.x + x - margin;
    const sy = box.y + y - margin;
    if (sx < 0 || sy < 0 || sx >= img.width || sy >= img.height) return true;
    const i = (sy * img.width + sx) * 4;
    if (limitPred && !limitPred(sx, sy)) return false;
    return isWhiteLike(img.data[i], img.data[i + 1], img.data[i + 2], img.data[i + 3]);
  }

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) white[at(x, y)] = sampleWhite(x, y) ? 1 : 0;
  }

  function push(x, y) {
    if (x < 0 || y < 0 || x >= w || y >= h) return;
    const idx = at(x, y);
    if (!white[idx] || outside[idx]) return;
    outside[idx] = 1;
    qx.push(x);
    qy.push(y);
  }

  for (let x = 0; x < w; x++) {
    push(x, 0);
    push(x, h - 1);
  }
  for (let y = 0; y < h; y++) {
    push(0, y);
    push(w - 1, y);
  }

  for (let head = 0; head < qx.length; head++) {
    const x = qx[head], y = qy[head];
    push(x + 1, y); push(x - 1, y); push(x, y + 1); push(x, y - 1);
  }

  return maskFromBoolean(w, h, (x, y) => white[at(x, y)] && !outside[at(x, y)]);
}

function holesFromForegroundMask(mask, includePred) {
  const w = mask.width;
  const h = mask.height;
  const foreground = new Uint8Array(w * h);
  const outside = new Uint8Array(w * h);
  const qx = [];
  const qy = [];
  function at(x, y) { return y * w + x; }
  function isFg(x, y) {
    const i = (y * w + x) * 4;
    return mask.data[i] < 128;
  }
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) foreground[at(x, y)] = isFg(x, y) ? 1 : 0;
  }
  function push(x, y) {
    if (x < 0 || y < 0 || x >= w || y >= h) return;
    const idx = at(x, y);
    if (foreground[idx] || outside[idx]) return;
    outside[idx] = 1;
    qx.push(x);
    qy.push(y);
  }
  for (let x = 0; x < w; x++) {
    push(x, 0);
    push(x, h - 1);
  }
  for (let y = 0; y < h; y++) {
    push(0, y);
    push(w - 1, y);
  }
  for (let head = 0; head < qx.length; head++) {
    const x = qx[head], y = qy[head];
    push(x + 1, y); push(x - 1, y); push(x, y + 1); push(x, y - 1);
  }
  return maskFromBoolean(w, h, (x, y) => {
    if (includePred && !includePred(x, y)) return false;
    return !foreground[at(x, y)] && !outside[at(x, y)];
  });
}

function traceMask(mask, opts = {}) {
  return new Promise((resolve, reject) => {
    const params = {
      threshold: 128,
      color: opts.color || CLAY,
      background: 'transparent',
      turdSize: opts.turdSize ?? 16,
      optTolerance: opts.optTolerance ?? 0.22,
      turnPolicy: potrace.Potrace.TURNPOLICY_MINORITY,
    };
    potrace.trace(PNG.sync.write(mask), params, (err, svg) => {
      if (err) return reject(err);
      const d = svg.match(/<path[^>]*d="([^"]+)"/);
      resolve(d ? d[1] : '');
    });
  });
}

function pathTag(d, fill, dx = 0, dy = 0, evenOdd = true) {
  if (!d) return '';
  const transform = dx || dy ? ` transform="translate(${dx} ${dy})"` : '';
  const fillRule = evenOdd ? ' fill-rule="evenodd" clip-rule="evenodd"' : '';
  return `<path d="${d}" fill="${fill}"${fillRule}${transform}/>`;
}

function compoundPathTag(outerD, holeD, fill, dx = 0, dy = 0) {
  return pathTag(`${outerD} ${holeD || ''}`.trim(), fill, dx, dy, true);
}

function roundRect(x, y, w, h, r, fill) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" ry="${r}" fill="${fill}"/>`;
}

function svgDoc(w, h, body) {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">\n${body}\n</svg>\n`;
}

function saveMaskDebug(name, mask) {
  fs.writeFileSync(path.join(ROOT, `${name}.mask.png`), PNG.sync.write(mask));
}

async function buildJob(job) {
  const img = readPng(path.join(SRC, job.source));
  fs.mkdirSync(ROOT, { recursive: true });

  if (job.kind === 'wordmark') {
    const b = expandBox(bboxFromPredicate(img, isClayLike), 4, img);
    const mask = makeMask(img, b, isClayLike, 4);
    const holes = holesFromForegroundMask(mask);
    const d = await traceMask(mask, { color: CLAY, turdSize: 24, optTolerance: 0.18 });
    const holeD = await traceMask(holes, { color: WHITE, turdSize: 18, optTolerance: 0.18 });
    const svg = svgDoc(mask.width, mask.height, pathTag(d, CLAY));
    fs.writeFileSync(path.join(ROOT, `${job.name}.svg`), svg);
    const aiSource = svgDoc(mask.width, mask.height, `${pathTag(d, CLAY)}\n${pathTag(holeD, CUT_MARKER)}`);
    fs.writeFileSync(path.join(ROOT, `${job.name}.ai-source.svg`), aiSource);
    return;
  }

  if (job.kind === 'app-sec') {
    const full = { x: 0, y: 0, w: img.width, h: img.height };
    const clayMask = makeMask(img, full, isClayLike, 0);
    const holes = holesFromForegroundMask(clayMask);
    const d = await traceMask(clayMask, { color: CLAY, turdSize: 24, optTolerance: 0.18 });
    const holeD = await traceMask(holes, { color: LINEN, turdSize: 18, optTolerance: 0.18 });
    const body = [
      roundRect(29, 21, 970, 979, 177, LINEN),
      pathTag(d, CLAY),
    ].join('\n');
    fs.writeFileSync(path.join(ROOT, `${job.name}.svg`), svgDoc(1024, 1024, body));
    const aiBody = [
      roundRect(29, 21, 970, 979, 177, LINEN),
      pathTag(d, CLAY),
      pathTag(holeD, CUT_MARKER),
    ].join('\n');
    fs.writeFileSync(path.join(ROOT, `${job.name}.ai-source.svg`), svgDoc(1024, 1024, aiBody));
    return;
  }

  if (job.kind === 'app-pri') {
    const full = { x: 0, y: 0, w: img.width, h: img.height };
    const clayMask = makeMask(img, full, isClayLike, 0);
    const whiteMask = holesFromForegroundMask(clayMask);
    const d = await traceMask(whiteMask, { color: WHITE, turdSize: 24, optTolerance: 0.18 });
    const body = [
      roundRect(9, 5, 1005, 1013, 181, CLAY),
      pathTag(d, WHITE),
    ].join('\n');
    fs.writeFileSync(path.join(ROOT, `${job.name}.svg`), svgDoc(1024, 1024, body));
    return;
  }

  if (job.kind === 'logo-pri' || job.kind === 'logo-stacked') {
    const b = expandBox(bboxFromPredicate(img, (r, g, b, a) => isClayLike(r, g, b, a) || isWhiteLike(r, g, b, a)), 6, img);
    const clayMask = makeMask(img, b, isClayLike, 6);
    const iconHoles = holesFromForegroundMask(clayMask, (x, y) => {
      const sourceX = b.x + x - 6;
      const sourceY = b.y + y - 6;
      const localX = sourceX - b.x;
      return job.kind === 'logo-pri'
        ? localX < b.w * 0.34
        : sourceY < b.y + b.h * 0.54;
    });
    const wordmarkHoles = holesFromForegroundMask(clayMask, (x, y) => {
      const sourceX = b.x + x - 6;
      const sourceY = b.y + y - 6;
      const localX = sourceX - b.x;
      return job.kind === 'logo-pri'
        ? localX >= b.w * 0.30
        : sourceY >= b.y + b.h * 0.45;
    });
    const clayD = await traceMask(clayMask, { color: CLAY, turdSize: 24, optTolerance: 0.18 });
    const iconHoleD = await traceMask(iconHoles, { color: WHITE, turdSize: 24, optTolerance: 0.18 });
    const wordmarkHoleD = await traceMask(wordmarkHoles, { color: WHITE, turdSize: 18, optTolerance: 0.18 });
    const svg = svgDoc(clayMask.width, clayMask.height, `${pathTag(clayD, CLAY)}\n${pathTag(iconHoleD, WHITE)}`);
    fs.writeFileSync(path.join(ROOT, `${job.name}.svg`), svg);
    const aiSource = svgDoc(clayMask.width, clayMask.height, `${pathTag(clayD, CLAY)}\n${pathTag(wordmarkHoleD, CUT_MARKER)}\n${pathTag(iconHoleD, WHITE)}`);
    fs.writeFileSync(path.join(ROOT, `${job.name}.ai-source.svg`), aiSource);
  }
}

(async () => {
  for (const job of jobs) {
    await buildJob(job);
    console.log(`created ${job.name}.svg`);
  }
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
