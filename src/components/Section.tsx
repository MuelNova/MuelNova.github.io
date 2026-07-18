import type { ReactNode } from "react";

/** 四角星本体（与导航星标同一个形状），平移缩放到星座节点上 */
function Star({ cx, cy, k, fill, delay }: { cx: number; cy: number; k: number; fill: string; delay: number }) {
  return (
    <path
      className="constel-star"
      d="M5 0 L6.1 3.9 L10 5 L6.1 6.1 L5 10 L3.9 6.1 L0 5 L3.9 3.9 Z"
      transform={`translate(${cx - 5 * k} ${cy - 5 * k}) scale(${k})`}
      fill={fill}
      style={{ animationDelay: `${delay}s` }}
    />
  );
}

/**
 * 下半页章节骨架：片假名 + 标题 + 会描画自己的星座枝。
 * 星空语言的三大件一次给齐；入视动画由 useRevealAll 加 .in-view 触发。
 */
export default function Section({
  id,
  kana,
  title,
  children,
}: {
  id: string;
  kana: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="deck-panel relative mx-auto flex min-h-[100svh] w-full max-w-3xl flex-col justify-center px-5 pb-8 pt-[calc(var(--nav-h)+2rem)]"
    >
      <p aria-hidden="true" className="reveal font-pixel text-sm tracking-[0.4em]" style={{ color: "var(--sig)" }}>
        {kana}
      </p>
      <div className="reveal mt-2 flex items-center gap-5" style={{ animationDelay: "0.08s" }}>
        <h2 id={`${id}-title`} className="shrink-0 text-3xl font-black tracking-tight sm:text-4xl">
          {title}
          <span aria-hidden="true" style={{ color: "var(--accent)" }}>
            .
          </span>
        </h2>
        {/* 星座枝：标题旁的一小段星空，入视时两段连线描画、三颗星错峰弹入 */}
        <svg className="hidden h-8 w-48 shrink-0 sm:block" viewBox="0 0 190 32" fill="none" aria-hidden="true">
          <line className="constel-seg" x1="10" y1="22" x2="96" y2="9" pathLength={100} stroke="rgba(var(--cyan-rgb),.5)" strokeWidth="1" />
          <line className="constel-seg seg-2" x1="96" y1="9" x2="180" y2="19" pathLength={100} stroke="rgba(var(--cyan-rgb),.4)" strokeWidth="1" />
          <Star cx={10} cy={22} k={1.1} fill="var(--pink)" delay={0.05} />
          <Star cx={96} cy={9} k={0.85} fill="var(--cyan)" delay={0.55} />
          <Star cx={180} cy={19} k={1.25} fill="var(--yellow)" delay={1.15} />
        </svg>
      </div>
      <div className="reveal mt-6 sm:mt-8" style={{ animationDelay: "0.16s" }}>
        {children}
      </div>
    </section>
  );
}
