import { useEffect, useRef, useState } from "react";
import Section from "@/components/Section";
import { cliCmds, profile, sectionTitles } from "@/data/content";
import { parseAnsiLines, type AnsiSeg } from "@/lib/ansi";
import cvTxtRaw from "../../public/cv.txt?raw";
import cvMdRaw from "../../public/cv.md?raw";

/**
 * $ curl zm.md —— 这个域名同时是一台 CV 服务器。
 * 终端里渲染的是真字节：public/cv.txt 与 cv.md 经 ?raw 原样内联，
 * cv.txt 的 ANSI 色（mandoc 的粗体/粉/青）逐段透传成 CSS 变量色；
 * pdf 标签页是 302 → 200 的 HTTP 实录（content-length 现场 HEAD 取得）。
 */

type CmdId = (typeof cliCmds)[number]["id"];

const TXT_LINES = parseAnsiLines(cvTxtRaw);
const MD_LINES = cvMdRaw.replace(/\n$/, "").split("\n");

const inkOf = (s: AnsiSeg) =>
  s.ink === "sig" ? "var(--sig)" : s.ink === "accent" ? "var(--accent)" : "var(--t2)";

function AnsiLine({ segs }: { segs: AnsiSeg[] }) {
  if (segs.length === 0) return <>&nbsp;</>;
  return (
    <>
      {segs.map((s, i) => (
        <span
          key={i}
          style={{
            color: inkOf(s),
            fontWeight: s.bold ? 700 : 400,
            textDecoration: s.underline ? "underline" : undefined,
          }}
        >
          {s.text}
        </span>
      ))}
    </>
  );
}

/** 每行错峰淡入的延迟（只在 motion=on 时 CSS 才消费它） */
const delayOf = (i: number) => ({ animationDelay: `${Math.min(i * 0.03, 1.2)}s` });

/** 含方块/盒线字符的行（ASCII art）走系统等宽：Google Fonts 的 JetBrains Mono
    子集 unicode-range 覆盖了 U+2580–259F 但字形缺，会画成空心 .notdef */
const ART_FONT = '"SF Mono", Menlo, Consolas, "DejaVu Sans Mono", "PingFang SC", monospace';
const hasArt = (segs: AnsiSeg[]) => segs.some((s) => /[\u2500-\u259F]/.test(s.text));

export default function CliSection() {
  const [active, setActive] = useState<CmdId>("txt");
  const [copied, setCopied] = useState(false);
  const [pdfBytes, setPdfBytes] = useState<number | null>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const copyTimer = useRef<number | undefined>(undefined);

  const activeIdx = cliCmds.findIndex((c) => c.id === active);
  const activeCmd = cliCmds[activeIdx];

  // content-length 现场取（dev 由 vite 伺服，生产由 CF Assets 伺服）
  useEffect(() => {
    fetch("/cv.pdf", { method: "HEAD" })
      .then((r) => {
        const n = Number(r.headers.get("content-length"));
        if (r.ok && Number.isFinite(n) && n > 0) setPdfBytes(n);
      })
      .catch(() => {});
    return () => window.clearTimeout(copyTimer.current);
  }, []);

  const copyCmd = async () => {
    try {
      await navigator.clipboard.writeText(activeCmd.cmd);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = activeCmd.cmd;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
    window.clearTimeout(copyTimer.current);
    copyTimer.current = window.setTimeout(() => setCopied(false), 1600);
  };

  // ARIA tabs：方向键循环、Home/End 跳首尾，激活即聚焦（自动激活模式）
  const onTabsKeyDown = (e: React.KeyboardEvent) => {
    const last = cliCmds.length - 1;
    let next: number | null = null;
    if (e.key === "ArrowRight") next = activeIdx === last ? 0 : activeIdx + 1;
    else if (e.key === "ArrowLeft") next = activeIdx === 0 ? last : activeIdx - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    if (next === null) return;
    e.preventDefault();
    setActive(cliCmds[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <Section id="cv" man={sectionTitles.cv.man} page={sectionTitles.cv.page}>
      <p className="mb-5 max-w-xl font-mono text-[13px] leading-relaxed" style={{ color: "var(--t2)" }}>
        同一个域名，两种打开方式：浏览器里是星空，终端里是简历。
        挑一条命令「跑」一下——返回的是真字节。
      </p>

      <div className="term">
        {/* 台头：提示符身份 + raw 出口 + 复制命令 */}
        <div className="term-titlebar">
          <p aria-hidden="true">
            <span style={{ color: "var(--sig)" }}>nova</span>@<span style={{ color: "var(--accent)" }}>zm.md</span>:~
          </p>
          <div className="flex items-center gap-2">
            <a
              href={profile.cvTxt}
              type="text/plain"
              className="transition hover:underline"
              style={{ color: "var(--t3)" }}
            >
              raw ↗
            </a>
            <button
              type="button"
              onClick={copyCmd}
              data-copied={copied}
              className="term-copy"
              aria-label={`复制命令 ${activeCmd.cmd}`}
            >
              {copied ? "copied ✓" : "copy cmd"}
            </button>
          </div>
        </div>

        {/* 三条命令（tablist）：点哪条跑哪条 */}
        <div className="term-tabs" role="tablist" aria-label="选择要运行的命令" onKeyDown={onTabsKeyDown}>
          {cliCmds.map((c, i) => {
            const on = c.id === active;
            return (
              <button
                key={c.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`cv-tab-${c.id}`}
                aria-selected={on}
                aria-controls="cv-panel"
                tabIndex={on ? 0 : -1}
                onClick={() => setActive(c.id)}
                className="term-tab"
              >
                {c.cmd}
              </button>
            );
          })}
        </div>

        {/* 输出：换命令时逐行重新「打印」 */}
        <div
          className="term-body"
          role="tabpanel"
          id="cv-panel"
          aria-labelledby={`cv-tab-${active}`}
          aria-live="polite"
        >
          <p style={{ color: "var(--t1)" }}>
            <span style={{ color: "var(--sig)" }}>$ </span>
            {activeCmd.cmd}
          </p>

          {active === "txt" && (
            <pre key="txt" aria-label="curl zm.md 的输出（cv.txt 原文，含 ANSI 着色）" className="mt-1">
              {TXT_LINES.map((segs, i) => {
                const art = hasArt(segs);
                return (
                  <span
                    key={i}
                    className="term-out-line"
                    style={{ ...delayOf(i), ...(art ? { fontFamily: ART_FONT } : null) }}
                    aria-hidden={art || undefined}
                  >
                    <AnsiLine segs={segs} />
                  </span>
                );
              })}
            </pre>
          )}

          {active === "md" && (
            <pre key="md" aria-label="curl zm.md/cv.md 的输出（cv.md 原文）" className="mt-1" style={{ color: "var(--t2)" }}>
              {MD_LINES.map((line, i) => (
                <span key={i} className="term-out-line" style={delayOf(i)}>
                  {line || " "}
                </span>
              ))}
            </pre>
          )}

          {active === "pdf" && (
            <div key="pdf">
              <pre aria-label="curl -sIL zm.md/pdf 的输出（302 → 200 实录）" className="mt-1">
                <span className="term-out-line" style={{ color: "var(--t1)", ...delayOf(0) }}>
                  HTTP/2 302
                </span>
                <span className="term-out-line" style={{ color: "var(--t2)", ...delayOf(1) }}>
                  location: /cv.pdf
                </span>
                <span className="term-out-line" style={delayOf(2)}>
                  &nbsp;
                </span>
                <span className="term-out-line" style={{ color: "var(--t1)", ...delayOf(3) }}>
                  HTTP/2 200
                </span>
                <span className="term-out-line" style={{ color: "var(--t2)", ...delayOf(4) }}>
                  content-type: application/pdf
                </span>
                {pdfBytes != null && (
                  <span className="term-out-line" style={{ color: "var(--t2)", ...delayOf(5) }}>
                    content-length: {pdfBytes}
                  </span>
                )}
              </pre>
              <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
                <a href="/cv.pdf" download="cv.pdf" className="term-copy" style={{ textDecoration: "none" }}>
                  ↓ cv.pdf
                </a>
                <span className="doc-key"># 拿到文件本身：curl -L zm.md/pdf -o cv.pdf</span>
              </div>
            </div>
          )}

          <p className="mt-1">
            <span style={{ color: "var(--sig)" }}>$ </span>
            <span
              className="anim-caret inline-block h-3.5 w-[7px] align-middle"
              style={{ background: "var(--accent)" }}
              aria-hidden="true"
            />
          </p>
        </div>
      </div>

      <p className="mt-4 font-mono text-[11px] leading-relaxed" style={{ color: "var(--t3)" }}>
        # 输出是 public/cv.txt · cv.md 的逐字内容，ANSI 原样透传；PDF 是一页排成 man page 的简历，由 Cloudflare Worker 302 提供。
      </p>
    </Section>
  );
}
