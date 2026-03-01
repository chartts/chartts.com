import type { Metadata } from "next";
import Link from "next/link";
import { renderChart, chartDisplayNames, sampleData } from "@/lib/charts";
import { GLChartPreview } from "@/lib/gl-preview";
import { InteractiveChart } from "./interactive-chart";

export const metadata: Metadata = {
  title: "Demos | Chart.ts",
  description: "Live interactive demos of all 60+ chart types in Chart.ts. Tooltips, crosshairs, zoom, and pan.",
};

const categories: { name: string; slug: string; charts: string[] }[] = [
  {
    name: "Trending",
    slug: "trending",
    charts: ["line", "area", "step", "sparkline", "range", "baseline", "combo"],
  },
  {
    name: "Comparison",
    slug: "comparison",
    charts: ["bar", "stacked-bar", "horizontal-bar", "lollipop", "bullet", "dumbbell", "pillar", "pareto"],
  },
  {
    name: "Composition",
    slug: "composition",
    charts: ["pie", "donut", "treemap", "sunburst", "pack", "funnel", "waterfall"],
  },
  {
    name: "Distribution",
    slug: "distribution",
    charts: ["scatter", "bubble", "histogram", "boxplot", "violin", "heatmap"],
  },
  {
    name: "Radial",
    slug: "radial",
    charts: ["radar", "polar", "radial-bar", "gauge"],
  },
  {
    name: "Financial",
    slug: "financial",
    charts: ["candlestick", "ohlc", "volume", "kagi", "renko"],
  },
  {
    name: "Relationship",
    slug: "relationship",
    charts: ["sankey", "chord", "graph", "flow", "parallel", "lines"],
  },
  {
    name: "Hierarchy",
    slug: "hierarchy",
    charts: ["tree", "org", "gantt"],
  },
  {
    name: "Specialty",
    slug: "specialty",
    charts: ["calendar", "matrix", "geo", "wordcloud", "voronoi", "themeriver", "pictorialbar"],
  },
  {
    name: "3D / WebGL",
    slug: "3d",
    charts: ["scatter3d", "bar3d", "surface3d", "globe3d", "map3d", "lines3d", "line3d", "torus3d", "scatter-gl", "lines-gl", "flow-gl", "graph-gl"],
  },
];

const glCharts = new Set([
  "scatter3d", "bar3d", "surface3d", "globe3d", "map3d",
  "lines3d", "line3d", "torus3d", "scatter-gl", "lines-gl", "flow-gl", "graph-gl",
]);

const glDisplayNames: Record<string, string> = {
  scatter3d: "Scatter 3D",
  bar3d: "Bar 3D",
  surface3d: "Surface 3D",
  globe3d: "Globe 3D",
  map3d: "Map 3D",
  lines3d: "Lines 3D",
  line3d: "Line 3D",
  torus3d: "Torus 3D",
  "scatter-gl": "Scatter GL",
  "lines-gl": "Lines GL",
  "flow-gl": "Flow GL",
  "graph-gl": "Graph GL",
};

const totalCharts = categories.reduce((s, c) => s + c.charts.length, 0);

function ChartCard({ type }: { type: string }) {
  const isGL = glCharts.has(type);
  const name = isGL ? glDisplayNames[type] ?? type : chartDisplayNames[type] ?? type;

  return (
    <div className="group rounded-xl card overflow-hidden transition-all hover:border-cyan-500/20">
      <div className="p-6 pb-4">
        {isGL ? (
          <div className="w-full rounded-lg overflow-hidden" style={{ height: 200 }}>
            <GLChartPreview slug={type} theme="dark" />
          </div>
        ) : (
          <InteractiveChart
            type={type}
            initialSvg={renderChart(type, { width: 480, height: 280, theme: "dark" })}
          />
        )}
      </div>
      <div className="px-6 pb-5 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold heading">{name}</h3>
          {isGL ? (
            <p className="text-xs muted-text font-mono mt-0.5">WebGL</p>
          ) : (
            <p className="text-xs muted-text font-mono mt-0.5">
              {sampleData[type]?.series?.length ?? 0} series &middot;{" "}
              {sampleData[type]?.labels?.length ?? 0} points
            </p>
          )}
        </div>
        <Link
          href={`/docs/charts/${type}`}
          className="text-xs text-cyan-400 hover:text-cyan-300 font-mono transition-colors cursor-pointer"
        >
          Docs &rarr;
        </Link>
      </div>
    </div>
  );
}

export default function DemosPage() {
  return (
    <div className="pt-24 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="section-label text-cyan-400 mb-4">Live demos</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight heading">
            Every chart type.
            <br />
            <span className="faint-text">Fully interactive.</span>
          </h1>
          <p className="mt-4 text-lg body-text max-w-2xl mx-auto">
            {totalCharts} chart types across {categories.length} categories.
            Hover for tooltips, scroll to zoom, drag to pan.
            3D charts powered by WebGL.
          </p>
        </div>

        {/* Category nav */}
        <div className="flex flex-wrap gap-2 mb-12 justify-center">
          {categories.map((cat) => (
            <a
              key={cat.slug}
              href={`#${cat.slug}`}
              className="px-3 py-1.5 rounded-lg text-xs font-mono card body-text hover:text-cyan-400 hover:border-cyan-500/20 transition-all cursor-pointer"
            >
              {cat.name}
              <span className="ml-1.5 muted-text">{cat.charts.length}</span>
            </a>
          ))}
        </div>

        {/* Categories */}
        {categories.map((cat) => (
          <section key={cat.slug} id={cat.slug} className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-2xl font-bold heading">{cat.name}</h2>
              <span className="px-2 py-0.5 text-xs font-mono rounded-md muted-text" style={{ background: "var(--c-card-bg)" }}>
                {cat.charts.length}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {cat.charts.map((type) => (
                <ChartCard key={type} type={type} />
              ))}
            </div>
          </section>
        ))}

        {/* Footer CTA */}
        <div className="mt-16 text-center">
          <p className="body-text mb-6">
            All charts use the same API. Learn one, use them all.
          </p>
          <Link
            href="/docs"
            className="inline-flex px-6 py-3 text-sm font-semibold rounded-lg bg-cyan-500 text-white hover:bg-cyan-400 transition-colors cursor-pointer"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}
