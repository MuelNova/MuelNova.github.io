import { useEffect, useRef } from "react";

/**
 * 滚动显现：给容器内所有 .reveal 元素在进入视口时加 .in-view。
 * CSS 负责动画本身（blur + 上浮）；motion=off 时 .reveal 直接可见。
 * 同一 IO 也喂给章节头星座的描画动画（.in-view 挂在 section 上）。
 */
export function useRevealAll<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const els = Array.from(root.querySelectorAll<HTMLElement>(".reveal, .deck-panel"));
    if (els.length === 0) return;

    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in-view"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("in-view");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return ref;
}
