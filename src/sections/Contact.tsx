import Section from "@/components/Section";
import { profile, sectionTitles, socials } from "@/data/content";

/** 联络星表：整行即链接，GPG 指纹压底。 */
export default function Contact() {
  return (
    <Section id="contact" kana={sectionTitles.contact.kana} title={sectionTitles.contact.title}>
      <ul className="doc-list">
        {socials.map((s) => (
          <li key={s.label}>
            <a
              href={s.url}
              target={s.url.startsWith("mailto:") ? undefined : "_blank"}
              rel="noreferrer"
              className="doc-row group"
            >
              <span className="doc-key w-24 shrink-0">{s.label.toUpperCase()}</span>
              <span className="doc-name min-w-0 flex-1 font-mono text-[13px] font-bold group-hover:underline" style={{ color: "var(--t1)" }}>
                {s.handle}
              </span>
              <span aria-hidden="true" className="doc-arrow">
                ↗
              </span>
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-6 font-mono text-[11.5px] leading-relaxed" style={{ color: "var(--t3)" }}>
        GPG&nbsp;&nbsp;{profile.gpg}
      </p>
    </Section>
  );
}
