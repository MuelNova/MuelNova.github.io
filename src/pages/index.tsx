import React, { useEffect, useRef, useState } from "react";

import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";

import styles from "./styles.module.css";

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig } = context;

  const mainRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [headerHeight, setHeaderHeight] = useState(1536);
  const [bannerHeight, setBannerHeight] = useState(256);

  useEffect(() => {
    const tempHeaderHeight = Math.max(384, window.innerHeight);
    setHeaderHeight(tempHeaderHeight);
    setBannerHeight(Math.max(256, tempHeaderHeight / 2));
    setIsLoading(false);
    mainRef.current.hidden = false;
  }, []);

  return (
    <Layout title="Home" description={siteConfig.tagline}>
      <header className={styles.heroBanner} style={{ minHeight: headerHeight }}>
        <div
          className={styles.heroBannerWrapper}
          style={{
            minHeight: bannerHeight,
            display: isLoading ? "none" : "block",
          }}
        >
          <p>Hi, my name is</p>
          <h1 className="text-success">Miao Zhao.</h1>
          <p>
            Yet another{" "}
            <span className="text-warning">System Security Researcher</span> and{" "}
            <span className="text-danger">Develoer</span> passionate about{" "}
            <span className="text-danger">CTF</span> and{" "}
            <span className="text-danger">Anime</span>
          </p>
          {/* TODO: Add Social Links */}
          <br />
          <p>
            <a href="#main">
              <button className="border-0 rounded p-2 pl-4 pr-0 bg-primary-900 hover:bg-primary-800 transition text-white text-lg cursor-pointer">
                $ whoami<span className="pl-1 animate-pulse">▎</span>
              </button>
            </a>
          </p>
        </div>
      </header>
      <main id="main" ref={mainRef} hidden={true}>
        <section className={styles.directory}>
          <div className="container">
            <h3>Continue exploring?</h3>
            <nav className="pagination-nav">
              <div className="pagination-nav__item">
                <Link className="pagination-nav__link" to={"https://nova.gal"}>
                  <div className="pagination-nav__sublabel">Read</div>
                  <div className="pagination-nav__label">My blog</div>
                </Link>
              </div>
              <div className="pagination-nav__item pagination-nav__item--next">
                <a className="pagination-nav__link" href={useBaseUrl("resume")}>
                  <div className="pagination-nav__sublabel">Download</div>
                  <div className="pagination-nav__label">My resume</div>
                </a>
              </div>
            </nav>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default Home;
