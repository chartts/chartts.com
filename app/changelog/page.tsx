import { Nav } from "../components/nav";
import { Footer } from "../components/footer";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Changelog",
  description:
    "Chart.ts release history. See what's new in every version.",
};

const releases = [
  {
    version: "0.1.2",
    date: "2026-02-25",
    tag: "Latest",
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
      "40+ chart types: line, bar, area, pie, donut, scatter, bubble, radar, candlestick, waterfall, funnel, gauge, sparkline, heatmap, treemap, boxplot, histogram, sankey, sunburst, and more",
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
    <main className="bg-dots bg-mesh min-h-screen">
      <Nav />

      <section className="pt-32 pb-16 px-6">
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

      <Footer />
    </main>
  );
}
