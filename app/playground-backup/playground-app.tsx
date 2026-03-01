"use client";

import { useState, useCallback, useRef, useMemo } from "react";
import { sampleData, chartDisplayNames } from "@/lib/charts";
import TypeSelector from "./components/type-selector";
import DataEditor from "./components/data-editor";
import ConfigPanel from "./components/config-panel";
import Preview from "./components/preview";
import ExportPanel from "./components/export-panel";
import type { CodeGenState } from "./components/code-gen";

const DEFAULT_COLORS = ["#06b6d4", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"];

function loadSampleData(type: string) {
  const data = sampleData[type];
  if (!data) return { labels: ["A", "B", "C"] as (string | number)[], series: [{ name: "Value", values: [10, 20, 30] }] };
  return {
    labels: (data.labels ?? []) as (string | number)[],
    series: data.series.map((s) => ({ name: s.name, values: [...s.values], color: s.color })),
  };
}

export default function PlaygroundApp() {
  const [chartType, setChartType] = useState("bar");
  const [dataEdited, setDataEdited] = useState(false);

  const initial = useMemo(() => loadSampleData("bar"), []);
  const [labels, setLabels] = useState<(string | number)[]>(initial.labels);
  const [series, setSeries] = useState(initial.series);

  const [width, setWidth] = useState(600);
  const [height, setHeight] = useState(400);
  const [theme, setTheme] = useState("dark");
  const [colors, setColors] = useState<string[]>(DEFAULT_COLORS);
  const [xLabel, setXLabel] = useState("");
  const [yLabel, setYLabel] = useState("");
  const [xGrid, setXGrid] = useState(true);
  const [yGrid, setYGrid] = useState(true);
  const [legend, setLegend] = useState<false | "top" | "bottom" | "left" | "right">(false);
  const [curve, setCurve] = useState<"linear" | "monotone" | "step">("linear");
  const [barRadius, setBarRadius] = useState(0);
  const [animate, setAnimate] = useState(true);

  const svgRef = useRef<HTMLDivElement>(null);

  // Sidebar collapse state for mobile
  const [showTypes, setShowTypes] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [showExport, setShowExport] = useState(false);

  const handleTypeChange = useCallback(
    (type: string) => {
      setChartType(type);
      setShowTypes(false);
      // Load sample data for new type (unless user has custom data they want to keep)
      if (!dataEdited) {
        const d = loadSampleData(type);
        setLabels(d.labels);
        setSeries(d.series);
      }
    },
    [dataEdited]
  );

  const handleLabelsChange = useCallback((l: (string | number)[]) => {
    setLabels(l);
    setDataEdited(true);
  }, []);

  const handleSeriesChange = useCallback((s: { name: string; values: number[]; color?: string }[]) => {
    setSeries(s);
    setDataEdited(true);
  }, []);

  const handleReset = useCallback(() => {
    const d = loadSampleData(chartType);
    setLabels(d.labels);
    setSeries(d.series);
    setDataEdited(false);
  }, [chartType]);

  const handleConfigChange = useCallback((patch: Record<string, unknown>) => {
    if ("width" in patch) setWidth(patch.width as number);
    if ("height" in patch) setHeight(patch.height as number);
    if ("theme" in patch) setTheme(patch.theme as string);
    if ("colors" in patch) setColors(patch.colors as string[]);
    if ("xLabel" in patch) setXLabel(patch.xLabel as string);
    if ("yLabel" in patch) setYLabel(patch.yLabel as string);
    if ("xGrid" in patch) setXGrid(patch.xGrid as boolean);
    if ("yGrid" in patch) setYGrid(patch.yGrid as boolean);
    if ("legend" in patch) setLegend(patch.legend as false | "top" | "bottom" | "left" | "right");
    if ("curve" in patch) setCurve(patch.curve as "linear" | "monotone" | "step");
    if ("barRadius" in patch) setBarRadius(patch.barRadius as number);
    if ("animate" in patch) setAnimate(patch.animate as boolean);
  }, []);

  const codeGenState: CodeGenState = {
    chartType,
    labels,
    series,
    width,
    height,
    theme,
    colors,
    xLabel,
    yLabel,
    xGrid,
    yGrid,
    legend,
    curve,
    barRadius,
    animate,
  };

  const displayName = chartDisplayNames[chartType] ?? chartType;

  return (
    <div className="pt-16 min-h-screen" style={{ background: "var(--c-bg)" }}>
      {/* Header bar */}
      <div
        className="sticky top-16 z-20 px-4 sm:px-6 py-3 flex items-center gap-3 flex-wrap"
        style={{ background: "var(--c-bg)", borderBottom: "1px solid var(--c-border)" }}
      >
        <h1 className="text-sm font-semibold heading">Playground</h1>
        <span className="text-xs font-mono text-cyan-400 px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
          {displayName}
        </span>
        <span className="text-xs muted-text">
          {labels.length} points &middot; {series.length} series
        </span>

        {/* Mobile toggles */}
        <div className="flex gap-2 ml-auto lg:hidden">
          <button
            onClick={() => { setShowTypes(!showTypes); setShowConfig(false); }}
            className={`px-2 py-1 text-[11px] font-mono rounded transition-all cursor-pointer ${showTypes ? "bg-cyan-500/15 text-cyan-400 border border-cyan-500/30" : "card"}`}
          >
            Charts
          </button>
          <button
            onClick={() => { setShowConfig(!showConfig); setShowTypes(false); }}
            className={`px-2 py-1 text-[11px] font-mono rounded transition-all cursor-pointer ${showConfig ? "bg-cyan-500/15 text-cyan-400 border border-cyan-500/30" : "card"}`}
          >
            Config
          </button>
        </div>
      </div>

      {/* Main layout */}
      <div className="flex relative" style={{ minHeight: "calc(100vh - 7.5rem)" }}>
        {/* Left sidebar - type selector */}
        <aside
          className={`
            w-56 flex-shrink-0 border-r overflow-hidden
            ${showTypes ? "fixed inset-0 top-[7.5rem] z-30 w-64" : "hidden lg:block"}
          `}
          style={{ borderColor: "var(--c-border)", background: "var(--c-bg)" }}
        >
          <TypeSelector value={chartType} onChange={handleTypeChange} />
        </aside>

        {/* Mobile backdrop */}
        {(showTypes || showConfig) && (
          <div
            className="fixed inset-0 top-[7.5rem] z-20 bg-black/50 lg:hidden"
            onClick={() => { setShowTypes(false); setShowConfig(false); }}
          />
        )}

        {/* Center - preview + data + export */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 space-y-6">
          {/* Preview */}
          <div ref={svgRef}>
            <Preview
              chartType={chartType}
              labels={labels}
              series={series}
              width={width}
              height={height}
              theme={theme}
            />
          </div>

          {/* Data editor */}
          <div>
            <p className="text-[10px] font-mono muted-text uppercase tracking-wider mb-2">Data</p>
            <DataEditor
              labels={labels}
              series={series}
              onLabelsChange={handleLabelsChange}
              onSeriesChange={handleSeriesChange}
              onReset={handleReset}
            />
          </div>

          {/* Export - collapsible on mobile */}
          <div>
            <button
              onClick={() => setShowExport(!showExport)}
              className="flex items-center gap-2 mb-2 cursor-pointer group"
            >
              <p className="text-[10px] font-mono muted-text uppercase tracking-wider group-hover:text-cyan-400 transition-colors">
                Export Code
              </p>
              <svg
                className={`w-3 h-3 muted-text transition-transform ${showExport ? "rotate-90" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
            {showExport && <ExportPanel state={codeGenState} svgRef={svgRef} />}
          </div>
        </main>

        {/* Right sidebar - config */}
        <aside
          className={`
            w-64 flex-shrink-0 border-l overflow-hidden
            ${showConfig ? "fixed right-0 top-[7.5rem] bottom-0 z-30 w-72" : "hidden lg:block"}
          `}
          style={{ borderColor: "var(--c-border)", background: "var(--c-bg)" }}
        >
          <ConfigPanel
            width={width}
            height={height}
            theme={theme}
            colors={colors}
            xLabel={xLabel}
            yLabel={yLabel}
            xGrid={xGrid}
            yGrid={yGrid}
            legend={legend}
            curve={curve}
            barRadius={barRadius}
            animate={animate}
            onChange={handleConfigChange}
          />
        </aside>
      </div>
    </div>
  );
}
