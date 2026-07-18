import Section from "@/components/Section";
import CardFace, { ACCENTS } from "@/components/CardFace";
import { sectionTitles, skills } from "@/data/content";
import type { CSSProperties } from "react";

/** 四张仪器卡，光谱轮换（粉 → 青 → 紫 → 黄） */
const SPECTRAL = [ACCENTS.pink, ACCENTS.cyan, ACCENTS.violet, ACCENTS.yellow];

export default function Skills() {
  return (
    <Section id="skills" kana={sectionTitles.skills.kana} title={sectionTitles.skills.title}>
      <div className="grid gap-4 sm:grid-cols-2">
        {skills.map((g, i) => (
          <div
            key={g.group}
            className="card-astra p-5"
            style={{ "--accent": SPECTRAL[i % SPECTRAL.length] } as CSSProperties}
          >
            <CardFace />
            <h3 className="font-pixel text-xs tracking-[0.3em]" style={{ color: "var(--sig)" }}>
              {g.group}
            </h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {g.items.map((s) => (
                <li
                  key={s}
                  className="chip-star rounded-full px-3 py-1 font-mono text-[13px]"
                  style={{ color: "var(--t2)" }}
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
