/**
 * 全局装饰背景（克制版）：淡淡网格 + 星光闪烁 + 两点极光晕。
 * 纯装饰，对辅助技术完全隐藏；动效由 data-motion 统一门控。
 */
const STARS = [
  { left: "10%", top: "16%", size: 12, delay: "0s", color: "var(--yellow)" },
  { left: "26%", top: "72%", size: 8, delay: "0.9s", color: "var(--pink)" },
  { left: "46%", top: "10%", size: 9, delay: "1.7s", color: "var(--cyan)" },
  { left: "64%", top: "26%", size: 11, delay: "0.5s", color: "var(--pink)" },
  { left: "78%", top: "60%", size: 8, delay: "2.3s", color: "var(--yellow)" },
  { left: "90%", top: "18%", size: 10, delay: "1.2s", color: "var(--cyan)" },
];

export default function Backdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {/* 极光晕（很淡） */}
      <div
        className="anim-glow absolute -left-40 -top-40 h-[40rem] w-[40rem] rounded-full opacity-50"
        style={{ background: "radial-gradient(circle, rgba(var(--pink-rgb),.10), transparent 62%)" }}
      />
      <div
        className="anim-glow absolute -bottom-48 -right-40 h-[36rem] w-[36rem] rounded-full opacity-40"
        style={{ background: "radial-gradient(circle, rgba(var(--cyan-rgb),.08), transparent 62%)", animationDelay: "-6s" }}
      />
      {/* 网格（很淡，无动画） */}
      <div className="texture-grid absolute inset-0" />
      {/* 四角星光闪烁 */}
      {STARS.map((s, i) => (
        <span
          key={i}
          className="sparkle anim-twinkle absolute"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            background: s.color,
            animationDelay: s.delay,
            boxShadow: `0 0 ${s.size}px ${s.color}`,
          }}
        />
      ))}
    </div>
  );
}
