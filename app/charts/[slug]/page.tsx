import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Landing = {
  title: string;
  h1: string;
  description: string;
  intro: string;
  installCmd: string;
  codeExample: string;
  features: string[];
  chartType: string;
  framework?: string;
  docsLink: string;
};

const landings: Record<string, Landing> = {
  "react-line-chart": {
    title: "React Line Chart Component",
    h1: "React Line Chart",
    description:
      "Add beautiful line charts to React apps in seconds. SVG-based, Tailwind CSS native, accessible, under 15kb. Works with Next.js Server Components.",
    intro:
      "Chart.ts gives you a drop-in React line chart component that renders as SVG. Style it with Tailwind classes, use it in Server Components, and ship under 15kb gzipped.",
    installCmd: "npm install @chartts/react",
    codeExample: `import { LineChart } from "@chartts/react"

export function RevenueChart() {
  const data = [
    { month: "Jan", revenue: 4200 },
    { month: "Feb", revenue: 5800 },
    { month: "Mar", revenue: 7100 },
    { month: "Apr", revenue: 6800 },
    { month: "May", revenue: 9200 },
  ]

  return (
    <LineChart
      data={data}
      x="month"
      y="revenue"
      className="h-64"
      lineClassName="stroke-cyan-400"
      areaClassName="fill-cyan-400/10"
    />
  )
}`,
    features: [
      "SVG rendering with real DOM elements",
      "Tailwind className on every element",
      "Dark mode with dark: variants",
      "Works in React Server Components",
      "TypeScript with full type inference",
      "Accessible by default (keyboard nav, screen readers)",
      "Under 3kb for just the line chart (tree-shaking)",
    ],
    chartType: "line",
    framework: "react",
    docsLink: "/docs/charts/line",
  },
  "react-bar-chart": {
    title: "React Bar Chart Component",
    h1: "React Bar Chart",
    description:
      "Production-ready React bar chart. SVG-based, Tailwind native, accessible, tiny bundle. Vertical, horizontal, stacked, and grouped layouts.",
    intro:
      "A React bar chart component that renders as real SVG DOM elements. Supports vertical, horizontal, stacked, and grouped layouts. Style everything with Tailwind.",
    installCmd: "npm install @chartts/react",
    codeExample: `import { BarChart } from "@chartts/react"

export function SalesChart() {
  const data = [
    { product: "Widget A", sales: 1200 },
    { product: "Widget B", sales: 2400 },
    { product: "Widget C", sales: 1800 },
    { product: "Widget D", sales: 3100 },
  ]

  return (
    <BarChart
      data={data}
      x="product"
      y="sales"
      className="h-72"
      barClassName="fill-emerald-500 dark:fill-emerald-400"
    />
  )
}`,
    features: [
      "Vertical, horizontal, stacked, and grouped layouts",
      "SVG rendering for CSS styling and accessibility",
      "Tailwind className on bars, axes, and labels",
      "Animated transitions between data states",
      "Responsive with automatic label rotation",
      "WCAG AA compliant",
      "Under 3kb tree-shaken",
    ],
    chartType: "bar",
    framework: "react",
    docsLink: "/docs/charts/bar",
  },
  "react-pie-chart": {
    title: "React Pie Chart Component",
    h1: "React Pie Chart",
    description:
      "React pie chart with SVG rendering, Tailwind CSS styling, labels, and accessibility. Under 15kb gzipped.",
    intro:
      "A lightweight React pie chart component. Renders as SVG with real DOM elements so you can style it with Tailwind, inspect it in DevTools, and get accessibility for free.",
    installCmd: "npm install @chartts/react",
    codeExample: `import { PieChart } from "@chartts/react"

export function MarketShare() {
  const data = [
    { name: "Chrome", share: 65 },
    { name: "Safari", share: 19 },
    { name: "Firefox", share: 8 },
    { name: "Edge", share: 5 },
    { name: "Other", share: 3 },
  ]

  return (
    <PieChart
      data={data}
      label="name"
      value="share"
      className="h-72"
    />
  )
}`,
    features: [
      "SVG rendering with gradient fills",
      "Labels, percentages, and legends",
      "Tailwind className on slices and labels",
      "Dark mode support",
      "Donut variant with inner radius",
      "Screen reader accessible",
      "Under 3kb tree-shaken",
    ],
    chartType: "pie",
    framework: "react",
    docsLink: "/docs/charts/pie",
  },
  "vue-chart-library": {
    title: "Vue Chart Library",
    h1: "Vue Chart Library",
    description:
      "Beautiful Vue.js charts. SVG-based, Tailwind native, TypeScript-first. 40+ chart types. Works with Nuxt 3.",
    intro:
      "Chart.ts provides native Vue 3 components for 40+ chart types. Reactive props, Tailwind CSS integration, full TypeScript support, and works with Nuxt 3 out of the box.",
    installCmd: "npm install @chartts/vue",
    codeExample: `<script setup lang="ts">
import { LineChart } from "@chartts/vue"

const data = [
  { month: "Jan", revenue: 4200 },
  { month: "Feb", revenue: 5800 },
  { month: "Mar", revenue: 7100 },
]
</script>

<template>
  <LineChart
    :data="data"
    x="month"
    y="revenue"
    class="h-64"
    line-class="stroke-cyan-400"
  />
</template>`,
    features: [
      "Native Vue 3 components with reactive props",
      "40+ chart types",
      "Tailwind CSS class binding on every element",
      "Full TypeScript support",
      "Works with Nuxt 3 SSR",
      "WCAG AA accessible",
      "Under 15kb gzipped (entire library)",
    ],
    chartType: "line",
    framework: "vue",
    docsLink: "/docs/vue",
  },
  "svelte-chart-library": {
    title: "Svelte Chart Library",
    h1: "Svelte Chart Library",
    description:
      "SVG charts for Svelte and SvelteKit. Tailwind native, TypeScript-first, accessible. 40+ chart types under 15kb.",
    intro:
      "Native Svelte components for 40+ chart types. Reactive stores, Tailwind CSS classes, TypeScript, and full SvelteKit SSR support. Under 15kb for the entire library.",
    installCmd: "npm install @chartts/svelte",
    codeExample: `<script lang="ts">
  import { LineChart } from "@chartts/svelte"

  const data = [
    { month: "Jan", revenue: 4200 },
    { month: "Feb", revenue: 5800 },
    { month: "Mar", revenue: 7100 },
  ]
</script>

<LineChart
  {data}
  x="month"
  y="revenue"
  class="h-64"
  lineClass="stroke-cyan-400"
/>`,
    features: [
      "Native Svelte components",
      "Reactive with Svelte stores",
      "Tailwind CSS on every element",
      "Full TypeScript support",
      "SvelteKit SSR compatible",
      "WCAG AA accessible",
      "Under 15kb gzipped",
    ],
    chartType: "line",
    framework: "svelte",
    docsLink: "/docs/svelte",
  },
  "tailwind-charts": {
    title: "Tailwind CSS Charts",
    h1: "Tailwind CSS Charts",
    description:
      "Chart library built for Tailwind CSS. className on every element, dark: variants, design tokens. No separate theming system.",
    intro:
      "Chart.ts is the only charting library where every element accepts Tailwind CSS classes. Dark mode with dark: variants. Your design tokens, your colors, your charts. No separate theme config.",
    installCmd: "npm install @chartts/react",
    codeExample: `<LineChart
  data={data}
  x="month"
  y="revenue"
  className="h-64 rounded-xl"
  lineClassName="stroke-cyan-400 dark:stroke-cyan-300"
  areaClassName="fill-cyan-400/10 dark:fill-cyan-300/5"
  dotClassName="fill-white dark:fill-zinc-900 stroke-cyan-400"
  axisClassName="text-zinc-500 dark:text-zinc-400"
  gridClassName="stroke-zinc-200 dark:stroke-zinc-800"
  tooltipClassName="bg-white dark:bg-zinc-900 shadow-lg rounded-lg"
/>`,
    features: [
      "className prop on every chart element",
      "Dark mode with dark: variants",
      "Your Tailwind design tokens work",
      "No separate theming system to learn",
      "Responsive with Tailwind breakpoints",
      "CSS transitions and animations",
      "Works with Tailwind v3 and v4",
    ],
    chartType: "line",
    docsLink: "/docs/tailwind",
  },
  "lightweight-chart-library": {
    title: "Lightweight Chart Library",
    h1: "Lightweight Chart Library",
    description:
      "Under 15kb gzipped. 40+ chart types. Full tree-shaking. The smallest full-featured charting library for JavaScript and TypeScript.",
    intro:
      "Chart.ts ships the entire library at under 15kb gzipped. Import only what you use and ship even less. Smaller than most hero images, with 40+ chart types, TypeScript, and full accessibility.",
    installCmd: "npm install @chartts/core",
    codeExample: `// Tree-shake: import only what you need
import { line } from "@chartts/core/line"
import { bar } from "@chartts/core/bar"

// Each chart type is ~2-4kb
// Import 3 charts = ~8kb total`,
    features: [
      "Under 15kb gzipped for the entire library",
      "Full tree-shaking with per-chart imports",
      "~2-4kb per chart type",
      "Zero runtime dependencies",
      "ESM and CJS builds",
      "Smaller than most hero images",
      "40+ chart types included",
    ],
    chartType: "line",
    docsLink: "/docs/performance",
  },
  "accessible-charts": {
    title: "Accessible Chart Library",
    h1: "Accessible Charts",
    description:
      "WCAG 2.1 AA compliant charts. Keyboard navigation, screen readers, pattern fills, reduced motion. Accessible by architecture, not afterthought.",
    intro:
      "Chart.ts is WCAG 2.1 AA compliant out of the box. Because charts render as SVG, screen readers can traverse them, keyboard navigation works, and ARIA attributes are automatic. No separate accessible mode.",
    installCmd: "npm install @chartts/core",
    codeExample: `// Accessibility is automatic, not opt-in
<BarChart
  data={data}
  x="category"
  y="value"
  aria={{
    label: "Q4 Sales by Category",
    description: "Widget A leads with $3,100"
  }}
/>

// Keyboard: Tab between points, Arrow to navigate
// Screen readers: auto-generated summaries
// Patterns: set patterns={true} for color-blind users
// Reduced motion: respects prefers-reduced-motion`,
    features: [
      "WCAG 2.1 AA compliant",
      "Keyboard navigation (Tab, Arrow, Enter, Escape)",
      "Screen reader announcements with data summaries",
      "Pattern fills for color-blind users",
      "Respects prefers-reduced-motion",
      "ARIA attributes auto-generated",
      "No separate accessible mode needed",
    ],
    chartType: "bar",
    docsLink: "/docs/accessibility",
  },
  "nextjs-charts": {
    title: "Next.js Chart Component",
    h1: "Next.js Charts",
    description:
      "Charts for Next.js App Router. Works in Server Components. SVG rendering, zero client JS for static charts. Tailwind native.",
    intro:
      "Chart.ts renders as SVG, which means charts work in React Server Components. Ship zero client-side JavaScript for static charts. Add interactivity with Client Components when you need it.",
    installCmd: "npm install @chartts/react",
    codeExample: `// app/dashboard/page.tsx (Server Component)
import { BarChart } from "@chartts/react"
import { getMetrics } from "@/lib/data"

export default async function Dashboard() {
  const metrics = await getMetrics()

  return (
    <BarChart
      data={metrics}
      x="month"
      y="sales"
      className="h-64"
      barClassName="fill-cyan-500"
    />
  )
}
// Zero client JS. Chart renders on the server as SVG HTML.`,
    features: [
      "Works in React Server Components",
      "Zero client JS for static charts",
      "Streams with Next.js Suspense",
      "Tree-shakeable imports",
      "Tailwind CSS integration",
      "App Router and Pages Router support",
      "Static export compatible",
    ],
    chartType: "bar",
    framework: "react",
    docsLink: "/docs/react",
  },
  "typescript-chart-library": {
    title: "TypeScript Chart Library",
    h1: "TypeScript Chart Library",
    description:
      "Chart library built in TypeScript with full type inference. Strict mode, generic components, autocomplete for every prop.",
    intro:
      "Chart.ts is built in TypeScript strict mode from day one. Every prop is typed, every data shape is inferred, and your editor gives you autocomplete for everything. The type system IS the documentation.",
    installCmd: "npm install @chartts/core",
    codeExample: `import { line } from "@chartts/core/line"

// Type inference: x and y are constrained
// to keys of your data objects
const svg = line({
  data: [
    { month: "Jan", revenue: 4200 },
    { month: "Feb", revenue: 5800 },
  ],
  x: "month",    // autocomplete: "month" | "revenue"
  y: "revenue",  // autocomplete: "month" | "revenue"
})`,
    features: [
      "Built in TypeScript strict mode",
      "Full type inference on data shapes",
      "Autocomplete for every prop",
      "Generic components constrained to your data",
      "Exported type definitions for all chart options",
      "Works with any TypeScript framework",
      "Zero @types/ packages needed",
    ],
    chartType: "line",
    docsLink: "/docs/typescript",
  },
  "candlestick-chart": {
    title: "Candlestick Chart Library",
    h1: "Candlestick Chart",
    description:
      "SVG candlestick chart for financial data. OHLC support, volume bars, moving averages. Under 15kb. React, Vue, Svelte, Solid.",
    intro:
      "Professional candlestick charts for financial applications. OHLC data support, volume bars, moving average overlays, and real-time updates. Renders as SVG with full Tailwind CSS styling.",
    installCmd: "npm install @chartts/react",
    codeExample: `import { CandlestickChart } from "@chartts/react"

<CandlestickChart
  data={ohlcData}
  x="date"
  open="open"
  high="high"
  low="low"
  close="close"
  className="h-96"
  upClassName="fill-emerald-500"
  downClassName="fill-red-500"
/>`,
    features: [
      "OHLC (Open, High, Low, Close) data format",
      "Volume bars overlay",
      "Moving average lines",
      "Customizable up/down colors",
      "Zoom and pan for time series",
      "Real-time data updates",
      "SVG rendering with Tailwind styling",
    ],
    chartType: "candlestick",
    docsLink: "/docs/charts/candlestick",
  },
};

const slugs = Object.keys(landings);

export function generateStaticParams() {
  return slugs.map((slug) => ({ slug }));
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = landings[slug];
  if (!page) return {};
  return {
    title: page.title,
    description: page.description,
  };
}

export default async function ChartLandingPage({ params }: PageProps) {
  const { slug } = await params;
  const page = landings[slug];
  if (!page) notFound();

  return (
    <>
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight heading">
            {page.h1}
          </h1>
          <p className="mt-4 text-lg body-text max-w-2xl">{page.intro}</p>

          <div className="mt-8 inline-flex items-center gap-3 px-5 py-3 rounded-xl card">
            <span className="muted-text font-mono text-sm">$</span>
            <code className="font-mono heading">{page.installCmd}</code>
          </div>
        </div>
      </section>

      {/* Code example */}
      <section className="pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-xl card overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b adaptive-border">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              <span className="ml-2 text-xs muted-text font-mono">example.tsx</span>
            </div>
            <pre className="p-6 overflow-x-auto text-sm">
              <code className="font-mono body-text">{page.codeExample}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold heading mb-6">Features</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {page.features.map((f) => (
              <div key={f} className="flex items-start gap-3 p-4 rounded-xl card">
                <svg
                  className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm body-text">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24 px-6">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Link
            href={page.docsLink}
            className="px-6 py-3 text-sm font-semibold rounded-lg bg-cyan-500 text-white hover:bg-cyan-400 transition-colors cursor-pointer"
          >
            Read the Docs
          </Link>
          <Link
            href="/demos"
            className="px-6 py-3 text-sm font-semibold rounded-lg card body-text transition-all cursor-pointer"
          >
            See Demos
          </Link>
          <Link
            href="/examples"
            className="px-6 py-3 text-sm font-semibold rounded-lg card body-text transition-all cursor-pointer"
          >
            Examples
          </Link>
        </div>
      </section>
    </>
  );
}
