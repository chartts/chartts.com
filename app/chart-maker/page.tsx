"use client";

import { useState, useRef, useCallback, useMemo, type DragEvent } from "react";
import Link from "next/link";
import { renderToString } from "@chartts/core";
import type { ThemeConfig } from "@chartts/core";
import { EXTRA_THEMES } from "@chartts/themes";
import { sampleData, chartDisplayNames, chartTypes } from "@/lib/charts";

// ---------- types ----------

interface ChartConfig {
  type: string;
  xColumn: string | null;
  yColumns: string[];
}

// ---------- theme categories (same as playground) ----------

const BUILTIN_THEMES = ["dark", "light", "corporate", "saas", "startup", "editorial", "ocean"];
const THEME_CATEGORIES: { label: string; themes: string[] }[] = [
  { label: "Built-in", themes: BUILTIN_THEMES },
  { label: "Popular", themes: ["nord", "dracula", "catppuccin", "tokyo-night", "gruvbox", "one-dark", "rose-pine", "solarized-light", "solarized-dark", "synthwave", "cyberpunk"] },
  { label: "Editor", themes: ["monokai", "github-light", "github-dark", "ayu-light", "ayu-dark", "panda", "cobalt", "night-owl", "palenight", "andromeda"] },
  { label: "Brand", themes: ["stripe", "vercel", "linear", "figma", "notion", "slack", "spotify", "discord"] },
  { label: "Data Viz", themes: ["tableau", "d3-category10", "observable", "economist", "bloomberg", "financial-times"] },
  { label: "Nature", themes: ["forest", "ocean-deep", "volcanic", "aurora", "coral-reef", "desert-sand", "earth", "arctic", "autumn", "spring", "sunset"] },
  { label: "Modern UI", themes: ["glassmorphism", "neomorphism", "flat-design", "metro", "ios-light", "ios-dark", "carbon", "frost", "material", "minimal"] },
  { label: "Industry", themes: ["healthcare", "fintech", "gaming", "education", "government"] },
  { label: "Accessibility", themes: ["high-contrast-light", "high-contrast-dark", "colorblind-safe", "deuteranopia-safe"] },
];

function getThemeConfig(name: string): string | ThemeConfig {
  if (BUILTIN_THEMES.includes(name)) return name;
  const config = EXTRA_THEMES[name];
  return config ?? name;
}

// ---------- chart type categories ----------

const CHART_CATEGORIES: { label: string; types: string[] }[] = [
  { label: "Basic", types: ["bar", "line", "area", "pie", "donut", "scatter"] },
  { label: "Trending", types: ["step", "sparkline", "range", "baseline", "combo"] },
  { label: "Comparison", types: ["stacked-bar", "horizontal-bar", "lollipop", "bullet", "dumbbell", "pillar", "pareto"] },
  { label: "Composition", types: ["treemap", "sunburst", "pack", "funnel", "waterfall"] },
  { label: "Distribution", types: ["bubble", "histogram", "boxplot", "violin", "heatmap"] },
  { label: "Radial", types: ["radar", "polar", "radial-bar", "gauge"] },
  { label: "Financial", types: ["candlestick", "ohlc", "volume", "kagi", "renko"] },
  { label: "Relationship", types: ["sankey", "chord", "graph", "flow", "parallel"] },
  { label: "Hierarchy", types: ["tree", "org", "gantt"] },
  { label: "Specialty", types: ["calendar", "matrix", "geo", "wordcloud", "voronoi", "themeriver", "pictorialbar", "lines"] },
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

function parseCSVToGrid(raw: string): { columns: string[]; rows: string[][] } {
  const lines = raw.trim().split(/\r?\n/).filter(Boolean);
  if (lines.length < 1) return { columns: [], rows: [] };
  const columns = lines[0].split(/[,\t]/).map((c) => c.trim().replace(/^"|"$/g, ""));
  const rows = lines.slice(1).map((line) =>
    line.split(/[,\t]/).map((v) => v.trim().replace(/^"|"$/g, ""))
  );
  return { columns, rows };
}

// ---------- editable cell ----------

function EditableCell({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);

  const commit = () => {
    setEditing(false);
    if (draft !== value) onChange(draft);
  };

  if (editing) {
    return (
      <input
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

// ---------- Y axis drop zone ----------

function YAxisDropZone({
  yColumns, columns, onDrop, onRemove, dragOver, onDragOver, onDragLeave,
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
  const [theme, setTheme] = useState("dark");
  const [themeOpen, setThemeOpen] = useState(false);
  const [typeSearch, setTypeSearch] = useState("");
  const [fileDragOver, setFileDragOver] = useState(false);
  const [xDragOver, setXDragOver] = useState(false);
  const [yDragOver, setYDragOver] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState(false);
  const [urlCopied, setUrlCopied] = useState(false);
  const svgRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // resolve effective columns
  const xColIdx = config.xColumn ? columns.indexOf(config.xColumn) : -1;
  const effectiveXIdx = xColIdx >= 0 ? xColIdx : columns.findIndex((_, ci) => !isNumericCol(rows, ci));
  const effectiveX = effectiveXIdx >= 0 ? columns[effectiveXIdx] : columns[0] || null;
  const effectiveYCols = config.yColumns.filter((c) => columns.includes(c));
  const yColIdxs = effectiveYCols.map((c) => columns.indexOf(c)).filter((i) => i >= 0);
  const canRender = effectiveX !== null && yColIdxs.length > 0 && rows.length > 0;

  // convert grid data to chartts format
  const chartData = useMemo(() => {
    if (!canRender) return null;
    const labels = rows.map((r) => r[effectiveXIdx] || "");
    const series = yColIdxs.map((ci) => ({
      name: columns[ci],
      values: rows.map((r) => parseFloat(r[ci]) || 0),
    }));
    return { labels, series };
  }, [canRender, rows, effectiveXIdx, yColIdxs, columns]);

  // render chart using @chartts/core
  const svg = useMemo(() => {
    if (!chartData) return null;
    const plugin = chartTypes[config.type];
    if (!plugin) return null;
    try {
      const result = renderToString(plugin, chartData, {
        width: 600,
        height: 380,
        theme: getThemeConfig(theme) as any,
      });
      return result.replace('class="chartts"', 'class="chartts chartts-skip-anim"');
    } catch {
      return null;
    }
  }, [chartData, config.type, theme]);

  // also try to render using built-in sample data for chart types that need special data
  const sampleSvg = useMemo(() => {
    if (svg) return null; // primary render succeeded
    if (!chartData) return null;
    const plugin = chartTypes[config.type];
    if (!plugin) return null;
    const sample = sampleData[config.type];
    if (!sample) return null;
    try {
      const result = renderToString(plugin, sample, {
        width: 600,
        height: 380,
        theme: getThemeConfig(theme) as any,
      });
      return result.replace('class="chartts"', 'class="chartts chartts-skip-anim"');
    } catch {
      return null;
    }
  }, [svg, chartData, config.type, theme]);

  const renderedSvg = svg || sampleSvg;
  const usingSampleData = !svg && !!sampleSvg;

  // chart type display name
  const displayName = chartDisplayNames[config.type] ?? config.type;

  // chart type filtering
  const allAvailableTypes = Object.keys(chartTypes);
  const filteredCategories = useMemo(() => {
    if (!typeSearch.trim()) return CHART_CATEGORIES;
    const q = typeSearch.toLowerCase();
    return CHART_CATEGORIES.map((cat) => ({
      ...cat,
      types: cat.types.filter((t) =>
        t.includes(q) || (chartDisplayNames[t] ?? "").toLowerCase().includes(q)
      ),
    })).filter((cat) => cat.types.length > 0);
  }, [typeSearch]);

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
      a.download = `chart-${config.type}.png`;
      a.href = canvas.toDataURL("image/png");
      a.click();
    };
    img.src = url;
  }, [config.type]);

  const handleDownloadSVG = useCallback(() => {
    const svgEl = svgRef.current?.querySelector("svg");
    if (!svgEl) return;
    const blob = new Blob([new XMLSerializer().serializeToString(svgEl)], { type: "image/svg+xml;charset=utf-8" });
    const a = document.createElement("a");
    a.download = `chart-${config.type}.svg`;
    a.href = URL.createObjectURL(blob);
    a.click();
  }, [config.type]);

  const handleCopyChartURL = useCallback(() => {
    if (!chartData) return;
    const params = new URLSearchParams();
    for (const s of chartData.series) {
      params.append("d", s.values.join(","));
    }
    if (chartData.labels.length > 0) params.set("l", chartData.labels.join(","));
    params.set("n", chartData.series.map((s) => s.name).join(","));
    params.set("theme", theme);
    const url = `https://i.chartts.com/${config.type}.svg?${params.toString()}`;
    navigator.clipboard.writeText(url).then(() => {
      setUrlCopied(true);
      setTimeout(() => setUrlCopied(false), 2000);
    });
  }, [chartData, config.type, theme]);

  return (
    <>
      {/* Hero */}
      <section className="pt-24 sm:pt-32 pb-10 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight heading">
            Free Chart Maker
          </h1>
          <p className="mt-4 text-lg body-text max-w-2xl mx-auto">
            55+ chart types. 100+ themes. Edit data inline, drag columns to axes. Export as SVG, PNG, or shareable URL.
            No sign-up, no watermarks. Powered by Chart.ts.
          </p>
        </div>
      </section>

      {/* Workspace */}
      <section className="pb-6 px-4 sm:px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-[320px_1fr] gap-6">
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

              {/* Chart type selector */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider muted-text mb-2">
                  Chart type
                  <span className="ml-1 text-cyan-400 normal-case">({allAvailableTypes.length})</span>
                </label>
                <input
                  type="text"
                  placeholder="Search charts..."
                  value={typeSearch}
                  onChange={(e) => setTypeSearch(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded-lg body-text placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/40 mb-2"
                  style={{ background: "var(--c-input-bg, rgba(255,255,255,0.05))", border: "1px solid var(--c-border, rgba(255,255,255,0.1))" }}
                />
                <div className="max-h-[280px] overflow-y-auto space-y-2 pr-1">
                  {filteredCategories.map((cat) => {
                    const avail = cat.types.filter((t) => chartTypes[t]);
                    if (!avail.length) return null;
                    return (
                      <div key={cat.label}>
                        <p className="text-[9px] font-mono muted-text uppercase tracking-wider mb-1">{cat.label}</p>
                        <div className="grid grid-cols-2 gap-1">
                          {avail.map((t) => (
                            <button
                              key={t}
                              onClick={() => setConfig((c) => ({ ...c, type: t }))}
                              className={`px-2 py-1.5 text-[11px] font-mono rounded transition-all cursor-pointer text-left truncate ${
                                config.type === t
                                  ? "bg-cyan-500/15 text-cyan-400 border border-cyan-500/30"
                                  : "card border-transparent hover:border-gray-600/50 body-text"
                              }`}
                            >
                              {chartDisplayNames[t] ?? t}
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Theme selector */}
              <div>
                <button
                  onClick={() => setThemeOpen(!themeOpen)}
                  className="flex items-center gap-2 w-full cursor-pointer group mb-2"
                >
                  <label className="text-xs font-mono uppercase tracking-wider muted-text group-hover:text-cyan-400 transition-colors cursor-pointer">
                    Theme
                  </label>
                  <span className="text-xs font-mono text-cyan-400 px-1.5 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
                    {theme}
                  </span>
                  <svg className={`w-3 h-3 muted-text ml-auto transition-transform ${themeOpen ? "rotate-90" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                {themeOpen && (
                  <div className="max-h-[240px] overflow-y-auto space-y-2 pr-1">
                    {THEME_CATEGORIES.map((cat) => (
                      <div key={cat.label}>
                        <p className="text-[9px] font-mono muted-text uppercase tracking-wider mb-1">{cat.label}</p>
                        <div className="grid grid-cols-2 gap-1">
                          {cat.themes.map((t) => {
                            const cfg = typeof getThemeConfig(t) === "object" ? (getThemeConfig(t) as ThemeConfig) : null;
                            const previewColors = cfg?.colors?.slice(0, 3) ?? [];
                            return (
                              <button
                                key={t}
                                onClick={() => setTheme(t)}
                                className={`flex items-center gap-1.5 px-2 py-1 text-[10px] font-mono rounded transition-all cursor-pointer truncate ${
                                  theme === t
                                    ? "bg-cyan-500/15 text-cyan-400 border border-cyan-500/30"
                                    : "card hover:border-cyan-500/20"
                                }`}
                              >
                                {previewColors.length > 0 && (
                                  <span className="flex gap-0.5 flex-shrink-0">
                                    {previewColors.map((c, i) => (
                                      <span key={i} className="w-2 h-2 rounded-full" style={{ backgroundColor: c }} />
                                    ))}
                                  </span>
                                )}
                                <span className="truncate">{t}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
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
              <div className="space-y-2">
                <div className="flex gap-2">
                  <button onClick={handleCopySVG} disabled={!renderedSvg} className="flex-1 px-3 py-2.5 text-xs font-semibold rounded-lg bg-cyan-500 text-white hover:bg-cyan-400 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed">
                    {copyFeedback ? "Copied!" : "Copy SVG"}
                  </button>
                  <button onClick={handleDownloadSVG} disabled={!renderedSvg} className="flex-1 px-3 py-2.5 text-xs font-semibold rounded-lg card body-text hover:border-cyan-500/30 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed">
                    SVG
                  </button>
                  <button onClick={handleDownloadPNG} disabled={!renderedSvg} className="flex-1 px-3 py-2.5 text-xs font-semibold rounded-lg card body-text hover:border-cyan-500/30 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed">
                    PNG
                  </button>
                </div>
                <button onClick={handleCopyChartURL} disabled={!chartData} className="w-full px-3 py-2.5 text-xs font-semibold rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed">
                  {urlCopied ? "URL Copied!" : "Copy i.chartts.com URL"}
                </button>
              </div>
            </div>

            {/* Right panel: chart + editable table */}
            <div className="space-y-4">
              {/* Chart preview */}
              <div className="card rounded-xl p-6 min-h-[420px] flex items-center justify-center">
                {renderedSvg ? (
                  <div ref={svgRef} className="w-full [&>svg]:w-full [&>svg]:h-auto">
                    <div dangerouslySetInnerHTML={{ __html: renderedSvg }} />
                    {usingSampleData && (
                      <p className="text-[10px] muted-text text-center mt-2 font-mono">
                        Showing sample data for {displayName}. This chart type requires specific data format.
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="muted-text text-sm mb-1">
                      {rows.length === 0 ? "Drop a CSV file or add data below" : "Drag columns to X and Y axis"}
                    </p>
                    <p className="text-xs muted-text">
                      Selected: <span className="text-cyan-400">{displayName}</span>
                    </p>
                  </div>
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
              This chart maker is powered by Chart.ts. 65+ chart types, 100+ themes, Tailwind CSS, React/Vue/Svelte/Solid/Angular. Under 15kb, free and open source.
            </p>
            <div className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-gray-800/50 border border-gray-700/50 mb-6">
              <span className="muted-text font-mono text-sm">$</span>
              <code className="font-mono heading text-sm">npm install @chartts/core</code>
            </div>
            <div className="flex items-center justify-center gap-4">
              <Link href="/docs" className="px-6 py-3 text-sm font-semibold rounded-lg bg-cyan-500 text-white hover:bg-cyan-400 transition-colors cursor-pointer">Read the Docs</Link>
              <Link href="/playground" className="px-6 py-3 text-sm font-semibold rounded-lg card body-text transition-all cursor-pointer">Open Playground</Link>
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
