import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = {
  title: "Examples | Chart.ts",
  description:
    "Real-world Chart.ts examples. Copy-paste ready code for dashboards, analytics, financial charts, and more.",
};

const examples = [
  {
    title: "Sales Dashboard",
    description:
      "Revenue line chart with area fill, monthly bar chart, and KPI sparklines in a responsive grid.",
    tags: ["LineChart", "BarChart", "Sparkline"],
    href: "/examples/sales-dashboard",
  },
  {
    title: "Stock Tracker",
    description:
      "Candlestick chart with volume bars, moving average overlay, and real-time price updates.",
    tags: ["CandlestickChart", "BarChart"],
    href: "/examples/stock-tracker",
  },
  {
    title: "Analytics Overview",
    description:
      "Page views area chart, traffic sources pie chart, and bounce rate gauge in a dashboard layout.",
    tags: ["AreaChart", "PieChart", "GaugeChart"],
    href: "/examples/analytics",
  },
  {
    title: "Conversion Funnel",
    description:
      "Multi-step funnel chart showing visitor-to-customer pipeline with conversion rates.",
    tags: ["FunnelChart"],
    href: "/examples/conversion-funnel",
  },
  {
    title: "Financial Waterfall",
    description:
      "Revenue breakdown waterfall showing income, costs, taxes, and net profit.",
    tags: ["WaterfallChart"],
    href: "/examples/financial-waterfall",
  },
  {
    title: "Team Performance",
    description:
      "Radar chart comparing team members across speed, quality, reliability, and communication.",
    tags: ["RadarChart"],
    href: "/examples/team-performance",
  },
  {
    title: "Real-time Monitor",
    description:
      "Live-updating line chart with streaming data, auto-scrolling x-axis, and threshold alerts.",
    tags: ["LineChart"],
    href: "/examples/realtime-monitor",
  },
  {
    title: "Dark Mode Toggle",
    description:
      "Charts that respond to Tailwind dark mode. Same data, different aesthetic. Toggle and see.",
    tags: ["LineChart", "BarChart", "PieChart"],
    href: "/examples/dark-mode",
  },
  {
    title: "Responsive Grid",
    description:
      "Charts that scale from mobile to desktop. Breakpoint-aware layouts with Tailwind responsive utilities.",
    tags: ["LineChart", "BarChart"],
    href: "/examples/responsive",
  },
  {
    title: "Scatter + Regression",
    description:
      "Scatter plot with trend line, R-squared value, and confidence interval overlay.",
    tags: ["ScatterChart"],
    href: "/examples/scatter-regression",
  },
  {
    title: "Multi-Series Comparison",
    description:
      "Compare up to 6 data series on a single line chart with interactive legend toggling.",
    tags: ["LineChart"],
    href: "/examples/multi-series",
  },
  {
    title: "KPI Cards",
    description:
      "Dashboard KPI cards with sparklines, percentage change, and trend indicators.",
    tags: ["Sparkline", "GaugeChart"],
    href: "/examples/kpi-cards",
  },
];

export default function ExamplesPage() {
  return (
    <>
<div className="pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="section-label text-cyan-400 mb-4">Examples</p>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight heading">
              Real-world examples.
            </h1>
            <p className="mt-4 text-lg body-text max-w-2xl mx-auto">
              Copy-paste ready code for common chart patterns. Each example
              is a complete, working component.
            </p>
          </div>

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
                      className="px-2 py-0.5 rounded text-[11px] font-mono muted-text" style={{ background: 'var(--c-card-bg)', border: '1px solid var(--c-border)' }}
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
    </>
  );
}
