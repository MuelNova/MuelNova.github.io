import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { Star } from "@/data/stars";

/** 窄屏时用移动端坐标 */
function useIsMobile() {
  const [m, setM] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const on = () => setM(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return m;
}

const COLORS: Record<Star["color"], { core: string; glow: string }> = {
  pink: { core: "#ff6ec7", glow: "rgba(255,110,199," },
  cyan: { core: "#5ee7ff", glow: "rgba(94,231,255," },
  violet: { core: "#a487ff", glow: "rgba(164,135,255," },
  yellow: { core: "#ffe066", glow: "rgba(255,224,102," },
};

/** 单颗星：按钮语义，hover/focus/tap 展开气泡卡。 */
export default function StarNode({
  star,
  open,
  onToggle,
  onClose,
}: {
  star: Star;
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
}) {
  const c = COLORS[star.color];
  const [hover, setHover] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  // 移动端触屏的 hover/focus 会粘住（按钮不会失焦），只认 open，否则卡片关不掉
  const active = open || (!isMobile && hover);
  const sx = isMobile && star.mx != null ? star.mx : star.x;
  const sy = isMobile && star.my != null ? star.my : star.y;

  // Esc 关闭
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // 气泡卡朝向：星在右半屏往左弹，左半屏往右弹；太靠上往下，太靠下往上
  const flipX = sx > 55;
  const flipY = sy > 55;

  return (
    <div
      ref={wrapRef}
      className="anim-star-drift absolute"
      style={{ left: `${sx}%`, top: `${sy}%`, animationDelay: `${star.drift}s`, zIndex: active ? 30 : 10 }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <button
        aria-expanded={open}
        aria-label={`${star.label}：${open ? "收起" : "展开"}`}
        onClick={onToggle}
        onFocus={() => setHover(true)}
        onBlur={() => setHover(false)}
        className="group relative block cursor-pointer border-0 bg-transparent p-3"
        style={{ transform: "translate(-50%, -50%)" }}
      >
        {/* 星环（激活时扩散） */}
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 rounded-full border-2 transition-all duration-500"
          style={{
            width: star.size * 2.4,
            height: star.size * 2.4,
            transform: `translate(-50%,-50%) scale(${active ? 1 : 0.3})`,
            borderColor: `${c.glow}${active ? 0.7 : 0})`,
            boxShadow: active ? `0 0 30px ${c.glow}0.5)` : "none",
          }}
        />
        {/* 四角星体 */}
        <span
          aria-hidden="true"
          className={`sparkle block transition-transform duration-300 ${star.featured ? "anim-twinkle" : ""}`}
          style={{
            width: star.size,
            height: star.size,
            background: c.core,
            transform: `scale(${active ? 1.35 : 1}) rotate(${active ? 45 : 0}deg)`,
            boxShadow: `0 0 ${star.size}px ${c.glow}0.9), 0 0 ${star.size * 2}px ${c.glow}0.4)`,
            animationDelay: `${star.drift}s`,
          }}
        />
        {/* 星名小注 */}
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap font-pixel text-[10px] tracking-[0.2em] transition-opacity"
          style={{ color: c.core, opacity: active || star.featured ? 0.95 : 0.55 }}
        >
          {star.kicker}
        </span>
      </button>

      {/* 气泡卡：桌面原位弹出；移动端 Portal 到 body 屏幕居中（避开 transformed 祖先） */}
      {isMobile ? (
        createPortal(
          <>
            <div
              className="star-card-backdrop"
              data-open={active}
              onClick={onClose}
              aria-hidden="true"
            />
            <div role="dialog" aria-label={star.label} className="star-card-mobile" data-open={active}>
              <CardBody star={star} color={c.core} />
            </div>
          </>,
          document.body
        )
      ) : (
        <div
          role="dialog"
          aria-label={star.label}
          className="star-card"
          style={{
            [flipX ? "right" : "left"]: "50%",
            [flipY ? "bottom" : "top"]: "calc(100% + 14px)",
            transformOrigin: `${flipX ? "right" : "left"} ${flipY ? "bottom" : "top"}`,
            zIndex: 60,
          }}
          data-open={active}
        >
          <CardBody star={star} color={c.core} />
        </div>
      )}
    </div>
  );
}

function CardBody({ star, color }: { star: Star; color: string }) {
  const ct = star.content;
  return (
    <div
      className="w-[78vw] max-w-xs rounded-2xl border p-4 backdrop-blur-md sm:w-72 sm:max-w-none"
      style={{
        background: "rgba(20,10,36,.88)",
        borderColor: color,
        boxShadow: `0 8px 40px -8px ${color}55, 0 0 0 1px ${color}22`,
      }}
    >
      <p className="font-pixel text-[10px] tracking-[0.3em]" style={{ color }}>{star.kicker}</p>
      <h3 className="mt-1 font-black text-white">{ct.title}</h3>

      {ct.kind === "text" && (
        <>
          <p className="mt-2 whitespace-pre-line text-[13px] leading-relaxed" style={{ color: "var(--muted)" }}>{ct.body}</p>
          {ct.foot && <p className="mt-2 font-mono text-[11px]" style={{ color: "var(--faint)" }}>{ct.foot}</p>}
        </>
      )}

      {ct.kind === "list" && (
        <ul className="mt-2 space-y-1.5">
          {ct.items.map((it) => (
            <li key={it.name}>
              <a href={it.url} target="_blank" rel="noreferrer" className="group text-[13px] no-underline">
                <span className="font-mono font-bold text-white group-hover:underline">{it.name} ↗</span>{" "}
                <span style={{ color: "var(--muted)" }}>{it.desc}</span>
              </a>
            </li>
          ))}
        </ul>
      )}

      {ct.kind === "links" && (
        <ul className="mt-2 space-y-1.5">
          {ct.links.map((l) => (
            <li key={l.label}>
              <a href={l.url} target={l.url.startsWith("mailto:") ? undefined : "_blank"} rel="noreferrer" className="group flex justify-between text-[13px] no-underline">
                <span className="font-pixel text-[10px] tracking-widest" style={{ color }}>{l.label}</span>
                <span className="font-mono text-white group-hover:underline">{l.handle} ↗</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
