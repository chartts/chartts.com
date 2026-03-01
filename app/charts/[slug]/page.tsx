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
      "Beautiful Vue.js charts. SVG-based, Tailwind native, TypeScript-first. 65+ chart types. Works with Nuxt 3.",
    intro:
      "Chart.ts provides native Vue 3 components for 65+ chart types. Reactive props, Tailwind CSS integration, full TypeScript support, and works with Nuxt 3 out of the box.",
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
      "65+ chart types",
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
      "SVG charts for Svelte and SvelteKit. Tailwind native, TypeScript-first, accessible. 65+ chart types under 15kb.",
    intro:
      "Native Svelte components for 65+ chart types. Reactive stores, Tailwind CSS classes, TypeScript, and full SvelteKit SSR support. Under 15kb for the entire library.",
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
      "Under 15kb gzipped. 65+ chart types. Full tree-shaking. The smallest full-featured charting library for JavaScript and TypeScript.",
    intro:
      "Chart.ts ships the entire library at under 15kb gzipped. Import only what you use and ship even less. Smaller than most hero images, with 65+ chart types, TypeScript, and full accessibility.",
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
      "65+ chart types included",
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
      "SVG candlestick chart for financial data. OHLC support, volume bars, moving averages. Under 15kb. React, Vue, Svelte, Solid, Angular.",
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
  "pie-chart": {
    title: "Pie Chart Maker | Free Online Pie Chart Generator",
    h1: "Pie Chart Maker",
    description:
      "Create beautiful pie charts with JavaScript. Free, open source, SVG-based. Tailwind CSS styling, accessibility, under 15kb. React, Vue, Svelte, Solid, Angular.",
    intro:
      "Build stunning pie charts with Chart.ts. SVG rendering means every slice is a real DOM element you can style with Tailwind CSS. Add labels, percentages, legends, donut variants, and pattern fills for accessibility. Under 15kb for the entire library.",
    installCmd: "npm install @chartts/core",
    codeExample: `import { pie } from "@chartts/core"

const svg = pie({
  data: [
    { label: "Chrome", value: 65 },
    { label: "Safari", value: 19 },
    { label: "Firefox", value: 8 },
    { label: "Edge", value: 5 },
    { label: "Other", value: 3 },
  ],
  label: "label",
  value: "value",
  showPercentages: true,
  showLegend: true,
})`,
    features: [
      "SVG rendering with gradient fills",
      "Labels, percentages, and legends",
      "Donut variant with configurable inner radius",
      "Pattern fills for color-blind accessibility",
      "Tailwind className on every slice",
      "Dark mode with dark: variants",
      "Under 3kb tree-shaken",
    ],
    chartType: "pie",
    docsLink: "/docs/charts/pie",
  },
  "bar-chart": {
    title: "Bar Chart | JavaScript Bar Chart Library",
    h1: "Bar Chart",
    description:
      "Create bar charts with JavaScript. Vertical, horizontal, stacked, grouped. SVG rendering, Tailwind CSS, accessible. React, Vue, Svelte, Solid.",
    intro:
      "Chart.ts bar charts render as real SVG DOM elements. Vertical, horizontal, stacked, and grouped layouts. Style every bar, axis, and label with Tailwind CSS classes. WCAG AA accessible with keyboard navigation and screen reader support.",
    installCmd: "npm install @chartts/core",
    codeExample: `import { bar } from "@chartts/core"

const svg = bar({
  data: [
    { category: "Q1", revenue: 42000 },
    { category: "Q2", revenue: 58000 },
    { category: "Q3", revenue: 71000 },
    { category: "Q4", revenue: 93000 },
  ],
  x: "category",
  y: "revenue",
  layout: "vertical",
})`,
    features: [
      "Vertical, horizontal, stacked, and grouped layouts",
      "SVG rendering for CSS styling",
      "Tailwind className on bars, axes, labels, grid",
      "Animated transitions between data states",
      "Responsive with automatic label rotation",
      "WCAG AA compliant with keyboard navigation",
      "Under 3kb tree-shaken",
    ],
    chartType: "bar",
    docsLink: "/docs/charts/bar",
  },
  "line-chart": {
    title: "Line Chart | JavaScript Line Chart Library",
    h1: "Line Chart",
    description:
      "Create line charts with JavaScript. SVG rendering, area fills, multi-series, tooltips. Tailwind CSS native. React, Vue, Svelte, Solid, Angular.",
    intro:
      "Beautiful line charts powered by SVG. Chart.ts gives you smooth curves, area fills, multi-series support, and interactive tooltips. Style everything with Tailwind CSS. Works with any JavaScript framework or vanilla JS.",
    installCmd: "npm install @chartts/core",
    codeExample: `import { line } from "@chartts/core"

const svg = line({
  data: [
    { month: "Jan", users: 1200, revenue: 4200 },
    { month: "Feb", users: 1800, revenue: 5800 },
    { month: "Mar", users: 2400, revenue: 7100 },
    { month: "Apr", users: 3200, revenue: 9200 },
  ],
  x: "month",
  y: ["users", "revenue"],
  smooth: true,
  area: true,
})`,
    features: [
      "Smooth curves with configurable tension",
      "Area fills with gradient support",
      "Multi-series with automatic legends",
      "Interactive tooltips",
      "Tailwind className on lines, dots, areas, axes",
      "Real-time data streaming",
      "Under 3kb tree-shaken",
    ],
    chartType: "line",
    docsLink: "/docs/charts/line",
  },
  "waterfall-chart": {
    title: "Waterfall Chart | JavaScript Waterfall Chart",
    h1: "Waterfall Chart",
    description:
      "Create waterfall charts with JavaScript. Show running totals, positive/negative flows. SVG rendering, Tailwind CSS, accessible. Under 15kb.",
    intro:
      "Waterfall charts show how an initial value is increased or decreased by intermediate values. Chart.ts renders them as SVG with automatic running totals, positive/negative coloring, and connector lines. Style everything with Tailwind CSS.",
    installCmd: "npm install @chartts/core",
    codeExample: `import { waterfall } from "@chartts/core"

const svg = waterfall({
  data: [
    { label: "Revenue", value: 420000 },
    { label: "COGS", value: -180000 },
    { label: "Gross Profit", type: "subtotal" },
    { label: "OpEx", value: -95000 },
    { label: "Tax", value: -43000 },
    { label: "Net Income", type: "total" },
  ],
  label: "label",
  value: "value",
})`,
    features: [
      "Automatic running totals",
      "Positive/negative color coding",
      "Subtotal and total markers",
      "Connector lines between bars",
      "Tailwind className on every element",
      "Financial reporting ready",
      "SVG rendering with accessibility",
    ],
    chartType: "waterfall",
    docsLink: "/docs/charts/waterfall",
  },
  "gantt-chart": {
    title: "Gantt Chart | JavaScript Gantt Chart Library",
    h1: "Gantt Chart",
    description:
      "Create Gantt charts with JavaScript. Project timelines, task dependencies, milestones. SVG rendering, Tailwind CSS styling. Free and open source.",
    intro:
      "Build professional Gantt charts for project management. Chart.ts renders timelines as SVG with task bars, dependencies, milestones, and progress indicators. Style everything with Tailwind CSS. Free and open source, unlike commercial alternatives.",
    installCmd: "npm install @chartts/core",
    codeExample: `import { gantt } from "@chartts/core"

const svg = gantt({
  data: [
    { task: "Design", start: "2026-01-01", end: "2026-01-15", progress: 100 },
    { task: "Frontend", start: "2026-01-10", end: "2026-02-15", progress: 75 },
    { task: "Backend", start: "2026-01-15", end: "2026-02-20", progress: 60 },
    { task: "Testing", start: "2026-02-10", end: "2026-03-01", progress: 20 },
    { task: "Launch", start: "2026-03-01", end: "2026-03-01", milestone: true },
  ],
  task: "task",
  start: "start",
  end: "end",
})`,
    features: [
      "Task bars with start/end dates",
      "Progress indicators on each task",
      "Milestone markers",
      "Task dependencies and links",
      "Zoom levels (day, week, month, quarter)",
      "Tailwind CSS on all elements",
      "SVG rendering for print and export",
    ],
    chartType: "gantt",
    docsLink: "/docs/charts/gantt",
  },
  "org-chart": {
    title: "Org Chart | JavaScript Organization Chart",
    h1: "Organization Chart",
    description:
      "Create org charts with JavaScript. Hierarchical layouts, expandable nodes, team visualization. SVG rendering, Tailwind CSS. Free and open source.",
    intro:
      "Build organizational charts that render as SVG. Hierarchical tree layouts with expandable nodes, photos, titles, and department grouping. Style every node and connector with Tailwind CSS. Works with any framework.",
    installCmd: "npm install @chartts/core",
    codeExample: `import { org } from "@chartts/core"

const svg = org({
  data: {
    name: "Sarah Chen",
    title: "CEO",
    children: [
      {
        name: "James Lee",
        title: "CTO",
        children: [
          { name: "Ana Garcia", title: "Lead Engineer" },
          { name: "Mark Wilson", title: "Lead Designer" },
        ],
      },
      {
        name: "Maria Santos",
        title: "CFO",
      },
    ],
  },
})`,
    features: [
      "Hierarchical tree layout",
      "Expandable/collapsible nodes",
      "Photos and role badges",
      "Department grouping",
      "Horizontal and vertical orientations",
      "Tailwind CSS on nodes and connectors",
      "SVG rendering for export and print",
    ],
    chartType: "org",
    docsLink: "/docs/charts/org",
  },
  "flow-chart": {
    title: "Flow Chart | JavaScript Flow Chart Library",
    h1: "Flow Chart",
    description:
      "Create flow charts with JavaScript. Process diagrams, decision trees, workflow visualization. SVG rendering, Tailwind CSS. Free and open source.",
    intro:
      "Build flow charts and process diagrams that render as SVG. Decision nodes, process steps, connectors with labels, and automatic layout. Style every element with Tailwind CSS. Export to SVG or PNG.",
    installCmd: "npm install @chartts/core",
    codeExample: `import { flow } from "@chartts/core"

const svg = flow({
  nodes: [
    { id: "start", label: "Start", type: "terminal" },
    { id: "input", label: "Get Data", type: "process" },
    { id: "valid", label: "Valid?", type: "decision" },
    { id: "process", label: "Process", type: "process" },
    { id: "error", label: "Show Error", type: "process" },
    { id: "end", label: "Done", type: "terminal" },
  ],
  edges: [
    { from: "start", to: "input" },
    { from: "input", to: "valid" },
    { from: "valid", to: "process", label: "Yes" },
    { from: "valid", to: "error", label: "No" },
    { from: "process", to: "end" },
  ],
})`,
    features: [
      "Decision, process, and terminal nodes",
      "Connectors with labels",
      "Automatic layout algorithms",
      "Horizontal and vertical flow",
      "Nested sub-processes",
      "Tailwind CSS on all elements",
      "SVG export for documentation",
    ],
    chartType: "flow",
    docsLink: "/docs/charts/flow",
  },
  "pareto-chart": {
    title: "Pareto Chart | JavaScript Pareto Chart",
    h1: "Pareto Chart",
    description:
      "Create Pareto charts with JavaScript. Combined bar and line chart showing the 80/20 rule. SVG rendering, Tailwind CSS. Free and open source.",
    intro:
      "Pareto charts combine bar charts with a cumulative line to identify the vital few causes. Chart.ts renders them as SVG with automatic percentage calculations, dual axes, and the 80% threshold line. Perfect for quality analysis and prioritization.",
    installCmd: "npm install @chartts/core",
    codeExample: `import { pareto } from "@chartts/core"

const svg = pareto({
  data: [
    { cause: "UI Bugs", count: 45 },
    { cause: "API Errors", count: 32 },
    { cause: "Performance", count: 18 },
    { cause: "Auth Issues", count: 12 },
    { cause: "Data Loss", count: 8 },
    { cause: "Other", count: 5 },
  ],
  label: "cause",
  value: "count",
  showThreshold: true,
})`,
    features: [
      "Combined bar and cumulative line",
      "Automatic percentage calculation",
      "80% threshold line",
      "Dual y-axes (count and percentage)",
      "Sorted by frequency automatically",
      "Tailwind CSS on all elements",
      "SVG rendering with accessibility",
    ],
    chartType: "pareto",
    docsLink: "/docs/charts/pareto",
  },
  "graph-maker": {
    title: "Free Online Graph Maker | Chart Generator",
    h1: "Free Graph Maker",
    description:
      "Create charts and graphs online for free. Bar charts, line charts, pie charts, and 40+ types. SVG export, no watermark. Powered by Chart.ts.",
    intro:
      "Make beautiful charts and graphs in seconds. Choose from 65+ chart types, paste your data, and get a publication-ready SVG. No sign-up, no watermark, no limits. Powered by Chart.ts, the open source charting library.",
    installCmd: "npm install @chartts/core",
    codeExample: `// Chart.ts powers this graph maker
// Use it in your own projects:
import { line, bar, pie, scatter } from "@chartts/core"

// Every chart type renders as SVG
// Copy the SVG, embed it anywhere
const svg = bar({
  data: yourData,
  x: "category",
  y: "value",
})`,
    features: [
      "65+ chart types",
      "Paste CSV or JSON data",
      "SVG export with no watermark",
      "PNG download",
      "Tailwind CSS styled",
      "Accessible output",
      "Free forever, open source",
    ],
    chartType: "bar",
    docsLink: "/chart-maker",
  },
  "gold-price-chart": {
    title: "Gold Price Chart | JavaScript Financial Charts",
    h1: "Gold Price Chart",
    description:
      "Create gold price charts and financial visualizations with JavaScript. Candlestick, line, and area charts. Real-time updates, SVG rendering, under 15kb.",
    intro:
      "Build gold price charts and commodity visualizations with Chart.ts. Candlestick, line, and area charts with real-time streaming, moving averages, and volume overlays. SVG rendering for crisp display at any resolution.",
    installCmd: "npm install @chartts/core",
    codeExample: `import { candlestick } from "@chartts/core"

const svg = candlestick({
  data: goldPrices,
  x: "date",
  open: "open",
  high: "high",
  low: "low",
  close: "close",
  overlays: [
    { type: "sma", period: 20 },
    { type: "sma", period: 50 },
  ],
})`,
    features: [
      "Candlestick and OHLC charts",
      "Moving average overlays (SMA, EMA)",
      "Volume bars",
      "Real-time price streaming",
      "Zoom and pan on time axis",
      "Responsive for mobile trading apps",
      "SVG rendering for print quality",
    ],
    chartType: "candlestick",
    docsLink: "/docs/charts/candlestick",
  },
  "bitcoin-chart": {
    title: "Bitcoin Chart | Crypto Price Chart Library",
    h1: "Bitcoin Chart",
    description:
      "Create Bitcoin and cryptocurrency price charts with JavaScript. Candlestick, line charts with real-time updates. SVG rendering, under 15kb. Open source.",
    intro:
      "Build Bitcoin and crypto price charts with Chart.ts. Real-time candlestick charts, volume indicators, and technical overlays. SVG rendering at under 15kb, perfect for trading dashboards and portfolio trackers.",
    installCmd: "npm install @chartts/core",
    codeExample: `import { candlestick } from "@chartts/core"

const svg = candlestick({
  data: btcPrices,
  x: "timestamp",
  open: "open",
  high: "high",
  low: "low",
  close: "close",
  volume: "volume",
  overlays: [
    { type: "bollinger", period: 20 },
  ],
})`,
    features: [
      "Real-time price streaming",
      "Candlestick with volume overlay",
      "Technical indicators (SMA, EMA, Bollinger)",
      "Multiple timeframes (1m to 1Y)",
      "Responsive for mobile",
      "Dark mode optimized",
      "Under 5kb for candlestick chart",
    ],
    chartType: "candlestick",
    docsLink: "/docs/charts/candlestick",
  },
  "ai-chart": {
    title: "AI Chart Generator | Create Charts with AI",
    h1: "AI Chart Generator",
    description:
      "Generate charts from natural language prompts. Describe your data, get a chart. Powered by Chart.ts SVG rendering. Free, open source, under 15kb.",
    intro:
      "Describe the chart you want in plain English and Chart.ts generates it. Works with GPT, Claude, and any LLM. The structured API makes it easy for AI to generate chart code that renders as clean SVG.",
    installCmd: "npm install @chartts/core",
    codeExample: `// AI-friendly API: structured, typed, predictable
// LLMs can generate this code reliably:
import { bar } from "@chartts/core"

const svg = bar({
  data: [
    { product: "Widget A", q1: 120, q2: 180 },
    { product: "Widget B", q1: 90, q2: 240 },
    { product: "Widget C", q1: 200, q2: 160 },
  ],
  x: "product",
  y: ["q1", "q2"],
  layout: "grouped",
})

// Output: clean SVG string, ready to embed`,
    features: [
      "AI-friendly structured API",
      "Works with GPT, Claude, Gemini, and any LLM",
      "Typed inputs prevent AI hallucination",
      "Clean SVG output for embedding",
      "65+ chart types AI can generate",
      "No API key needed for rendering",
      "Open source, runs anywhere",
    ],
    chartType: "bar",
    docsLink: "/docs",
  },
  "data-visualization": {
    title: "Data Visualization Library | JavaScript",
    h1: "Data Visualization Library",
    description:
      "Modern data visualization library for JavaScript and TypeScript. 65+ chart types, SVG rendering, Tailwind CSS, accessibility. Under 15kb gzipped.",
    intro:
      "Chart.ts is a modern data visualization library built for the way developers work today. 65+ chart types, SVG rendering, Tailwind CSS integration, full accessibility, and TypeScript-first design. Under 15kb for the entire library.",
    installCmd: "npm install @chartts/core",
    codeExample: `import { line, bar, pie, scatter, heatmap } from "@chartts/core"

// 65+ chart types, all SVG
// All styled with Tailwind CSS
// All accessible by default
// All under 15kb total

const lineChart = line({ data, x: "date", y: "value" })
const barChart = bar({ data, x: "category", y: "count" })
const pieChart = pie({ data, label: "name", value: "share" })`,
    features: [
      "65+ chart types (line, bar, pie, scatter, heatmap, and more)",
      "SVG, Canvas, and WebGL renderers",
      "Tailwind CSS native with className on every element",
      "WCAG AA accessible by default",
      "TypeScript with full type inference",
      "React, Vue, Svelte, Solid, Angular, Vanilla JS",
      "Under 15kb gzipped for everything",
    ],
    chartType: "line",
    docsLink: "/docs",
  },

  // ── React chart type landings ──

  "react-area-chart": {
    title: "React Area Chart Component",
    h1: "React Area Chart",
    description:
      "Add area charts to React apps. SVG-based, gradient fills, stacked areas, Tailwind CSS styling. Under 15kb. Works with Next.js Server Components.",
    intro:
      "Chart.ts gives you a drop-in React area chart that renders as SVG. Gradient fills, stacked series, smooth curves, and Tailwind CSS on every element. Works in Server Components with zero client JS.",
    installCmd: "npm install @chartts/react",
    codeExample: `import { AreaChart } from "@chartts/react"

export function TrafficChart() {
  const data = [
    { month: "Jan", organic: 1200, paid: 800 },
    { month: "Feb", organic: 1800, paid: 950 },
    { month: "Mar", organic: 2400, paid: 1100 },
    { month: "Apr", organic: 3100, paid: 1400 },
  ]

  return (
    <AreaChart
      data={data}
      x="month"
      y={["organic", "paid"]}
      stacked
      className="h-64"
      areaClassName="fill-cyan-400/20 dark:fill-cyan-300/10"
    />
  )
}`,
    features: [
      "Gradient fills and stacked areas",
      "SVG rendering with real DOM elements",
      "Smooth curves with configurable tension",
      "Multi-series with automatic legends",
      "Tailwind className on areas, lines, axes",
      "Works in React Server Components",
      "Under 3kb tree-shaken",
    ],
    chartType: "area",
    framework: "react",
    docsLink: "/docs/charts/area",
  },
  "react-scatter-plot": {
    title: "React Scatter Plot Component",
    h1: "React Scatter Plot",
    description:
      "React scatter plot with SVG rendering, bubble sizes, color mapping, regression lines. Tailwind CSS styling. Under 15kb gzipped.",
    intro:
      "A React scatter plot component that renders as SVG. Map data to x, y, size, and color dimensions. Add trend lines, tooltips, and style every dot with Tailwind CSS.",
    installCmd: "npm install @chartts/react",
    codeExample: `import { ScatterChart } from "@chartts/react"

export function CorrelationChart() {
  const data = [
    { spend: 1200, revenue: 4200, size: 10 },
    { spend: 2400, revenue: 8100, size: 15 },
    { spend: 3600, revenue: 11800, size: 22 },
    { spend: 4800, revenue: 15200, size: 30 },
  ]

  return (
    <ScatterChart
      data={data}
      x="spend"
      y="revenue"
      size="size"
      className="h-72"
      dotClassName="fill-cyan-400"
    />
  )
}`,
    features: [
      "Map data to x, y, size, and color",
      "Regression and trend lines",
      "SVG rendering with real DOM elements",
      "Tailwind className on dots, axes, grid",
      "Tooltips with custom content",
      "TypeScript with full type inference",
      "Under 3kb tree-shaken",
    ],
    chartType: "scatter",
    framework: "react",
    docsLink: "/docs/charts/scatter",
  },
  "react-radar-chart": {
    title: "React Radar Chart Component",
    h1: "React Radar Chart",
    description:
      "React radar chart for multi-dimensional data comparison. SVG-based, Tailwind CSS styling, accessible. Under 15kb gzipped.",
    intro:
      "Compare multiple dimensions at a glance with a React radar chart. SVG rendering, Tailwind CSS on every polygon and axis, multi-series overlay, and accessible by default.",
    installCmd: "npm install @chartts/react",
    codeExample: `import { RadarChart } from "@chartts/react"

export function SkillRadar() {
  const data = [
    { skill: "React", level: 95 },
    { skill: "TypeScript", level: 88 },
    { skill: "CSS", level: 82 },
    { skill: "Node.js", level: 75 },
    { skill: "SQL", level: 68 },
    { skill: "DevOps", level: 55 },
  ]

  return (
    <RadarChart
      data={data}
      label="skill"
      value="level"
      className="h-72"
      fillClassName="fill-cyan-400/20"
    />
  )
}`,
    features: [
      "Multi-dimensional data comparison",
      "Multi-series overlay for A/B comparisons",
      "SVG rendering with polygon fills",
      "Tailwind className on polygons, axes, labels",
      "Customizable grid levels",
      "WCAG AA accessible",
      "Under 3kb tree-shaken",
    ],
    chartType: "radar",
    framework: "react",
    docsLink: "/docs/charts/radar",
  },
  "react-heatmap": {
    title: "React Heatmap Component",
    h1: "React Heatmap",
    description:
      "React heatmap chart for matrix data visualization. Color scales, tooltips, labels. SVG rendering, Tailwind CSS. Under 15kb.",
    intro:
      "Visualize matrix data with a React heatmap component. Automatic color scales, cell labels, tooltips, and Tailwind CSS styling. Renders as SVG for crisp display at any resolution.",
    installCmd: "npm install @chartts/react",
    codeExample: `import { HeatmapChart } from "@chartts/react"

export function ActivityHeatmap() {
  const data = [
    { day: "Mon", hour: "9am", value: 12 },
    { day: "Mon", hour: "10am", value: 28 },
    { day: "Tue", hour: "9am", value: 18 },
    { day: "Tue", hour: "10am", value: 45 },
  ]

  return (
    <HeatmapChart
      data={data}
      x="hour"
      y="day"
      value="value"
      className="h-64"
      colorScale={["#f0fdf4", "#22c55e"]}
    />
  )
}`,
    features: [
      "Automatic color scale mapping",
      "Custom color palettes",
      "Cell labels and tooltips",
      "SVG rendering for crisp display",
      "Tailwind className on cells, axes, labels",
      "Responsive with automatic sizing",
      "Under 3kb tree-shaken",
    ],
    chartType: "heatmap",
    framework: "react",
    docsLink: "/docs/charts/heatmap",
  },
  "react-treemap": {
    title: "React Treemap Component",
    h1: "React Treemap",
    description:
      "React treemap for hierarchical data visualization. Nested rectangles, color coding, labels. SVG rendering, Tailwind CSS. Under 15kb.",
    intro:
      "Visualize hierarchical data as nested rectangles with a React treemap. Automatic layout algorithm, color coding by category, drill-down support, and Tailwind CSS styling on every cell.",
    installCmd: "npm install @chartts/react",
    codeExample: `import { TreemapChart } from "@chartts/react"

export function DiskUsage() {
  const data = [
    { name: "Documents", value: 12400, category: "files" },
    { name: "Photos", value: 8200, category: "media" },
    { name: "Videos", value: 24800, category: "media" },
    { name: "Code", value: 6100, category: "files" },
    { name: "Music", value: 3400, category: "media" },
  ]

  return (
    <TreemapChart
      data={data}
      label="name"
      value="value"
      className="h-72"
    />
  )
}`,
    features: [
      "Automatic squarified layout algorithm",
      "Hierarchical nesting support",
      "Color coding by category or value",
      "Labels with automatic truncation",
      "Drill-down navigation",
      "Tailwind className on cells and labels",
      "Under 3kb tree-shaken",
    ],
    chartType: "treemap",
    framework: "react",
    docsLink: "/docs/charts/treemap",
  },
  "react-gauge-chart": {
    title: "React Gauge Chart Component",
    h1: "React Gauge Chart",
    description:
      "React gauge chart for KPIs and metrics. Semicircle, full circle, color zones. SVG rendering, Tailwind CSS. Under 15kb.",
    intro:
      "Display KPIs and metrics with a React gauge chart. Semicircle and full-circle layouts, color zones for thresholds, animated needles, and Tailwind CSS on every element.",
    installCmd: "npm install @chartts/react",
    codeExample: `import { GaugeChart } from "@chartts/react"

export function PerformanceGauge() {
  return (
    <GaugeChart
      value={73}
      min={0}
      max={100}
      zones={[
        { max: 40, className: "fill-red-500" },
        { max: 70, className: "fill-amber-500" },
        { max: 100, className: "fill-emerald-500" },
      ]}
      className="h-48"
      label="Performance Score"
    />
  )
}`,
    features: [
      "Semicircle and full-circle layouts",
      "Color zones for threshold indicators",
      "Animated needle transitions",
      "Custom min/max ranges",
      "SVG rendering for crisp display",
      "Tailwind className on arcs, needle, labels",
      "Under 3kb tree-shaken",
    ],
    chartType: "gauge",
    framework: "react",
    docsLink: "/docs/charts/gauge",
  },
  "react-funnel-chart": {
    title: "React Funnel Chart Component",
    h1: "React Funnel Chart",
    description:
      "React funnel chart for conversion flows. Stage labels, percentages, color coding. SVG rendering, Tailwind CSS. Under 15kb.",
    intro:
      "Visualize conversion funnels with a React funnel chart. Automatic width calculation, stage labels with percentages, drop-off rates, and Tailwind CSS styling.",
    installCmd: "npm install @chartts/react",
    codeExample: `import { FunnelChart } from "@chartts/react"

export function ConversionFunnel() {
  const data = [
    { stage: "Visitors", count: 12000 },
    { stage: "Sign Ups", count: 4800 },
    { stage: "Activated", count: 2100 },
    { stage: "Subscribed", count: 890 },
    { stage: "Retained", count: 620 },
  ]

  return (
    <FunnelChart
      data={data}
      label="stage"
      value="count"
      className="h-72"
      showPercentages
    />
  )
}`,
    features: [
      "Automatic width proportional to values",
      "Stage labels with conversion percentages",
      "Drop-off rate indicators",
      "Horizontal and vertical orientations",
      "SVG rendering with gradient fills",
      "Tailwind className on stages and labels",
      "Under 3kb tree-shaken",
    ],
    chartType: "funnel",
    framework: "react",
    docsLink: "/docs/charts/funnel",
  },
  "react-waterfall-chart": {
    title: "React Waterfall Chart Component",
    h1: "React Waterfall Chart",
    description:
      "React waterfall chart for financial analysis. Running totals, positive/negative flows, subtotals. SVG rendering, Tailwind CSS. Under 15kb.",
    intro:
      "Show how values increase and decrease with a React waterfall chart. Automatic running totals, positive/negative color coding, subtotal and total markers, and connector lines. Style everything with Tailwind.",
    installCmd: "npm install @chartts/react",
    codeExample: `import { WaterfallChart } from "@chartts/react"

export function ProfitWaterfall() {
  const data = [
    { label: "Revenue", value: 420000 },
    { label: "COGS", value: -180000 },
    { label: "Gross Profit", type: "subtotal" },
    { label: "OpEx", value: -95000 },
    { label: "Tax", value: -43000 },
    { label: "Net Income", type: "total" },
  ]

  return (
    <WaterfallChart
      data={data}
      label="label"
      value="value"
      className="h-72"
      upClassName="fill-emerald-500"
      downClassName="fill-red-500"
    />
  )
}`,
    features: [
      "Automatic running totals",
      "Positive/negative color coding",
      "Subtotal and total markers",
      "Connector lines between bars",
      "Tailwind className on every element",
      "Financial reporting ready",
      "Under 3kb tree-shaken",
    ],
    chartType: "waterfall",
    framework: "react",
    docsLink: "/docs/charts/waterfall",
  },
  "react-candlestick-chart": {
    title: "React Candlestick Chart Component",
    h1: "React Candlestick Chart",
    description:
      "React candlestick chart for financial data. OHLC, volume bars, moving averages. SVG rendering, Tailwind CSS styling. Under 15kb.",
    intro:
      "Build professional financial charts with a React candlestick component. OHLC data support, volume overlay, moving averages, and real-time streaming. Style every candle with Tailwind CSS.",
    installCmd: "npm install @chartts/react",
    codeExample: `import { CandlestickChart } from "@chartts/react"

export function StockChart() {
  return (
    <CandlestickChart
      data={stockData}
      x="date"
      open="open"
      high="high"
      low="low"
      close="close"
      className="h-96"
      upClassName="fill-emerald-500 stroke-emerald-600"
      downClassName="fill-red-500 stroke-red-600"
    />
  )
}`,
    features: [
      "OHLC (Open, High, Low, Close) data format",
      "Volume bars overlay",
      "Moving average lines (SMA, EMA)",
      "Customizable up/down candle colors",
      "Zoom and pan for time navigation",
      "Real-time data streaming",
      "Under 4kb tree-shaken",
    ],
    chartType: "candlestick",
    framework: "react",
    docsLink: "/docs/charts/candlestick",
  },
  "react-donut-chart": {
    title: "React Donut Chart Component",
    h1: "React Donut Chart",
    description:
      "React donut chart with center labels, Tailwind CSS styling, accessibility. SVG rendering. Under 15kb gzipped.",
    intro:
      "A lightweight React donut chart with configurable inner radius, center stats, animated transitions, and Tailwind CSS styling. Renders as SVG with full screen reader support.",
    installCmd: "npm install @chartts/react",
    codeExample: `import { DonutChart } from "@chartts/react"

export function BudgetDonut() {
  const data = [
    { category: "Housing", amount: 1800 },
    { category: "Food", amount: 600 },
    { category: "Transport", amount: 400 },
    { category: "Savings", amount: 500 },
    { category: "Other", amount: 300 },
  ]

  return (
    <DonutChart
      data={data}
      label="category"
      value="amount"
      className="h-72"
      innerRadius={0.6}
      centerLabel="$3,600"
      centerSubLabel="Monthly"
    />
  )
}`,
    features: [
      "Configurable inner radius",
      "Center label and stat display",
      "Animated slice transitions",
      "Pattern fills for color-blind users",
      "Tailwind className on slices and labels",
      "Screen reader accessible",
      "Under 3kb tree-shaken",
    ],
    chartType: "donut",
    framework: "react",
    docsLink: "/docs/charts/donut",
  },
  "react-bubble-chart": {
    title: "React Bubble Chart Component",
    h1: "React Bubble Chart",
    description:
      "React bubble chart for 3-dimensional data. Size mapping, color scales, labels. SVG rendering, Tailwind CSS. Under 15kb.",
    intro:
      "Visualize three dimensions of data with a React bubble chart. Map values to x, y, and bubble size. Color scales, labels, tooltips, and Tailwind CSS on every element.",
    installCmd: "npm install @chartts/react",
    codeExample: `import { BubbleChart } from "@chartts/react"

export function MarketAnalysis() {
  const data = [
    { company: "Acme", revenue: 12, growth: 25, employees: 500 },
    { company: "Beta", revenue: 8, growth: 40, employees: 200 },
    { company: "Corp", revenue: 25, growth: 10, employees: 1200 },
    { company: "Delta", revenue: 5, growth: 60, employees: 80 },
  ]

  return (
    <BubbleChart
      data={data}
      x="revenue"
      y="growth"
      size="employees"
      label="company"
      className="h-72"
    />
  )
}`,
    features: [
      "Three-dimensional data mapping (x, y, size)",
      "Color scale by category or value",
      "Labels and tooltips",
      "SVG rendering with real DOM",
      "Tailwind className on bubbles, axes, labels",
      "Responsive sizing",
      "Under 3kb tree-shaken",
    ],
    chartType: "bubble",
    framework: "react",
    docsLink: "/docs/charts/bubble",
  },
  "react-sparkline": {
    title: "React Sparkline Component",
    h1: "React Sparkline",
    description:
      "Tiny inline React sparkline charts for KPIs, tables, and dashboards. SVG rendering, Tailwind CSS. Under 15kb.",
    intro:
      "Embed tiny sparkline charts inline with text, in table cells, or on KPI cards. SVG rendering at any size, Tailwind CSS styling, and under 1kb per sparkline. Perfect for data-dense dashboards.",
    installCmd: "npm install @chartts/react",
    codeExample: `import { Sparkline } from "@chartts/react"

export function KPICard({ label, value, trend }) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl card">
      <div>
        <p className="text-sm muted-text">{label}</p>
        <p className="text-2xl font-bold heading">{value}</p>
      </div>
      <Sparkline
        data={trend}
        className="w-24 h-8"
        lineClassName="stroke-emerald-400"
        areaClassName="fill-emerald-400/10"
      />
    </div>
  )
}`,
    features: [
      "Tiny inline charts (as small as 24x8px)",
      "Line, bar, and area variants",
      "SVG rendering at any resolution",
      "Tailwind className on line and area",
      "Perfect for tables and KPI cards",
      "No axes or labels (pure data)",
      "Under 1kb tree-shaken",
    ],
    chartType: "sparkline",
    framework: "react",
    docsLink: "/docs/charts/sparkline",
  },
  "react-sankey-diagram": {
    title: "React Sankey Diagram Component",
    h1: "React Sankey Diagram",
    description:
      "React Sankey diagram for flow visualization. Node-link layouts, weighted edges, color coding. SVG rendering, Tailwind CSS. Under 15kb.",
    intro:
      "Visualize flows and connections with a React Sankey diagram. Automatic node positioning, weighted edges, color-coded paths, and Tailwind CSS styling. Perfect for energy flows, budget allocation, and user journeys.",
    installCmd: "npm install @chartts/react",
    codeExample: `import { SankeyChart } from "@chartts/react"

export function BudgetFlow() {
  const data = {
    nodes: ["Revenue", "OpEx", "CapEx", "Salaries", "R&D", "Marketing"],
    links: [
      { source: "Revenue", target: "OpEx", value: 60 },
      { source: "Revenue", target: "CapEx", value: 40 },
      { source: "OpEx", target: "Salaries", value: 35 },
      { source: "OpEx", target: "R&D", value: 15 },
      { source: "OpEx", target: "Marketing", value: 10 },
    ],
  }

  return <SankeyChart data={data} className="h-72" />
}`,
    features: [
      "Automatic node positioning",
      "Weighted edges with flow width",
      "Color coding by source or category",
      "Node labels and value display",
      "SVG rendering for crisp display",
      "Tailwind className on nodes, links, labels",
      "Under 4kb tree-shaken",
    ],
    chartType: "sankey",
    framework: "react",
    docsLink: "/docs/charts/sankey",
  },
  "react-boxplot": {
    title: "React Box Plot Component",
    h1: "React Box Plot",
    description:
      "React box plot for statistical data distribution. Quartiles, whiskers, outliers. SVG rendering, Tailwind CSS. Under 15kb.",
    intro:
      "Display statistical distributions with a React box plot. Automatic quartile calculation, whiskers, outlier markers, and Tailwind CSS styling. Perfect for comparing distributions across categories.",
    installCmd: "npm install @chartts/react",
    codeExample: `import { BoxPlotChart } from "@chartts/react"

export function SalaryDistribution() {
  const data = [
    { dept: "Engineering", values: [65, 72, 78, 85, 92, 95, 110] },
    { dept: "Design", values: [55, 62, 68, 74, 80, 85, 95] },
    { dept: "Marketing", values: [48, 55, 62, 70, 76, 82, 88] },
    { dept: "Sales", values: [42, 52, 65, 78, 88, 95, 120] },
  ]

  return (
    <BoxPlotChart
      data={data}
      label="dept"
      values="values"
      className="h-72"
      boxClassName="fill-cyan-400/20 stroke-cyan-400"
    />
  )
}`,
    features: [
      "Automatic quartile and IQR calculation",
      "Whiskers with configurable range",
      "Outlier markers",
      "Horizontal and vertical orientations",
      "SVG rendering with Tailwind CSS",
      "Multiple series comparison",
      "Under 3kb tree-shaken",
    ],
    chartType: "boxplot",
    framework: "react",
    docsLink: "/docs/charts/boxplot",
  },

  // ── Framework landings ──

  "angular-chart-library": {
    title: "Angular Chart Library",
    h1: "Angular Chart Library",
    description:
      "Angular chart components with SVG rendering. 65+ chart types, Tailwind CSS, TypeScript-first. Zone-aware change detection. Under 15kb.",
    intro:
      "Native Angular components for 65+ chart types. Zone-aware change detection, OnPush compatible, Tailwind CSS integration, and full TypeScript support. Under 15kb for the entire library.",
    installCmd: "npm install @chartts/angular",
    codeExample: `import { CharttsModule } from "@chartts/angular"

@Component({
  template: \`
    <chartts-line
      [data]="data"
      x="month"
      y="revenue"
      class="h-64"
      lineClass="stroke-cyan-400"
    />
  \`,
})
export class DashboardComponent {
  data = [
    { month: "Jan", revenue: 4200 },
    { month: "Feb", revenue: 5800 },
    { month: "Mar", revenue: 7100 },
  ]
}`,
    features: [
      "Native Angular components",
      "Zone-aware change detection",
      "OnPush compatible for performance",
      "Tailwind CSS class binding",
      "Full TypeScript support",
      "65+ chart types",
      "Under 15kb gzipped",
    ],
    chartType: "line",
    framework: "angular",
    docsLink: "/docs/angular",
  },
  "solid-js-charts": {
    title: "Solid.js Chart Library",
    h1: "Solid.js Charts",
    description:
      "Chart library for Solid.js. SVG rendering, fine-grained reactivity, Tailwind CSS. 65+ chart types under 15kb. SolidStart SSR support.",
    intro:
      "Native Solid.js components for 65+ chart types. Fine-grained reactivity means charts update without re-rendering. Tailwind CSS, TypeScript, and SolidStart SSR support out of the box.",
    installCmd: "npm install @chartts/solid",
    codeExample: `import { LineChart } from "@chartts/solid"
import { createSignal } from "solid-js"

export function Dashboard() {
  const [data] = createSignal([
    { month: "Jan", revenue: 4200 },
    { month: "Feb", revenue: 5800 },
    { month: "Mar", revenue: 7100 },
  ])

  return (
    <LineChart
      data={data()}
      x="month"
      y="revenue"
      class="h-64"
      lineClass="stroke-cyan-400"
    />
  )
}`,
    features: [
      "Fine-grained reactivity (no VDOM diffing)",
      "Native Solid.js components",
      "Tailwind CSS integration",
      "Full TypeScript support",
      "SolidStart SSR support",
      "65+ chart types",
      "Under 15kb gzipped",
    ],
    chartType: "line",
    framework: "solid",
    docsLink: "/docs/solid",
  },
  "remix-charts": {
    title: "Remix Chart Library",
    h1: "Charts for Remix",
    description:
      "Add charts to Remix apps. SVG rendering works with Remix loaders, nested routes, and streaming. Tailwind CSS native. Under 15kb.",
    intro:
      "Chart.ts works seamlessly with Remix. Load data in loaders, render charts as SVG in routes, and stream with defer. No client JS needed for static charts. Tailwind CSS on every element.",
    installCmd: "npm install @chartts/react",
    codeExample: `// app/routes/dashboard.tsx
import { json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { BarChart } from "@chartts/react"

export async function loader() {
  const metrics = await db.getMetrics()
  return json({ metrics })
}

export default function Dashboard() {
  const { metrics } = useLoaderData<typeof loader>()
  return (
    <BarChart
      data={metrics}
      x="month"
      y="sales"
      className="h-64"
      barClassName="fill-cyan-500"
    />
  )
}`,
    features: [
      "Works with Remix loaders and actions",
      "SVG rendering for server-side output",
      "Streaming support with defer",
      "Nested route compatible",
      "Tailwind CSS on every element",
      "TypeScript with loader type inference",
      "Under 15kb gzipped",
    ],
    chartType: "bar",
    framework: "react",
    docsLink: "/docs/react",
  },
  "astro-charts": {
    title: "Astro Chart Library",
    h1: "Charts for Astro",
    description:
      "Add charts to Astro sites. Zero JS by default with SVG rendering. Tailwind CSS native. Use with any UI framework. Under 15kb.",
    intro:
      "Chart.ts is perfect for Astro. SVG rendering means charts ship as HTML with zero JavaScript by default. Use the core library directly in .astro files, or use framework components with client:load when you need interactivity.",
    installCmd: "npm install @chartts/core",
    codeExample: `---
// src/pages/dashboard.astro
import { line } from "@chartts/core"

const data = await fetch("/api/metrics").then(r => r.json())
const svg = line({
  data,
  x: "month",
  y: "revenue",
  width: 600,
  height: 300,
})
---

<div class="chart-wrapper" set:html={svg} />

<!-- Zero JavaScript shipped. Pure SVG HTML. -->`,
    features: [
      "Zero JavaScript by default",
      "SVG renders as static HTML",
      "Works in .astro files directly",
      "Use with React/Vue/Svelte islands",
      "Tailwind CSS integration",
      "Content Collections compatible",
      "Under 15kb gzipped",
    ],
    chartType: "line",
    docsLink: "/docs",
  },
  "nuxt-chart-library": {
    title: "Nuxt Chart Library",
    h1: "Charts for Nuxt",
    description:
      "Add charts to Nuxt 3 apps. SSR support, Tailwind CSS native, Vue 3 components. 65+ chart types under 15kb gzipped.",
    intro:
      "Chart.ts provides native Vue 3 components that work with Nuxt 3 out of the box. Server-side rendering, auto-imports, Tailwind CSS integration, and TypeScript support. Under 15kb for the entire library.",
    installCmd: "npm install @chartts/vue",
    codeExample: `<script setup lang="ts">
// pages/dashboard.vue
import { LineChart } from "@chartts/vue"

const { data: metrics } = await useFetch("/api/metrics")
</script>

<template>
  <LineChart
    :data="metrics"
    x="month"
    y="revenue"
    class="h-64"
    line-class="stroke-cyan-400"
  />
</template>`,
    features: [
      "Native Vue 3 components",
      "Nuxt 3 SSR support",
      "Auto-imports compatible",
      "Tailwind CSS class binding",
      "Full TypeScript support",
      "65+ chart types",
      "Under 15kb gzipped",
    ],
    chartType: "line",
    framework: "vue",
    docsLink: "/docs/vue",
  },
  "sveltekit-charts": {
    title: "SvelteKit Chart Library",
    h1: "Charts for SvelteKit",
    description:
      "Add charts to SvelteKit apps. SSR with load functions, Tailwind CSS, TypeScript. 65+ chart types under 15kb.",
    intro:
      "Native Svelte components that work with SvelteKit load functions, SSR, and streaming. Reactive stores, Tailwind CSS integration, and TypeScript support. Under 15kb for everything.",
    installCmd: "npm install @chartts/svelte",
    codeExample: `<!-- src/routes/dashboard/+page.svelte -->
<script lang="ts">
  import { BarChart } from "@chartts/svelte"
  import type { PageData } from "./$types"

  export let data: PageData
</script>

<BarChart
  data={data.metrics}
  x="month"
  y="sales"
  class="h-64"
  barClass="fill-cyan-500"
/>`,
    features: [
      "Works with SvelteKit load functions",
      "Server-side rendering support",
      "Reactive with Svelte stores",
      "Tailwind CSS on every element",
      "Full TypeScript support",
      "65+ chart types",
      "Under 15kb gzipped",
    ],
    chartType: "bar",
    framework: "svelte",
    docsLink: "/docs/svelte",
  },
  "qwik-charts": {
    title: "Qwik Chart Library",
    h1: "Charts for Qwik",
    description:
      "Add charts to Qwik apps. Zero hydration with SVG rendering. Resumable, instant-loading charts. Tailwind CSS native. Under 15kb.",
    intro:
      "Chart.ts SVG rendering means zero hydration cost in Qwik. Charts render on the server as HTML and are instantly interactive. No JavaScript downloaded until user interaction. The fastest charts possible.",
    installCmd: "npm install @chartts/core",
    codeExample: `// src/routes/dashboard/index.tsx
import { component$ } from "@builder.io/qwik"
import { routeLoader$ } from "@builder.io/qwik-city"
import { line } from "@chartts/core"

export const useMetrics = routeLoader$(async () => {
  return await db.getMetrics()
})

export default component$(() => {
  const metrics = useMetrics()
  const svg = line({
    data: metrics.value,
    x: "month",
    y: "revenue",
  })

  return <div dangerouslySetInnerHTML={svg} />
})`,
    features: [
      "Zero hydration cost",
      "Resumable chart interactions",
      "SVG renders as static HTML",
      "Works with routeLoader$",
      "Tailwind CSS integration",
      "Instant page loads",
      "Under 15kb gzipped",
    ],
    chartType: "line",
    docsLink: "/docs",
  },

  // ── Feature / use-case landings ──

  "svg-chart-library": {
    title: "SVG Chart Library | JavaScript",
    h1: "SVG Chart Library",
    description:
      "SVG-first chart library. Real DOM elements, CSS styling, DevTools inspection, screen readers. Not Canvas. Not WebGL. Pure SVG. Under 15kb.",
    intro:
      "Chart.ts renders charts as real SVG DOM elements. Style with CSS, inspect in DevTools, traverse with screen readers, print at any resolution. No Canvas blobs. No WebGL black boxes. Just clean, semantic SVG.",
    installCmd: "npm install @chartts/core",
    codeExample: `import { bar } from "@chartts/core"

// Output is clean SVG markup
const svg = bar({
  data: [
    { label: "React", value: 85 },
    { label: "Vue", value: 72 },
    { label: "Svelte", value: 68 },
  ],
  x: "label",
  y: "value",
})

// svg is a string of <svg>...</svg> markup
// Paste it in HTML, style it with CSS, inspect in DevTools`,
    features: [
      "Real SVG DOM elements (not Canvas)",
      "Style with CSS and Tailwind classes",
      "Inspect and debug in browser DevTools",
      "Screen readers traverse chart elements",
      "Print at any resolution without blur",
      "Server-side renderable (no browser needed)",
      "Embeddable in HTML emails and documents",
    ],
    chartType: "bar",
    docsLink: "/docs/svg",
  },
  "ssr-charts-nextjs": {
    title: "Server-Side Rendered Charts | Next.js SSR",
    h1: "Server-Side Rendered Charts",
    description:
      "Charts that render on the server. Zero client JS for static charts. Works with Next.js, Remix, Astro, Nuxt. SVG output, instant display.",
    intro:
      "Chart.ts renders charts as SVG strings on the server. No browser, no Canvas, no JavaScript needed on the client. Charts appear instantly in the HTML response. Works with Next.js RSC, Remix loaders, Astro, and any SSR framework.",
    installCmd: "npm install @chartts/core",
    codeExample: `// Next.js App Router (Server Component)
import { bar } from "@chartts/core"

export default async function Page() {
  const data = await db.query("SELECT month, revenue FROM sales")

  const svg = bar({
    data,
    x: "month",
    y: "revenue",
    width: 600,
    height: 300,
  })

  return (
    <div dangerouslySetInnerHTML={{ __html: svg }} />
  )
}
// Zero client JS. Chart is in the HTML response.`,
    features: [
      "Zero client-side JavaScript for static charts",
      "Charts appear in initial HTML response",
      "No layout shift (CLS = 0)",
      "Works with React Server Components",
      "Compatible with Remix, Astro, Nuxt, SvelteKit",
      "Edge runtime compatible",
      "SVG output for maximum compatibility",
    ],
    chartType: "bar",
    docsLink: "/docs/react",
  },
  "lightweight-react-charts": {
    title: "Lightweight React Charts | Under 15kb",
    h1: "Lightweight React Charts",
    description:
      "The lightest full-featured React chart library. Under 15kb for everything. Tree-shakeable to ~2kb per chart. Zero dependencies.",
    intro:
      "Most chart libraries add 200-500kb to your bundle. Chart.ts ships the entire library at under 15kb gzipped. Import only the charts you use and ship as little as 2kb. Zero runtime dependencies. Your Lighthouse score stays green.",
    installCmd: "npm install @chartts/react",
    codeExample: `// Import only what you use
import { LineChart } from "@chartts/react/line"  // ~2.5kb
import { BarChart } from "@chartts/react/bar"    // ~2.8kb
import { PieChart } from "@chartts/react/pie"    // ~2.2kb

// Total: ~7.5kb for 3 chart types
// Compare: Chart.js = 60kb, Recharts = 45kb, ECharts = 300kb+

export function Dashboard() {
  return (
    <>
      <LineChart data={revenue} x="month" y="amount" />
      <BarChart data={sales} x="product" y="count" />
      <PieChart data={share} label="name" value="pct" />
    </>
  )
}`,
    features: [
      "Under 15kb gzipped for the entire library",
      "~2-4kb per chart type with tree-shaking",
      "Zero runtime dependencies",
      "10x smaller than Chart.js",
      "20x smaller than ECharts",
      "No impact on Lighthouse performance score",
      "ESM tree-shaking with per-chart imports",
    ],
    chartType: "line",
    framework: "react",
    docsLink: "/docs/performance",
  },
  "accessible-chart-library": {
    title: "Accessible Chart Library | WCAG 2.1 AA",
    h1: "Accessible Chart Library",
    description:
      "WCAG 2.1 AA compliant chart library. Keyboard navigation, screen readers, pattern fills, high contrast, reduced motion. Built-in, not bolted on.",
    intro:
      "Accessibility is not an afterthought in Chart.ts. SVG rendering means screen readers can traverse chart elements natively. Keyboard navigation, ARIA attributes, pattern fills for color-blind users, and reduced motion support are all built in.",
    installCmd: "npm install @chartts/core",
    codeExample: `// Every chart is accessible by default
<BarChart
  data={data}
  x="category"
  y="value"
  // ARIA attributes auto-generated from data
  // Keyboard: Tab to chart, Arrows to navigate
  // Screen readers: auto data summaries
  // Patterns: built-in for color-blind users
  patterns={true}
  aria={{
    label: "Q4 Revenue by Category",
    description: "Engineering leads at $93k, followed by Sales at $78k"
  }}
/>

// Reduced motion? Animations auto-disabled.
// High contrast mode? Colors auto-adjusted.
// Focus visible? Ring styles built in.`,
    features: [
      "WCAG 2.1 AA compliant out of the box",
      "Keyboard navigation (Tab, Arrow, Enter, Escape)",
      "Screen reader announcements with data summaries",
      "Pattern fills for color-blind users",
      "Respects prefers-reduced-motion",
      "High contrast mode support",
      "Focus visible indicators",
    ],
    chartType: "bar",
    docsLink: "/docs/accessibility",
  },
  "dark-mode-charts": {
    title: "Dark Mode Charts | Tailwind dark: Variants",
    h1: "Dark Mode Charts",
    description:
      "Charts that support dark mode with Tailwind dark: variants. No theme config files. No runtime color switching. Just CSS classes.",
    intro:
      "Dark mode charts without a theming system. Chart.ts accepts Tailwind CSS classes on every element. Use dark: variants on lines, bars, axes, and labels. Toggle dark mode site-wide and charts follow automatically.",
    installCmd: "npm install @chartts/react",
    codeExample: `<LineChart
  data={data}
  x="month"
  y="revenue"
  className="h-64 bg-white dark:bg-zinc-900 rounded-xl p-4"
  lineClassName="stroke-cyan-600 dark:stroke-cyan-400"
  areaClassName="fill-cyan-100 dark:fill-cyan-400/10"
  dotClassName="fill-white dark:fill-zinc-900 stroke-cyan-600 dark:stroke-cyan-400"
  axisClassName="text-zinc-600 dark:text-zinc-400"
  gridClassName="stroke-zinc-200 dark:stroke-zinc-800"
  tooltipClassName="bg-white dark:bg-zinc-800 shadow-lg rounded-lg"
/>

// Toggle your site's dark mode. Charts follow automatically.
// No theme config. No runtime color switching. Just CSS.`,
    features: [
      "Tailwind dark: variants on every element",
      "No separate theming system",
      "No runtime color switching",
      "Charts follow site-wide dark mode toggle",
      "Works with next-themes, nuxt-color-mode, etc.",
      "Custom color schemes with Tailwind design tokens",
      "CSS transitions between light and dark",
    ],
    chartType: "line",
    docsLink: "/docs/tailwind",
  },
  "real-time-charts-react": {
    title: "Real-Time Charts for React",
    h1: "Real-Time Charts",
    description:
      "Live-updating React charts with WebSocket, SSE, and polling. Smooth transitions, streaming data, auto-scrolling time axis. Under 15kb.",
    intro:
      "Build live dashboards with real-time updating charts. Chart.ts supports smooth transitions between data states, streaming append for time series, and auto-scrolling time axes. Works with WebSocket, Server-Sent Events, and polling.",
    installCmd: "npm install @chartts/react",
    codeExample: `import { LineChart } from "@chartts/react"
import { useState, useEffect } from "react"

export function LiveChart() {
  const [data, setData] = useState([])

  useEffect(() => {
    const ws = new WebSocket("wss://api.example.com/stream")
    ws.onmessage = (e) => {
      const point = JSON.parse(e.data)
      setData(prev => [...prev.slice(-50), point])
    }
    return () => ws.close()
  }, [])

  return (
    <LineChart
      data={data}
      x="timestamp"
      y="value"
      className="h-64"
      animate
      lineClassName="stroke-emerald-400"
    />
  )
}`,
    features: [
      "Smooth transitions between data states",
      "Streaming data append for time series",
      "Auto-scrolling time axis",
      "Works with WebSocket, SSE, and polling",
      "60fps animation performance",
      "Memory-efficient with windowed data",
      "Under 15kb gzipped",
    ],
    chartType: "line",
    framework: "react",
    docsLink: "/docs/charts/line",
  },
  "chart-library-typescript": {
    title: "TypeScript Chart Library | Strict Mode",
    h1: "TypeScript-First Charts",
    description:
      "Chart library built in TypeScript strict mode. Full type inference, generic components, autocomplete. Zero @types/ packages needed.",
    intro:
      "Chart.ts is not a JavaScript library with type definitions bolted on. It is built in TypeScript strict mode from the ground up. Every data shape is inferred, every prop is constrained, and your editor gives you autocomplete for everything.",
    installCmd: "npm install @chartts/core",
    codeExample: `import { line } from "@chartts/core"

// TypeScript infers valid keys from your data
const svg = line({
  data: [
    { month: "Jan", revenue: 4200, users: 120 },
    { month: "Feb", revenue: 5800, users: 180 },
  ],
  x: "month",      // TS: "month" | "revenue" | "users"
  y: "revenue",    // TS: "month" | "revenue" | "users"
  // y: "invalid"  // TS Error: not a key of data items
})

// Generic React component
<LineChart<SalesData>
  data={salesData}
  x="month"        // autocomplete from SalesData keys
  y="amount"       // autocomplete from SalesData keys
/>`,
    features: [
      "Built in TypeScript strict mode",
      "Full type inference on data shapes",
      "Generic components constrained to your types",
      "Autocomplete for every prop and callback",
      "Zero @types/ packages needed",
      "Exported types for all chart options",
      "Works with any TypeScript version 4.7+",
    ],
    chartType: "line",
    docsLink: "/docs/typescript",
  },
  "react-dashboard-charts": {
    title: "React Dashboard Charts | Dashboard Components",
    h1: "React Dashboard Charts",
    description:
      "Production-ready chart components for React dashboards. KPI cards, trend lines, comparison charts. Tailwind CSS, SSR, under 15kb.",
    intro:
      "Build production dashboards with Chart.ts. Line charts for trends, bar charts for comparisons, sparklines for KPIs, gauges for health metrics, and heatmaps for activity. All styled with Tailwind CSS and under 15kb total.",
    installCmd: "npm install @chartts/react",
    codeExample: `import { LineChart, BarChart, Sparkline, GaugeChart } from "@chartts/react"

export function Dashboard() {
  return (
    <div className="grid grid-cols-4 gap-4">
      {/* KPI cards with sparklines */}
      <KPICard label="Revenue" value="$128k" trend={revenueData} />
      <KPICard label="Users" value="12.4k" trend={userData} />
      <KPICard label="Uptime" value="99.9%" trend={uptimeData} />
      <KPICard label="NPS" value="72" trend={npsData} />

      {/* Main charts */}
      <div className="col-span-3">
        <LineChart data={revenue} x="month" y="amount" className="h-72" />
      </div>
      <div className="col-span-1">
        <GaugeChart value={73} max={100} className="h-72" />
      </div>
    </div>
  )
}`,
    features: [
      "Complete dashboard chart toolkit",
      "KPI sparklines, gauges, trend charts",
      "Consistent Tailwind CSS styling across charts",
      "Server-side rendering for instant display",
      "Responsive grid layouts",
      "Dark mode with a single class toggle",
      "Under 15kb for all chart types",
    ],
    chartType: "line",
    framework: "react",
    docsLink: "/examples",
  },
  "react-financial-charts": {
    title: "React Financial Charts | Stock & Crypto",
    h1: "React Financial Charts",
    description:
      "Financial chart components for React. Candlestick, OHLC, volume, waterfall. Technical indicators, real-time streaming. Under 15kb.",
    intro:
      "Professional financial charts for trading dashboards and portfolio apps. Candlestick, OHLC, volume bars, waterfall charts, and technical indicators. Real-time data streaming, zoom/pan, and Tailwind CSS styling.",
    installCmd: "npm install @chartts/react",
    codeExample: `import { CandlestickChart } from "@chartts/react"

export function TradingView() {
  return (
    <div className="rounded-xl card p-4">
      <CandlestickChart
        data={ohlcData}
        x="date"
        open="open"
        high="high"
        low="low"
        close="close"
        volume="volume"
        overlays={[
          { type: "sma", period: 20 },
          { type: "ema", period: 50 },
          { type: "bollinger", period: 20 },
        ]}
        className="h-96"
        upClassName="fill-emerald-500"
        downClassName="fill-red-500"
      />
    </div>
  )
}`,
    features: [
      "Candlestick and OHLC charts",
      "Volume bars with color coding",
      "Technical indicators (SMA, EMA, Bollinger)",
      "Real-time data streaming",
      "Zoom and pan with time axis",
      "Waterfall charts for P&L analysis",
      "Under 15kb for all financial charts",
    ],
    chartType: "candlestick",
    framework: "react",
    docsLink: "/docs/charts/candlestick",
  },
  "open-source-charts": {
    title: "Open Source Chart Library | MIT License",
    h1: "Open Source Charts",
    description:
      "MIT-licensed chart library. 65+ chart types, free for commercial use. No per-seat pricing. No revenue caps. Open source forever.",
    intro:
      "Chart.ts is MIT licensed with no strings attached. Use it commercially, modify it, redistribute it. No per-seat pricing, no revenue caps, no enterprise license tiers. 65+ chart types, completely free, forever.",
    installCmd: "npm install @chartts/core",
    codeExample: `// MIT License - use however you want
// Commercial apps? Yes.
// Modify the source? Yes.
// Redistribute? Yes.
// Per-seat pricing? Never.

import { bar, line, pie, candlestick, sankey } from "@chartts/core"

// 65+ chart types, all MIT licensed
// Compare: Highcharts requires $590/dev/year
// Compare: AmCharts starts at $490/year
// Compare: FusionCharts starts at $697/year
// Chart.ts: $0. Forever.`,
    features: [
      "MIT License, free for commercial use",
      "No per-seat or per-developer pricing",
      "No revenue caps or usage limits",
      "65+ chart types included free",
      "Source code on GitHub",
      "Active community and development",
      "No enterprise tier needed",
    ],
    chartType: "bar",
    docsLink: "/docs",
  },
  "free-chart-library": {
    title: "Free Chart Library | No Watermarks, No Limits",
    h1: "Free Chart Library",
    description:
      "Completely free chart library with 65+ chart types. No watermarks, no limits, no sign-up. MIT licensed. React, Vue, Svelte, Solid, Angular.",
    intro:
      "Chart.ts is 100% free with no catches. No watermarks on charts, no limits on data points, no sign-up required. MIT licensed for commercial use. 65+ chart types across React, Vue, Svelte, Solid, Angular, and vanilla JS.",
    installCmd: "npm install @chartts/core",
    codeExample: `// No watermark. No limits. No sign-up.
import { bar } from "@chartts/core"

const svg = bar({
  data: yourData,  // unlimited data points
  x: "category",
  y: "value",
  // Every feature included, nothing locked behind paywall
  // Export to SVG, PNG, whatever you want
  // Use commercially without attribution
})`,
    features: [
      "100% free, no hidden costs",
      "No watermarks on chart output",
      "No data point limits",
      "No sign-up or API key required",
      "MIT license for commercial use",
      "65+ chart types all included",
      "Export to SVG and PNG freely",
    ],
    chartType: "bar",
    docsLink: "/docs",
  },

  // ── Generic chart type landings (no framework prefix) ──

  "sankey-diagram": {
    title: "Sankey Diagram | JavaScript Sankey Chart",
    h1: "Sankey Diagram",
    description:
      "Create Sankey diagrams with JavaScript. Flow visualization with weighted links. SVG rendering, Tailwind CSS. Free and open source.",
    intro:
      "Build Sankey diagrams that visualize flows between nodes. Chart.ts automatically positions nodes, sizes links by weight, and renders everything as SVG. Perfect for energy flows, budget allocation, and user journey mapping.",
    installCmd: "npm install @chartts/core",
    codeExample: `import { sankey } from "@chartts/core"

const svg = sankey({
  nodes: ["Organic", "Paid", "Referral", "Homepage", "Pricing", "Signup"],
  links: [
    { source: "Organic", target: "Homepage", value: 5000 },
    { source: "Paid", target: "Homepage", value: 3000 },
    { source: "Referral", target: "Homepage", value: 1200 },
    { source: "Homepage", target: "Pricing", value: 4500 },
    { source: "Homepage", target: "Signup", value: 2200 },
    { source: "Pricing", target: "Signup", value: 3100 },
  ],
})`,
    features: [
      "Automatic node positioning",
      "Weighted links with proportional width",
      "Color coding by source or category",
      "Multi-level flow visualization",
      "Node labels and value display",
      "Tailwind CSS on nodes and links",
      "SVG export for documents and presentations",
    ],
    chartType: "sankey",
    docsLink: "/docs/charts/sankey",
  },
  "treemap-chart": {
    title: "Treemap Chart | JavaScript Treemap",
    h1: "Treemap Chart",
    description:
      "Create treemaps with JavaScript. Hierarchical data as nested rectangles. SVG rendering, color coding, labels. Free and open source.",
    intro:
      "Visualize hierarchical data as nested rectangles with Chart.ts treemaps. Automatic squarified layout, color coding by category or value, drill-down navigation, and SVG rendering. Works with any JavaScript framework.",
    installCmd: "npm install @chartts/core",
    codeExample: `import { treemap } from "@chartts/core"

const svg = treemap({
  data: [
    { name: "Technology", value: 45, children: [
      { name: "Apple", value: 22 },
      { name: "Microsoft", value: 18 },
      { name: "Google", value: 5 },
    ]},
    { name: "Finance", value: 30, children: [
      { name: "JPMorgan", value: 15 },
      { name: "Goldman", value: 15 },
    ]},
    { name: "Healthcare", value: 25 },
  ],
  label: "name",
  value: "value",
})`,
    features: [
      "Squarified layout algorithm",
      "Hierarchical nesting with drill-down",
      "Color coding by category or value",
      "Labels with automatic size fitting",
      "Tooltip with custom content",
      "SVG rendering at any resolution",
      "Tailwind CSS on cells and labels",
    ],
    chartType: "treemap",
    docsLink: "/docs/charts/treemap",
  },
  "radar-chart": {
    title: "Radar Chart | Spider Chart | JavaScript",
    h1: "Radar Chart",
    description:
      "Create radar charts and spider charts with JavaScript. Multi-axis comparison, SVG rendering, Tailwind CSS. Free and open source.",
    intro:
      "Compare multiple variables on a single chart with radar plots. Chart.ts renders polygons on configurable axes with multi-series overlay, custom grid levels, and SVG output. Also known as spider charts or web charts.",
    installCmd: "npm install @chartts/core",
    codeExample: `import { radar } from "@chartts/core"

const svg = radar({
  data: [
    { axis: "Attack", teamA: 85, teamB: 72 },
    { axis: "Defense", teamA: 70, teamB: 88 },
    { axis: "Speed", teamA: 90, teamB: 65 },
    { axis: "Stamina", teamA: 75, teamB: 82 },
    { axis: "Technique", teamA: 82, teamB: 78 },
  ],
  label: "axis",
  series: ["teamA", "teamB"],
})`,
    features: [
      "Multi-axis comparison",
      "Multiple series overlay",
      "Configurable grid levels and scales",
      "Polygon fills with opacity",
      "Axis labels and value markers",
      "SVG rendering with Tailwind CSS",
      "Under 3kb tree-shaken",
    ],
    chartType: "radar",
    docsLink: "/docs/charts/radar",
  },
  "heatmap-chart": {
    title: "Heatmap Chart | JavaScript Heatmap",
    h1: "Heatmap Chart",
    description:
      "Create heatmaps with JavaScript. Matrix data visualization, color scales, tooltips. SVG rendering. Free and open source.",
    intro:
      "Visualize matrix data with color-coded cells. Chart.ts heatmaps support custom color scales, cell labels, tooltips, and automatic axis generation. Perfect for activity matrices, correlation tables, and time-based analysis.",
    installCmd: "npm install @chartts/core",
    codeExample: `import { heatmap } from "@chartts/core"

const svg = heatmap({
  data: [
    { day: "Mon", hour: "9am", commits: 5 },
    { day: "Mon", hour: "10am", commits: 12 },
    { day: "Mon", hour: "11am", commits: 8 },
    { day: "Tue", hour: "9am", commits: 3 },
    { day: "Tue", hour: "10am", commits: 18 },
    { day: "Tue", hour: "11am", commits: 22 },
  ],
  x: "hour",
  y: "day",
  value: "commits",
  colorScale: ["#f0fdf4", "#16a34a"],
})`,
    features: [
      "Custom color scale mapping",
      "Sequential, diverging, and categorical palettes",
      "Cell labels and tooltips",
      "Automatic axis generation from data",
      "SVG rendering for crisp display",
      "Tailwind CSS on cells and axes",
      "Under 3kb tree-shaken",
    ],
    chartType: "heatmap",
    docsLink: "/docs/charts/heatmap",
  },
  "gauge-chart": {
    title: "Gauge Chart | JavaScript Gauge",
    h1: "Gauge Chart",
    description:
      "Create gauge charts with JavaScript. KPI display, threshold zones, animated needle. SVG rendering. Free and open source.",
    intro:
      "Display single metrics with threshold context using gauge charts. Semicircle and full-circle layouts, color-coded zones, animated needles, and configurable ranges. Perfect for dashboards, health metrics, and KPI displays.",
    installCmd: "npm install @chartts/core",
    codeExample: `import { gauge } from "@chartts/core"

const svg = gauge({
  value: 78,
  min: 0,
  max: 100,
  zones: [
    { max: 30, color: "#ef4444" },
    { max: 60, color: "#f59e0b" },
    { max: 100, color: "#22c55e" },
  ],
  label: "CPU Usage",
  suffix: "%",
})`,
    features: [
      "Semicircle and full-circle layouts",
      "Color zones for threshold indicators",
      "Animated needle transitions",
      "Custom min/max ranges and suffixes",
      "Center value display",
      "SVG rendering for any resolution",
      "Under 3kb tree-shaken",
    ],
    chartType: "gauge",
    docsLink: "/docs/charts/gauge",
  },
  "funnel-chart": {
    title: "Funnel Chart | JavaScript Funnel",
    h1: "Funnel Chart",
    description:
      "Create funnel charts with JavaScript. Conversion flows, stage percentages, drop-off rates. SVG rendering. Free and open source.",
    intro:
      "Visualize conversion funnels and pipelines with Chart.ts. Automatic width proportional to values, stage labels with percentages, drop-off rate indicators, and SVG rendering. Works with any JavaScript framework.",
    installCmd: "npm install @chartts/core",
    codeExample: `import { funnel } from "@chartts/core"

const svg = funnel({
  data: [
    { stage: "Visitors", count: 10000 },
    { stage: "Leads", count: 4200 },
    { stage: "Qualified", count: 1800 },
    { stage: "Proposals", count: 720 },
    { stage: "Closed", count: 340 },
  ],
  label: "stage",
  value: "count",
  showPercentages: true,
})`,
    features: [
      "Width proportional to values",
      "Stage labels with conversion percentages",
      "Drop-off rate between stages",
      "Horizontal and vertical orientations",
      "Gradient fills",
      "SVG rendering with Tailwind CSS",
      "Under 3kb tree-shaken",
    ],
    chartType: "funnel",
    docsLink: "/docs/charts/funnel",
  },
  "bubble-chart": {
    title: "Bubble Chart | JavaScript Bubble Chart",
    h1: "Bubble Chart",
    description:
      "Create bubble charts with JavaScript. Three-dimensional scatter plots with size mapping. SVG rendering, Tailwind CSS. Free and open source.",
    intro:
      "Map three dimensions of data to x, y, and bubble size. Color coding by category, tooltips with custom content, and SVG rendering at any resolution. Perfect for market analysis, portfolio visualization, and scientific data.",
    installCmd: "npm install @chartts/core",
    codeExample: `import { bubble } from "@chartts/core"

const svg = bubble({
  data: [
    { country: "US", gdp: 25.5, population: 331, area: 9.8 },
    { country: "China", gdp: 18.3, population: 1412, area: 9.6 },
    { country: "Japan", gdp: 4.2, population: 125, area: 0.38 },
    { country: "Germany", gdp: 4.1, population: 83, area: 0.36 },
  ],
  x: "gdp",
  y: "population",
  size: "area",
  label: "country",
})`,
    features: [
      "Three-dimensional data mapping",
      "Color coding by category or value",
      "Tooltip with custom content",
      "Size scale with configurable range",
      "Collision detection for labels",
      "SVG rendering with Tailwind CSS",
      "Under 3kb tree-shaken",
    ],
    chartType: "bubble",
    docsLink: "/docs/charts/bubble",
  },
  "scatter-plot": {
    title: "Scatter Plot | JavaScript Scatter Chart",
    h1: "Scatter Plot",
    description:
      "Create scatter plots with JavaScript. Correlation analysis, trend lines, clusters. SVG rendering, Tailwind CSS. Free and open source.",
    intro:
      "Explore relationships between variables with scatter plots. Chart.ts renders dots as SVG elements with regression lines, cluster coloring, and Tailwind CSS styling. Perfect for data analysis and scientific visualization.",
    installCmd: "npm install @chartts/core",
    codeExample: `import { scatter } from "@chartts/core"

const svg = scatter({
  data: [
    { hours: 2, score: 65 },
    { hours: 4, score: 72 },
    { hours: 6, score: 80 },
    { hours: 8, score: 88 },
    { hours: 10, score: 92 },
    { hours: 12, score: 95 },
  ],
  x: "hours",
  y: "score",
  trendLine: "linear",
})`,
    features: [
      "Linear and polynomial regression lines",
      "Cluster coloring by category",
      "Tooltip with custom content",
      "Axis labels and grid lines",
      "SVG rendering for crisp display",
      "Tailwind CSS on dots, lines, axes",
      "Under 3kb tree-shaken",
    ],
    chartType: "scatter",
    docsLink: "/docs/charts/scatter",
  },
  "donut-chart": {
    title: "Donut Chart | JavaScript Donut Chart",
    h1: "Donut Chart",
    description:
      "Create donut charts with JavaScript. Center labels, legends, percentage display. SVG rendering, Tailwind CSS. Free and open source.",
    intro:
      "A pie chart with a hole in the middle. Chart.ts donut charts support center labels for KPI display, configurable inner radius, animated transitions, and Tailwind CSS styling on every slice.",
    installCmd: "npm install @chartts/core",
    codeExample: `import { donut } from "@chartts/core"

const svg = donut({
  data: [
    { source: "Organic", visits: 4500 },
    { source: "Paid", visits: 2800 },
    { source: "Social", visits: 1200 },
    { source: "Direct", visits: 900 },
    { source: "Referral", visits: 600 },
  ],
  label: "source",
  value: "visits",
  innerRadius: 0.6,
  centerLabel: "10,000",
  centerSubLabel: "Total Visits",
})`,
    features: [
      "Configurable inner radius",
      "Center label for KPI display",
      "Percentage labels on slices",
      "Legend with toggle interaction",
      "Pattern fills for accessibility",
      "SVG rendering with Tailwind CSS",
      "Under 3kb tree-shaken",
    ],
    chartType: "donut",
    docsLink: "/docs/charts/donut",
  },
  "stock-chart": {
    title: "Stock Chart | JavaScript Stock Chart Library",
    h1: "Stock Chart",
    description:
      "Create stock charts with JavaScript. Candlestick, OHLC, volume, technical indicators. Real-time streaming, SVG rendering. Free and open source.",
    intro:
      "Build professional stock charts for trading platforms and portfolio trackers. Candlestick, OHLC, volume, and area charts with technical indicators, real-time streaming, and zoom/pan navigation. Free and open source alternative to TradingView.",
    installCmd: "npm install @chartts/core",
    codeExample: `import { candlestick } from "@chartts/core"

const svg = candlestick({
  data: stockData,
  x: "date",
  open: "open",
  high: "high",
  low: "low",
  close: "close",
  volume: "volume",
  overlays: [
    { type: "sma", period: 20 },
    { type: "bollinger", period: 20, stdDev: 2 },
  ],
})`,
    features: [
      "Candlestick and OHLC chart types",
      "Volume bars with up/down coloring",
      "Technical indicators (SMA, EMA, Bollinger, MACD)",
      "Real-time data streaming",
      "Zoom and pan with time axis",
      "Multi-timeframe support",
      "Free and open source (MIT)",
    ],
    chartType: "candlestick",
    docsLink: "/docs/charts/candlestick",
  },
  "area-chart": {
    title: "Area Chart | JavaScript Area Chart",
    h1: "Area Chart",
    description:
      "Create area charts with JavaScript. Gradient fills, stacked areas, smooth curves. SVG rendering, Tailwind CSS. Free and open source.",
    intro:
      "Area charts show quantitative data over time with filled regions. Chart.ts renders gradient fills, stacked series, smooth curves, and SVG output. Style every area, line, and axis with Tailwind CSS.",
    installCmd: "npm install @chartts/core",
    codeExample: `import { area } from "@chartts/core"

const svg = area({
  data: [
    { month: "Jan", organic: 1200, paid: 800, social: 400 },
    { month: "Feb", organic: 1500, paid: 900, social: 500 },
    { month: "Mar", organic: 1800, paid: 1100, social: 650 },
    { month: "Apr", organic: 2200, paid: 1300, social: 800 },
  ],
  x: "month",
  y: ["organic", "paid", "social"],
  stacked: true,
  smooth: true,
})`,
    features: [
      "Gradient fills with configurable opacity",
      "Stacked and overlapping modes",
      "Smooth curves with tension control",
      "Multi-series with automatic legends",
      "SVG rendering at any resolution",
      "Tailwind CSS on areas, lines, axes",
      "Under 3kb tree-shaken",
    ],
    chartType: "area",
    docsLink: "/docs/charts/area",
  },
  "histogram-chart": {
    title: "Histogram Chart | JavaScript Histogram",
    h1: "Histogram Chart",
    description:
      "Create histograms with JavaScript. Frequency distribution, bin calculation, normal curve overlay. SVG rendering. Free and open source.",
    intro:
      "Visualize data distributions with histograms. Chart.ts automatically calculates bins, renders frequency bars, and optionally overlays a normal distribution curve. SVG rendering with Tailwind CSS styling.",
    installCmd: "npm install @chartts/core",
    codeExample: `import { histogram } from "@chartts/core"

const svg = histogram({
  data: responseTimesMs,  // array of numbers
  bins: 20,
  showNormalCurve: true,
  xLabel: "Response Time (ms)",
  yLabel: "Frequency",
})`,
    features: [
      "Automatic bin calculation",
      "Custom bin count or boundaries",
      "Normal distribution curve overlay",
      "Frequency and density modes",
      "Axis labels and grid lines",
      "SVG rendering with Tailwind CSS",
      "Under 3kb tree-shaken",
    ],
    chartType: "histogram",
    docsLink: "/docs/charts/histogram",
  },
  "boxplot-chart": {
    title: "Box Plot | JavaScript Box and Whisker Chart",
    h1: "Box Plot",
    description:
      "Create box plots with JavaScript. Statistical distributions, quartiles, outliers. SVG rendering, Tailwind CSS. Free and open source.",
    intro:
      "Display statistical distributions with box and whisker plots. Automatic quartile calculation, whiskers, outlier markers, and multiple series comparison. SVG rendering with Tailwind CSS styling on every element.",
    installCmd: "npm install @chartts/core",
    codeExample: `import { boxplot } from "@chartts/core"

const svg = boxplot({
  data: [
    { group: "Control", values: [12, 15, 18, 22, 25, 28, 35] },
    { group: "Treatment A", values: [18, 22, 28, 32, 38, 42, 48] },
    { group: "Treatment B", values: [25, 30, 35, 38, 42, 45, 52, 68] },
  ],
  label: "group",
  values: "values",
})`,
    features: [
      "Automatic quartile and IQR calculation",
      "Whiskers with configurable range",
      "Outlier markers",
      "Horizontal and vertical orientations",
      "Multiple group comparison",
      "SVG rendering with Tailwind CSS",
      "Under 3kb tree-shaken",
    ],
    chartType: "boxplot",
    docsLink: "/docs/charts/boxplot",
  },
  "dashboard-components": {
    title: "Dashboard Components | Chart & KPI Components",
    h1: "Dashboard Components",
    description:
      "Pre-built dashboard chart components. KPI cards, trend lines, sparklines, gauges. Tailwind CSS styled. React, Vue, Svelte, Solid, Angular.",
    intro:
      "Ship dashboards faster with Chart.ts components. KPI cards with sparklines, trend charts, comparison bars, gauge meters, and heatmaps. All styled with Tailwind CSS, accessible, and under 15kb total. Works with React, Vue, Svelte, Solid, and Angular.",
    installCmd: "npm install @chartts/react",
    codeExample: `import {
  LineChart, BarChart, Sparkline,
  GaugeChart, HeatmapChart
} from "@chartts/react"

// Compose dashboard layouts with chart components
<div className="grid grid-cols-12 gap-4">
  <div className="col-span-8">
    <LineChart data={revenue} x="month" y="amount" className="h-64" />
  </div>
  <div className="col-span-4">
    <GaugeChart value={92} max={100} label="Uptime" />
  </div>
  <div className="col-span-6">
    <BarChart data={sales} x="region" y="total" />
  </div>
  <div className="col-span-6">
    <HeatmapChart data={activity} x="hour" y="day" value="count" />
  </div>
</div>`,
    features: [
      "Complete dashboard toolkit in one library",
      "KPI cards, sparklines, gauges, trends",
      "Consistent styling with Tailwind CSS",
      "Responsive grid-ready components",
      "Server-side rendering for instant load",
      "Dark mode with one class toggle",
      "Under 15kb for everything",
    ],
    chartType: "line",
    docsLink: "/examples",
  },
  "webgl-charts": {
    title: "WebGL Charts | GPU-Accelerated JavaScript Charts",
    h1: "WebGL Charts",
    description:
      "GPU-accelerated WebGL charts for JavaScript. Render 100k+ data points at 60fps. 13 3D chart types including Scatter3D, Surface3D, Globe3D. Under 15kb.",
    intro:
      "Chart.ts includes a WebGL rendering engine that auto-activates at 100k+ data points. The @chartts/gl package adds 13 dedicated 3D chart types. GPU-accelerated for millions of data points at interactive frame rates. Automatic fallback to SVG for smaller datasets.",
    installCmd: "npm install @chartts/gl",
    codeExample: `import { Scatter3D, SurfacePlot, Globe3D } from "@chartts/gl"

// WebGL auto-activates for large datasets
const chart = scatter({
  data: largeDataset, // 500k points
  x: "time",
  y: "value",
  renderer: "webgl", // or "auto" (default)
})

// 3D chart types with orbit controls
import { Scatter3D } from "@chartts/gl"

<Scatter3D
  data={measurements}
  x="temperature"
  y="pressure"
  z="yield"
  colorBy="catalyst"
  className="h-96"
  orbit        // drag to rotate
  picking      // click to select points
/>`,
    features: [
      "GPU-accelerated rendering for 100k+ data points at 60fps",
      "13 dedicated 3D chart types (Scatter3D, Surface3D, Bar3D, Globe3D, Map3D, and more)",
      "Auto-switching: SVG for small data, WebGL at 100k+ points",
      "Orbit controls with drag-to-rotate and scroll-to-zoom",
      "Picking and hit detection for interactive 3D selections",
      "Dual canvas system: WebGL data layer + HTML overlay for labels",
      "Works with React, Vue, Svelte, Solid, Angular",
    ],
    chartType: "scatter3d",
    docsLink: "/docs/charts/scatter3d",
  },
  "3d-charts-javascript": {
    title: "3D Charts for JavaScript | WebGL 3D Chart Library",
    h1: "3D Charts for JavaScript",
    description:
      "Create 3D charts in JavaScript with Chart.ts. Bar3D, Scatter3D, Surface3D, Globe3D, Map3D. WebGL rendering. React, Vue, Svelte, Solid, Angular.",
    intro:
      "Chart.ts brings 3D visualization to JavaScript with the @chartts/gl package. 13 WebGL-powered chart types including Scatter3D, Surface3D, Bar3D, Globe3D, Line3D, and Map3D. Interactive orbit controls, point picking, and smooth 60fps rendering. Works with every framework.",
    installCmd: "npm install @chartts/gl",
    codeExample: `import { Bar3D, Surface3D, Globe3D } from "@chartts/gl"

// 3D bar chart with orbit controls
<Bar3D
  data={quarterlyRevenue}
  x="region"
  y="revenue"
  z="quarter"
  className="h-96"
  orbit
  colorScale={["#06b6d4", "#8b5cf6"]}
/>

// 3D surface plot for continuous data
<Surface3D
  data={experimentResults}
  x="temperature"
  y="pressure"
  z="yield"
  className="h-96"
  wireframe
  colorScale="viridis"
/>

// Interactive globe
<Globe3D
  data={globalSales}
  lat="latitude"
  lng="longitude"
  value="revenue"
  className="h-96"
  autoRotate
/>`,
    features: [
      "13 WebGL 3D chart types: Bar3D, Scatter3D, Surface3D, Globe3D, Map3D, Line3D, Lines3D, Torus3D, and more",
      "Interactive orbit controls: rotate, zoom, pan",
      "Point picking and hover detection in 3D space",
      "Color scales: viridis, magma, plasma, custom gradients",
      "Wireframe and solid rendering modes",
      "Globe3D with auto-rotation and geographic data projection",
      "TypeScript types for all 3D chart options",
    ],
    chartType: "bar3d",
    docsLink: "/docs/charts/bar3d",
  },
  "real-time-charts": {
    title: "Real-Time Streaming Charts | JavaScript",
    h1: "Real-Time Charts",
    description:
      "Real-time streaming charts for JavaScript. WebSocket, SSE, HTTP polling. Rolling buffers, auto-reconnect, pause/resume. Under 15kb.",
    intro:
      "Chart.ts has first-class support for real-time streaming data. Connect to WebSocket, Server-Sent Events, or HTTP polling sources with createStreamingChart(). Rolling buffers keep memory bounded, auto-reconnect handles network failures, and pause/resume gives users control. Under 15kb.",
    installCmd: "npm install @chartts/websocket",
    codeExample: `import { LineChart } from "@chartts/react"
import { useWebSocket } from "@chartts/websocket"

export function LiveMetrics() {
  const { data, status, pause, resume } = useWebSocket(
    "wss://metrics.example.com/stream",
    {
      bufferSize: 500,     // keep last 500 points
      reconnect: true,     // auto-reconnect on disconnect
      reconnectInterval: 2000,
      transform: (msg) => JSON.parse(msg.data),
    }
  )

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <span className={status === "connected"
          ? "text-emerald-400" : "text-red-400"}>
          {status}
        </span>
        <button onClick={pause}>Pause</button>
        <button onClick={resume}>Resume</button>
      </div>
      <LineChart
        data={data}
        x="timestamp"
        y={["cpu", "memory", "network"]}
        className="h-64"
        animate
        transition={150}
      />
    </div>
  )
}`,
    features: [
      "WebSocket, Server-Sent Events, and HTTP polling support",
      "Rolling buffers with configurable size to bound memory",
      "Auto-reconnect with exponential backoff",
      "Pause/resume streaming control",
      "Smooth 60fps transitions between data updates",
      "Multi-source streaming from different endpoints",
      "Framework hooks: useWebSocket (React), useStreaming (Vue/Svelte/Solid)",
    ],
    chartType: "line",
    docsLink: "/docs/streaming",
  },
  "financial-chart-library": {
    title: "Financial Chart Library | JavaScript",
    h1: "Financial Chart Library",
    description:
      "Professional financial charts for JavaScript. Candlestick, OHLC, volume, kagi, renko. Technical indicators: SMA, EMA, RSI, MACD, Bollinger Bands. Under 15kb.",
    intro:
      "Chart.ts is a professional-grade financial charting library. Candlestick and OHLC charts, volume bars with direction coloring, kagi and renko reversal charts, and a full suite of technical indicators via @chartts/finance. Built for trading platforms, portfolio trackers, and financial dashboards.",
    installCmd: "npm install @chartts/react @chartts/finance",
    codeExample: `import { CandlestickChart } from "@chartts/react"
import { sma, ema, rsi, macd, bollingerBands } from "@chartts/finance"

const indicators = {
  sma20: sma(priceData, { period: 20, field: "close" }),
  ema50: ema(priceData, { period: 50, field: "close" }),
  bands: bollingerBands(priceData, { period: 20, stdDev: 2 }),
  rsiValues: rsi(priceData, { period: 14 }),
  macdLine: macd(priceData, { fast: 12, slow: 26, signal: 9 }),
}

<CandlestickChart
  data={priceData}
  x="date"
  open="open" high="high" low="low" close="close"
  volume="volume"
  overlays={[
    { data: indicators.sma20, className: "stroke-amber-400", label: "SMA 20" },
    { data: indicators.ema50, className: "stroke-blue-400", label: "EMA 50" },
    { data: indicators.bands.upper, className: "stroke-zinc-500/50" },
    { data: indicators.bands.lower, className: "stroke-zinc-500/50" },
  ]}
  className="h-96"
  upClassName="fill-emerald-500"
  downClassName="fill-red-500"
  crosshair
  zoomPan
/>`,
    features: [
      "Candlestick and OHLC price charts with volume",
      "Technical indicators: SMA, EMA, RSI, MACD, Bollinger Bands, Stochastic",
      "Kagi and renko reversal charts for trend analysis",
      "Volume bars with buy/sell direction coloring",
      "Crosshair with value labels for precise reading",
      "Zoom and pan for exploring price history",
      "Real-time WebSocket streaming for live market data",
    ],
    chartType: "candlestick",
    docsLink: "/docs/finance-pkg",
  },
  "network-graph-javascript": {
    title: "Network Graph for JavaScript | Node-Link Diagrams",
    h1: "Network Graph for JavaScript",
    description:
      "Interactive network graphs and node-link diagrams for JavaScript. Force-directed, hierarchical, and circular layouts. Custom node shapes. Under 15kb.",
    intro:
      "Chart.ts provides a full-featured graph chart type for network visualization. Force-directed, hierarchical, circular, and grid layouts. Custom node shapes and sizes, edge labels, directional arrows, and interactive drag-to-rearrange. Renders as SVG for CSS styling with Tailwind.",
    installCmd: "npm install @chartts/react",
    codeExample: `import { GraphChart } from "@chartts/react"

<GraphChart
  nodes={[
    { id: "api", label: "API Gateway", group: "infra" },
    { id: "auth", label: "Auth Service", group: "infra" },
    { id: "users", label: "Users DB", group: "data" },
    { id: "cache", label: "Redis Cache", group: "data" },
    { id: "web", label: "Web App", group: "frontend" },
    { id: "mobile", label: "Mobile App", group: "frontend" },
  ]}
  edges={[
    { source: "web", target: "api" },
    { source: "mobile", target: "api" },
    { source: "api", target: "auth" },
    { source: "api", target: "cache" },
    { source: "auth", target: "users" },
  ]}
  layout="force"
  className="h-96"
  nodeClassName={n => ({
    infra: "fill-cyan-400",
    data: "fill-emerald-400",
    frontend: "fill-violet-400",
  }[n.group])}
  edgeClassName="stroke-zinc-600"
  labels
  directed
  draggable
/>`,
    features: [
      "Force-directed layout with physics simulation",
      "Hierarchical layout for tree structures",
      "Circular and grid layout options",
      "Custom node shapes: circle, rect, diamond, hexagon",
      "Directional arrows on edges",
      "Edge labels and weighted edges",
      "Interactive drag-to-rearrange nodes",
    ],
    chartType: "graph",
    docsLink: "/docs/charts/graph",
  },
  "sankey-diagram-javascript": {
    title: "Sankey Diagram for JavaScript | Flow Visualization",
    h1: "Sankey Diagram for JavaScript",
    description:
      "Create sankey diagrams and flow charts in JavaScript with Chart.ts. SVG rendering, Tailwind CSS, React/Vue/Svelte/Solid/Angular. Under 15kb.",
    intro:
      "Chart.ts sankey diagrams visualize flow and transfer between stages. Material flows, energy distribution, budget allocation, user journey paths. SVG rendering means every link and node is a real DOM element you can style with Tailwind CSS.",
    installCmd: "npm install @chartts/react",
    codeExample: `import { SankeyChart } from "@chartts/react"

<SankeyChart
  nodes={[
    { id: "organic", label: "Organic Search" },
    { id: "paid", label: "Paid Ads" },
    { id: "social", label: "Social Media" },
    { id: "landing", label: "Landing Page" },
    { id: "signup", label: "Signup" },
    { id: "trial", label: "Free Trial" },
    { id: "paid_plan", label: "Paid Plan" },
    { id: "churn", label: "Churned" },
  ]}
  links={[
    { source: "organic", target: "landing", value: 5000 },
    { source: "paid", target: "landing", value: 3200 },
    { source: "social", target: "landing", value: 1800 },
    { source: "landing", target: "signup", value: 4200 },
    { source: "signup", target: "trial", value: 3800 },
    { source: "trial", target: "paid_plan", value: 1200 },
    { source: "trial", target: "churn", value: 2600 },
  ]}
  className="h-96"
  nodeClassName="fill-cyan-400"
  linkClassName="fill-cyan-400/20 stroke-cyan-400/40"
  showValues
/>`,
    features: [
      "SVG rendering with real DOM nodes and links",
      "Tailwind CSS on every node and link element",
      "Automatic layout calculation with minimal edge crossings",
      "Value labels on links with percentage display",
      "Horizontal and vertical orientations",
      "Custom node colors by group or category",
      "Interactive hover to highlight connected paths",
    ],
    chartType: "sankey",
    docsLink: "/docs/charts/sankey",
  },
  "enterprise-chart-library": {
    title: "Enterprise Chart Library | 65+ Types, WebGL, Plugins",
    h1: "Enterprise Chart Library",
    description:
      "Enterprise-grade chart library. 65+ chart types, WebGL/3D, financial indicators, real-time streaming, plugin system, WCAG AA, TypeScript. 25 npm packages. MIT licensed.",
    intro:
      "Chart.ts is a complete enterprise charting platform distributed across 25 npm packages. 65+ chart types from basic line and bar to 3D scatter plots and financial candlesticks. WebGL rendering, real-time streaming, a plugin system for custom chart types, WCAG AA accessibility, SSR support, and full TypeScript coverage. MIT licensed with no per-seat fees.",
    installCmd: "npm install @chartts/react",
    codeExample: `// 25 packages, use only what you need
import { LineChart, BarChart, CandlestickChart } from "@chartts/react"
import { Scatter3D, Globe3D } from "@chartts/gl"
import { sma, macd } from "@chartts/finance"
import { regression } from "@chartts/regression"
import { kde, percentile } from "@chartts/statistics"
import { useWebSocket } from "@chartts/websocket"
import { defineChartType } from "@chartts/core"

// Create custom chart types with the plugin system
const myChart = defineChartType({
  name: "custom-gauge",
  defaultOptions: { min: 0, max: 100 },
  render(ctx) {
    // Full SVG/Canvas rendering context
    ctx.arc(ctx.cx, ctx.cy, ctx.radius, startAngle, endAngle)
    ctx.fill(ctx.options.className)
  },
  hitTest(point, data) {
    // Custom interaction handling
    return findNearestDataPoint(point, data)
  },
})`,
    features: [
      "65+ chart types across 25 npm packages",
      "WebGL rendering for 100k+ data points (auto or manual)",
      "13 3D chart types via @chartts/gl (Scatter3D, Surface3D, Globe3D, and more)",
      "Financial indicators via @chartts/finance (SMA, EMA, RSI, MACD, Bollinger)",
      "Real-time streaming via @chartts/websocket (WebSocket, SSE, polling)",
      "Plugin system: defineChartType() for fully custom chart types",
      "WCAG AA accessible, SSR compatible, TypeScript strict mode",
    ],
    chartType: "line",
    docsLink: "/docs",
  },
  "chart-plugin-system": {
    title: "Chart Plugin System | Custom Chart Types",
    h1: "Chart Plugin System",
    description:
      "Build custom chart types with Chart.ts plugin system. defineChartType() API with render context, hit testing, and custom scales. Full rendering control.",
    intro:
      "Chart.ts has a first-class plugin system for creating entirely new chart types. Use defineChartType() to define custom rendering, hit testing, scales, and interactions. Your custom charts get the same Tailwind CSS support, accessibility features, and framework bindings as built-in types.",
    installCmd: "npm install @chartts/core",
    codeExample: `import { defineChartType, registerChart } from "@chartts/core"

// Define a custom radial progress chart
const radialProgress = defineChartType({
  name: "radial-progress",

  defaultOptions: {
    min: 0,
    max: 100,
    thickness: 12,
    rounded: true,
  },

  render(ctx, data, options) {
    const { width, height } = ctx.dimensions
    const cx = width / 2
    const cy = height / 2
    const radius = Math.min(cx, cy) - options.thickness

    // Background track
    ctx.arc(cx, cy, radius, 0, Math.PI * 2)
    ctx.stroke(options.trackClassName || "stroke-zinc-200 dark:stroke-zinc-800")

    // Progress arc
    const progress = (data.value - options.min) / (options.max - options.min)
    const endAngle = Math.PI * 2 * progress
    ctx.arc(cx, cy, radius, -Math.PI / 2, endAngle - Math.PI / 2)
    ctx.stroke(options.className || "stroke-cyan-400")

    // Center label
    ctx.text(cx, cy, \`\${Math.round(progress * 100)}%\`)
  },

  hitTest(point, data) {
    return { value: data.value, label: data.label }
  },
})

// Use it like any built-in chart
registerChart(radialProgress)`,
    features: [
      "defineChartType() API for full custom chart creation",
      "Render context with SVG and Canvas primitives",
      "Custom hit testing for hover and click interactions",
      "Custom scales and axis types",
      "Automatic framework bindings (React, Vue, Svelte, Solid, Angular)",
      "Inherits Tailwind CSS support, accessibility, and SSR",
      "Publish as npm packages with @chartts/cli scaffolding",
    ],
    chartType: "line",
    docsLink: "/docs/plugins",
  },
  "react-3d-charts": {
    title: "React 3D Charts | WebGL 3D Components",
    h1: "React 3D Charts",
    description:
      "3D charts for React. Scatter3D, Surface3D, Globe3D, Bar3D. WebGL rendering. Next.js SSR compatible. TypeScript. Under 15kb.",
    intro:
      "Add 3D charts to React apps with @chartts/gl. Scatter3D, Surface3D, Globe3D, Bar3D, Line3D, and more. WebGL rendering with orbit controls, point picking, and smooth 60fps performance. Compatible with Next.js Server Components for SSR fallback. Full TypeScript types.",
    installCmd: "npm install @chartts/gl",
    codeExample: `import { Scatter3D, Surface3D, Globe3D } from "@chartts/gl"

export function ResearchViz({ data }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="rounded-xl card p-6">
        <Scatter3D
          data={data.samples}
          x="x" y="y" z="z"
          colorBy="cluster"
          className="h-96"
          orbit
          picking
          onPointClick={(point) => console.log(point)}
        />
      </div>
      <div className="rounded-xl card p-6">
        <Surface3D
          data={data.surface}
          x="longitude" y="latitude" z="elevation"
          className="h-96"
          colorScale="viridis"
          wireframe={false}
          orbit
        />
      </div>
      <div className="col-span-2 rounded-xl card p-6">
        <Globe3D
          data={data.locations}
          lat="lat" lng="lng" value="revenue"
          className="h-96"
          autoRotate
          markerClassName="fill-cyan-400"
        />
      </div>
    </div>
  )
}`,
    features: [
      "React components for 13 WebGL 3D chart types",
      "Scatter3D, Surface3D, Globe3D, Bar3D, Line3D, Map3D, and more",
      "Orbit controls: drag to rotate, scroll to zoom, right-click to pan",
      "Point picking with onClick and onHover callbacks",
      "Next.js compatible with SSR fallback rendering",
      "TypeScript types for all 3D props and data shapes",
      "Tailwind className on container and overlay elements",
    ],
    chartType: "scatter3d",
    framework: "react",
    docsLink: "/docs/charts/scatter3d",
  },
  "react-real-time-charts": {
    title: "React Real-Time Charts | Streaming Components",
    h1: "React Real-Time Charts",
    description:
      "Real-time streaming charts for React. WebSocket, SSE, HTTP polling. Next.js compatible. Rolling buffers, auto-reconnect. Under 15kb.",
    intro:
      "Add real-time streaming charts to React apps with @chartts/websocket. The useWebSocket hook connects to any WebSocket, SSE, or HTTP polling endpoint and feeds live data to Chart.ts components. Rolling buffers keep memory bounded, auto-reconnect handles failures, and pause/resume gives users control.",
    installCmd: "npm install @chartts/react @chartts/websocket",
    codeExample: `import { LineChart, BarChart, GaugeChart } from "@chartts/react"
import { useWebSocket } from "@chartts/websocket"

export function LiveDashboard() {
  const { data, status, pause, resume, reconnect } = useWebSocket(
    "wss://api.example.com/metrics",
    {
      bufferSize: 200,
      reconnect: true,
      reconnectInterval: 3000,
      maxReconnectAttempts: 10,
      transform: (msg) => JSON.parse(msg.data),
    }
  )

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12 flex items-center gap-2">
        <span className={\`h-2 w-2 rounded-full \${
          status === "connected" ? "bg-emerald-400" : "bg-red-400"
        }\`} />
        <span className="text-xs muted-text">{status}</span>
        <button onClick={pause} className="text-xs">Pause</button>
        <button onClick={resume} className="text-xs">Resume</button>
      </div>
      <div className="col-span-8 rounded-xl card p-6">
        <LineChart
          data={data}
          x="timestamp"
          y={["cpu", "memory"]}
          className="h-64"
          animate
          transition={100}
        />
      </div>
      <div className="col-span-4 rounded-xl card p-6">
        <GaugeChart
          value={data[data.length - 1]?.cpu ?? 0}
          max={100}
          label="CPU Now"
          className="h-48"
        />
      </div>
    </div>
  )
}`,
    features: [
      "useWebSocket React hook for WebSocket connections",
      "Server-Sent Events and HTTP polling adapters",
      "Rolling buffers with configurable size (bound memory usage)",
      "Auto-reconnect with exponential backoff and max attempts",
      "Pause/resume streaming with user controls",
      "Next.js compatible (client component with SSR fallback)",
      "Smooth 60fps transitions between data updates",
    ],
    chartType: "line",
    framework: "react",
    docsLink: "/docs/streaming",
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
