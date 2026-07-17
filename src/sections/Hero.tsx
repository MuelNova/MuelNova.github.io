import { hero, profile } from "@/data/content";

/** 首屏：编辑式大字 + 一句自我介绍 + 侧标小注。无开屏动画，进页即见。 */
export default function Hero() {
  return (
    <div id="top" className="relative flex min-h-[92svh] flex-col justify-center overflow-hidden">
      <div className="relative z-10 mx-auto w-full max-w-5xl px-5 pt-24">
        <p
          className="font-pixel text-sm tracking-[0.5em]"
          style={{ color: "var(--cyan)", animation: "rise-in .7s var(--ease-out) both" }}
        >
          {profile.kana}
        </p>

        <h1
          className="text-neon mt-4 select-none font-black leading-[0.95] tracking-tight"
          style={{
            fontSize: "clamp(3rem, 10vw, 7rem)",
            animation: "pop-in .8s var(--ease-pop) both",
            animationDelay: "0.1s",
          }}
        >
          Muel
          <span
            aria-hidden="true"
            className="sparkle anim-star mx-2 inline-block h-[0.42em] w-[0.42em]"
            style={{ background: "var(--yellow)", verticalAlign: "baseline" }}
          />
          Nova
        </h1>

        <p
          className="mt-5 font-mono text-sm tracking-wide"
          style={{ color: "var(--pink)", animation: "rise-in .7s var(--ease-out) both", animationDelay: "0.22s" }}
        >
          {profile.role}
        </p>

        <p
          className="mt-6 max-w-2xl text-lg leading-relaxed"
          style={{ color: "var(--muted)", animation: "rise-in .7s var(--ease-out) both", animationDelay: "0.34s" }}
        >
          {hero.intro}
        </p>

        {/* 侧标小注 */}
        <dl
          className="mt-10 grid max-w-2xl grid-cols-1 gap-4 border-l-2 pl-5 sm:grid-cols-3"
          style={{
            borderColor: "var(--line)",
            animation: "rise-in .7s var(--ease-out) both",
            animationDelay: "0.46s",
          }}
        >
          {hero.notes.map((n) => (
            <div key={n.k}>
              <dt className="font-pixel text-[11px] tracking-[0.25em]" style={{ color: "var(--faint)" }}>
                {n.k}
              </dt>
              <dd className="mt-1 whitespace-nowrap font-mono text-[13px]" style={{ color: "var(--ink)" }}>
                {n.v}
              </dd>
            </div>
          ))}
        </dl>

        <div
          className="mt-10 flex flex-wrap items-center gap-5"
          style={{ animation: "rise-in .7s var(--ease-out) both", animationDelay: "0.58s" }}
        >
          <a href="#about" className="link-magical font-bold">
            往下看 ↓
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer" className="link-magical font-mono text-sm">
            github ↗
          </a>
          <a href={profile.blog} target="_blank" rel="noreferrer" className="link-magical font-mono text-sm">
            blog ↗
          </a>
        </div>
      </div>

      {/* 底部滚动提示（细线 + 星） */}
      <div aria-hidden="true" className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-center">
        <span className="sparkle anim-twinkle mx-auto block h-3 w-3" style={{ background: "var(--pink)" }} />
        <span className="mt-2 block h-10 w-px" style={{ background: "linear-gradient(var(--line), transparent)" }} />
      </div>
    </div>
  );
}
