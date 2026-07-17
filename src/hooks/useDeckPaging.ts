import { useEffect } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useMotion } from "@/hooks/useMotion";

gsap.registerPlugin(ScrollToPlugin);

/**
 * deck 磁吸（仅桌面 pointer:fine 且 motion=on 时接管）：
 * 滚动全程原生跟手；一次手势停稳后，用一记短促的 GSAP 补间把视图吸到吸附点：
 *   · 轻拂（位移 < NOTCH）        → 弹回最近吸附点
 *   · 明确翻页（≥ NOTCH，滚轮一格/触控板重拂） → 沿手势方向翻一页
 *   · 大惯性甩过好几页            → 就近落点，不做长距离回拉
 * 取代浏览器又慢又软的原生 snap 收尾；触屏 / 关动效时退回 CSS scroll-snap。
 *
 * 吸附点 = #sky / 各 .deck-panel 的顶部（start），footer 停靠文档底部（end）。
 * 高于一屏的 panel 内部不磁吸，保持自由阅读。
 * 磁吸进行中用户一动手（滚轮/触摸/键盘），立即 kill 补间、控制权交还。
 */

const SETTLE_MS = 90; // 滚动空闲这么久认为一次手势结束（磁吸启动延迟）
const NOTCH = 90; // 手势累计位移达到它即视为「翻一页」意图
const NEAREST_MAX = 0.6; // 就近吸附允许的最大距离（屏高比）
const DIRECT_MAX = 1.1; // 定向翻页允许的最大回拉距离（屏高比）
const EASE = "expo.out"; // 与全站 --ease-out 同族的收尾曲线

function docY(el: HTMLElement): number {
  return el.getBoundingClientRect().top + window.scrollY;
}

function snapEls(): HTMLElement[] {
  return Array.from(
    document.querySelectorAll<HTMLElement>("#sky, .deck-panel, footer"),
  );
}

function snapY(el: HTMLElement): number {
  return el.tagName === "FOOTER"
    ? docY(el) + el.offsetHeight - window.innerHeight
    : docY(el);
}

export function useDeckPaging() {
  const { motionOn } = useMotion();

  useEffect(() => {
    if (!motionOn || !window.matchMedia("(pointer: fine)").matches) return;

    // 标记后 CSS 端同步关闭：原生 scroll-snap、全局 smooth（见 index.css），避免与补间打架
    const root = document.documentElement;
    root.setAttribute("data-paging", "");

    let gliding = false;
    let settleTimer = 0;
    let lastArrowKey = 0;
    // 手势识别：累计一次连贯滚动的位移与起点（触控板惯性天然是连续事件流）
    let acc = 0;
    let startY: number | null = null;
    let lastWheel = 0;

    const magnetTo = (target: number) => {
      const dist = Math.abs(target - window.scrollY);
      gliding = true;
      gsap.to(window, {
        // 近的快、远的略慢，但全程短促
        duration: Math.min(0.55, 0.25 + 0.4 * (dist / window.innerHeight)),
        ease: EASE,
        overwrite: true,
        scrollTo: { y: target },
        onComplete: () => (gliding = false),
        onInterrupt: () => (gliding = false),
      });
    };

    /** 用户一动手（滚轮/触摸/键盘滚动），磁吸立即让位、控制权交还 */
    const kill = () => {
      gsap.killTweensOf(window);
      gliding = false;
    };

    /** 当前视口是否正卡在超高 panel 内部（此时保持自由滚动，不磁吸） */
    const insideTallPanel = (): boolean => {
      const y = window.scrollY;
      const vh = window.innerHeight;
      const tol = 2;
      for (const el of snapEls()) {
        if (el.offsetHeight <= vh) continue;
        const top = docY(el);
        if (y > top + tol && y + vh < top + el.offsetHeight - tol) return true;
      }
      return false;
    };

    const settleOnce = () => {
      // 惯性尾巴还在进 wheel 事件的话，顺延到真正停稳
      const quiet = performance.now() - lastWheel;
      if (quiet < SETTLE_MS) {
        settleTimer = window.setTimeout(settleOnce, SETTLE_MS - quiet);
        return;
      }
      if (gliding || performance.now() - lastArrowKey <= 1200) return;

      const y = window.scrollY;
      const vh = window.innerHeight;
      const tol = 2;
      if (insideTallPanel()) return;

      const pts = snapEls().map(snapY);
      const nearest = pts.reduce((a, b) =>
        Math.abs(b - y) < Math.abs(a - y) ? b : a,
      );
      let target = nearest;
      let maxDist = vh * NEAREST_MAX;

      // 有明确位移的手势：沿方向翻一页；若惯性已冲过那一页，则就近落点
      if (startY != null && Math.abs(acc) >= NOTCH) {
        const dir = acc > 0 ? 1 : -1;
        const directed =
          dir === 1
            ? pts.find((p) => p > startY! + tol)
            : [...pts].reverse().find((p) => p < startY! - tol);
        if (directed != null) {
          const overshot = dir === 1 ? y > directed : y < directed;
          target = overshot ? nearest : directed;
          maxDist = vh * DIRECT_MAX;
        }
      }

      if (Math.abs(target - y) > tol && Math.abs(target - y) < maxDist)
        magnetTo(target);
    };

    const onWheel = (e: WheelEvent) => {
      kill();
      const now = performance.now();
      if (startY == null || now - lastWheel > SETTLE_MS) {
        acc = 0;
        startY = window.scrollY;
      }
      lastWheel = now;
      acc += e.deltaY;
    };

    const onScroll = () => {
      if (gliding) return;
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(settleOnce, SETTLE_MS);
    };

    // 方向键用于超高 panel 内小幅细读，读后立刻回吸会很烦，留 1.2s 宽限
    const onKeydown = (e: KeyboardEvent) => {
      if (["ArrowDown", "ArrowUp"].includes(e.key)) {
        kill();
        lastArrowKey = performance.now();
      } else if (["PageDown", "PageUp", " ", "Home", "End"].includes(e.key)) {
        kill();
      }
    };

    // 页内锚点（Nav、skip link、logo）：直接磁吸到目标吸附点
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest?.(
        'a[href^="#"]',
      ) as HTMLAnchorElement | null;
      if (!a) return;
      const el = document.getElementById(a.getAttribute("href")!.slice(1));
      if (!el) return;
      e.preventDefault();
      magnetTo(snapY(el as HTMLElement));
    };

    // 滑动全程原生跟手（不 preventDefault），只在停稳后接管；用户输入随时 kill 磁吸
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", kill, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKeydown);
    document.addEventListener("click", onClick, true);

    return () => {
      root.removeAttribute("data-paging");
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", kill);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKeydown);
      document.removeEventListener("click", onClick, true);
      window.clearTimeout(settleTimer);
      gsap.killTweensOf(window);
    };
  }, [motionOn]);
}
