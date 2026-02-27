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
      "Make beautiful charts and graphs in seconds. Choose from 40+ chart types, paste your data, and get a publication-ready SVG. No sign-up, no watermark, no limits. Powered by Chart.ts, the open source charting library.",
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
      "40+ chart types",
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
      "40+ chart types AI can generate",
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
      "Modern data visualization library for JavaScript and TypeScript. 40+ chart types, SVG rendering, Tailwind CSS, accessibility. Under 15kb gzipped.",
    intro:
      "Chart.ts is a modern data visualization library built for the way developers work today. 40+ chart types, SVG rendering, Tailwind CSS integration, full accessibility, and TypeScript-first design. Under 15kb for the entire library.",
    installCmd: "npm install @chartts/core",
    codeExample: `import { line, bar, pie, scatter, heatmap } from "@chartts/core"

// 40+ chart types, all SVG
// All styled with Tailwind CSS
// All accessible by default
// All under 15kb total

const lineChart = line({ data, x: "date", y: "value" })
const barChart = bar({ data, x: "category", y: "count" })
const pieChart = pie({ data, label: "name", value: "share" })`,
    features: [
      "40+ chart types (line, bar, pie, scatter, heatmap, and more)",
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
