import { useState } from "react";
import { nav, profile } from "@/data/content";
import { useMotion } from "@/hooks/useMotion";

export default function Nav() {
  const { motionOn, toggle } = useMotion();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav
        aria-label="主导航"
        className="mx-auto mt-4 flex max-w-5xl items-center justify-between gap-3 rounded-2xl border px-4 py-2.5 backdrop-blur-md sm:mx-4 lg:mx-auto"
        style={{ background: "rgba(11,7,19,.72)", borderColor: "var(--line)" }}
      >
        <a
          href="#sky"
          className="font-pixel text-lg tracking-wider"
          style={{ color: "var(--pink)" }}
        >
          zm<span style={{ color: "var(--cyan)" }}>.</span>md
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {nav.map((n) => (
            <li key={n.id}>
              <a
                href={`#${n.id}`}
                className="rounded-lg px-3 py-1.5 text-sm transition hover:bg-white/5"
                style={{ color: "var(--muted)" }}
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            aria-pressed={motionOn}
            title={motionOn ? "关闭动效" : "开启动效"}
            className="rounded-lg border px-3 py-1.5 font-mono text-xs transition hover:bg-white/5"
            style={{ borderColor: "var(--line)", color: "var(--muted)" }}
          >
            <span aria-hidden="true">{motionOn ? "✦ motion" : "✧ still"}</span>
            <span className="sr-only">切换动效</span>
          </button>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-lg px-3 py-1.5 font-mono text-xs transition hover:bg-white/5 sm:block"
            style={{ color: "var(--cyan)" }}
          >
            github ↗
          </a>
          <button
            className="rounded-lg border px-3 py-1.5 text-sm md:hidden"
            style={{ borderColor: "var(--line)" }}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">打开菜单</span>
            <span aria-hidden="true">{open ? "✕" : "☰"}</span>
          </button>
        </div>
      </nav>

      {open && (
        <ul
          id="mobile-nav"
          className="mx-4 mt-2 rounded-2xl border p-2 backdrop-blur-md md:hidden"
          style={{ background: "rgba(11,7,19,.92)", borderColor: "var(--line)" }}
        >
          {nav.map((n) => (
            <li key={n.id}>
              <a
                href={`#${n.id}`}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-4 py-2.5 text-sm"
                style={{ color: "var(--muted)" }}
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
