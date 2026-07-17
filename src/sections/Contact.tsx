import Section from "@/components/Section";
import CardFace, { ACCENTS } from "@/components/CardFace";
import { profile, sectionTitles, socials } from "@/data/content";
import type { CSSProperties } from "react";

export default function Contact() {
  return (
    <Section id="contact" kana={sectionTitles.contact.kana} title={sectionTitles.contact.title}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {socials.map((s) => (
          <a
            key={s.label}
            href={s.url}
            target={s.url.startsWith("mailto:") ? undefined : "_blank"}
            rel="noreferrer"
            className="card-astra card-astra-link group p-5 no-underline"
            style={{ "--accent": ACCENTS.cyan } as CSSProperties}
          >
            <CardFace />
            <p className="font-pixel text-[11px] tracking-[0.3em]" style={{ color: "var(--cyan)" }}>
              {s.label}
            </p>
            <p className="mt-2 font-mono text-sm font-bold text-white group-hover:underline">
              {s.handle} <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-0.5">↗</span>
            </p>
          </a>
        ))}
      </div>
      <p className="mt-8 font-mono text-xs" style={{ color: "var(--faint)" }}>
        GPG: {profile.gpg}
      </p>
    </Section>
  );
}
