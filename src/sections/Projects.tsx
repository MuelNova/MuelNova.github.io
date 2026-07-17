import Section from "@/components/Section";
import CardFace, { ACCENTS } from "@/components/CardFace";
import { projects, sectionTitles, sideProjects, sideQuestsTitle } from "@/data/content";
import type { CSSProperties } from "react";

export default function Projects() {
  return (
    <Section id="projects" kana={sectionTitles.projects.kana} title={sectionTitles.projects.title}>
      {/* 主线：紧凑网格 */}
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <li key={p.name}>
            <a
              href={p.url}
              target="_blank"
              rel="noreferrer"
              className="card-astra card-astra-link group flex h-full flex-col p-4 no-underline"
              style={{ "--accent": ACCENTS.pink } as CSSProperties}
              aria-label={`${p.name} — ${p.desc}（GitHub，新窗口打开）`}
            >
              <CardFace />
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs" style={{ color: "var(--cyan)" }}>
                  {p.tag}
                </span>
                {p.star && <span aria-hidden="true" className="sparkle h-3.5 w-3.5" style={{ background: "var(--yellow)" }} />}
              </div>
              <h3 className="mt-2 break-words font-mono text-[15px] font-bold text-white group-hover:underline">
                {p.name} <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-0.5">↗</span>
              </h3>
              <p className="mt-1.5 flex-1 text-[13px] leading-snug" style={{ color: "var(--muted)" }}>
                {p.desc}
              </p>
              <p className="mt-3 font-mono text-[11px]" style={{ color: "var(--faint)" }}>
                ● {p.lang}
              </p>
            </a>
          </li>
        ))}
      </ul>

      {/* 副业：两列 compact 行 */}
      <h3 className="mt-8 font-pixel text-xs tracking-[0.35em]" style={{ color: "var(--pink)" }}>
        {sideQuestsTitle} <span aria-hidden="true">✦</span>
      </h3>
      <ul className="mt-3 grid gap-x-8 gap-y-1.5 sm:grid-cols-2">
        {sideProjects.map((p) => (
          <li key={p.name}>
            <a
              href={p.url}
              target="_blank"
              rel="noreferrer"
              className="group flex items-baseline justify-between gap-3 border-b py-1.5 no-underline transition-colors hover:bg-white/[0.03]"
              style={{ borderColor: "var(--line)" }}
            >
              <span className="min-w-0 text-[13px]">
                <span className="font-mono font-bold text-white group-hover:underline">{p.name}</span>{" "}
                <span style={{ color: "var(--muted)" }}>{p.desc}</span>
              </span>
              <span className="shrink-0 font-mono text-[11px]" style={{ color: "var(--faint)" }}>
                {p.tag}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}
