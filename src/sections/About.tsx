import Section from "@/components/Section";
import { about } from "@/data/content";

export default function About() {
  return (
    <Section id="about" kana="アバウト" title="About">
      <div className="grid gap-6 md:grid-cols-5">
        <div className="space-y-3.5 md:col-span-3">
          {about.paragraphs.map((p, i) => (
            <p key={i} className="text-[15px] leading-relaxed" style={{ color: i === 0 ? "var(--ink)" : "var(--muted)" }}>
              {p}
            </p>
          ))}
        </div>
        <dl className="card-cyber h-fit p-5 font-mono text-[13px] md:col-span-2">
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
