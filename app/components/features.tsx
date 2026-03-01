import Link from "next/link";

const features = [
  {
    title: "<15kb gzipped",
    description: "Smaller than most hero images. Your Lighthouse score stays green. Your users stay happy.",
    href: "/docs/performance",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path d="M20 12V6.5a2.5 2.5 0 00-2.5-2.5h-11A2.5 2.5 0 004 6.5v11A2.5 2.5 0 006.5 20H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M16 19l2 2 4-4" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 10h8M8 14h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "SVG-first",
    description: "Real DOM elements. Inspect in devtools. Style with CSS. Accessible to screen readers. Crisp at every zoom.",
    href: "/docs/svg",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7 14l3-4 3 2 4-5" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Multi-renderer",
    description: "SVG by default. Auto-switches to Canvas at 10k+ points, WebGL at 100k+. Zero configuration.",
    href: "/docs/renderers",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path d="M4 8l8-4 8 4-8 4-8-4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M4 12l8 4 8-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
        <path d="M4 16l8 4 8-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.3" />
      </svg>
    ),
  },
  {
    title: "Beautiful defaults",
    description: "Looks stunning out of the box. Smooth gradients, clean type, elegant animations. No config needed.",
    href: "/docs/themes",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path d="M12 2L9 9H2l5.5 4.5L5 21l7-5 7 5-2.5-7.5L22 9h-7L12 2z" stroke="#f59e0b" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Tailwind native",
    description: "className prop on every element. dark: variants. Your design tokens, your CSS. Charts that match your app.",
    href: "/docs/tailwind",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path d="M12 6C9.33 6 7.67 7.33 7 10c1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.9 1.35C13.4 10.86 14.6 12 17 12c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.9-1.35C15.6 7.14 14.4 6 12 6zM7 12c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.9 1.35C8.4 16.86 9.6 18 12 18c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.9-1.35C10.6 13.14 9.4 12 7 12z" stroke="#06b6d4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Every framework",
    description: "Native packages for React, Vue, Svelte, Solid, Angular, and Vanilla JS. Same API. Learn once, use anywhere.",
    href: "/docs/frameworks",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path d="M7 8l-4 4 4 4M17 8l4 4-4 4M14 4l-4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "TypeScript-first",
    description: "Strict mode, zero any. Full type inference on every prop. Autocomplete IS the documentation.",
    href: "/docs/typescript",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <rect x="3" y="3" width="18" height="18" rx="3" stroke="#3b82f6" strokeWidth="1.5" />
        <text x="12" y="16" textAnchor="middle" fill="#3b82f6" fontSize="10" fontWeight="bold" fontFamily="monospace">TS</text>
      </svg>
    ),
  },
  {
    title: "Accessible",
    description: "WCAG 2.1 AA by default. Keyboard nav, screen readers, pattern fills. Accessible by architecture, not afterthought.",
    href: "/docs/accessibility",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <circle cx="12" cy="4.5" r="2" stroke="#10b981" strokeWidth="1.5" />
        <path d="M12 7.5v5m0 0l-3 5m3-5l3 5M7 10.5h10" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const powerFeatures = [
  {
    title: "65+ chart types",
    description: "Sankey, treemap, sunburst, chord, parallel coordinates, network graphs, geo maps, 3D scatter, 3D surface, globe. All built in.",
    href: "/demos",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path d="M3 3v18h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M7 14l4-6 4 3 5-7" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="18" cy="6" r="2" fill="#f59e0b" fillOpacity="0.3" stroke="#f59e0b" strokeWidth="1" />
      </svg>
    ),
  },
  {
    title: "GPU accelerated",
    description: "@chartts/gl renders 100k+ data points at 60fps via WebGL. 13 3D chart types: Bar3D, Scatter3D, Surface3D, Globe3D, Map3D.",
    href: "/docs/charts",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path d="M4 8l8-4 8 4v8l-8 4-8-4V8z" stroke="#a855f7" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M4 8l8 4 8-4M12 12v8" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
      </svg>
    ),
  },
  {
    title: "Real-time streaming",
    description: "createStreamingChart() with rolling buffers and pause/resume. @chartts/websocket for WebSocket, SSE, and HTTP polling.",
    href: "/docs/streaming",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path d="M4 12h2l3-8 4 16 3-8h4" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Financial indicators",
    description: "@chartts/finance: SMA, EMA, RSI, MACD, Bollinger Bands, ATR, VWAP, Sharpe ratio. Pure math, zero dependencies.",
    href: "/docs/finance-pkg",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path d="M3 3v18h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M7 17V13M11 17V9M15 17V7M19 17V5" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />
        <path d="M7 10h4M11 6h4M15 4h4" stroke="#10b981" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
      </svg>
    ),
  },
  {
    title: "Plugin system",
    description: "defineChartType() creates fully custom chart types with render context, hit testing, and custom scales. Not locked in.",
    href: "/docs/plugins",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path d="M12 2v4m0 12v4M2 12h4m12 0h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="12" cy="12" r="5" stroke="#ec4899" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="2" fill="#ec4899" fillOpacity="0.3" />
      </svg>
    ),
  },
  {
    title: "Zoom, pan, brush",
    description: "Built-in interaction system. Zoom into ranges, pan across data, brush to select regions, crosshair for precision. linkCharts() for sync.",
    href: "/docs/zoom-pan",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <circle cx="10" cy="10" r="6" stroke="#06b6d4" strokeWidth="1.5" />
        <path d="M14.5 14.5L20 20" stroke="#06b6d4" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M10 7v6M7 10h6" stroke="#06b6d4" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      </svg>
    ),
  },
];

export function Features() {
  return (
    <>
    <section id="features" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="section-label text-cyan-400 mb-4">Why Chart.ts</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight heading">
            Everything you need.
            <br />
            <span className="faint-text">Nothing you don&apos;t.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature) => (
            <Link
              key={feature.title}
              href={feature.href}
              className="group p-5 rounded-xl card hover:border-cyan-500/20 transition-all cursor-pointer block"
            >
              <div className="muted-text group-hover:text-cyan-400 transition-colors mb-3">
                {feature.icon}
              </div>
              <h3 className="text-sm font-semibold heading mb-1.5">
                {feature.title}
              </h3>
              <p className="text-sm body-text leading-relaxed">
                {feature.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>

    {/* Power features */}
    <section id="power" className="pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="section-label text-amber-400 mb-4">Beyond the basics</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight heading">
            Enterprise power.
            <br />
            <span className="faint-text">Startup simplicity.</span>
          </h2>
        </div>

        {/* By the numbers */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          {[
            { num: "65+", label: "Chart types" },
            { num: "13", label: "WebGL/3D charts" },
            { num: "25", label: "npm packages" },
            { num: "100+", label: "Theme presets" },
            { num: "5", label: "Frameworks" },
            { num: "<15kb", label: "Gzipped" },
            { num: "AA", label: "WCAG accessible" },
            { num: "MIT", label: "Free forever" },
          ].map((stat) => (
            <div key={stat.label} className="text-center p-4 rounded-xl card">
              <p className="text-2xl sm:text-3xl font-extrabold font-mono text-cyan-400">{stat.num}</p>
              <p className="text-xs muted-text mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {powerFeatures.map((feature) => (
            <Link
              key={feature.title}
              href={feature.href}
              className="group p-5 rounded-xl card hover:border-amber-500/20 transition-all cursor-pointer block"
            >
              <div className="muted-text group-hover:text-amber-400 transition-colors mb-3">
                {feature.icon}
              </div>
              <h3 className="text-sm font-semibold heading mb-1.5">
                {feature.title}
              </h3>
              <p className="text-sm body-text leading-relaxed">
                {feature.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
    </>
  );
}
