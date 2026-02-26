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
    labels: ["2025-01-01", "2025-01-15", "2025-02-01", "2025-02-15", "2025-03-01"],
    series: [{ name: "Commits", values: [5, 12, 3, 8, 15] }],
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
