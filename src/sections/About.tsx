import Section from "@/components/Section";
import CardFace, { ACCENTS } from "@/components/CardFace";
import { about, sectionTitles } from "@/data/content";
import type { CSSProperties } from "react";

export default function About() {
  return (
    <Section id="about" kana={sectionTitles.about.kana} title={sectionTitles.about.title}>
      <div className="grid gap-8 md:grid-cols-5">
        {/* 正文三段 */}
        <div className="space-y-4 md:col-span-3">
          {about.paragraphs.map((p, i) => (
            <p
              key={i}
              className="text-[15px] leading-[1.85]"
              style={{ color: i === 0 ? "var(--t1)" : "var(--t2)" }}
            >
              {p}
            </p>
          ))}
        </div>
        {/* 现状观测卡：签名粉的光谱 + 键值行 */}
        <dl
          className="card-astra h-fit p-5 font-mono text-[13px] md:col-span-2"
          style={{ "--accent": ACCENTS.pink } as CSSProperties}
        >
          <CardFace />
          {about.facts.map((f, i) => (
            <div
              key={f.k}
              className={i > 0 ? "mt-3 border-t pt-3" : ""}
              style={{ borderColor: "var(--hairline)" }}
            >
              <dt className="text-xs" style={{ color: "var(--accent)" }}>
                :: {f.k}
              </dt>
              <dd className="mt-0.5" style={{ color: "var(--t2)" }}>
                {f.v}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}

