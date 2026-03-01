import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type UseCase = {
  name: string;
  title: string;
  description: string;
  headline: string;
  intro: string;
  chartTypes: { name: string; description: string; slug: string }[];
  codeExample: string;
  benefits: string[];
};

const useCases: Record<string, UseCase> = {
  "saas-dashboard": {
    name: "SaaS Dashboard",
    title: "SaaS Dashboard Charts | MRR, Churn, Analytics",
    description:
      "Build SaaS dashboards with Chart.ts. MRR tracking, churn analysis, activation funnels, cohort retention. Tailwind CSS, SSR, under 15kb.",
    headline: "SaaS Dashboard Charts",
    intro:
      "Every SaaS needs a metrics dashboard. Chart.ts gives you the chart components to build MRR tracking, churn analysis, activation funnels, and cohort retention views. Tailwind CSS styled, server-renderable, under 15kb.",
    chartTypes: [
      { name: "Line Chart", description: "MRR, ARR, and revenue trends over time", slug: "line" },
      { name: "Area Chart", description: "Stacked revenue by plan tier", slug: "area" },
      { name: "Funnel Chart", description: "Signup to activation conversion flow", slug: "funnel" },
      { name: "Bar Chart", description: "Monthly new vs churned customers", slug: "bar" },
      { name: "Heatmap", description: "Cohort retention matrix", slug: "heatmap" },
      { name: "Gauge Chart", description: "NPS score and health metrics", slug: "gauge" },
      { name: "Sparkline", description: "Inline KPI trend indicators", slug: "sparkline" },
    ],
    codeExample: `import { LineChart, BarChart, Sparkline, GaugeChart } from "@chartts/react"

export function SaaSDashboard({ metrics }) {
  return (
    <div className="grid grid-cols-4 gap-4">
      <KPICard label="MRR" value="$128k" trend={metrics.mrrTrend} />
      <KPICard label="Customers" value="2,847" trend={metrics.custTrend} />
      <KPICard label="Churn" value="2.1%" trend={metrics.churnTrend} />
      <KPICard label="NPS" value="72" trend={metrics.npsTrend} />

      <div className="col-span-3 rounded-xl card p-6">
        <LineChart
          data={metrics.revenue}
          x="month"
          y={["mrr", "arr"]}
          className="h-72"
        />
      </div>
      <div className="col-span-1 rounded-xl card p-6">
        <GaugeChart value={72} max={100} label="NPS Score" />
      </div>
    </div>
  )
}`,
    benefits: [
      "Server-render charts in Next.js for instant dashboard loads",
      "KPI sparklines under 1kb each",
      "Dark mode toggle with Tailwind dark: variants",
      "Export charts to SVG for investor reports",
      "Real-time updates with WebSocket streaming",
      "Accessible dashboards for compliance",
      "Under 15kb total for all chart types",
    ],
  },
  "financial-analytics": {
    name: "Financial Analytics",
    title: "Financial Charts | Candlestick, P&L, Portfolio",
    description:
      "Build financial dashboards with Chart.ts. Candlestick charts, P&L waterfalls, portfolio allocation pies, risk gauges. Free and open source.",
    headline: "Financial Analytics Charts",
    intro:
      "Professional financial visualization for trading platforms, portfolio trackers, and reporting dashboards. Candlestick charts with technical indicators, P&L waterfall analysis, and portfolio allocation views.",
    chartTypes: [
      { name: "Candlestick", description: "OHLC price charts with volume", slug: "candlestick" },
      { name: "Waterfall", description: "P&L breakdown and cash flow analysis", slug: "waterfall" },
      { name: "Donut Chart", description: "Portfolio allocation by asset class", slug: "donut" },
      { name: "Line Chart", description: "Portfolio value and benchmark comparison", slug: "line" },
      { name: "Gauge Chart", description: "Risk score and exposure meters", slug: "gauge" },
      { name: "Bar Chart", description: "Sector performance comparison", slug: "bar" },
    ],
    codeExample: `import { CandlestickChart, WaterfallChart, DonutChart } from "@chartts/react"

export function TradingDashboard({ portfolio }) {
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-8 rounded-xl card p-6">
        <CandlestickChart
          data={portfolio.ohlc}
          x="date"
          open="open" high="high" low="low" close="close"
          volume="volume"
          overlays={[{ type: "sma", period: 20 }]}
          className="h-96"
          upClassName="fill-emerald-500"
          downClassName="fill-red-500"
        />
      </div>
      <div className="col-span-4 rounded-xl card p-6">
        <DonutChart
          data={portfolio.allocation}
          label="asset"
          value="weight"
          className="h-72"
          centerLabel={portfolio.totalValue}
        />
      </div>
    </div>
  )
}`,
    benefits: [
      "Professional candlestick charts with technical indicators",
      "P&L waterfall charts for financial reporting",
      "Real-time price streaming support",
      "SVG export for quarterly reports and presentations",
      "Dark mode optimized for trading terminals",
      "Free and open source (MIT) vs $590/yr Highcharts",
      "Under 15kb vs 300kb+ for ECharts",
    ],
  },
  "admin-panel": {
    name: "Admin Panel",
    title: "Admin Panel Charts | User Metrics, System Health",
    description:
      "Add charts to admin panels. User growth, system health gauges, activity heatmaps, role distribution. Tailwind CSS, SSR ready. Under 15kb.",
    headline: "Admin Panel Charts",
    intro:
      "Every admin panel needs charts for user metrics, system health, and activity monitoring. Chart.ts gives you server-renderable chart components that match your Tailwind-styled admin UI.",
    chartTypes: [
      { name: "Line Chart", description: "User growth and activity trends", slug: "line" },
      { name: "Bar Chart", description: "Registrations by source, role distribution", slug: "bar" },
      { name: "Donut Chart", description: "User roles and permission breakdown", slug: "donut" },
      { name: "Gauge Chart", description: "CPU, memory, disk usage indicators", slug: "gauge" },
      { name: "Heatmap", description: "Activity patterns by day and hour", slug: "heatmap" },
      { name: "Sparkline", description: "Inline trends in data tables", slug: "sparkline" },
    ],
    codeExample: `import { LineChart, GaugeChart, HeatmapChart } from "@chartts/react"

export function AdminDashboard({ stats }) {
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-8 rounded-xl card p-6">
        <h3 className="text-sm font-medium muted-text mb-4">User Growth</h3>
        <LineChart
          data={stats.users}
          x="date"
          y="count"
          className="h-64"
          lineClassName="stroke-cyan-400"
          areaClassName="fill-cyan-400/10"
        />
      </div>
      <div className="col-span-4 grid gap-4">
        <div className="rounded-xl card p-4">
          <GaugeChart value={stats.cpu} max={100} label="CPU" className="h-32" />
        </div>
        <div className="rounded-xl card p-4">
          <GaugeChart value={stats.memory} max={100} label="Memory" className="h-32" />
        </div>
      </div>
    </div>
  )
}`,
    benefits: [
      "Matches Tailwind-styled admin UI perfectly",
      "Server-render for instant page loads",
      "Gauge charts for system health at a glance",
      "Heatmaps for activity pattern analysis",
      "Sparklines in data tables for inline trends",
      "Dark mode with one class toggle",
      "Under 15kb added to your admin bundle",
    ],
  },
  "iot-monitoring": {
    name: "IoT Monitoring",
    title: "IoT Dashboard Charts | Sensors, Devices, Real-Time",
    description:
      "Build IoT monitoring dashboards with Chart.ts. Real-time sensor data, device heatmaps, uptime gauges, threshold alerts. Under 15kb.",
    headline: "IoT Monitoring Charts",
    intro:
      "Monitor IoT devices and sensor networks with real-time chart components. Line charts for time series, gauges for thresholds, heatmaps for device grids, and sparklines for at-a-glance status.",
    chartTypes: [
      { name: "Line Chart", description: "Real-time sensor readings over time", slug: "line" },
      { name: "Gauge Chart", description: "Temperature, humidity, pressure thresholds", slug: "gauge" },
      { name: "Heatmap", description: "Device grid status and heat distribution", slug: "heatmap" },
      { name: "Sparkline", description: "Inline device status in tables", slug: "sparkline" },
      { name: "Area Chart", description: "Network traffic and bandwidth usage", slug: "area" },
      { name: "Bar Chart", description: "Device counts by type and status", slug: "bar" },
    ],
    codeExample: `import { LineChart, GaugeChart } from "@chartts/react"

export function SensorDashboard({ sensors }) {
  return (
    <div className="grid grid-cols-4 gap-4">
      {sensors.map(sensor => (
        <div key={sensor.id} className="rounded-xl card p-4">
          <p className="text-sm muted-text">{sensor.name}</p>
          <p className="text-2xl font-bold heading">{sensor.current}{sensor.unit}</p>
          <GaugeChart
            value={sensor.current}
            min={sensor.min}
            max={sensor.max}
            zones={sensor.zones}
            className="h-24 mt-2"
          />
        </div>
      ))}
      <div className="col-span-4 rounded-xl card p-6">
        <LineChart
          data={sensors[0].history}
          x="timestamp"
          y="value"
          className="h-64"
          animate
        />
      </div>
    </div>
  )
}`,
    benefits: [
      "Real-time data streaming with smooth transitions",
      "Gauge charts with configurable threshold zones",
      "Heatmap grids for device network visualization",
      "60fps animation for live sensor data",
      "Lightweight enough for embedded dashboards",
      "Works with WebSocket and MQTT bridges",
      "Under 15kb total footprint",
    ],
  },
  ecommerce: {
    name: "E-Commerce",
    title: "E-Commerce Analytics Charts | Revenue, Conversion, Products",
    description:
      "Build e-commerce analytics dashboards. Revenue trends, conversion funnels, product mix, geo sales maps. Tailwind CSS, SSR. Under 15kb.",
    headline: "E-Commerce Analytics Charts",
    intro:
      "Track store performance with Chart.ts. Revenue trends, conversion funnels, product category breakdown, and geographic sales distribution. Server-renderable for fast Shopify/WooCommerce admin dashboards.",
    chartTypes: [
      { name: "Line Chart", description: "Revenue and order trends over time", slug: "line" },
      { name: "Funnel Chart", description: "Cart to purchase conversion flow", slug: "funnel" },
      { name: "Donut Chart", description: "Revenue by product category", slug: "donut" },
      { name: "Bar Chart", description: "Top products and category performance", slug: "bar" },
      { name: "Heatmap", description: "Sales by day and hour for scheduling", slug: "heatmap" },
      { name: "Sparkline", description: "Product performance trends in tables", slug: "sparkline" },
    ],
    codeExample: `import { LineChart, FunnelChart, DonutChart } from "@chartts/react"

export function StoreDashboard({ store }) {
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-8 rounded-xl card p-6">
        <LineChart
          data={store.revenue}
          x="date"
          y={["revenue", "orders"]}
          className="h-64"
        />
      </div>
      <div className="col-span-4 rounded-xl card p-6">
        <FunnelChart
          data={store.funnel}
          label="stage"
          value="count"
          className="h-64"
          showPercentages
        />
      </div>
      <div className="col-span-12 rounded-xl card p-6">
        <DonutChart
          data={store.categories}
          label="category"
          value="revenue"
          centerLabel={store.totalRevenue}
        />
      </div>
    </div>
  )
}`,
    benefits: [
      "Conversion funnel charts for checkout optimization",
      "Product mix visualization with donut charts",
      "Revenue trends with multi-series support",
      "SSR for fast admin dashboard loads",
      "SVG export for marketing reports",
      "Tailwind CSS matches your storefront design",
      "Free forever, no per-store licensing",
    ],
  },
  healthcare: {
    name: "Healthcare",
    title: "Healthcare Data Visualization | Patient Metrics, Lab Results",
    description:
      "Build healthcare dashboards with Chart.ts. Patient metrics, lab results trending, bed occupancy, department performance. WCAG AA accessible.",
    headline: "Healthcare Data Visualization",
    intro:
      "Visualize healthcare data with accessible, compliant chart components. Patient vitals trending, lab result ranges, bed occupancy rates, and department performance. WCAG AA accessible by default for healthcare compliance.",
    chartTypes: [
      { name: "Line Chart", description: "Patient vitals and lab results over time", slug: "line" },
      { name: "Gauge Chart", description: "Bed occupancy and capacity indicators", slug: "gauge" },
      { name: "Bar Chart", description: "Department performance and wait times", slug: "bar" },
      { name: "Box Plot", description: "Lab result distributions and ranges", slug: "boxplot" },
      { name: "Heatmap", description: "ER volume by day and hour", slug: "heatmap" },
      { name: "Sparkline", description: "Patient vitals in EMR tables", slug: "sparkline" },
    ],
    codeExample: `import { LineChart, GaugeChart, BoxPlotChart } from "@chartts/react"

export function PatientDashboard({ patient }) {
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-8 rounded-xl card p-6">
        <LineChart
          data={patient.vitals}
          x="timestamp"
          y={["heartRate", "bloodPressure"]}
          className="h-64"
          aria={{
            label: "Patient vitals over 24 hours",
            description: "Heart rate and blood pressure trends"
          }}
        />
      </div>
      <div className="col-span-4 grid gap-4">
        <div className="rounded-xl card p-4">
          <GaugeChart
            value={patient.bedOccupancy}
            max={100}
            label="Bed Occupancy"
            zones={[
              { max: 70, className: "fill-emerald-500" },
              { max: 90, className: "fill-amber-500" },
              { max: 100, className: "fill-red-500" },
            ]}
          />
        </div>
      </div>
    </div>
  )
}`,
    benefits: [
      "WCAG AA accessible by default (healthcare compliance)",
      "Screen reader support for visually impaired staff",
      "Keyboard navigation for all chart interactions",
      "Pattern fills for color-blind clinicians",
      "SVG export for patient reports",
      "Server-renderable for fast EMR dashboards",
      "Under 15kb added to your healthcare app",
    ],
  },
  "startup-mvp": {
    name: "Startup MVP",
    title: "Charts for Startup MVP | Ship Fast, Zero Config",
    description:
      "Add charts to your MVP in minutes. Pre-built components, Tailwind CSS, zero config. React, Vue, Svelte. Under 15kb. Free forever.",
    headline: "Charts for Your Startup MVP",
    intro:
      "You need charts in your MVP but you don't have time to evaluate 15 charting libraries. Chart.ts works with your stack, styles with your Tailwind, and adds under 15kb to your bundle. Ship today.",
    chartTypes: [
      { name: "Line Chart", description: "Growth metrics and trends", slug: "line" },
      { name: "Bar Chart", description: "Category comparisons", slug: "bar" },
      { name: "Donut Chart", description: "Distribution breakdowns", slug: "donut" },
      { name: "Sparkline", description: "KPI cards with inline trends", slug: "sparkline" },
      { name: "Funnel Chart", description: "Conversion flow visualization", slug: "funnel" },
      { name: "Gauge Chart", description: "Single metric display", slug: "gauge" },
    ],
    codeExample: `// That's it. That's your dashboard.
import { LineChart, BarChart, Sparkline } from "@chartts/react"

export function MVPDashboard({ data }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="p-4 rounded-xl card flex items-center gap-4">
        <div>
          <p className="text-sm muted-text">Users</p>
          <p className="text-2xl font-bold heading">{data.users}</p>
        </div>
        <Sparkline data={data.userTrend} className="w-20 h-8" />
      </div>

      <div className="col-span-3 rounded-xl card p-6">
        <LineChart
          data={data.revenue}
          x="month"
          y="amount"
          className="h-64"
          lineClassName="stroke-cyan-400"
        />
      </div>
    </div>
  )
}`,
    benefits: [
      "Install and render your first chart in 2 minutes",
      "Zero config, zero boilerplate",
      "Tailwind CSS means charts match your existing UI",
      "Under 15kb won't slow down your MVP",
      "Free forever (MIT license)",
      "Works with React, Vue, Svelte, Solid",
      "Upgrade path to 65+ chart types as you grow",
    ],
  },
  "trading-platform": {
    name: "Trading Platform",
    title: "Trading Platform Charts | Candlestick, Indicators, Real-Time",
    description:
      "Build professional trading interfaces with Chart.ts. Real-time candlestick charts, technical indicators (SMA, EMA, RSI, MACD, Bollinger Bands), volume analysis, and WebSocket streaming for live market data.",
    headline: "Trading Platform Charts",
    intro:
      "Build professional trading interfaces with Chart.ts. Real-time candlestick charts, technical indicators (SMA, EMA, RSI, MACD, Bollinger Bands), volume analysis, and WebSocket streaming for live market data. Under 15kb with the full @chartts/finance plugin.",
    chartTypes: [
      { name: "Candlestick", description: "OHLC price action with customizable up/down colors", slug: "candlestick" },
      { name: "OHLC", description: "Open-High-Low-Close bar charts for price data", slug: "ohlc" },
      { name: "Volume", description: "Volume bars with direction coloring (buy/sell pressure)", slug: "volume" },
      { name: "Kagi", description: "Kagi reversal charts for trend identification", slug: "kagi" },
      { name: "Renko", description: "Renko brick charts for noise-free price movement", slug: "renko" },
      { name: "Combo", description: "Multi-panel linked charts with shared crosshair", slug: "combo" },
      { name: "Line Chart", description: "SMA, EMA, and Bollinger Band overlays", slug: "line" },
      { name: "Bar Chart", description: "RSI and MACD histogram indicators", slug: "bar" },
    ],
    codeExample: `import { CandlestickChart, VolumeChart, LineChart } from "@chartts/react"
import { sma, bollingerBands } from "@chartts/finance"
import { useWebSocket } from "@chartts/websocket"

export function TradingTerminal({ symbol }) {
  const { data, status } = useWebSocket(\`wss://feed.example.com/\${symbol}\`)
  const sma20 = sma(data, { period: 20, field: "close" })
  const bands = bollingerBands(data, { period: 20, stdDev: 2 })

  return (
    <div className="grid grid-rows-[3fr_1fr] gap-1 h-[600px]">
      <div className="rounded-xl card p-4">
        <CandlestickChart
          data={data}
          x="timestamp"
          open="open" high="high" low="low" close="close"
          overlays={[
            { data: sma20, className: "stroke-amber-400" },
            { data: bands.upper, className: "stroke-zinc-500" },
            { data: bands.lower, className: "stroke-zinc-500" },
          ]}
          className="h-full"
          upClassName="fill-emerald-500"
          downClassName="fill-red-500"
          crosshair
          zoomPan
        />
      </div>
      <div className="rounded-xl card p-4">
        <VolumeChart
          data={data}
          x="timestamp"
          y="volume"
          direction="close"
          className="h-full"
          upClassName="fill-emerald-500/60"
          downClassName="fill-red-500/60"
        />
      </div>
    </div>
  )
}`,
    benefits: [
      "Professional candlestick and OHLC charts with sub-millisecond rendering",
      "Built-in technical indicators: SMA, EMA, RSI, MACD, Bollinger Bands",
      "Real-time WebSocket streaming with auto-reconnect",
      "Kagi and renko reversal charts for advanced traders",
      "Multi-panel linked charts with synchronized crosshair",
      "Zoom and pan for exploring price history",
      "Dark mode optimized for trading terminals",
      "Free and open source (MIT) vs $590/yr for Highcharts Stock",
    ],
  },
  "scientific-research": {
    name: "Scientific Research",
    title: "Scientific Charts | 3D, Statistics, Publication-Quality",
    description:
      "Publication-quality scientific visualizations. 3D scatter plots, surface plots, violin distributions, parallel coordinates, and statistical analysis with @chartts/statistics and @chartts/regression.",
    headline: "Scientific Research Visualization",
    intro:
      "Publication-quality scientific visualizations with Chart.ts. 3D scatter plots and surface plots via @chartts/gl, violin and box plots for distributions, parallel coordinates for multivariate data, and statistical analysis with @chartts/statistics and @chartts/regression.",
    chartTypes: [
      { name: "Scatter3D", description: "3D scatter plots for multivariate data exploration", slug: "scatter3d" },
      { name: "Surface3D", description: "3D surface plots for continuous field visualization", slug: "surface3d" },
      { name: "Violin Plot", description: "Kernel density estimation for distribution shape", slug: "violin" },
      { name: "Box Plot", description: "Quartile ranges, outliers, and group comparison", slug: "boxplot" },
      { name: "Parallel Coordinates", description: "Multivariate data with n-dimensional comparison", slug: "parallel" },
      { name: "Heatmap", description: "Correlation matrices and intensity maps", slug: "heatmap" },
      { name: "Histogram", description: "Frequency distributions with configurable bins", slug: "histogram" },
    ],
    codeExample: `import { Scatter3D, SurfacePlot } from "@chartts/gl"
import { ViolinChart, BoxPlotChart, HeatmapChart } from "@chartts/react"
import { regression } from "@chartts/regression"
import { kde, percentile } from "@chartts/statistics"

export function ResearchDashboard({ experiment }) {
  const fit = regression(experiment.observations, { type: "polynomial", degree: 2 })
  const density = kde(experiment.measurements, { bandwidth: 0.5 })

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-6 rounded-xl card p-6">
        <Scatter3D
          data={experiment.samples}
          x="concentration" y="temperature" z="yield"
          colorBy="catalyst"
          className="h-96"
          orbit
        />
      </div>
      <div className="col-span-6 rounded-xl card p-6">
        <ViolinChart
          data={experiment.groups}
          category="treatment"
          value="response"
          className="h-96"
          showMedian
          showQuartiles
        />
      </div>
      <div className="col-span-12 rounded-xl card p-6">
        <HeatmapChart
          data={experiment.correlationMatrix}
          x="varA" y="varB" value="r"
          className="h-72"
          colorScale={["#3b82f6", "#ffffff", "#ef4444"]}
        />
      </div>
    </div>
  )
}`,
    benefits: [
      "3D scatter and surface plots via WebGL (@chartts/gl)",
      "Violin plots with kernel density estimation",
      "Statistical analysis: mean, median, percentile, KDE",
      "Regression trend lines (linear, polynomial, exponential)",
      "SVG export for journal and conference publications",
      "Parallel coordinates for high-dimensional data",
      "Heatmaps for correlation matrices and p-value tables",
      "TypeScript types prevent data shape errors in analysis code",
    ],
  },
  "network-monitoring": {
    name: "Network Monitoring",
    title: "Network Monitoring Dashboard | Topology, Metrics, Real-Time",
    description:
      "Real-time infrastructure dashboards. Network topology graphs with force-directed layout, geographic maps for global infrastructure, live streaming metrics, and WebGL scatter for high-cardinality data.",
    headline: "Network Monitoring Dashboards",
    intro:
      "Real-time infrastructure dashboards with Chart.ts. Network topology graphs with force-directed layout, geographic maps for global infrastructure, live streaming metrics via WebSocket and SSE, and WebGL scatter for high-cardinality data at 100k+ points.",
    chartTypes: [
      { name: "Graph", description: "Network topology with force-directed and hierarchical layouts", slug: "graph" },
      { name: "Geo Map", description: "Geographic server locations and traffic routes", slug: "geo" },
      { name: "Gauge Chart", description: "CPU, memory, disk, and network health indicators", slug: "gauge" },
      { name: "Heatmap", description: "Traffic patterns and incident density by time", slug: "heatmap" },
      { name: "Line Chart", description: "Latency, throughput, and error rate time series", slug: "line" },
      { name: "Scatter Plot", description: "WebGL scatter for 100k+ metric data points", slug: "scatter" },
    ],
    codeExample: `import { GraphChart, GeoChart, GaugeChart, LineChart } from "@chartts/react"
import { useWebSocket } from "@chartts/websocket"

export function NOCDashboard({ infrastructure }) {
  const { data: metrics } = useWebSocket("wss://metrics.internal/stream")

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-8 rounded-xl card p-6">
        <GraphChart
          nodes={infrastructure.nodes}
          edges={infrastructure.edges}
          layout="force"
          className="h-96"
          nodeClassName={n => n.status === "healthy"
            ? "fill-emerald-500"
            : "fill-red-500 animate-pulse"}
          edgeClassName="stroke-zinc-600"
          labels
        />
      </div>
      <div className="col-span-4 grid gap-4">
        <div className="rounded-xl card p-4">
          <GaugeChart value={metrics.cpu} max={100} label="CPU" className="h-28"
            zones={[
              { max: 70, className: "fill-emerald-500" },
              { max: 90, className: "fill-amber-500" },
              { max: 100, className: "fill-red-500" },
            ]}
          />
        </div>
        <div className="rounded-xl card p-4">
          <GaugeChart value={metrics.memory} max={100} label="Memory" className="h-28" />
        </div>
      </div>
      <div className="col-span-12 rounded-xl card p-6">
        <LineChart
          data={metrics.latency}
          x="timestamp"
          y={["p50", "p95", "p99"]}
          className="h-48"
          animate
        />
      </div>
    </div>
  )
}`,
    benefits: [
      "Force-directed graph layout for network topology visualization",
      "Geographic maps for global infrastructure views",
      "Real-time streaming via WebSocket and SSE with auto-reconnect",
      "WebGL scatter for 100k+ metric data points at 60fps",
      "Gauge charts with configurable health threshold zones",
      "Linked multi-panel dashboards with correlated views",
      "Dark mode optimized for NOC and SOC environments",
      "Under 15kb total for all chart types used",
    ],
  },
  "supply-chain": {
    name: "Supply Chain Analytics",
    title: "Supply Chain Charts | Sankey, Logistics, Inventory",
    description:
      "Visualize complex supply chains. Sankey diagrams for material flows, geographic maps for logistics, treemaps for inventory breakdown, and real-time tracking dashboards.",
    headline: "Supply Chain Analytics",
    intro:
      "Visualize complex supply chains with Chart.ts. Sankey diagrams for material and cost flows, geographic maps for logistics routes, treemaps for inventory hierarchy, waterfall charts for cost breakdown, and real-time tracking dashboards.",
    chartTypes: [
      { name: "Sankey Diagram", description: "Material and cost flow analysis between stages", slug: "sankey" },
      { name: "Geo Map", description: "Logistics routes, warehouse locations, delivery zones", slug: "geo" },
      { name: "Treemap", description: "Inventory hierarchy by category, SKU, and warehouse", slug: "treemap" },
      { name: "Waterfall", description: "Cost breakdown from raw materials to delivery", slug: "waterfall" },
      { name: "Funnel Chart", description: "Order pipeline from placement to fulfillment", slug: "funnel" },
      { name: "Line Chart", description: "Real-time shipment tracking and delivery trends", slug: "line" },
    ],
    codeExample: `import { SankeyChart, TreemapChart, GeoChart, WaterfallChart } from "@chartts/react"

export function SupplyChainDashboard({ supplyChain }) {
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12 rounded-xl card p-6">
        <h3 className="text-sm font-medium muted-text mb-4">Material Flow</h3>
        <SankeyChart
          nodes={supplyChain.nodes}
          links={supplyChain.flows}
          className="h-72"
          linkClassName="fill-cyan-400/20 stroke-cyan-400/40"
        />
      </div>
      <div className="col-span-6 rounded-xl card p-6">
        <TreemapChart
          data={supplyChain.inventory}
          label="category"
          value="quantity"
          children="items"
          className="h-64"
        />
      </div>
      <div className="col-span-6 rounded-xl card p-6">
        <WaterfallChart
          data={supplyChain.costBreakdown}
          label="stage"
          value="cost"
          className="h-64"
          positiveClassName="fill-emerald-500"
          negativeClassName="fill-red-500"
        />
      </div>
      <div className="col-span-12 rounded-xl card p-6">
        <GeoChart
          data={supplyChain.routes}
          type="routes"
          className="h-96"
          markerClassName="fill-cyan-400"
        />
      </div>
    </div>
  )
}`,
    benefits: [
      "Sankey diagrams for end-to-end material and cost flow analysis",
      "Geographic maps for logistics route visualization",
      "Treemaps for hierarchical inventory breakdown",
      "Waterfall charts for cost structure analysis",
      "Funnel charts for order pipeline tracking",
      "Real-time streaming for live shipment tracking",
      "SVG export for supply chain reports and presentations",
      "Under 15kb total for the entire visualization stack",
    ],
  },
  "operations-center": {
    name: "Operations Center",
    title: "Operations Center Dashboard | Real-Time, WebGL, Global",
    description:
      "Mission-critical real-time dashboards. WebGL rendering for 100k+ data points, live streaming from multiple sources, gauges for KPIs, and geographic displays for global operations.",
    headline: "Operations Center Dashboards",
    intro:
      "Mission-critical real-time dashboards with Chart.ts. WebGL rendering for 100k+ data points at 60fps, live streaming from WebSocket, SSE, and HTTP polling sources, gauge charts for KPIs and SLAs, and geographic displays for global operations.",
    chartTypes: [
      { name: "Scatter Plot", description: "WebGL scatter for 100k+ data points at 60fps", slug: "scatter" },
      { name: "Gauge Chart", description: "KPI and SLA monitoring with threshold zones", slug: "gauge" },
      { name: "Geo Map", description: "Global operations view with live status markers", slug: "geo" },
      { name: "Heatmap", description: "Incident patterns and load distribution by time", slug: "heatmap" },
      { name: "Line Chart", description: "Multi-source streaming metrics with rolling buffer", slug: "line" },
      { name: "Combo Chart", description: "Linked multi-panel dashboards with shared controls", slug: "combo" },
    ],
    codeExample: `import { ScatterChart, GaugeChart, GeoChart, LineChart } from "@chartts/react"
import { useStreaming } from "@chartts/websocket"

export function OperationsCenter({ config }) {
  const { data, status, reconnecting } = useStreaming(config.sources, {
    bufferSize: 10000,
    reconnect: true,
    reconnectInterval: 1000,
  })

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-3 grid gap-4">
        <div className="rounded-xl card p-4">
          <GaugeChart value={data.uptime} max={100} label="Uptime SLA"
            className="h-28"
            zones={[
              { max: 99, className: "fill-red-500" },
              { max: 99.9, className: "fill-amber-500" },
              { max: 100, className: "fill-emerald-500" },
            ]}
          />
        </div>
        <div className="rounded-xl card p-4">
          <GaugeChart value={data.errorRate} max={5} label="Error Rate %" className="h-28" />
        </div>
        <div className="rounded-xl card p-4">
          <GaugeChart value={data.throughput} max={10000} label="req/s" className="h-28" />
        </div>
      </div>
      <div className="col-span-9 rounded-xl card p-6">
        <GeoChart
          data={data.regions}
          type="markers"
          className="h-96"
          markerClassName={r => r.healthy
            ? "fill-emerald-500"
            : "fill-red-500 animate-pulse"}
        />
      </div>
      <div className="col-span-12 rounded-xl card p-6">
        <ScatterChart
          data={data.metrics}
          x="timestamp"
          y="latency"
          colorBy="service"
          renderer="webgl"
          className="h-48"
        />
      </div>
    </div>
  )
}`,
    benefits: [
      "WebGL rendering for 100k+ data points at 60fps",
      "Real-time streaming from WebSocket, SSE, and HTTP polling",
      "Auto-reconnect with configurable retry intervals",
      "Gauge charts for KPI and SLA monitoring with threshold zones",
      "Geographic maps for global operations visibility",
      "Heatmaps for incident pattern recognition",
      "Linked multi-panel dashboards with synchronized views",
      "Dark mode optimized for 24/7 operations environments",
    ],
  },
};

const slugs = Object.keys(useCases);

export function generateStaticParams() {
  return slugs.map((slug) => ({ slug }));
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const uc = useCases[slug];
  if (!uc) return {};
  return {
    title: uc.title,
    description: uc.description,
  };
}

export default async function UseCasePage({ params }: PageProps) {
  const { slug } = await params;
  const uc = useCases[slug];
  if (!uc) notFound();

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://chartts.com" },
      { "@type": "ListItem", position: 2, name: "Use Cases", item: "https://chartts.com/use-cases" },
      { "@type": "ListItem", position: 3, name: uc.name, item: `https://chartts.com/use-cases/${slug}` },
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
            href="/use-cases"
            className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
          >
            &larr; All use cases
          </Link>

          <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold tracking-tight heading">
            {uc.headline}
          </h1>
          <p className="mt-4 text-lg body-text max-w-2xl">{uc.intro}</p>
        </div>
      </section>

      {/* Chart types for this use case */}
      <section className="pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold heading mb-6">Chart Types You Need</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {uc.chartTypes.map((ct) => (
              <Link
                key={ct.slug}
                href={`/docs/charts/${ct.slug}`}
                className="flex items-start gap-3 p-4 rounded-xl card hover:border-cyan-500/20 transition-all cursor-pointer"
              >
                <svg
                  className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <div>
                  <p className="text-sm font-medium heading">{ct.name}</p>
                  <p className="text-xs body-text mt-0.5">{ct.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Code example */}
      <section className="pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold heading mb-6">Example Implementation</h2>
          <div className="rounded-xl card overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b adaptive-border">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              <span className="ml-2 text-xs muted-text font-mono">dashboard.tsx</span>
            </div>
            <pre className="p-6 overflow-x-auto text-sm">
              <code className="font-mono body-text">{uc.codeExample}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold heading mb-6">Why Chart.ts for {uc.name}</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {uc.benefits.map((b) => (
              <div key={b} className="flex items-start gap-3 p-4 rounded-xl card">
                <svg
                  className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm body-text">{b}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold heading">Start building your {uc.name.toLowerCase()}</h2>
          <p className="mt-3 body-text">
            Install Chart.ts and have your first chart rendering in 2 minutes.
          </p>
          <div className="mt-8 inline-flex items-center gap-3 px-6 py-4 rounded-xl card">
            <span className="muted-text font-mono text-sm">$</span>
            <code className="text-lg font-mono heading">npm install @chartts/react</code>
          </div>
          <div className="mt-6 flex items-center justify-center gap-4">
            <Link
              href="/docs"
              className="px-6 py-3 text-sm font-semibold rounded-lg bg-cyan-500 text-white hover:bg-cyan-400 transition-colors cursor-pointer"
            >
              Get Started
            </Link>
            <Link
              href="/examples"
              className="px-6 py-3 text-sm font-semibold rounded-lg card body-text transition-all cursor-pointer"
            >
              See Examples
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
