import type { Star } from "./stars";

/**
 * skyLayout —— 每日星象。
 * 星星（互动星）的位置不再手写死，而是按「访客本地日期」做种子生成：
 * 同一天内刷新不变，跨天自动换一片新星空。
 * 手调坐标仍留在 stars.ts 里，作为内容锚点与生成失败时的兜底参考。
 */

/** mulberry32：小巧的种子随机数发生器（同种子 => 同一片星空） */
export function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** 每日种子：按访客本地日期（FNV-1a 哈希），跨天才变 */
export function dailySeed(): number {
  const d = new Date();
  const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  let h = 2166136261 >>> 0;
  for (let i = 0; i < key.length; i++) {
    h ^= key.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

type Pt = { x: number; y: number };
type Band = { xMin: number; xMax: number; yMin: number; yMax: number };

/* 天区分上下两带：常亮星（who am I）住上半夜，探索星住下半夜。
   每天重排位置，但星空的秩序不变。 */
const BANDS = {
  desktopFeatured: { xMin: 10, xMax: 84, yMin: 13, yMax: 33 },
  desktopQuest: { xMin: 8, xMax: 88, yMin: 54, yMax: 80 },
  mobileFeatured: { xMin: 14, xMax: 82, yMin: 12, yMax: 28 },
  mobileQuest: { xMin: 10, xMax: 86, yMin: 60, yMax: 86 },
} satisfies Record<string, Band>;

/* 桌面让路区：中央大标题、右上魔法月亮 */
const inTitleZone = (p: Pt) => p.x > 32 && p.x < 68 && p.y > 36 && p.y < 58;
const inMoonCorner = (p: Pt) => p.x > 74 && p.y < 26;
/* 移动端月亮缩在右上角（约占 x>68, y<24），常亮星带同样让路 */
const inMobileMoonCorner = (p: Pt) => p.x > 68 && p.y < 24;

function sample(
  rng: () => number,
  band: Band,
  placed: Pt[],
  minDist: number,
  avoid: (p: Pt) => boolean
): Pt {
  let fallback: Pt = { x: band.xMin, y: band.yMin };
  for (let t = 0; t < 300; t++) {
    const p: Pt = {
      x: band.xMin + rng() * (band.xMax - band.xMin),
      y: band.yMin + rng() * (band.yMax - band.yMin),
    };
    fallback = p;
    if (avoid(p)) continue;
    if (placed.every((q) => (p.x - q.x) ** 2 + (p.y - q.y) ** 2 >= minDist * minDist)) return p;
  }
  return fallback; // 极端密集时兜底，绝不卡死
}

const round1 = (n: number) => Math.round(n * 10) / 10;

/**
 * 每日星象布局：返回 { [starId]: { x, y, mx, my } }。
 * 先放常亮星再放探索星；桌面避开标题与月亮，移动端天然分带避开中央。
 */
export function dailyLayout(all: Star[], seed = dailySeed()) {
  const rng = mulberry32((seed ^ 0x9e3779b9) >>> 0);
  const ordered = [...all.filter((s) => s.featured), ...all.filter((s) => !s.featured)];
  const placedDesktop: Pt[] = [];
  const placedMobile: Pt[] = [];
  const layout: Record<string, { x: number; y: number; mx: number; my: number }> = {};

  for (const s of ordered) {
    const d = sample(
      rng,
      s.featured ? BANDS.desktopFeatured : BANDS.desktopQuest,
      placedDesktop,
      15,
      (p) => inTitleZone(p) || inMoonCorner(p)
    );
    placedDesktop.push(d);
    const m = sample(
      rng,
      s.featured ? BANDS.mobileFeatured : BANDS.mobileQuest,
      placedMobile,
      13,
      s.featured ? inMobileMoonCorner : () => false
    );
    placedMobile.push(m);
    layout[s.id] = { x: round1(d.x), y: round1(d.y), mx: round1(m.x), my: round1(m.y) };
  }
  return layout;
}
