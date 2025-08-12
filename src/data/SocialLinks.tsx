import clsx from "clsx";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

import styles from "./SocialLinks.module.css";

export type SocialLinkData = Readonly<{
  alt: string;
  url: string;
  faIcon: IconDefinition;
}>

export type SocialLinksProps = Readonly<{
  data: readonly SocialLinkData[];
}>

export const SocialLinks: React.FC<SocialLinksProps> = ({ data }) => {
  const socialLinksComponents = data.map(({ alt, url, faIcon }) => (
    <div className={clsx("col", styles.col)} key={alt}>
      <a
        href={url}
        target="_blank"
        className={clsx("button button--outline button--primary", styles.btn)}
      >
        <FontAwesomeIcon title={alt} icon={faIcon} size="2x" />
        <span className={styles.btnText}>{alt}</span>
      </a>
    </div>
  ));

  return (
    <div className={clsx("row", styles.socialLinks)}>
      {socialLinksComponents}
    </div>
  );
};
