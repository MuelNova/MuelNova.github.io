import Section from "@/components/Section";
import { profile } from "@/data/content";

const CMD = "curl zm.md";
const OUTPUT = `MUELNOVA(1)         User Commands        MUELNOVA(1)

NAME
  muel — security researcher, CTF pwner, cat person

SYNOPSIS
  curl zm.md            这份纯文本简历
  curl zm.md/cv.md      Markdown 版
  curl -L zm.md/pdf     PDF 版（重定向）

DESCRIPTION
  THU@vul337 · PKU@pkucclab · 天枢Dubhe PWNer (retired)
  Python / Go / TS / C++ · GDB / pwntools / angr
  github.com/MuelNova · muel@nova.gal · nova.gal/blog

SEE ALSO
  在浏览器里打开同一个地址，就是你正在看的这个站。`;

/** $ curl zm.md —— 不解释，直接演示。 */
export default function CliSection() {
  return (
    <Section id="cv" kana="シーヴィー" title="cv">
      <div className="reveal term-window mx-auto max-w-2xl overflow-x-auto p-6 text-[13px] leading-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="h-3 w-3 rounded-full" style={{ background: "var(--pink)" }} />
            <span className="h-3 w-3 rounded-full" style={{ background: "var(--yellow)" }} />
            <span className="h-3 w-3 rounded-full" style={{ background: "var(--cyan)" }} />
          </div>
          <a
            href={profile.cvTxt}
            type="text/plain"
            className="font-mono text-xs transition hover:underline"
            style={{ color: "var(--faint)" }}
          >
            raw ↗
          </a>
        </div>
        <pre aria-label={`${CMD} 的输出`} style={{ color: "var(--muted)" }}>
          <span style={{ color: "var(--pink)" }}>$ </span>
          {CMD}
          {"\n"}
          {OUTPUT}
          <span className="anim-caret mt-1 inline-block h-3.5 w-2" style={{ background: "var(--cyan)" }} aria-hidden="true" />
        </pre>
      </div>
    </Section>
  );
}
