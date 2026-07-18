/** 夜空玻璃卡的装饰系统：月光柔晕 + 星尘 + 骑缝星图钉 + 卡顶星图（与导航星标、星空同一套语言） */
import { useId } from "react";

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

/** 四角星本体（与导航星标同一个形状） */
const STAR_D = "M5 0 L6.1 3.9 L10 5 L6.1 6.1 L5 10 L3.9 6.1 L0 5 L3.9 3.9 Z";

/**
 * 卡面装饰全家桶：
 * - 星尘层 + 月光柔晕（裁剪壳内，--accent 着色）
 * - 骑缝星图钉（pin=false 时去掉，大面板如观测窗）
 * - 钉后彗尾：一截渐变消隐的短线——亮处在钉、尾在身后（首屏流星的语言），
 *   不连接任何元素，hover/聚焦时从钉子身后描出（clip-path，CSS 全权负责）
 * - 角落小星座：平时沉睡，hover/聚焦时点亮、连线缓缓流动
 */
export default function CardFace({ pin = true }: { pin?: boolean }) {
  const gid = useId();
  return (
    <>
      <span aria-hidden="true" className="card-skin">
        <span className="card-skin-dust" />
        <span className="card-skin-orb" />
      </span>
      {pin && <StarPin />}
      <span aria-hidden="true" className="card-chart">
        <svg className="card-chart-trail" viewBox="0 0 140 14" fill="none" preserveAspectRatio="none">
          <defs>
            <linearGradient id={gid} x1="0" y1="0" x2="140" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0" style={{ stopColor: "var(--accent)", stopOpacity: 0.65 }} />
              <stop offset="1" style={{ stopColor: "var(--accent)", stopOpacity: 0 }} />
            </linearGradient>
          </defs>
          <line x1="2" y1="2" x2="136" y2="6" className="card-trail" stroke={`url(#${gid})`} vectorEffect="non-scaling-stroke" />
        </svg>
        <svg className="card-chart-corner" viewBox="0 0 48 24">
          <line x1="5" y1="6" x2="30" y2="15" className="card-chart-link" />
          <path className="card-chart-star" d={STAR_D} transform="translate(1.55 2.55) scale(0.69)" />
          <path className="card-chart-star" d={STAR_D} transform="translate(25.25 10.25) scale(0.95)" />
        </svg>
      </span>
    </>
  );
}
