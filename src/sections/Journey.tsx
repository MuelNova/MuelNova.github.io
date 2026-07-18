import Section from "@/components/Section";
import CardFace, { ACCENTS } from "@/components/CardFace";
import { interests, milestones, sectionTitles } from "@/data/content";
import type { CSSProperties } from "react";

/** 每颗星有自己的颜色——就是首屏星星的色谱 */
const accent: Record<string, string> = {
  pink: ACCENTS.pink,
  cyan: ACCENTS.cyan,
  violet: ACCENTS.violet,
  yellow: ACCENTS.yellow,
};

export default function Journey() {
  return (
    <Section id="journey" kana={sectionTitles.journey.kana} title={sectionTitles.journey.title}>
      {/* 时间线：四张观测卡，各自的光谱色 */}
      <ol className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {milestones.map((m) => (
          <li
            key={m.title}
            className="card-astra relative p-5"
            style={{ "--accent": accent[m.color] } as CSSProperties}
          >
            <CardFace />
            <p className="mt-2 font-mono text-xs tracking-widest" style={{ color: accent[m.color] }}>
              {m.year}
            </p>
            <h3 className="mt-1 text-lg font-black">{m.title}</h3>
            <p className="mt-1 text-sm" style={{ color: "var(--t2)" }}>
              {m.desc}
            </p>
          </li>
        ))}
      </ol>

      {/* 研究兴趣 */}
      <div className="mt-8 grid gap-5 sm:grid-cols-3">
        {interests.map((it) => (
          <article
            key={it.title}
            className="card-astra p-5"
            style={{ "--accent": accent[it.accent] } as CSSProperties}
          >
            <CardFace />
            <span aria-hidden="true" className="sparkle anim-twinkle block h-4 w-4" style={{ background: accent[it.accent] }} />
            <h3 className="mt-2 font-black">{it.title}</h3>
            <p className="mt-1.5 text-sm" style={{ color: "var(--t2)" }}>
              {it.desc}
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}
