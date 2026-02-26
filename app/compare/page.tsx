import { Nav } from "../components/nav";
import { Footer } from "../components/footer";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compare Chart.ts",
  description:
    "See how Chart.ts compares to other charting libraries. Smaller bundle, better Tailwind integration, full accessibility, 40+ chart types.",
};

const libraries = [
  {
    slug: "chartjs",
    name: "Chart.js",
    tagline: "Canvas-based, no CSS styling, ~60kb",
    color: "text-rose-400",
  },
  {
    slug: "recharts",
    name: "Recharts",
    tagline: "React-only, D3 dependency, ~45kb",
    color: "text-blue-400",
  },
  {
    slug: "d3",
    name: "D3.js",
    tagline: "Low-level primitives, steep learning curve",
    color: "text-orange-400",
  },
  {
    slug: "echarts",
    name: "Apache ECharts",
    tagline: "Enterprise-grade, 300kb+ bundle",
    color: "text-red-400",
  },
  {
    slug: "apexcharts",
    name: "ApexCharts",
    tagline: "Feature-rich, 130kb+ monolithic bundle",
    color: "text-purple-400",
  },
  {
    slug: "nivo",
    name: "Nivo",
    tagline: "React-only, D3-based, no Tailwind",
    color: "text-yellow-400",
  },
  {
    slug: "visx",
    name: "Visx (Airbnb)",
    tagline: "React-only, low-level primitives",
    color: "text-pink-400",
  },
];

export default function ComparePage() {
  return (
    <main className="bg-dots bg-mesh min-h-screen">
      <Nav />

      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight heading">
            Compare Chart.ts
          </h1>
          <p className="mt-4 text-lg body-text max-w-2xl mx-auto">
            See how Chart.ts stacks up against other charting libraries.
            Smaller bundle, native Tailwind, full accessibility, every
            framework.
          </p>
        </div>
      </section>

      <section className="pb-24 px-6">
        <div className="max-w-3xl mx-auto grid gap-4">
          {libraries.map((lib) => (
            <Link
              key={lib.slug}
              href={`/compare/${lib.slug}`}
              className="group flex items-center justify-between p-6 rounded-xl card hover:border-cyan-500/20 transition-all cursor-pointer"
            >
              <div>
                <h2 className="text-lg font-semibold heading group-hover:text-cyan-400 transition-colors">
                  Chart.ts vs {lib.name}
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

      <Footer />
    </main>
  );
}
