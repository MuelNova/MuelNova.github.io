/**
 * zm.md — Cloudflare Worker（静态资产 + 内容协商）
 *
 * 路由逻辑：
 *   curl/wget/HTTPie 直接请求 /        → text/plain 简历（cv.txt）
 *   显式 /cv 或 /cv.txt                → text/plain 简历
 *   /cv.md                             → Markdown 简历
 *   /pdf                               → 302 到 PDF（把 PDF 放进 public/cv.pdf 即可）
 *   其余（浏览器）                      → SPA 静态资产
 *
 * 判断依据：User-Agent 为主（curl 默认 Accept 是 *），
 * 同时尊重显式的 `Accept: text/plain`。
 */

const CLI_UA = /^(curl|Wget|HTTPie|fetch|aria2|PowerShell|Microsoft BITS)/i;

function wantsText(request) {
  const ua = request.headers.get("user-agent") || "";
  const accept = request.headers.get("accept") || "";
  if (CLI_UA.test(ua)) return true;
  if (accept.includes("text/plain") && !accept.includes("text/html")) return true;
  return false;
}

async function serveAsset(env, request, path, contentType, cacheControl) {
  const url = new URL(request.url);
  url.pathname = path;
  const res = await env.ASSETS.fetch(new Request(url.toString(), request));
  if (!res.ok) return new Response("not found\n", { status: 404 });
  const headers = new Headers(res.headers);
  headers.set("content-type", contentType);
  headers.set("cache-control", cacheControl);
  return new Response(res.body, { status: 200, headers });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, "") || "/";

    // CLI 名片
    if ((path === "/" && wantsText(request)) || path === "/cv" || path === "/cv.txt") {
      return serveAsset(env, request, "/cv.txt", "text/plain; charset=utf-8", "public, max-age=300");
    }
    if (path === "/cv.md") {
      return serveAsset(env, request, "/cv.md", "text/markdown; charset=utf-8", "public, max-age=300");
    }
    if (path === "/pdf") {
      // 把导出的 PDF 命名为 cv.pdf 放进 public/ 即自动生效
      return Response.redirect(new URL("/cv.pdf", request.url), 302);
    }

    // 浏览器 / 其余 → SPA
    return env.ASSETS.fetch(request);
  },
};
