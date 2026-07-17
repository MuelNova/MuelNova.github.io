import { useState } from "react";
import Section from "@/components/Section";
import CardFace, { ACCENTS } from "@/components/CardFace";
import { cliCmds, profile, sectionTitles } from "@/data/content";
import type { CSSProperties } from "react";

/** $ curl zm.md —— 深空测控台：三条命令，真的可以「跑」。 */
export default function CliSection() {
  const [activeId, setActiveId] = useState(cliCmds[0].id);
  const active = cliCmds.find((c) => c.id === activeId) ?? cliCmds[0];

  return (
    <Section id="cv" kana={sectionTitles.cv.kana} title={sectionTitles.cv.title}>
      <div className="reveal card-astra mx-auto max-w-2xl" style={{ "--accent": ACCENTS.cyan } as CSSProperties}>
        <CardFace />
        {/* 台头：提示符身份 + raw 出口 */}
        <div className="flex items-center justify-between border-b px-5 py-3" style={{ borderColor: "var(--line)" }}>
          <p className="font-mono text-xs" aria-hidden="true">
            <span style={{ color: "var(--pink)" }}>nova</span>
            <span style={{ color: "var(--faint)" }}>@</span>
            <span style={{ color: "var(--cyan)" }}>isekai</span>
            <span style={{ color: "var(--faint)" }}> : ~</span>
          </p>
          <a
            href={profile.cvTxt}
            type="text/plain"
            className="font-mono text-xs transition hover:underline"
            style={{ color: "var(--faint)" }}
          >
            raw ↗
          </a>
        </div>

        {/* 命令行：三条命令，点哪个跑哪个 */}
        <div className="flex flex-wrap gap-2 px-5 pt-4" role="group" aria-label="选择要运行的命令">
          {cliCmds.map((c) => {
            const on = c.id === activeId;
            return (
              <button
                key={c.id}
                onClick={() => setActiveId(c.id)}
                aria-pressed={on}
                className="rounded-full border px-3 py-1 font-mono text-[11px] transition-colors"
                style={{
                  borderColor: on ? "var(--cyan)" : "var(--line)",
                  color: on ? "var(--ink)" : "var(--faint)",
                  background: on ? "rgba(var(--cyan-rgb), 0.1)" : "transparent",
                }}
              >
                {c.cmd}
              </button>
            );
          })}
        </div>

        {/* 输出：换命令时逐行重新「打印」 */}
        <div className="overflow-x-auto p-5 font-mono text-[13px] leading-6" aria-live="polite">
          <p>
            <span style={{ color: "var(--pink)" }}>$ </span>
            <span style={{ color: "var(--ink)" }}>{active.cmd}</span>
          </p>
          <pre key={active.id} aria-label={`${active.cmd} 的输出`} style={{ color: "var(--muted)" }}>
            {active.output.split("\n").map((line, i) => (
              <span key={i} className="block" style={{ animation: `rise-in .4s var(--ease-out) both ${0.06 + i * 0.035}s` }}>
                {line || "\u00a0"}
              </span>
            ))}
          </pre>
          <p className="mt-1">
            <span style={{ color: "var(--pink)" }}>$ </span>
            <span className="anim-caret inline-block h-3.5 w-2 align-middle" style={{ background: "var(--cyan)" }} aria-hidden="true" />
          </p>
        </div>
      </div>
    </Section>
  );
}
