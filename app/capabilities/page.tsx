import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chart.ts Capabilities - 65+ Chart Types, WebGL, Streaming, Financial",
  description:
    "Complete list of Chart.ts capabilities: 65+ chart types across 10 categories, triple-renderer architecture (SVG, Canvas, WebGL), real-time streaming, financial indicators, plugin system, 5 framework packages, WCAG AA accessibility, under 15kb gzipped.",
  keywords: [
    "chart library",
    "javascript charts",
    "typescript charts",
    "webgl charts",
    "svg charts",
    "canvas charts",
    "react charts",
    "vue charts",
    "svelte charts",
    "real-time charts",
    "financial charts",
    "streaming charts",
    "data visualization",
    "chart types",
    "lightweight charts",
  ],
};

const stats = [
  { value: "65+", label: "Chart Types" },
  { value: "13", label: "WebGL/3D" },
  { value: "25", label: "Packages" },
  { value: "100+", label: "Themes" },
  { value: "5", label: "Frameworks" },
  { value: "<15kb", label: "Gzipped" },
  { value: "WCAG AA", label: "Accessible" },
  { value: "MIT", label: "License" },
];

const sections = [
  {
    icon: "M4 6h16M4 10h16M4 14h16M4 18h16",
    title: "Chart Types",
    description: "65+ chart types across 10 categories",
    items: [
      "Trending: line, area, step, sparkline, range, baseline, combo",
      "Comparison: bar, stacked-bar, horizontal-bar, lollipop, bullet, dumbbell, pareto",
      "Composition: pie, donut, treemap, sunburst, pack, funnel, waterfall",
      "Distribution: scatter, bubble, histogram, boxplot, violin, heatmap",
      "Radial: radar, polar, radial-bar, gauge",
      "Financial: candlestick, ohlc, volume, kagi, renko",
      "Relationship: sankey, chord, graph, parallel, lines",
      "Hierarchy: tree, org, gantt, flow",
      "Specialty: calendar, matrix, geo, wordcloud, voronoi, themeriver, pictorialbar, pillar",
      "3D/WebGL: scatter3d, bar3d, surface3d, globe3d, map3d, line3d, lines3d, torus3d, scatter-gl, lines-gl, flow-gl, graph-gl",
    ],
  },
  {
    icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    title: "Rendering Architecture",
    description: "Triple engine: SVG, Canvas, WebGL",
    items: [
      "SVG (default): Full DOM access, CSS styling, screen reader support, server-side rendering",
      "Canvas (auto at 10k+ points): 60fps 2D rendering for medium datasets",
      "WebGL (auto at 100k+ points): GPU-accelerated rendering for millions of data points",
      "Manual renderer override available via renderer option",
    ],
  },
  {
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
    title: "Real-Time Streaming",
    description: "Live data, built in",
    items: [
      "createStreamingChart() with circular buffer for memory-efficient streaming",
      "@chartts/websocket: WebSocket, Server-Sent Events (SSE), HTTP polling adapters",
      "Auto-reconnect with exponential backoff, configurable message parsing",
      "Pause/resume, batch push, requestAnimationFrame-throttled rendering",
    ],
  },
  {
    icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    title: "Financial Analysis",
    description: "Professional-grade indicators",
    items: [
      "SMA, EMA, WMA moving averages with configurable periods",
      "RSI, Stochastic, MACD oscillators for momentum analysis",
      "Bollinger Bands, ATR volatility indicators",
      "VWAP, OBV volume indicators for intraday analysis",
      "Sharpe ratio, max drawdown, cumulative returns for portfolio analytics",
    ],
  },
  {
    icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
    title: "GPU Acceleration & 3D",
    description: "WebGL rendering for large datasets",
    items: [
      "@chartts/gl package with 13 dedicated 3D chart types",
      "100k+ data points rendered at 60fps with GPU acceleration",
      "Interactive 3D: orbit controls, mouse picking, camera animation",
      "Globe3D, Surface3D, Scatter3D, Map3D, Bar3D, Line3D, Lines3D, Torus3D",
    ],
  },
  {
    icon: "M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z",
    title: "Plugin System",
    description: "Build anything",
    items: [
      "defineChartType() API for registering custom chart types",
      "Render context provides: scales, theme, data, chart area dimensions",
      "Custom hit testing for interactive tooltips and click handlers",
      "Renderer-agnostic plugins work across SVG, Canvas, and WebGL",
    ],
  },
  {
    icon: "M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122",
    title: "Interaction System",
    description: "Zoom, pan, brush, crosshair",
    items: [
      "Wheel zoom with pinch-to-zoom touch support",
      "Drag pan with axis locking (x-only, y-only, free)",
      "Brush selection with shift+drag for range highlighting",
      "Crosshair with value labels and snap-to-point",
      "linkCharts() for synchronized cross-chart interactions",
    ],
  },
  {
    icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
    title: "Framework Support",
    description: "Native packages, not wrappers",
    items: [
      "React: hooks-based API, ref forwarding, Next.js SSR with @chartts/ssr",
      "Vue 3: Composition API, reactive props, Nuxt SSR support",
      "Svelte: store-based reactivity, SvelteKit SSR support",
      "Solid: signal-based updates, SolidStart SSR support",
      "Angular: standalone components, signal inputs, Angular SSR support",
    ],
  },
  {
    icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
    title: "Ecosystem",
    description: "25 npm packages",
    items: [
      "Core: @chartts/core",
      "Frameworks: @chartts/react, @chartts/vue, @chartts/svelte, @chartts/solid, @chartts/angular",
      "Rendering: @chartts/gl",
      "Analysis: @chartts/finance, @chartts/regression, @chartts/statistics",
      "Data: @chartts/csv, @chartts/json, @chartts/excel, @chartts/parquet, @chartts/arrow",
      "Adapters: @chartts/date-fns, @chartts/dayjs, @chartts/tailwind",
      "Features: @chartts/websocket, @chartts/ssr, @chartts/annotation, @chartts/datalabels",
      "Tools: @chartts/cli, @chartts/test-utils, @chartts/themes",
    ],
  },
  {
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    title: "Enterprise Ready",
    description: "Production infrastructure",
    items: [
      "WCAG AA accessible: keyboard navigation, screen reader labels, focus management",
      "Server-side rendering with @chartts/ssr for Next.js, Nuxt, SvelteKit, SolidStart",
      "TypeScript strict mode with full type inference and generic chart configs",
      "100+ theme presets including dark/light variants, editor themes, brand themes, accessibility themes",
      "CLI tool for CI/CD headless chart image generation",
      "Testing utilities with @chartts/test-utils for unit and snapshot testing",
    ],
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Chart.ts Capabilities",
  description:
    "Complete list of Chart.ts charting library capabilities: 65+ chart types, triple-renderer architecture, real-time streaming, financial indicators, and more.",
  numberOfItems: sections.length,
  itemListElement: sections.map((section, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: section.title,
    description: section.description,
  })),
};

export default function CapabilitiesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="pt-24 sm:pt-32 pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight heading">
            Everything you need. Nothing you don&apos;t.
          </h1>
          <p className="mt-4 text-lg body-text max-w-2xl mx-auto">
            65+ chart types, triple-renderer architecture, real-time streaming,
            financial indicators, and a full plugin system. Under 15kb.
          </p>
        </div>
      </section>

      {/* By the Numbers */}
      <section className="pb-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold heading text-center mb-8">
            By the Numbers
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl card p-5 text-center"
              >
                <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm muted-text">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capability Sections */}
      <section className="pb-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-10">
          {sections.map((section) => (
            <div key={section.title} className="rounded-2xl card p-8">
              <div className="flex items-start gap-4 mb-5">
                <div className="w-10 h-10 shrink-0 flex items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d={section.icon}
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold heading">
                    {section.title}
                  </h2>
                  <p className="text-sm body-text">{section.description}</p>
                </div>
              </div>
              <ul className="space-y-2.5 ml-14">
                {section.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm body-text"
                  >
                    <svg
                      className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
