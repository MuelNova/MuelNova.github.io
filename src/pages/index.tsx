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
          <h1 className="text-success">Miao Zhao</h1>
          <h2>(MuEl Nova)</h2>
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
        <div className={styles.aboutHeader}>
          <h2 className="border-0 border-b-4 border-solid border-success">
            Who am I
          </h2>
        </div>
        <div className={styles.about}>
          <div>
            <img
              className={styles.aboutProfilePic}
              src={useBaseUrl("img/profilepic.jpg")}
            />
          </div>
          <div className={styles.aboutText}>
            <h2>Hi</h2>
            <p>
              I am Nova, a System Security Researcher in{" "}
              <a href={"https://netsec.ccert.edu.cn/chs/vul337"}>vul337</a> and
              (Self-Proclaimed) Developer in China.
            </p>
            <p>🚀 I am a big fan of Operating System and System Exploiting.</p>
            <p>
              🌏 To me, Computer and OS are the closest things to magic we have
              on Earth.
            </p>
            <p>
              🎒 I am a{" "}
              <a href="https://scss.bupt.edu.cn/">Cyber Security major</a> at
              the{" "}
              <a href="https://www.bupt.edu.cn/">
                Beijing University of Posts and Telecommunications
              </a>{" "}
              from 2021
            </p>
            <p>
              🧑‍🏫 I was a Pwner in Team 天枢Dubhe (Tianshu Dubhe) and Team
              天璇Merak (Tianxuan Merak)
            </p>
          </div>
        </div>
        {/* TODO: Pub, Awards, Projects */}
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
