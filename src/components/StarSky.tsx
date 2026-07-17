import { useEffect, useState, type CSSProperties } from "react";
import { useMotion } from "@/hooks/useMotion";
import { freshSeed, mulberry32 } from "@/data/skyLayout";

/**
 * StarSky —— anime 风夜空场景（纯 CSS，装饰层，aria-hidden）。
 * 四时天幕（黄昏/夜晚/深夜/黎明，按访客本地时间交叉淡化）
 * + 程序化星尘（每颗星独立的明灭深度）+ 流星 + 魔法阵月亮 + 云。
 */

/* ---------- 四时天幕：同一套夜色的四种时刻 ---------- */
type PhaseKey = "twilight" | "night" | "midnight" | "dawn";
const PHASE_ORDER: PhaseKey[] = ["twilight", "night", "midnight", "dawn"];

const SKY: Record<
  PhaseKey,
  { sky: string; horizon: string; aurora: number; starDim: number; halo: string }
> = {
  // 黄昏（白天到访也落在这里：一天里最暖和迎客的时刻）
  twilight: {
    sky: "linear-gradient(180deg, #1a0b2e 0%, #34125e 24%, #5c2075 44%, #9c3f86 60%, #d06a8e 74%, #1a0b2e 100%)",
    horizon: "radial-gradient(ellipse, rgba(255,150,150,.42), rgba(255,110,160,.14) 45%, transparent 70%)",
    aurora: 0.45,
    starDim: 0.75,
    halo: "radial-gradient(circle, rgba(255,230,180,.4), rgba(255,190,200,.14) 50%, transparent 70%)",
  },
  // 夜晚（标准配色）
  night: {
    sky: "linear-gradient(180deg, #1a0b2e 0%, #2b1055 26%, #4a1a6b 46%, #7b2d8b 60%, #b84a8a 72%, #1a0b2e 100%)",
    horizon: "radial-gradient(ellipse, rgba(255,140,180,.4), rgba(255,110,199,.12) 45%, transparent 70%)",
    aurora: 0.7,
    starDim: 0.9,
    halo: "radial-gradient(circle, rgba(255,230,180,.35), rgba(255,200,220,.12) 50%, transparent 70%)",
  },
  // 深夜（更静更蓝，月亮最亮）
  midnight: {
    sky: "linear-gradient(180deg, #0a0514 0%, #160a2c 26%, #241047 46%, #3d1c68 60%, #5c2a7d 72%, #0a0514 100%)",
    horizon: "radial-gradient(ellipse, rgba(200,120,220,.3), rgba(164,135,255,.1) 45%, transparent 70%)",
    aurora: 0.85,
    starDim: 1,
    halo: "radial-gradient(circle, rgba(230,235,255,.42), rgba(190,180,255,.16) 50%, transparent 70%)",
  },
  // 黎明前（东方泛起一点青白，星子渐稀）
  dawn: {
    sky: "linear-gradient(180deg, #12081f 0%, #1d0f38 26%, #2e1a55 46%, #4a2a72 60%, #6b4a8e 72%, #12081f 100%)",
    horizon: "radial-gradient(ellipse, rgba(94,231,255,.28), rgba(164,135,255,.1) 45%, transparent 70%)",
    aurora: 0.5,
    starDim: 0.55,
    halo: "radial-gradient(circle, rgba(220,240,255,.36), rgba(160,220,255,.13) 50%, transparent 70%)",
  },
};

function currentPhase(): PhaseKey {
  const h = new Date().getHours();
  if (h < 4) return "midnight";
  if (h < 6) return "dawn";
  if (h < 20) return "twilight";
  return "night";
}

/* ---------- 程序化星尘：当场取随机种子，每次到访/刷新换一片星野 ---------- */
const DUST_TINTS = ["#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffd7f0", "#d0f4ff", "#ffe8a8"];
const DUST_SIZES = [1, 1, 1, 1.5, 1.5, 2.25];

const DUST = (() => {
  const rng = mulberry32(freshSeed());
  return Array.from({ length: 120 }, (_, i) => {
    const size = DUST_SIZES[Math.floor(rng() * DUST_SIZES.length)];
    return {
      id: i,
      x: rng() * 100,
      y: rng() * 100,
      size,
      tint: DUST_TINTS[Math.floor(rng() * DUST_TINTS.length)],
      oMin: 0.05 + rng() * 0.21,
      oMax: 0.13 + rng() * 0.81,
      dur: 2.4 + rng() * 5.2,
      delay: -rng() * 9,
      glow: size >= 2.25 || rng() > 0.85,
    };
  });
})();

export default function StarSky() {
  const { motionOn } = useMotion();
  const [phase, setPhase] = useState<PhaseKey>(currentPhase);

  // 每隔几分钟看一眼时间，跨时刻时天幕慢慢淡化过去
  useEffect(() => {
    const t = window.setInterval(() => setPhase(currentPhase()), 5 * 60 * 1000);
    return () => window.clearInterval(t);
  }, []);

  const now = SKY[phase];

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* 四时天幕：四层常驻，交叉淡化换班 */}
      {PHASE_ORDER.map((p) => (
        <div key={p} className="sky-phase absolute inset-0" style={{ opacity: p === phase ? 1 : 0 }}>
          <div className="absolute inset-0" style={{ background: SKY[p].sky }} />
          <div
            className="absolute left-1/2 top-[58%] h-[60vmin] w-[90vmin] -translate-x-1/2 rounded-full"
            style={{ background: SKY[p].horizon }}
          />
        </div>
      ))}

      {/* 极光色带（斜跨天际的柔光，各时刻浓度不同） */}
      <div
        className="anim-glow sky-phase absolute -left-[10%] top-[8%] h-[40%] w-[130%]"
        style={{
          background:
            "linear-gradient(100deg, transparent 20%, rgba(var(--cyan-rgb),.14) 42%, rgba(var(--violet-rgb),.18) 55%, rgba(var(--pink-rgb),.14) 68%, transparent 85%)",
          filter: "blur(40px)",
          animationDelay: "-4s",
          opacity: now.aurora,
        }}
      />

      {/* 星尘野：120 颗远星，各自的明灭周期与深度（时辰越晚越亮） */}
      <div className="sky-phase absolute inset-0" style={{ opacity: now.starDim }}>
        {DUST.map((d) => (
          <span
            key={d.id}
            className="star-dust"
            style={
              {
                left: `${d.x}%`,
                top: `${d.y}%`,
                width: d.size,
                height: d.size,
                background: d.tint,
                boxShadow: d.glow ? `0 0 6px 1px ${d.tint}59` : undefined,
                "--o-min": d.oMin,
                "--o-max": d.oMax,
                animation: motionOn ? `star-twinkle ${d.dur}s ease-in-out ${d.delay}s infinite` : "none",
                opacity: motionOn ? undefined : (d.oMin + d.oMax) / 2,
              } as CSSProperties
            }
          />
        ))}
      </div>

      {/* 流星：两条不同的轨道与班次， motion=off 时整颗消失 */}
      <div className="shooting-star shooting-star-a" style={{ top: "14%", right: "-8%", width: 150 }} />
      <div className="shooting-star shooting-star-b" style={{ top: "30%", left: "-10%", width: 110 }} />

      {/* 魔法月亮 + 魔法阵（右上，anime 感锚点；移动端缩小靠边） */}
      <div className="absolute right-[-8%] top-[4%] h-36 w-36 sm:right-[10%] sm:top-[10%] sm:h-56 sm:w-56" style={{ zIndex: 2 }}>
        {/* 四时光晕（交叉淡化） */}
        {PHASE_ORDER.map((p) => (
          <div
            key={p}
            className="sky-phase absolute inset-[-40%] rounded-full"
            style={{ background: SKY[p].halo, opacity: p === phase ? 1 : 0 }}
          />
        ))}
        {/* 月体 */}
        <div className="absolute inset-0 rounded-full" style={{ background: "radial-gradient(circle at 38% 34%, #fff8e8, #ffe9c8 40%, #ffc9e0 75%, #e8a8d8)", boxShadow: "0 0 60px rgba(255,220,180,.6), inset -12px -14px 40px rgba(220,140,190,.45)" }} />
        {/* 魔法阵：外圈刻度 + 符文环逆时针，代替原来的两虚线圆 */}
        <svg className="absolute inset-[-32%]" viewBox="0 0 200 200" fill="none">
          <g className="anim-spin-slow" style={{ transformOrigin: "100px 100px", animationDuration: "26s" }}>
            <circle cx="100" cy="100" r="95" stroke="rgba(255,240,200,.4)" strokeWidth="1" strokeDasharray="2 7" />
            {Array.from({ length: 24 }, (_, i) => {
              const a = (i * 15 * Math.PI) / 180;
              const long = i % 6 === 0;
              const r1 = long ? 84 : 88;
              return (
                <line
                  key={i}
                  x1={100 + r1 * Math.cos(a)} y1={100 + r1 * Math.sin(a)}
                  x2={100 + 92 * Math.cos(a)} y2={100 + 92 * Math.sin(a)}
                  stroke="rgba(255,240,200,.45)" strokeWidth={long ? 1.4 : 0.8}
                />
              );
            })}
          </g>
          <g className="anim-spin-slow" style={{ transformOrigin: "100px 100px", animationDuration: "34s", animationDirection: "reverse" }}>
            <circle cx="100" cy="100" r="72" stroke="rgba(255,200,230,.3)" strokeWidth="0.8" />
            <circle cx="100" cy="100" r="58" stroke="rgba(255,200,230,.22)" strokeWidth="0.8" strokeDasharray="1 5" />
            {Array.from({ length: 8 }, (_, i) => {
              const a = (i * 45 * Math.PI) / 180;
              const x = 100 + 72 * Math.cos(a);
              const y = 100 + 72 * Math.sin(a);
              return (
                <rect
                  key={i}
                  x={x - 2.4} y={y - 2.4} width="4.8" height="4.8"
                  transform={`rotate(${i * 45 + 45} ${x} ${y})`}
                  fill="rgba(255,214,240,.5)"
                />
              );
            })}
          </g>
        </svg>
      </div>

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
      <div className="absolute inset-x-0 bottom-0 h-1/3" style={{ background: "linear-gradient(transparent, rgba(var(--bg-rgb),.55))" }} />
      <div className="absolute inset-x-0 bottom-0 h-24" style={{ background: "linear-gradient(transparent, var(--bg))" }} />
    </div>
  );
}
