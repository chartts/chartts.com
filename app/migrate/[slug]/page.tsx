import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Migration = {
  name: string;
  fullName: string;
  description: string;
  uninstall: string;
  install: string;
  steps: string[];
  before: { label: string; code: string }[];
  after: { label: string; code: string }[];
  differences: { feature: string; theirs: string; ours: string }[];
};

const migrations: Record<string, Migration> = {
  "from-chartjs": {
    name: "Chart.js",
    fullName: "Chart.js",
    description:
      "Migrate from Chart.js Canvas rendering to Chart.ts SVG rendering. Drop 45kb from your bundle, get Tailwind CSS support, and make your charts accessible.",
    uninstall: "npm uninstall chart.js react-chartjs-2",
    install: "npm install @chartts/react",
    steps: [
      "Replace chart.js and react-chartjs-2 imports with @chartts/react",
      "Convert configuration objects to JSX props",
      "Replace inline styles with Tailwind CSS classes",
      "Remove Canvas element refs (SVG renders directly)",
      "Remove Chart.register() calls (tree-shaking is automatic)",
      "Update event handlers from Chart.js callbacks to React event props",
    ],
    before: [
      {
        label: "Chart.js Line Chart",
        code: `import { Line } from "react-chartjs-2"
import { Chart, registerables } from "chart.js"
Chart.register(...registerables)

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr"],
  datasets: [{
    label: "Revenue",
    data: [4200, 5800, 7100, 9200],
    borderColor: "rgb(6, 182, 212)",
    backgroundColor: "rgba(6, 182, 212, 0.1)",
    tension: 0.4,
  }],
}

<Line data={data} options={{ responsive: true }} />`,
      },
    ],
    after: [
      {
        label: "Chart.ts Line Chart",
        code: `import { LineChart } from "@chartts/react"

const data = [
  { month: "Jan", revenue: 4200 },
  { month: "Feb", revenue: 5800 },
  { month: "Mar", revenue: 7100 },
  { month: "Apr", revenue: 9200 },
]

<LineChart
  data={data}
  x="month"
  y="revenue"
  className="h-64"
  lineClassName="stroke-cyan-400"
  areaClassName="fill-cyan-400/10"
/>`,
      },
    ],
    differences: [
      { feature: "Rendering", theirs: "Canvas (bitmap)", ours: "SVG (DOM elements)" },
      { feature: "Styling", theirs: "JavaScript config objects", ours: "Tailwind CSS classes" },
      { feature: "Bundle", theirs: "~60kb min+gzip", ours: "<15kb min+gzip" },
      { feature: "SSR", theirs: "Requires node-canvas", ours: "Works natively" },
      { feature: "Accessibility", theirs: "Manual (Canvas has none)", ours: "WCAG AA built-in" },
      { feature: "Dark mode", theirs: "Runtime color switching", ours: "dark: CSS variants" },
      { feature: "Data format", theirs: "labels[] + datasets[]", ours: "Array of objects" },
    ],
  },
  "from-recharts": {
    name: "Recharts",
    fullName: "Recharts",
    description:
      "Migrate from Recharts to Chart.ts. Drop the D3 dependency chain, add Vue/Svelte/Solid support, and get Server Component compatibility.",
    uninstall: "npm uninstall recharts",
    install: "npm install @chartts/react",
    steps: [
      "Replace recharts imports with @chartts/react",
      "Convert nested component API to flat prop API",
      "Replace inline styles with Tailwind CSS classes",
      "Remove wrapper components (ResponsiveContainer, etc.)",
      "Move from client components to server components where possible",
      "Update tooltip and legend configuration to props",
    ],
    before: [
      {
        label: "Recharts Bar Chart",
        code: `import {
  BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts"

<ResponsiveContainer width="100%" height={300}>
  <BarChart data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Bar dataKey="value" fill="#06b6d4" />
  </BarChart>
</ResponsiveContainer>`,
      },
    ],
    after: [
      {
        label: "Chart.ts Bar Chart",
        code: `import { BarChart } from "@chartts/react"

<BarChart
  data={data}
  x="name"
  y="value"
  className="h-72"
  barClassName="fill-cyan-500"
  gridClassName="stroke-zinc-200 dark:stroke-zinc-800"
/>`,
      },
    ],
    differences: [
      { feature: "API style", theirs: "Nested JSX components", ours: "Flat props on single component" },
      { feature: "Dependencies", theirs: "D3 (d3-scale, d3-shape, etc.)", ours: "Zero dependencies" },
      { feature: "Bundle", theirs: "~45kb min+gzip", ours: "<15kb min+gzip" },
      { feature: "Frameworks", theirs: "React only", ours: "React, Vue, Svelte, Solid, Angular" },
      { feature: "RSC support", theirs: "Client components only", ours: "Server Components work" },
      { feature: "Styling", theirs: "Inline styles + config", ours: "Tailwind CSS classes" },
      { feature: "Responsiveness", theirs: "ResponsiveContainer wrapper", ours: "CSS class (h-64, w-full)" },
    ],
  },
  "from-d3": {
    name: "D3",
    fullName: "D3.js",
    description:
      "Replace D3 chart code with Chart.ts pre-built components. Keep the power, lose the boilerplate. Go from 100 lines to 10 for common charts.",
    uninstall: "npm uninstall d3 @types/d3",
    install: "npm install @chartts/core",
    steps: [
      "Identify which D3 chart types you use",
      "Replace D3 scale/axis/shape code with Chart.ts components",
      "Remove manual SVG element creation and data binding",
      "Replace D3 transitions with Chart.ts built-in animations",
      "Move data transformation from D3 utilities to plain JavaScript",
      "For custom visualizations, consider using Chart.ts as a starting point and extending",
    ],
    before: [
      {
        label: "D3 Bar Chart (~60 lines)",
        code: `import * as d3 from "d3"

const svg = d3.select("#chart")
  .append("svg")
  .attr("width", 600)
  .attr("height", 300)

const x = d3.scaleBand()
  .domain(data.map(d => d.name))
  .range([0, 600])
  .padding(0.1)

const y = d3.scaleLinear()
  .domain([0, d3.max(data, d => d.value)])
  .range([300, 0])

svg.selectAll("rect")
  .data(data)
  .join("rect")
  .attr("x", d => x(d.name))
  .attr("y", d => y(d.value))
  .attr("width", x.bandwidth())
  .attr("height", d => 300 - y(d.value))
  .attr("fill", "#06b6d4")
// ...plus axes, labels, grid, etc.`,
      },
    ],
    after: [
      {
        label: "Chart.ts Bar Chart (5 lines)",
        code: `import { bar } from "@chartts/core"

const svg = bar({
  data,
  x: "name",
  y: "value",
  width: 600,
  height: 300,
})`,
      },
    ],
    differences: [
      { feature: "Approach", theirs: "Build from primitives", ours: "Pre-built chart types" },
      { feature: "Lines of code", theirs: "50-200 per chart", ours: "5-15 per chart" },
      { feature: "Learning curve", theirs: "Months to proficiency", ours: "Minutes to first chart" },
      { feature: "Customization", theirs: "Unlimited (you own every pixel)", ours: "Extensive props + CSS overrides" },
      { feature: "SSR", theirs: "Requires jsdom", ours: "Native string output" },
      { feature: "Bundle", theirs: "~30kb core + modules", ours: "<15kb entire library" },
      { feature: "TypeScript", theirs: "@types/d3 packages", ours: "Built-in strict types" },
    ],
  },
  "from-echarts": {
    name: "ECharts",
    fullName: "Apache ECharts",
    description:
      "Replace 300kb+ ECharts bundle with Chart.ts at under 15kb. Get Tailwind CSS support and a simpler API while keeping all the chart types you need.",
    uninstall: "npm uninstall echarts echarts-for-react",
    install: "npm install @chartts/react",
    steps: [
      "Replace echarts imports with @chartts/react",
      "Convert ECharts option objects to JSX props",
      "Replace ECharts theme system with Tailwind CSS classes",
      "Remove echarts.init() and dispose() lifecycle management",
      "Convert ECharts event handlers to React event props",
      "Replace ECharts tooltip formatters with Chart.ts tooltip props",
    ],
    before: [
      {
        label: "ECharts Line Chart",
        code: `import ReactECharts from "echarts-for-react"

const option = {
  xAxis: {
    type: "category",
    data: ["Jan", "Feb", "Mar", "Apr"],
  },
  yAxis: { type: "value" },
  series: [{
    data: [4200, 5800, 7100, 9200],
    type: "line",
    smooth: true,
    areaStyle: {
      color: "rgba(6, 182, 212, 0.1)",
    },
    lineStyle: {
      color: "#06b6d4",
    },
  }],
  tooltip: { trigger: "axis" },
}

<ReactECharts option={option} style={{ height: 300 }} />`,
      },
    ],
    after: [
      {
        label: "Chart.ts Line Chart",
        code: `import { LineChart } from "@chartts/react"

<LineChart
  data={[
    { month: "Jan", revenue: 4200 },
    { month: "Feb", revenue: 5800 },
    { month: "Mar", revenue: 7100 },
    { month: "Apr", revenue: 9200 },
  ]}
  x="month"
  y="revenue"
  smooth
  className="h-72"
  lineClassName="stroke-cyan-400"
  areaClassName="fill-cyan-400/10"
/>`,
      },
    ],
    differences: [
      { feature: "Bundle", theirs: "~300kb+ min+gzip", ours: "<15kb min+gzip" },
      { feature: "API", theirs: "Nested option objects", ours: "Flat JSX props" },
      { feature: "Styling", theirs: "Theme config objects", ours: "Tailwind CSS classes" },
      { feature: "Data format", theirs: "Separate x data + series data", ours: "Array of objects" },
      { feature: "Lifecycle", theirs: "init(), dispose(), resize()", ours: "Automatic (React manages)" },
      { feature: "Tree-shaking", theirs: "Partial (still huge)", ours: "Full, ~2-4kb per chart" },
      { feature: "Dark mode", theirs: "Theme config switching", ours: "dark: CSS variants" },
    ],
  },
  "from-highcharts": {
    name: "Highcharts",
    fullName: "Highcharts",
    description:
      "Switch from $590/dev/yr Highcharts to MIT-licensed Chart.ts. Same chart types, better Tailwind integration, zero licensing cost. Free forever.",
    uninstall: "npm uninstall highcharts highcharts-react-official",
    install: "npm install @chartts/react",
    steps: [
      "Replace highcharts imports with @chartts/react",
      "Convert Highcharts config objects to JSX props",
      "Replace Highcharts theming with Tailwind CSS classes",
      "Remove Highcharts.chart() imperative calls",
      "Remove license key configuration",
      "Update data format from Highcharts series to flat objects",
    ],
    before: [
      {
        label: "Highcharts Bar Chart",
        code: `import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"

const options = {
  chart: { type: "column" },
  title: { text: "Sales" },
  xAxis: {
    categories: ["Q1", "Q2", "Q3", "Q4"],
  },
  series: [{
    name: "Revenue",
    data: [42000, 58000, 71000, 93000],
    color: "#06b6d4",
  }],
  credits: { enabled: false },
}

<HighchartsReact
  highcharts={Highcharts}
  options={options}
/>`,
      },
    ],
    after: [
      {
        label: "Chart.ts Bar Chart",
        code: `import { BarChart } from "@chartts/react"

<BarChart
  data={[
    { quarter: "Q1", revenue: 42000 },
    { quarter: "Q2", revenue: 58000 },
    { quarter: "Q3", revenue: 71000 },
    { quarter: "Q4", revenue: 93000 },
  ]}
  x="quarter"
  y="revenue"
  className="h-72"
  barClassName="fill-cyan-500"
/>`,
      },
    ],
    differences: [
      { feature: "License", theirs: "$590/developer/year", ours: "MIT (free forever)" },
      { feature: "Bundle", theirs: "~80kb min+gzip", ours: "<15kb min+gzip" },
      { feature: "API", theirs: "Imperative config objects", ours: "Declarative JSX props" },
      { feature: "Styling", theirs: "Highcharts theme system", ours: "Tailwind CSS classes" },
      { feature: "Accessibility", theirs: "Enterprise tier only", ours: "Built-in, WCAG AA" },
      { feature: "Frameworks", theirs: "Wrappers for React/Vue/Angular", ours: "Native packages for all" },
      { feature: "Dark mode", theirs: "Theme switching at runtime", ours: "dark: CSS variants" },
    ],
  },
  "from-apexcharts": {
    name: "ApexCharts",
    fullName: "ApexCharts",
    description:
      "Replace the 130kb ApexCharts monolith with Chart.ts at under 15kb. Get tree-shaking, Tailwind CSS, and Server Component support.",
    uninstall: "npm uninstall apexcharts react-apexcharts",
    install: "npm install @chartts/react",
    steps: [
      "Replace apexcharts imports with @chartts/react",
      "Convert ApexCharts options to JSX props",
      "Replace ApexCharts theme/color config with Tailwind CSS classes",
      "Remove ApexCharts.exec() imperative calls",
      "Move from ApexCharts responsive breakpoints to Tailwind responsive classes",
      "Replace ApexCharts formatters with Chart.ts format props",
    ],
    before: [
      {
        label: "ApexCharts Area Chart",
        code: `import ReactApexChart from "react-apexcharts"

const options = {
  chart: { type: "area", toolbar: { show: false } },
  xaxis: {
    categories: ["Jan", "Feb", "Mar", "Apr"],
  },
  stroke: { curve: "smooth" },
  fill: {
    type: "gradient",
    gradient: { opacityFrom: 0.4, opacityTo: 0 },
  },
  colors: ["#06b6d4"],
}
const series = [{ name: "Revenue", data: [4200, 5800, 7100, 9200] }]

<ReactApexChart
  options={options}
  series={series}
  type="area"
  height={300}
/>`,
      },
    ],
    after: [
      {
        label: "Chart.ts Area Chart",
        code: `import { AreaChart } from "@chartts/react"

<AreaChart
  data={[
    { month: "Jan", revenue: 4200 },
    { month: "Feb", revenue: 5800 },
    { month: "Mar", revenue: 7100 },
    { month: "Apr", revenue: 9200 },
  ]}
  x="month"
  y="revenue"
  smooth
  className="h-72"
  lineClassName="stroke-cyan-400"
  areaClassName="fill-cyan-400/10"
/>`,
      },
    ],
    differences: [
      { feature: "Bundle", theirs: "~130kb min+gzip", ours: "<15kb min+gzip" },
      { feature: "Tree-shaking", theirs: "Not supported (monolithic)", ours: "Full, ~2-4kb per chart" },
      { feature: "API", theirs: "Imperative options + series", ours: "Declarative JSX props" },
      { feature: "Styling", theirs: "Config objects + colors array", ours: "Tailwind CSS classes" },
      { feature: "SSR", theirs: "Limited (DOM-dependent)", ours: "Native SVG string output" },
      { feature: "Frameworks", theirs: "Wrappers for React/Vue/Angular", ours: "Native packages for all" },
      { feature: "Dark mode", theirs: "Runtime theme switching", ours: "dark: CSS variants" },
    ],
  },
};

const slugs = Object.keys(migrations);

export function generateStaticParams() {
  return slugs.map((slug) => ({ slug }));
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const m = migrations[slug];
  if (!m) return {};
  return {
    title: `Migrate from ${m.fullName} to Chart.ts`,
    description: m.description,
  };
}

export default async function MigratePage({ params }: PageProps) {
  const { slug } = await params;
  const m = migrations[slug];
  if (!m) notFound();

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://chartts.com" },
      { "@type": "ListItem", position: 2, name: "Migrate", item: "https://chartts.com/migrate" },
      { "@type": "ListItem", position: 3, name: `From ${m.fullName}`, item: `https://chartts.com/migrate/${slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <section className="pt-24 sm:pt-32 pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/migrate"
            className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
          >
            &larr; All migration guides
          </Link>

          <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold tracking-tight heading">
            Migrate from {m.fullName}
          </h1>
          <p className="mt-4 text-lg body-text max-w-2xl">{m.description}</p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl card">
              <span className="text-red-400 font-mono text-sm">-</span>
              <code className="font-mono text-sm body-text">{m.uninstall}</code>
            </div>
            <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl card">
              <span className="text-emerald-400 font-mono text-sm">+</span>
              <code className="font-mono text-sm body-text">{m.install}</code>
            </div>
          </div>
        </div>
      </section>

      {/* Migration steps */}
      <section className="pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold heading mb-6">Migration Steps</h2>
          <ol className="space-y-3">
            {m.steps.map((step, i) => (
              <li key={i} className="flex items-start gap-3 p-4 rounded-xl card">
                <span className="w-7 h-7 shrink-0 rounded-full bg-cyan-500/10 text-cyan-400 flex items-center justify-center text-sm font-bold">
                  {i + 1}
                </span>
                <span className="text-sm body-text pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Side-by-side code comparison */}
      <section className="pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold heading mb-6">Code Comparison</h2>
          <div className="grid lg:grid-cols-2 gap-4">
            {/* Before */}
            <div>
              {m.before.map((b) => (
                <div key={b.label} className="rounded-xl card overflow-hidden">
                  <div className="flex items-center gap-2 px-4 py-3 border-b adaptive-border">
                    <span className="text-xs font-mono text-red-400">BEFORE</span>
                    <span className="text-xs muted-text font-mono">{b.label}</span>
                  </div>
                  <pre className="p-4 overflow-x-auto text-sm">
                    <code className="font-mono body-text">{b.code}</code>
                  </pre>
                </div>
              ))}
            </div>

            {/* After */}
            <div>
              {m.after.map((a) => (
                <div key={a.label} className="rounded-xl card overflow-hidden">
                  <div className="flex items-center gap-2 px-4 py-3 border-b adaptive-border">
                    <span className="text-xs font-mono text-emerald-400">AFTER</span>
                    <span className="text-xs muted-text font-mono">{a.label}</span>
                  </div>
                  <pre className="p-4 overflow-x-auto text-sm">
                    <code className="font-mono body-text">{a.code}</code>
                  </pre>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Differences table */}
      <section className="pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold heading mb-6">Key Differences</h2>
          <div className="rounded-xl card overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b adaptive-border">
                  <th className="text-left p-4 font-mono text-xs muted-text uppercase tracking-wider">
                    Feature
                  </th>
                  <th className="text-left p-4 font-mono text-xs muted-text uppercase tracking-wider">
                    {m.name}
                  </th>
                  <th className="text-left p-4 font-mono text-xs text-cyan-400 uppercase tracking-wider">
                    Chart.ts
                  </th>
                </tr>
              </thead>
              <tbody>
                {m.differences.map((d, i) => (
                  <tr
                    key={d.feature}
                    className={i < m.differences.length - 1 ? "border-b adaptive-border" : ""}
                  >
                    <td className="p-4 font-medium heading">{d.feature}</td>
                    <td className="p-4 body-text">{d.theirs}</td>
                    <td className="p-4 text-emerald-400/90">{d.ours}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold heading">Ready to migrate?</h2>
          <p className="mt-3 body-text">
            Get started with Chart.ts in 30 seconds.
          </p>
          <div className="mt-8 inline-flex items-center gap-3 px-6 py-4 rounded-xl card">
            <span className="muted-text font-mono text-sm">$</span>
            <code className="text-lg font-mono heading">{m.install}</code>
          </div>
          <div className="mt-6 flex items-center justify-center gap-4">
            <Link
              href="/docs"
              className="px-6 py-3 text-sm font-semibold rounded-lg bg-cyan-500 text-white hover:bg-cyan-400 transition-colors cursor-pointer"
            >
              Get Started
            </Link>
            <Link
              href={`/compare/${slug.replace("from-", "")}`}
              className="px-6 py-3 text-sm font-semibold rounded-lg card body-text transition-all cursor-pointer"
            >
              Full Comparison
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
