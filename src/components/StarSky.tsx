/**
 * StarSky —— anime 风夜空场景（纯 CSS，装饰层，aria-hidden）。
 * 暮色渐变天幕 + 落日渐晕 + 极光云带 + 远景星点 + 云。
 */
export default function StarSky() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* 天幕：暮色 → 深夜 */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #1a0b2e 0%, #2b1055 26%, #4a1a6b 46%, #7b2d8b 60%, #b84a8a 72%, #1a0b2e 100%)",
        }}
      />
      {/* 落日/魔少女光晕（地平线附近的大颗暖光） */}
      <div
        className="anim-glow absolute left-1/2 top-[58%] h-[60vmin] w-[90vmin] -translate-x-1/2 rounded-full"
        style={{ background: "radial-gradient(ellipse, rgba(255,140,180,.4), rgba(255,110,199,.12) 45%, transparent 70%)" }}
      />
      {/* 极光色带（斜跨天际的柔光） */}
      <div
        className="anim-glow absolute -left-[10%] top-[8%] h-[40%] w-[130%] opacity-70"
        style={{
          background:
            "linear-gradient(100deg, transparent 20%, rgba(94,231,255,.14) 42%, rgba(164,135,255,.18) 55%, rgba(255,110,199,.14) 68%, transparent 85%)",
          filter: "blur(40px)",
          animationDelay: "-4s",
        }}
      />
      {/* 魔法月亮 + 环形魔法阵（右上，anime 感锚点；移动端缩小靠边） */}
      <div className="absolute right-[-8%] top-[4%] h-36 w-36 sm:right-[10%] sm:top-[10%] sm:h-56 sm:w-56" style={{ zIndex: 2 }}>
        {/* 光晕 */}
        <div className="anim-glow absolute inset-[-40%] rounded-full" style={{ background: "radial-gradient(circle, rgba(255,230,180,.35), rgba(255,200,220,.12) 50%, transparent 70%)" }} />
        {/* 月体 */}
        <div className="absolute inset-0 rounded-full" style={{ background: "radial-gradient(circle at 38% 34%, #fff8e8, #ffe9c8 40%, #ffc9e0 75%, #e8a8d8)", boxShadow: "0 0 60px rgba(255,220,180,.6), inset -12px -14px 40px rgba(220,140,190,.45)" }} />
        {/* 环形魔法阵 */}
        <div className="anim-spin-slow absolute inset-[-18%] rounded-full border-2 border-dashed" style={{ borderColor: "rgba(255,240,200,.4)" }} />
        <div className="anim-spin-slow absolute inset-[-30%] rounded-full border" style={{ borderColor: "rgba(255,200,230,.25)", animationDirection: "reverse", animationDuration: "22s" }} />
      </div>
      {/* 远景密星点（两层错落的点阵） */}
      <div
        className="anim-twinkle absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(1.5px 1.5px at 12% 18%, #fff, transparent), radial-gradient(1px 1px at 28% 42%, #ffd7f0, transparent), radial-gradient(1.5px 1.5px at 45% 12%, #d0f4ff, transparent), radial-gradient(1px 1px at 62% 30%, #fff, transparent), radial-gradient(1.5px 1.5px at 78% 15%, #ffe8a8, transparent), radial-gradient(1px 1px at 90% 40%, #ffd7f0, transparent), radial-gradient(1px 1px at 8% 60%, #d0f4ff, transparent), radial-gradient(1.5px 1.5px at 36% 72%, #fff, transparent), radial-gradient(1px 1px at 55% 82%, #ffe8a8, transparent), radial-gradient(1.5px 1.5px at 72% 68%, #d0f4ff, transparent), radial-gradient(1px 1px at 86% 78%, #fff, transparent), radial-gradient(1px 1px at 22% 86%, #ffd7f0, transparent)",
        }}
      />
      {/* 云朵（底部两层，缓慢漂移） */}
      <div
        className="anim-cloud absolute bottom-[6%] left-[-10%] h-24 w-[55%] rounded-full opacity-40"
        style={{ background: "radial-gradient(ellipse, rgba(255,190,225,.5), transparent 70%)", filter: "blur(18px)" }}
      />
      <div
        className="anim-cloud absolute bottom-[14%] right-[-12%] h-28 w-[48%] rounded-full opacity-30"
        style={{ background: "radial-gradient(ellipse, rgba(180,200,255,.5), transparent 70%)", filter: "blur(22px)", animationDelay: "-9s" }}
      />
      {/* 底部压暗 + 收尾到实底，让星空干净地「落」到传统区 */}
      <div className="absolute inset-x-0 bottom-0 h-1/3" style={{ background: "linear-gradient(transparent, rgba(11,7,19,.55))" }} />
      <div className="absolute inset-x-0 bottom-0 h-24" style={{ background: "linear-gradient(transparent, var(--bg))" }} />
    </div>
  );
}
