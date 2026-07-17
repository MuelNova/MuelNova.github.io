import { chrome, marqueeWords, profile } from "@/data/content";

// 轨道 = 两个相同半区，动画平移 -50% 无缝循环 ⟹ 单半宽度必须 ≥ 视口宽。
// 一份词约 925px，6 份 ≈ 5.5k px，覆盖 5K 宽屏；时长在 CSS 里同步放长以维持原速。
const HALF = Array.from({ length: 6 }, () => marqueeWords).flat();

export default function Footer() {
  return (
    <footer
      className="relative z-10 border-t"
      style={{ borderColor: "var(--line)" }}
    >
      {/* 细带跑马灯（克制度：只在页脚） */}
      <div
        aria-hidden="true"
        className="overflow-hidden border-b py-2.5"
        style={{ borderColor: "var(--line)" }}
      >
        <div
          className="anim-marquee flex w-max gap-8 whitespace-nowrap font-pixel text-xs tracking-[0.3em]"
          style={{ color: "var(--faint)" }}
        >
          {[...HALF, ...HALF].map((w, i) => (
            <span key={i}>
              {w} <span style={{ color: "var(--pink)" }}>✦</span>
            </span>
          ))}
        </div>
      </div>

      <div className="py-10 text-center">
        <p
          className="font-pixel text-sm tracking-[0.3em]"
          style={{ color: "var(--pink)" }}
        >
          {chrome.footerLine}
        </p>
        <p className="mt-3 font-mono text-xs" style={{ color: "var(--faint)" }}>
          © {new Date().getFullYear()} {profile.name} ·{" "}
          <a className="link-magical" href={profile.blog}>
            nova.gal
          </a>{" "}
          · <span style={{ color: "var(--cyan)" }}>zm.md</span>
        </p>
      </div>
    </footer>
  );
}
