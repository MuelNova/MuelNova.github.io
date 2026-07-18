import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { nav, profile } from "@/data/content";
import { useMotion } from "@/hooks/useMotion";

const NAV_IDS = nav.map((n) => n.id);
/** 标签里手写的 ✦ 由星标组件接管，避免重复 */
const clean = (label: string) => label.replace(/^✦\s*/, "");

/** 滚动侦查：视口中段（-40% ~ -55% 带状区）落在哪个 section，哪个就是「当前星」 */
function useScrollSpy() {
  const [active, setActive] = useState(NAV_IDS[0]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    NAV_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return active;
}

/** 是否还悬在星空首屏上（决定导航是「浮在天上」还是「凝成仪器」）
 *  迟滞：几乎飞出首屏才凝壳（<8%），明显回到首屏才展开（>30%）——
 *  否则磁吸/吸附停在边界附近时两态反复翻转，肉眼看到的就是「抖一下」。
 *  注意：IO 会把一拍内连穿多条阈值的记录合并成一次回调（磁吸 expo 前段极快，
 *  三条阈值常合并成一帧），必须取批次的最后一条作为最终状态——只读第一条会
 *  把「已回到首屏」判丢，导航就卡在胶囊态再不铺开。 */
function useOverSky() {
  const [over, setOver] = useState(true);
  useEffect(() => {
    const el = document.getElementById("sky");
    if (!el) return;
    const o = new IntersectionObserver(
      (entries) => {
        const e = entries[entries.length - 1];
        setOver((prev) => (prev ? e.intersectionRatio > 0.08 : e.intersectionRatio > 0.3));
      },
      { threshold: [0, 0.08, 0.3] }
    );
    o.observe(el);
    return () => o.disconnect();
  }, []);
  return over;
}

/** 四角星标：默认描边，hover 旋转亮起，当前章节实心带辉光（星图上的「你在这里」） */
function StarMark({ active }: { active?: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 10 10" className={`nav-star${active ? " nav-star-active" : ""}`}>
      <path d="M5 0 L6.1 3.9 L10 5 L6.1 6.1 L5 10 L3.9 6.1 L0 5 L3.9 3.9 Z" />
    </svg>
  );
}

export default function Nav() {
  const { motionOn, toggle } = useMotion();
  const [open, setOpen] = useState(false);
  const active = useScrollSpy();
  const overSky = useOverSky();

  // 两态切换时子块的铺 ⇆ 拢：外壳瞬时切换排布（此刻透明，切换本身看不见），
  // 用 FLIP 让词标 / 链接组 / 操作组从旧排布滑入新排布；毛玻璃外观由 CSS 过渡接管。
  // 宽度绝不做动画——fit-content 内禀尺寸插值不可靠，且宽度补间会把链接挤换行，
  // 肉眼就是「高一下又突然矮回去」。
  const shellRef = useRef<HTMLElement>(null);
  const prevOver = useRef(overSky);
  const prevRects = useRef<DOMRect[] | null>(null);
  const flips = useRef(new Set<Animation>());

  // 无依赖数组：每次提交都跑。空闲（无在途 FLIP）时持续记录真实排布，
  // 滚动侦查重渲染、窗口 resize、字体晚载造成的位移都被自然吸收。
  useLayoutEffect(() => {
    const el = shellRef.current;
    if (!el) return;
    const kids = Array.from(el.children) as HTMLElement[];
    const flipping = prevOver.current !== overSky;
    prevOver.current = overSky;
    if (!flipping) {
      if (flips.current.size === 0) prevRects.current = kids.map((k) => k.getBoundingClientRect());
      return;
    }
    // 视觉位置含在途 FLIP 的位移；先取消，量到的才是新布局的真实位置。
    // 只取消自己建的动画（getAnimations 会误伤子项自身的 hover/颜色过渡）
    const visual = kids.map((k) => k.getBoundingClientRect());
    flips.current.forEach((a) => a.cancel());
    const base = kids.map((k) => k.getBoundingClientRect());
    const prev = prevRects.current;
    prevRects.current = base;
    if (!motionOn) return;
    kids.forEach((k, i) => {
      // 优先从被打断的可视位置接起；否则从上一布局滑来
      let dx = visual[i].left - base[i].left;
      let dy = visual[i].top - base[i].top;
      if (Math.abs(dx) < 1 && Math.abs(dy) < 1 && prev) {
        dx = prev[i].left - base[i].left;
        dy = prev[i].top - base[i].top;
      }
      if (Math.abs(dx) < 1 && Math.abs(dy) < 1) return;
      const anim = k.animate(
        [{ transform: `translate(${dx}px, ${dy}px)` }, { transform: "translate(0px, 0px)" }],
        { duration: 500, easing: "cubic-bezier(0.16, 1, 0.3, 1)" } // --ease-out
      );
      flips.current.add(anim);
      const settle = () => flips.current.delete(anim);
      anim.finished.then(settle, settle);
    });
  });

  // 全屏菜单打开时：Esc 关闭 + 锁背景滚动
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav
        ref={shellRef}
        aria-label="主导航"
        className={
          overSky
            ? "nav-shell nav-over-sky mx-3 flex items-center justify-between gap-3 rounded-full border px-4 sm:mx-5"
            : "nav-shell mx-auto flex w-fit max-w-[calc(100vw-1.5rem)] items-center justify-between gap-4 rounded-full border px-4"
        }
        style={
          overSky
            ? { marginTop: "1rem", padding: "0.625rem 1rem", background: "transparent", borderColor: "transparent" }
            : {
                marginTop: "0.75rem",
                padding: "0.45rem 1.25rem",
                background: "rgba(14,14,16,.62)",
                borderColor: "rgba(255,255,255,.12)",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
                boxShadow: "0 10px 36px -18px rgba(0,0,0,.85), inset 0 1px 0 rgba(255,255,255,.06)",
              }
        }
      >
        {/* 词标：zm✦md，句点换成一颗明灭的小星 */}
        <a href="#sky" aria-label="zm.md" className="text-chroma flex items-center font-pixel text-lg tracking-wider" style={{ color: "var(--pink)" }}>
          zm<span aria-hidden="true" className="sparkle anim-twinkle mx-[2px] inline-block h-2.5 w-2.5" style={{ background: "var(--cyan)" }} />md
        </a>

        <ul className="hidden items-center gap-0.5 md:flex">
          {nav.map((n) => (
            <li key={n.id}>
              <a
                href={`#${n.id}`}
                aria-current={active === n.id ? "location" : undefined}
                className="flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-sm transition-colors"
                style={{
                  color: active === n.id ? "var(--ink)" : "var(--muted)",
                  textShadow: active === n.id ? "0 0 14px rgba(255,110,199,.6)" : undefined,
                }}
              >
                <StarMark active={active === n.id} />
                {clean(n.label)}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            aria-pressed={motionOn}
            title={motionOn ? "关闭动效" : "开启动效"}
            className="flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-mono text-xs transition hover:bg-white/5"
            style={{ borderColor: overSky ? "transparent" : "var(--line)", color: "var(--muted)" }}
          >
            <span className="relative inline-flex h-3 w-3 items-center justify-center">
              {motionOn && (
                <span aria-hidden="true" className="anim-spin-slow absolute -inset-1 rounded-full border border-dashed" style={{ borderColor: "rgba(255,224,102,.65)" }} />
              )}
              <span aria-hidden="true" className="text-[10px] leading-none">{motionOn ? "✦" : "✧"}</span>
            </span>
            {motionOn ? "motion" : "still"}
            <span className="sr-only">切换动效</span>
          </button>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-full px-3 py-1.5 font-mono text-xs transition hover:bg-white/5 sm:block"
            style={{ color: "var(--cyan)" }}
          >
            github ↗
          </a>
          <button
            className="rounded-full px-3 py-1.5 text-sm transition hover:bg-white/5 md:hidden"
            style={{ color: "var(--ink)" }}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">打开菜单</span>
            <span aria-hidden="true">{open ? "✕" : "☰"}</span>
          </button>
        </div>
      </nav>

      {/* 移动端全屏星空菜单：项随星标错峰弹入 */}
      {open && (
        <div id="mobile-nav" role="dialog" aria-modal="true" aria-label="导航菜单" className="fixed inset-0 z-[60] flex flex-col md:hidden" style={{ background: "linear-gradient(180deg, #150c26 0%, var(--bg) 70%)" }}>
          <div aria-hidden="true" className="texture-dots pointer-events-none absolute inset-0 opacity-40" />
          <div aria-hidden="true" className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full" style={{ background: "radial-gradient(circle, rgba(255,230,180,.28), transparent 70%)" }} />
          <button
            className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border text-base backdrop-blur-sm"
            style={{ color: "var(--ink)", borderColor: "var(--line)", background: "rgba(11,7,19,.55)" }}
            aria-label="关闭菜单"
            onClick={() => setOpen(false)}
          >
            ✕
          </button>
          <ul className="relative flex flex-1 flex-col items-center justify-center gap-7">
            {nav.map((n, i) => (
              <li key={n.id} style={{ animation: `pop-in .6s var(--ease-pop) both ${0.08 + i * 0.05}s` }}>
                <a
                  href={`#${n.id}`}
                  onClick={() => setOpen(false)}
                  aria-current={active === n.id ? "location" : undefined}
                  className="flex items-center gap-3 text-2xl font-black tracking-wide"
                  style={{ color: active === n.id ? "var(--ink)" : "var(--muted)" }}
                >
                  <StarMark active={active === n.id} />
                  {clean(n.label)}
                </a>
              </li>
            ))}
            <li style={{ animation: `pop-in .6s var(--ease-pop) both ${0.08 + nav.length * 0.05}s` }}>
              <a href={profile.github} target="_blank" rel="noreferrer" className="font-mono text-sm" style={{ color: "var(--cyan)" }}>
                github ↗
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
