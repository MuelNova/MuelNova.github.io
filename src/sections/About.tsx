import Section from "@/components/Section";
import CardFace, { ACCENTS } from "@/components/CardFace";
import { about, sectionTitles } from "@/data/content";
import type { CSSProperties } from "react";

export default function About() {
  return (
    <Section id="about" kana={sectionTitles.about.kana} title={sectionTitles.about.title}>
      <div className="grid gap-6 md:grid-cols-5">
        <div className="space-y-3.5 md:col-span-3">
          {about.paragraphs.map((p, i) => (
            <p key={i} className="text-[15px] leading-relaxed" style={{ color: i === 0 ? "var(--ink)" : "var(--muted)" }}>
              {p}
            </p>
          ))}
        </div>
        <dl className="card-astra h-fit p-5 font-mono text-[13px] md:col-span-2" style={{ "--accent": ACCENTS.cyan } as CSSProperties}>
          <CardFace />
          {about.facts.map((f) => (
            <div key={f.k} className="mb-3 last:mb-0">
              <dt className="text-xs" style={{ color: "var(--cyan)" }}>
                :: {f.k}
              </dt>
              <dd className="mt-0.5" style={{ color: "var(--muted)" }}>
                {f.v}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
