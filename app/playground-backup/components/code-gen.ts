// Pure functions: playground state → code string per target framework

export interface CodeGenState {
  chartType: string;
  labels: (string | number)[];
  series: { name: string; values: number[]; color?: string }[];
  width: number;
  height: number;
  theme: string;
  colors: string[];
  xLabel: string;
  yLabel: string;
  xGrid: boolean;
  yGrid: boolean;
  legend: false | "top" | "bottom" | "left" | "right";
  curve: "linear" | "monotone" | "step";
  barRadius: number;
  animate: boolean;
}

function serializeData(state: CodeGenState, indent: number): string {
  const pad = " ".repeat(indent);
  const pad2 = " ".repeat(indent + 2);
  const pad3 = " ".repeat(indent + 4);

  const labelsStr = state.labels
    .map((l) => (typeof l === "string" ? `"${l}"` : l))
    .join(", ");

  const seriesStr = state.series
    .map((s) => {
      const parts = [`${pad3}name: "${s.name}"`, `${pad3}values: [${s.values.join(", ")}]`];
      if (s.color) parts.push(`${pad3}color: "${s.color}"`);
      return `${pad2}{\n${parts.join(",\n")}\n${pad2}}`;
    })
    .join(",\n");

  return `{\n${pad}labels: [${labelsStr}],\n${pad}series: [\n${seriesStr}\n${pad}]\n${" ".repeat(indent - 2)}}`;
}

function buildOptions(state: CodeGenState, indent: number): string {
  const pad = " ".repeat(indent);
  const opts: string[] = [];

  if (state.width !== 600) opts.push(`${pad}width: ${state.width}`);
  if (state.height !== 400) opts.push(`${pad}height: ${state.height}`);
  if (state.theme !== "dark") opts.push(`${pad}theme: "${state.theme}"`);
  if (state.colors.length > 0) {
    opts.push(`${pad}colors: [${state.colors.map((c) => `"${c}"`).join(", ")}]`);
  }
  if (state.xLabel) opts.push(`${pad}xLabel: "${state.xLabel}"`);
  if (state.yLabel) opts.push(`${pad}yLabel: "${state.yLabel}"`);
  if (!state.xGrid) opts.push(`${pad}xGrid: false`);
  if (!state.yGrid) opts.push(`${pad}yGrid: false`);
  if (state.legend !== false) opts.push(`${pad}legend: "${state.legend}"`);
  if (state.curve !== "linear") opts.push(`${pad}curve: "${state.curve}"`);
  if (state.barRadius > 0) opts.push(`${pad}barRadius: ${state.barRadius}`);
  if (!state.animate) opts.push(`${pad}animate: false`);

  return opts.join(",\n");
}

// Map type slug to chartType import name
const typeImportMap: Record<string, string> = {
  line: "lineChartType",
  bar: "barChartType",
  "stacked-bar": "stackedBarChartType",
  "horizontal-bar": "horizontalBarChartType",
  area: "areaChartType",
  pie: "pieChartType",
  donut: "donutChartType",
  scatter: "scatterChartType",
  bubble: "bubbleChartType",
  radar: "radarChartType",
  candlestick: "candlestickChartType",
  waterfall: "waterfallChartType",
  funnel: "funnelChartType",
  gauge: "gaugeChartType",
  sparkline: "sparklineChartType",
  heatmap: "heatmapChartType",
  boxplot: "boxplotChartType",
  histogram: "histogramChartType",
  treemap: "treemapChartType",
  polar: "polarChartType",
  "radial-bar": "radialBarChartType",
  lollipop: "lollipopChartType",
  bullet: "bulletChartType",
  dumbbell: "dumbbellChartType",
  calendar: "calendarChartType",
  combo: "comboChartType",
  sankey: "sankeyChartType",
  sunburst: "sunburstChartType",
  tree: "treeChartType",
  graph: "graphChartType",
  parallel: "parallelChartType",
  themeriver: "themeRiverChartType",
  pictorialbar: "pictorialBarChartType",
  chord: "chordChartType",
  geo: "geoChartType",
  lines: "linesChartType",
  matrix: "matrixChartType",
  ohlc: "ohlcChartType",
  step: "stepChartType",
  volume: "volumeChartType",
  range: "rangeChartType",
  baseline: "baselineChartType",
  kagi: "kagiChartType",
  renko: "renkoChartType",
  violin: "violinChartType",
  pack: "packChartType",
  voronoi: "voronoiChartType",
  wordcloud: "wordcloudChartType",
  pillar: "pillarChartType",
  gantt: "ganttChartType",
  org: "orgChartType",
  flow: "flowChartType",
  pareto: "paretoChartType",
};

export function generateVanilla(state: CodeGenState): string {
  const importName = typeImportMap[state.chartType] ?? "lineChartType";
  const data = serializeData(state, 4);
  const opts = buildOptions(state, 4);
  const optsBlock = opts ? `,\n${opts}` : "";

  return `import { createChart, ${importName} } from "@chartts/core";

const chart = createChart(
  document.getElementById("chart"),
  ${importName},
  {
    data: ${data}${optsBlock}
  }
);`;
}

export function generateReact(state: CodeGenState): string {
  const data = serializeData(state, 8);
  const opts = buildOptions(state, 8);
  const optsLines = opts ? `\n${opts}` : "";

  return `import { Chart } from "@chartts/react";

export default function MyChart() {
  return (
    <Chart
      type="${state.chartType}"
      data={${data}}${optsLines}
    />
  );
}`;
}

export function generateVue(state: CodeGenState): string {
  const data = serializeData(state, 2);
  const opts = buildOptions(state, 6);
  const propsArr: string[] = [
    `      type="${state.chartType}"`,
    `      :data="data"`,
  ];
  if (state.width !== 600) propsArr.push(`      :width="${state.width}"`);
  if (state.height !== 400) propsArr.push(`      :height="${state.height}"`);
  if (state.theme !== "dark") propsArr.push(`      theme="${state.theme}"`);
  if (state.colors.length > 0) propsArr.push(`      :colors="[${state.colors.map((c) => `'${c}'`).join(", ")}]"`);
  if (state.xLabel) propsArr.push(`      xLabel="${state.xLabel}"`);
  if (state.yLabel) propsArr.push(`      yLabel="${state.yLabel}"`);
  if (!state.xGrid) propsArr.push(`      :xGrid="false"`);
  if (!state.yGrid) propsArr.push(`      :yGrid="false"`);
  if (state.legend !== false) propsArr.push(`      legend="${state.legend}"`);
  if (state.curve !== "linear") propsArr.push(`      curve="${state.curve}"`);
  if (!state.animate) propsArr.push(`      :animate="false"`);

  return `<template>
  <Chart
${propsArr.join("\n")}
  />
</template>

<script setup>
import { Chart } from "@chartts/vue";

const data = ${data};
</script>`;
}

export function generateSvelte(state: CodeGenState): string {
  const data = serializeData(state, 2);
  const propsArr: string[] = [
    `  type="${state.chartType}"`,
    `  {data}`,
  ];
  if (state.width !== 600) propsArr.push(`  width={${state.width}}`);
  if (state.height !== 400) propsArr.push(`  height={${state.height}}`);
  if (state.theme !== "dark") propsArr.push(`  theme="${state.theme}"`);
  if (state.colors.length > 0) propsArr.push(`  colors={[${state.colors.map((c) => `"${c}"`).join(", ")}]}`);
  if (state.xLabel) propsArr.push(`  xLabel="${state.xLabel}"`);
  if (state.yLabel) propsArr.push(`  yLabel="${state.yLabel}"`);
  if (!state.xGrid) propsArr.push(`  xGrid={false}`);
  if (!state.yGrid) propsArr.push(`  yGrid={false}`);
  if (state.legend !== false) propsArr.push(`  legend="${state.legend}"`);
  if (state.curve !== "linear") propsArr.push(`  curve="${state.curve}"`);
  if (!state.animate) propsArr.push(`  animate={false}`);

  return `<script>
  import { Chart } from "@chartts/svelte";

  const data = ${data};
</script>

<Chart
${propsArr.join("\n")}
/>`;
}

export function generateAngular(state: CodeGenState): string {
  const data = serializeData(state, 4);
  const opts = buildOptions(state, 6);
  const bindingsArr: string[] = [
    `      type="${state.chartType}"`,
    `      [data]="data"`,
  ];
  if (state.width !== 600) bindingsArr.push(`      [width]="${state.width}"`);
  if (state.height !== 400) bindingsArr.push(`      [height]="${state.height}"`);
  if (state.theme !== "dark") bindingsArr.push(`      theme="${state.theme}"`);
  if (state.xLabel) bindingsArr.push(`      xLabel="${state.xLabel}"`);
  if (state.yLabel) bindingsArr.push(`      yLabel="${state.yLabel}"`);
  if (state.legend !== false) bindingsArr.push(`      legend="${state.legend}"`);
  if (state.curve !== "linear") bindingsArr.push(`      curve="${state.curve}"`);
  if (!state.animate) bindingsArr.push(`      [animate]="false"`);

  return `import { Component } from "@angular/core";
import { ChartComponent } from "@chartts/angular";

@Component({
  selector: "app-my-chart",
  standalone: true,
  imports: [ChartComponent],
  template: \`
    <chartts-chart
${bindingsArr.join("\n")}
    />
  \`,
})
export class MyChartComponent {
  data = ${data};
}`;
}

export type ExportTarget = "vanilla" | "react" | "vue" | "svelte" | "angular";

const generators: Record<ExportTarget, (s: CodeGenState) => string> = {
  vanilla: generateVanilla,
  react: generateReact,
  vue: generateVue,
  svelte: generateSvelte,
  angular: generateAngular,
};

export function generateCode(target: ExportTarget, state: CodeGenState): string {
  return generators[target](state);
}
