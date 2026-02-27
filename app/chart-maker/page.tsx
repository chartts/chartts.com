"use client";

import { useState, useRef, useCallback, useMemo, type DragEvent } from "react";
import Link from "next/link";

// ---------- types ----------

type ChartType = "bar" | "line" | "pie" | "scatter" | "area" | "donut";

interface ChartConfig {
  type: ChartType;
  xColumn: string | null;
  yColumns: string[];
}

// ---------- colours ----------

const PALETTE = [
  "#06b6d4", "#10b981", "#f59e0b", "#ef4444",
  "#8b5cf6", "#ec4899", "#14b8a6", "#f97316",
];

// ---------- sample data ----------

const SAMPLE_COLUMNS = ["Month", "Revenue", "Users", "Signups"];
const SAMPLE_ROWS = [
  ["January", "4200", "1200", "340"],
  ["February", "5800", "1800", "420"],
  ["March", "7100", "2400", "510"],
  ["April", "6800", "3200", "480"],
  ["May", "9200", "4100", "620"],
  ["June", "8400", "3800", "590"],
  ["July", "11200", "5200", "710"],
  ["August", "10500", "4900", "680"],
];

// ---------- helpers ----------

function isNumericCol(rows: string[][], colIdx: number): boolean {
  if (rows.length === 0) return false;
  return rows.every((r) => r[colIdx] !== undefined && !isNaN(parseFloat(r[colIdx])) && r[colIdx].trim() !== "");
}

function getNumVal(rows: string[][], rowIdx: number, colIdx: number): number {
  return parseFloat(rows[rowIdx]?.[colIdx] ?? "0") || 0;
}

function parseCSVToGrid(raw: string): { columns: string[]; rows: string[][] } {
  const lines = raw.trim().split(/\r?\n/).filter(Boolean);
  if (lines.length < 1) return { columns: [], rows: [] };
  const columns = lines[0].split(/[,\t]/).map((c) => c.trim().replace(/^"|"$/g, ""));
  const rows = lines.slice(1).map((line) =>
    line.split(/[,\t]/).map((v) => v.trim().replace(/^"|"$/g, ""))
  );
  return { columns, rows };
}

// ---------- chart type config ----------

const CHART_TYPES: { value: ChartType; label: string }[] = [
  { value: "bar", label: "Bar" },
  { value: "line", label: "Line" },
  { value: "area", label: "Area" },
  { value: "pie", label: "Pie" },
  { value: "donut", label: "Donut" },
  { value: "scatter", label: "Scatter" },
];

// ---------- multi-series chart renderers ----------

const W = 500;
const H = 300;
const PAD = { t: 25, r: 20, b: 50, l: 58 };
const CW = W - PAD.l - PAD.r;
const CH = H - PAD.t - PAD.b;

function GridAndAxes({ max, xLabels, yLabel }: { max: number; xLabels: string[]; yLabel: string }) {
  return (
    <>
      {[0, 0.25, 0.5, 0.75, 1].map((f) => (
        <g key={f}>
          <line x1={PAD.l} y1={PAD.t + CH * (1 - f)} x2={W - PAD.r} y2={PAD.t + CH * (1 - f)} stroke="currentColor" opacity={0.07} />
          <text x={PAD.l - 8} y={PAD.t + CH * (1 - f) + 3} textAnchor="end" fontSize="9" fill="currentColor" className="fill-current muted-text">
            {Math.round(max * f).toLocaleString()}
          </text>
        </g>
      ))}
      {xLabels.map((label, i) => (
        <text key={i} x={PAD.l + (i + 0.5) * (CW / xLabels.length)} y={H - PAD.b + 16} textAnchor="middle" fontSize="9" fill="currentColor" className="fill-current muted-text">
          {label.slice(0, 10)}
        </text>
      ))}
      <line x1={PAD.l} y1={PAD.t + CH} x2={W - PAD.r} y2={PAD.t + CH} stroke="currentColor" opacity={0.15} />
      <line x1={PAD.l} y1={PAD.t} x2={PAD.l} y2={PAD.t + CH} stroke="currentColor" opacity={0.15} />
      <text x={14} y={H / 2} textAnchor="middle" fontSize="9" fill="currentColor" className="fill-current muted-text" transform={`rotate(-90,14,${H / 2})`}>{yLabel}</text>
    </>
  );
}

function Legend({ series }: { series: { name: string; color: string }[] }) {
  if (series.length <= 1) return null;
  return (
    <>
      {series.map((s, i) => (
        <g key={i}>
          <rect x={PAD.l + i * 90} y={H - 12} width={10} height={10} rx={2} fill={s.color} opacity={0.85} />
          <text x={PAD.l + i * 90 + 14} y={H - 3} fontSize="9" fill="currentColor" className="fill-current muted-text">
            {s.name.slice(0, 10)}
          </text>
        </g>
      ))}
    </>
  );
}

interface MultiProps {
  rows: string[][];
  columns: string[];
  xCol: number;
  yCols: number[];
}

function BarChartMulti({ rows, columns, xCol, yCols }: MultiProps) {
  const labels = rows.map((r) => r[xCol] || "");
  const allVals = yCols.flatMap((ci) => rows.map((r) => getNumVal(rows, rows.indexOf(r), ci)));
  const max = Math.max(...allVals, 1);
  const groupW = CW / rows.length;
  const barW = Math.min(30, (groupW - 4) / yCols.length - 2);
  const series = yCols.map((ci, si) => ({ name: columns[ci], color: PALETTE[si % PALETTE.length] }));

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
      <GridAndAxes max={max} xLabels={labels} yLabel={yCols.map((c) => columns[c]).join(", ")} />
      {rows.map((row, ri) =>
        yCols.map((ci, si) => {
          const v = getNumVal(rows, ri, ci);
          const barH = (v / max) * CH || 1;
          const xPos = PAD.l + ri * groupW + (groupW - barW * yCols.length - 2 * (yCols.length - 1)) / 2 + si * (barW + 2);
          return (
            <rect key={`${ri}-${si}`} x={xPos} y={PAD.t + CH - barH} width={barW} height={barH} rx={2} fill={series[si].color} opacity={0.85} />
          );
        })
      )}
      <Legend series={series} />
    </svg>
  );
}

function LineChartMulti({ rows, columns, xCol, yCols }: MultiProps) {
  const labels = rows.map((r) => r[xCol] || "");
  const allVals = yCols.flatMap((ci) => rows.map((_, ri) => getNumVal(rows, ri, ci)));
  const max = Math.max(...allVals, 1);
  const series = yCols.map((ci, si) => ({ name: columns[ci], color: PALETTE[si % PALETTE.length] }));

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
      <GridAndAxes max={max} xLabels={labels} yLabel={yCols.map((c) => columns[c]).join(", ")} />
      {yCols.map((ci, si) => {
        const pts = rows.map((_, ri) => ({
          x: PAD.l + (ri / Math.max(rows.length - 1, 1)) * CW,
          y: PAD.t + CH - (getNumVal(rows, ri, ci) / max) * CH,
        }));
        const d = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
        return (
          <g key={si}>
            <path d={d} fill="none" stroke={series[si].color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" opacity={0.85} />
            {pts.map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r={3.5} fill="var(--c-bg, #0a0a0f)" stroke={series[si].color} strokeWidth={2} />
            ))}
          </g>
        );
      })}
      <Legend series={series} />
    </svg>
  );
}

function AreaChartMulti({ rows, columns, xCol, yCols }: MultiProps) {
  const labels = rows.map((r) => r[xCol] || "");
  const allVals = yCols.flatMap((ci) => rows.map((_, ri) => getNumVal(rows, ri, ci)));
  const max = Math.max(...allVals, 1);
  const series = yCols.map((ci, si) => ({ name: columns[ci], color: PALETTE[si % PALETTE.length] }));

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
      <defs>
        {yCols.map((_, si) => (
          <linearGradient key={si} id={`af${si}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={series[si].color} stopOpacity={0.25} />
            <stop offset="100%" stopColor={series[si].color} stopOpacity={0.02} />
          </linearGradient>
        ))}
      </defs>
      <GridAndAxes max={max} xLabels={labels} yLabel={yCols.map((c) => columns[c]).join(", ")} />
      {yCols.map((ci, si) => {
        const pts = rows.map((_, ri) => ({
          x: PAD.l + (ri / Math.max(rows.length - 1, 1)) * CW,
          y: PAD.t + CH - (getNumVal(rows, ri, ci) / max) * CH,
        }));
        const lineD = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
        const areaD = `${lineD} L${pts[pts.length - 1].x},${PAD.t + CH} L${pts[0].x},${PAD.t + CH} Z`;
        return (
          <g key={si}>
            <path d={areaD} fill={`url(#af${si})`} />
            <path d={lineD} fill="none" stroke={series[si].color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" opacity={0.85} />
          </g>
        );
      })}
      <Legend series={series} />
    </svg>
  );
}

function PieChartMulti({ rows, columns, xCol, yCols }: MultiProps) {
  const ci = yCols[0];
  const labels = rows.map((r) => r[xCol] || "");
  const values = rows.map((_, ri) => getNumVal(rows, ri, ci));
  const total = values.reduce((a, b) => a + b, 0) || 1;
  const cx = 200; const cy = 150; const r = 105;
  let start = -Math.PI / 2;
  const slices = values.map((v, i) => {
    const angle = (v / total) * Math.PI * 2;
    const end = start + angle;
    const x1 = cx + r * Math.cos(start); const y1 = cy + r * Math.sin(start);
    const x2 = cx + r * Math.cos(end); const y2 = cy + r * Math.sin(end);
    const d = `M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${angle > Math.PI ? 1 : 0} 1 ${x2},${y2} Z`;
    start = end;
    return { d, color: PALETTE[i % PALETTE.length], label: labels[i], pct: Math.round((v / total) * 100) };
  });
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
      {slices.map((s, i) => <path key={i} d={s.d} fill={s.color} opacity={0.85} stroke="var(--c-bg, #0a0a0f)" strokeWidth={2} />)}
      {slices.map((s, i) => (
        <g key={`l${i}`}>
          <rect x={380} y={20 + i * 22} width={12} height={12} rx={3} fill={s.color} opacity={0.85} />
          <text x={398} y={30 + i * 22} fontSize="9" fill="currentColor" className="fill-current muted-text">{s.label?.slice(0, 12)} ({s.pct}%)</text>
        </g>
      ))}
      {yCols.length > 1 && <text x={cx} y={H - 8} textAnchor="middle" fontSize="8" fill="currentColor" className="fill-current muted-text">Showing: {columns[ci]}</text>}
    </svg>
  );
}

function DonutChartMulti({ rows, columns, xCol, yCols }: MultiProps) {
  const ci = yCols[0];
  const labels = rows.map((r) => r[xCol] || "");
  const values = rows.map((_, ri) => getNumVal(rows, ri, ci));
  const total = values.reduce((a, b) => a + b, 0) || 1;
  const cx = 200; const cy = 150; const outer = 105; const inner = 65;
  let start = -Math.PI / 2;
  const arcs = values.map((v, i) => {
    const angle = (v / total) * Math.PI * 2;
    const end = start + angle;
    const la = angle > Math.PI ? 1 : 0;
    const d = `M${cx + outer * Math.cos(start)},${cy + outer * Math.sin(start)} A${outer},${outer} 0 ${la} 1 ${cx + outer * Math.cos(end)},${cy + outer * Math.sin(end)} L${cx + inner * Math.cos(end)},${cy + inner * Math.sin(end)} A${inner},${inner} 0 ${la} 0 ${cx + inner * Math.cos(start)},${cy + inner * Math.sin(start)} Z`;
    start = end;
    return { d, color: PALETTE[i % PALETTE.length], label: labels[i], pct: Math.round((v / total) * 100) };
  });
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
      {arcs.map((a, i) => <path key={i} d={a.d} fill={a.color} opacity={0.85} stroke="var(--c-bg, #0a0a0f)" strokeWidth={2} />)}
      <text x={cx} y={cy} textAnchor="middle" fontSize="22" fontWeight="700" fill="currentColor" className="fill-current heading">{total.toLocaleString()}</text>
      <text x={cx} y={cy + 16} textAnchor="middle" fontSize="9" fill="currentColor" className="fill-current muted-text">total</text>
      {arcs.map((a, i) => (
        <g key={`l${i}`}>
          <rect x={380} y={20 + i * 22} width={12} height={12} rx={3} fill={a.color} opacity={0.85} />
          <text x={398} y={30 + i * 22} fontSize="9" fill="currentColor" className="fill-current muted-text">{a.label?.slice(0, 12)} ({a.pct}%)</text>
        </g>
      ))}
    </svg>
  );
}

function ScatterChartMulti({ rows, columns, xCol, yCols }: MultiProps) {
  const xIsNum = isNumericCol(rows, xCol);
  const xVals = rows.map((r, i) => xIsNum ? (parseFloat(r[xCol]) || 0) : i);
  const allYVals = yCols.flatMap((ci) => rows.map((_, ri) => getNumVal(rows, ri, ci)));
  const xMax = Math.max(...xVals, 1);
  const yMax = Math.max(...allYVals, 1);
  const labels = xIsNum ? [] : rows.map((r) => r[xCol] || "");
  const series = yCols.map((ci, si) => ({ name: columns[ci], color: PALETTE[si % PALETTE.length] }));

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
      {[0, 0.25, 0.5, 0.75, 1].map((f) => (
        <line key={f} x1={PAD.l} y1={PAD.t + CH * (1 - f)} x2={W - PAD.r} y2={PAD.t + CH * (1 - f)} stroke="currentColor" opacity={0.07} />
      ))}
      {yCols.map((ci, si) =>
        rows.map((_, ri) => {
          const px = PAD.l + (xVals[ri] / xMax) * CW;
          const py = PAD.t + CH - (getNumVal(rows, ri, ci) / yMax) * CH;
          return <circle key={`${si}-${ri}`} cx={px} cy={py} r={5} fill={series[si].color} opacity={0.7} />;
        })
      )}
      <line x1={PAD.l} y1={PAD.t + CH} x2={W - PAD.r} y2={PAD.t + CH} stroke="currentColor" opacity={0.15} />
      <line x1={PAD.l} y1={PAD.t} x2={PAD.l} y2={PAD.t + CH} stroke="currentColor" opacity={0.15} />
      {!xIsNum && labels.map((l, i) => (
        <text key={i} x={PAD.l + (i + 0.5) * (CW / labels.length)} y={H - PAD.b + 16} textAnchor="middle" fontSize="9" fill="currentColor" className="fill-current muted-text">{l.slice(0, 10)}</text>
      ))}
      <Legend series={series} />
    </svg>
  );
}

const RENDERERS: Record<ChartType, React.FC<MultiProps>> = {
  bar: BarChartMulti,
  line: LineChartMulti,
  area: AreaChartMulti,
  pie: PieChartMulti,
  donut: DonutChartMulti,
  scatter: ScatterChartMulti,
};

// ---------- editable cell ----------

function EditableCell({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  const commit = () => {
    setEditing(false);
    if (draft !== value) onChange(draft);
  };

  if (editing) {
    return (
      <input
        ref={inputRef}
        autoFocus
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => { if (e.key === "Enter") commit(); if (e.key === "Escape") { setDraft(value); setEditing(false); } }}
        className="w-full bg-transparent border-b border-cyan-500/50 outline-none text-xs font-mono heading py-0.5 px-0"
      />
    );
  }

  return (
    <span
      onClick={() => { setDraft(value); setEditing(true); }}
      className="block w-full cursor-text py-0.5 hover:text-cyan-400 transition-colors"
    >
      {value || <span className="muted-text italic">empty</span>}
    </span>
  );
}

// ---------- column pill ----------

function ColumnPill({ name, isNumeric, onDragStart }: { name: string; isNumeric: boolean; onDragStart: (e: DragEvent<HTMLSpanElement>) => void }) {
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
        <circle cx="3" cy="2" r="1" /><circle cx="7" cy="2" r="1" />
        <circle cx="3" cy="5" r="1" /><circle cx="7" cy="5" r="1" />
        <circle cx="3" cy="8" r="1" /><circle cx="7" cy="8" r="1" />
      </svg>
      {name}
      <span className="text-[9px] opacity-50">{isNumeric ? "123" : "abc"}</span>
    </span>
  );
}

// ---------- multi Y axis drop zone ----------

function YAxisDropZone({
  yColumns,
  columns,
  onDrop,
  onRemove,
  dragOver,
  onDragOver,
  onDragLeave,
}: {
  yColumns: string[];
  columns: string[];
  onDrop: (e: DragEvent<HTMLDivElement>) => void;
  onRemove: (col: string) => void;
  dragOver: boolean;
  onDragOver: (e: DragEvent<HTMLDivElement>) => void;
  onDragLeave: () => void;
}) {
  return (
    <div
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      className={`rounded-lg border-2 border-dashed p-3 transition-all min-h-[52px] flex items-center gap-2 flex-wrap ${
        dragOver ? "border-cyan-400 bg-cyan-500/10" : yColumns.length > 0 ? "border-transparent bg-white/5" : "border-gray-600/30 bg-transparent"
      }`}
    >
      <span className="text-[10px] font-mono uppercase tracking-wider muted-text shrink-0 w-12">Y axis</span>
      {yColumns.length > 0 ? (
        yColumns.map((col) => (
          <span key={col} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono bg-emerald-500/15 text-emerald-300 border border-emerald-500/20">
            {col}
            <button onClick={() => onRemove(col)} className="text-emerald-400/50 hover:text-emerald-300 transition-colors cursor-pointer text-[10px]">x</button>
          </span>
        ))
      ) : (
        <span className="text-xs muted-text">Drag columns here (multiple OK)</span>
      )}
    </div>
  );
}

// ---------- main component ----------

function ChartMakerApp() {
  const [columns, setColumns] = useState<string[]>(SAMPLE_COLUMNS);
  const [rows, setRows] = useState<string[][]>(SAMPLE_ROWS);
  const [config, setConfig] = useState<ChartConfig>({
    type: "bar",
    xColumn: "Month",
    yColumns: ["Revenue", "Users"],
  });
  const [fileDragOver, setFileDragOver] = useState(false);
  const [xDragOver, setXDragOver] = useState(false);
  const [yDragOver, setYDragOver] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState(false);
  const svgRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const numericCols = useMemo(() => columns.filter((_, ci) => isNumericCol(rows, ci)), [columns, rows]);

  // resolve effective columns
  const xColIdx = config.xColumn ? columns.indexOf(config.xColumn) : -1;
  const effectiveXIdx = xColIdx >= 0 ? xColIdx : columns.findIndex((_, ci) => !isNumericCol(rows, ci));
  const effectiveX = effectiveXIdx >= 0 ? columns[effectiveXIdx] : columns[0] || null;

  const effectiveYCols = config.yColumns.filter((c) => columns.includes(c));
  const yColIdxs = effectiveYCols.map((c) => columns.indexOf(c)).filter((i) => i >= 0);

  const Renderer = RENDERERS[config.type];
  const canRender = effectiveX !== null && yColIdxs.length > 0 && rows.length > 0;

  // --- data editing ---
  const updateCell = useCallback((ri: number, ci: number, value: string) => {
    setRows((prev) => prev.map((r, i) => i === ri ? r.map((v, j) => j === ci ? value : v) : r));
  }, []);

  const updateHeader = useCallback((ci: number, value: string) => {
    if (!value.trim() || columns.includes(value.trim())) return;
    const oldName = columns[ci];
    setColumns((prev) => prev.map((c, i) => i === ci ? value.trim() : c));
    setConfig((prev) => ({
      ...prev,
      xColumn: prev.xColumn === oldName ? value.trim() : prev.xColumn,
      yColumns: prev.yColumns.map((y) => y === oldName ? value.trim() : y),
    }));
  }, [columns]);

  const addRow = useCallback(() => {
    setRows((prev) => [...prev, columns.map(() => "")]);
  }, [columns]);

  const deleteRow = useCallback((ri: number) => {
    setRows((prev) => prev.filter((_, i) => i !== ri));
  }, []);

  const addColumn = useCallback(() => {
    let name = "New Column";
    let n = 1;
    while (columns.includes(name)) { name = `Column ${n++}`; }
    setColumns((prev) => [...prev, name]);
    setRows((prev) => prev.map((r) => [...r, "0"]));
  }, [columns]);

  const deleteColumn = useCallback((ci: number) => {
    const colName = columns[ci];
    setColumns((prev) => prev.filter((_, i) => i !== ci));
    setRows((prev) => prev.map((r) => r.filter((_, i) => i !== ci)));
    setConfig((prev) => ({
      ...prev,
      xColumn: prev.xColumn === colName ? null : prev.xColumn,
      yColumns: prev.yColumns.filter((y) => y !== colName),
    }));
  }, [columns]);

  // --- file handling ---
  const handleFileDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setFileDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result;
      if (typeof text === "string") {
        const parsed = parseCSVToGrid(text);
        setColumns(parsed.columns);
        setRows(parsed.rows);
        setConfig({ type: config.type, xColumn: null, yColumns: [] });
      }
    };
    reader.readAsText(file);
  }, [config.type]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result;
      if (typeof text === "string") {
        const parsed = parseCSVToGrid(text);
        setColumns(parsed.columns);
        setRows(parsed.rows);
        setConfig({ type: config.type, xColumn: null, yColumns: [] });
      }
    };
    reader.readAsText(file);
  }, [config.type]);

  // --- drag handling ---
  const handleColumnDragStart = useCallback((e: DragEvent<HTMLSpanElement>, col: string) => {
    e.dataTransfer.setData("text/plain", col);
    e.dataTransfer.effectAllowed = "copy";
  }, []);

  const handleXDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setXDragOver(false);
    const col = e.dataTransfer.getData("text/plain");
    if (col && columns.includes(col)) setConfig((c) => ({ ...c, xColumn: col }));
  }, [columns]);

  const handleYDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setYDragOver(false);
    const col = e.dataTransfer.getData("text/plain");
    if (col && columns.includes(col) && !config.yColumns.includes(col)) {
      setConfig((c) => ({ ...c, yColumns: [...c.yColumns, col] }));
    }
  }, [columns, config.yColumns]);

  // --- export ---
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
    canvas.width = 2000; canvas.height = 1200;
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
      a.download = `chart.png`;
      a.href = canvas.toDataURL("image/png");
      a.click();
    };
    img.src = url;
  }, []);

  const handleDownloadSVG = useCallback(() => {
    const svgEl = svgRef.current?.querySelector("svg");
    if (!svgEl) return;
    const blob = new Blob([new XMLSerializer().serializeToString(svgEl)], { type: "image/svg+xml;charset=utf-8" });
    const a = document.createElement("a");
    a.download = `chart.svg`;
    a.href = URL.createObjectURL(blob);
    a.click();
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-10 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight heading">
            Free Chart Maker
          </h1>
          <p className="mt-4 text-lg body-text max-w-2xl mx-auto">
            Edit data inline, drag columns to axes, plot multiple series. Export as SVG or PNG.
            No sign-up, no watermarks. Free graph maker powered by Chart.ts.
          </p>
        </div>
      </section>

      {/* Workspace */}
      <section className="pb-6 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-[360px_1fr] gap-6">
            {/* Left panel */}
            <div className="space-y-4">
              {/* File drop */}
              <div
                onDrop={handleFileDrop}
                onDragOver={(e) => { e.preventDefault(); setFileDragOver(true); }}
                onDragLeave={() => setFileDragOver(false)}
                onClick={() => fileInputRef.current?.click()}
                className={`rounded-xl border-2 border-dashed p-4 text-center transition-all cursor-pointer ${
                  fileDragOver ? "border-cyan-400 bg-cyan-500/10" : "border-gray-600/30 hover:border-gray-500/50"
                }`}
              >
                <input ref={fileInputRef} type="file" accept=".csv,.tsv,.txt" onChange={handleFileSelect} className="hidden" />
                <p className="text-sm heading font-medium">Drop CSV file or click to browse</p>
              </div>

              {/* Chart type */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider muted-text mb-2">Chart type</label>
                <div className="grid grid-cols-3 gap-2">
                  {CHART_TYPES.map((ct) => (
                    <button
                      key={ct.value}
                      onClick={() => setConfig((c) => ({ ...c, type: ct.value }))}
                      className={`px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer border ${
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

              {/* Columns */}
              {columns.length > 0 && (
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider muted-text mb-2">
                    Columns -- drag to axes
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {columns.map((col, ci) => (
                      <ColumnPill key={col} name={col} isNumeric={isNumericCol(rows, ci)} onDragStart={(e) => handleColumnDragStart(e, col)} />
                    ))}
                  </div>
                </div>
              )}

              {/* Axis drop zones */}
              <div className="space-y-2">
                {/* X axis */}
                <div
                  onDrop={handleXDrop}
                  onDragOver={(e) => { e.preventDefault(); setXDragOver(true); }}
                  onDragLeave={() => setXDragOver(false)}
                  className={`rounded-lg border-2 border-dashed p-3 transition-all min-h-[52px] flex items-center gap-3 ${
                    xDragOver ? "border-cyan-400 bg-cyan-500/10" : effectiveX ? "border-transparent bg-white/5" : "border-gray-600/30"
                  }`}
                >
                  <span className="text-[10px] font-mono uppercase tracking-wider muted-text shrink-0 w-12">X axis</span>
                  {effectiveX ? (
                    <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md text-xs font-mono bg-cyan-500/15 text-cyan-300 border border-cyan-500/20">
                      {effectiveX}
                      <button onClick={() => setConfig((c) => ({ ...c, xColumn: null }))} className="text-cyan-400/50 hover:text-cyan-300 transition-colors cursor-pointer text-[10px]">x</button>
                    </span>
                  ) : (
                    <span className="text-xs muted-text">Drag a column here</span>
                  )}
                </div>

                {/* Y axis (multi) */}
                <YAxisDropZone
                  yColumns={effectiveYCols}
                  columns={columns}
                  onDrop={handleYDrop}
                  onRemove={(col) => setConfig((c) => ({ ...c, yColumns: c.yColumns.filter((y) => y !== col) }))}
                  dragOver={yDragOver}
                  onDragOver={(e) => { e.preventDefault(); setYDragOver(true); }}
                  onDragLeave={() => setYDragOver(false)}
                />
              </div>

              {/* Export */}
              <div className="flex gap-2">
                <button onClick={handleCopySVG} disabled={!canRender} className="flex-1 px-3 py-2.5 text-xs font-semibold rounded-lg bg-cyan-500 text-white hover:bg-cyan-400 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed">
                  {copyFeedback ? "Copied!" : "Copy SVG"}
                </button>
                <button onClick={handleDownloadSVG} disabled={!canRender} className="flex-1 px-3 py-2.5 text-xs font-semibold rounded-lg card body-text hover:border-cyan-500/30 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed">
                  SVG
                </button>
                <button onClick={handleDownloadPNG} disabled={!canRender} className="flex-1 px-3 py-2.5 text-xs font-semibold rounded-lg card body-text hover:border-cyan-500/30 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed">
                  PNG
                </button>
              </div>
            </div>

            {/* Right panel: chart + editable table */}
            <div className="space-y-4">
              {/* Chart preview */}
              <div className="card rounded-xl p-6 min-h-[380px] flex items-center justify-center">
                {canRender ? (
                  <div ref={svgRef} className="w-full heading">
                    <Renderer rows={rows} columns={columns} xCol={effectiveXIdx} yCols={yColIdxs} />
                  </div>
                ) : (
                  <p className="muted-text text-sm">
                    {rows.length === 0 ? "Drop a CSV file or add data below" : "Drag columns to X and Y axis"}
                  </p>
                )}
              </div>

              {/* Editable data table */}
              <div className="card rounded-xl overflow-hidden">
                <div className="px-4 py-2.5 border-b adaptive-border flex items-center justify-between">
                  <span className="text-xs font-mono muted-text uppercase tracking-wider">
                    Data -- click any cell to edit
                  </span>
                  <div className="flex items-center gap-2">
                    <button onClick={addColumn} className="text-[10px] font-mono px-2 py-1 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 hover:bg-cyan-500/20 transition-colors cursor-pointer">
                      + Column
                    </button>
                    <button onClick={addRow} className="text-[10px] font-mono px-2 py-1 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 hover:bg-cyan-500/20 transition-colors cursor-pointer">
                      + Row
                    </button>
                  </div>
                </div>
                <div className="overflow-x-auto max-h-[320px] overflow-y-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b adaptive-border">
                        <th className="p-2 text-center muted-text w-8">#</th>
                        {columns.map((col, ci) => (
                          <th key={ci} className="p-2 text-left">
                            <div className="flex items-center gap-1">
                              <span
                                draggable
                                onDragStart={(e) => handleColumnDragStart(e as unknown as DragEvent<HTMLSpanElement>, col)}
                                className={`font-mono cursor-grab active:cursor-grabbing select-none transition-colors hover:text-cyan-400 ${
                                  col === effectiveX || effectiveYCols.includes(col) ? "text-cyan-400" : "muted-text"
                                }`}
                              >
                                <EditableCell value={col} onChange={(v) => updateHeader(ci, v)} />
                              </span>
                              {columns.length > 1 && (
                                <button onClick={() => deleteColumn(ci)} className="text-red-400/40 hover:text-red-400 transition-colors cursor-pointer text-[10px] ml-auto">x</button>
                              )}
                            </div>
                          </th>
                        ))}
                        <th className="p-2 w-8"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((row, ri) => (
                        <tr key={ri} className={ri < rows.length - 1 ? "border-b adaptive-border" : ""}>
                          <td className="p-2 text-center muted-text text-[10px]">{ri + 1}</td>
                          {row.map((cell, ci) => (
                            <td key={ci} className="p-2 body-text font-mono">
                              <EditableCell value={cell} onChange={(v) => updateCell(ri, ci, v)} />
                            </td>
                          ))}
                          <td className="p-2">
                            {rows.length > 1 && (
                              <button onClick={() => deleteRow(ri)} className="text-red-400/30 hover:text-red-400 transition-colors cursor-pointer text-[10px]">x</button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="rounded-2xl card p-10 text-center">
            <h2 className="text-xl font-bold heading mb-3">Build charts in your own app</h2>
            <p className="body-text mb-6 max-w-md mx-auto text-sm">
              This chart maker is powered by Chart.ts. 40+ chart types, Tailwind CSS, React/Vue/Svelte/Solid/Angular. Under 15kb, free and open source.
            </p>
            <div className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-gray-800/50 border border-gray-700/50 mb-6">
              <span className="muted-text font-mono text-sm">$</span>
              <code className="font-mono heading text-sm">npm install @chartts/core</code>
            </div>
            <div className="flex items-center justify-center gap-4">
              <Link href="/docs" className="px-6 py-3 text-sm font-semibold rounded-lg bg-cyan-500 text-white hover:bg-cyan-400 transition-colors cursor-pointer">Read the Docs</Link>
              <Link href="/examples" className="px-6 py-3 text-sm font-semibold rounded-lg card body-text transition-all cursor-pointer">View Examples</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function ChartMakerPage() {
  return <ChartMakerApp />;
}
