import type { ReactNode } from "react";

/** 全屏章节骨架：片假名 + 标题 + 内容。Deck 模式下每个 section 撑满一屏。 */
export default function Section({
  id,
  kana,
  title,
  children,
}: {
  id: string;
  kana: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="deck-panel relative mx-auto flex min-h-[100svh] w-full max-w-5xl flex-col justify-center px-5 pb-8 pt-[calc(var(--nav-h)+2rem)]"
    >
      <p aria-hidden="true" className="reveal font-pixel text-sm tracking-[0.4em]" style={{ color: "var(--pink)" }}>
        {kana}
      </p>
      <h2 id={`${id}-title`} className="reveal mt-2 text-3xl font-black tracking-tight sm:text-4xl" style={{ animationDelay: "0.08s" }}>
        {title}
        <span aria-hidden="true" style={{ color: "var(--cyan)" }}>.</span>
      </h2>
      <div className="reveal mt-6 sm:mt-8" style={{ animationDelay: "0.16s" }}>{children}</div>
    </section>
  );
}
