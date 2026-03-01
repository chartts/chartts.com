import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Migrate to Chart.ts",
  description:
    "Step-by-step migration guides from Chart.js, Recharts, D3, ECharts, Highcharts, and ApexCharts to Chart.ts. Side-by-side code comparisons.",
};

const migrations = [
  {
    slug: "from-chartjs",
    name: "Chart.js",
    tagline: "Replace Canvas rendering with SVG, drop 45kb from your bundle",
    color: "text-rose-400",
  },
  {
    slug: "from-recharts",
    name: "Recharts",
    tagline: "Drop D3 dependency, add framework support beyond React",
    color: "text-blue-400",
  },
  {
    slug: "from-d3",
    name: "D3.js",
    tagline: "Get pre-built charts instead of building from primitives",
    color: "text-orange-400",
  },
  {
    slug: "from-echarts",
    name: "Apache ECharts",
    tagline: "Cut 285kb+ from your bundle, get Tailwind CSS support",
    color: "text-red-400",
  },
  {
    slug: "from-highcharts",
    name: "Highcharts",
    tagline: "Switch from $590/dev/yr to MIT free, keep all chart types",
    color: "text-indigo-400",
  },
  {
    slug: "from-apexcharts",
    name: "ApexCharts",
    tagline: "Replace 130kb monolith with tree-shakeable 15kb library",
    color: "text-purple-400",
  },
];

export default function MigratePage() {
  return (
    <>
      <section className="pt-24 sm:pt-32 pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight heading">
            Migrate to Chart.ts
          </h1>
          <p className="mt-4 text-lg body-text max-w-2xl mx-auto">
            Step-by-step guides to migrate from your current charting library.
            Side-by-side code comparisons, API mapping, and common patterns.
          </p>
        </div>
      </section>

      <section className="pb-24 px-6">
        <div className="max-w-3xl mx-auto grid gap-4">
          {migrations.map((lib) => (
            <Link
              key={lib.slug}
              href={`/migrate/${lib.slug}`}
              className="group flex items-center justify-between p-6 rounded-xl card hover:border-cyan-500/20 transition-all cursor-pointer"
            >
              <div>
                <h2 className="text-lg font-semibold heading group-hover:text-cyan-400 transition-colors">
                  Migrate from {lib.name}
                </h2>
                <p className="mt-1 text-sm body-text">{lib.tagline}</p>
              </div>
              <svg
                className="w-5 h-5 muted-text group-hover:text-cyan-400 transition-colors shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
