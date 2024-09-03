import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

import tailwind from "tailwindcss";
import autoprefixer from "autoprefixer";

const internetProfiles: Record<string, { label: string; href: string }> = {
  github: {
    label: "GitHub",
    href: "https://github.com/MuelNova",
  },
  email: {
    label: "Email",
    href: "mailto:muel@nova.gal",
  },
  resume: {
    label: "Resume",
    href: "/resume",
  },
  blog: {
    label: "Blog",
    href: "https://nova.gal",
  },
};

const config: Config = {
  title: "Miao Zhao (MuEl Nova)",
  tagline:
    "Yet another System Security Researcher and Developer passionate about CTF and Anime",
  favicon: "img/nova-logo-par.png",

  // Set the production url of your site here
  url: "https://zm.md",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "MuelNova", // Usually your GitHub org/user name.
  projectName: "MuelNova.github.io", // Usually your repo name.
  deploymentBranch: "gh-pages",
  trailingSlash: false,

  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["zh-Hans", "en"],
  },

  presets: [
    [
      "classic",
      {
        docs: false,
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  stylesheets: [
    {
      href: "https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css",
      type: "text/css",
      integrity:
        "sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X",
      crossorigin: "anonymous",
    },
  ],

  themeConfig: {
    // Replace with your project's social card
    // image: "img/docusaurus-social-card.jpg",
    colorMode: {
      defaultMode: "dark",
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    navbar: {
      hideOnScroll: true,
      title: "Miao Zhao",
      logo: {
        alt: "Miao Zhao (MuEl Nova)",
        src: "img/nova-logo-par.png",
      },
      items: [
        {
          type: "localeDropdown",
          position: "right",
        },
        { href: "https://nova.gal", label: "Blog", position: "left" },
        {
          to: internetProfiles.resume.href,
          label: internetProfiles.resume.label,
          position: "right",
        },
        {
          to: "/projects",
          label: "Projects",
          position: "right",
        },
      ],
    },
    footer: {
      links: [
        {
          title: "Connect",
          items: [internetProfiles.github, internetProfiles.email],
        },
        {
          title: "Discover",
          items: [internetProfiles.blog, internetProfiles.resume],
        },
      ],
      copyright: `<a href="https://nova.gal">Made by Nova</a> • <a href="https://github.com/MuelNova/MuelNova.github.io/commits/main">Updated ${new Date().toLocaleDateString()}</a>`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,

  plugins: [
    async function tailwindPlugin(context, options) {
      return {
        name: "docusaurus-tailwindcss",
        configurePostCss(postcssOptions) {
          postcssOptions.plugins.push(tailwind);
          postcssOptions.plugins.push(autoprefixer);
          return postcssOptions;
        },
      };
    },
  ],
};

export default config;
