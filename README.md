# chartts.com

Source code for [chartts.com](https://chartts.com) - the documentation site, demos, examples, and blog for Chart.ts.

## Tech stack

- **Next.js 15** (App Router, static export)
- **Tailwind CSS v4**
- **MDX** (blog posts via next-mdx-remote)
- **Shiki** (syntax highlighting)
- **@chartts/core** (chart rendering)
- **Cloudflare Pages** (hosting)

## Development

```bash
npm install
npm run dev
```

Open [localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
```

Outputs static HTML to `out/`. Deploy anywhere.

## Structure

```
app/
  page.tsx          # Landing page
  blog/             # Blog (MDX)
  docs/             # Documentation
  demos/            # All 27 chart types
  examples/         # Real-world example dashboards
content/
  blog/             # MDX blog posts
lib/
  charts.ts         # Chart rendering helpers
  highlight.tsx     # Syntax highlighting (Shiki)
  mdx-components.tsx
public/
  logo-icon.svg     # Icon mark
  logo-wordmark.svg # Full wordmark
  favicon.svg
  og.png            # Open Graph image
```

## License

MIT
