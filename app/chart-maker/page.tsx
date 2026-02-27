"use client";

import { useState, useRef, useCallback, useMemo } from "react";
import Link from "next/link";

// ---------- metadata (exported from a wrapper below) ----------

const META_TITLE = "Free Chart Maker | Create Charts Online";
const META_DESCRIPTION =
  "Free chart maker online. Create bar charts, line charts, pie charts, scatter plots, area charts and donut charts. Paste your data, preview instantly, and download as SVG or PNG. No sign-up required.";

// ---------- types ----------

type ChartType = "bar" | "line" | "pie" | "scatter" | "area" | "donut";

interface ParsedData {
  labels: string[];
  values: number[];
}

// ---------- colours ----------

const PALETTE = [
  "#06b6d4",
  "#22d3ee",
  "#67e8f9",
  "#a5f3fc",
  "#0891b2",
  "#0e7490",
];

// ---------- data parsing ----------

function parseCSV(raw: string): ParsedData {
  const lines = raw
    .trim()
    .split(/\n/)
    .map((l) => l.trim())
    .filter(Boolean);
  const labels: string[] = [];
  const values: number[] = [];

  for (const line of lines) {
    // support "label,value" or just "value"
    const parts = line.split(/[,\t]+/).map((p) => p.trim());
    if (parts.length >= 2) {
      labels.push(parts[0]);
      const num = parseFloat(parts[1]);
      values.push(isNaN(num) ? 0 : num);
    } else {
      const num = parseFloat(parts[0]);
      if (!isNaN(num)) {
        labels.push(`Item ${values.length + 1}`);
        values.push(num);
      }
    }
  }
  return { labels, values };
}

// ---------- chart renderers ----------

function BarChartSVG({ data }: { data: ParsedData }) {
  const { labels, values } = data;
  if (!values.length) return null;
  const max = Math.max(...values, 1);
  const w = 400;
  const h = 220;
  const pad = 40;
  const barW = Math.min(40, (w - pad * 2) / values.length - 4);

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-full">
      {values.map((v, i) => {
        const barH = ((v / max) * (h - pad * 2)) || 1;
        const x = pad + i * ((w - pad * 2) / values.length) + 2;
        const y = h - pad - barH;
        return (
          <g key={i}>
            <rect
              x={x}
              y={y}
              width={barW}
              height={barH}
              rx={3}
              fill={PALETTE[i % PALETTE.length]}
              opacity={0.85}
            />
            <text
              x={x + barW / 2}
              y={h - pad + 14}
              textAnchor="middle"
              fontSize="9"
              fill="currentColor"
              className="fill-current muted-text"
            >
              {labels[i]?.slice(0, 8)}
            </text>
          </g>
        );
      })}
      {/* axis */}
      <line x1={pad} y1={h - pad} x2={w - pad} y2={h - pad} stroke="currentColor" opacity={0.15} />
      <line x1={pad} y1={pad} x2={pad} y2={h - pad} stroke="currentColor" opacity={0.15} />
    </svg>
  );
}

function LineChartSVG({ data }: { data: ParsedData }) {
  const { labels, values } = data;
  if (!values.length) return null;
  const max = Math.max(...values, 1);
  const w = 400;
  const h = 220;
  const pad = 40;

  const points = values.map((v, i) => {
    const x = pad + (i / Math.max(values.length - 1, 1)) * (w - pad * 2);
    const y = h - pad - (v / max) * (h - pad * 2);
    return { x, y };
  });

  const d = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-full">
      <path d={d} fill="none" stroke="#06b6d4" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={3.5} fill="#22d3ee" />
      ))}
      {points.map((p, i) => (
        <text key={`l${i}`} x={p.x} y={h - pad + 14} textAnchor="middle" fontSize="9" fill="currentColor" className="fill-current muted-text">
          {labels[i]?.slice(0, 8)}
        </text>
      ))}
      <line x1={pad} y1={h - pad} x2={w - pad} y2={h - pad} stroke="currentColor" opacity={0.15} />
      <line x1={pad} y1={pad} x2={pad} y2={h - pad} stroke="currentColor" opacity={0.15} />
    </svg>
  );
}

function PieChartSVG({ data }: { data: ParsedData }) {
  const { labels, values } = data;
  if (!values.length) return null;
  const total = values.reduce((a, b) => a + b, 0) || 1;
  const cx = 200;
  const cy = 120;
  const r = 80;

  let startAngle = -Math.PI / 2;
  const slices = values.map((v, i) => {
    const angle = (v / total) * Math.PI * 2;
    const endAngle = startAngle + angle;
    const x1 = cx + r * Math.cos(startAngle);
    const y1 = cy + r * Math.sin(startAngle);
    const x2 = cx + r * Math.cos(endAngle);
    const y2 = cy + r * Math.sin(endAngle);
    const largeArc = angle > Math.PI ? 1 : 0;
    const d = `M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${largeArc} 1 ${x2},${y2} Z`;
    startAngle = endAngle;
    return { d, color: PALETTE[i % PALETTE.length], label: labels[i] };
  });

  return (
    <svg viewBox="0 0 400 240" className="w-full h-full">
      {slices.map((s, i) => (
        <path key={i} d={s.d} fill={s.color} opacity={0.85} stroke="var(--c-bg, #0a0a0f)" strokeWidth={2} />
      ))}
      {/* legend */}
      {slices.slice(0, 6).map((s, i) => (
        <g key={`leg${i}`}>
          <rect x={320} y={20 + i * 18} width={10} height={10} rx={2} fill={s.color} opacity={0.85} />
          <text x={335} y={29 + i * 18} fontSize="9" fill="currentColor" className="fill-current muted-text">
            {s.label?.slice(0, 10)}
          </text>
        </g>
      ))}
    </svg>
  );
}

function DonutChartSVG({ data }: { data: ParsedData }) {
  const { labels, values } = data;
  if (!values.length) return null;
  const total = values.reduce((a, b) => a + b, 0) || 1;
  const cx = 200;
  const cy = 120;
  const r = 80;
  const inner = 50;

  let startAngle = -Math.PI / 2;
  const arcs = values.map((v, i) => {
    const angle = (v / total) * Math.PI * 2;
    const endAngle = startAngle + angle;
    const x1o = cx + r * Math.cos(startAngle);
    const y1o = cy + r * Math.sin(startAngle);
    const x2o = cx + r * Math.cos(endAngle);
    const y2o = cy + r * Math.sin(endAngle);
    const x1i = cx + inner * Math.cos(endAngle);
    const y1i = cy + inner * Math.sin(endAngle);
    const x2i = cx + inner * Math.cos(startAngle);
    const y2i = cy + inner * Math.sin(startAngle);
    const largeArc = angle > Math.PI ? 1 : 0;
    const d = `M${x1o},${y1o} A${r},${r} 0 ${largeArc} 1 ${x2o},${y2o} L${x1i},${y1i} A${inner},${inner} 0 ${largeArc} 0 ${x2i},${y2i} Z`;
    startAngle = endAngle;
    return { d, color: PALETTE[i % PALETTE.length], label: labels[i] };
  });

  return (
    <svg viewBox="0 0 400 240" className="w-full h-full">
      {arcs.map((a, i) => (
        <path key={i} d={a.d} fill={a.color} opacity={0.85} stroke="var(--c-bg, #0a0a0f)" strokeWidth={2} />
      ))}
      <text x={cx} y={cy + 4} textAnchor="middle" fontSize="20" fontWeight="700" fill="currentColor" className="fill-current heading">
        {total}
      </text>
      <text x={cx} y={cy + 18} textAnchor="middle" fontSize="9" fill="currentColor" className="fill-current muted-text">
        total
      </text>
      {arcs.slice(0, 6).map((a, i) => (
        <g key={`leg${i}`}>
          <rect x={320} y={20 + i * 18} width={10} height={10} rx={2} fill={a.color} opacity={0.85} />
          <text x={335} y={29 + i * 18} fontSize="9" fill="currentColor" className="fill-current muted-text">
            {a.label?.slice(0, 10)}
          </text>
        </g>
      ))}
    </svg>
  );
}

function ScatterChartSVG({ data }: { data: ParsedData }) {
  const { values } = data;
  if (!values.length) return null;
  const max = Math.max(...values, 1);
  const w = 400;
  const h = 220;
  const pad = 40;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-full">
      {values.map((v, i) => {
        const x = pad + (i / Math.max(values.length - 1, 1)) * (w - pad * 2);
        const y = h - pad - (v / max) * (h - pad * 2);
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={5}
            fill={PALETTE[i % PALETTE.length]}
            opacity={0.8}
          />
        );
      })}
      <line x1={pad} y1={h - pad} x2={w - pad} y2={h - pad} stroke="currentColor" opacity={0.15} />
      <line x1={pad} y1={pad} x2={pad} y2={h - pad} stroke="currentColor" opacity={0.15} />
    </svg>
  );
}

function AreaChartSVG({ data }: { data: ParsedData }) {
  const { labels, values } = data;
  if (!values.length) return null;
  const max = Math.max(...values, 1);
  const w = 400;
  const h = 220;
  const pad = 40;

  const points = values.map((v, i) => {
    const x = pad + (i / Math.max(values.length - 1, 1)) * (w - pad * 2);
    const y = h - pad - (v / max) * (h - pad * 2);
    return { x, y };
  });

  const lineD = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
  const areaD = `${lineD} L${points[points.length - 1].x},${h - pad} L${points[0].x},${h - pad} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-full">
      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.35} />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity={0.02} />
        </linearGradient>
      </defs>
      <path d={areaD} fill="url(#areaGrad)" />
      <path d={lineD} fill="none" stroke="#06b6d4" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
      {points.map((p, i) => (
        <text key={`l${i}`} x={p.x} y={h - pad + 14} textAnchor="middle" fontSize="9" fill="currentColor" className="fill-current muted-text">
          {labels[i]?.slice(0, 8)}
        </text>
      ))}
      <line x1={pad} y1={h - pad} x2={w - pad} y2={h - pad} stroke="currentColor" opacity={0.15} />
      <line x1={pad} y1={pad} x2={pad} y2={h - pad} stroke="currentColor" opacity={0.15} />
    </svg>
  );
}

// ---------- chart registry ----------

const CHART_TYPES: { value: ChartType; label: string }[] = [
  { value: "bar", label: "Bar" },
  { value: "line", label: "Line" },
  { value: "pie", label: "Pie" },
  { value: "scatter", label: "Scatter" },
  { value: "area", label: "Area" },
  { value: "donut", label: "Donut" },
];

const RENDERERS: Record<ChartType, React.FC<{ data: ParsedData }>> = {
  bar: BarChartSVG,
  line: LineChartSVG,
  pie: PieChartSVG,
  scatter: ScatterChartSVG,
  area: AreaChartSVG,
  donut: DonutChartSVG,
};

const DEFAULT_DATA = `January,40
February,55
March,35
April,70
May,50
June,85`;

// ---------- features ----------

const FEATURES = [
  {
    title: "Instant preview",
    description:
      "See your chart update in real time as you edit data. No waiting, no refreshing.",
  },
  {
    title: "Multiple chart types",
    description:
      "Bar, line, pie, scatter, area, and donut charts. Switch between them with one click.",
  },
  {
    title: "Copy SVG",
    description:
      "Copy the rendered chart as clean SVG markup. Paste it into Figma, HTML, or any design tool.",
  },
  {
    title: "Download PNG",
    description:
      "Export your chart as a high-resolution PNG image ready for presentations or reports.",
  },
  {
    title: "No sign-up required",
    description:
      "Completely free. No accounts, no watermarks, no limits. Just paste data and create charts.",
  },
  {
    title: "Dark mode ready",
    description:
      "Charts render with your current theme. Light or dark, they always look crisp.",
  },
];

// ---------- main client component ----------

function ChartMakerApp() {
  const [chartType, setChartType] = useState<ChartType>("bar");
  const [rawData, setRawData] = useState(DEFAULT_DATA);
  const [copyFeedback, setCopyFeedback] = useState(false);
  const svgContainerRef = useRef<HTMLDivElement>(null);

  const parsed = useMemo(() => parseCSV(rawData), [rawData]);
  const Renderer = RENDERERS[chartType];

  const handleCopySVG = useCallback(() => {
    const svgEl = svgContainerRef.current?.querySelector("svg");
    if (!svgEl) return;
    const svgMarkup = new XMLSerializer().serializeToString(svgEl);
    navigator.clipboard.writeText(svgMarkup).then(() => {
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 2000);
    });
  }, []);

  const handleDownloadPNG = useCallback(() => {
    const svgEl = svgContainerRef.current?.querySelector("svg");
    if (!svgEl) return;
    const svgMarkup = new XMLSerializer().serializeToString(svgEl);
    const canvas = document.createElement("canvas");
    const scale = 2;
    canvas.width = 800 * scale;
    canvas.height = 440 * scale;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    const blob = new Blob([svgMarkup], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    img.onload = () => {
      ctx.fillStyle = "#0a0a0f";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      const a = document.createElement("a");
      a.download = `chart-${chartType}.png`;
      a.href = canvas.toDataURL("image/png");
      a.click();
    };
    img.src = url;
  }, [chartType]);

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="section-label text-cyan-400 mb-4">Free Tool</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight heading">
            Free Chart Maker
          </h1>
          <p className="mt-4 text-lg body-text max-w-2xl mx-auto">
            Create beautiful charts online in seconds. Paste your data, pick a
            chart type, and export as SVG or PNG. No sign-up, no watermarks.
            A free graph maker for everyone.
          </p>
        </div>
      </section>

      {/* Chart maker */}
      <section className="pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-[320px_1fr] gap-6">
            {/* Controls */}
            <div className="space-y-5">
              {/* Chart type */}
              <div>
                <label className="block text-sm font-medium heading mb-2">
                  Chart type
                </label>
                <select
                  value={chartType}
                  onChange={(e) => setChartType(e.target.value as ChartType)}
                  className="w-full px-3 py-2 rounded-lg text-sm font-mono bg-transparent border adaptive-border heading focus:border-cyan-500/50 focus:outline-none transition-colors cursor-pointer"
                >
                  {CHART_TYPES.map((ct) => (
                    <option key={ct.value} value={ct.value} className="bg-[var(--c-bg,#0a0a0f)]">
                      {ct.label} Chart
                    </option>
                  ))}
                </select>
              </div>

              {/* Data input */}
              <div>
                <label className="block text-sm font-medium heading mb-2">
                  Data{" "}
                  <span className="font-normal muted-text">
                    (label, value per line)
                  </span>
                </label>
                <textarea
                  value={rawData}
                  onChange={(e) => setRawData(e.target.value)}
                  rows={8}
                  spellCheck={false}
                  className="w-full px-3 py-2 rounded-lg text-sm font-mono bg-transparent border adaptive-border heading focus:border-cyan-500/50 focus:outline-none transition-colors resize-y leading-relaxed"
                  placeholder="January,40&#10;February,55&#10;March,35"
                />
              </div>

              {/* Action buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleCopySVG}
                  className="flex-1 px-4 py-2.5 text-sm font-semibold rounded-lg bg-cyan-500 text-white hover:bg-cyan-400 transition-colors cursor-pointer"
                >
                  {copyFeedback ? "Copied!" : "Copy SVG"}
                </button>
                <button
                  onClick={handleDownloadPNG}
                  className="flex-1 px-4 py-2.5 text-sm font-semibold rounded-lg card body-text hover:border-cyan-500/30 transition-all cursor-pointer"
                >
                  Download PNG
                </button>
              </div>

              <p className="text-xs muted-text">
                Tip: paste CSV data or comma-separated values. Each line is one
                data point.
              </p>
            </div>

            {/* Preview */}
            <div className="card rounded-xl p-6 flex items-center justify-center min-h-[320px]">
              {parsed.values.length > 0 ? (
                <div ref={svgContainerRef} className="w-full max-w-[500px] heading">
                  <Renderer data={parsed} />
                </div>
              ) : (
                <div className="text-center">
                  <p className="muted-text text-sm">
                    Enter data on the left to see a chart preview.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold heading text-center mb-8">
            Why use this chart maker?
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((f) => (
              <div key={f.title} className="card rounded-xl p-6">
                <h3 className="font-semibold heading mb-2">{f.title}</h3>
                <p className="text-sm body-text">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="rounded-2xl card p-12 text-center">
            <h2 className="text-xl font-bold heading mb-3">
              Need more control?
            </h2>
            <p className="body-text mb-8 max-w-md mx-auto">
              Chart.ts gives you 40+ chart types, full Tailwind CSS integration,
              and framework adapters for React, Vue, Svelte, Solid, and Angular.
              All in a tiny bundle.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link
                href="/docs"
                className="px-6 py-3 text-sm font-semibold rounded-lg bg-cyan-500 text-white hover:bg-cyan-400 transition-colors cursor-pointer"
              >
                Read the Docs
              </Link>
              <Link
                href="/examples"
                className="px-6 py-3 text-sm font-semibold rounded-lg card body-text transition-all cursor-pointer"
              >
                View Examples
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// ---------- page (default export) ----------

export default function ChartMakerPage() {
  return <ChartMakerApp />;
}
