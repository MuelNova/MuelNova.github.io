import type { ReactNode } from "react";
import { sectionTotal } from "@/data/content";

/**
 * 下半页章节骨架：man page 的一节。
 * 页眉行（✦ ZM.MD(1) · Personal Manual · 页码）+ 大写节名 + 发丝线 + 内容。
 * 不做滚动显现——内容本来就该在（无 JS / 读屏器 / 打印都直接可读）。
 */
export default function Section({
  id,
  man,
  page,
  children,
}: {
  id: string;
  /** 大写节名，如 ABOUT */
  man: string;
  /** 页码，如 "01" */
  page: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="deck-panel relative mx-auto flex min-h-[100svh] w-full max-w-3xl flex-col justify-center px-5 pb-8 pt-[calc(var(--nav-h)+2rem)]"
    >
      <p aria-hidden="true" className="man-eyebrow">
        <span>
          <span style={{ color: "var(--sig)" }}>✦ </span>ZM.MD(1)
        </span>
        <span className="hidden sm:inline">Personal Manual</span>
        <span>
          {page} / {sectionTotal}
        </span>
      </p>
      <h2 id={`${id}-title`} className="man-title">
        {man}
      </h2>
      <hr className="man-rule" aria-hidden="true" />
      <div className="mt-7">{children}</div>
    </section>
  );
}
