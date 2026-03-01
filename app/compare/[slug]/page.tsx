import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Comparison = {
  name: string;
  fullName: string;
  description: string;
  bundleSize: string;
  treeshaking: string;
  typescript: string;
  ssr: string;
  accessibility: string;
  tailwind: string;
  license: string;
  chartTypes: string;
  frameworks: string;
  rendering: string;
  realtime: string;
  gpu: string;
  financial: string;
  plugins: string;
  interactions: string;
  advancedCharts: string;
  themePresets: string;
  weaknesses: string[];
  advantages: string[];
};

const comparisons: Record<string, Comparison> = {
  chartjs: {
    name: "Chart.js",
    fullName: "Chart.js",
    description:
      "Chart.js is the most popular canvas-based charting library. It renders to Canvas, which means no DOM access, no CSS styling, and no screen reader support without extra work.",
    bundleSize: "~60kb min+gzip",
    treeshaking: "Limited (v4 improved but still heavy)",
    typescript: "Community types (@types/chart.js)",
    ssr: "Requires node-canvas or chartjs-node-canvas",
    accessibility: "Canvas-based, no native a11y",
    tailwind: "Not supported (canvas rendering)",
    license: "MIT",
    chartTypes: "~10 built-in",
    frameworks: "Wrapper libraries (react-chartjs-2, etc.)",
    rendering: "Canvas only",
    realtime: "No built-in streaming",
    gpu: "No WebGL/3D",
    financial: "No financial indicators",
    plugins: "Plugin API (limited)",
    interactions: "Zoom plugin (separate)",
    advancedCharts: "8 basic types only",
    themePresets: "No presets",
    weaknesses: [
      "Canvas rendering means no CSS styling",
      "No native screen reader support",
      "Cannot use Tailwind or dark: variants",
      "SSR requires heavy node-canvas dependency",
      "Bundle includes all chart types by default",
    ],
    advantages: [
      "65+ chart types vs 8",
      "Real SVG rendering vs Canvas-only",
      "WebGL/3D charts built-in",
      "Native Tailwind with className",
      "Built-in financial indicators",
    ],
  },
  recharts: {
    name: "Recharts",
    fullName: "Recharts",
    description:
      "Recharts is a React-only SVG charting library built on D3. It provides good React integration but comes with a large bundle due to D3 dependencies.",
    bundleSize: "~45kb min+gzip",
    treeshaking: "Partial (D3 dependencies limit it)",
    typescript: "Built-in types",
    ssr: "Works with Next.js (client components)",
    accessibility: "Basic SVG roles",
    tailwind: "Limited (inline styles dominate)",
    license: "MIT",
    chartTypes: "~12 built-in",
    frameworks: "React only",
    rendering: "SVG only (via D3)",
    realtime: "No streaming",
    gpu: "No WebGL/3D",
    financial: "No",
    plugins: "No plugin system",
    interactions: "Basic brush only",
    advancedCharts: "12 types (no sankey, geo, 3D)",
    themePresets: "No presets",
    weaknesses: [
      "React only, no Vue/Svelte/Solid support",
      "Large bundle due to D3 dependency chain",
      "Inline styles make Tailwind integration awkward",
      "Client component required (no RSC)",
      "API is verbose with many wrapper components",
    ],
    advantages: [
      "65+ chart types vs 12",
      "Works with any framework, not React-only",
      "No D3 dependency chain (smaller bundle)",
      "Native Tailwind className on every element",
      "Built-in WebGL/3D and financial charts",
    ],
  },
  d3: {
    name: "D3",
    fullName: "D3.js",
    description:
      "D3 is the gold standard for custom data visualizations. It is incredibly powerful but has a steep learning curve and requires building everything from primitives.",
    bundleSize: "~30kb min+gzip (core)",
    treeshaking: "Good (modular packages)",
    typescript: "Community types",
    ssr: "Requires jsdom or similar",
    accessibility: "Manual implementation required",
    tailwind: "Manual (you build the DOM yourself)",
    license: "ISC",
    chartTypes: "Unlimited (build your own)",
    frameworks: "Framework-agnostic (manual DOM)",
    rendering: "SVG or Canvas (manual)",
    realtime: "Manual implementation",
    gpu: "No built-in WebGL",
    financial: "No (separate libraries)",
    plugins: "N/A (toolkit)",
    interactions: "Manual implementation",
    advancedCharts: "Unlimited (build yourself)",
    themePresets: "No presets",
    weaknesses: [
      "Steep learning curve, months to proficiency",
      "No pre-built chart components",
      "You build everything from primitives",
      "SSR requires jsdom workarounds",
      "Accessibility must be implemented manually",
    ],
    advantages: [
      "65+ ready-made charts vs build-from-scratch",
      "Minutes to first chart vs weeks with D3",
      "Built-in accessibility (WCAG AA)",
      "Native framework packages (React, Vue, etc.)",
      "Triple renderer auto-switches for performance",
    ],
  },
  visx: {
    name: "Visx",
    fullName: "Visx (Airbnb)",
    description:
      "Visx is Airbnb's collection of low-level D3-based React visualization primitives. Great for custom viz but requires significant assembly.",
    bundleSize: "~25kb min+gzip (varies by modules)",
    treeshaking: "Good (separate packages)",
    typescript: "Built-in types",
    ssr: "Partial (some components need client)",
    accessibility: "Manual implementation",
    tailwind: "Possible but not native",
    license: "MIT",
    chartTypes: "Build from primitives",
    frameworks: "React only",
    rendering: "SVG only",
    realtime: "Manual",
    gpu: "No",
    financial: "No",
    plugins: "N/A (primitives)",
    interactions: "Manual",
    advancedCharts: "Build from primitives",
    themePresets: "No presets",
    weaknesses: [
      "React only",
      "Low-level primitives, not ready-made charts",
      "Requires deep D3 knowledge",
      "No simple API for common charts",
      "Significant assembly required for basic charts",
    ],
    advantages: [
      "65+ ready-made charts vs assemble-it-yourself",
      "Works with any framework, not React-only",
      "Simple declarative API vs low-level primitives",
      "Built-in streaming, WebGL, and financial charts",
      "No D3 knowledge required",
    ],
  },
  apexcharts: {
    name: "ApexCharts",
    fullName: "ApexCharts",
    description:
      "ApexCharts is a feature-rich SVG charting library with many chart types and interactivity. However it carries a large bundle and uses a jQuery-era API.",
    bundleSize: "~130kb min+gzip",
    treeshaking: "Not supported (monolithic bundle)",
    typescript: "Built-in types",
    ssr: "Limited (DOM-dependent)",
    accessibility: "Basic",
    tailwind: "Not native (imperative config)",
    license: "MIT",
    chartTypes: "~15 built-in",
    frameworks: "Wrappers for React, Vue, Angular",
    rendering: "SVG only",
    realtime: "Basic append",
    gpu: "No WebGL/3D",
    financial: "Candlestick only",
    plugins: "Limited customization",
    interactions: "Zoom, pan, brush",
    advancedCharts: "14 types (no sankey, geo, 3D)",
    themePresets: "3 palettes",
    weaknesses: [
      "Massive 130kb+ bundle",
      "No tree-shaking, imports everything",
      "jQuery-era imperative API",
      "Not Tailwind-native",
      "Heavy for modern web apps",
    ],
    advantages: [
      "Under 15kb vs 130kb+ bundle",
      "Full tree-shaking vs monolithic import",
      "Modern declarative API vs jQuery-era config",
      "65+ chart types with WebGL/3D",
      "Native Tailwind CSS integration",
    ],
  },
  nivo: {
    name: "Nivo",
    fullName: "Nivo",
    description:
      "Nivo provides beautiful React chart components built on D3. It has great defaults but is React-only and the D3 dependency makes bundles large.",
    bundleSize: "~40kb min+gzip (per chart package)",
    treeshaking: "Good (separate packages)",
    typescript: "Built-in types",
    ssr: "Partial (canvas charts need client)",
    accessibility: "Good (ARIA labels)",
    tailwind: "Not native (theme config object)",
    license: "MIT",
    chartTypes: "~20 built-in",
    frameworks: "React only",
    rendering: "SVG + Canvas (per chart)",
    realtime: "No streaming",
    gpu: "No WebGL/3D",
    financial: "No",
    plugins: "No plugin system",
    interactions: "Basic hover only",
    advancedCharts: "15 types (no 3D, limited financial)",
    themePresets: "Custom theme object",
    weaknesses: [
      "React only",
      "Large per-chart bundles due to D3",
      "Theme system is separate from Tailwind",
      "No className prop on chart elements",
      "Cannot use dark: variants directly",
    ],
    advantages: [
      "65+ chart types vs 15",
      "Works with any framework, not React-only",
      "Native Tailwind className vs custom theme objects",
      "Built-in WebGL/3D and financial charts",
      "Smaller bundle with no D3 dependency",
    ],
  },
  echarts: {
    name: "ECharts",
    fullName: "Apache ECharts",
    description:
      "ECharts is a powerful, enterprise-grade charting library from Apache. It supports many chart types but has an enormous bundle and complex configuration.",
    bundleSize: "~300kb+ min+gzip",
    treeshaking: "Partial (still very large)",
    typescript: "Built-in types",
    ssr: "Server-side rendering available",
    accessibility: "Basic ARIA support",
    tailwind: "Not supported (canvas/SVG hybrid)",
    license: "Apache 2.0",
    chartTypes: "30+ built-in",
    frameworks: "Wrappers available",
    rendering: "Canvas + SVG",
    realtime: "Basic streaming",
    gpu: "WebGL via GL extension",
    financial: "Candlestick only",
    plugins: "Custom series",
    interactions: "Zoom, brush, dataZoom",
    advancedCharts: "20+ types (sankey, geo, graph, 3D)",
    themePresets: "~10 presets",
    weaknesses: [
      "Enormous bundle size (300kb+)",
      "Complex nested configuration objects",
      "Not Tailwind-native",
      "Over-engineered for most use cases",
      "Learning curve for configuration",
    ],
    advantages: [
      "Under 15kb vs 300kb+",
      "Native Tailwind CSS integration",
      "Better TypeScript (strict, zero any)",
      "Native framework packages (not wrappers)",
      "Same chart breadth at 1/20th the size",
    ],
  },
  highcharts: {
    name: "Highcharts",
    fullName: "Highcharts",
    description:
      "Highcharts is a commercial charting library with a long history. It is powerful and feature-rich, but costs $590 per developer per year and uses a legacy API design.",
    bundleSize: "~80kb min+gzip",
    treeshaking: "Limited (monolithic core)",
    typescript: "Built-in types",
    ssr: "Server-side rendering available",
    accessibility: "Accessibility module (enterprise only)",
    tailwind: "Not supported (imperative config)",
    license: "Commercial ($590/dev/yr)",
    chartTypes: "~25 built-in",
    frameworks: "Wrappers for React, Angular, Vue",
    rendering: "SVG + Canvas fallback",
    realtime: "Dynamic update API",
    gpu: "No WebGL (Highcharts 3D is CSS transform)",
    financial: "Highstock (separate product, paid)",
    plugins: "Extension API",
    interactions: "Zoom, pan, crosshair",
    advancedCharts: "30+ types (with paid modules)",
    themePresets: "~10 presets",
    weaknesses: [
      "$590 per developer per year licensing cost",
      "jQuery-era imperative API design",
      "Accessibility locked behind enterprise tier",
      "Not Tailwind-native, uses imperative config objects",
      "Large monolithic bundle, limited tree-shaking",
    ],
    advantages: [
      "MIT free vs $590/developer/year",
      "Same feature breadth, all included",
      "Native Tailwind CSS integration",
      "Better TypeScript DX (strict, full inference)",
      "WebGL included (not a paid add-on)",
    ],
  },
  plotly: {
    name: "Plotly.js",
    fullName: "Plotly.js",
    description:
      "Plotly.js is a scientific charting library popular in data science. It supports 65+ chart types but ships an enormous bundle and is primarily designed for Python/R workflows, not modern JavaScript frameworks.",
    bundleSize: "~1MB min+gzip (full), ~300kb partial",
    treeshaking: "Partial bundles available but still very large",
    typescript: "Community types (@types/plotly.js)",
    ssr: "Not supported (DOM-dependent)",
    accessibility: "Basic",
    tailwind: "Not supported (imperative config)",
    license: "MIT",
    chartTypes: "40+ (including 3D, maps)",
    frameworks: "React wrapper (react-plotly.js)",
    rendering: "SVG + WebGL (for scatter)",
    realtime: "Plotly.extendTraces()",
    gpu: "WebGL scatter only",
    financial: "Candlestick, OHLC",
    plugins: "No",
    interactions: "Zoom, pan, hover",
    advancedCharts: "40+ types (3D, maps, sankey)",
    themePresets: "3 templates",
    weaknesses: [
      "Enormous bundle size (~1MB full, ~300kb partial)",
      "Python/R-first ecosystem, JS is secondary",
      "No SSR support, requires DOM",
      "Not Tailwind-native, imperative config objects",
      "No tree-shaking for individual chart types",
    ],
    advantages: [
      "Under 15kb vs 300kb-1MB bundle",
      "JavaScript-first, not a Python port",
      "Full SSR support vs DOM-dependent",
      "Native Tailwind CSS integration",
      "Full WebGL/3D (not just scatter)",
    ],
  },
  victory: {
    name: "Victory",
    fullName: "Victory (Formidable)",
    description:
      "Victory is a React charting library by Formidable. It renders to SVG and has a composable API, but is React-only with a D3 dependency chain that inflates bundle size.",
    bundleSize: "~50kb min+gzip",
    treeshaking: "Partial (D3 dependencies limit it)",
    typescript: "Built-in types",
    ssr: "Partial (some components need client)",
    accessibility: "Basic SVG roles",
    tailwind: "Not native (inline styles)",
    license: "MIT",
    chartTypes: "~12 built-in",
    frameworks: "React and React Native only",
    rendering: "SVG only",
    realtime: "No streaming",
    gpu: "No",
    financial: "No",
    plugins: "No",
    interactions: "Zoom via VictoryZoomContainer",
    advancedCharts: "12 types (basic)",
    themePresets: "Material, grayscale",
    weaknesses: [
      "React only, no Vue/Svelte/Solid/Angular",
      "D3 dependency inflates bundle size",
      "Inline styles, not Tailwind-native",
      "No Server Component support",
      "Limited chart types compared to alternatives",
    ],
    advantages: [
      "65+ chart types vs 12",
      "Works with any framework, not React-only",
      "Native Tailwind className vs inline styles",
      "Built-in WebGL/3D and streaming",
      "Full financial chart support",
    ],
  },
  tremor: {
    name: "Tremor",
    fullName: "Tremor",
    description:
      "Tremor is a React dashboard component library that uses Recharts under the hood. It provides pre-styled components but is locked to React and wraps Recharts, inheriting its limitations.",
    bundleSize: "~60kb+ min+gzip (Tremor + Recharts + D3)",
    treeshaking: "Limited (Recharts + D3 dependency chain)",
    typescript: "Built-in types",
    ssr: "Client components only (no RSC)",
    accessibility: "Basic ARIA",
    tailwind: "Uses Tailwind for wrapper styling, not chart internals",
    license: "Apache 2.0",
    chartTypes: "~8 chart types (via Recharts)",
    frameworks: "React only",
    rendering: "SVG (via Recharts)",
    realtime: "No",
    gpu: "No",
    financial: "No",
    plugins: "No",
    interactions: "No",
    advancedCharts: "8 types (dashboard components)",
    themePresets: "Tailwind theme",
    weaknesses: [
      "React only, no other framework support",
      "Wraps Recharts, inheriting its bundle weight",
      "Cannot style individual chart elements with Tailwind",
      "Requires Client Components (no RSC)",
      "Limited to Recharts chart types",
    ],
    advantages: [
      "65+ chart types vs 8",
      "Works with any framework, not React-only",
      "True Tailwind on chart elements (not just wrapper)",
      "Built-in WebGL/3D, streaming, financial charts",
      "Under 15kb vs 60kb+ (Tremor + Recharts + D3)",
    ],
  },
  tradingview: {
    name: "Lightweight Charts",
    fullName: "TradingView Lightweight Charts",
    description:
      "TradingView Lightweight Charts is a financial charting library focused on candlestick and time-series charts. Great for trading UIs but limited to financial chart types and Canvas rendering.",
    bundleSize: "~45kb min+gzip",
    treeshaking: "Not applicable (single-purpose library)",
    typescript: "Built-in types",
    ssr: "Not supported (Canvas-based, needs DOM)",
    accessibility: "None (Canvas rendering)",
    tailwind: "Not supported (Canvas rendering)",
    license: "Apache 2.0",
    chartTypes: "~5 (candlestick, line, area, bar, histogram)",
    frameworks: "Vanilla JS (wrappers available)",
    rendering: "Canvas (HTML5)",
    realtime: "Built-in streaming API",
    gpu: "No WebGL",
    financial: "Full (indicators, overlays)",
    plugins: "Custom indicators",
    interactions: "Zoom, pan, crosshair",
    advancedCharts: "Financial only (4-5 types)",
    themePresets: "Light/dark",
    weaknesses: [
      "Financial charts only, no general-purpose charts",
      "Canvas rendering, no CSS styling",
      "No accessibility support",
      "Cannot SSR (requires DOM)",
      "No pie, radar, treemap, sankey, etc.",
    ],
    advantages: [
      "65+ chart types (general-purpose + financial)",
      "SVG rendering with CSS/Tailwind styling",
      "WCAG AA accessible by default",
      "Full SSR support",
      "WebGL/3D charts (scatter, surface, globe)",
    ],
  },
  "shadcn-charts": {
    name: "shadcn Charts",
    fullName: "shadcn/ui Charts",
    description:
      "shadcn/ui Charts are copy-paste React chart components that wrap Recharts. They provide beautiful defaults but inherit Recharts limitations: large bundle, React-only, no RSC.",
    bundleSize: "~45kb+ min+gzip (Recharts + D3 chain)",
    treeshaking: "Limited (Recharts + D3 dependencies)",
    typescript: "Built-in types",
    ssr: "Client components only (no RSC)",
    accessibility: "Basic (Recharts underlying)",
    tailwind: "Styled wrapper, but chart internals use inline styles",
    license: "MIT",
    chartTypes: "~6 (area, bar, line, pie, radar, radial)",
    frameworks: "React only",
    rendering: "SVG (via Recharts)",
    realtime: "No",
    gpu: "No",
    financial: "No",
    plugins: "No",
    interactions: "No built-in",
    advancedCharts: "6 types (wrapper components)",
    themePresets: "Tailwind theme",
    weaknesses: [
      "React only, no Vue/Svelte/Solid/Angular",
      "Wraps Recharts, inheriting its ~45kb bundle",
      "Only 6 chart types available",
      "Chart internals use inline styles, not Tailwind",
      "Requires Client Components (no RSC support)",
    ],
    advantages: [
      "65+ chart types vs 6",
      "Works with any framework, not React-only",
      "True Tailwind className on chart elements",
      "Built-in WebGL/3D, streaming, financial charts",
      "Under 15kb vs 45kb+ (Recharts + D3 chain)",
    ],
  },
  "google-charts": {
    name: "Google Charts",
    fullName: "Google Charts",
    description:
      "Google Charts is a free charting API that loads from Google's CDN. It requires an internet connection, sends data to Google servers, and provides limited customization with a dated visual style.",
    bundleSize: "~150kb (loaded from CDN at runtime)",
    treeshaking: "Not possible (CDN-loaded bundle)",
    typescript: "Community types",
    ssr: "Not supported (requires Google CDN + DOM)",
    accessibility: "Limited",
    tailwind: "Not supported (Google's styling system)",
    license: "Free (but proprietary, not open source)",
    chartTypes: "~30 built-in",
    frameworks: "Vanilla JS, React wrapper available",
    rendering: "SVG",
    realtime: "No streaming",
    gpu: "No",
    financial: "Candlestick",
    plugins: "No",
    interactions: "Select, zoom",
    advancedCharts: "25+ types (geo, sankey, treemap)",
    themePresets: "Material theme",
    weaknesses: [
      "Requires internet connection (CDN dependency)",
      "Data sent to Google servers (privacy concern)",
      "Not self-hostable, proprietary code",
      "Dated visual design, limited customization",
      "Cannot use Tailwind CSS or custom styling",
    ],
    advantages: [
      "Self-hosted, no CDN dependency",
      "Data stays private (no Google servers)",
      "Open source MIT vs proprietary",
      "Native Tailwind CSS integration",
      "Built-in WebGL/3D and financial indicators",
    ],
  },
};

const charttsStats = {
  bundleSize: "<15kb min+gzip (entire library)",
  treeshaking: "Full (import only what you use)",
  typescript: "Built-in, strict mode, full inference",
  ssr: "Native SSR, works with any framework",
  accessibility: "WCAG AA, keyboard nav, screen readers, pattern fills",
  tailwind: "Native className on every element, dark: variants",
  license: "MIT",
  chartTypes: "65+ built-in (52 core + 13 WebGL/3D)",
  frameworks: "React, Vue, Svelte, Solid, Angular, Vanilla JS",
  rendering: "Triple engine: SVG + Canvas + WebGL (auto-switching at 10k/100k points)",
  realtime: "Built-in streaming, WebSocket, SSE, HTTP polling via @chartts/websocket",
  gpu: "WebGL renderer + @chartts/gl with 13 3D chart types (Scatter3D, Surface3D, Globe3D, etc.)",
  financial: "@chartts/finance: SMA, EMA, RSI, MACD, Bollinger Bands, ATR, VWAP, Sharpe ratio",
  plugins: "defineChartType() with render context, hit testing, custom scales",
  interactions: "Zoom, pan, brush selection, crosshair, linked charts",
  advancedCharts: "Sankey, treemap, sunburst, chord, geo maps, network graphs, 3D globe",
  themePresets: "34 presets (Nord, Dracula, Catppuccin, Tokyo Night, Material, etc.)",
};

function Check() {
  return (
    <svg
      className="w-5 h-5 text-emerald-400 shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function X() {
  return (
    <svg
      className="w-5 h-5 text-red-400/70 shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}

const slugs = Object.keys(comparisons);

export function generateStaticParams() {
  return slugs.map((slug) => ({ slug }));
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const comp = comparisons[slug];
  if (!comp) return {};
  return {
    title: `Chart.ts vs ${comp.fullName}`,
    description: `Compare Chart.ts with ${comp.fullName}. See how Chart.ts offers a smaller bundle, better Tailwind integration, full accessibility, and 65+ chart types.`,
  };
}

export default async function ComparePage({ params }: PageProps) {
  const { slug } = await params;
  const comp = comparisons[slug];
  if (!comp) notFound();

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://chartts.com" },
      { "@type": "ListItem", position: 2, name: "Compare", item: "https://chartts.com/compare" },
      { "@type": "ListItem", position: 3, name: `Chart.ts vs ${comp.fullName}`, item: `https://chartts.com/compare/${slug}` },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `How does Chart.ts compare to ${comp.fullName}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Chart.ts offers 65+ chart types (52 core + 13 WebGL/3D), triple-renderer architecture, real-time streaming, and financial indicators in under 15kb. ${comp.fullName} has limitations including: ${comp.weaknesses[0].toLowerCase()}.`,
        },
      },
      {
        "@type": "Question",
        name: "Does Chart.ts support WebGL and 3D charts?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Chart.ts includes @chartts/gl with 13 WebGL/3D chart types including Scatter3D, Surface3D, Globe3D, Bar3D, and Map3D. The triple renderer auto-switches to WebGL at 100k+ data points for GPU-accelerated performance.",
        },
      },
      {
        "@type": "Question",
        name: "Does Chart.ts support real-time streaming data?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Chart.ts provides createStreamingChart() with rolling buffers and pause/resume, plus @chartts/websocket for WebSocket, Server-Sent Events, and HTTP polling with auto-reconnect.",
        },
      },
      {
        "@type": "Question",
        name: "Is Chart.ts suitable for financial and trading applications?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Chart.ts includes candlestick, OHLC, volume, kagi, and renko chart types, plus @chartts/finance with SMA, EMA, RSI, MACD, Bollinger Bands, ATR, VWAP, and Sharpe ratio.",
        },
      },
    ],
  };

  const rows: { label: string; chartts: string; other: string }[] = [
    { label: "Bundle size", chartts: charttsStats.bundleSize, other: comp.bundleSize },
    { label: "Tree-shaking", chartts: charttsStats.treeshaking, other: comp.treeshaking },
    { label: "TypeScript", chartts: charttsStats.typescript, other: comp.typescript },
    { label: "SSR", chartts: charttsStats.ssr, other: comp.ssr },
    { label: "Accessibility", chartts: charttsStats.accessibility, other: comp.accessibility },
    { label: "Tailwind CSS", chartts: charttsStats.tailwind, other: comp.tailwind },
    { label: "Chart types", chartts: charttsStats.chartTypes, other: comp.chartTypes },
    { label: "Frameworks", chartts: charttsStats.frameworks, other: comp.frameworks },
    { label: "License", chartts: charttsStats.license, other: comp.license },
    { label: "Rendering", chartts: charttsStats.rendering, other: comp.rendering },
    { label: "Real-Time", chartts: charttsStats.realtime, other: comp.realtime },
    { label: "GPU / 3D", chartts: charttsStats.gpu, other: comp.gpu },
    { label: "Financial", chartts: charttsStats.financial, other: comp.financial },
    { label: "Plugins", chartts: charttsStats.plugins, other: comp.plugins },
    { label: "Interactions", chartts: charttsStats.interactions, other: comp.interactions },
    { label: "Advanced Charts", chartts: charttsStats.advancedCharts, other: comp.advancedCharts },
    { label: "Theme Presets", chartts: charttsStats.themePresets, other: comp.themePresets },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
<section className="pt-24 sm:pt-32 pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/compare"
            className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
          >
            &larr; All comparisons
          </Link>

          <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold tracking-tight heading">
            Chart.ts vs {comp.fullName}
          </h1>
          <p className="mt-4 text-lg body-text max-w-2xl">{comp.description}</p>
        </div>
      </section>

      {/* Comparison table */}
      <section className="pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-xl card overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b adaptive-border">
                  <th className="text-left p-4 font-mono text-xs muted-text uppercase tracking-wider">
                    Feature
                  </th>
                  <th className="text-left p-4 font-mono text-xs text-cyan-400 uppercase tracking-wider">
                    Chart.ts
                  </th>
                  <th className="text-left p-4 font-mono text-xs muted-text uppercase tracking-wider">
                    {comp.name}
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr
                    key={row.label}
                    className={
                      i < rows.length - 1 ? "border-b adaptive-border" : ""
                    }
                  >
                    <td className="p-4 font-medium heading">{row.label}</td>
                    <td className="p-4 text-emerald-400/90">{row.chartts}</td>
                    <td className="p-4 body-text">{row.other}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Why Chart.ts */}
      <section className="pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold heading mb-6">
            Why switch from {comp.name}?
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-xl card p-6">
              <h3 className="font-semibold heading mb-4 flex items-center gap-2">
                <Check />
                Chart.ts advantages
              </h3>
              <ul className="space-y-3">
                {comp.advantages.map((a) => (
                  <li
                    key={a}
                    className="flex items-start gap-2 body-text text-sm"
                  >
                    <Check />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl card p-6">
              <h3 className="font-semibold heading mb-4 flex items-center gap-2">
                <X />
                {comp.name} limitations
              </h3>
              <ul className="space-y-3">
                {comp.weaknesses.map((w) => (
                  <li
                    key={w}
                    className="flex items-start gap-2 body-text text-sm"
                  >
                    <X />
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold heading">Ready to switch?</h2>
          <p className="mt-3 body-text">
            Get started with Chart.ts in 30 seconds.
          </p>
          <div className="mt-8 inline-flex items-center gap-3 px-6 py-4 rounded-xl card">
            <span className="muted-text font-mono text-sm">$</span>
            <code className="text-lg font-mono heading">
              npm install @chartts/core
            </code>
          </div>
          <div className="mt-6 flex items-center justify-center gap-4">
            <Link
              href="/docs"
              className="px-6 py-3 text-sm font-semibold rounded-lg bg-cyan-500 text-white hover:bg-cyan-400 transition-colors cursor-pointer"
            >
              Get Started
            </Link>
            <Link
              href="/demos"
              className="px-6 py-3 text-sm font-semibold rounded-lg card body-text transition-all cursor-pointer"
            >
              See Demos
            </Link>
          </div>
        </div>
      </section>
</>
  );
}
