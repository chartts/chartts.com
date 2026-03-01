"use client";

import { useState } from "react";

const THEMES = ["dark", "light", "corporate", "saas", "startup", "editorial", "ocean"];
const CURVES = ["linear", "monotone", "step"];
const LEGEND_POSITIONS = [
  { value: "", label: "None" },
  { value: "top", label: "Top" },
  { value: "bottom", label: "Bottom" },
  { value: "left", label: "Left" },
  { value: "right", label: "Right" },
];

const PRESET_PALETTES = [
  { name: "Default", colors: ["#06b6d4", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"] },
  { name: "Ocean", colors: ["#0ea5e9", "#06b6d4", "#14b8a6", "#10b981", "#22c55e", "#84cc16"] },
  { name: "Warm", colors: ["#ef4444", "#f97316", "#f59e0b", "#eab308", "#84cc16", "#22c55e"] },
  { name: "Purple", colors: ["#8b5cf6", "#a78bfa", "#c084fc", "#d946ef", "#ec4899", "#f43f5e"] },
  { name: "Mono", colors: ["#e5e5e5", "#a3a3a3", "#737373", "#525252", "#404040", "#262626"] },
];

interface ConfigPanelProps {
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
  onChange: (patch: Record<string, unknown>) => void;
}

type Tab = "style" | "axes" | "legend" | "advanced";

export default function ConfigPanel(props: ConfigPanelProps) {
  const [tab, setTab] = useState<Tab>("style");

  const tabs: { id: Tab; label: string }[] = [
    { id: "style", label: "Style" },
    { id: "axes", label: "Axes" },
    { id: "legend", label: "Legend" },
    { id: "advanced", label: "More" },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Tab bar */}
      <div className="flex border-b" style={{ borderColor: "var(--c-border)" }}>
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 px-2 py-2 text-[11px] font-mono transition-colors cursor-pointer ${
              tab === t.id
                ? "text-cyan-400 border-b-2 border-cyan-400"
                : "muted-text hover:text-cyan-300"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {tab === "style" && <StyleTab {...props} />}
        {tab === "axes" && <AxesTab {...props} />}
        {tab === "legend" && <LegendTab {...props} />}
        {tab === "advanced" && <AdvancedTab {...props} />}
      </div>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <label className="block text-[10px] font-mono muted-text uppercase tracking-wider mb-1">{children}</label>;
}

function NumberInput({
  value,
  onChange,
  min,
  max,
  step = 1,
}: {
  value: number;
  onChange: (n: number) => void;
  min?: number;
  max?: number;
  step?: number;
}) {
  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => onChange(Math.max(min ?? -Infinity, value - step))}
        className="w-6 h-6 rounded flex items-center justify-center muted-text hover:text-cyan-400 transition-colors cursor-pointer"
        style={{ background: "var(--c-card-bg)", border: "1px solid var(--c-border)" }}
      >
        -
      </button>
      <input
        type="number"
        value={value}
        onChange={(e) => {
          const n = parseInt(e.target.value);
          if (!isNaN(n)) onChange(Math.max(min ?? -Infinity, Math.min(max ?? Infinity, n)));
        }}
        className="w-16 px-2 py-1 text-xs text-center rounded body-text focus:outline-none focus:ring-1 focus:ring-cyan-500/40"
        style={{ background: "var(--c-input-bg)", border: "1px solid var(--c-border)" }}
      />
      <button
        onClick={() => onChange(Math.min(max ?? Infinity, value + step))}
        className="w-6 h-6 rounded flex items-center justify-center muted-text hover:text-cyan-400 transition-colors cursor-pointer"
        style={{ background: "var(--c-card-bg)", border: "1px solid var(--c-border)" }}
      >
        +
      </button>
    </div>
  );
}

function Toggle({ value, onChange, label }: { value: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      onClick={() => onChange(!value)}
      className="flex items-center gap-2 cursor-pointer group"
    >
      <div
        className={`w-8 h-4 rounded-full transition-colors relative ${
          value ? "bg-cyan-500" : "bg-gray-600"
        }`}
      >
        <div
          className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-transform ${
            value ? "translate-x-4" : "translate-x-0.5"
          }`}
        />
      </div>
      <span className="text-xs body-text group-hover:text-cyan-300 transition-colors">{label}</span>
    </button>
  );
}

function StyleTab(props: ConfigPanelProps) {
  return (
    <>
      <div>
        <Label>Theme</Label>
        <div className="grid grid-cols-2 gap-1">
          {THEMES.map((t) => (
            <button
              key={t}
              onClick={() => props.onChange({ theme: t })}
              className={`px-2 py-1.5 text-[11px] font-mono rounded transition-all cursor-pointer capitalize ${
                props.theme === t
                  ? "bg-cyan-500/15 text-cyan-400 border border-cyan-500/30"
                  : "card hover:border-cyan-500/20"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div>
        <Label>Color Palette</Label>
        <div className="space-y-1.5">
          {PRESET_PALETTES.map((p) => (
            <button
              key={p.name}
              onClick={() => props.onChange({ colors: p.colors })}
              className={`w-full flex items-center gap-2 px-2 py-1.5 rounded transition-all cursor-pointer ${
                JSON.stringify(props.colors) === JSON.stringify(p.colors)
                  ? "bg-cyan-500/10 border border-cyan-500/30"
                  : "border border-transparent hover:bg-white/[0.03]"
              }`}
            >
              <div className="flex gap-0.5">
                {p.colors.slice(0, 6).map((c, i) => (
                  <div
                    key={i}
                    className="w-3.5 h-3.5 rounded-sm"
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
              <span className="text-[11px] body-text">{p.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <Label>Dimensions</Label>
        <div className="flex items-center gap-3">
          <div>
            <span className="text-[10px] muted-text">W</span>
            <NumberInput value={props.width} onChange={(n) => props.onChange({ width: n })} min={200} max={1200} step={50} />
          </div>
          <div>
            <span className="text-[10px] muted-text">H</span>
            <NumberInput value={props.height} onChange={(n) => props.onChange({ height: n })} min={150} max={800} step={50} />
          </div>
        </div>
      </div>
    </>
  );
}

function AxesTab(props: ConfigPanelProps) {
  return (
    <>
      <div>
        <Label>X-Axis Label</Label>
        <input
          type="text"
          value={props.xLabel}
          onChange={(e) => props.onChange({ xLabel: e.target.value })}
          placeholder="e.g. Month"
          className="w-full px-3 py-1.5 text-xs rounded-lg body-text placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-cyan-500/40"
          style={{ background: "var(--c-input-bg)", border: "1px solid var(--c-border)" }}
        />
      </div>
      <div>
        <Label>Y-Axis Label</Label>
        <input
          type="text"
          value={props.yLabel}
          onChange={(e) => props.onChange({ yLabel: e.target.value })}
          placeholder="e.g. Revenue ($)"
          className="w-full px-3 py-1.5 text-xs rounded-lg body-text placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-cyan-500/40"
          style={{ background: "var(--c-input-bg)", border: "1px solid var(--c-border)" }}
        />
      </div>
      <div className="space-y-2">
        <Toggle value={props.xGrid} onChange={(v) => props.onChange({ xGrid: v })} label="X Grid" />
        <Toggle value={props.yGrid} onChange={(v) => props.onChange({ yGrid: v })} label="Y Grid" />
      </div>
    </>
  );
}

function LegendTab(props: ConfigPanelProps) {
  return (
    <div>
      <Label>Legend Position</Label>
      <div className="grid grid-cols-3 gap-1">
        {LEGEND_POSITIONS.map((lp) => (
          <button
            key={lp.value}
            onClick={() => props.onChange({ legend: lp.value === "" ? false : lp.value })}
            className={`px-2 py-2 text-[11px] font-mono rounded transition-all cursor-pointer ${
              (props.legend === false && lp.value === "") || props.legend === lp.value
                ? "bg-cyan-500/15 text-cyan-400 border border-cyan-500/30"
                : "card hover:border-cyan-500/20"
            }`}
          >
            {lp.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function AdvancedTab(props: ConfigPanelProps) {
  return (
    <>
      <div>
        <Label>Line Curve</Label>
        <div className="grid grid-cols-3 gap-1">
          {CURVES.map((c) => (
            <button
              key={c}
              onClick={() => props.onChange({ curve: c })}
              className={`px-2 py-1.5 text-[11px] font-mono rounded transition-all cursor-pointer capitalize ${
                props.curve === c
                  ? "bg-cyan-500/15 text-cyan-400 border border-cyan-500/30"
                  : "card hover:border-cyan-500/20"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
      <div>
        <Label>Bar Corner Radius</Label>
        <NumberInput value={props.barRadius} onChange={(n) => props.onChange({ barRadius: n })} min={0} max={20} step={1} />
      </div>
      <div className="space-y-2">
        <Toggle value={props.animate} onChange={(v) => props.onChange({ animate: v })} label="Animations" />
      </div>
    </>
  );
}
