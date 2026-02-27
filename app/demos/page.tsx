import type { Metadata } from "next";
import Link from "next/link";
import { renderChart, chartDisplayNames, sampleData } from "@/lib/charts";

export const metadata: Metadata = {
  title: "Demos | Chart.ts",
  description: "Live demos of all 40+ chart types in Chart.ts. Rendered as SVG, server-side, with zero JavaScript.",
};

const chartOrder = [
  "line", "bar", "area", "pie", "donut",
  "scatter", "bubble", "radar", "sparkline",
  "stacked-bar", "horizontal-bar", "candlestick",
  "waterfall", "funnel", "gauge",
  "heatmap", "boxplot", "histogram",
  "treemap", "polar", "radial-bar",
  "lollipop", "bullet", "dumbbell",
  "calendar", "combo", "sankey",
  "sunburst", "tree", "graph",
  "parallel", "themeriver", "pictorialbar",
  "chord", "geo", "lines",
  "matrix", "ohlc", "step",
  "volume", "range", "baseline",
  "kagi", "renko",
  "violin", "pack", "voronoi", "wordcloud",
];

export default function DemosPage() {
  return (
    <>
<div className="pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <p className="section-label text-cyan-400 mb-4">Live demos</p>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight heading">
              Every chart type.
              <br />
              <span className="faint-text">Rendered live from the library.</span>
            </h1>
            <p className="mt-4 text-lg body-text max-w-2xl mx-auto">
              {chartOrder.length} chart types, all rendered server-side as SVG with <code className="px-1.5 py-0.5 rounded text-cyan-500 text-sm font-mono" style={{ background: "var(--c-card-bg)" }}>renderToString()</code>. Zero client JavaScript.
            </p>
          </div>

          {/* Chart grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {chartOrder.map((type) => {
              const name = chartDisplayNames[type] ?? type;
              const svg = renderChart(type, { width: 480, height: 280, theme: "dark" });

              return (
                <div
                  key={type}
                  className="group rounded-xl card overflow-hidden transition-all hover:border-cyan-500/20"
                >
                  {/* Chart */}
                  <div className="p-6 pb-4">
                    {svg ? (
                      <div
                        className="w-full [&>svg]:w-full [&>svg]:h-auto rounded-lg overflow-hidden"
                        dangerouslySetInnerHTML={{ __html: svg }}
                      />
                    ) : (
                      <div className="w-full aspect-[480/280] flex items-center justify-center rounded-lg muted-text text-sm" style={{ background: "var(--c-card-bg)" }}>
                        Preview unavailable
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="px-6 pb-5 flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-semibold heading">{name}</h3>
                      <p className="text-xs muted-text font-mono mt-0.5">
                        {sampleData[type]?.series?.length ?? 0} series &middot; {sampleData[type]?.labels?.length ?? 0} points
                      </p>
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
            })}
          </div>

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
</>
  );
}
