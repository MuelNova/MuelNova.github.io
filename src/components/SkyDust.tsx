import { useEffect, useRef, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { freshSeed, mulberry32 } from "@/data/skyLayout";
import { useMotion } from "@/hooks/useMotion";

gsap.registerPlugin(ScrollTrigger);

/**
 * SkyDust —— 下半页的全局星野：同一片天往深处走。
 * 两层星尘（远层小星、近层大星）以不同速率视差后退，营造「下潜」感；
 * 星尘配方与首屏一致（每颗独立明灭深度/周期），另加两点极光与一颗流星。
 * 纯装饰：aria-hidden + pointer-events-none；motion=off 时静态星野、无视差。
 */

const TINTS = ["#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffd7f0", "#d0f4ff", "#ffe8a8"];

function makeDust(seed: number, n: number, sizes: number[]) {
  const rng = mulberry32(seed);
  return Array.from({ length: n }, (_, i) => ({
    id: i,
    x: rng() * 100,
    y: rng() * 100,
    size: sizes[Math.floor(rng() * sizes.length)],
    tint: TINTS[Math.floor(rng() * TINTS.length)],
    oMin: 0.05 + rng() * 0.21,
    oMax: 0.13 + rng() * 0.7,
    dur: 2.4 + rng() * 5.2,
    delay: -rng() * 9,
    glow: rng() > 0.85,
  }));
}

const FAR = makeDust(freshSeed(), 70, [1, 1, 1, 1.5]);
const NEAR = makeDust(freshSeed(), 30, [1.5, 1.5, 2.25]);

function DustLayer({ stars, className, motionOn }: { stars: ReturnType<typeof makeDust>; className: string; motionOn: boolean }) {
  return (
    <div className={`absolute inset-0 ${className}`}>
      {stars.map((d) => (
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
  );
}

export default function SkyDust() {
  const { motionOn } = useMotion();
  const ref = useRef<HTMLDivElement>(null);

  // 下潜视差：近层退得快、远层退得慢（scrub 跟随滚动，不打断吸附分页）
  useEffect(() => {
    if (!motionOn || !ref.current) return;
    const ctx = gsap.context(() => {
      const trig = { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: 1 } as const;
      gsap.to(".dust-far", { yPercent: -5, ease: "none", scrollTrigger: trig });
      gsap.to(".dust-near", { yPercent: -12, ease: "none", scrollTrigger: trig });
    }, ref);
    return () => ctx.revert();
  }, [motionOn]);

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {/* 极光余晖（比首屏淡得多） */}
      <div
        className="anim-glow absolute -left-40 top-[12%] h-[30rem] w-[30rem] rounded-full opacity-30"
        style={{ background: "radial-gradient(circle, rgba(var(--violet-rgb),.12), transparent 62%)" }}
      />
      <div
        className="anim-glow absolute -right-40 top-[58%] h-[28rem] w-[28rem] rounded-full opacity-25"
        style={{ background: "radial-gradient(circle, rgba(var(--cyan-rgb),.1), transparent 62%)", animationDelay: "-6s" }}
      />
      <DustLayer stars={FAR} className="dust-far opacity-70" motionOn={motionOn} />
      <DustLayer stars={NEAR} className="dust-near opacity-80" motionOn={motionOn} />
      {/* 一颗下半页专属的流星（班次与首屏错开） */}
      <div className="shooting-star shooting-star-b" style={{ top: "22%", left: "-10%", width: 120 }} />
    </div>
  );
}
