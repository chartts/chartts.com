import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { renderChart } from "@/lib/charts";
import { CodeBlock } from "@/lib/highlight";
import type { ChartData } from "@chartts/core/all";

/* ── Chart panel inside a dashboard ── */
interface DashChart {
  type: string;
  title: string;
  data: ChartData;
  width?: number;
  height?: number;
  /** grid span: "full" | "2/3" | "1/2" | "1/3" */
  span?: string;
}

/* ── KPI card rendered above charts ── */
interface KPI {
  label: string;
  value: string;
  change?: string;
  up?: boolean;
  sparkData?: number[];
}

interface Example {
  title: string;
  description: string;
  badge?: string;
  kpis?: KPI[];
  charts: DashChart[];
  code: string;
}

/* ═══════════════════════════════════════════════════════════════════
   EXAMPLES DATA
   ═══════════════════════════════════════════════════════════════════ */

const examples: Record<string, Example> = {

  /* ──────────────────────────────────────────────────────────────
     ANALYTICS PLATFORM
     ────────────────────────────────────────────────────────────── */
  analytics: {
    title: "Analytics Platform",
    badge: "Analytics",
    description: "Traffic overview with area chart, geographic distribution on a geo map, content breakdown treemap, user segment analysis with parallel coordinates, and source distribution.",
    kpis: [
      { label: "Total Users", value: "284,521", change: "+12.4%", up: true, sparkData: [180,195,210,225,240,260,284] },
      { label: "Page Views", value: "1.2M", change: "+8.1%", up: true },
      { label: "Bounce Rate", value: "32.4%", change: "-3.2%", up: true },
      { label: "Avg Session", value: "4m 12s", change: "+0.8%", up: true },
    ],
    charts: [
      {
        type: "area", title: "Weekly Traffic", span: "2/3",
        data: {
          labels: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun","Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
          series: [
            { name: "Page Views", values: [12400,18200,15600,22100,19800,8400,6200,14200,20100,17800,24500,21200,9100,7400] },
            { name: "Unique Users", values: [8200,12100,10400,14700,13200,5600,4100,9400,13400,11900,16300,14100,6100,4900] },
          ],
        },
        width: 600, height: 280,
      },
      {
        type: "donut", title: "Traffic Sources", span: "1/3",
        data: {
          labels: ["Organic Search","Direct","Social Media","Referral","Email","Paid Ads"],
          series: [{ name: "Traffic", values: [42,22,16,10,6,4] }],
        },
        width: 300, height: 280,
      },
      {
        type: "heatmap", title: "Activity Heatmap (Day x Hour)", span: "full",
        data: {
          labels: ["Mon-0","Mon-6","Mon-12","Mon-18","Tue-0","Tue-6","Tue-12","Tue-18","Wed-0","Wed-6","Wed-12","Wed-18","Thu-0","Thu-6","Thu-12","Thu-18","Fri-0","Fri-6","Fri-12","Fri-18","Sat-0","Sat-6","Sat-12","Sat-18","Sun-0","Sun-6","Sun-12","Sun-18"],
          series: [{ name: "Sessions", values: [12,45,89,62,8,42,95,71,15,52,102,78,10,48,98,68,18,38,72,55,22,25,45,35,15,18,32,28] }],
        },
        width: 800, height: 200,
      },
      {
        type: "bar", title: "Top Pages", span: "1/2",
        data: {
          labels: ["/home","/pricing","/docs","/blog","/signup","/about"],
          series: [{ name: "Views", values: [48200,32100,28400,22800,18600,12400] }],
        },
        width: 400, height: 250,
      },
      {
        type: "funnel", title: "Conversion Funnel", span: "1/2",
        data: {
          labels: ["Visitors","Signups","Activated","Subscribed","Retained"],
          series: [{ name: "Users", values: [100000,42000,28000,12000,8400] }],
        },
        width: 400, height: 250,
      },
    ],
    code: `import { AreaChart, DonutChart, HeatmapChart, BarChart, FunnelChart, Sparkline } from "@chartts/react"

export function AnalyticsDashboard() {
  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4">
        <KPICard label="Total Users" value="284,521" change="+12.4%" sparkline={userTrend} />
        <KPICard label="Page Views" value="1.2M" change="+8.1%" />
        <KPICard label="Bounce Rate" value="32.4%" change="-3.2%" />
        <KPICard label="Avg Session" value="4m 12s" change="+0.8%" />
      </div>

      {/* Main row */}
      <div className="grid grid-cols-3 gap-4">
        <AreaChart data={traffic} x="day" y={["views", "users"]} className="col-span-2 h-72" />
        <DonutChart data={sources} value="count" label="source" className="h-72" />
      </div>

      {/* Heatmap */}
      <HeatmapChart data={activity} x="hour" y="day" value="sessions" className="h-48" />

      {/* Bottom row */}
      <div className="grid grid-cols-2 gap-4">
        <BarChart data={topPages} x="page" y="views" className="h-64" />
        <FunnelChart data={conversion} value="users" label="stage" className="h-64" />
      </div>
    </div>
  )
}`,
  },

  /* ──────────────────────────────────────────────────────────────
     SALES DASHBOARD
     ────────────────────────────────────────────────────────────── */
  "sales-dashboard": {
    title: "Sales Dashboard",
    badge: "Business",
    description: "Executive sales view with revenue trends, quarterly comparisons, P&L waterfall, team radar, pipeline funnel, and KPI sparklines.",
    kpis: [
      { label: "Total Revenue", value: "$2.4M", change: "+18.2%", up: true, sparkData: [120,145,168,182,210,240] },
      { label: "Avg Deal Size", value: "$48.2K", change: "+5.4%", up: true },
      { label: "Win Rate", value: "34.2%", change: "+2.1%", up: true },
      { label: "Pipeline", value: "$8.6M", change: "+22%", up: true },
    ],
    charts: [
      {
        type: "area", title: "Monthly Revenue", span: "2/3",
        data: {
          labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
          series: [
            { name: "Revenue", values: [142000,168000,195000,182000,210000,245000,238000,262000,285000,310000,342000,398000] },
            { name: "Target", values: [150000,160000,170000,180000,200000,220000,240000,260000,280000,300000,320000,350000] },
          ],
        },
        width: 600, height: 280,
      },
      {
        type: "gauge", title: "Annual Target", span: "1/3",
        data: { labels: ["Progress"], series: [{ name: "Target", values: [78] }] },
        width: 280, height: 250,
      },
      {
        type: "waterfall", title: "Q4 P&L Breakdown", span: "1/2",
        data: {
          labels: ["Revenue","COGS","Gross Profit","Marketing","Engineering","Sales","G&A","EBITDA","Tax","Net Income"],
          series: [{ name: "Flow", values: [398000,-119400,278600,-62000,-85000,-48000,-32000,51600,-12900,38700] }],
        },
        width: 500, height: 300,
      },
      {
        type: "bar", title: "Revenue by Region", span: "1/2",
        data: {
          labels: ["North America","Europe","Asia Pacific","Latin America","Middle East"],
          series: [
            { name: "Q3", values: [142,98,76,34,22] },
            { name: "Q4", values: [168,112,88,42,28] },
          ],
        },
        width: 400, height: 300,
      },
      {
        type: "funnel", title: "Sales Pipeline", span: "1/2",
        data: {
          labels: ["Prospects","Qualified","Proposal","Negotiation","Closed Won"],
          series: [{ name: "Deals", values: [842,456,234,128,72] }],
        },
        width: 400, height: 250,
      },
      {
        type: "radar", title: "Team Performance", span: "1/2",
        data: {
          labels: ["Calls","Emails","Demos","Proposals","Close Rate"],
          series: [
            { name: "Team A", values: [92,78,85,72,88] },
            { name: "Team B", values: [76,92,68,85,72] },
          ],
        },
        width: 400, height: 250,
      },
    ],
    code: `import {
  AreaChart, GaugeChart, WaterfallChart,
  BarChart, FunnelChart, RadarChart, Sparkline
} from "@chartts/react"

export function SalesDashboard() {
  return (
    <div className="space-y-6">
      {/* KPI row */}
      <div className="grid grid-cols-4 gap-4">
        <KPI label="Revenue" value="$2.4M" change="+18.2%" sparkline={revTrend} />
        <KPI label="Avg Deal" value="$48.2K" change="+5.4%" />
        <KPI label="Win Rate" value="34.2%" change="+2.1%" />
        <KPI label="Pipeline" value="$8.6M" change="+22%" />
      </div>

      {/* Revenue + gauge */}
      <div className="grid grid-cols-3 gap-4">
        <AreaChart
          data={revenue}
          x="month" y={["revenue", "target"]}
          className="col-span-2 h-72 rounded-xl bg-zinc-950 p-4"
        />
        <GaugeChart value={78} max={100} label="Annual Target" className="h-72" />
      </div>

      {/* P&L + regions */}
      <div className="grid grid-cols-2 gap-4">
        <WaterfallChart data={pl} x="item" y="amount" className="h-80" />
        <BarChart data={regions} x="region" y={["q3","q4"]} className="h-80" />
      </div>

      {/* Pipeline + team */}
      <div className="grid grid-cols-2 gap-4">
        <FunnelChart data={pipeline} value="deals" label="stage" className="h-64" />
        <RadarChart data={team} axes={skills} fill className="h-64" />
      </div>
    </div>
  )
}`,
  },

  /* ──────────────────────────────────────────────────────────────
     CONVERSION FUNNEL
     ────────────────────────────────────────────────────────────── */
  "conversion-funnel": {
    title: "Conversion Funnel",
    badge: "Marketing",
    description: "Complete conversion analysis with multi-step funnel, source breakdown donut, weekly trend, and stage-by-stage bar comparison.",
    kpis: [
      { label: "Visitors", value: "124.8K", change: "+14%", up: true },
      { label: "Signups", value: "8,420", change: "+22%", up: true },
      { label: "Conversion", value: "6.7%", change: "+1.8%", up: true },
      { label: "Revenue/User", value: "$42", change: "+8%", up: true },
    ],
    charts: [
      {
        type: "funnel", title: "Full Pipeline", span: "1/2",
        data: {
          labels: ["Page Visit","Sign Up","Onboarding","First Use","Upgrade","Advocate"],
          series: [{ name: "Users", values: [124800,8420,6200,4800,1920,640] }],
        },
        width: 450, height: 350,
      },
      {
        type: "donut", title: "Conversion by Source", span: "1/2",
        data: {
          labels: ["Organic","Paid Search","Social","Email","Referral"],
          series: [{ name: "Conversions", values: [38,24,18,12,8] }],
        },
        width: 350, height: 350,
      },
      {
        type: "line", title: "Weekly Conversion Rate", span: "full",
        data: {
          labels: ["W1","W2","W3","W4","W5","W6","W7","W8","W9","W10","W11","W12"],
          series: [
            { name: "Signup Rate", values: [5.2,5.8,6.1,5.9,6.4,6.2,6.8,7.1,6.9,7.2,6.8,7.4] },
            { name: "Upgrade Rate", values: [1.2,1.4,1.3,1.5,1.6,1.4,1.8,1.9,1.7,2.0,1.8,2.1] },
          ],
        },
        width: 800, height: 250,
      },
    ],
    code: `import { FunnelChart, DonutChart, LineChart } from "@chartts/react"

export function ConversionDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <FunnelChart data={pipeline} value="users" label="stage" className="h-96" />
        <DonutChart data={sources} value="conversions" label="source" className="h-96" />
      </div>
      <LineChart
        data={weeklyRates}
        x="week" y={["signupRate", "upgradeRate"]}
        className="h-64"
      />
    </div>
  )
}`,
  },

  /* ──────────────────────────────────────────────────────────────
     FINANCIAL WATERFALL
     ────────────────────────────────────────────────────────────── */
  "financial-waterfall": {
    title: "Financial P&L Dashboard",
    badge: "Finance",
    description: "Profit & loss waterfall with quarterly revenue comparison, margin trends, and expense category breakdown.",
    kpis: [
      { label: "Net Revenue", value: "$4.2M", change: "+15%", up: true },
      { label: "Gross Margin", value: "68.4%", change: "+2.1%", up: true },
      { label: "Operating Exp", value: "$1.8M", change: "+8%", up: false },
      { label: "Net Income", value: "$842K", change: "+24%", up: true },
    ],
    charts: [
      {
        type: "waterfall", title: "Annual P&L Breakdown", span: "full",
        data: {
          labels: ["Revenue","COGS","Gross Profit","R&D","Sales & Marketing","G&A","Operating Income","Interest","Tax","Net Income"],
          series: [{ name: "Flow", values: [4200000,-1327000,2873000,-680000,-720000,-380000,1093000,-42000,-209000,842000] }],
        },
        width: 800, height: 350,
      },
      {
        type: "bar", title: "Quarterly Revenue", span: "1/2",
        data: {
          labels: ["Q1","Q2","Q3","Q4"],
          series: [
            { name: "2024", values: [820,980,1050,1180] },
            { name: "2025", values: [920,1080,1150,1350] },
          ],
        },
        width: 400, height: 280,
      },
      {
        type: "line", title: "Margin Trends", span: "1/2",
        data: {
          labels: ["Q1","Q2","Q3","Q4"],
          series: [
            { name: "Gross Margin", values: [65.2,66.8,68.1,68.4] },
            { name: "Operating Margin", values: [22.4,24.1,25.8,26.0] },
            { name: "Net Margin", values: [16.2,18.4,19.8,20.0] },
          ],
        },
        width: 400, height: 280,
      },
    ],
    code: `import { WaterfallChart, BarChart, LineChart } from "@chartts/react"

export function FinancialDashboard() {
  return (
    <div className="space-y-6">
      <WaterfallChart
        data={plData}
        x="category" y="amount"
        className="h-96 rounded-xl bg-zinc-950 p-4"
      />
      <div className="grid grid-cols-2 gap-4">
        <BarChart data={quarterlyRev} x="quarter" y={["2024","2025"]} className="h-72" />
        <LineChart data={margins} x="quarter" y={["gross","operating","net"]} className="h-72" />
      </div>
    </div>
  )
}`,
  },

  /* ──────────────────────────────────────────────────────────────
     TEAM PERFORMANCE
     ────────────────────────────────────────────────────────────── */
  "team-performance": {
    title: "Team Performance Dashboard",
    badge: "HR",
    description: "Multi-dimensional team analysis with radar comparisons, skill heatmap, performance trends, and individual scorecards.",
    charts: [
      {
        type: "radar", title: "Team Comparison", span: "1/2",
        data: {
          labels: ["Speed","Quality","Reliability","Communication","Innovation","Leadership"],
          series: [
            { name: "Engineering", values: [82,92,88,72,90,68] },
            { name: "Design", values: [75,95,80,88,85,72] },
            { name: "Product", values: [70,78,82,92,80,88] },
          ],
        },
        width: 420, height: 350,
      },
      {
        type: "horizontal-bar", title: "Individual Scores", span: "1/2",
        data: {
          labels: ["Alice Chen","Bob Smith","Carol Wu","David Kim","Eva Lopez","Frank Li"],
          series: [{ name: "Score", values: [94,88,92,85,90,82] }],
        },
        width: 400, height: 350,
      },
      {
        type: "line", title: "Quarterly Performance Trend", span: "full",
        data: {
          labels: ["Q1 23","Q2 23","Q3 23","Q4 23","Q1 24","Q2 24","Q3 24","Q4 24"],
          series: [
            { name: "Engineering", values: [78,80,82,85,84,86,88,92] },
            { name: "Design", values: [82,84,86,88,87,89,91,95] },
            { name: "Product", values: [75,78,80,82,84,86,88,90] },
          ],
        },
        width: 800, height: 280,
      },
    ],
    code: `import { RadarChart, HorizontalBarChart, LineChart } from "@chartts/react"

export function TeamDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <RadarChart
          data={teamSkills}
          axes={["Speed","Quality","Reliability","Communication","Innovation","Leadership"]}
          fill className="h-96"
        />
        <HorizontalBarChart data={scores} x="name" y="score" className="h-96" />
      </div>
      <LineChart
        data={trends}
        x="quarter" y={["engineering","design","product"]}
        className="h-72"
      />
    </div>
  )
}`,
  },

  /* ──────────────────────────────────────────────────────────────
     REAL-TIME MONITOR
     ────────────────────────────────────────────────────────────── */
  "realtime-monitor": {
    title: "Infrastructure Monitor",
    badge: "DevOps",
    description: "Real-time server monitoring with CPU/memory line charts, request rate gauges, error rate sparklines, and system heatmap.",
    kpis: [
      { label: "CPU Usage", value: "42%", change: "Healthy", up: true, sparkData: [38,42,45,38,52,48,42] },
      { label: "Memory", value: "6.2 GB", change: "68%", up: true, sparkData: [62,65,64,68,71,69,67] },
      { label: "Requests/s", value: "2,841", change: "+12%", up: true },
      { label: "Error Rate", value: "0.04%", change: "-0.01%", up: true },
    ],
    charts: [
      {
        type: "line", title: "CPU & Memory Usage", span: "2/3",
        data: {
          labels: ["10:00","10:05","10:10","10:15","10:20","10:25","10:30","10:35","10:40","10:45","10:50","10:55","11:00"],
          series: [
            { name: "CPU %", values: [42,45,38,52,68,72,65,58,48,44,41,46,42] },
            { name: "Memory %", values: [62,65,64,68,71,69,67,66,68,70,72,69,68] },
          ],
        },
        width: 600, height: 280,
      },
      {
        type: "gauge", title: "System Health", span: "1/3",
        data: { labels: ["Health"], series: [{ name: "Score", values: [94] }] },
        width: 280, height: 250,
      },
      {
        type: "bar", title: "Request Distribution by Endpoint", span: "1/2",
        data: {
          labels: ["/api/users","/api/orders","/api/products","/api/auth","/api/search","/api/webhooks"],
          series: [
            { name: "Success", values: [1240,980,860,720,540,320] },
            { name: "Errors", values: [2,5,1,8,3,1] },
          ],
        },
        width: 400, height: 250,
      },
      {
        type: "area", title: "Response Time (p50 / p99)", span: "1/2",
        data: {
          labels: ["10:00","10:10","10:20","10:30","10:40","10:50","11:00"],
          series: [
            { name: "p50 (ms)", values: [12,14,13,18,22,16,14] },
            { name: "p99 (ms)", values: [48,52,45,82,120,65,52] },
          ],
        },
        width: 400, height: 250,
      },
    ],
    code: `import { LineChart, GaugeChart, BarChart, AreaChart, Sparkline } from "@chartts/react"

export function InfraMonitor() {
  const { cpu, memory, requests, health } = useMetrics()

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-3">
        <KPI label="CPU" value="42%" sparkline={cpu.recent} />
        <KPI label="Memory" value="6.2 GB" sparkline={memory.recent} />
        <KPI label="Req/s" value="2,841" />
        <KPI label="Errors" value="0.04%" />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <LineChart data={metrics} x="time" y={["cpu","memory"]} className="col-span-2 h-72" />
        <GaugeChart value={health} max={100} className="h-72" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <BarChart data={endpoints} x="path" y={["success","errors"]} className="h-64" />
        <AreaChart data={latency} x="time" y={["p50","p99"]} className="h-64" />
      </div>
    </div>
  )
}`,
  },

  /* ──────────────────────────────────────────────────────────────
     DARK MODE
     ────────────────────────────────────────────────────────────── */
  "dark-mode": {
    title: "Dark Mode Charts",
    description: "Charts that respond to Tailwind dark mode. Same data, different aesthetic. All Chart.ts charts adapt automatically.",
    charts: [
      {
        type: "line", title: "Revenue Trend", span: "1/2",
        data: { labels: ["Jan","Feb","Mar","Apr","May","Jun"], series: [{ name: "Revenue", values: [4200,5800,7100,6400,8200,9600] }] },
        width: 400, height: 250,
      },
      {
        type: "bar", title: "Categories", span: "1/2",
        data: { labels: ["A","B","C","D","E"], series: [{ name: "Value", values: [120,180,150,220,190] }] },
        width: 400, height: 250,
      },
      {
        type: "pie", title: "Distribution", span: "1/2",
        data: { labels: ["React","Vue","Svelte","Angular"], series: [{ name: "Usage", values: [45,25,18,12] }] },
        width: 350, height: 280,
      },
      {
        type: "scatter", title: "Correlation", span: "1/2",
        data: { labels: ["1","2","3","4","5","6","7","8","9","10"], series: [{ name: "Data", values: [15,28,22,35,42,38,48,52,45,58] }] },
        width: 400, height: 280,
      },
    ],
    code: `import { LineChart, BarChart, PieChart, ScatterChart } from "@chartts/react"

// All Chart.ts charts automatically adapt to Tailwind dark mode.
// No extra config needed - they read CSS custom properties.

<div className="grid grid-cols-2 gap-6">
  <LineChart
    data={revenue}
    x="month" y="revenue"
    className="h-64 bg-white dark:bg-zinc-950 rounded-xl p-4"
  />
  <BarChart
    data={categories}
    x="name" y="value"
    className="h-64 bg-white dark:bg-zinc-950 rounded-xl p-4"
  />
  <PieChart data={dist} value="usage" label="name" className="h-72" />
  <ScatterChart data={corr} x="x" y="y" className="h-72" />
</div>`,
  },

  /* ──────────────────────────────────────────────────────────────
     RESPONSIVE GRID
     ────────────────────────────────────────────────────────────── */
  responsive: {
    title: "Responsive Grid",
    description: "Charts that scale from mobile to desktop using Tailwind responsive utilities and SVG viewBox scaling.",
    charts: [
      {
        type: "line", title: "Responsive Line", span: "full",
        data: { labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug"], series: [{ name: "Growth", values: [10,25,18,30,22,35,28,42] }] },
        width: 800, height: 250,
      },
      {
        type: "bar", title: "Categories", span: "1/2",
        data: { labels: ["A","B","C","D","E"], series: [{ name: "Value", values: [45,72,38,91,56] }] },
        width: 400, height: 250,
      },
      {
        type: "donut", title: "Split", span: "1/2",
        data: { labels: ["Desktop","Mobile","Tablet"], series: [{ name: "Traffic", values: [52,38,10] }] },
        width: 300, height: 250,
      },
    ],
    code: `<div className="space-y-4">
  <LineChart data={growth} className="h-48 md:h-64 lg:h-72" />
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <BarChart data={categories} className="h-48 md:h-64" />
    <DonutChart data={split} className="h-48 md:h-64" />
  </div>
</div>`,
  },

  /* ──────────────────────────────────────────────────────────────
     SCATTER + REGRESSION
     ────────────────────────────────────────────────────────────── */
  "scatter-regression": {
    title: "Scatter Analysis",
    description: "Scatter plots showing correlations with multiple data sets and visual patterns.",
    charts: [
      {
        type: "scatter", title: "Height vs Weight", span: "1/2",
        data: { labels: ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15"], series: [{ name: "Measurements", values: [150,165,170,155,180,172,160,175,168,182,158,174,162,178,169] }] },
        width: 400, height: 300,
      },
      {
        type: "bubble", title: "Market Segments", span: "1/2",
        data: { labels: ["Enterprise","Mid-Market","SMB","Startup","Agency"], series: [{ name: "Revenue", values: [120,85,45,25,55] }, { name: "Volume", values: [12,28,65,42,18] }] },
        width: 400, height: 300,
      },
    ],
    code: `import { ScatterChart, BubbleChart } from "@chartts/react"

<div className="grid grid-cols-2 gap-4">
  <ScatterChart data={measurements} x="height" y="weight" className="h-80" />
  <BubbleChart data={segments} x="revenue" y="volume" size="count" className="h-80" />
</div>`,
  },

  /* ──────────────────────────────────────────────────────────────
     MULTI-SERIES COMPARISON
     ────────────────────────────────────────────────────────────── */
  "multi-series": {
    title: "Multi-Series Comparison",
    description: "Compare multiple product lines across time with lines, stacked bars, and area charts.",
    charts: [
      {
        type: "line", title: "Product Revenue", span: "full",
        data: {
          labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
          series: [
            { name: "Product A", values: [12,18,15,22,28,32,35,38,42,45,48,52] },
            { name: "Product B", values: [8,12,10,15,18,22,20,24,28,30,32,35] },
            { name: "Product C", values: [5,8,12,10,14,18,16,20,22,25,28,32] },
            { name: "Product D", values: [3,5,8,6,9,12,10,14,16,18,20,24] },
          ],
        },
        width: 800, height: 300,
      },
      {
        type: "stacked-bar", title: "Quarterly Breakdown", span: "1/2",
        data: {
          labels: ["Q1","Q2","Q3","Q4"],
          series: [
            { name: "Product A", values: [45,82,115,145] },
            { name: "Product B", values: [30,55,72,97] },
            { name: "Product C", values: [25,42,58,85] },
            { name: "Product D", values: [16,27,40,62] },
          ],
        },
        width: 400, height: 280,
      },
      {
        type: "pie", title: "Revenue Share", span: "1/2",
        data: {
          labels: ["Product A","Product B","Product C","Product D"],
          series: [{ name: "Share", values: [387,254,207,145] }],
        },
        width: 350, height: 280,
      },
    ],
    code: `import { LineChart, StackedBarChart, PieChart } from "@chartts/react"

<div className="space-y-6">
  <LineChart data={revenue} x="month" y={products} className="h-72" />
  <div className="grid grid-cols-2 gap-4">
    <StackedBarChart data={quarterly} x="quarter" y={products} className="h-72" />
    <PieChart data={share} value="revenue" label="product" className="h-72" />
  </div>
</div>`,
  },

  /* ──────────────────────────────────────────────────────────────
     KPI CARDS
     ────────────────────────────────────────────────────────────── */
  "kpi-cards": {
    title: "KPI Cards Dashboard",
    description: "Executive KPI cards with sparklines, gauges, trend indicators, and mini charts for at-a-glance metrics.",
    charts: [
      {
        type: "sparkline", title: "Revenue Trend", span: "1/3",
        data: { labels: ["1","2","3","4","5","6","7","8","9","10","11","12"], series: [{ name: "Rev", values: [22,28,25,32,30,38,35,42,40,45,48,52] }] },
        width: 200, height: 60,
      },
      {
        type: "sparkline", title: "Users Trend", span: "1/3",
        data: { labels: ["1","2","3","4","5","6","7","8","9","10","11","12"], series: [{ name: "Users", values: [1200,1350,1280,1420,1380,1520,1480,1620,1580,1720,1680,1840] }] },
        width: 200, height: 60,
      },
      {
        type: "sparkline", title: "Conversion Trend", span: "1/3",
        data: { labels: ["1","2","3","4","5","6","7","8","9","10","11","12"], series: [{ name: "Conv", values: [3.2,3.5,3.4,3.8,3.6,4.0,3.9,4.2,4.1,4.4,4.3,4.6] }] },
        width: 200, height: 60,
      },
      {
        type: "gauge", title: "Server Load", span: "1/3",
        data: { labels: ["Load"], series: [{ name: "CPU", values: [42] }] },
        width: 200, height: 180,
      },
      {
        type: "gauge", title: "Memory", span: "1/3",
        data: { labels: ["Memory"], series: [{ name: "RAM", values: [68] }] },
        width: 200, height: 180,
      },
      {
        type: "gauge", title: "Disk", span: "1/3",
        data: { labels: ["Disk"], series: [{ name: "Storage", values: [84] }] },
        width: 200, height: 180,
      },
    ],
    code: `import { Sparkline, GaugeChart } from "@chartts/react"

function KPICard({ label, value, trend, sparkData }) {
  return (
    <div className="p-6 rounded-xl bg-zinc-950 border border-zinc-800">
      <p className="text-xs text-zinc-500 font-mono uppercase">{label}</p>
      <div className="flex items-end justify-between mt-1">
        <p className="text-2xl font-bold text-white">{value}</p>
        <span className={\`text-sm font-mono \${trend > 0 ? 'text-emerald-400' : 'text-red-400'}\`}>
          {trend > 0 ? '+' : ''}{trend}%
        </span>
      </div>
      <Sparkline data={sparkData} className="mt-3 h-10" />
    </div>
  )
}

function SystemGauge({ label, value }) {
  return (
    <div className="p-6 rounded-xl bg-zinc-950 border border-zinc-800 text-center">
      <GaugeChart value={value} max={100} className="h-32 mx-auto" />
      <p className="text-sm text-zinc-400 mt-2">{label}</p>
    </div>
  )
}`,
  },
};

/* ═══════════════════════════════════════════════════════════════════
   PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════════ */

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return Object.keys(examples).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const example = examples[slug];
  if (!example) return {};
  return {
    title: `${example.title} | Chart.ts Examples`,
    description: example.description,
  };
}

function spanClass(span?: string) {
  if (span === "full") return "lg:col-span-3";
  if (span === "2/3") return "lg:col-span-2";
  if (span === "1/3") return "lg:col-span-1";
  if (span === "1/2") return "lg:col-span-1";
  return "";
}

export default async function ExamplePage({ params }: PageProps) {
  const { slug } = await params;
  const example = examples[slug];

  if (!example) {
    notFound();
  }

  // Determine grid: if any chart has 1/3 or 2/3, use 3-col grid; otherwise 2-col
  const use3Col = example.charts.some((c) => c.span === "1/3" || c.span === "2/3");
  const gridCols = use3Col ? "lg:grid-cols-3" : "lg:grid-cols-2";

  return (
    <>
      <div className="pt-24 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <Link
                href="/examples"
                className="text-cyan-400 hover:text-cyan-300 text-sm font-mono transition-colors cursor-pointer"
              >
                Examples
              </Link>
              <span className="faint-text">/</span>
            </div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight heading">
                {example.title}
              </h1>
              {example.badge && (
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  {example.badge}
                </span>
              )}
            </div>
            <p className="mt-2 text-lg body-text leading-relaxed max-w-3xl">
              {example.description}
            </p>
          </div>

          {/* KPIs */}
          {example.kpis && example.kpis.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {example.kpis.map((kpi) => (
                <div key={kpi.label} className="p-4 rounded-xl card">
                  <p className="text-[11px] font-mono muted-text uppercase tracking-wider">{kpi.label}</p>
                  <p className="text-xl sm:text-2xl font-bold heading mt-1">{kpi.value}</p>
                  {kpi.change && (
                    <span className={`text-xs font-mono ${kpi.up ? "text-emerald-400" : "text-red-400"}`}>
                      {kpi.change}
                    </span>
                  )}
                  {kpi.sparkData && (
                    <div className="mt-2">
                      {(() => {
                        const svg = renderChart("sparkline", {
                          width: 120, height: 30, theme: "dark",
                          data: { labels: kpi.sparkData.map((_, i) => String(i)), series: [{ name: "s", values: kpi.sparkData }] },
                        });
                        return svg ? <div className="[&>svg]:w-full [&>svg]:h-auto" dangerouslySetInnerHTML={{ __html: svg }} /> : null;
                      })()}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Charts grid */}
          <div className={`grid grid-cols-1 ${gridCols} gap-4 mb-12`}>
            {example.charts.map((chart, i) => {
              const svg = renderChart(chart.type, {
                width: chart.width ?? 480,
                height: chart.height ?? 280,
                theme: "dark",
                data: chart.data,
              });

              const colSpan = chart.span === "full"
                ? (use3Col ? "lg:col-span-3" : "lg:col-span-2")
                : chart.span === "2/3"
                ? "lg:col-span-2"
                : chart.span === "1/3"
                ? "lg:col-span-1"
                : "";

              return (
                <div
                  key={i}
                  className={`window-frame ${colSpan}`}
                >
                  <div className="window-titlebar">
                    <div className="window-dot bg-[#ff5f57]" />
                    <div className="window-dot bg-[#febc2e]" />
                    <div className="window-dot bg-[#28c840]" />
                    <span className="ml-3 text-xs muted-text font-mono">{chart.title}</span>
                  </div>
                  <div className="p-4 sm:p-6">
                    {svg ? (
                      <div
                        className="w-full [&>svg]:w-full [&>svg]:h-auto"
                        dangerouslySetInnerHTML={{ __html: svg }}
                      />
                    ) : (
                      <div className="w-full h-48 flex items-center justify-center muted-text text-sm">
                        Chart preview unavailable
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Code */}
          <section className="mb-12">
            <h2 className="text-xl font-bold heading mb-4">Implementation</h2>
            <CodeBlock code={example.code} lang="tsx" filename="dashboard.tsx" />
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
    </>
  );
}
