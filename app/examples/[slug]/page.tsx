import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "../../components/nav";
import { renderChart } from "@/lib/charts";
import { CodeBlock } from "@/lib/highlight";
import type { ChartData } from "@chartts/core";

const examples: Record<string, {
  title: string;
  description: string;
  charts: { type: string; title: string; data: ChartData; width?: number; height?: number }[];
  code: string;
}> = {
  "sales-dashboard": {
    title: "Sales Dashboard",
    description: "Revenue line chart with area fill, monthly bar chart, and KPI sparklines in a responsive grid.",
    charts: [
      {
        type: "line", title: "Monthly Revenue",
        data: { labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"], series: [{ name: "Revenue", values: [4200,5800,7100,6400,8200,9600,11200,14800,18200,24600,36400,48200] }] },
        width: 600, height: 300,
      },
      {
        type: "bar", title: "Quarterly Sales",
        data: { labels: ["Q1","Q2","Q3","Q4"], series: [{ name: "Sales", values: [17100,24200,44200,48200] }, { name: "Target", values: [20000,25000,35000,45000] }] },
        width: 400, height: 250,
      },
      {
        type: "sparkline", title: "Weekly Trend",
        data: { labels: ["1","2","3","4","5","6","7","8"], series: [{ name: "Trend", values: [4,8,6,12,9,14,11,16] }] },
        width: 200, height: 60,
      },
    ],
    code: `import { LineChart, BarChart, Sparkline } from "@chartts/react"

export function SalesDashboard() {
  return (
    <div className="grid grid-cols-2 gap-6">
      <LineChart
        data={revenueData}
        x="month"
        y="revenue"
        area
        className="col-span-2 h-72"
      />
      <BarChart
        data={quarterlyData}
        x="quarter"
        y={["sales", "target"]}
        className="h-64"
      />
      <div className="flex items-center gap-4">
        <Sparkline data={weeklyTrend} />
      </div>
    </div>
  )
}`,
  },
  "stock-tracker": {
    title: "Stock Tracker",
    description: "Candlestick chart with volume bars, moving average overlay, and real-time price updates.",
    charts: [
      {
        type: "candlestick", title: "AAPL — 5 Day",
        data: { labels: ["Mon","Tue","Wed","Thu","Fri"], series: [{ name: "Open", values: [185,188,186,190,189] }, { name: "High", values: [190,192,191,195,196] }, { name: "Low", values: [183,185,184,188,187] }, { name: "Close", values: [188,186,190,189,194] }] },
        width: 600, height: 350,
      },
    ],
    code: `import { CandlestickChart } from "@chartts/react"

export function StockTracker() {
  return (
    <CandlestickChart
      data={stockData}
      x="date"
      open="open"
      high="high"
      low="low"
      close="close"
      className="h-96"
    />
  )
}`,
  },
  analytics: {
    title: "Analytics Overview",
    description: "Page views area chart, traffic sources pie chart, and bounce rate gauge in a dashboard layout.",
    charts: [
      {
        type: "area", title: "Page Views",
        data: { labels: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"], series: [{ name: "Views", values: [12400,18200,15600,22100,19800,8400,6200] }] },
        width: 600, height: 250,
      },
      {
        type: "pie", title: "Traffic Sources",
        data: { labels: ["Organic","Direct","Social","Referral"], series: [{ name: "Traffic", values: [45,25,18,12] }] },
        width: 300, height: 250,
      },
      {
        type: "gauge", title: "Bounce Rate",
        data: { labels: ["Bounce"], series: [{ name: "Rate", values: [34] }] },
        width: 200, height: 200,
      },
    ],
    code: `import { AreaChart, PieChart, GaugeChart } from "@chartts/react"

export function AnalyticsOverview() {
  return (
    <div className="grid grid-cols-3 gap-6">
      <AreaChart data={pageViews} x="day" y="views" className="col-span-2 h-64" />
      <PieChart data={trafficSources} value="count" label="source" />
      <GaugeChart value={34} max={100} label="Bounce Rate" />
    </div>
  )
}`,
  },
  "conversion-funnel": {
    title: "Conversion Funnel",
    description: "Multi-step funnel chart showing visitor-to-customer pipeline with conversion rates.",
    charts: [
      {
        type: "funnel", title: "Sales Pipeline",
        data: { labels: ["Visitors","Leads","Qualified","Proposals","Closed Won"], series: [{ name: "Pipeline", values: [10000,6200,3800,1900,720] }] },
        width: 500, height: 350,
      },
    ],
    code: `import { FunnelChart } from "@chartts/react"

export function ConversionFunnel() {
  return (
    <FunnelChart
      data={pipelineData}
      value="count"
      label="stage"
      className="h-96"
    />
  )
}`,
  },
  "financial-waterfall": {
    title: "Financial Waterfall",
    description: "Revenue breakdown waterfall showing income, costs, taxes, and net profit.",
    charts: [
      {
        type: "waterfall", title: "P&L Breakdown",
        data: { labels: ["Revenue","COGS","Gross Profit","Operating","Tax","Net Income"], series: [{ name: "Flow", values: [500,-180,320,-120,-48,152] }] },
        width: 600, height: 350,
      },
    ],
    code: `import { WaterfallChart } from "@chartts/react"

export function FinancialWaterfall() {
  return (
    <WaterfallChart
      data={plData}
      x="category"
      y="amount"
      total="isTotal"
      className="h-96"
    />
  )
}`,
  },
  "team-performance": {
    title: "Team Performance",
    description: "Radar chart comparing team members across speed, quality, reliability, and communication.",
    charts: [
      {
        type: "radar", title: "Team Skills",
        data: { labels: ["Speed","Quality","Reliability","Communication","Innovation"], series: [{ name: "Alice", values: [90,75,85,92,80] }, { name: "Bob", values: [70,88,78,65,95] }] },
        width: 450, height: 350,
      },
    ],
    code: `import { RadarChart } from "@chartts/react"

export function TeamPerformance() {
  return (
    <RadarChart
      data={teamData}
      axes={["speed","quality","reliability","communication","innovation"]}
      fill
      className="h-96"
    />
  )
}`,
  },
  "realtime-monitor": {
    title: "Real-time Monitor",
    description: "Live-updating line chart with streaming data, auto-scrolling x-axis, and threshold alerts.",
    charts: [
      {
        type: "line", title: "Server CPU Usage",
        data: { labels: ["10:00","10:01","10:02","10:03","10:04","10:05","10:06","10:07","10:08","10:09","10:10"], series: [{ name: "CPU", values: [42,45,38,52,68,72,65,58,48,44,41] }] },
        width: 600, height: 250,
      },
      {
        type: "sparkline", title: "Memory",
        data: { labels: ["1","2","3","4","5","6","7","8"], series: [{ name: "Mem", values: [62,65,64,68,71,69,67,66] }] },
        width: 200, height: 60,
      },
    ],
    code: `import { LineChart, Sparkline } from "@chartts/react"

export function RealtimeMonitor() {
  const [data, setData] = useState(initialData)

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => [...prev.slice(1), newPoint()])
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return <LineChart data={data} x="time" y="cpu" animate={false} />
}`,
  },
  "dark-mode": {
    title: "Dark Mode Toggle",
    description: "Charts that respond to Tailwind dark mode. Same data, different aesthetic. Toggle and see.",
    charts: [
      {
        type: "line", title: "Revenue Trend",
        data: { labels: ["Jan","Feb","Mar","Apr","May","Jun"], series: [{ name: "Revenue", values: [4200,5800,7100,6400,8200,9600] }] },
        width: 500, height: 250,
      },
      {
        type: "bar", title: "Categories",
        data: { labels: ["A","B","C","D"], series: [{ name: "Value", values: [120,180,150,220] }] },
        width: 400, height: 250,
      },
    ],
    code: `import { LineChart, BarChart } from "@chartts/react"

// Charts automatically respond to Tailwind dark: variants
<LineChart
  data={data}
  x="month"
  y="revenue"
  lineClassName="stroke-cyan-500 dark:stroke-cyan-400"
  axisClassName="text-zinc-600 dark:text-zinc-400"
/>`,
  },
  responsive: {
    title: "Responsive Grid",
    description: "Charts that scale from mobile to desktop. Breakpoint-aware layouts with Tailwind responsive utilities.",
    charts: [
      {
        type: "line", title: "Responsive Line",
        data: { labels: ["Jan","Feb","Mar","Apr","May","Jun"], series: [{ name: "Data", values: [10,25,18,30,22,35] }] },
        width: 600, height: 250,
      },
      {
        type: "bar", title: "Responsive Bar",
        data: { labels: ["A","B","C","D","E"], series: [{ name: "Value", values: [45,72,38,91,56] }] },
        width: 400, height: 250,
      },
    ],
    code: `<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  <LineChart data={lineData} x="month" y="value" className="h-48 md:h-64" />
  <BarChart data={barData} x="cat" y="value" className="h-48 md:h-64" />
</div>`,
  },
  "scatter-regression": {
    title: "Scatter + Regression",
    description: "Scatter plot with trend line, R-squared value, and confidence interval overlay.",
    charts: [
      {
        type: "scatter", title: "Height vs Weight",
        data: { labels: ["1","2","3","4","5","6","7","8","9","10"], series: [{ name: "Measurements", values: [150,165,170,155,180,172,160,175,168,182] }] },
        width: 500, height: 350,
      },
    ],
    code: `import { ScatterChart } from "@chartts/react"

<ScatterChart
  data={measurements}
  x="height"
  y="weight"
  trendLine
  className="h-96"
/>`,
  },
  "multi-series": {
    title: "Multi-Series Comparison",
    description: "Compare up to 6 data series on a single line chart with interactive legend toggling.",
    charts: [
      {
        type: "line", title: "Product Revenue",
        data: { labels: ["Jan","Feb","Mar","Apr","May","Jun"], series: [{ name: "Product A", values: [12,18,15,22,28,32] }, { name: "Product B", values: [8,12,10,15,18,22] }, { name: "Product C", values: [5,8,12,10,14,18] }] },
        width: 600, height: 300,
      },
    ],
    code: `import { LineChart } from "@chartts/react"

<LineChart
  data={revenueData}
  x="month"
  y={["productA", "productB", "productC"]}
  className="h-72"
/>`,
  },
  "kpi-cards": {
    title: "KPI Cards",
    description: "Dashboard KPI cards with sparklines, percentage change, and trend indicators.",
    charts: [
      {
        type: "sparkline", title: "Revenue Trend",
        data: { labels: ["1","2","3","4","5","6","7","8"], series: [{ name: "Rev", values: [22,28,25,32,30,38,35,42] }] },
        width: 150, height: 40,
      },
      {
        type: "gauge", title: "Completion",
        data: { labels: ["Done"], series: [{ name: "Progress", values: [84] }] },
        width: 150, height: 150,
      },
    ],
    code: `import { Sparkline, GaugeChart } from "@chartts/react"

function KPICard({ label, value, trend, sparkData }) {
  return (
    <div className="p-6 rounded-xl bg-white dark:bg-zinc-900 border">
      <p className="text-sm text-zinc-500">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
      <Sparkline data={sparkData} className="mt-2" />
    </div>
  )
}`,
  },
};

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return Object.keys(examples).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const example = examples[slug];
  if (!example) return {};
  return {
    title: `${example.title} — Chart.ts Examples`,
    description: example.description,
  };
}

export default async function ExamplePage({ params }: PageProps) {
  const { slug } = await params;
  const example = examples[slug];

  if (!example) {
    notFound();
  }

  return (
    <main className="bg-dots bg-mesh min-h-screen">
      <Nav />
      <div className="pt-32 pb-24 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Link
                href="/examples"
                className="text-cyan-400 hover:text-cyan-300 text-sm font-mono transition-colors cursor-pointer"
              >
                Examples
              </Link>
              <span className="faint-text">/</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight heading">
              {example.title}
            </h1>
            <p className="mt-4 text-lg body-text leading-relaxed">
              {example.description}
            </p>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            {example.charts.map((chart, i) => {
              const svg = renderChart(chart.type, {
                width: chart.width ?? 480,
                height: chart.height ?? 280,
                theme: "dark",
                data: chart.data,
              });

              return (
                <div
                  key={i}
                  className={`window-frame ${example.charts.length === 1 || chart.width === 600 ? "lg:col-span-2" : ""}`}
                >
                  <div className="window-titlebar">
                    <div className="window-dot bg-[#ff5f57]" />
                    <div className="window-dot bg-[#febc2e]" />
                    <div className="window-dot bg-[#28c840]" />
                    <span className="ml-3 text-xs muted-text font-mono">{chart.title}</span>
                  </div>
                  <div className="p-6">
                    {svg ? (
                      <div
                        className="w-full [&>svg]:w-full [&>svg]:h-auto"
                        dangerouslySetInnerHTML={{ __html: svg }}
                      />
                    ) : (
                      <div className="w-full h-48 flex items-center justify-center muted-text text-sm">
                        Chart preview
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Code */}
          <section className="mb-12">
            <h2 className="text-xl font-bold heading mb-4">Code</h2>
            <CodeBlock code={example.code} lang="tsx" filename="example.tsx" />
          </section>

          {/* Back */}
          <div className="pt-8" style={{ borderTop: "1px solid var(--c-border)" }}>
            <Link
              href="/examples"
              className="text-cyan-400 hover:text-cyan-300 text-sm font-mono transition-colors cursor-pointer"
            >
              &larr; All examples
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
