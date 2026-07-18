import Section from "@/components/Section";
import { sectionTitles, skills } from "@/data/content";

/** ENVIRONMENT 式键值行：组名作键，技能点值内联——不数 chip。 */
export default function Skills() {
  return (
    <Section id="skills" man={sectionTitles.skills.man} page={sectionTitles.skills.page}>
      <dl className="doc-list">
        {skills.map((g) => (
          <div key={g.group} className="doc-row">
            <dt className="doc-key w-28 shrink-0">{g.group.toUpperCase()}</dt>
            <dd className="min-w-0 flex-1 font-mono text-[13px]" style={{ color: "var(--t1)" }}>
              {g.items.join("  ·  ")}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
