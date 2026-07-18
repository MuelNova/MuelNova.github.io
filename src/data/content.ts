/**
 * content.ts —— 全站内容的唯一数据源。
 * 想改文案、加项目、换链接？只动这一个文件，组件不用碰。
 */

export const profile = {
  name: "MuelNova",
  github: "https://github.com/MuelNova",
  blog: "https://zm.md/", // not showing to public
  /** curl zm.md 拿到的纯文本简历路径（由 CF Worker 提供） */
  cvTxt: "/cv.txt",
  gpg: "6C4F 47DB A3A8 EB3B 5670 172A 6AC1 E2FC FE4A A441",
};

export const about = {
  paragraphs: [
    "I'm Nova (Miao Zhao), a graduate student at Peking University's School of Computer Science, and a security researcher working across vul337 @ THU and CCLab @ PKU. My day job is memory-safety research: where mitigations hold, where they don't, and what the exploit chain in between looks like.",
    "I came up through CTF — four years at BUPT as a PWNer of 天枢Dubhe, now retired from competition but not from the craft. Most of what I ship is tooling: pwntools extensions, debug-symbol loaders, kernel-exploit dojos. If it makes the next exploit faster to write, I'm interested.",
    "Outside the debugger: desktop ricing (GlazeWM/zebar), an Obsidian bullet-journal template, an FFXIV raid sim, a co-op chat mod for Slay the Spire 2, and a beancount bookkeeping service. I watch a probably-unhealthy amount of anime.",
  ],
  facts: [
    { k: "work", v: "Moonshot AI (Intern)" },
    { k: "research", v: "vul337 @ THU · pkucclab @ PKU" },
    { k: "education", v: "PKU CS (M.S.) · BUPT Cybersecurity (B.S.)" },
    { k: "ctf", v: "天枢Dubhe — PWNer (retired)" },
  ],
};

export const milestones = [
  {
    year: "now",
    title: "Security Intern",
    desc: "Moonshot AI",
    color: "yellow",
  },
  {
    year: "now",
    title: "Security research",
    desc: "vul337 @ THU · pkucclab @ PKU",
    color: "pink",
  },
  {
    year: "2025",
    title: "PKU CS, M.S.",
    desc: "Graduate school, School of Computer Science",
    color: "cyan",
  },
  {
    year: "2021–25",
    title: "BUPT · CTF PWNer",
    desc: "Cybersecurity B.S. · 天枢Dubhe — 强网拟态, 西湖论剑, HGAME…",
    color: "violet",
  },
] as const;

export const interests = [
  {
    icon: "✦",
    title: "Memory Safety",
    desc: "Mitigations, exploit primitives, and the arms race between them.",
    accent: "pink",
  },
  {
    icon: "⚡",
    title: "Kernel & Offense",
    desc: "From bug to shell: kernel pwn, userland pwn, everything pwntools.",
    accent: "cyan",
  },
  {
    icon: "❀",
    title: "Hacker DX",
    desc: "Tooling and workflows that make the next exploit faster to write.",
    accent: "violet",
  },
] as const;

export type Project = {
  name: string;
  desc: string;
  url: string;
  lang: string;
  tag: string;
  /** GitHub star 数（有就显示成 ★N，语义色：星光黄） */
  stars?: number;
};

/** 主项目：安全/工具主线 */
export const projects: Project[] = [
  {
    name: "PwNo",
    desc: "Pwntools extension with no extra effort — type-annotated pwn scripting.",
    url: "https://github.com/MuelNova/PwNo",
    lang: "Python",
    tag: "pwn · dx",
    stars: 13,
  },
  {
    name: "NoPwnDocker",
    desc: "Pwn environments from Ubuntu 16.04 to 24.04. Stop wasting time on setup.",
    url: "https://github.com/MuelNova/NoPwnDocker",
    lang: "Dockerfile",
    tag: "pwn · env",
    stars: 11,
  },
  {
    name: "Kernel-Exploit-Dojo",
    desc: "CTF kernel exploitation: notes, PoCs, exploits, writeups.",
    url: "https://github.com/MuelNova/Kernel-Exploit-Dojo",
    lang: "C",
    tag: "kernel · ctf",
  },
  {
    name: "glibc-all-in-one-gdb-debug",
    desc: "Auto-load debug symbols for attached GDB processes.",
    url: "https://github.com/MuelNova/glibc-all-in-one-gdb-debug",
    lang: "Python",
    tag: "gdb · elf",
  },
  {
    name: "NoKrnDocker",
    desc: "Docker for kernel debugging.",
    url: "https://github.com/MuelNova/NoKrnDocker",
    lang: "Shell",
    tag: "kernel · debug",
  },
  {
    name: "pastebin-worker",
    desc: "Pastebin on Cloudflare Workers, with a friendly CLI.",
    url: "https://github.com/MuelNova/pastebin-worker",
    lang: "TypeScript",
    tag: "edge · cli",
  },
];

/** 副业小物件：兴趣面，字号小一档 */
export const sideProjects: Project[] = [
  {
    name: "sts2_typing",
    desc: "Real-time co-op chat mod for Slay the Spire 2.",
    url: "https://github.com/MuelNova/sts2_typing",
    lang: "C#",
    tag: "game mod",
  },
  {
    name: "FRU-Sim",
    desc: "Yet another FFXIV raid sim.",
    url: "https://github.com/MuelNova/FRU-Sim",
    lang: "GDScript",
    tag: "ffxiv",
  },
  {
    name: "rhinebar",
    desc: "A taskbar for zebar / GlazeWM.",
    url: "https://github.com/MuelNova/rhinebar",
    lang: "TypeScript",
    tag: "ricing",
  },
  {
    name: "Nova-Obsidian-Starter-Template",
    desc: "My Obsidian bullet-journal template.",
    url: "https://github.com/MuelNova/Nova-Obsidian-Starter-Template",
    lang: "JavaScript",
    tag: "notes",
  },
  {
    name: "beancount-gs",
    desc: "RESTful API + frontend for beancount bookkeeping.",
    url: "https://github.com/MuelNova/beancount-gs",
    lang: "Go",
    tag: "finance",
  },
  {
    name: "ani",
    desc: "One-stop bangumi streaming: BT, aggregation, danmaku sync.",
    url: "https://github.com/MuelNova/ani",
    lang: "Kotlin",
    tag: "anime",
  },
];

export const skills = [
  {
    group: "Languages",
    items: ["Python", "Go", "TypeScript", "C++", "Rust (learning)"],
  },
  { group: "PWN / RE", items: ["GDB", "pwntools", "angr", "glibc heap"] },
  { group: "Systems", items: ["Linux", "Arch", "Docker", "WSL kernels"] },
  { group: "Web", items: ["Astro", "Tailwind", "React", "Cloudflare Workers"] },
];

export const socials = [
  { label: "GitHub", handle: "@MuelNova", url: "https://github.com/MuelNova" },
  { label: "Blog", handle: "nova.gal/blog", url: profile.blog },
  { label: "Twitter", handle: "@NovaNoir_", url: "https://x.com/NovaNoir_" },
  { label: "Email", handle: "muel@nova.gal", url: "mailto:muel@nova.gal" },
];

export const nav = [
  { id: "sky", label: "✦ Sky" },
  { id: "about", label: "About" },
  { id: "journey", label: "Journey" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "cv", label: "CV" },
  { id: "contact", label: "Contact" },
];

/** 每个区块的片假名小注 + 标题（Section 的 kana/title） */
export const sectionTitles = {
  about: { kana: "アバウト", title: "About" },
  journey: { kana: "タビジ", title: "Journey & Interests" },
  projects: { kana: "プロジェクト", title: "Projects" },
  skills: { kana: "スキル", title: "Skills" },
  cv: { kana: "シーヴィー", title: "cv" },
  contact: { kana: "コンタクト", title: "Contact" },
} as const;

/** #cv 终端的三条命令；输出直接用 public/cv.txt / cv.md 的真字节（?raw 内联），
    pdf 标签页渲染 302→200 的 HTTP 实录（与 worker/ 路由一一对应） */
export const cliCmds = [
  { id: "txt", cmd: "curl zm.md" },
  { id: "md", cmd: "curl zm.md/cv.md" },
  { id: "pdf", cmd: "curl -sIL zm.md/pdf" },
] as const;

/** 副业小节的标题（条目在 sideProjects） */
export const sideQuestsTitle = "SIDE QUESTS";

/** 零散的界面文案 */
export const chrome = {
  /** 页脚像素字 */
  footerLine: "✦ MADE WITH MAGIC & HEART ✦",
  /** 跳到主内容的无障碍链接 */
  skipToContent: "跳到主要内容",
};
