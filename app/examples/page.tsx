import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = {
  title: "Examples | Chart.ts",
  description:
    "Real-world Chart.ts examples. Full dashboards, financial views, analytics platforms, and production-ready components.",
};

const featured = [
  {
    title: "Stock Trading Dashboard",
    description:
      "Full trading view with candlestick, volume, OHLC, sparkline KPIs, moving averages, and Kagi reversal chart.",
    tags: ["Candlestick", "Volume", "Kagi", "Sparkline", "Line"],
    href: "/examples/stock-tracker",
    badge: "Finance",
  },
  {
    title: "Analytics Platform",
    description:
      "Traffic area chart, activity heatmap, conversion funnel, traffic source donut, and top pages breakdown.",
    tags: ["Area", "Heatmap", "Donut", "Funnel", "Bar"],
    href: "/examples/analytics",
    badge: "Analytics",
  },
  {
    title: "Sales Dashboard",
    description:
      "Revenue trends, quarterly comparisons, P&L waterfall, pipeline funnel, team radar, and regional bar charts.",
    tags: ["Area", "Waterfall", "Funnel", "Radar", "Gauge"],
    href: "/examples/sales-dashboard",
    badge: "Business",
  },
];

const examples = [
  {
    title: "Financial P&L Dashboard",
    description: "Profit & loss waterfall with quarterly revenue comparison, margin trends, and expense breakdown.",
    tags: ["Waterfall", "Bar", "Line"],
    href: "/examples/financial-waterfall",
  },
  {
    title: "Conversion Funnel",
    description: "Multi-step funnel with source breakdown donut, weekly conversion trends, and stage analysis.",
    tags: ["Funnel", "Donut", "Line"],
    href: "/examples/conversion-funnel",
  },
  {
    title: "Team Performance",
    description: "Multi-dimensional team analysis with radar comparisons, individual scores, and performance trends.",
    tags: ["Radar", "Horizontal Bar", "Line"],
    href: "/examples/team-performance",
  },
  {
    title: "Infrastructure Monitor",
    description: "Real-time server monitoring with CPU/memory charts, request distribution, response latency, and gauges.",
    tags: ["Line", "Gauge", "Bar", "Area"],
    href: "/examples/realtime-monitor",
  },
  {
    title: "Dark Mode Charts",
    description: "Charts that respond to Tailwind dark mode. Line, bar, pie, and scatter with automatic theme adaptation.",
    tags: ["Line", "Bar", "Pie", "Scatter"],
    href: "/examples/dark-mode",
  },
  {
    title: "Responsive Grid",
    description: "Charts that scale from mobile to desktop with Tailwind responsive utilities and SVG viewBox scaling.",
    tags: ["Line", "Bar", "Donut"],
    href: "/examples/responsive",
  },
  {
    title: "Multi-Series Comparison",
    description: "Compare 4 product lines with line charts, stacked bars, and revenue share pie chart.",
    tags: ["Line", "Stacked Bar", "Pie"],
    href: "/examples/multi-series",
  },
  {
    title: "Scatter Analysis",
    description: "Scatter plots and bubble charts showing correlations and market segment analysis.",
    tags: ["Scatter", "Bubble"],
    href: "/examples/scatter-regression",
  },
  {
    title: "KPI Cards Dashboard",
    description: "Executive KPI cards with sparklines, gauges, trend indicators, and mini charts.",
    tags: ["Sparkline", "Gauge"],
    href: "/examples/kpi-cards",
  },
];

export default function ExamplesPage() {
  return (
    <>
      <div className="pt-24 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="section-label text-cyan-400 mb-4">Examples</p>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight heading">
              Production-ready dashboards.
            </h1>
            <p className="mt-4 text-lg body-text max-w-2xl mx-auto">
              Full multi-chart dashboards with KPIs, real data, and
              copy-paste code. Styled, responsive, ready to ship.
            </p>
          </div>

          {/* Featured */}
          <div className="mb-12">
            <p className="text-xs font-mono muted-text uppercase tracking-wider mb-4">
              Featured Dashboards
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {featured.map((example) => (
                <Link
                  key={example.title}
                  href={example.href}
                  className="group p-6 rounded-xl card hover:border-cyan-500/20 transition-all cursor-pointer relative overflow-hidden"
                >
                  <span className="absolute top-4 right-4 px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    {example.badge}
                  </span>
                  <h3 className="text-lg font-semibold heading group-hover:text-cyan-400 transition-colors mb-2 pr-16">
                    {example.title}
                  </h3>
                  <p className="text-sm muted-text leading-relaxed mb-4">
                    {example.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {example.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded text-[11px] font-mono muted-text"
                        style={{ background: "var(--c-card-bg)", border: "1px solid var(--c-border)" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* All */}
          <div>
            <p className="text-xs font-mono muted-text uppercase tracking-wider mb-4">
              All Examples
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {examples.map((example) => (
                <Link
                  key={example.title}
                  href={example.href}
                  className="group p-6 rounded-xl card hover:border-cyan-500/20 transition-all cursor-pointer"
                >
                  <h3 className="text-base font-semibold heading group-hover:text-cyan-400 transition-colors mb-2">
                    {example.title}
                  </h3>
                  <p className="text-sm muted-text leading-relaxed mb-4">
                    {example.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {example.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded text-[11px] font-mono muted-text"
                        style={{ background: "var(--c-card-bg)", border: "1px solid var(--c-border)" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
