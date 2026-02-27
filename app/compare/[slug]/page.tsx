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
  weaknesses: string[];
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
    weaknesses: [
      "Canvas rendering means no CSS styling",
      "No native screen reader support",
      "Cannot use Tailwind or dark: variants",
      "SSR requires heavy node-canvas dependency",
      "Bundle includes all chart types by default",
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
    weaknesses: [
      "React only, no Vue/Svelte/Solid support",
      "Large bundle due to D3 dependency chain",
      "Inline styles make Tailwind integration awkward",
      "Client component required (no RSC)",
      "API is verbose with many wrapper components",
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
    weaknesses: [
      "Steep learning curve, months to proficiency",
      "No pre-built chart components",
      "You build everything from primitives",
      "SSR requires jsdom workarounds",
      "Accessibility must be implemented manually",
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
    weaknesses: [
      "React only",
      "Low-level primitives, not ready-made charts",
      "Requires deep D3 knowledge",
      "No simple API for common charts",
      "Significant assembly required for basic charts",
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
    weaknesses: [
      "Massive 130kb+ bundle",
      "No tree-shaking, imports everything",
      "jQuery-era imperative API",
      "Not Tailwind-native",
      "Heavy for modern web apps",
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
    weaknesses: [
      "React only",
      "Large per-chart bundles due to D3",
      "Theme system is separate from Tailwind",
      "No className prop on chart elements",
      "Cannot use dark: variants directly",
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
    weaknesses: [
      "Enormous bundle size (300kb+)",
      "Complex nested configuration objects",
      "Not Tailwind-native",
      "Over-engineered for most use cases",
      "Learning curve for configuration",
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
  chartTypes: "40+ built-in",
  frameworks: "React, Vue, Svelte, Solid, Angular, Vanilla JS",
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
    description: `Compare Chart.ts with ${comp.fullName}. See how Chart.ts offers a smaller bundle, better Tailwind integration, full accessibility, and 40+ chart types.`,
  };
}

export default async function ComparePage({ params }: PageProps) {
  const { slug } = await params;
  const comp = comparisons[slug];
  if (!comp) notFound();

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
  ];

  return (
    <>
<section className="pt-32 pb-16 px-6">
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
                <li className="flex items-start gap-2 body-text text-sm">
                  <Check />
                  Under 15kb gzipped, full library
                </li>
                <li className="flex items-start gap-2 body-text text-sm">
                  <Check />
                  Tailwind className on every chart element
                </li>
                <li className="flex items-start gap-2 body-text text-sm">
                  <Check />
                  WCAG AA accessible by default
                </li>
                <li className="flex items-start gap-2 body-text text-sm">
                  <Check />
                  Works with React, Vue, Svelte, Solid, Vanilla
                </li>
                <li className="flex items-start gap-2 body-text text-sm">
                  <Check />
                  Native SSR, zero config
                </li>
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
