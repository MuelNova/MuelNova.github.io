#!/usr/bin/env python3
"""gen_cv_pdf.py —— 生成 public/cv.pdf：一页排成 Unix man page 的简历。

worker 路由 `curl -L zm.md/pdf` 302 到的就是这个文件。
Latin 用 Courier（man 的等宽感），CJK/符号用 Noto Sans SC。
重新生成：`python3 scripts/gen_cv_pdf.py`
"""
from pathlib import Path
import unicodedata

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT
from reportlab.platypus import BaseDocTemplate, Frame, PageTemplate, Paragraph, Spacer
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "cv.pdf"

# --- 字体：运行时自带 Noto Sans SC TTF；找不到就退回系统常见路径 -------------
FONT_CANDIDATES = [
    Path.home() / "Library/Application Support/kimi-desktop/daimon-share/daimon/runtime/python/fonts",
    Path("/System/Library/Fonts"),
]
def find_font(name: str) -> str:
    for d in FONT_CANDIDATES:
        p = d / name
        if p.exists():
            return str(p)
    raise FileNotFoundError(name)

pdfmetrics.registerFont(TTFont("NSSC", find_font("NotoSansSC-Regular.ttf")))
pdfmetrics.registerFont(TTFont("NSSC-B", find_font("NotoSansSC-Bold.ttf")))

LATIN, LATIN_B = "Courier", "Courier-Bold"
CJK, CJK_B = "NSSC", "NSSC-B"

def needs_cjk(ch: str) -> bool:
    if unicodedata.east_asian_width(ch) in ("W", "F"):
        return True
    return ch in "★✦·—–…「」『』《》"

def mixed(text: str, bold: bool = False) -> str:
    """把一段文本包成 reportlab paragraph markup：按字符切 Latin/CJK 字体。"""
    lat = LATIN_B if bold else LATIN
    cjk = CJK_B if bold else CJK
    out, cur, cur_cjk = [], [], None
    def flush():
        nonlocal cur
        if not cur:
            return
        seg = "".join(cur).replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
        out.append(f'<font face="{cjk if cur_cjk else lat}">{seg}</font>')
        cur = []
    for ch in text:
        c = needs_cjk(ch)
        if cur_cjk is None or c == cur_cjk:
            cur.append(ch)
            cur_cjk = c
        else:
            flush()
            cur = [ch]
            cur_cjk = c
    flush()
    return "".join(out)

# --- 版式 -------------------------------------------------------------------
PAGE_W, PAGE_H = A4
MARGIN = 20 * mm
INDENT = 8 * mm
BODY = 9.2
LEAD = 13.2

st_head = ParagraphStyle("head", fontName=LATIN_B, fontSize=BODY, leading=LEAD,
                         spaceBefore=10, spaceAfter=2, alignment=TA_LEFT)
st_body = ParagraphStyle("body", fontName=LATIN, fontSize=BODY, leading=LEAD,
                         leftIndent=INDENT, alignment=TA_LEFT)
st_item = ParagraphStyle("item", parent=st_body, leftIndent=INDENT * 2,
                         firstLineIndent=-INDENT)
st_proj = ParagraphStyle("proj", parent=st_body, leftIndent=INDENT * 2 + 12 * mm,
                         firstLineIndent=-(INDENT + 12 * mm))

def head(t):   return Paragraph(mixed(t, bold=True), st_head)
def body(t):   return Paragraph(mixed(t), st_body)
def item(t):   return Paragraph(mixed("· " + t), st_item)
def proj(name, desc):
    pad = max(1, 26 - sum(2 if needs_cjk(c) else 1 for c in name))
    return Paragraph(mixed(name, bold=True) + mixed(" " * pad + desc), st_proj)

# --- 页眉 / 页脚（man page 的标志性两行） ------------------------------------
def chrome(canvas, doc):
    canvas.saveState()
    canvas.setFont(LATIN, 8)
    y_top = PAGE_H - 12 * mm
    canvas.drawString(MARGIN, y_top, "MUELNOVA(1)")
    canvas.drawCentredString(PAGE_W / 2, y_top, "User Commands")
    canvas.drawRightString(PAGE_W - MARGIN, y_top, "MUELNOVA(1)")
    y_bot = 12 * mm
    canvas.drawString(MARGIN, y_bot, "zm.md(1)")
    canvas.drawCentredString(PAGE_W / 2, y_bot, "2026")
    canvas.drawRightString(PAGE_W - MARGIN, y_bot, "MUELNOVA(1)")
    canvas.restoreState()

# --- 内容（与 public/cv.txt 手动对齐） ---------------------------------------
story = [
    Spacer(1, 2 * mm),
    head("NAME"),
    body("muel — security researcher, retired pwner, cat person"),
    body("(muir / Miao Zhao · ミュエル・ノヴァ)"),
    head("SYNOPSIS"),
    body("curl zm.md             这份简历的纯文本版"),
    body("curl zm.md/cv.md       Markdown 版"),
    body("curl -L zm.md/pdf      PDF 版（你在看的这个）"),
    body("浏览器打开 https://zm.md    主页本体 ★"),
    head("DESCRIPTION"),
    item("Security Researcher — THU@vul337 & PKU@pkucclab"),
    item("Kimi Security Intern @ Moonshot AI"),
    item("北京大学计算机学院 硕士在读（BUPT 网络空间安全 本科）"),
    item("PWNer @ 天枢Dubhe (retired) — 强网拟态 / 西湖论剑 / HGAME"),
    item("方向：内存安全、kernel pwn、调试与工具链"),
    head("PROJECTS"),
    proj("PwNo ★13", "pwntools 扩展，开箱即用，完整类型注解"),
    proj("NoPwnDocker ★11", "一键 pwn 环境（Ubuntu 16.04 -> 24.04）"),
    proj("Kernel-Exploit-Dojo", "CTF kernel 利用：笔记 / PoC / writeup"),
    proj("glibc-all-in-one-gdb-debug", "自动为 gdb attach 进程加载调试符号"),
    proj("NoKrnDocker", "kernel 调试 docker"),
    proj("pastebin-worker", "Cloudflare Workers 上的 pastebin + CLI"),
    head("SIDE QUESTS"),
    proj("sts2_typing", "杀戮尖塔2 联机聊天 mod (C#)"),
    proj("FRU-Sim", "FFXIV 副本模拟器 (GDScript)"),
    proj("rhinebar", "zebar / GlazeWM 任务栏 (ricing)"),
    proj("ani", "一站式弹幕追番平台 (Kotlin)"),
    proj("beancount-gs", "beancount 记账 API + 前端 (Go)"),
    head("ENVIRONMENT"),
    proj("LANG", "Python, Go, TypeScript, C++, Rust (learning)"),
    proj("TOOLS", "GDB, pwntools, angr"),
    proj("OS", "Linux, Arch"),
    proj("WEB", "Astro, Tailwind, React, Cloudflare Workers"),
    head("FILES"),
    body("github.com/MuelNova"),
    body("nova.gal/blog          ネコのメモ帳"),
    body("x.com/NovaNoir_"),
    body("muel@nova.gal"),
    body("GPG  6C4F 47DB A3A8 EB3B 5670 172A 6AC1 E2FC FE4A A441"),
    head("SEE ALSO"),
    body("同一个域名，两种打开方式 —— Hacking 4 fun!"),
]

doc = BaseDocTemplate(str(OUT), pagesize=A4,
                      leftMargin=MARGIN, rightMargin=MARGIN,
                      topMargin=18 * mm, bottomMargin=18 * mm,
                      title="MuelNova — CV (man page)",
                      author="MuelNova")
frame = Frame(MARGIN, 18 * mm, PAGE_W - 2 * MARGIN, PAGE_H - 36 * mm, id="main",
              leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0)
doc.addPageTemplates([PageTemplate(id="man", frames=[frame], onPage=chrome)])
doc.build(story)
print(f"wrote {OUT} ({OUT.stat().st_size} bytes)")
