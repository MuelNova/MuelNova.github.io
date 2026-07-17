import { useEffect, useRef, useState } from "react";
import { useMotion } from "@/hooks/useMotion";

const TRAIL_TINTS = ["#ffffff", "var(--pink)", "var(--cyan)", "var(--yellow)"];
const SPAWN_GAP = 26; // px，鼠标每移动这么远落一粒星屑
const MAX_PARTICLES = 18;

/**
 * 魔法棒光标：一颗四角星以 lerp 平滑跟随指针，沿途散落星屑。
 * 只在「精确指针（鼠标）+ 动效开」时挂载；纯装饰，不取代原生光标。
 */
export default function WandCursor() {
  const { motionOn } = useMotion();
  const [finePointer, setFinePointer] = useState(false);
  const layerRef = useRef<HTMLDivElement>(null);
  const starRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const on = () => setFinePointer(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  const enabled = motionOn && finePointer;

  useEffect(() => {
    if (!enabled) return;
    const layer = layerRef.current;
    const star = starRef.current;
    if (!layer || !star) return;

    let raf = 0;
    let tx = 0, ty = 0, x = 0, y = 0;
    let started = false;
    let lastSX = 0, lastSY = 0;

    const spawn = (px: number, py: number) => {
      // children[0] 是主星，星屑满了就摘最旧的一粒
      if (layer.childElementCount > MAX_PARTICLES && layer.children[1]) {
        layer.children[1].remove();
      }
      const p = document.createElement("span");
      const size = 3 + Math.random() * 5;
      p.className = "wand-trail-particle sparkle";
      p.style.left = `${px - size / 2}px`;
      p.style.top = `${py - size / 2}px`;
      p.style.width = `${size}px`;
      p.style.height = `${size}px`;
      p.style.background = TRAIL_TINTS[Math.floor(Math.random() * TRAIL_TINTS.length)];
      p.addEventListener("animationend", () => p.remove());
      layer.appendChild(p);
    };

    const onMove = (e: PointerEvent) => {
      const r = layer.getBoundingClientRect();
      const px = e.clientX - r.left;
      const py = e.clientY - r.top;
      if (px < 0 || py < 0 || px > r.width || py > r.height) {
        star.style.opacity = "0";
        return;
      }
      tx = px;
      ty = py;
      if (!started) {
        x = px;
        y = py;
        lastSX = px;
        lastSY = py;
        started = true;
      }
      star.style.opacity = "1";
      const dx = px - lastSX;
      const dy = py - lastSY;
      if (dx * dx + dy * dy > SPAWN_GAP * SPAWN_GAP) {
        lastSX = px;
        lastSY = py;
        spawn(px, py);
      }
    };

    const tick = () => {
      x += (tx - x) * 0.16;
      y += (ty - y) * 0.16;
      star.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
      Array.from(layer.children).forEach((c) => {
        if (c !== star) c.remove();
      });
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div ref={layerRef} className="wand-layer z-[80]" aria-hidden="true">
      <div ref={starRef} className="wand-star" style={{ opacity: 0, transition: "opacity .3s ease" }}>
        <span className="sparkle anim-spin-slow block h-4 w-4" style={{ background: "#fff", animationDuration: "5s" }} />
      </div>
    </div>
  );
}
