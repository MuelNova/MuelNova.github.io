import Section from "@/components/Section";
import CardFace, { ACCENTS } from "@/components/CardFace";
import { sectionTitles, skills } from "@/data/content";
import type { CSSProperties } from "react";

export default function Skills() {
  return (
    <Section id="skills" kana={sectionTitles.skills.kana} title={sectionTitles.skills.title}>
      <div className="grid gap-4 sm:grid-cols-2">
        {skills.map((g) => (
          <div key={g.group} className="card-astra p-5" style={{ "--accent": ACCENTS.violet } as CSSProperties}>
            <CardFace />
            <h3 className="font-pixel text-xs tracking-[0.3em]" style={{ color: "var(--pink)" }}>
              {g.group}
            </h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {g.items.map((s) => (
                <li
                  key={s}
                  className="chip-star rounded-full border px-3 py-1 font-mono text-[13px]"
                  style={{ borderColor: "var(--line)", color: "var(--muted)" }}
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
