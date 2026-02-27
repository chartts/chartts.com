"use client";

import { useState, useRef, useCallback, useMemo, type DragEvent } from "react";
import Link from "next/link";

// ---------- types ----------

type ChartType = "bar" | "line" | "pie" | "scatter" | "area" | "donut";

interface DataRow {
  [key: string]: string | number;
}

interface ChartConfig {
  type: ChartType;
  xColumn: string | null;
  yColumn: string | null;
}

// ---------- colours ----------

const PALETTE = [
  "#06b6d4",
  "#22d3ee",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#ec4899",
  "#14b8a6",
];

// ---------- sample data ----------

const SAMPLE_CSV = `Month,Revenue,Users,Signups
January,4200,1200,340
February,5800,1800,420
March,7100,2400,510
April,6800,3200,480
May,9200,4100,620
June,8400,3800,590
July,11200,5200,710
August,10500,4900,680`;

// ---------- CSV parsing ----------

function parseCSV(raw: string): { columns: string[]; rows: DataRow[] } {
  const lines = raw.trim().split(/\r?\n/).filter(Boolean);
  if (lines.length < 2) return { columns: [], rows: [] };

  const columns = lines[0].split(/[,\t]/).map((c) => c.trim().replace(/^"|"$/g, ""));
  const rows: DataRow[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(/[,\t]/).map((v) => v.trim().replace(/^"|"$/g, ""));
    const row: DataRow = {};
    columns.forEach((col, j) => {
      const num = parseFloat(values[j]);
      row[col] = isNaN(num) ? (values[j] || "") : num;
    });
    rows.push(row);
  }

  return { columns, rows };
}

// ---------- chart type config ----------

const CHART_TYPES: { value: ChartType; label: string; icon: string }[] = [
  { value: "bar", label: "Bar", icon: "M" },
  { value: "line", label: "Line", icon: "L" },
  { value: "area", label: "Area", icon: "A" },
  { value: "pie", label: "Pie", icon: "P" },
  { value: "donut", label: "Donut", icon: "D" },
  { value: "scatter", label: "Scatter", icon: "S" },
];

// ---------- chart renderers ----------

function BarChartSVG({ rows, x, y }: { rows: DataRow[]; x: string; y: string }) {
  const values = rows.map((r) => Number(r[y]) || 0);
  const labels = rows.map((r) => String(r[x]));
  const max = Math.max(...values, 1);
  const w = 500;
  const h = 280;
  const padL = 55;
  const padB = 45;
  const padT = 20;
  const padR = 20;
  const chartW = w - padL - padR;
  const chartH = h - padT - padB;
  const barW = Math.min(42, chartW / values.length - 6);

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-full">
      {/* grid lines */}
      {[0, 0.25, 0.5, 0.75, 1].map((frac) => (
        <g key={frac}>
          <line
            x1={padL}
            y1={padT + chartH * (1 - frac)}
            x2={w - padR}
            y2={padT + chartH * (1 - frac)}
            stroke="currentColor"
            opacity={0.07}
          />
          <text
            x={padL - 8}
            y={padT + chartH * (1 - frac) + 3}
            textAnchor="end"
            fontSize="9"
            fill="currentColor"
            className="fill-current muted-text"
          >
            {Math.round(max * frac).toLocaleString()}
          </text>
        </g>
      ))}
      {/* bars */}
      {values.map((v, i) => {
        const barH = (v / max) * chartH || 1;
        const xPos = padL + (i + 0.5) * (chartW / values.length) - barW / 2;
        const yPos = padT + chartH - barH;
        return (
          <g key={i}>
            <rect
              x={xPos}
              y={yPos}
              width={barW}
              height={barH}
              rx={3}
              fill={PALETTE[i % PALETTE.length]}
              opacity={0.85}
            />
            <text
              x={xPos + barW / 2}
              y={h - padB + 16}
              textAnchor="middle"
              fontSize="9"
              fill="currentColor"
              className="fill-current muted-text"
            >
              {labels[i]?.slice(0, 10)}
            </text>
          </g>
        );
      })}
      {/* axes */}
      <line x1={padL} y1={padT + chartH} x2={w - padR} y2={padT + chartH} stroke="currentColor" opacity={0.15} />
      <line x1={padL} y1={padT} x2={padL} y2={padT + chartH} stroke="currentColor" opacity={0.15} />
      {/* axis labels */}
      <text x={w / 2} y={h - 4} textAnchor="middle" fontSize="10" fill="currentColor" className="fill-current muted-text">{x}</text>
      <text x={14} y={h / 2} textAnchor="middle" fontSize="10" fill="currentColor" className="fill-current muted-text" transform={`rotate(-90,14,${h / 2})`}>{y}</text>
    </svg>
  );
}

function LineChartSVG({ rows, x, y }: { rows: DataRow[]; x: string; y: string }) {
  const values = rows.map((r) => Number(r[y]) || 0);
  const labels = rows.map((r) => String(r[x]));
  const max = Math.max(...values, 1);
  const w = 500;
  const h = 280;
  const padL = 55;
  const padB = 45;
  const padT = 20;
  const padR = 20;
  const chartW = w - padL - padR;
  const chartH = h - padT - padB;

  const points = values.map((v, i) => ({
    x: padL + (i / Math.max(values.length - 1, 1)) * chartW,
    y: padT + chartH - (v / max) * chartH,
  }));
  const d = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-full">
      {[0, 0.25, 0.5, 0.75, 1].map((frac) => (
        <g key={frac}>
          <line x1={padL} y1={padT + chartH * (1 - frac)} x2={w - padR} y2={padT + chartH * (1 - frac)} stroke="currentColor" opacity={0.07} />
          <text x={padL - 8} y={padT + chartH * (1 - frac) + 3} textAnchor="end" fontSize="9" fill="currentColor" className="fill-current muted-text">
            {Math.round(max * frac).toLocaleString()}
          </text>
        </g>
      ))}
      <path d={d} fill="none" stroke="#06b6d4" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
      {points.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r={4} fill="#0a0a0f" stroke="#22d3ee" strokeWidth={2} />
          <text x={p.x} y={h - padB + 16} textAnchor="middle" fontSize="9" fill="currentColor" className="fill-current muted-text">
            {labels[i]?.slice(0, 10)}
          </text>
        </g>
      ))}
      <line x1={padL} y1={padT + chartH} x2={w - padR} y2={padT + chartH} stroke="currentColor" opacity={0.15} />
      <line x1={padL} y1={padT} x2={padL} y2={padT + chartH} stroke="currentColor" opacity={0.15} />
      <text x={w / 2} y={h - 4} textAnchor="middle" fontSize="10" fill="currentColor" className="fill-current muted-text">{x}</text>
      <text x={14} y={h / 2} textAnchor="middle" fontSize="10" fill="currentColor" className="fill-current muted-text" transform={`rotate(-90,14,${h / 2})`}>{y}</text>
    </svg>
  );
}

function AreaChartSVG({ rows, x, y }: { rows: DataRow[]; x: string; y: string }) {
  const values = rows.map((r) => Number(r[y]) || 0);
  const labels = rows.map((r) => String(r[x]));
  const max = Math.max(...values, 1);
  const w = 500;
  const h = 280;
  const padL = 55;
  const padB = 45;
  const padT = 20;
  const padR = 20;
  const chartW = w - padL - padR;
  const chartH = h - padT - padB;

  const points = values.map((v, i) => ({
    x: padL + (i / Math.max(values.length - 1, 1)) * chartW,
    y: padT + chartH - (v / max) * chartH,
  }));
  const lineD = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
  const areaD = `${lineD} L${points[points.length - 1].x},${padT + chartH} L${points[0].x},${padT + chartH} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-full">
      <defs>
        <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.3} />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity={0.02} />
        </linearGradient>
      </defs>
      {[0, 0.25, 0.5, 0.75, 1].map((frac) => (
        <g key={frac}>
          <line x1={padL} y1={padT + chartH * (1 - frac)} x2={w - padR} y2={padT + chartH * (1 - frac)} stroke="currentColor" opacity={0.07} />
          <text x={padL - 8} y={padT + chartH * (1 - frac) + 3} textAnchor="end" fontSize="9" fill="currentColor" className="fill-current muted-text">
            {Math.round(max * frac).toLocaleString()}
          </text>
        </g>
      ))}
      <path d={areaD} fill="url(#areaFill)" />
      <path d={lineD} fill="none" stroke="#06b6d4" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
      {points.map((p, i) => (
        <text key={i} x={p.x} y={h - padB + 16} textAnchor="middle" fontSize="9" fill="currentColor" className="fill-current muted-text">
          {labels[i]?.slice(0, 10)}
        </text>
      ))}
      <line x1={padL} y1={padT + chartH} x2={w - padR} y2={padT + chartH} stroke="currentColor" opacity={0.15} />
      <line x1={padL} y1={padT} x2={padL} y2={padT + chartH} stroke="currentColor" opacity={0.15} />
      <text x={w / 2} y={h - 4} textAnchor="middle" fontSize="10" fill="currentColor" className="fill-current muted-text">{x}</text>
    </svg>
  );
}

function PieChartSVG({ rows, x, y }: { rows: DataRow[]; x: string; y: string }) {
  const values = rows.map((r) => Number(r[y]) || 0);
  const labels = rows.map((r) => String(r[x]));
  const total = values.reduce((a, b) => a + b, 0) || 1;
  const cx = 200;
  const cy = 140;
  const r = 100;

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
    const pct = Math.round((v / total) * 100);
    startAngle = endAngle;
    return { d, color: PALETTE[i % PALETTE.length], label: labels[i], pct };
  });

  return (
    <svg viewBox="0 0 500 280" className="w-full h-full">
      {slices.map((s, i) => (
        <path key={i} d={s.d} fill={s.color} opacity={0.85} stroke="var(--c-bg, #0a0a0f)" strokeWidth={2} />
      ))}
      {/* legend */}
      {slices.map((s, i) => (
        <g key={`l${i}`}>
          <rect x={370} y={20 + i * 22} width={12} height={12} rx={3} fill={s.color} opacity={0.85} />
          <text x={388} y={30 + i * 22} fontSize="10" fill="currentColor" className="fill-current body-text">
            {s.label?.slice(0, 12)} ({s.pct}%)
          </text>
        </g>
      ))}
    </svg>
  );
}

function DonutChartSVG({ rows, x, y }: { rows: DataRow[]; x: string; y: string }) {
  const values = rows.map((r) => Number(r[y]) || 0);
  const labels = rows.map((r) => String(r[x]));
  const total = values.reduce((a, b) => a + b, 0) || 1;
  const cx = 200;
  const cy = 140;
  const outer = 100;
  const inner = 60;

  let startAngle = -Math.PI / 2;
  const arcs = values.map((v, i) => {
    const angle = (v / total) * Math.PI * 2;
    const endAngle = startAngle + angle;
    const x1o = cx + outer * Math.cos(startAngle);
    const y1o = cy + outer * Math.sin(startAngle);
    const x2o = cx + outer * Math.cos(endAngle);
    const y2o = cy + outer * Math.sin(endAngle);
    const x1i = cx + inner * Math.cos(endAngle);
    const y1i = cy + inner * Math.sin(endAngle);
    const x2i = cx + inner * Math.cos(startAngle);
    const y2i = cy + inner * Math.sin(startAngle);
    const largeArc = angle > Math.PI ? 1 : 0;
    const d = `M${x1o},${y1o} A${outer},${outer} 0 ${largeArc} 1 ${x2o},${y2o} L${x1i},${y1i} A${inner},${inner} 0 ${largeArc} 0 ${x2i},${y2i} Z`;
    const pct = Math.round((v / total) * 100);
    startAngle = endAngle;
    return { d, color: PALETTE[i % PALETTE.length], label: labels[i], pct };
  });

  return (
    <svg viewBox="0 0 500 280" className="w-full h-full">
      {arcs.map((a, i) => (
        <path key={i} d={a.d} fill={a.color} opacity={0.85} stroke="var(--c-bg, #0a0a0f)" strokeWidth={2} />
      ))}
      <text x={cx} y={cy - 2} textAnchor="middle" fontSize="24" fontWeight="700" fill="currentColor" className="fill-current heading">
        {total.toLocaleString()}
      </text>
      <text x={cx} y={cy + 16} textAnchor="middle" fontSize="10" fill="currentColor" className="fill-current muted-text">
        total
      </text>
      {arcs.map((a, i) => (
        <g key={`l${i}`}>
          <rect x={370} y={20 + i * 22} width={12} height={12} rx={3} fill={a.color} opacity={0.85} />
          <text x={388} y={30 + i * 22} fontSize="10" fill="currentColor" className="fill-current body-text">
            {a.label?.slice(0, 12)} ({a.pct}%)
          </text>
        </g>
      ))}
    </svg>
  );
}

function ScatterChartSVG({ rows, x, y }: { rows: DataRow[]; x: string; y: string }) {
  const xVals = rows.map((r, i) => Number(r[x]) || i);
  const yVals = rows.map((r) => Number(r[y]) || 0);
  const xMax = Math.max(...xVals, 1);
  const yMax = Math.max(...yVals, 1);
  const w = 500;
  const h = 280;
  const padL = 55;
  const padB = 45;
  const padT = 20;
  const padR = 20;
  const chartW = w - padL - padR;
  const chartH = h - padT - padB;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-full">
      {[0, 0.25, 0.5, 0.75, 1].map((frac) => (
        <line key={frac} x1={padL} y1={padT + chartH * (1 - frac)} x2={w - padR} y2={padT + chartH * (1 - frac)} stroke="currentColor" opacity={0.07} />
      ))}
      {rows.map((_, i) => {
        const px = padL + (xVals[i] / xMax) * chartW;
        const py = padT + chartH - (yVals[i] / yMax) * chartH;
        return (
          <circle key={i} cx={px} cy={py} r={6} fill={PALETTE[i % PALETTE.length]} opacity={0.75} />
        );
      })}
      <line x1={padL} y1={padT + chartH} x2={w - padR} y2={padT + chartH} stroke="currentColor" opacity={0.15} />
      <line x1={padL} y1={padT} x2={padL} y2={padT + chartH} stroke="currentColor" opacity={0.15} />
      <text x={w / 2} y={h - 4} textAnchor="middle" fontSize="10" fill="currentColor" className="fill-current muted-text">{x}</text>
      <text x={14} y={h / 2} textAnchor="middle" fontSize="10" fill="currentColor" className="fill-current muted-text" transform={`rotate(-90,14,${h / 2})`}>{y}</text>
    </svg>
  );
}

const RENDERERS: Record<ChartType, React.FC<{ rows: DataRow[]; x: string; y: string }>> = {
  bar: BarChartSVG,
  line: LineChartSVG,
  area: AreaChartSVG,
  pie: PieChartSVG,
  donut: DonutChartSVG,
  scatter: ScatterChartSVG,
};

// ---------- draggable column pill ----------

function ColumnPill({
  name,
  isNumeric,
  onDragStart,
}: {
  name: string;
  isNumeric: boolean;
  onDragStart: (e: DragEvent<HTMLSpanElement>) => void;
}) {
  return (
    <span
      draggable
      onDragStart={onDragStart}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono cursor-grab active:cursor-grabbing border transition-all select-none ${
        isNumeric
          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:border-emerald-500/40"
          : "bg-cyan-500/10 text-cyan-400 border-cyan-500/20 hover:border-cyan-500/40"
      }`}
    >
      <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" opacity={0.5}>
        <circle cx="3" cy="2" r="1" />
        <circle cx="7" cy="2" r="1" />
        <circle cx="3" cy="5" r="1" />
        <circle cx="7" cy="5" r="1" />
        <circle cx="3" cy="8" r="1" />
        <circle cx="7" cy="8" r="1" />
      </svg>
      {name}
      <span className="text-[9px] opacity-50">
        {isNumeric ? "123" : "abc"}
      </span>
    </span>
  );
}

// ---------- drop zone for axis ----------

function AxisDropZone({
  label,
  value,
  onDrop,
  onClear,
  dragOver,
  onDragOver,
  onDragLeave,
}: {
  label: string;
  value: string | null;
  onDrop: (e: DragEvent<HTMLDivElement>) => void;
  onClear: () => void;
  dragOver: boolean;
  onDragOver: (e: DragEvent<HTMLDivElement>) => void;
  onDragLeave: () => void;
}) {
  return (
    <div
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      className={`rounded-lg border-2 border-dashed p-3 transition-all min-h-[52px] flex items-center gap-3 ${
        dragOver
          ? "border-cyan-400 bg-cyan-500/10"
          : value
          ? "border-transparent bg-white/5"
          : "border-gray-600/30 bg-transparent"
      }`}
    >
      <span className="text-[10px] font-mono uppercase tracking-wider muted-text shrink-0 w-12">
        {label}
      </span>
      {value ? (
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono bg-cyan-500/15 text-cyan-300 border border-cyan-500/20">
          {value}
          <button
            onClick={onClear}
            className="text-cyan-400/50 hover:text-cyan-300 transition-colors cursor-pointer"
          >
            x
          </button>
        </span>
      ) : (
        <span className="text-xs muted-text">
          Drag a column here
        </span>
      )}
    </div>
  );
}

// ---------- main component ----------

function ChartMakerApp() {
  const [rawData, setRawData] = useState(SAMPLE_CSV);
  const [config, setConfig] = useState<ChartConfig>({
    type: "bar",
    xColumn: "Month",
    yColumn: "Revenue",
  });
  const [fileDragOver, setFileDragOver] = useState(false);
  const [xDragOver, setXDragOver] = useState(false);
  const [yDragOver, setYDragOver] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState(false);
  const [showData, setShowData] = useState(false);
  const svgRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { columns, rows } = useMemo(() => parseCSV(rawData), [rawData]);

  const numericColumns = useMemo(
    () => columns.filter((c) => rows.length > 0 && typeof rows[0][c] === "number"),
    [columns, rows]
  );
  const stringColumns = useMemo(
    () => columns.filter((c) => rows.length > 0 && typeof rows[0][c] === "string"),
    [columns, rows]
  );

  // auto-assign columns when data changes
  const effectiveX = config.xColumn && columns.includes(config.xColumn) ? config.xColumn : stringColumns[0] || columns[0] || null;
  const effectiveY = config.yColumn && columns.includes(config.yColumn) ? config.yColumn : numericColumns[0] || columns[1] || null;

  const Renderer = RENDERERS[config.type];

  // file drop handling
  const handleFileDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setFileDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result;
      if (typeof text === "string") {
        setRawData(text);
        setConfig((c) => ({ ...c, xColumn: null, yColumn: null }));
      }
    };
    reader.readAsText(file);
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result;
      if (typeof text === "string") {
        setRawData(text);
        setConfig((c) => ({ ...c, xColumn: null, yColumn: null }));
      }
    };
    reader.readAsText(file);
  }, []);

  // column drag handling
  const handleColumnDragStart = useCallback((e: DragEvent<HTMLSpanElement>, col: string) => {
    e.dataTransfer.setData("text/plain", col);
    e.dataTransfer.effectAllowed = "copy";
  }, []);

  const handleXDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setXDragOver(false);
    const col = e.dataTransfer.getData("text/plain");
    if (col) setConfig((c) => ({ ...c, xColumn: col }));
  }, []);

  const handleYDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setYDragOver(false);
    const col = e.dataTransfer.getData("text/plain");
    if (col) setConfig((c) => ({ ...c, yColumn: col }));
  }, []);

  // export
  const handleCopySVG = useCallback(() => {
    const svgEl = svgRef.current?.querySelector("svg");
    if (!svgEl) return;
    navigator.clipboard.writeText(new XMLSerializer().serializeToString(svgEl)).then(() => {
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 2000);
    });
  }, []);

  const handleDownloadPNG = useCallback(() => {
    const svgEl = svgRef.current?.querySelector("svg");
    if (!svgEl) return;
    const markup = new XMLSerializer().serializeToString(svgEl);
    const canvas = document.createElement("canvas");
    const scale = 2;
    canvas.width = 1000 * scale;
    canvas.height = 560 * scale;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const img = new Image();
    const blob = new Blob([markup], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    img.onload = () => {
      ctx.fillStyle = "#0a0a0f";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      const a = document.createElement("a");
      a.download = `chart-${config.type}.png`;
      a.href = canvas.toDataURL("image/png");
      a.click();
    };
    img.src = url;
  }, [config.type]);

  const handleDownloadSVG = useCallback(() => {
    const svgEl = svgRef.current?.querySelector("svg");
    if (!svgEl) return;
    const markup = new XMLSerializer().serializeToString(svgEl);
    const blob = new Blob([markup], { type: "image/svg+xml;charset=utf-8" });
    const a = document.createElement("a");
    a.download = `chart-${config.type}.svg`;
    a.href = URL.createObjectURL(blob);
    a.click();
  }, [config.type]);

  const canRender = effectiveX && effectiveY && rows.length > 0;

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight heading">
            Free Chart Maker
          </h1>
          <p className="mt-4 text-lg body-text max-w-2xl mx-auto">
            Drop a CSV file, drag columns to axes, and get a publication-ready chart.
            No sign-up, no watermarks. Free graph maker powered by Chart.ts.
          </p>
        </div>
      </section>

      {/* Main workspace */}
      <section className="pb-8 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-[340px_1fr] gap-6">
            {/* Left panel: controls */}
            <div className="space-y-5">
              {/* File drop zone */}
              <div
                onDrop={handleFileDrop}
                onDragOver={(e) => { e.preventDefault(); setFileDragOver(true); }}
                onDragLeave={() => setFileDragOver(false)}
                onClick={() => fileInputRef.current?.click()}
                className={`rounded-xl border-2 border-dashed p-6 text-center transition-all cursor-pointer ${
                  fileDragOver
                    ? "border-cyan-400 bg-cyan-500/10"
                    : "border-gray-600/30 hover:border-gray-500/50"
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv,.tsv,.txt"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <svg className="w-8 h-8 mx-auto mb-2 muted-text" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
                <p className="text-sm heading font-medium">
                  Drop CSV file here
                </p>
                <p className="text-xs muted-text mt-1">
                  or click to browse
                </p>
              </div>

              {/* Chart type picker */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider muted-text mb-2">
                  Chart type
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {CHART_TYPES.map((ct) => (
                    <button
                      key={ct.value}
                      onClick={() => setConfig((c) => ({ ...c, type: ct.value }))}
                      className={`px-3 py-2.5 rounded-lg text-xs font-medium transition-all cursor-pointer border ${
                        config.type === ct.value
                          ? "bg-cyan-500/15 text-cyan-300 border-cyan-500/30"
                          : "card border-transparent hover:border-gray-600/50 body-text"
                      }`}
                    >
                      {ct.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Available columns */}
              {columns.length > 0 && (
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider muted-text mb-2">
                    Columns — drag to axes
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {columns.map((col) => (
                      <ColumnPill
                        key={col}
                        name={col}
                        isNumeric={numericColumns.includes(col)}
                        onDragStart={(e) => handleColumnDragStart(e, col)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Axis drop zones */}
              <div className="space-y-2">
                <AxisDropZone
                  label="X axis"
                  value={effectiveX}
                  onDrop={handleXDrop}
                  onClear={() => setConfig((c) => ({ ...c, xColumn: null }))}
                  dragOver={xDragOver}
                  onDragOver={(e) => { e.preventDefault(); setXDragOver(true); }}
                  onDragLeave={() => setXDragOver(false)}
                />
                <AxisDropZone
                  label="Y axis"
                  value={effectiveY}
                  onDrop={handleYDrop}
                  onClear={() => setConfig((c) => ({ ...c, yColumn: null }))}
                  dragOver={yDragOver}
                  onDragOver={(e) => { e.preventDefault(); setYDragOver(true); }}
                  onDragLeave={() => setYDragOver(false)}
                />
              </div>

              {/* Export buttons */}
              <div className="flex gap-2">
                <button
                  onClick={handleCopySVG}
                  disabled={!canRender}
                  className="flex-1 px-3 py-2.5 text-xs font-semibold rounded-lg bg-cyan-500 text-white hover:bg-cyan-400 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {copyFeedback ? "Copied!" : "Copy SVG"}
                </button>
                <button
                  onClick={handleDownloadSVG}
                  disabled={!canRender}
                  className="flex-1 px-3 py-2.5 text-xs font-semibold rounded-lg card body-text hover:border-cyan-500/30 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Save SVG
                </button>
                <button
                  onClick={handleDownloadPNG}
                  disabled={!canRender}
                  className="flex-1 px-3 py-2.5 text-xs font-semibold rounded-lg card body-text hover:border-cyan-500/30 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Save PNG
                </button>
              </div>

              {/* Toggle raw data */}
              <button
                onClick={() => setShowData(!showData)}
                className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer font-mono"
              >
                {showData ? "Hide" : "Edit"} raw data
              </button>

              {showData && (
                <textarea
                  value={rawData}
                  onChange={(e) => setRawData(e.target.value)}
                  rows={10}
                  spellCheck={false}
                  className="w-full px-3 py-2 rounded-lg text-xs font-mono bg-transparent border adaptive-border heading focus:border-cyan-500/50 focus:outline-none transition-colors resize-y leading-relaxed"
                />
              )}
            </div>

            {/* Right panel: chart preview + data table */}
            <div className="space-y-4">
              {/* Chart preview */}
              <div className="card rounded-xl p-6 min-h-[360px] flex items-center justify-center">
                {canRender ? (
                  <div ref={svgRef} className="w-full heading">
                    <Renderer rows={rows} x={effectiveX} y={effectiveY} />
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="muted-text text-sm mb-1">
                      {rows.length === 0
                        ? "Drop a CSV file or paste data to get started"
                        : "Drag columns to the X and Y axis drop zones"
                      }
                    </p>
                  </div>
                )}
              </div>

              {/* Data table preview */}
              {rows.length > 0 && (
                <div className="card rounded-xl overflow-hidden">
                  <div className="px-4 py-2.5 border-b adaptive-border flex items-center justify-between">
                    <span className="text-xs font-mono muted-text uppercase tracking-wider">
                      Data preview
                    </span>
                    <span className="text-xs muted-text">
                      {rows.length} rows, {columns.length} columns
                    </span>
                  </div>
                  <div className="overflow-x-auto max-h-[200px] overflow-y-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b adaptive-border">
                          {columns.map((col) => (
                            <th
                              key={col}
                              draggable
                              onDragStart={(e) => handleColumnDragStart(e as unknown as DragEvent<HTMLSpanElement>, col)}
                              className={`text-left p-2.5 font-mono cursor-grab active:cursor-grabbing select-none transition-colors hover:text-cyan-400 ${
                                col === effectiveX || col === effectiveY
                                  ? "text-cyan-400"
                                  : "muted-text"
                              }`}
                            >
                              {col}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {rows.slice(0, 10).map((row, i) => (
                          <tr key={i} className={i < Math.min(rows.length, 10) - 1 ? "border-b adaptive-border" : ""}>
                            {columns.map((col) => (
                              <td key={col} className="p-2.5 body-text font-mono">
                                {typeof row[col] === "number"
                                  ? (row[col] as number).toLocaleString()
                                  : String(row[col])
                                }
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {rows.length > 10 && (
                    <div className="px-4 py-2 border-t adaptive-border">
                      <span className="text-xs muted-text">
                        Showing first 10 of {rows.length} rows
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Powered by */}
      <section className="pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="rounded-2xl card p-10 text-center">
            <h2 className="text-xl font-bold heading mb-3">
              Build charts in your own app
            </h2>
            <p className="body-text mb-6 max-w-md mx-auto text-sm">
              This chart maker is powered by Chart.ts. Get 40+ chart types,
              Tailwind CSS integration, and framework adapters for React, Vue,
              Svelte, Solid, and Angular. Under 15kb, free and open source.
            </p>
            <div className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-gray-800/50 border border-gray-700/50 mb-6">
              <span className="muted-text font-mono text-sm">$</span>
              <code className="font-mono heading text-sm">npm install @chartts/core</code>
            </div>
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

// ---------- page export ----------

export default function ChartMakerPage() {
  return <ChartMakerApp />;
}
