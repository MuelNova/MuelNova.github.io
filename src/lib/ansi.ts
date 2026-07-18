/**
 * ansi.ts —— 极简 ANSI SGR 解析器。
 * 只认 public/cv.txt 里真实出现的码：粗体 1/22、下划线 4/24、
 * 256 色前景 38;5;n（213→签名粉、87→aqua）、39 复位前景、0 全复位。
 * 把字符串切成带样式的段，渲染层映射成 CSS 变量色。
 */

export type AnsiInk = "sig" | "accent";

export interface AnsiSeg {
  text: string;
  bold?: boolean;
  underline?: boolean;
  ink?: AnsiInk;
}

const FG: Record<number, AnsiInk> = { 213: "sig", 87: "accent" };

/** 整段文本 → 段序列 */
export function parseAnsi(src: string): AnsiSeg[] {
  const segs: AnsiSeg[] = [];
  let bold = false;
  let underline = false;
  let ink: AnsiInk | undefined;
  let buf = "";

  const push = () => {
    if (!buf) return;
    segs.push({ text: buf, ...(bold ? { bold } : null), ...(underline ? { underline } : null), ...(ink ? { ink } : null) });
    buf = "";
  };

  const re = /\x1b\[([0-9;]*)m/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(src))) {
    buf += src.slice(last, m.index);
    push();
    const codes = m[1] === "" ? [0] : m[1].split(";").map((s) => parseInt(s, 10));
    for (let i = 0; i < codes.length; i++) {
      const c = codes[i];
      if (c === 0) {
        bold = false;
        underline = false;
        ink = undefined;
      } else if (c === 1) bold = true;
      else if (c === 22) bold = false;
      else if (c === 4) underline = true;
      else if (c === 24) underline = false;
      else if (c === 39) ink = undefined;
      else if (c === 38 && codes[i + 1] === 5) {
        ink = FG[codes[i + 2]];
        i += 2;
      }
    }
    last = re.lastIndex;
  }
  buf += src.slice(last);
  push();
  return segs;
}

/** 按行切分并解析（保留空行） */
export function parseAnsiLines(src: string): AnsiSeg[][] {
  return src.replace(/\n$/, "").split("\n").map(parseAnsi);
}
