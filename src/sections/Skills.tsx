import Section from "@/components/Section";
import { skills } from "@/data/content";

export default function Skills() {
  return (
    <Section id="skills" kana="スキル" title="Skills">
      <div className="grid gap-4 sm:grid-cols-2">
        {skills.map((g) => (
          <div key={g.group} className="card-cyber p-5">
            <h3 className="font-pixel text-xs tracking-[0.3em]" style={{ color: "var(--pink)" }}>
              {g.group}
            </h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {g.items.map((s) => (
                <li
                  key={s}
                  className="rounded-full border px-3 py-1 font-mono text-[13px] transition-transform hover:scale-105"
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
