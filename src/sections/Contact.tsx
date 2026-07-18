import Section from "@/components/Section";
import { profile, sectionTitles, socials } from "@/data/content";

/** FILES：联系方式就是手册末尾的文件清单。 */
export default function Contact() {
  return (
    <Section id="contact" man={sectionTitles.contact.man} page={sectionTitles.contact.page}>
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
              <span className="min-w-0 flex-1 font-mono text-[13px] font-bold group-hover:underline" style={{ color: "var(--t1)" }}>
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
