import { chrome, profile } from "@/data/content";

/** 页脚：夜空收尾——像素签名行 + 版权行 + 一颗明灭的小星。 */
export default function Footer() {
  return (
    <footer className="relative z-10 border-t" style={{ borderColor: "var(--line)" }}>
      <div className="py-10 text-center">
        <p className="font-pixel text-sm tracking-[0.3em]" style={{ color: "var(--pink)" }}>
          {chrome.footerLine}
        </p>
        <p className="mt-3 font-mono text-xs" style={{ color: "var(--t3)" }}>
          © {new Date().getFullYear()} {profile.name} ·{" "}
          <a
            href={profile.blog}
            className="underline decoration-from-font underline-offset-4 transition hover:opacity-80"
            style={{ color: "var(--accent)" }}
          >
            nova.gal/blog
          </a>{" "}
          · <span style={{ color: "var(--sig)" }}>zm.md</span>
        </p>
        <span aria-hidden="true" className="sparkle anim-twinkle mx-auto mt-5 block h-3 w-3" style={{ background: "var(--pink)" }} />
      </div>
    </footer>
  );
}
