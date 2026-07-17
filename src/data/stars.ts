/**
 * stars.ts —— 星空层的数据。
 * 每颗星 = 夜空里的一个「你」：大小、颜色、展开后的内容。
 * 联系方式等已有唯一定义的数据直接引用 content.ts（单源，别复制）；
 * 其余与 content.ts 同源改写；想调整夜空只改这里。
 * 注意：x/y/mx/my 会被 skyLayout.randomLayout 当场覆盖（每访星象，每次刷新换位置），
 * 这里保留的坐标仅作内容锚点与生成兜底参考；想加星直接往数组里加，位置不用管。
 */

import { socials } from "@/data/content";

export type StarContent =
  | { kind: "text"; title: string; body: string; foot?: string }
  | {
      kind: "list";
      title: string;
      items: { name: string; desc: string; url: string }[];
    }
  | {
      kind: "links";
      title: string;
      links: { label: string; handle: string; url: string }[];
    };

export type Star = {
  id: string;
  /** 片假名/符号小注 */
  kicker: string;
  /** 星星 hover 提示 & aria-label */
  label: string;
  x: number; // 0-100，横向百分比（桌面）
  y: number; // 0-100，纵向百分比（桌面）
  /** 移动端坐标（窄屏星星收拢避开中央标题），缺省用 x/y */
  mx?: number;
  my?: number;
  size: number; // 星体 px
  color: "pink" | "cyan" | "violet" | "yellow";
  /** 初始就亮着、不需探索的（who am I） */
  featured?: boolean;
  /** 星座分组，同组星之间连线 */
  constellation?: string;
  drift: number; // 漂浮相位（错开动画）
  content: StarContent;
};

export const heroStar = {
  kana: "ミュエル・ノヴァ",
  name: "Muel Nova",
  role: "Security Researcher · Anime Enthusiast (Retired)",
  line: "Designed by Kimi K3 · Built by Muel Nova",
  hint: "✦ 探索这片星空，或往下滑",
};

export const stars: Star[] = [
  // —— 初始亮星：who am I ——
  {
    id: "identity",
    kicker: "IDENTITY",
    label: "我是谁",
    x: 22,
    y: 30,
    size: 34,
    color: "pink",
    featured: true,
    constellation: "core",
    drift: 0,
    mx: 20,
    my: 24,
    content: {
      kind: "text",
      title: "Miao Zhao · muir",
      body: "vul337 @ THU \npkucclab @ PKU \nSecurity Intern @ Moonshot AI\n",
      foot: "location: Isekai",
    },
  },
  {
    id: "research",
    kicker: "RESEARCH",
    label: "研究方向",
    x: 46,
    y: 18,
    size: 26,
    color: "cyan",
    featured: true,
    constellation: "core",
    drift: 1.2,
    content: {
      kind: "text",
      title: "Memory Safety & Kernel",
      body: "其实也是根本看不懂，一篇论文没发过",
    },
  },
  {
    id: "ctf",
    kicker: "CTF",
    label: "CTF 经历",
    x: 68,
    y: 32,
    size: 24,
    color: "violet",
    featured: true,
    constellation: "core",
    drift: 2.1,
    mx: 80,
    my: 34,
    content: {
      kind: "text",
      title: "天枢Dubhe — PWNer (retired)",
      body: "本科 BUPT 假装自己是打 PWN 的",
    },
  },

  // —— 探索星：项目 ——
  {
    id: "projects",
    kicker: "PROJECTS",
    label: "代表项目",
    x: 30,
    y: 58,
    size: 22,
    color: "yellow",
    constellation: "build",
    drift: 0.6,
    mx: 18,
    my: 52,
    content: {
      kind: "list",
      title: "Main Quests",
      items: [
        {
          name: "PwNo ★13",
          desc: "pwntools 扩展，开箱即用",
          url: "https://github.com/MuelNova/PwNo",
        },
        {
          name: "NoPwnDocker ★11",
          desc: "一键 pwn 环境 16.04→24.04",
          url: "https://github.com/MuelNova/NoPwnDocker",
        },
        {
          name: "Kernel-Exploit-Dojo",
          desc: "CTF kernel 利用笔记/PoC",
          url: "https://github.com/MuelNova/Kernel-Exploit-Dojo",
        },
      ],
    },
  },
  {
    id: "sidequests",
    kicker: "SIDEQUESTS",
    label: "副业小物",
    x: 56,
    y: 66,
    size: 20,
    color: "pink",
    constellation: "build",
    drift: 1.8,
    mx: 55,
    my: 62,
    content: {
      kind: "list",
      title: "Side Quests",
      items: [
        {
          name: "sts2_typing",
          desc: "杀戮尖塔2 联机聊天 mod",
          url: "https://github.com/MuelNova/sts2_typing",
        },
        {
          name: "FRU-Sim",
          desc: "FFXIV 副本模拟器",
          url: "https://github.com/MuelNova/FRU-Sim",
        },
        {
          name: "rhinebar",
          desc: "zebar / GlazeWM 任务栏",
          url: "https://github.com/MuelNova/rhinebar",
        },
        {
          name: "ani",
          desc: "一站式弹幕追番平台",
          url: "https://github.com/MuelNova/ani",
        },
      ],
    },
  },

  // —— 探索星：技能 / 联系 ——
  {
    id: "skills",
    kicker: "SKILLS",
    label: "技能",
    x: 74,
    y: 52,
    size: 21,
    color: "cyan",
    constellation: "link",
    drift: 2.8,
    mx: 84,
    my: 56,
    content: {
      kind: "text",
      title: "Stack",
      body: "Python · Go · TypeScript · C++ \nGDB · pwntools · angr · glibc heap\nLinux · Arch · Docker · Cloudflare Workers",
    },
  },
  {
    id: "contact",
    kicker: "CONTACT",
    label: "联系方式",
    x: 84,
    y: 74,
    size: 23,
    color: "yellow",
    constellation: "link",
    drift: 3.4,
    content: {
      kind: "links",
      title: "找到我",
      // 直接复用 content.ts 的 socials（GitHub/Blog/Twitter/Email），不再自备一份
      links: socials,
    },
  },
  {
    id: "cv",
    kicker: "CV",
    label: "CV / 简历",
    x: 12,
    y: 72,
    size: 19,
    color: "violet",
    constellation: "link",
    drift: 4.0,
    mx: 24,
    my: 80,
    content: {
      kind: "text",
      title: "$ curl zm.md",
      body: "不如直接在终端里 curl 下来？",
      foot: "curl zm.md/cv.md · curl -L zm.md/pdf",
    },
  },
];

/** 星座连线（同组按数组顺序相连，带出组名用于着色/联动高亮） */
export function constellationLines(all: Star[]) {
  const groups: Record<string, Star[]> = {};
  all.forEach((s) => {
    if (!s.constellation) return;
    (groups[s.constellation] ||= []).push(s);
  });
  const lines: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    key: string;
    group: string;
  }[] = [];
  Object.entries(groups).forEach(([name, g]) => {
    for (let i = 0; i + 1 < g.length; i++) {
      lines.push({
        x1: g[i].x,
        y1: g[i].y,
        x2: g[i + 1].x,
        y2: g[i + 1].y,
        key: `${g[i].id}-${g[i + 1].id}`,
        group: name,
      });
    }
  });
  return lines;
}
