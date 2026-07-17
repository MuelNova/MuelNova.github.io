import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import StarSky from "@/components/StarSky";
import StarNode from "@/components/StarNode";
import { constellationLines, heroStar, stars } from "@/data/stars";
import { useMotion } from "@/hooks/useMotion";

gsap.registerPlugin(ScrollTrigger);

const LINES = constellationLines(stars);
const LINE_COLORS: Record<string, string> = {
  core: "rgba(255,110,199,.5)",
  build: "rgba(255,224,102,.45)",
  link: "rgba(94,231,255,.45)",
};

/**
 * 星空首屏：满屏 anime 夜空，星星悬停/聚焦/触摸展开，
 * 滚动时镜头缓缓推进穿越星域。motion=off 时全部静态可点。
 */
export default function StarField() {
  const { motionOn } = useMotion();
  const [openId, setOpenId] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const skyRef = useRef<HTMLDivElement>(null);
  const anyOpen = openId !== null;

  // 滚动推进：星野轻微视差 + 星星向后退，营造「穿过星空」
  useEffect(() => {
    if (!motionOn || !rootRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(".star-layer", {
        yPercent: -14,
        scale: 1.12,
        ease: "none",
        scrollTrigger: { trigger: rootRef.current, start: "top top", end: "bottom top", scrub: 1 },
      });
      gsap.to(".sky-layer", {
        yPercent: 6,
        ease: "none",
        scrollTrigger: { trigger: rootRef.current, start: "top top", end: "bottom top", scrub: 1 },
      });
      gsap.to(".hero-copy", {
        yPercent: -30,
        ease: "none",
        scrollTrigger: { trigger: rootRef.current, start: "top top", end: "40% top", scrub: 1 },
      });
    }, rootRef);
    return () => ctx.revert();
  }, [motionOn]);

  return (
    <div ref={rootRef} id="sky" className="relative min-h-[100svh] overflow-hidden" aria-label="星空导航">
      <div ref={skyRef} className="sky-layer absolute inset-0">
        <StarSky />
      </div>

      {/* 中央标题（初始可见；有星展开时淡出，让气泡卡清爽） */}
      <div
        className="hero-copy pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center px-5 text-center"
        style={{ opacity: anyOpen ? 0.12 : 1, transition: "opacity .35s ease" }}
      >
        <p className="font-pixel text-sm tracking-[0.5em]" style={{ color: "var(--cyan)", animation: "rise-in .8s var(--ease-out) both .2s" }}>
          {heroStar.kana}
        </p>
        <h1
          className="text-neon mt-3 font-black leading-none tracking-tight"
          style={{ fontSize: "clamp(2.8rem, 9vw, 6.2rem)", animation: "pop-in .9s var(--ease-pop) both .35s" }}
        >
          {heroStar.name.split(" ")[0]}
          <span aria-hidden="true" className="sparkle anim-star mx-2 inline-block h-[0.4em] w-[0.4em]" style={{ background: "var(--yellow)" }} />
          {heroStar.name.split(" ")[1]}
        </h1>
        <p className="mt-4 font-mono text-sm tracking-wide" style={{ color: "var(--pink)", animation: "rise-in .8s var(--ease-out) both .5s" }}>
          {heroStar.role}
        </p>
        <p className="mt-3 max-w-md text-[15px]" style={{ color: "var(--muted)", animation: "rise-in .8s var(--ease-out) both .62s" }}>
          {heroStar.line}
        </p>
      </div>

      {/* 星座连线（移动端星星收拢，连线隐藏） */}
      <svg className="star-layer absolute inset-0 hidden h-full w-full sm:block" style={{ zIndex: 5 }} aria-hidden="true">
        {LINES.map((l) => (
          <line
            key={l.key}
            x1={`${l.x1}%`} y1={`${l.y1}%`} x2={`${l.x2}%`} y2={`${l.y2}%`}
            stroke={Object.values(LINE_COLORS).find((_, i) => i === 0)}
            strokeWidth="1"
            strokeDasharray="3 6"
            className="constellation-line"
            style={{ stroke: "rgba(244,239,255,.18)" }}
          />
        ))}
      </svg>

      {/* 星星层（气泡卡需盖过中央标题层） */}
      <div className="star-layer absolute inset-0" style={{ zIndex: 30 }}>
        {stars.map((s) => (
          <StarNode
            key={s.id}
            star={s}
            open={openId === s.id}
            onToggle={() => setOpenId(openId === s.id ? null : s.id)}
            onClose={() => setOpenId(null)}
          />
        ))}
      </div>

      {/* 底部提示 */}
      <div className="hero-copy pointer-events-none absolute bottom-7 left-1/2 z-20 -translate-x-1/2 text-center">
        <p className="font-pixel text-[11px] tracking-[0.3em]" style={{ color: "var(--faint)" }}>{heroStar.hint}</p>
        <span aria-hidden="true" className="sparkle anim-twinkle mx-auto mt-2 block h-3 w-3" style={{ background: "var(--pink)" }} />
      </div>
    </div>
  );
}
