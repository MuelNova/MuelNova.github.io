import Section from "@/components/Section";
import { projects, sectionTitles, sideProjects, sideQuestsTitle } from "@/data/content";

/**
 * 项目星表：整行即链接，发丝线分隔。
 * hover 给月色底 + 名字辉光，↗ 染色移位；focus-visible 同权。
 */
export default function Projects() {
  return (
    <Section id="projects" kana={sectionTitles.projects.kana} title={sectionTitles.projects.title}>
      <ul className="doc-list">
        {projects.map((p) => (
          <li key={p.name}>
            <a
              href={p.url}
              target="_blank"
              rel="noreferrer"
              className="doc-row group"
              aria-label={`${p.name} — ${p.desc}（GitHub，新窗口打开）`}
            >
              <span className="order-1 flex items-baseline gap-2 font-mono text-[13px] font-bold sm:order-none" style={{ color: "var(--t1)" }}>
                <span className="doc-name group-hover:underline">{p.name}</span>
                {p.stars != null && (
                  <span className="text-[11.5px] font-normal" style={{ color: "var(--star-y)" }}>
                    ★{p.stars}
                  </span>
                )}
              </span>
              <span className="order-4 basis-full font-mono text-[12.5px] sm:order-none sm:min-w-40 sm:basis-0 sm:grow" style={{ color: "var(--t2)" }}>
                {p.desc}
              </span>
              <span className="doc-key order-2 ml-auto sm:order-none sm:ml-0">
                {p.lang} · {p.tag}
              </span>
              <span aria-hidden="true" className="doc-arrow order-3 sm:order-none">
                ↗
              </span>
            </a>
          </li>
        ))}
      </ul>

      <h3 className="doc-key mt-9 mb-3 tracking-[0.18em]">
        {sideQuestsTitle} <span aria-hidden="true" style={{ color: "var(--sig)" }}>✦</span>
      </h3>
      <ul className="doc-list">
        {sideProjects.map((p) => (
          <li key={p.name}>
            <a
              href={p.url}
              target="_blank"
              rel="noreferrer"
              className="doc-row group"
              aria-label={`${p.name} — ${p.desc}（GitHub，新窗口打开）`}
            >
              <span className="doc-name order-1 font-mono text-[12.5px] font-bold group-hover:underline sm:order-none" style={{ color: "var(--t1)" }}>
                {p.name}
              </span>
              <span className="order-4 basis-full font-mono text-[12px] sm:order-none sm:min-w-40 sm:basis-0 sm:grow" style={{ color: "var(--t2)" }}>
                {p.desc}
              </span>
              <span className="doc-key order-2 ml-auto sm:order-none sm:ml-0">{p.tag}</span>
              <span aria-hidden="true" className="doc-arrow order-3 sm:order-none">
                ↗
              </span>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}
