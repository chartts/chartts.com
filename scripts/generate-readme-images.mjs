import { renderToString } from "@chartts/core";
import * as core from "@chartts/core";
import { Resvg } from "@resvg/resvg-js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "public", "demos");

const W = 600;
const H = 380;
const BG = "#0b1120";

// Chart types to showcase (curated selection for README)
const charts = [
  { slug: "line", type: core.lineChartType, data: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    series: [
      { name: "Revenue", values: [4200, 5100, 6800, 5900, 7400, 8200, 9100, 8600, 10200, 11400, 10800, 13200] },
      { name: "Expenses", values: [3200, 3400, 3800, 4100, 4400, 4200, 4800, 5100, 5400, 5200, 5800, 6100] },
    ],
  }},
  { slug: "bar", type: core.barChartType, data: {
    labels: ["Q1", "Q2", "Q3", "Q4"],
    series: [
      { name: "Product A", values: [42000, 55000, 72000, 65000] },
      { name: "Product B", values: [28000, 34000, 45000, 52000] },
      { name: "Product C", values: [15000, 22000, 31000, 38000] },
    ],
  }},
  { slug: "area", type: core.areaChartType, data: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    series: [
      { name: "Users", values: [1200, 1800, 2400, 2100, 3200, 3800, 2900] },
      { name: "Sessions", values: [800, 1200, 1600, 1400, 2200, 2800, 2000] },
    ],
  }},
  { slug: "pie", type: core.pieChartType, data: {
    labels: ["React", "Vue", "Angular", "Svelte", "Solid"],
    series: [{ name: "Usage", values: [42, 28, 18, 8, 4] }],
  }},
  { slug: "scatter", type: core.scatterChartType, data: {
    labels: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"],
    series: [
      { name: "Group A", values: [45, 68, 32, 85, 52, 73, 28, 91, 60, 42, 78, 55] },
      { name: "Group B", values: [38, 55, 72, 45, 88, 35, 62, 48, 75, 58, 42, 82] },
    ],
  }},
  { slug: "radar", type: core.radarChartType, data: {
    labels: ["Speed", "Reliability", "Comfort", "Safety", "Efficiency", "Design"],
    series: [
      { name: "Model A", values: [85, 72, 90, 88, 65, 78] },
      { name: "Model B", values: [70, 88, 75, 92, 80, 65] },
    ],
  }},
  { slug: "candlestick", type: core.candlestickChartType, data: {
    labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
    series: [
      { name: "Open",  values: [150, 155, 148, 158, 162, 160, 165, 158, 170, 168, 172, 175] },
      { name: "High",  values: [158, 160, 155, 165, 168, 168, 172, 165, 178, 175, 180, 182] },
      { name: "Low",   values: [145, 148, 142, 152, 158, 155, 160, 152, 165, 162, 168, 170] },
      { name: "Close", values: [155, 148, 153, 162, 160, 165, 158, 163, 168, 172, 175, 178] },
    ],
  }},
  { slug: "heatmap", type: core.heatmapChartType, data: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    series: [
      { name: "00-04", values: [2, 1, 3, 2, 1, 5, 6] },
      { name: "04-08", values: [5, 4, 6, 5, 4, 3, 2] },
      { name: "08-12", values: [12, 14, 11, 13, 15, 8, 5] },
      { name: "12-16", values: [18, 16, 19, 17, 20, 12, 8] },
      { name: "16-20", values: [15, 13, 14, 16, 12, 18, 15] },
      { name: "20-24", values: [8, 9, 7, 8, 10, 14, 12] },
    ],
  }},
  { slug: "treemap", type: core.treemapChartType, data: {
    labels: ["Apple", "Microsoft", "Amazon", "Google", "Tesla", "Meta", "NVIDIA", "Netflix"],
    series: [{ name: "Market Cap", values: [3200, 2800, 1900, 1800, 800, 900, 1200, 600] }],
  }},
  { slug: "funnel", type: core.funnelChartType, data: {
    labels: ["Visitors", "Leads", "Qualified", "Proposals", "Closed"],
    series: [{ name: "Count", values: [10000, 6000, 4000, 2000, 800] }],
  }},
  { slug: "gauge", type: core.gaugeChartType, data: {
    labels: ["CPU"],
    series: [{ name: "Usage", values: [76] }],
  }},
  { slug: "waterfall", type: core.waterfallChartType, data: {
    labels: ["Revenue", "COGS", "Gross", "Marketing", "R&D", "Net"],
    series: [{ name: "Amount", values: [100, -40, 60, -15, -20, 25] }],
  }},
  { slug: "donut", type: core.donutChartType, data: {
    labels: ["Desktop", "Mobile", "Tablet"],
    series: [{ name: "Traffic", values: [55, 35, 10] }],
  }},
  { slug: "polar", type: core.polarChartType, data: {
    labels: ["N", "NE", "E", "SE", "S", "SW", "W", "NW"],
    series: [{ name: "Wind", values: [12, 8, 15, 6, 10, 14, 9, 11] }],
  }},
  { slug: "boxplot", type: core.boxplotChartType, data: {
    labels: ["Q1", "Q2", "Q3", "Q4"],
    series: [
      { name: "Min", values: [10, 15, 8, 12] },
      { name: "Q1", values: [25, 30, 22, 28] },
      { name: "Median", values: [42, 45, 38, 44] },
      { name: "Q3", values: [58, 62, 55, 60] },
      { name: "Max", values: [75, 80, 70, 78] },
    ],
  }},
  { slug: "histogram", type: core.histogramChartType, data: {
    labels: ["0-10", "10-20", "20-30", "30-40", "40-50", "50-60", "60-70", "70-80", "80-90", "90-100"],
    series: [{ name: "Frequency", values: [5, 12, 25, 42, 55, 48, 35, 20, 10, 3] }],
  }},
  { slug: "lollipop", type: core.lollipopChartType, data: {
    labels: ["Feature A", "Feature B", "Feature C", "Feature D", "Feature E", "Feature F"],
    series: [{ name: "Votes", values: [85, 72, 65, 58, 45, 38] }],
  }},
  { slug: "radial-bar", type: core.radialBarChartType, data: {
    labels: ["Sales", "Marketing", "Engineering", "Support"],
    series: [{ name: "Progress", values: [85, 72, 90, 65] }],
  }},
  { slug: "sankey", type: core.sankeyChartType, data: {
    labels: ["Organic", "Paid", "Referral", "Sign Up", "Trial", "Purchase", "Churn"],
    series: [{ name: "Flow", values: [400, 300, 200, 700, 200, 450, 250] }],
  }},
  { slug: "violin", type: core.violinChartType, data: {
    labels: ["Group A", "Group B", "Group C", "Group D"],
    series: [
      { name: "Min", values: [10, 15, 8, 12] },
      { name: "Q1", values: [25, 30, 20, 28] },
      { name: "Median", values: [40, 42, 35, 45] },
      { name: "Q3", values: [55, 58, 50, 60] },
      { name: "Max", values: [70, 72, 65, 75] },
    ],
  }},
];

if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

let ok = 0, fail = 0;

for (const { slug, type, data } of charts) {
  try {
    const svg = renderToString(type, data, { width: W, height: H, theme: "dark" });
    if (!svg) { console.log(`SKIP ${slug}`); fail++; continue; }

    // Strip all animation artifacts from the SVG for static rendering:
    // 1. Remove opacity:0 from inline styles (animation initial state)
    // 2. Remove stroke-dashoffset from inline styles (line draw animation)
    // 3. Remove animation-delay from inline styles
    // 4. Remove the entire <style> block (CSS animations don't work in resvg)
    let inner = svg.replace(/<svg[^>]*>/, "").replace(/<\/svg>/, "");

    // 1. Replace entire <style> block: remove all animation/opacity rules
    inner = inner.replace(/<style>[\s\S]*?<\/style>/g, (styleBlock) => {
      return styleBlock
        // Replace opacity: 0 with opacity: 1 everywhere in CSS
        .replace(/opacity:\s*0\b/g, "opacity: 1")
        // Remove all animation properties
        .replace(/animation:[^;}]+[;}]/g, (m) => m.endsWith("}") ? "}" : ";")
        .replace(/animation-delay:[^;}]+[;}]/g, (m) => m.endsWith("}") ? "}" : ";")
        // Set stroke-dashoffset to 0
        .replace(/stroke-dashoffset:[^;}]+[;}]/g, (m) =>
          "stroke-dashoffset: 0" + (m.endsWith("}") ? "}" : ";"))
        // Remove @keyframes blocks entirely
        .replace(/@keyframes\s+[\w-]+\s*\{[^}]*(\{[^}]*\}[^}]*)*\}/g, "");
    });

    // 2. Remove opacity:0 and animation from inline style attributes
    inner = inner.replace(/style="([^"]*)"/g, (match, styles) => {
      let s = styles
        .replace(/opacity\s*:\s*0\s*;?/g, "")
        .replace(/stroke-dashoffset\s*:[^;]+;?/g, "stroke-dashoffset: 0;")
        .replace(/stroke-dasharray\s*:[^;]+;?/g, "")
        .replace(/animation-delay\s*:[^;]+;?/g, "")
        .replace(/animation\s*:[^;]+;?/g, "")
        .trim();
      if (!s) return "";
      return `style="${s}"`;
    });

    // 3. Replace CSS color variables: var(--color-xxx, #hex) -> #hex
    inner = inner.replace(/var\(--[\w-]+,\s*(#[0-9a-fA-F]{3,8})\)/g, "$1");

    // 4. Replace font-family CSS vars with a safe system font
    inner = inner.replace(/var\(--font-[\w-]+,\s*[^)]+\)/g,
      "-apple-system, BlinkMacSystemFont, sans-serif");

    // 5. Replace remaining simple var() with fallback
    inner = inner.replace(/var\(--[\w-]+,\s*(\d+(?:\.\d+)?(?:px|em|rem|%)?)\)/g, "$1");

    // Wrap with background
    const wrapped = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${BG}" rx="16" ry="16"/>
  ${inner}
</svg>`;

    const resvg = new Resvg(wrapped, {
      fitTo: { mode: "width", value: W * 2 }, // 2x for retina
      font: { loadSystemFonts: true },
    });
    const png = resvg.render().asPng();

    fs.writeFileSync(path.join(OUT, `${slug}-dark.png`), png);
    console.log(`OK ${slug} (${(png.length / 1024).toFixed(0)}kb)`);
    ok++;
  } catch (e) {
    console.log(`FAIL ${slug}: ${e.message}`);
    fail++;
  }
}

console.log(`\nDone: ${ok} generated, ${fail} failed`);
