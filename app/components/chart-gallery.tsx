import Link from "next/link";
import { renderChart, chartDisplayNames } from "@/lib/charts";

const galleryCharts = [
  "line", "bar", "area", "pie", "donut", "scatter",
  "bubble", "radar", "candlestick", "waterfall", "funnel", "gauge",
  "sparkline", "stacked-bar", "horizontal-bar", "heatmap",
  "boxplot", "histogram", "treemap", "polar", "radial-bar",
  "lollipop", "bullet", "dumbbell", "calendar", "combo", "sankey",
  "sunburst", "tree", "graph", "parallel", "chord", "geo",
  "wordcloud", "violin", "voronoi", "themeriver", "pictorialbar", "matrix",
];

function RealChart({ slug }: { slug: string }) {
  const svg = renderChart(slug, { width: 240, height: 120, theme: "dark" });
  if (svg) {
    return (
      <div
        className="w-full h-full [&>svg]:w-full [&>svg]:h-full"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    );
  }
  return (
    <div className="w-full h-full flex items-center justify-center muted-text text-[10px]">
      {chartDisplayNames[slug] ?? slug}
    </div>
  );
}

export function ChartGallery() {
  return (
    <section id="charts" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="section-label text-cyan-400 mb-4">65+ chart types</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight heading">
            Every chart you need.
            <br />
            <span className="faint-text">Built in. Not bolted on.</span>
          </h2>
          <p className="mt-4 body-text max-w-2xl mx-auto">
            From simple line charts to sankey diagrams, 3D globe visualizations, financial candlesticks, and network graphs. Plus 13 WebGL/3D chart types via @chartts/gl.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {galleryCharts.map((slug) => (
            <Link
              key={slug}
              href={`/docs/charts/${slug}`}
              className="group p-4 rounded-xl card hover:border-cyan-500/20 transition-all cursor-pointer"
            >
              <div className="aspect-[2/1] mb-3 overflow-hidden rounded">
                <RealChart slug={slug} />
              </div>
              <p className="text-xs font-mono text-zinc-400 group-hover:text-cyan-400 transition-colors text-center">
                {chartDisplayNames[slug] ?? slug}
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/demos"
            className="text-sm text-cyan-400 hover:text-cyan-300 font-mono transition-colors cursor-pointer"
          >
            View all demos &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
