# zm.md 部署指南（Cloudflare）

架构：Vite 构建出 `dist/` → Cloudflare **Workers Static Assets** 托管，入口 Worker 做内容协商。

```bash
# 1. 构建前端
npm run build

# 2. 部署（首次会引导登录）
cd worker
npx wrangler deploy

# 3. 绑定域名：Cloudflare Dashboard → Workers → zm-md → Settings → Domains & Routes
#    添加 Custom Domain: zm.md（要求 zm.md 的 DNS 已托管在 Cloudflare）
```

部署完成后验证：

```bash
curl zm.md              # → 彩色纯文本简历（UA 是 curl，自动走内容协商）
curl zm.md/cv.md        # → Markdown 简历
curl -L zm.md/pdf       # → PDF（把简历 PDF 命名 cv.pdf 放进 public/ 重新部署即可）
curl -A "Mozilla" zm.md # → 模拟浏览器，返回 SPA
```

## 内容协商规则（worker/index.js）

| 请求 | 返回 |
| --- | --- |
| UA 是 curl / wget / HTTPie 等，路径 `/` | `text/plain` 简历 |
| `Accept: text/plain` 且不含 `text/html` | `text/plain` 简历 |
| `/cv`、`/cv.txt` | `text/plain` 简历（任何客户端） |
| `/cv.md` | Markdown 简历 |
| `/pdf` | 302 → `/cv.pdf` |
| 其他一切 | SPA 静态资产 |

## 日常维护

- **改文案/加项目/换链接**：只改 `src/data/content.ts`
- **改简历**：`public/cv.txt`（终端版）和 `public/cv.md`（Markdown 版）
- **改动效**：`src/index.css` 的关键帧库；全站开关是 `<html data-motion>`
- 重新部署：`npm run build && cd worker && npx wrangler deploy`
