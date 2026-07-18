import { chrome, profile } from "@/data/content";

/** 手册的最后一行：man page 的页脚（zm.md(1) · 年份 · MUELNOVA(1)）。 */
export default function Footer() {
  return (
    <footer className="relative z-10 border-t" style={{ borderColor: "var(--hairline)" }}>
      <div className="mx-auto w-full max-w-3xl px-5 py-10">
        <p aria-hidden="true" className="man-eyebrow">
          <span>zm.md(1)</span>
          <span className="hidden sm:inline">2026</span>
          <span>MUELNOVA(1)</span>
        </p>
        <hr className="man-rule" aria-hidden="true" />
        <p className="mt-8 text-center font-mono text-[12px] tracking-[0.22em]" style={{ color: "var(--t2)" }}>
          <span style={{ color: "var(--sig)" }}>✦</span>
          {" "}{chrome.footerLine.replace(/^✦\s*|\s*✦$/g, "")}{" "}
          <span style={{ color: "var(--sig)" }}>✦</span>
        </p>
        <p className="mt-3 text-center font-mono text-[11px]" style={{ color: "var(--t3)" }}>
          © {new Date().getFullYear()} {profile.name} ·{" "}
          <a
            href={profile.blog}
            className="underline decoration-from-font underline-offset-4 transition hover:opacity-80"
            style={{ color: "var(--accent)" }}
          >
            nova.gal/blog
          </a>{" "}
          · <span style={{ color: "var(--sig)" }}>zm.md</span> · 39.9042° N, 116.4074° E
        </p>
      </div>
    </footer>
  );
}
