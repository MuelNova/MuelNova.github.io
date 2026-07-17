/**
 * stars.ts —— 星空层的数据。
 * 每颗星 = 夜空里的一个「你」：位置（百分比）、大小、颜色、展开后的内容。
 * 与 content.ts 同源改写；想调整夜空只改这里。
 */

export type StarContent =
  | { kind: "text"; title: string; body: string; foot?: string }
  | { kind: "list"; title: string; items: { name: string; desc: string; url: string }[] }
  | { kind: "links"; title: string; links: { label: string; handle: string; url: string }[] };

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
  role: "Security Researcher · Retired Pwner",
  line: "在终端里修内核，也在终端里打电动。",
  hint: "✦ 探索这片星空，或往下滚",
};

export const stars: Star[] = [
  // —— 初始亮星：who am I ——
  {
    id: "identity",
    kicker: "アイデンティティ",
    label: "我是谁",
    x: 22, y: 30, size: 34, color: "pink", featured: true, constellation: "core", drift: 0,
    mx: 20, my: 24,
    content: {
      kind: "text",
      title: "Miao Zhao · muir",
      body: "PKU CS 硕士，安全研究er —— THU@vul337 & PKU@pkucclab 双实验室。白天研究内存安全，晚上大概也在终端里。",
      foot: "location: Isekai",
    },
  },
  {
    id: "research",
    kicker: "ケンキュウ",
    label: "研究方向",
    x: 46, y: 18, size: 26, color: "cyan", featured: true, constellation: "core", drift: 1.2,
    content: {
      kind: "text",
      title: "Memory Safety & Kernel PWN",
      body: "缓解机制在哪里成立、在哪里失效，以及中间那条 exploit 链长什么样。工具是 GDB / pwntools / angr。",
    },
  },
  {
    id: "ctf",
    kicker: "シーティーエフ",
    label: "CTF 经历",
    x: 68, y: 32, size: 24, color: "violet", featured: true, constellation: "core", drift: 2.1,
    mx: 80, my: 34,
    content: {
      kind: "text",
      title: "天枢Dubhe — PWNer (retired)",
      body: "BUPT 四年，从强网拟态到西湖论剑。退役的是比赛，不是手艺。",
    },
  },

  // —— 探索星：项目 ——
  {
    id: "projects",
    kicker: "プロジェクト",
    label: "代表项目",
    x: 30, y: 58, size: 22, color: "yellow", constellation: "build", drift: 0.6,
    mx: 18, my: 52,
    content: {
      kind: "list",
      title: "Main Quests",
      items: [
        { name: "PwNo ★13", desc: "pwntools 扩展，开箱即用", url: "https://github.com/MuelNova/PwNo" },
        { name: "NoPwnDocker ★11", desc: "一键 pwn 环境 16.04→24.04", url: "https://github.com/MuelNova/NoPwnDocker" },
        { name: "Kernel-Exploit-Dojo", desc: "CTF kernel 利用笔记/PoC", url: "https://github.com/MuelNova/Kernel-Exploit-Dojo" },
      ],
    },
  },
  {
    id: "sidequests",
    kicker: "サイドクエスト",
    label: "副业小物",
    x: 56, y: 66, size: 20, color: "pink", constellation: "build", drift: 1.8,
    mx: 55, my: 62,
    content: {
      kind: "list",
      title: "Side Quests",
      items: [
        { name: "sts2_typing", desc: "杀戮尖塔2 联机聊天 mod", url: "https://github.com/MuelNova/sts2_typing" },
        { name: "FRU-Sim", desc: "FFXIV 副本模拟器", url: "https://github.com/MuelNova/FRU-Sim" },
        { name: "rhinebar", desc: "zebar / GlazeWM 任务栏", url: "https://github.com/MuelNova/rhinebar" },
        { name: "ani", desc: "一站式弹幕追番平台", url: "https://github.com/MuelNova/ani" },
      ],
    },
  },

  // —— 探索星：技能 / 联系 ——
  {
    id: "skills",
    kicker: "スキル",
    label: "技能",
    x: 74, y: 52, size: 21, color: "cyan", constellation: "link", drift: 2.8,
    mx: 84, my: 56,
    content: {
      kind: "text",
      title: "Stack",
      body: "Python · Go · TypeScript · C++ · Rust(学习中)\nGDB · pwntools · angr · glibc heap\nLinux · Arch · Docker · Cloudflare Workers",
    },
  },
  {
    id: "contact",
    kicker: "コンタクト",
    label: "联系方式",
    x: 84, y: 74, size: 23, color: "yellow", constellation: "link", drift: 3.4,
    content: {
      kind: "links",
      title: "找到我",
      links: [
        { label: "GitHub", handle: "@MuelNova", url: "https://github.com/MuelNova" },
        { label: "Blog", handle: "nova.gal/blog", url: "https://nova.gal/blog/" },
        { label: "Email", handle: "muel@nova.gal", url: "mailto:muel@nova.gal" },
      ],
    },
  },
  {
    id: "cv",
    kicker: "シーヴィー",
    label: "命令行简历",
    x: 12, y: 72, size: 19, color: "violet", constellation: "link", drift: 4.0,
    mx: 24, my: 80,
    content: {
      kind: "text",
      title: "$ curl zm.md",
      body: "在终端里 curl 这个域名，会直接拿到一份 man page 风的纯文本简历。浏览器里打开，就是你现在看到的这片星空。",
      foot: "curl zm.md/cv.md · curl -L zm.md/pdf",
    },
  },
];

/** 星座连线（同组按数组顺序相连） */
export function constellationLines(all: Star[]) {
  const groups: Record<string, Star[]> = {};
  all.forEach((s) => {
    if (!s.constellation) return;
    (groups[s.constellation] ||= []).push(s);
  });
  const lines: { x1: number; y1: number; x2: number; y2: number; key: string }[] = [];
  Object.values(groups).forEach((g) => {
    for (let i = 0; i + 1 < g.length; i++) {
      lines.push({ x1: g[i].x, y1: g[i].y, x2: g[i + 1].x, y2: g[i + 1].y, key: `${g[i].id}-${g[i + 1].id}` });
    }
  });
  return lines;
}
