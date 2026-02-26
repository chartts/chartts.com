import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CodeBlock } from "@/lib/highlight";

const chartDocs: Record<
  string,
  {
    name: string;
    description: string;
    props: { name: string; type: string; description: string }[];
    usage: string;
    features: string[];
  }
> = {
  line: {
    name: "Line Chart",
    description:
      "Plot continuous data as connected points. Ideal for time series, trends, and comparisons across a continuous axis.",
    props: [
      { name: "data", type: "T[]", description: "Array of data objects" },
      { name: "x", type: "keyof T", description: "Key for the x-axis values" },
      { name: "y", type: "keyof T | (keyof T)[]", description: "Key(s) for y-axis values. Pass an array for multi-line." },
      { name: "curve", type: "'linear' | 'monotone' | 'step' | 'natural'", description: "Interpolation method between points. Default: 'monotone'" },
      { name: "area", type: "boolean", description: "Fill area under the line. Default: false" },
      { name: "dots", type: "boolean", description: "Show data point markers. Default: true" },
      { name: "animate", type: "boolean", description: "Enable line draw animation. Default: true" },
    ],
    usage: `import { LineChart } from "@chartts/react"

<LineChart
  data={salesData}
  x="month"
  y="revenue"
  curve="monotone"
  area
  className="h-64"
/>`,
    features: [
      "Multiple lines with automatic legend",
      "Area fill with gradient support",
      "Configurable curve interpolation",
      "Animated line drawing on mount",
      "Interactive tooltips with crosshair",
      "Zoom and pan support",
    ],
  },
  bar: {
    name: "Bar Chart",
    description:
      "Compare categorical data with rectangular bars. Supports vertical, horizontal, stacked, and grouped layouts.",
    props: [
      { name: "data", type: "T[]", description: "Array of data objects" },
      { name: "x", type: "keyof T", description: "Key for category labels" },
      { name: "y", type: "keyof T | (keyof T)[]", description: "Key(s) for bar values" },
      { name: "stacked", type: "boolean", description: "Stack bars for multi-series. Default: false" },
      { name: "horizontal", type: "boolean", description: "Render horizontal bars. Default: false" },
      { name: "groupPadding", type: "number", description: "Padding between groups. 0-1. Default: 0.2" },
      { name: "barPadding", type: "number", description: "Padding between bars in a group. 0-1. Default: 0.1" },
      { name: "radius", type: "number", description: "Border radius for bar corners. Default: 4" },
    ],
    usage: `import { BarChart } from "@chartts/react"

<BarChart
  data={quarterlyData}
  x="quarter"
  y={["revenue", "expenses"]}
  stacked
  radius={6}
/>`,
    features: [
      "Vertical and horizontal layouts",
      "Stacked and grouped modes",
      "Rounded bar corners",
      "Animated entry with stagger",
      "Value labels on bars",
      "Automatic color assignment",
    ],
  },
  area: {
    name: "Area Chart",
    description:
      "Show quantitative data over a continuous interval with filled regions. Great for cumulative values and volume comparisons.",
    props: [
      { name: "data", type: "T[]", description: "Array of data objects" },
      { name: "x", type: "keyof T", description: "Key for x-axis values" },
      { name: "y", type: "keyof T | (keyof T)[]", description: "Key(s) for area values" },
      { name: "stacked", type: "boolean", description: "Stack areas. Default: false" },
      { name: "curve", type: "'linear' | 'monotone' | 'step' | 'natural'", description: "Curve type. Default: 'monotone'" },
      { name: "gradient", type: "boolean", description: "Apply vertical gradient fill. Default: true" },
      { name: "opacity", type: "number", description: "Fill opacity. 0-1. Default: 0.3" },
    ],
    usage: `import { AreaChart } from "@chartts/react"

<AreaChart
  data={trafficData}
  x="date"
  y={["pageViews", "uniqueVisitors"]}
  stacked
  gradient
/>`,
    features: [
      "Stacked and overlapping modes",
      "Gradient fills with configurable opacity",
      "Smooth curve interpolation",
      "Baseline support (zero, min, wiggle)",
      "Interactive hover crosshair",
      "Animated reveal on mount",
    ],
  },
  pie: {
    name: "Pie / Donut Chart",
    description:
      "Show proportional data as circular segments. Toggle between pie and donut with a single prop.",
    props: [
      { name: "data", type: "T[]", description: "Array of data objects" },
      { name: "value", type: "keyof T", description: "Key for segment values" },
      { name: "label", type: "keyof T", description: "Key for segment labels" },
      { name: "donut", type: "boolean", description: "Render as donut. Default: false" },
      { name: "innerRadius", type: "number", description: "Inner radius for donut. 0-1. Default: 0.6" },
      { name: "padAngle", type: "number", description: "Padding between segments in degrees. Default: 1" },
      { name: "cornerRadius", type: "number", description: "Corner radius for segments. Default: 4" },
    ],
    usage: `import { PieChart } from "@chartts/react"

<PieChart
  data={budgetData}
  value="amount"
  label="category"
  donut
  innerRadius={0.65}
  padAngle={2}
/>`,
    features: [
      "Pie and donut modes",
      "Interactive segment selection",
      "Label placement (inside, outside, none)",
      "Animated segment entry",
      "Center label for donut charts",
      "Custom color per segment",
    ],
  },
  scatter: {
    name: "Scatter Chart",
    description:
      "Plot individual data points on two axes. Reveal correlations, clusters, and outliers in your data.",
    props: [
      { name: "data", type: "T[]", description: "Array of data objects" },
      { name: "x", type: "keyof T", description: "Key for x-axis values" },
      { name: "y", type: "keyof T", description: "Key for y-axis values" },
      { name: "size", type: "keyof T | number", description: "Point size - fixed number or data key" },
      { name: "color", type: "keyof T | string", description: "Point color - fixed or data key for color scale" },
      { name: "shape", type: "'circle' | 'square' | 'triangle' | 'diamond'", description: "Point shape. Default: 'circle'" },
    ],
    usage: `import { ScatterChart } from "@chartts/react"

<ScatterChart
  data={measurements}
  x="height"
  y="weight"
  size="age"
  color="group"
/>`,
    features: [
      "Multiple data series with legend",
      "Size encoding (bubble-like)",
      "Color encoding with scales",
      "Trend line / regression line",
      "Zoom and pan",
      "Point selection and brushing",
    ],
  },
  bubble: {
    name: "Bubble Chart",
    description:
      "Extend scatter plots with a third dimension encoded as bubble size. Compare three variables simultaneously.",
    props: [
      { name: "data", type: "T[]", description: "Array of data objects" },
      { name: "x", type: "keyof T", description: "Key for x-axis values" },
      { name: "y", type: "keyof T", description: "Key for y-axis values" },
      { name: "size", type: "keyof T", description: "Key for bubble size values" },
      { name: "color", type: "keyof T | string", description: "Color key or fixed color" },
      { name: "minRadius", type: "number", description: "Minimum bubble radius in px. Default: 4" },
      { name: "maxRadius", type: "number", description: "Maximum bubble radius in px. Default: 40" },
    ],
    usage: `import { BubbleChart } from "@chartts/react"

<BubbleChart
  data={countries}
  x="gdpPerCapita"
  y="lifeExpectancy"
  size="population"
  color="continent"
/>`,
    features: [
      "Three-dimensional data encoding",
      "Automatic size scaling",
      "Color scales for categories",
      "Overlap avoidance",
      "Interactive tooltips per bubble",
      "Animated entry",
    ],
  },
  radar: {
    name: "Radar Chart",
    description:
      "Compare multiple variables on a radial layout. Ideal for skill assessments, performance profiles, and multi-attribute comparisons.",
    props: [
      { name: "data", type: "T[]", description: "Array of data objects" },
      { name: "axes", type: "(keyof T)[]", description: "Keys for each spoke axis" },
      { name: "fill", type: "boolean", description: "Fill the area. Default: true" },
      { name: "fillOpacity", type: "number", description: "Opacity of filled area. Default: 0.15" },
      { name: "gridLevels", type: "number", description: "Number of concentric grid rings. Default: 5" },
    ],
    usage: `import { RadarChart } from "@chartts/react"

<RadarChart
  data={[teamStats]}
  axes={["speed", "power", "accuracy", "defense", "stamina"]}
  fill
/>`,
    features: [
      "Multiple series overlay",
      "Configurable grid levels",
      "Filled or outline mode",
      "Interactive axis highlighting",
      "Custom axis labels and scales",
      "Animated draw-in",
    ],
  },
  candlestick: {
    name: "Candlestick Chart",
    description:
      "Visualize financial OHLC data (Open, High, Low, Close). Essential for stock and crypto market analysis.",
    props: [
      { name: "data", type: "T[]", description: "Array of OHLC data objects" },
      { name: "x", type: "keyof T", description: "Key for time/date axis" },
      { name: "open", type: "keyof T", description: "Key for open values" },
      { name: "high", type: "keyof T", description: "Key for high values" },
      { name: "low", type: "keyof T", description: "Key for low values" },
      { name: "close", type: "keyof T", description: "Key for close values" },
      { name: "upColor", type: "string", description: "Color for up candles. Default: '#10b981'" },
      { name: "downColor", type: "string", description: "Color for down candles. Default: '#ef4444'" },
    ],
    usage: `import { CandlestickChart } from "@chartts/react"

<CandlestickChart
  data={stockData}
  x="date"
  open="open"
  high="high"
  low="low"
  close="close"
/>`,
    features: [
      "Standard OHLC candlestick rendering",
      "Up/down color customization",
      "Volume overlay support",
      "Zoom and pan for time navigation",
      "Crosshair with price labels",
      "Real-time data streaming",
    ],
  },
  waterfall: {
    name: "Waterfall Chart",
    description:
      "Show how an initial value is affected by positive and negative changes. Perfect for financial breakdowns and variance analysis.",
    props: [
      { name: "data", type: "T[]", description: "Array of data objects" },
      { name: "x", type: "keyof T", description: "Key for category labels" },
      { name: "y", type: "keyof T", description: "Key for values" },
      { name: "total", type: "keyof T", description: "Key for boolean indicating total bars" },
      { name: "upColor", type: "string", description: "Color for increases. Default: '#10b981'" },
      { name: "downColor", type: "string", description: "Color for decreases. Default: '#ef4444'" },
      { name: "totalColor", type: "string", description: "Color for total bars. Default: '#22d3ee'" },
    ],
    usage: `import { WaterfallChart } from "@chartts/react"

<WaterfallChart
  data={profitBreakdown}
  x="category"
  y="amount"
  total="isTotal"
/>`,
    features: [
      "Automatic running total calculation",
      "Distinct colors for increase/decrease/total",
      "Connector lines between bars",
      "Value labels on each segment",
      "Horizontal layout option",
      "Animated cascade entry",
    ],
  },
  funnel: {
    name: "Funnel Chart",
    description:
      "Visualize progressive reduction through stages. Ideal for sales pipelines, conversion flows, and process analysis.",
    props: [
      { name: "data", type: "T[]", description: "Array of data objects (ordered by stage)" },
      { name: "value", type: "keyof T", description: "Key for stage values" },
      { name: "label", type: "keyof T", description: "Key for stage labels" },
      { name: "direction", type: "'vertical' | 'horizontal'", description: "Layout direction. Default: 'vertical'" },
      { name: "gap", type: "number", description: "Gap between stages in px. Default: 2" },
      { name: "pinch", type: "number", description: "How much each stage narrows. 0-1. Default: auto" },
    ],
    usage: `import { FunnelChart } from "@chartts/react"

<FunnelChart
  data={salesPipeline}
  value="count"
  label="stage"
/>`,
    features: [
      "Automatic proportional sizing",
      "Conversion rate labels",
      "Vertical and horizontal layouts",
      "Custom colors per stage",
      "Animated entry per stage",
      "Interactive stage selection",
    ],
  },
  gauge: {
    name: "Gauge Chart",
    description:
      "Display a single metric as a dial or arc. Perfect for KPIs, progress indicators, and performance metrics.",
    props: [
      { name: "value", type: "number", description: "Current value" },
      { name: "min", type: "number", description: "Minimum value. Default: 0" },
      { name: "max", type: "number", description: "Maximum value. Default: 100" },
      { name: "label", type: "string", description: "Label text below the value" },
      { name: "arc", type: "number", description: "Arc angle in degrees. Default: 240" },
      { name: "thickness", type: "number", description: "Track thickness in px. Default: 20" },
      { name: "ranges", type: "{ min: number; max: number; color: string }[]", description: "Color ranges for the track" },
    ],
    usage: `import { GaugeChart } from "@chartts/react"

<GaugeChart
  value={76}
  max={100}
  label="Performance"
  ranges={[
    { min: 0, max: 50, color: "#ef4444" },
    { min: 50, max: 75, color: "#f59e0b" },
    { min: 75, max: 100, color: "#10b981" },
  ]}
/>`,
    features: [
      "Configurable arc angle",
      "Color ranges for thresholds",
      "Animated value changes",
      "Center label with value display",
      "Multiple gauge sizes",
      "Needle or arc fill modes",
    ],
  },
  sparkline: {
    name: "Sparkline",
    description:
      "Inline mini-charts for tables, dashboards, and text. Compact data visualization without axes or labels.",
    props: [
      { name: "data", type: "number[]", description: "Array of numeric values" },
      { name: "type", type: "'line' | 'bar' | 'area'", description: "Sparkline variant. Default: 'line'" },
      { name: "color", type: "string", description: "Stroke/fill color. Default: '#22d3ee'" },
      { name: "width", type: "number", description: "Width in px. Default: 100" },
      { name: "height", type: "number", description: "Height in px. Default: 24" },
      { name: "showEndDot", type: "boolean", description: "Show dot on last point. Default: true" },
    ],
    usage: `import { Sparkline } from "@chartts/react"

<table>
  <tr>
    <td>Revenue</td>
    <td>$48.2k</td>
    <td><Sparkline data={[4,8,6,12,9,14]} /></td>
  </tr>
</table>`,
    features: [
      "Line, bar, and area variants",
      "Inline with text flow",
      "Responsive scaling",
      "End-point marker",
      "Min/max highlighting",
      "Band/range overlay",
    ],
  },
  "stacked-bar": {
    name: "Stacked Bar Chart",
    description: "Compare composition across categories with stacked bars. Each bar shows the total, with segments representing parts of the whole.",
    props: [
      { name: "data", type: "T[]", description: "Array of data objects" },
      { name: "x", type: "keyof T", description: "Key for category labels" },
      { name: "y", type: "(keyof T)[]", description: "Keys for stacked values" },
      { name: "normalized", type: "boolean", description: "Normalize to 100%. Default: false" },
      { name: "radius", type: "number", description: "Border radius for bar corners. Default: 4" },
    ],
    usage: `import { StackedBarChart } from "@chartts/react"

<StackedBarChart
  data={quarterlyData}
  x="quarter"
  y={["productA", "productB", "productC"]}
  radius={6}
/>`,
    features: ["Absolute and normalized (100%) modes", "Automatic legend", "Value labels per segment", "Animated stagger entry", "Horizontal layout option", "Custom color per series"],
  },
  "horizontal-bar": {
    name: "Horizontal Bar Chart",
    description: "Horizontal bars for long category labels and ranking comparisons. Data flows left to right.",
    props: [
      { name: "data", type: "T[]", description: "Array of data objects" },
      { name: "x", type: "keyof T", description: "Key for category labels" },
      { name: "y", type: "keyof T", description: "Key for bar values" },
      { name: "sorted", type: "boolean", description: "Sort bars by value. Default: false" },
      { name: "radius", type: "number", description: "Border radius. Default: 4" },
    ],
    usage: `import { HorizontalBarChart } from "@chartts/react"

<HorizontalBarChart
  data={teamData}
  x="department"
  y="headcount"
  sorted
/>`,
    features: ["Automatic label alignment", "Sort by value ascending/descending", "Value labels at bar end", "Grouped variant", "Animated entry", "Responsive label truncation"],
  },
  donut: {
    name: "Donut Chart",
    description: "A pie chart with a center cutout. Perfect for displaying a key metric in the center while showing proportional data around it.",
    props: [
      { name: "data", type: "T[]", description: "Array of data objects" },
      { name: "value", type: "keyof T", description: "Key for segment values" },
      { name: "label", type: "keyof T", description: "Key for segment labels" },
      { name: "innerRadius", type: "number", description: "Inner radius ratio. 0-1. Default: 0.6" },
      { name: "centerLabel", type: "string | ReactNode", description: "Content displayed in the center" },
      { name: "padAngle", type: "number", description: "Padding between segments. Default: 2" },
    ],
    usage: `import { DonutChart } from "@chartts/react"

<DonutChart
  data={trafficData}
  value="visitors"
  label="source"
  centerLabel="1.2M"
/>`,
    features: ["Center label/metric display", "Interactive segment hover", "Custom inner radius", "Animated reveal", "Auto-positioned outside labels", "Responsive sizing"],
  },
  heatmap: {
    name: "Heatmap",
    description: "Show density or intensity across two dimensions using color. Great for time patterns, correlation matrices, and activity tracking.",
    props: [
      { name: "data", type: "T[]", description: "Array of data objects" },
      { name: "x", type: "keyof T", description: "Key for x categories" },
      { name: "y", type: "keyof T", description: "Key for y categories" },
      { name: "value", type: "keyof T", description: "Key for cell values" },
      { name: "colorScale", type: "string[]", description: "Color range from low to high" },
      { name: "cellRadius", type: "number", description: "Cell border radius. Default: 2" },
    ],
    usage: `import { HeatmapChart } from "@chartts/react"

<HeatmapChart
  data={activityData}
  x="day"
  y="hour"
  value="commits"
  colorScale={["#0f172a", "#06b6d4"]}
/>`,
    features: ["Configurable color scales", "Cell labels", "Tooltip with values", "Responsive cell sizing", "Row/column sorting", "GitHub-style contribution grid"],
  },
  boxplot: {
    name: "Box Plot",
    description: "Show statistical distribution of data: median, quartiles, and outliers. Essential for comparing distributions across categories.",
    props: [
      { name: "data", type: "T[]", description: "Array of data objects with statistical values" },
      { name: "x", type: "keyof T", description: "Key for categories" },
      { name: "min", type: "keyof T", description: "Key for minimum values" },
      { name: "q1", type: "keyof T", description: "Key for first quartile" },
      { name: "median", type: "keyof T", description: "Key for median values" },
      { name: "q3", type: "keyof T", description: "Key for third quartile" },
      { name: "max", type: "keyof T", description: "Key for maximum values" },
    ],
    usage: `import { BoxplotChart } from "@chartts/react"

<BoxplotChart
  data={distributionData}
  x="category"
  min="min" q1="q1" median="median" q3="q3" max="max"
/>`,
    features: ["Whisker and box rendering", "Outlier point display", "Horizontal layout", "Notched variant", "Interactive quartile tooltips", "Animated entry"],
  },
  histogram: {
    name: "Histogram",
    description: "Show frequency distribution of continuous data. Automatically bins data into ranges and displays as bars.",
    props: [
      { name: "data", type: "number[] | T[]", description: "Raw values or objects" },
      { name: "value", type: "keyof T", description: "Key for values (if object array)" },
      { name: "bins", type: "number", description: "Number of bins. Default: auto" },
      { name: "color", type: "string", description: "Bar color. Default: '#06b6d4'" },
      { name: "cumulative", type: "boolean", description: "Show cumulative line. Default: false" },
    ],
    usage: `import { HistogramChart } from "@chartts/react"

<HistogramChart
  data={measurements}
  value="temperature"
  bins={20}
  cumulative
/>`,
    features: ["Automatic bin calculation", "Manual bin count override", "Cumulative distribution overlay", "Density curve option", "Custom bin boundaries", "Animated bar entry"],
  },
  treemap: {
    name: "Treemap",
    description: "Visualize hierarchical data as nested rectangles. Area represents magnitude. Great for showing proportions within a hierarchy.",
    props: [
      { name: "data", type: "TreeNode[]", description: "Hierarchical data structure" },
      { name: "value", type: "keyof T", description: "Key for area sizing" },
      { name: "label", type: "keyof T", description: "Key for cell labels" },
      { name: "color", type: "keyof T | string", description: "Color key or fixed color" },
      { name: "padding", type: "number", description: "Padding between cells. Default: 2" },
    ],
    usage: `import { TreemapChart } from "@chartts/react"

<TreemapChart
  data={marketData}
  value="marketCap"
  label="company"
  color="sector"
/>`,
    features: ["Nested hierarchies", "Squarified layout algorithm", "Cell labels with auto-sizing", "Color by category or value", "Interactive drill-down", "Animated transitions"],
  },
  polar: {
    name: "Polar Chart",
    description: "Plot data on a circular coordinate system. Useful for cyclical data like wind direction, time-of-day patterns, and directional measurements.",
    props: [
      { name: "data", type: "T[]", description: "Array of data objects" },
      { name: "angle", type: "keyof T", description: "Key for angle axis" },
      { name: "radius", type: "keyof T", description: "Key for radius values" },
      { name: "fill", type: "boolean", description: "Fill sectors. Default: true" },
      { name: "startAngle", type: "number", description: "Starting angle in degrees. Default: 0" },
    ],
    usage: `import { PolarChart } from "@chartts/react"

<PolarChart
  data={windData}
  angle="direction"
  radius="speed"
  fill
/>`,
    features: ["Sector and line modes", "Configurable start angle", "Multiple series overlay", "Grid circles and spokes", "Interactive sector selection", "Wind rose variant"],
  },
  "radial-bar": {
    name: "Radial Bar Chart",
    description: "Circular progress bars for comparing values. Each bar wraps around the center, making it easy to compare completion levels.",
    props: [
      { name: "data", type: "T[]", description: "Array of data objects" },
      { name: "value", type: "keyof T", description: "Key for bar values" },
      { name: "label", type: "keyof T", description: "Key for labels" },
      { name: "max", type: "number", description: "Maximum value. Default: 100" },
      { name: "innerRadius", type: "number", description: "Inner radius ratio. Default: 0.3" },
      { name: "gap", type: "number", description: "Gap between bars. Default: 4" },
    ],
    usage: `import { RadialBarChart } from "@chartts/react"

<RadialBarChart
  data={progressData}
  value="completion"
  label="task"
  max={100}
/>`,
    features: ["Multiple concentric bars", "Percentage labels", "Animated fill on mount", "Custom color per bar", "Center content slot", "Responsive sizing"],
  },
  lollipop: {
    name: "Lollipop Chart",
    description: "A cleaner alternative to bar charts. Thin stems with dot markers reduce visual clutter while maintaining readability.",
    props: [
      { name: "data", type: "T[]", description: "Array of data objects" },
      { name: "x", type: "keyof T", description: "Key for categories" },
      { name: "y", type: "keyof T", description: "Key for values" },
      { name: "dotSize", type: "number", description: "Dot radius in px. Default: 6" },
      { name: "horizontal", type: "boolean", description: "Horizontal layout. Default: false" },
    ],
    usage: `import { LollipopChart } from "@chartts/react"

<LollipopChart
  data={scores}
  x="student"
  y="score"
  horizontal
/>`,
    features: ["Vertical and horizontal layouts", "Configurable dot size", "Sorted display", "Value labels", "Grouped variant", "Animated dot entry"],
  },
  bullet: {
    name: "Bullet Chart",
    description: "Compare a primary measure against a target with qualitative ranges. Stephen Few's alternative to gauges and meters.",
    props: [
      { name: "value", type: "number", description: "Primary measure value" },
      { name: "target", type: "number", description: "Target/goal value" },
      { name: "ranges", type: "number[]", description: "Qualitative ranges (poor, ok, good)" },
      { name: "label", type: "string", description: "Chart label" },
      { name: "max", type: "number", description: "Maximum value" },
    ],
    usage: `import { BulletChart } from "@chartts/react"

<BulletChart
  value={270}
  target={300}
  ranges={[150, 225, 300]}
  label="Revenue (K)"
/>`,
    features: ["Qualitative color ranges", "Target marker line", "Horizontal and vertical", "Multiple bullets in a group", "Compact KPI display", "Animated value fill"],
  },
  dumbbell: {
    name: "Dumbbell Chart",
    description: "Show the gap between two values per category. Perfect for before/after comparisons, range displays, and paired data.",
    props: [
      { name: "data", type: "T[]", description: "Array of data objects" },
      { name: "x", type: "keyof T", description: "Key for categories" },
      { name: "start", type: "keyof T", description: "Key for start values" },
      { name: "end", type: "keyof T", description: "Key for end values" },
      { name: "dotSize", type: "number", description: "Dot radius. Default: 6" },
    ],
    usage: `import { DumbbellChart } from "@chartts/react"

<DumbbellChart
  data={yearOverYear}
  x="metric"
  start="lastYear"
  end="thisYear"
/>`,
    features: ["Before/after comparison", "Color-coded direction", "Gap value labels", "Horizontal layout", "Sorted by gap size", "Animated connector draw"],
  },
  calendar: {
    name: "Calendar Chart",
    description: "Display data over time in a calendar grid layout. Ideal for daily activity, contribution history, and seasonal patterns.",
    props: [
      { name: "data", type: "{ date: string; value: number }[]", description: "Date-value pairs" },
      { name: "startDate", type: "string", description: "Start date (YYYY-MM-DD)" },
      { name: "endDate", type: "string", description: "End date (YYYY-MM-DD)" },
      { name: "colorScale", type: "string[]", description: "Color range from low to high" },
      { name: "cellSize", type: "number", description: "Cell size in px. Default: 12" },
    ],
    usage: `import { CalendarChart } from "@chartts/react"

<CalendarChart
  data={commitHistory}
  startDate="2025-01-01"
  endDate="2025-12-31"
  colorScale={["#0f172a", "#10b981"]}
/>`,
    features: ["GitHub-style contribution grid", "Monthly labels", "Day-of-week labels", "Configurable color scales", "Tooltip with date/value", "Responsive cell sizing"],
  },
  combo: {
    name: "Combo Chart",
    description: "Combine multiple chart types in a single view. Mix lines, bars, and areas to show different data dimensions together.",
    props: [
      { name: "data", type: "T[]", description: "Array of data objects" },
      { name: "x", type: "keyof T", description: "Key for x-axis" },
      { name: "series", type: "SeriesConfig[]", description: "Array of series configurations with type" },
      { name: "dualAxis", type: "boolean", description: "Enable secondary y-axis. Default: false" },
    ],
    usage: `import { ComboChart } from "@chartts/react"

<ComboChart
  data={salesData}
  x="month"
  series={[
    { key: "revenue", type: "bar" },
    { key: "growth", type: "line", axis: "right" },
  ]}
  dualAxis
/>`,
    features: ["Mix bar, line, and area", "Dual y-axis support", "Per-series configuration", "Shared tooltip", "Independent scaling", "Animated entry per type"],
  },
  sankey: {
    name: "Sankey Diagram",
    description: "Visualize flow and transitions between stages. Width of connections represents magnitude. Perfect for energy flows, user journeys, and budget allocation.",
    props: [
      { name: "nodes", type: "{ id: string; label: string }[]", description: "Flow nodes" },
      { name: "links", type: "{ source: string; target: string; value: number }[]", description: "Flow connections" },
      { name: "nodeWidth", type: "number", description: "Node width in px. Default: 20" },
      { name: "nodePadding", type: "number", description: "Padding between nodes. Default: 10" },
    ],
    usage: `import { SankeyChart } from "@chartts/react"

<SankeyChart
  nodes={[
    { id: "a", label: "Organic" },
    { id: "b", label: "Paid" },
    { id: "c", label: "Signup" },
    { id: "d", label: "Purchase" },
  ]}
  links={[
    { source: "a", target: "c", value: 400 },
    { source: "b", target: "c", value: 200 },
    { source: "c", target: "d", value: 300 },
  ]}
/>`,
    features: ["Automatic node positioning", "Curved flow paths", "Interactive node dragging", "Highlight connected paths", "Color by source/target", "Animated flow reveal"],
  },
};

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return Object.keys(chartDocs).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const chart = chartDocs[slug];
  if (!chart) return {};
  return {
    title: `${chart.name} | Chart.ts Documentation`,
    description: chart.description,
  };
}

export default async function ChartDocPage({ params }: PageProps) {
  const { slug } = await params;
  const chart = chartDocs[slug];

  if (!chart) {
    notFound();
  }

  return (
    <article className="max-w-3xl">
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-3">
          <Link
            href="/docs/charts"
            className="section-label text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
          >
            Charts
          </Link>
          <span className="faint-text">/</span>
          <p className="section-label muted-text">{chart.name}</p>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight heading">
          {chart.name}
        </h1>
        <p className="mt-4 text-lg body-text leading-relaxed">
          {chart.description}
        </p>
      </div>

      {/* Usage */}
      <section className="mb-12">
        <h2 className="text-xl font-bold heading mb-4">Usage</h2>
        <CodeBlock code={chart.usage} lang="tsx" filename="example.tsx" />
      </section>

      {/* Props */}
      <section className="mb-12">
        <h2 className="text-xl font-bold heading mb-4">Props</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b adaptive-border">
                <th className="text-left py-3 pr-4 muted-text font-mono font-normal text-xs">
                  Prop
                </th>
                <th className="text-left py-3 pr-4 muted-text font-mono font-normal text-xs">
                  Type
                </th>
                <th className="text-left py-3 muted-text font-mono font-normal text-xs">
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              {chart.props.map((prop) => (
                <tr
                  key={prop.name}
                  className="border-b" style={{ borderColor: 'var(--c-grid-subtle)' }}
                >
                  <td className="py-3 pr-4 font-mono text-cyan-400 whitespace-nowrap">
                    {prop.name}
                  </td>
                  <td className="py-3 pr-4 font-mono muted-text whitespace-nowrap text-xs">
                    {prop.type}
                  </td>
                  <td className="py-3 body-text">{prop.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Features */}
      <section className="mb-12">
        <h2 className="text-xl font-bold heading mb-4">Features</h2>
        <ul className="space-y-2">
          {chart.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3 body-text">
              <svg
                className="w-4 h-4 mt-0.5 text-cyan-400 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
      </section>

      {/* Navigation */}
      <section>
        <h2 className="text-lg font-bold heading mb-4">Other Charts</h2>
        <div className="flex flex-wrap gap-2">
          {Object.entries(chartDocs)
            .filter(([key]) => key !== slug)
            .map(([key, c]) => (
              <Link
                key={key}
                href={`/docs/charts/${key}`}
                className="px-3 py-1.5 rounded-lg text-xs font-mono card body-text hover:text-cyan-400 hover:border-cyan-500/20 transition-all cursor-pointer"
              >
                {c.name}
              </Link>
            ))}
        </div>
      </section>
    </article>
  );
}
