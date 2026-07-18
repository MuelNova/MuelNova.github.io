import Section from "@/components/Section";
import { about, sectionTitles } from "@/data/content";

export default function About() {
  return (
    <Section id="about" man={sectionTitles.about.man} page={sectionTitles.about.page}>
      <div className="grid gap-8 md:grid-cols-5">
        {/* DESCRIPTION：手册正文，等宽长读 */}
        <div className="space-y-4 md:col-span-3">
          {about.paragraphs.map((p, i) => (
            <p
              key={i}
              className="font-mono text-[13px] leading-[1.9]"
              style={{ color: i === 0 ? "var(--t1)" : "var(--t2)" }}
            >
              {p}
            </p>
          ))}
        </div>
        {/* ENVIRONMENT：键值行 */}
        <dl className="doc-list h-fit md:col-span-2">
          {about.facts.map((f) => (
            <div key={f.k} className="doc-row">
              <dt className="doc-key w-[5.5rem] shrink-0">{f.k.toUpperCase()}</dt>
              <dd className="min-w-0 flex-1 font-mono text-[13px]" style={{ color: "var(--t1)" }}>
                {f.v}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
