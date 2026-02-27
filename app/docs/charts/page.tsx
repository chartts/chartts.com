import type { Metadata } from "next";
import Link from "next/link";
import { renderChart, chartDisplayNames } from "@/lib/charts";

export const metadata: Metadata = {
  title: "Chart Types | Chart.ts Documentation",
  description:
    "27 chart types built in. Line, Bar, Area, Pie, Donut, Scatter, Bubble, Radar, Candlestick, Waterfall, Funnel, Gauge, Sparkline, and more.",
};

const charts: { name: string; slug: string; description: string; color: string }[] = [
  { name: "Line", slug: "line", description: "Time series, trends, continuous data", color: "#22d3ee" },
  { name: "Bar", slug: "bar", description: "Categorical comparisons, rankings", color: "#06b6d4" },
  { name: "Stacked Bar", slug: "stacked-bar", description: "Composition across categories", color: "#06b6d4" },
  { name: "Horizontal Bar", slug: "horizontal-bar", description: "Rankings, long labels", color: "#06b6d4" },
  { name: "Area", slug: "area", description: "Volume, cumulative values, stacked data", color: "#10b981" },
  { name: "Pie", slug: "pie", description: "Proportions, composition, budget splits", color: "#8b5cf6" },
  { name: "Donut", slug: "donut", description: "Proportions with center metric", color: "#8b5cf6" },
  { name: "Scatter", slug: "scatter", description: "Correlations, clusters, distributions", color: "#22d3ee" },
  { name: "Bubble", slug: "bubble", description: "Three-variable comparisons", color: "#06b6d4" },
  { name: "Radar", slug: "radar", description: "Multi-attribute profiles, skill charts", color: "#22d3ee" },
  { name: "Candlestick", slug: "candlestick", description: "Financial OHLC, stock market data", color: "#10b981" },
  { name: "Waterfall", slug: "waterfall", description: "Running totals, variance analysis", color: "#22d3ee" },
  { name: "Funnel", slug: "funnel", description: "Conversion flows, sales pipelines", color: "#06b6d4" },
  { name: "Gauge", slug: "gauge", description: "KPIs, progress, performance metrics", color: "#22d3ee" },
  { name: "Sparkline", slug: "sparkline", description: "Inline mini-charts, table cells", color: "#22d3ee" },
  { name: "Heatmap", slug: "heatmap", description: "Density, activity patterns, matrices", color: "#f59e0b" },
  { name: "Box Plot", slug: "boxplot", description: "Statistical distributions, quartiles", color: "#8b5cf6" },
  { name: "Histogram", slug: "histogram", description: "Frequency distributions, binned data", color: "#06b6d4" },
  { name: "Treemap", slug: "treemap", description: "Hierarchical proportions, market cap", color: "#10b981" },
  { name: "Polar", slug: "polar", description: "Cyclical data, wind roses, directions", color: "#22d3ee" },
  { name: "Radial Bar", slug: "radial-bar", description: "Circular progress, completion rates", color: "#f59e0b" },
  { name: "Lollipop", slug: "lollipop", description: "Clean bar alternative, dot markers", color: "#06b6d4" },
  { name: "Bullet", slug: "bullet", description: "KPI vs target with ranges", color: "#10b981" },
  { name: "Dumbbell", slug: "dumbbell", description: "Before/after, range comparison", color: "#8b5cf6" },
  { name: "Calendar", slug: "calendar", description: "Daily activity, contribution grids", color: "#10b981" },
  { name: "Combo", slug: "combo", description: "Mixed chart types, dual axis", color: "#22d3ee" },
  { name: "Sankey", slug: "sankey", description: "Flow diagrams, user journeys", color: "#f59e0b" },
  { name: "Violin Plot", slug: "violin", description: "Distribution shapes, density curves", color: "#8b5cf6" },
  { name: "Circle Packing", slug: "pack", description: "Hierarchical circles, proportional sizing", color: "#10b981" },
  { name: "Voronoi", slug: "voronoi", description: "Tessellation, nearest-neighbor regions", color: "#22d3ee" },
  { name: "Word Cloud", slug: "wordcloud", description: "Word frequency, text analysis", color: "#f59e0b" },
];

export default function ChartsOverviewPage() {
  return (
    <article className="max-w-3xl">
      <div className="mb-12">
        <p className="section-label text-cyan-400 mb-3">Documentation</p>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight heading">
          Chart Types
        </h1>
        <p className="mt-4 text-lg body-text leading-relaxed">
          {charts.length} chart types built in. Every one shares the same API surface -
          data binding, styling, accessibility, and event handling work
          identically across all types.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {charts.map((chart) => {
          const svg = renderChart(chart.slug, { width: 200, height: 100, theme: "dark" });
          return (
            <Link
              key={chart.slug}
              href={`/docs/charts/${chart.slug}`}
              className="group p-5 rounded-xl card hover:border-cyan-500/20 transition-all cursor-pointer"
            >
              {svg && (
                <div
                  className="mb-3 rounded overflow-hidden [&>svg]:w-full [&>svg]:h-auto"
                  dangerouslySetInnerHTML={{ __html: svg }}
                />
              )}
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: chart.color }}
                />
                <h3 className="text-sm font-semibold heading group-hover:text-cyan-400 transition-colors">
                  {chart.name}
                </h3>
              </div>
              <p className="text-sm muted-text pl-5">
                {chart.description}
              </p>
            </Link>
          );
        })}
      </div>
    </article>
  );
}
