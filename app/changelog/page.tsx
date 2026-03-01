import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Changelog",
  description:
    "Chart.ts release history. See what's new in every version.",
};

const releases = [
  {
    version: "0.1.6",
    date: "2026-02-28",
    tag: "Latest",
    changes: [
      "11 new packages: @chartts/finance, @chartts/annotation, @chartts/ssr, @chartts/datalabels, @chartts/regression, @chartts/statistics, @chartts/test-utils, @chartts/cli, @chartts/date-fns, @chartts/dayjs, @chartts/websocket",
      "Theme expansion: 8 to 34 presets (Nord, Dracula, Catppuccin, Tokyo Night, Gruvbox, Synthwave, Cyberpunk, Material, Solarized, and more)",
      "24 new documentation pages covering streaming, zoom/pan, brush, export, data adapters, plugins, linked charts, decimation, annotations, and all new packages",
      "Financial indicators package: SMA, EMA, WMA, RSI, MACD, Bollinger Bands, ATR, VWAP, OBV, Sharpe ratio, drawdown analysis",
      "Regression package: linear, polynomial, exponential, logarithmic, power regression with trend lines and forecasting",
      "Statistics package: mean, median, mode, variance, percentile, quartiles, outliers, KDE, bootstrap confidence intervals",
      "Server-side rendering package with SVG and PNG/JPEG export",
      "CLI tool: generate charts from terminal with CSV/JSON input",
      "WebSocket/SSE streaming adapter for real-time data",
      "Testing utilities: mock data generators, chart data assertions, snapshot testing",
      "Improved SEO: expanded structured data, favicon.ico, updated OG image, enhanced meta tags",
      "NaN handling across all chart types for financial indicator warmup periods",
    ],
  },
  {
    version: "0.1.5",
    date: "2026-02-26",
    tag: null,
    changes: [
      "5 new chart types: Violin, Pack (circle packing), Voronoi, WordCloud, Pillar",
      "New GL chart: Torus3D with WebGL rendering",
      "Graph chart rewrite with simplified data convention, arrow-notation edges, and adjacency matrix support",
      "Improved graph layouts: force, hierarchical, and circular",
      "Globe3D rendering improvements",
      "New convenience APIs: Violin(), Pack(), Voronoi(), WordCloud(), Pillar()",
    ],
  },
  {
    version: "0.1.4",
    date: "2026-02-26",
    tag: null,
    changes: [
      "Added README files to all packages with install instructions, API docs, and examples",
      "Improved package descriptions across all packages",
      "Fixed cross-repo website redeploy in CI pipeline",
    ],
  },
  {
    version: "0.1.3",
    date: "2026-02-25",
    tag: null,
    changes: [
      "5 new data adapter packages: @chartts/csv, @chartts/json, @chartts/excel, @chartts/parquet, @chartts/arrow",
      "New @chartts/themes package with 8 extra theme presets",
      "Fixed Solid, Svelte, and Tailwind package builds",
      "Monorepo CI pipeline for npm publishing",
    ],
  },
  {
    version: "0.1.2",
    date: "2026-02-25",
    tag: null,
    changes: [
      "Updated npm README with chart screenshots and OG image",
      "Added demo image gallery to documentation",
      "Improved bundle size documentation",
    ],
  },
  {
    version: "0.1.1",
    date: "2026-02-24",
    tag: null,
    changes: [
      "Fixed dark mode gradient rendering",
      "Fixed CRLF line endings in SVG output",
      "Improved CSS animation handling for static renders",
    ],
  },
  {
    version: "0.1.0",
    date: "2026-02-23",
    tag: "Initial Release",
    changes: [
      "65+ chart types: line, bar, area, pie, donut, scatter, bubble, radar, candlestick, waterfall, funnel, gauge, sparkline, heatmap, treemap, boxplot, histogram, sankey, sunburst, and more",
      "SVG-first rendering with Canvas and WebGL fallbacks",
      "Full Tailwind CSS integration with className on every element",
      "Native dark mode support with dark: variants",
      "WCAG AA accessibility: keyboard navigation, screen readers, pattern fills",
      "TypeScript-first with full type inference",
      "Tree-shakeable ESM and CJS builds",
      "Under 15kb gzipped for the entire library",
      "Server-side rendering support",
      "Framework-agnostic core with renderToString API",
    ],
  },
];

export default function ChangelogPage() {
  return (
    <>
<section className="pt-24 sm:pt-32 pb-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight heading">
            Changelog
          </h1>
          <p className="mt-4 text-lg body-text">
            Every release, documented. Follow development on{" "}
            <a
              href="https://github.com/chartts/chartts/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              GitHub Releases
            </a>
            .
          </p>
        </div>
      </section>

      <section className="pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="relative border-l-2 border-zinc-800 pl-8 space-y-12">
            {releases.map((release) => (
              <div key={release.version} className="relative">
                {/* Timeline dot */}
                <div className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-zinc-900 border-2 border-cyan-500" />

                <div className="flex items-center gap-3 mb-3">
                  <h2 className="text-2xl font-bold font-mono heading">
                    v{release.version}
                  </h2>
                  {release.tag && (
                    <span className="px-2 py-0.5 text-xs font-mono rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      {release.tag}
                    </span>
                  )}
                </div>

                <p className="text-sm muted-text mb-4 font-mono">
                  {release.date}
                </p>

                <ul className="space-y-2">
                  {release.changes.map((change, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm body-text"
                    >
                      <span className="text-cyan-500 mt-1 shrink-0">+</span>
                      {change}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
</>
  );
}
