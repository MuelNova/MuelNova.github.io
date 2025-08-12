import React, { useEffect, useRef, useReducer } from "react";

import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import { SocialLinks } from "../data/SocialLinks";
import socialLinks from "../data/_SocialLinks";

import styles from "./styles.module.css";

type State = {
  isLoading: boolean;
  headerHeight: number;
  bannerHeight: number;
};

type Action =
  | { type: 'SET_DIMENSIONS'; headerHeight: number; bannerHeight: number }
  | { type: 'SET_LOADING'; isLoading: boolean };

const initialState: State = {
  isLoading: true,
  headerHeight: 1536,
  bannerHeight: 256
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_DIMENSIONS':
      return {
        ...state,
        headerHeight: action.headerHeight,
        bannerHeight: action.bannerHeight
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.isLoading
      };
    default:
      return state;
  }
};

function Home(): JSX.Element {
  const context = useDocusaurusContext();
  const { siteConfig } = context;

  const mainRef = useRef<HTMLElement>(null);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const tempHeaderHeight = Math.max(384, window.innerHeight);
    dispatch({
      type: 'SET_DIMENSIONS',
      headerHeight: tempHeaderHeight,
      bannerHeight: Math.max(256, tempHeaderHeight / 2)
    });
    dispatch({ type: 'SET_LOADING', isLoading: false });
    if (mainRef.current) {
      mainRef.current.hidden = false;
    }
  }, []);

  return (
    <Layout title="Home" description={siteConfig.tagline}>
      <header className={styles.heroBanner} style={{ minHeight: state.headerHeight }}>
        <div
          className={styles.heroBannerWrapper}
          style={{
            minHeight: state.bannerHeight,
            display: state.isLoading ? "none" : "block",
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
              I am Nova, a System Security Researcher in group{" "}
              <a href={"https://netsec.ccert.edu.cn/chs/vul337"}>vul337</a> and
              <a href={"https://github.com/pkucclab"}>pkucc</a>, a{" "}
              (Self-Proclaimed) Developer in China.
            </p>
            <p>
              🚀 I am a big fan of Operating Systems and System Exploitation.
            </p>
            <p>
              🌏 To me, Computers and Operating Systems are the closest things
              to magic we have on Earth.
            </p>
            <p>
              🎒 I received my Bachelor's degree in{" "}
              <a href="https://scss.bupt.edu.cn/">Cyber Security major</a> at
              the{" "}
              <a href="https://www.bupt.edu.cn/">
                Beijing University of Posts and Telecommunications
              </a>{" "}
              (BUPT) in 2025, and I am currently pursuing a Master's degree in
              <a href="https://www.pku.edu.cn/">Peking University</a>.
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
            <SocialLinks data={socialLinks} />
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
