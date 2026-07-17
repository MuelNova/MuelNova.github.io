import Section from "@/components/Section";
import { profile, socials } from "@/data/content";

export default function Contact() {
  return (
    <Section id="contact" kana="コンタクト" title="Contact">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {socials.map((s) => (
          <a
            key={s.label}
            href={s.url}
            target={s.url.startsWith("mailto:") ? undefined : "_blank"}
            rel="noreferrer"
            className="card-cyber group p-5 no-underline"
          >
            <p className="font-pixel text-[11px] tracking-[0.3em]" style={{ color: "var(--cyan)" }}>
              {s.label}
            </p>
            <p className="mt-2 font-mono text-sm font-bold text-white group-hover:underline">
              {s.handle} <span aria-hidden="true">↗</span>
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
