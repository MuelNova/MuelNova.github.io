import Section from "@/components/Section";
import { interests, milestones, sectionTitles } from "@/data/content";

export default function Journey() {
  return (
    <Section id="journey" man={sectionTitles.journey.man} page={sectionTitles.journey.page}>
      {/* 时间线：年份 · 事件 · 出处 的行式索引 */}
      <ol className="doc-list">
        {milestones.map((m) => (
          <li key={m.title} className="doc-row">
            <span className="doc-key w-16 shrink-0">{m.year}</span>
            <span className="w-44 shrink-0 font-mono text-[13px] font-bold" style={{ color: "var(--t1)" }}>
              {m.title}
            </span>
            <span className="min-w-40 flex-1 font-mono text-[12.5px]" style={{ color: "var(--t2)" }}>
              {m.desc}
            </span>
          </li>
        ))}
      </ol>

      {/* 研究兴趣 */}
      <h3 className="doc-key mt-9 mb-3 tracking-[0.18em]">INTERESTS</h3>
      <div className="doc-list">
        {interests.map((it) => (
          <article key={it.title} className="doc-row">
            <h4 className="w-36 shrink-0 font-mono text-[13px] font-bold" style={{ color: "var(--t1)" }}>
              {it.title}
            </h4>
            <p className="min-w-40 flex-1 font-mono text-[12.5px]" style={{ color: "var(--t2)" }}>
              {it.desc}
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}
