import Section from "@/components/Section";
import { interests, milestones } from "@/data/content";

const accent: Record<string, string> = {
  pink: "var(--pink)",
  cyan: "var(--cyan)",
  violet: "var(--violet)",
};

export default function Journey() {
  return (
    <Section id="journey" kana="タビジ" title="Journey & Interests">
      {/* 时间线（横向三格） */}
      <ol className="grid gap-5 sm:grid-cols-3">
        {milestones.map((m) => (
          <li key={m.title} className="card-cyber relative p-5">
            <span
              aria-hidden="true"
              className="sparkle absolute -top-2 left-5 h-4 w-4"
              style={{ background: accent[m.color], boxShadow: `0 0 10px ${accent[m.color]}` }}
            />
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
          <article key={it.title} className="rounded-xl border p-5" style={{ borderColor: "var(--line)" }}>
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
