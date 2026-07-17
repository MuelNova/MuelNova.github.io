/** 观测档案卡的装饰系统：月光柔晕 + 星尘 + 骑缝星图钉（与导航星标、星空同一套语言） */

export const ACCENTS = {
  pink: "var(--pink)",
  cyan: "var(--cyan)",
  violet: "var(--violet)",
  yellow: "var(--yellow)",
} as const;

export type Accent = keyof typeof ACCENTS;

/** 星图钉：骑在卡片上边界的四角星（样式见 .card-pin） */
export function StarPin() {
  return (
    <svg aria-hidden="true" viewBox="0 0 10 10" className="card-pin">
      <path d="M5 0 L6.1 3.9 L10 5 L6.1 6.1 L5 10 L3.9 6.1 L0 5 L3.9 3.9 Z" />
    </svg>
  );
}

/**
 * 卡面装饰全家桶：星尘 + 月光柔晕（裁剪壳内）+ 骑缝星图钉。
 * 作为 card-astra 的第一个子元素渲染，装饰层在内容之下、图钉在上。
 */
export default function CardFace() {
  return (
    <>
      <span aria-hidden="true" className="card-skin">
        <span className="card-skin-dust" />
        <span className="card-skin-orb" />
      </span>
      <StarPin />
    </>
  );
}
