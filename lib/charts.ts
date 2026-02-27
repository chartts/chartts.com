import {
  renderToString,
  lineChartType,
  barChartType,
  stackedBarChartType,
  horizontalBarChartType,
  areaChartType,
  pieChartType,
  donutChartType,
  scatterChartType,
  bubbleChartType,
  radarChartType,
  candlestickChartType,
  waterfallChartType,
  funnelChartType,
  gaugeChartType,
  sparklineChartType,
  heatmapChartType,
  boxplotChartType,
  histogramChartType,
  treemapChartType,
  polarChartType,
  radialBarChartType,
  lollipopChartType,
  bulletChartType,
  dumbbellChartType,
  calendarChartType,
  comboChartType,
  sankeyChartType,
  sunburstChartType,
  treeChartType,
  graphChartType,
  parallelChartType,
  themeRiverChartType,
  pictorialBarChartType,
  chordChartType,
  geoChartType,
  linesChartType,
  matrixChartType,
  ohlcChartType,
  stepChartType,
  volumeChartType,
  rangeChartType,
  baselineChartType,
  kagiChartType,
  renkoChartType,
  violinChartType,
  packChartType,
  voronoiChartType,
  wordcloudChartType,
  pillarChartType,
  ganttChartType,
  orgChartType,
  flowChartType,
  paretoChartType,
} from "@chartts/core";
import type { ChartTypePlugin, ChartData } from "@chartts/core";

export const chartTypes: Record<string, ChartTypePlugin> = {
  line: lineChartType,
  bar: barChartType,
  "stacked-bar": stackedBarChartType,
  "horizontal-bar": horizontalBarChartType,
  area: areaChartType,
  pie: pieChartType,
  donut: donutChartType,
  scatter: scatterChartType,
  bubble: bubbleChartType,
  radar: radarChartType,
  candlestick: candlestickChartType,
  waterfall: waterfallChartType,
  funnel: funnelChartType,
  gauge: gaugeChartType,
  sparkline: sparklineChartType,
  heatmap: heatmapChartType,
  boxplot: boxplotChartType,
  histogram: histogramChartType,
  treemap: treemapChartType,
  polar: polarChartType,
  "radial-bar": radialBarChartType,
  lollipop: lollipopChartType,
  bullet: bulletChartType,
  dumbbell: dumbbellChartType,
  calendar: calendarChartType,
  combo: comboChartType,
  sankey: sankeyChartType,
  sunburst: sunburstChartType,
  tree: treeChartType,
  graph: graphChartType,
  parallel: parallelChartType,
  themeriver: themeRiverChartType,
  pictorialbar: pictorialBarChartType,
  chord: chordChartType,
  geo: geoChartType,
  lines: linesChartType,
  matrix: matrixChartType,
  ohlc: ohlcChartType,
  step: stepChartType,
  volume: volumeChartType,
  range: rangeChartType,
  baseline: baselineChartType,
  kagi: kagiChartType,
  renko: renkoChartType,
  violin: violinChartType,
  pack: packChartType,
  voronoi: voronoiChartType,
  wordcloud: wordcloudChartType,
  pillar: pillarChartType,
  gantt: ganttChartType,
  org: orgChartType,
  flow: flowChartType,
  pareto: paretoChartType,
};

// Sample data for each chart type
export const sampleData: Record<string, ChartData> = {
  line: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    series: [
      { name: "Revenue", values: [4200, 5800, 7100, 6400, 8200, 9600] },
    ],
  },
  bar: {
    labels: ["Q1", "Q2", "Q3", "Q4"],
    series: [
      { name: "Sales", values: [120, 180, 150, 220] },
      { name: "Costs", values: [80, 110, 95, 140] },
    ],
  },
  "stacked-bar": {
    labels: ["Q1", "Q2", "Q3", "Q4"],
    series: [
      { name: "Product A", values: [40, 55, 60, 70] },
      { name: "Product B", values: [30, 45, 35, 50] },
      { name: "Product C", values: [20, 30, 40, 35] },
    ],
  },
  "horizontal-bar": {
    labels: ["Engineering", "Marketing", "Sales", "Design", "Support"],
    series: [{ name: "Headcount", values: [42, 28, 35, 18, 22] }],
  },
  area: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    series: [
      { name: "Traffic", values: [1200, 1800, 1500, 2200, 1900] },
    ],
  },
  pie: {
    labels: ["Product", "Services", "Support", "Other"],
    series: [{ name: "Revenue", values: [45, 30, 15, 10] }],
  },
  donut: {
    labels: ["Desktop", "Mobile", "Tablet"],
    series: [{ name: "Traffic", values: [55, 35, 10] }],
  },
  scatter: {
    labels: ["A", "B", "C", "D", "E", "F", "G", "H"],
    series: [
      { name: "Group A", values: [10, 25, 18, 30, 22, 35, 28, 40] },
    ],
  },
  bubble: {
    labels: ["A", "B", "C", "D", "E"],
    series: [
      { name: "Dataset", values: [15, 30, 22, 45, 28] },
    ],
  },
  radar: {
    labels: ["Speed", "Power", "Accuracy", "Defense", "Stamina"],
    series: [
      { name: "Player A", values: [80, 65, 90, 70, 85] },
    ],
  },
  candlestick: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    series: [
      { name: "Open", values: [100, 105, 102, 108, 106] },
      { name: "High", values: [108, 110, 109, 112, 115] },
      { name: "Low", values: [98, 102, 100, 105, 104] },
      { name: "Close", values: [105, 102, 108, 106, 112] },
    ],
  },
  waterfall: {
    labels: ["Revenue", "COGS", "Gross", "OpEx", "Net"],
    series: [{ name: "Flow", values: [100, -40, 60, -25, 35] }],
  },
  funnel: {
    labels: ["Visitors", "Leads", "Qualified", "Proposals", "Closed"],
    series: [{ name: "Pipeline", values: [1000, 600, 400, 200, 80] }],
  },
  gauge: {
    labels: ["Score"],
    series: [{ name: "Performance", values: [76] }],
  },
  sparkline: {
    labels: ["1", "2", "3", "4", "5", "6", "7", "8"],
    series: [{ name: "Trend", values: [4, 8, 6, 12, 9, 14, 11, 16] }],
  },
  heatmap: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    series: [
      { name: "Week 1", values: [3, 7, 2, 8, 5, 1, 4] },
      { name: "Week 2", values: [6, 4, 9, 3, 7, 2, 5] },
      { name: "Week 3", values: [1, 8, 5, 6, 2, 9, 3] },
      { name: "Week 4", values: [7, 2, 4, 9, 6, 3, 8] },
    ],
  },
  boxplot: {
    labels: ["Q1", "Q2", "Q3", "Q4"],
    series: [
      { name: "Min", values: [10, 15, 12, 18] },
      { name: "Q1", values: [25, 28, 22, 30] },
      { name: "Median", values: [35, 40, 32, 42] },
      { name: "Q3", values: [45, 52, 48, 55] },
      { name: "Max", values: [60, 65, 58, 70] },
    ],
  },
  histogram: {
    labels: ["0-10", "10-20", "20-30", "30-40", "40-50", "50-60", "60-70", "70-80"],
    series: [{ name: "Frequency", values: [5, 12, 28, 42, 35, 20, 10, 3] }],
  },
  treemap: {
    labels: ["Tech", "Finance", "Health", "Energy", "Consumer", "Industrial"],
    series: [{ name: "Market Cap", values: [45, 25, 15, 8, 5, 2] }],
  },
  polar: {
    labels: ["N", "NE", "E", "SE", "S", "SW", "W", "NW"],
    series: [{ name: "Wind", values: [8, 12, 6, 4, 10, 14, 7, 9] }],
  },
  "radial-bar": {
    labels: ["Progress", "Goals", "Tasks"],
    series: [{ name: "Completion", values: [85, 62, 94] }],
  },
  lollipop: {
    labels: ["A", "B", "C", "D", "E", "F"],
    series: [{ name: "Score", values: [72, 88, 45, 92, 68, 81] }],
  },
  bullet: {
    labels: ["Revenue"],
    series: [
      { name: "Actual", values: [270] },
      { name: "Target", values: [300] },
    ],
  },
  dumbbell: {
    labels: ["2023", "2024", "2025"],
    series: [
      { name: "Start", values: [20, 35, 50] },
      { name: "End", values: [45, 60, 80] },
    ],
  },
  calendar: {
    labels: [
      "2025-01-06", "2025-01-07", "2025-01-08", "2025-01-09", "2025-01-10",
      "2025-01-13", "2025-01-14", "2025-01-15", "2025-01-16", "2025-01-17",
      "2025-01-20", "2025-01-21", "2025-01-22", "2025-01-23", "2025-01-24",
      "2025-01-27", "2025-01-28", "2025-01-29", "2025-01-30", "2025-01-31",
    ],
    series: [{ name: "Commits", values: [5, 12, 3, 8, 15, 2, 9, 14, 6, 11, 7, 1, 10, 13, 4, 8, 3, 16, 5, 9] }],
  },
  combo: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    series: [
      { name: "Revenue", values: [4200, 5800, 7100, 6400, 8200, 9600] },
      { name: "Profit", values: [1200, 1800, 2100, 1900, 2800, 3200] },
    ],
  },
  sankey: {
    labels: ["Source A", "Source B", "Process", "Output X", "Output Y"],
    series: [
      { name: "Flow", values: [40, 30, 70, 45, 25] },
    ],
  },
  sunburst: {
    labels: ["Root", "A", "B", "A1", "A2", "B1", "B2"],
    series: [{ name: "Size", values: [100, 40, 60, 20, 20, 35, 25] }],
  },
  tree: {
    labels: ["CEO", "CTO", "CFO", "VP Eng", "VP Sales", "Dev Lead"],
    series: [{ name: "Org", values: [1, 2, 2, 3, 3, 4] }],
  },
  graph: {
    labels: ["Node A", "Node B", "Node C", "Node D", "Node E"],
    series: [
      { name: "Sizes", values: [10, 20, 15, 25, 18] },
      { name: "Node A \u2192 Node B", values: [5] },
      { name: "Node A \u2192 Node C", values: [3] },
      { name: "Node B \u2192 Node D", values: [8] },
      { name: "Node C \u2192 Node D", values: [4] },
      { name: "Node D \u2192 Node E", values: [6] },
      { name: "Node B \u2192 Node E", values: [2] },
    ],
  },
  parallel: {
    labels: ["Speed", "Cost", "Quality", "Reliability", "Scale"],
    series: [
      { name: "Option A", values: [80, 40, 90, 70, 60] },
      { name: "Option B", values: [60, 80, 70, 85, 90] },
    ],
  },
  themeriver: {
    labels: ["2020", "2021", "2022", "2023", "2024", "2025"],
    series: [
      { name: "React", values: [40, 45, 50, 48, 52, 55] },
      { name: "Vue", values: [20, 25, 28, 30, 32, 30] },
      { name: "Svelte", values: [5, 8, 12, 18, 22, 28] },
    ],
  },
  pictorialbar: {
    labels: ["Energy", "Water", "Food", "Transport"],
    series: [{ name: "Consumption", values: [85, 62, 78, 45] }],
  },
  chord: {
    labels: ["A", "B", "C", "D"],
    series: [
      { name: "Flows", values: [20, 30, 15, 25] },
    ],
  },
  geo: {
    labels: ["US", "UK", "DE", "JP", "BR"],
    series: [{ name: "Users", values: [45000, 12000, 8000, 15000, 6000] }],
  },
  lines: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    series: [
      { name: "Series A", values: [10, 25, 18, 32, 28, 40] },
      { name: "Series B", values: [5, 15, 22, 18, 35, 30] },
      { name: "Series C", values: [20, 12, 30, 25, 15, 35] },
    ],
  },
  matrix: {
    labels: ["A", "B", "C", "D", "E"],
    series: [
      { name: "Row 1", values: [1, 0.8, 0.3, 0.5, 0.2] },
      { name: "Row 2", values: [0.8, 1, 0.6, 0.4, 0.7] },
      { name: "Row 3", values: [0.3, 0.6, 1, 0.9, 0.5] },
    ],
  },
  ohlc: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    series: [
      { name: "Open", values: [100, 105, 102, 108, 106] },
      { name: "High", values: [108, 110, 109, 112, 115] },
      { name: "Low", values: [98, 102, 100, 105, 104] },
      { name: "Close", values: [105, 102, 108, 106, 112] },
    ],
  },
  step: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    series: [{ name: "Price", values: [10, 10, 15, 15, 20, 25] }],
  },
  volume: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    series: [{ name: "Volume", values: [1200000, 1800000, 950000, 2400000, 1600000] }],
  },
  range: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    series: [
      { name: "Low", values: [5, 8, 12, 15, 18, 20] },
      { name: "High", values: [15, 20, 25, 28, 30, 35] },
    ],
  },
  baseline: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    series: [{ name: "Returns", values: [5, -3, 8, -2, 12, -5] }],
  },
  kagi: {
    labels: ["1", "2", "3", "4", "5", "6", "7", "8"],
    series: [{ name: "Price", values: [100, 105, 98, 110, 103, 115, 108, 120] }],
  },
  renko: {
    labels: ["1", "2", "3", "4", "5", "6", "7", "8"],
    series: [{ name: "Price", values: [100, 104, 108, 105, 110, 114, 118, 115] }],
  },
  violin: {
    labels: ["Group A", "Group B", "Group C", "Group D"],
    series: [
      { name: "Min", values: [10, 15, 8, 12] },
      { name: "Q1", values: [25, 30, 20, 28] },
      { name: "Median", values: [40, 42, 35, 45] },
      { name: "Q3", values: [55, 58, 50, 60] },
      { name: "Max", values: [70, 72, 65, 75] },
    ],
  },
  pack: {
    labels: ["React", "Vue", "Angular", "Svelte", "Solid", "Preact", "Lit", "Alpine"],
    series: [{ name: "Stars", values: [220, 210, 95, 78, 32, 36, 18, 28] }],
  },
  voronoi: {
    labels: ["Alpha", "Beta", "Gamma", "Delta", "Epsilon", "Zeta", "Eta", "Theta"],
    series: [{ name: "Value", values: [42, 78, 35, 90, 55, 68, 25, 82] }],
  },
  wordcloud: {
    labels: ["JavaScript", "TypeScript", "React", "Node", "CSS", "HTML", "Python", "Rust", "Go", "SQL", "GraphQL", "Docker"],
    series: [{ name: "Mentions", values: [100, 85, 80, 65, 60, 55, 50, 40, 35, 45, 30, 25] }],
  },
  pillar: {
    labels: ["Storage", "Compute", "Network", "Security", "Database"],
    series: [{ name: "Usage", values: [85, 62, 45, 78, 55] }],
  },
  gantt: {
    labels: ["Design", "Frontend", "Backend", "Testing", "Launch"],
    series: [
      { name: "Start", values: [0, 10, 15, 40, 55] },
      { name: "End", values: [15, 40, 45, 55, 58] },
      { name: "Progress", values: [100, 75, 60, 20, 0] },
    ],
  },
  org: {
    labels: ["CEO", "CEO/CTO", "CEO/CFO", "CEO/CTO/VP Eng", "CEO/CTO/VP Design", "CEO/CFO/Controller"],
    series: [{ name: "Org", values: [1, 1, 1, 1, 1, 1] }],
  },
  flow: {
    labels: ["Start", "Get Data", "[Valid?]", "Process", "Show Error", "Done"],
    series: [
      { name: "Start -> Get Data", values: [1] },
      { name: "Get Data -> [Valid?]", values: [1] },
      { name: "[Valid?] -> Process", values: [1] },
      { name: "[Valid?] -> Show Error", values: [1] },
      { name: "Process -> Done", values: [1] },
    ],
  },
  pareto: {
    labels: ["UI Bugs", "API Errors", "Performance", "Auth Issues", "Data Loss", "Other"],
    series: [{ name: "Defects", values: [45, 32, 18, 12, 8, 5] }],
  },
};

// Display names for chart types
export const chartDisplayNames: Record<string, string> = {
  line: "Line",
  bar: "Bar",
  "stacked-bar": "Stacked Bar",
  "horizontal-bar": "Horizontal Bar",
  area: "Area",
  pie: "Pie",
  donut: "Donut",
  scatter: "Scatter",
  bubble: "Bubble",
  radar: "Radar",
  candlestick: "Candlestick",
  waterfall: "Waterfall",
  funnel: "Funnel",
  gauge: "Gauge",
  sparkline: "Sparkline",
  heatmap: "Heatmap",
  boxplot: "Box Plot",
  histogram: "Histogram",
  treemap: "Treemap",
  polar: "Polar",
  "radial-bar": "Radial Bar",
  lollipop: "Lollipop",
  bullet: "Bullet",
  dumbbell: "Dumbbell",
  calendar: "Calendar",
  combo: "Combo",
  sankey: "Sankey",
  sunburst: "Sunburst",
  tree: "Tree",
  graph: "Graph / Network",
  parallel: "Parallel Coordinates",
  themeriver: "Theme River",
  pictorialbar: "Pictorial Bar",
  chord: "Chord",
  geo: "Geo Map",
  lines: "Multi-Line",
  matrix: "Matrix",
  ohlc: "OHLC",
  step: "Step Line",
  volume: "Volume",
  range: "Range Area",
  baseline: "Baseline",
  kagi: "Kagi",
  renko: "Renko",
  violin: "Violin Plot",
  pack: "Circle Packing",
  voronoi: "Voronoi",
  wordcloud: "Word Cloud",
  pillar: "Pillar",
  gantt: "Gantt",
  org: "Org Chart",
  flow: "Flow Chart",
  pareto: "Pareto",
};

export function renderChart(
  type: string,
  options: {
    width?: number;
    height?: number;
    theme?: string;
    data?: ChartData;
  } = {}
): string | null {
  const chartType = chartTypes[type];
  if (!chartType) return null;

  const data = options.data ?? sampleData[type];
  if (!data) return null;

  try {
    return renderToString(chartType, data, {
      width: options.width ?? 400,
      height: options.height ?? 250,
      theme: (options.theme as "dark" | "light") ?? "dark",
    });
  } catch {
    return null;
  }
}
