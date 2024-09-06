import clsx from "clsx";
import React, { FunctionComponent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./SocialLinks.module.css";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export interface SocialLinkData {
  alt: string;
  url: string;
  faIcon: IconDefinition;
}

export interface SocialLinksProps {
  data: SocialLinkData[];
}

export const SocialLinks: FunctionComponent<SocialLinksProps> = ({ data }) => {
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
