"use client";

import { useState, useCallback, useRef, useMemo } from "react";
import { renderToString } from "@chartts/core";
import type { ThemeConfig } from "@chartts/core";
import { EXTRA_THEMES } from "@chartts/themes";
import { sampleData, chartDisplayNames, chartTypes } from "@/lib/charts";
import { generateCode, type ExportTarget, type CodeGenState } from "./components/code-gen";

// ---- Constants ----

const ALL_TYPES = Object.keys(sampleData);
const BUILTIN_THEMES = ["dark", "light", "corporate", "saas", "startup", "editorial", "ocean"];
const THEME_CATEGORIES: { label: string; themes: string[] }[] = [
  { label: "Built-in", themes: BUILTIN_THEMES },
  { label: "Editor", themes: ["monokai", "github-light", "github-dark", "ayu-light", "ayu-dark", "panda", "cobalt", "night-owl", "palenight", "andromeda"] },
  { label: "Brand", themes: ["stripe", "vercel", "linear", "figma", "notion", "slack", "spotify", "discord"] },
  { label: "Popular", themes: ["nord", "dracula", "catppuccin", "tokyo-night", "gruvbox", "one-dark", "rose-pine", "solarized-light", "solarized-dark", "synthwave", "cyberpunk"] },
  { label: "Data Viz", themes: ["tableau", "d3-category10", "observable", "economist", "bloomberg", "financial-times"] },
  { label: "Nature", themes: ["forest", "ocean-deep", "volcanic", "aurora", "coral-reef", "rainforest", "desert-sand", "earth", "arctic", "autumn", "spring", "sunset"] },
  { label: "Modern UI", themes: ["glassmorphism", "neomorphism", "flat-design", "metro", "ios-light", "ios-dark", "carbon", "frost", "material", "minimal"] },
  { label: "Artistic", themes: ["art-deco", "bauhaus", "pop-art", "impressionist", "brutalist", "glitch", "sketchy", "chalk", "watercolor", "blueprint", "newspaper"] },
  { label: "Industry", themes: ["healthcare", "fintech", "gaming", "education", "government", "saas-dark", "saas-light", "startup-bold"] },
  { label: "Corporate", themes: ["corporate-blue", "corporate-green", "corporate-red", "luxury", "vintage", "retro"] },
  { label: "Accessibility", themes: ["high-contrast-light", "high-contrast-dark", "colorblind-safe", "deuteranopia-safe"] },
  { label: "Seasonal", themes: ["winter", "summer", "harvest", "blossom"] },
  { label: "Regional", themes: ["sakura", "terracotta", "jade", "sahara", "fjord", "caribbean"] },
  { label: "Classic", themes: ["neon", "pastel", "monochrome", "midnight"] },
];
const CURVES = ["linear", "monotone", "step"] as const;
const LEGEND_OPTS = [
  { value: "", label: "None" },
  { value: "top", label: "Top" },
  { value: "bottom", label: "Bottom" },
  { value: "left", label: "Left" },
  { value: "right", label: "Right" },
];
const PALETTES = [
  { name: "Default", colors: ["#06b6d4", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"] },
  // Cool
  { name: "Ocean", colors: ["#0ea5e9", "#06b6d4", "#14b8a6", "#10b981", "#22c55e", "#84cc16"] },
  { name: "Arctic", colors: ["#e0f2fe", "#7dd3fc", "#38bdf8", "#0ea5e9", "#0284c7", "#0369a1"] },
  { name: "Teal", colors: ["#99f6e4", "#5eead4", "#2dd4bf", "#14b8a6", "#0d9488", "#0f766e"] },
  { name: "Mint", colors: ["#a7f3d0", "#6ee7b7", "#34d399", "#10b981", "#059669", "#047857"] },
  { name: "Nord", colors: ["#88c0d0", "#81a1c1", "#5e81ac", "#a3be8c", "#ebcb8b", "#bf616a"] },
  { name: "Ice", colors: ["#bfdbfe", "#93c5fd", "#60a5fa", "#a5b4fc", "#818cf8", "#6366f1"] },
  // Warm
  { name: "Warm", colors: ["#ef4444", "#f97316", "#f59e0b", "#eab308", "#84cc16", "#22c55e"] },
  { name: "Sunset", colors: ["#ff6b6b", "#ee5a24", "#f9ca24", "#ff9ff3", "#c44569", "#574b90"] },
  { name: "Fire", colors: ["#fef08a", "#fde047", "#facc15", "#f59e0b", "#f97316", "#ef4444"] },
  { name: "Autumn", colors: ["#dc2626", "#ea580c", "#d97706", "#ca8a04", "#65a30d", "#16a34a"] },
  { name: "Terracotta", colors: ["#c2410c", "#ea580c", "#f97316", "#fb923c", "#fdba74", "#fed7aa"] },
  { name: "Coral", colors: ["#fda4af", "#fb7185", "#f43f5e", "#e11d48", "#be123c", "#9f1239"] },
  // Vibrant
  { name: "Purple", colors: ["#8b5cf6", "#a78bfa", "#c084fc", "#d946ef", "#ec4899", "#f43f5e"] },
  { name: "Neon", colors: ["#00ff87", "#00d4ff", "#ff00e5", "#ffe600", "#ff6b00", "#7b00ff"] },
  { name: "Candy", colors: ["#f472b6", "#fb923c", "#a78bfa", "#34d399", "#60a5fa", "#fbbf24"] },
  { name: "Electric", colors: ["#06b6d4", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981", "#ef4444"] },
  { name: "Vivid", colors: ["#ff0080", "#7928ca", "#0070f3", "#00dfd8", "#f5a623", "#ff4444"] },
  { name: "Pop", colors: ["#ff5757", "#ffc542", "#3dd598", "#5b5ea6", "#9b51e0", "#0084ff"] },
  { name: "Tropical", colors: ["#06d6a0", "#118ab2", "#ef476f", "#ffd166", "#073b4c", "#8338ec"] },
  { name: "Festival", colors: ["#ff595e", "#ffca3a", "#8ac926", "#1982c4", "#6a4c93", "#ff924c"] },
  // Muted / Professional
  { name: "Pastel", colors: ["#93c5fd", "#86efac", "#fcd34d", "#fca5a5", "#c4b5fd", "#f9a8d4"] },
  { name: "Soft", colors: ["#fecdd3", "#fed7aa", "#fef08a", "#bbf7d0", "#bae6fd", "#ddd6fe"] },
  { name: "Earth", colors: ["#a3785f", "#8b9e6b", "#d4a862", "#7c9eb2", "#c47d5a", "#6b7f5e"] },
  { name: "Sand", colors: ["#d6ccc2", "#e7c9a9", "#d4a373", "#bc8a5f", "#a47148", "#8b5e34"] },
  { name: "Forest", colors: ["#2d6a4f", "#40916c", "#52b788", "#74c69d", "#95d5b2", "#b7e4c7"] },
  { name: "Sage", colors: ["#4d7c6f", "#6b9080", "#a4c3b2", "#cce3de", "#eaf4f4", "#f6fff8"] },
  { name: "Slate", colors: ["#475569", "#64748b", "#94a3b8", "#cbd5e1", "#e2e8f0", "#f1f5f9"] },
  { name: "Stone", colors: ["#57534e", "#78716c", "#a8a29e", "#d6d3d1", "#e7e5e4", "#f5f5f4"] },
  // Corporate
  { name: "Corporate", colors: ["#1e40af", "#3b82f6", "#06b6d4", "#10b981", "#f59e0b", "#ef4444"] },
  { name: "Business", colors: ["#1e3a5f", "#3a7bd5", "#00b4d8", "#80ed99", "#ffd60a", "#e63946"] },
  { name: "Finance", colors: ["#2563eb", "#16a34a", "#dc2626", "#9333ea", "#ca8a04", "#0891b2"] },
  { name: "Dashboard", colors: ["#6366f1", "#8b5cf6", "#a855f7", "#d946ef", "#ec4899", "#f43f5e"] },
  { name: "Report", colors: ["#0f172a", "#334155", "#64748b", "#94a3b8", "#cbd5e1", "#f8fafc"] },
  { name: "Retro", colors: ["#e63946", "#457b9d", "#2a9d8f", "#e9c46a", "#f4a261", "#264653"] },
  { name: "Vintage", colors: ["#cb997e", "#ddbea9", "#ffe8d6", "#b7b7a4", "#a5a58d", "#6b705c"] },
  // Data Viz
  { name: "Tableau", colors: ["#4e79a7", "#f28e2b", "#e15759", "#76b7b2", "#59a14f", "#edc948"] },
  { name: "D3", colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b"] },
  { name: "Viridis", colors: ["#440154", "#443983", "#31688e", "#21918c", "#35b779", "#fde725"] },
  { name: "Plasma", colors: ["#0d0887", "#6a00a8", "#b12a90", "#e16462", "#fca636", "#f0f921"] },
  { name: "Inferno", colors: ["#000004", "#420a68", "#932667", "#dd513a", "#fca50a", "#fcffa4"] },
  { name: "Magma", colors: ["#000004", "#3b0f70", "#8c2981", "#de4968", "#fe9f6d", "#fcfdbf"] },
  { name: "Spectral", colors: ["#d53e4f", "#fc8d59", "#fee08b", "#e6f598", "#99d594", "#3288bd"] },
  // Monochrome
  { name: "Mono", colors: ["#e5e5e5", "#a3a3a3", "#737373", "#525252", "#404040", "#262626"] },
  { name: "Blue Mono", colors: ["#dbeafe", "#93c5fd", "#60a5fa", "#3b82f6", "#2563eb", "#1d4ed8"] },
  { name: "Green Mono", colors: ["#dcfce7", "#86efac", "#4ade80", "#22c55e", "#16a34a", "#15803d"] },
  { name: "Red Mono", colors: ["#fee2e2", "#fca5a5", "#f87171", "#ef4444", "#dc2626", "#b91c1c"] },
];
const TARGETS: { id: ExportTarget; label: string }[] = [
  { id: "vanilla", label: "Vanilla JS" },
  { id: "react", label: "React" },
  { id: "vue", label: "Vue" },
  { id: "svelte", label: "Svelte" },
  { id: "angular", label: "Angular" },
];

const CATEGORIES: [string, string[]][] = [
  ["Trending", ["line", "area", "step", "sparkline", "range", "baseline"]],
  ["Comparison", ["bar", "stacked-bar", "horizontal-bar", "lollipop", "bullet", "dumbbell", "pillar", "pareto"]],
  ["Composition", ["pie", "donut", "treemap", "sunburst", "pack", "funnel", "waterfall"]],
  ["Distribution", ["scatter", "bubble", "histogram", "boxplot", "violin", "heatmap"]],
  ["Radial", ["radar", "polar", "radial-bar", "gauge"]],
  ["Financial", ["candlestick", "ohlc", "volume", "kagi", "renko"]],
  ["Relationship", ["sankey", "chord", "graph", "flow", "parallel"]],
  ["Hierarchy", ["tree", "org"]],
  ["Specialty", ["calendar", "matrix", "geo", "wordcloud", "voronoi", "themeriver", "pictorialbar", "combo", "gantt", "lines"]],
];

// ---- Helpers ----

function cloneData(type: string) {
  const d = sampleData[type];
  if (!d) return { labels: ["A", "B", "C"] as string[], series: [{ name: "Value", values: [10, 20, 30] }] };
  return {
    labels: [...(d.labels ?? [])] as string[],
    series: d.series.map((s) => ({ name: s.name, values: [...s.values] })),
  };
}

function getThemeConfig(name: string): string | ThemeConfig {
  // Built-in core themes - pass as string
  if (BUILTIN_THEMES.includes(name)) {
    return name;
  }
  // Extra themes from @chartts/themes - pass as object
  const config = EXTRA_THEMES[name];
  return config ?? name;
}

// ---- Main Component ----

export default function PlaygroundApp() {
  // Chart state
  const [chartType, setChartType] = useState("bar");
  const [labels, setLabels] = useState<string[]>(() => cloneData("bar").labels);
  const [series, setSeries] = useState(() => cloneData("bar").series);

  // Config state
  const [width, setWidth] = useState(600);
  const [height, setHeight] = useState(400);
  const [theme, setTheme] = useState("dark");
  const [colors, setColors] = useState(PALETTES[0].colors);
  const [xLabel, setXLabel] = useState("");
  const [yLabel, setYLabel] = useState("");
  const [xGrid, setXGrid] = useState(true);
  const [yGrid, setYGrid] = useState(true);
  const [legend, setLegend] = useState<false | "top" | "bottom" | "left" | "right">(false);
  const [curve, setCurve] = useState<"linear" | "monotone" | "step">("linear");
  const [barRadius, setBarRadius] = useState(0);
  const [animate, setAnimate] = useState(true);

  // UI state
  const [showExport, setShowExport] = useState(false);
  const [exportTarget, setExportTarget] = useState<ExportTarget>("react");
  const [copied, setCopied] = useState(false);
  const [urlCopied, setUrlCopied] = useState(false);
  const [typeSearch, setTypeSearch] = useState("");
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const [csvOpen, setCsvOpen] = useState(false);
  const [csvText, setCsvText] = useState("");
  const [showTypes, setShowTypes] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [configTab, setConfigTab] = useState<"style" | "axes" | "legend" | "more">("style");
  const svgRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  // ---- Render chart ----
  const svg = useMemo(() => {
    const plugin = chartTypes[chartType];
    if (!plugin || !labels.length || !series.length) return null;
    try {
      let result = renderToString(plugin, { labels, series }, {
        width, height, theme: getThemeConfig(theme) as any,
        colors,
        xLabel: xLabel || undefined,
        yLabel: yLabel || undefined,
        xGrid, yGrid,
        legend: legend || undefined,
        curve: curve !== "linear" ? curve : undefined,
        barRadius: barRadius > 0 ? barRadius : undefined,
      });
      return result.replace('class="chartts"', 'class="chartts chartts-skip-anim"');
    } catch {
      return null;
    }
  }, [chartType, labels, series, width, height, theme, colors, xLabel, yLabel, xGrid, yGrid, legend, curve, barRadius]);

  // ---- Actions ----
  const switchType = useCallback((type: string) => {
    setChartType(type);
    setShowTypes(false);
    const d = cloneData(type);
    setLabels(d.labels);
    setSeries(d.series);
  }, []);

  const resetData = useCallback(() => {
    const d = cloneData(chartType);
    setLabels(d.labels);
    setSeries(d.series);
  }, [chartType]);

  const addRow = () => {
    setLabels((p) => [...p, `Item ${p.length + 1}`]);
    setSeries((p) => p.map((s) => ({ ...s, values: [...s.values, 0] })));
  };
  const deleteRow = (i: number) => {
    if (labels.length <= 1) return;
    setLabels((p) => p.filter((_, idx) => idx !== i));
    setSeries((p) => p.map((s) => ({ ...s, values: s.values.filter((_, idx) => idx !== i) })));
  };
  const addSeries = () => {
    setSeries((p) => [...p, { name: `Series ${p.length + 1}`, values: new Array(labels.length).fill(0) }]);
  };
  const deleteSeries = (i: number) => {
    if (series.length <= 1) return;
    setSeries((p) => p.filter((_, idx) => idx !== i));
  };
  const updateLabel = (i: number, v: string) => setLabels((p) => p.map((l, idx) => idx === i ? v : l));
  const updateValue = (si: number, vi: number, raw: string) => {
    const n = parseFloat(raw);
    if (isNaN(n)) return;
    setSeries((p) => p.map((s, i) => i === si ? { ...s, values: s.values.map((v, j) => j === vi ? n : v) } : s));
  };
  const updateSeriesName = (si: number, name: string) => setSeries((p) => p.map((s, i) => i === si ? { ...s, name } : s));

  const parseCSV = (raw: string) => {
    const lines = raw.trim().split("\n").map((l) => l.split(/[,\t]/).map((c) => c.trim().replace(/^"|"$/g, "")));
    if (lines.length < 2) return;
    setLabels(lines.slice(1).map((r) => r[0] ?? ""));
    setSeries(lines[0].slice(1).map((h, ci) => ({
      name: h,
      values: lines.slice(1).map((r) => { const n = parseFloat(r[ci + 1] ?? "0"); return isNaN(n) ? 0 : n; }),
    })));
    setCsvOpen(false);
    setCsvText("");
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => { if (typeof r.result === "string") parseCSV(r.result); };
    r.readAsText(f);
  };

  // Export
  const codeGenState: CodeGenState = { chartType, labels, series, width, height, theme, colors, xLabel, yLabel, xGrid, yGrid, legend, curve, barRadius, animate };
  const code = useMemo(() => generateCode(exportTarget, codeGenState), [exportTarget, chartType, labels, series, width, height, theme, colors, xLabel, yLabel, xGrid, yGrid, legend, curve, barRadius, animate]);

  const copyCode = async () => { await navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const downloadSVG = () => {
    const el = svgRef.current?.querySelector("svg");
    if (!el) return;
    const blob = new Blob([new XMLSerializer().serializeToString(el)], { type: "image/svg+xml" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = `chart-${chartType}.svg`; a.click();
  };
  const downloadPNG = () => {
    const el = svgRef.current?.querySelector("svg");
    if (!el) return;
    const c = document.createElement("canvas"); c.width = 2000; c.height = 1200;
    const ctx = c.getContext("2d"); if (!ctx) return;
    ctx.fillStyle = "#0a0a0f"; ctx.fillRect(0, 0, 2000, 1200);
    const img = new Image();
    img.onload = () => { ctx.drawImage(img, 0, 0, 2000, 1200); const a = document.createElement("a"); a.href = c.toDataURL("image/png"); a.download = `chart-${chartType}.png`; a.click(); };
    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(new XMLSerializer().serializeToString(el))));
  };
  const copyURL = async () => {
    const p = new URLSearchParams();
    series.forEach((s) => p.append("d", s.values.join(",")));
    if (labels.length) p.set("l", labels.join(","));
    p.set("n", series.map((s) => s.name).join(","));
    p.set("theme", theme);
    await navigator.clipboard.writeText(`https://i.chartts.com/${chartType}.svg?${p.toString()}`);
    setUrlCopied(true); setTimeout(() => setUrlCopied(false), 2000);
  };

  // Type search filter
  const filteredTypes = typeSearch.trim()
    ? ALL_TYPES.filter((t) => t.includes(typeSearch.toLowerCase()) || (chartDisplayNames[t] ?? "").toLowerCase().includes(typeSearch.toLowerCase()))
    : null;

  const displayName = chartDisplayNames[chartType] ?? chartType;

  return (
    <div className="pt-16 min-h-screen" style={{ background: "var(--c-bg)" }}>
      {/* Header */}
      <div className="sticky top-16 z-20 px-4 sm:px-6 py-3 flex items-center gap-3 flex-wrap" style={{ background: "var(--c-bg)", borderBottom: "1px solid var(--c-border)" }}>
        <h1 className="text-sm font-semibold heading">Playground</h1>
        <span className="text-xs font-mono text-cyan-400 px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">{displayName}</span>
        <span className="text-xs muted-text">{labels.length} pts &middot; {series.length} series</span>
        <div className="flex gap-2 ml-auto lg:hidden">
          <button onClick={() => { setShowTypes(!showTypes); setShowConfig(false); }} className={`px-2 py-1 text-[11px] font-mono rounded cursor-pointer ${showTypes ? "bg-cyan-500/15 text-cyan-400 border border-cyan-500/30" : "card"}`}>Charts</button>
          <button onClick={() => { setShowConfig(!showConfig); setShowTypes(false); }} className={`px-2 py-1 text-[11px] font-mono rounded cursor-pointer ${showConfig ? "bg-cyan-500/15 text-cyan-400 border border-cyan-500/30" : "card"}`}>Config</button>
        </div>
      </div>

      <div className="flex relative" style={{ minHeight: "calc(100vh - 7.5rem)" }}>
        {/* ---- LEFT: Type Selector ---- */}
        <aside className={`w-56 flex-shrink-0 border-r overflow-y-auto ${showTypes ? "fixed inset-0 top-[7.5rem] z-30 w-64" : "hidden lg:block"}`} style={{ borderColor: "var(--c-border)", background: "var(--c-bg)" }}>
          <div className="px-3 pt-3 pb-2">
            <input type="text" placeholder="Search charts..." value={typeSearch} onChange={(e) => setTypeSearch(e.target.value)}
              className="w-full px-3 py-1.5 text-xs rounded-lg body-text placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/40"
              style={{ background: "var(--c-input-bg)", border: "1px solid var(--c-border)" }} />
          </div>
          <div className="px-2 pb-2 space-y-1">
            {filteredTypes ? (
              filteredTypes.length === 0 ? <p className="text-xs muted-text text-center py-4">No charts found</p> :
              filteredTypes.map((t) => <TypeBtn key={t} type={t} active={chartType === t} onClick={() => switchType(t)} />)
            ) : (
              CATEGORIES.map(([cat, types]) => {
                const avail = types.filter((t) => sampleData[t]);
                if (!avail.length) return null;
                const isClosed = collapsed[cat];
                return (
                  <div key={cat}>
                    <button onClick={() => setCollapsed((p) => ({ ...p, [cat]: !p[cat] }))}
                      className="w-full flex items-center justify-between px-2 py-1.5 text-[10px] font-mono muted-text uppercase tracking-wider hover:text-cyan-400 transition-colors cursor-pointer">
                      <span>{cat}</span>
                      <svg className={`w-3 h-3 transition-transform ${isClosed ? "" : "rotate-90"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                    </button>
                    {!isClosed && avail.map((t) => <TypeBtn key={t} type={t} active={chartType === t} onClick={() => switchType(t)} />)}
                  </div>
                );
              })
            )}
          </div>
        </aside>

        {/* Mobile backdrop */}
        {(showTypes || showConfig) && <div className="fixed inset-0 top-[7.5rem] z-20 bg-black/50 lg:hidden" onClick={() => { setShowTypes(false); setShowConfig(false); }} />}

        {/* ---- CENTER: Preview + Data + Export ---- */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 space-y-6">
          {/* Preview */}
          <div ref={svgRef}>
            {svg ? (
              <div className="w-full rounded-xl overflow-hidden [&>svg]:w-full [&>svg]:h-auto" style={{ border: "1px solid var(--c-border)" }} dangerouslySetInnerHTML={{ __html: svg }} />
            ) : (
              <div className="w-full flex items-center justify-center rounded-xl muted-text text-sm" style={{ aspectRatio: `${width}/${height}`, background: "var(--c-card-bg)", border: "1px solid var(--c-border)" }}>Select a chart type</div>
            )}
          </div>

          {/* Data Editor */}
          <div>
            <p className="text-[10px] font-mono muted-text uppercase tracking-wider mb-2">Data</p>
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <button onClick={addRow} className="px-2 py-1 text-[11px] font-mono rounded card hover:border-cyan-500/30 transition-colors cursor-pointer">+ Row</button>
              <button onClick={addSeries} className="px-2 py-1 text-[11px] font-mono rounded card hover:border-cyan-500/30 transition-colors cursor-pointer">+ Series</button>
              <button onClick={() => setCsvOpen(!csvOpen)} className="px-2 py-1 text-[11px] font-mono rounded card hover:border-cyan-500/30 transition-colors cursor-pointer">CSV</button>
              <input ref={fileRef} type="file" accept=".csv,.tsv,.txt" onChange={handleFile} className="hidden" />
              <button onClick={() => fileRef.current?.click()} className="px-2 py-1 text-[11px] font-mono rounded card hover:border-cyan-500/30 transition-colors cursor-pointer">Import</button>
              <button onClick={resetData} className="px-2 py-1 text-[11px] font-mono rounded text-amber-400 border border-amber-500/20 hover:border-amber-500/40 transition-colors cursor-pointer ml-auto">Reset</button>
            </div>
            {csvOpen && (
              <div className="flex flex-col gap-1.5 mb-2">
                <textarea rows={4} placeholder={"Label,Series1,Series2\nJan,100,80\nFeb,150,120"} value={csvText} onChange={(e) => setCsvText(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-mono rounded-lg body-text placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-cyan-500/40 resize-none"
                  style={{ background: "var(--c-input-bg)", border: "1px solid var(--c-border)" }} />
                <button onClick={() => parseCSV(csvText)} disabled={!csvText.trim()}
                  className="self-end px-3 py-1 text-[11px] font-mono rounded-lg bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/25 transition-colors cursor-pointer disabled:opacity-40">Apply CSV</button>
              </div>
            )}
            <div className="overflow-x-auto rounded-lg" style={{ border: "1px solid var(--c-border)" }}>
              <table className="w-full text-xs font-mono">
                <thead>
                  <tr style={{ background: "var(--c-card-bg)" }}>
                    <th className="px-2 py-1.5 text-left muted-text font-normal w-8">#</th>
                    <th className="px-2 py-1.5 text-left muted-text font-normal">Label</th>
                    {series.map((s, si) => (
                      <th key={si} className="px-2 py-1.5 text-left font-normal min-w-[80px]">
                        <div className="flex items-center gap-1">
                          <input value={s.name} onChange={(e) => updateSeriesName(si, e.target.value)}
                            className="bg-transparent border-none text-cyan-400 font-medium text-xs font-mono outline-none w-full" />
                          {series.length > 1 && <button onClick={() => deleteSeries(si)} className="text-gray-600 hover:text-red-400 transition-colors cursor-pointer flex-shrink-0">&times;</button>}
                        </div>
                      </th>
                    ))}
                    <th className="w-6" />
                  </tr>
                </thead>
                <tbody>
                  {labels.map((label, ri) => (
                    <tr key={ri} className="border-t" style={{ borderColor: "var(--c-border)" }}>
                      <td className="px-2 py-1 muted-text">{ri + 1}</td>
                      <td className="px-2 py-1"><input value={label} onChange={(e) => updateLabel(ri, e.target.value)} className="bg-transparent border-none body-text text-xs font-mono outline-none w-full" /></td>
                      {series.map((s, si) => (
                        <td key={si} className="px-2 py-1">
                          <input type="number" value={s.values[ri] ?? 0} onChange={(e) => updateValue(si, ri, e.target.value)}
                            className="bg-transparent border-none body-text text-xs font-mono outline-none w-full text-right" />
                        </td>
                      ))}
                      <td className="px-1 py-1">{labels.length > 1 && <button onClick={() => deleteRow(ri)} className="text-gray-600 hover:text-red-400 transition-colors cursor-pointer text-xs">&times;</button>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Export */}
          <div>
            <button onClick={() => setShowExport(!showExport)} className="flex items-center gap-2 mb-2 cursor-pointer group">
              <p className="text-[10px] font-mono muted-text uppercase tracking-wider group-hover:text-cyan-400 transition-colors">Export Code</p>
              <svg className={`w-3 h-3 muted-text transition-transform ${showExport ? "rotate-90" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </button>
            {showExport && (
              <div className="space-y-3">
                <div className="flex gap-1 flex-wrap">
                  {TARGETS.map((t) => (
                    <button key={t.id} onClick={() => setExportTarget(t.id)}
                      className={`px-3 py-1.5 text-[11px] font-mono rounded-lg transition-all cursor-pointer ${exportTarget === t.id ? "bg-cyan-500/15 text-cyan-400 border border-cyan-500/30" : "card hover:border-cyan-500/20 body-text"}`}>{t.label}</button>
                  ))}
                </div>
                <div className="relative">
                  <pre className="overflow-x-auto p-4 rounded-xl text-xs font-mono leading-relaxed" style={{ background: "var(--c-bg)", border: "1px solid var(--c-border)" }}><code className="body-text">{code}</code></pre>
                  <button onClick={copyCode} className="absolute top-2 right-2 px-2 py-1 text-[10px] font-mono rounded bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/25 transition-colors cursor-pointer">{copied ? "Copied!" : "Copy"}</button>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <button onClick={downloadSVG} className="px-3 py-1.5 text-[11px] font-mono rounded-lg card hover:border-cyan-500/30 transition-colors cursor-pointer body-text">Download SVG</button>
                  <button onClick={downloadPNG} className="px-3 py-1.5 text-[11px] font-mono rounded-lg card hover:border-cyan-500/30 transition-colors cursor-pointer body-text">Download PNG</button>
                  <button onClick={copyURL} className="px-3 py-1.5 text-[11px] font-mono rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors cursor-pointer">{urlCopied ? "URL Copied!" : "Copy i.chartts.com URL"}</button>
                </div>
              </div>
            )}
          </div>
        </main>

        {/* ---- RIGHT: Config Panel ---- */}
        <aside className={`w-64 flex-shrink-0 border-l overflow-y-auto ${showConfig ? "fixed right-0 top-[7.5rem] bottom-0 z-30 w-72" : "hidden lg:block"}`} style={{ borderColor: "var(--c-border)", background: "var(--c-bg)" }}>
          <div className="flex border-b" style={{ borderColor: "var(--c-border)" }}>
            {(["style", "axes", "legend", "more"] as const).map((t) => (
              <button key={t} onClick={() => setConfigTab(t)} className={`flex-1 px-2 py-2 text-[11px] font-mono transition-colors cursor-pointer capitalize ${configTab === t ? "text-cyan-400 border-b-2 border-cyan-400" : "muted-text hover:text-cyan-300"}`}>{t}</button>
            ))}
          </div>
          <div className="p-3 space-y-4">
            {configTab === "style" && <>
              <div>
                <CfgLabel>Theme <span className="normal-case text-cyan-400">({Object.keys(EXTRA_THEMES).length + 7})</span></CfgLabel>
                <div className="max-h-64 overflow-y-auto space-y-2 pr-1">
                  {THEME_CATEGORIES.map((cat) => (
                    <div key={cat.label}>
                      <p className="text-[9px] font-mono muted-text uppercase tracking-wider mb-1">{cat.label}</p>
                      <div className="grid grid-cols-2 gap-1">
                        {cat.themes.map((t) => {
                          const cfg = typeof getThemeConfig(t) === 'object' ? getThemeConfig(t) as ThemeConfig : null;
                          const previewColors = cfg?.colors?.slice(0, 4) ?? [];
                          return (
                            <button key={t} onClick={() => setTheme(t)}
                              className={`flex items-center gap-1.5 px-2 py-1 text-[10px] font-mono rounded transition-all cursor-pointer truncate ${theme === t ? "bg-cyan-500/15 text-cyan-400 border border-cyan-500/30" : "card hover:border-cyan-500/20"}`}>
                              {previewColors.length > 0 && (
                                <span className="flex gap-0.5 flex-shrink-0">
                                  {previewColors.map((c, i) => <span key={i} className="w-2 h-2 rounded-full" style={{ backgroundColor: c }} />)}
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
              </div>
              <div>
                <CfgLabel>Color Palette</CfgLabel>
                <div className="space-y-1.5">
                  {PALETTES.map((p) => (
                    <button key={p.name} onClick={() => setColors(p.colors)}
                      className={`w-full flex items-center gap-2 px-2 py-1.5 rounded transition-all cursor-pointer ${JSON.stringify(colors) === JSON.stringify(p.colors) ? "bg-cyan-500/10 border border-cyan-500/30" : "border border-transparent hover:bg-white/[0.03]"}`}>
                      <div className="flex gap-0.5">{p.colors.slice(0, 6).map((c, i) => <div key={i} className="w-3.5 h-3.5 rounded-sm" style={{ backgroundColor: c }} />)}</div>
                      <span className="text-[11px] body-text">{p.name}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <CfgLabel>Dimensions</CfgLabel>
                <div className="flex gap-3">
                  <div><span className="text-[10px] muted-text">W</span><NumInput value={width} onChange={setWidth} min={200} max={1200} step={50} /></div>
                  <div><span className="text-[10px] muted-text">H</span><NumInput value={height} onChange={setHeight} min={150} max={800} step={50} /></div>
                </div>
              </div>
            </>}
            {configTab === "axes" && <>
              <div>
                <CfgLabel>X-Axis Label</CfgLabel>
                <input value={xLabel} onChange={(e) => setXLabel(e.target.value)} placeholder="e.g. Month"
                  className="w-full px-3 py-1.5 text-xs rounded-lg body-text placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-cyan-500/40" style={{ background: "var(--c-input-bg)", border: "1px solid var(--c-border)" }} />
              </div>
              <div>
                <CfgLabel>Y-Axis Label</CfgLabel>
                <input value={yLabel} onChange={(e) => setYLabel(e.target.value)} placeholder="e.g. Revenue ($)"
                  className="w-full px-3 py-1.5 text-xs rounded-lg body-text placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-cyan-500/40" style={{ background: "var(--c-input-bg)", border: "1px solid var(--c-border)" }} />
              </div>
              <div className="space-y-2">
                <Toggle value={xGrid} onChange={setXGrid} label="X Grid" />
                <Toggle value={yGrid} onChange={setYGrid} label="Y Grid" />
              </div>
            </>}
            {configTab === "legend" && (
              <div>
                <CfgLabel>Legend Position</CfgLabel>
                <div className="grid grid-cols-3 gap-1">
                  {LEGEND_OPTS.map((lp) => <CfgBtn key={lp.value} active={(legend === false && lp.value === "") || legend === lp.value} onClick={() => setLegend(lp.value === "" ? false : lp.value as any)}>{lp.label}</CfgBtn>)}
                </div>
              </div>
            )}
            {configTab === "more" && <>
              <div>
                <CfgLabel>Line Curve</CfgLabel>
                <div className="grid grid-cols-3 gap-1">
                  {CURVES.map((c) => <CfgBtn key={c} active={curve === c} onClick={() => setCurve(c)}>{c}</CfgBtn>)}
                </div>
              </div>
              <div>
                <CfgLabel>Bar Radius</CfgLabel>
                <NumInput value={barRadius} onChange={setBarRadius} min={0} max={20} step={1} />
              </div>
              <Toggle value={animate} onChange={setAnimate} label="Animations" />
            </>}
          </div>
        </aside>
      </div>
    </div>
  );
}

// ---- Small UI primitives ----

function TypeBtn({ type, active, onClick }: { type: string; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-left transition-all cursor-pointer text-xs ${active ? "bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-medium" : "border border-transparent body-text hover:bg-white/[0.03]"}`}>
      {chartDisplayNames[type] ?? type}
    </button>
  );
}

function CfgLabel({ children }: { children: React.ReactNode }) {
  return <label className="block text-[10px] font-mono muted-text uppercase tracking-wider mb-1">{children}</label>;
}

function CfgBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return <button onClick={onClick} className={`px-2 py-1.5 text-[11px] font-mono rounded transition-all cursor-pointer capitalize ${active ? "bg-cyan-500/15 text-cyan-400 border border-cyan-500/30" : "card hover:border-cyan-500/20"}`}>{children}</button>;
}

function NumInput({ value, onChange, min, max, step = 1 }: { value: number; onChange: (n: number) => void; min?: number; max?: number; step?: number }) {
  return (
    <div className="flex items-center gap-1">
      <button onClick={() => onChange(Math.max(min ?? -Infinity, value - step))} className="w-6 h-6 rounded flex items-center justify-center muted-text hover:text-cyan-400 transition-colors cursor-pointer" style={{ background: "var(--c-card-bg)", border: "1px solid var(--c-border)" }}>-</button>
      <input type="number" value={value} onChange={(e) => { const n = parseInt(e.target.value); if (!isNaN(n)) onChange(Math.max(min ?? -Infinity, Math.min(max ?? Infinity, n))); }}
        className="w-16 px-2 py-1 text-xs text-center rounded body-text focus:outline-none focus:ring-1 focus:ring-cyan-500/40" style={{ background: "var(--c-input-bg)", border: "1px solid var(--c-border)" }} />
      <button onClick={() => onChange(Math.min(max ?? Infinity, value + step))} className="w-6 h-6 rounded flex items-center justify-center muted-text hover:text-cyan-400 transition-colors cursor-pointer" style={{ background: "var(--c-card-bg)", border: "1px solid var(--c-border)" }}>+</button>
    </div>
  );
}

function Toggle({ value, onChange, label }: { value: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button onClick={() => onChange(!value)} className="flex items-center gap-2 cursor-pointer group">
      <div className={`w-8 h-4 rounded-full transition-colors relative ${value ? "bg-cyan-500" : "bg-gray-600"}`}>
        <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-transform ${value ? "translate-x-4" : "translate-x-0.5"}`} />
      </div>
      <span className="text-xs body-text group-hover:text-cyan-300 transition-colors">{label}</span>
    </button>
  );
}
