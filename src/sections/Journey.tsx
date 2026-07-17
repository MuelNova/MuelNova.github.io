import Section from "@/components/Section";
import CardFace from "@/components/CardFace";
import { interests, milestones, sectionTitles } from "@/data/content";
import type { CSSProperties } from "react";

const accent: Record<string, string> = {
  pink: "var(--pink)",
  cyan: "var(--cyan)",
  violet: "var(--violet)",
  yellow: "var(--yellow)",
};

export default function Journey() {
  return (
    <Section id="journey" kana={sectionTitles.journey.kana} title={sectionTitles.journey.title}>
      {/* 时间线（横向三格） */}
      <ol className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {milestones.map((m) => (
          <li key={m.title} className="card-astra relative p-5" style={{ "--accent": accent[m.color] } as CSSProperties}>
            <CardFace />
            <p className="mt-2 font-mono text-xs tracking-widest" style={{ color: accent[m.color] }}>
              {m.year}
            </p>
            <h3 className="mt-1 text-lg font-black">{m.title}</h3>
            <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>{m.desc}</p>
          </li>
        ))}
      </ol>

      {/* 研究兴趣 */}
      <div className="mt-8 grid gap-5 sm:grid-cols-3">
        {interests.map((it) => (
          <article key={it.title} className="card-astra p-5" style={{ "--accent": accent[it.accent] } as CSSProperties}>
            <CardFace />
            <p aria-hidden="true" className="text-xl" style={{ color: accent[it.accent] }}>
              {it.icon}
            </p>
            <h3 className="mt-2 font-black">{it.title}</h3>
            <p className="mt-1.5 text-sm" style={{ color: "var(--muted)" }}>
              {it.desc}
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}
