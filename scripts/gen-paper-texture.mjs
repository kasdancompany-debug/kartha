// Procedurally generates /public/textures/paper-fibre.png — a tileable 256x256
// grayscale paper-fibre texture, hand-rolled (no image deps) so Phase 1 has a
// real asset instead of a stub. Replace with a scanned/commissioned texture later.
import { writeFileSync } from "node:fs";
import { deflateSync } from "node:zlib";
import { mkdirSync } from "node:fs";

const SIZE = 256;

// Seeded PRNG (mulberry32) so the texture is reproducible across runs.
function mulberry32(seed) {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = mulberry32(0xbeef42);

// Tileable value noise: build a small periodic lattice, bilinearly sample it
// with wraparound so the 256x256 output repeats seamlessly.
function makeLattice(cells) {
  const g = new Float32Array(cells * cells);
  for (let i = 0; i < g.length; i++) g[i] = rand();
  return g;
}
function sampleLattice(g, cells, x, y) {
  const fx = (x / SIZE) * cells;
  const fy = (y / SIZE) * cells;
  const x0 = Math.floor(fx) % cells;
  const y0 = Math.floor(fy) % cells;
  const x1 = (x0 + 1) % cells;
  const y1 = (y0 + 1) % cells;
  const tx = fx - Math.floor(fx);
  const ty = fy - Math.floor(fy);
  const lerp = (a, b, t) => a + (b - a) * t;
  const v00 = g[y0 * cells + x0];
  const v10 = g[y0 * cells + x1];
  const v01 = g[y1 * cells + x0];
  const v11 = g[y1 * cells + x1];
  return lerp(lerp(v00, v10, tx), lerp(v01, v11, tx), ty);
}

const octaves = [
  { cells: 4, amp: 0.45 },
  { cells: 8, amp: 0.3 },
  { cells: 16, amp: 0.15 },
  { cells: 32, amp: 0.1 },
];
const lattices = octaves.map((o) => ({ ...o, g: makeLattice(o.cells) }));

const pixels = new Uint8Array(SIZE * SIZE);
let min = Infinity;
let max = -Infinity;
const raw = new Float32Array(SIZE * SIZE);
for (let y = 0; y < SIZE; y++) {
  for (let x = 0; x < SIZE; x++) {
    let v = 0;
    for (const o of lattices) v += sampleLattice(o.g, o.cells, x, y) * o.amp;
    // directional fibre streaks: stretch noise along a slight diagonal
    const streak = sampleLattice(lattices[1].g, lattices[1].cells, (x + y * 0.35) % SIZE, (y - x * 0.1 + SIZE) % SIZE) * 0.2;
    v += streak;
    raw[y * SIZE + x] = v;
    if (v < min) min = v;
    if (v > max) max = v;
  }
}
// Normalize into a narrow, light mid-grey band (this is multiplied at 0.35
// opacity over paper, so it must stay subtle rather than high-contrast).
const LO = 210;
const HI = 248;
for (let i = 0; i < raw.length; i++) {
  const t = (raw[i] - min) / (max - min || 1);
  pixels[i] = Math.round(LO + t * (HI - LO));
}

function crc32(buf) {
  let c;
  const table = crc32.table || (crc32.table = (() => {
    const t = new Uint32Array(256);
    for (let n = 0; n < 256; n++) {
      c = n;
      for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
      t[n] = c >>> 0;
    }
    return t;
  })());
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) crc = table[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}
function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeData = Buffer.concat([Buffer.from(type, "ascii"), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(typeData), 0);
  return Buffer.concat([len, typeData, crc]);
}

const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(SIZE, 0);
ihdr.writeUInt32BE(SIZE, 4);
ihdr[8] = 8; // bit depth
ihdr[9] = 0; // color type: grayscale
ihdr[10] = 0;
ihdr[11] = 0;
ihdr[12] = 0;

// Scanlines with filter-byte 0 prefix per row.
const raw2 = Buffer.alloc(SIZE * (SIZE + 1));
for (let y = 0; y < SIZE; y++) {
  raw2[y * (SIZE + 1)] = 0;
  for (let x = 0; x < SIZE; x++) {
    raw2[y * (SIZE + 1) + 1 + x] = pixels[y * SIZE + x];
  }
}
const idatData = deflateSync(raw2, { level: 9 });

const png = Buffer.concat([
  sig,
  chunk("IHDR", ihdr),
  chunk("IDAT", idatData),
  chunk("IEND", Buffer.alloc(0)),
]);

mkdirSync("public/textures", { recursive: true });
writeFileSync("public/textures/paper-fibre.png", png);
console.log(`wrote public/textures/paper-fibre.png (${png.length} bytes)`);
