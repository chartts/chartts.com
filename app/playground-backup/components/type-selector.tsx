"use client";

import { useState, useMemo, useCallback } from "react";
import { chartDisplayNames, sampleData, renderChart } from "@/lib/charts";

const CATEGORIES: Record<string, string[]> = {
  Trending: ["line", "area", "step", "sparkline", "range", "baseline"],
  Comparison: ["bar", "stacked-bar", "horizontal-bar", "lollipop", "bullet", "dumbbell", "pillar", "pareto"],
  Composition: ["pie", "donut", "treemap", "sunburst", "pack", "funnel", "waterfall"],
  Distribution: ["scatter", "bubble", "histogram", "boxplot", "violin", "heatmap"],
  Radial: ["radar", "polar", "radial-bar", "gauge"],
  Financial: ["candlestick", "ohlc", "volume", "kagi", "renko"],
  Relationship: ["sankey", "chord", "graph", "flow", "parallel"],
  Hierarchy: ["tree", "org"],
  Specialty: ["calendar", "matrix", "geo", "wordcloud", "voronoi", "themeriver", "pictorialbar", "combo", "gantt", "lines"],
};

// Pre-render thumbnails (just once, at import time)
const thumbnailCache: Record<string, string | null> = {};
function getThumbnail(type: string): string | null {
  if (!(type in thumbnailCache)) {
    thumbnailCache[type] = renderChart(type, { width: 120, height: 64, theme: "dark" });
  }
  return thumbnailCache[type];
}

interface TypeSelectorProps {
  value: string;
  onChange: (type: string) => void;
}

export default function TypeSelector({ value, onChange }: TypeSelectorProps) {
  const [search, setSearch] = useState("");
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const allTypes = useMemo(() => {
    const types: string[] = [];
    for (const cat of Object.values(CATEGORIES)) {
      for (const t of cat) {
        if (sampleData[t]) types.push(t);
      }
    }
    return types;
  }, []);

  const filtered = useMemo(() => {
    if (!search.trim()) return null;
    const q = search.toLowerCase();
    return allTypes.filter(
      (t) =>
        t.includes(q) ||
        (chartDisplayNames[t] ?? t).toLowerCase().includes(q)
    );
  }, [search, allTypes]);

  const toggleCollapse = useCallback((cat: string) => {
    setCollapsed((prev) => ({ ...prev, [cat]: !prev[cat] }));
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="px-3 pt-3 pb-2">
        <input
          type="text"
          placeholder="Search charts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-3 py-1.5 text-xs rounded-lg body-text placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/40"
          style={{ background: "var(--c-input-bg)", border: "1px solid var(--c-border)" }}
        />
      </div>

      <div className="flex-1 overflow-y-auto px-2 pb-2 space-y-1">
        {filtered ? (
          /* Search results */
          filtered.length === 0 ? (
            <p className="text-xs muted-text text-center py-4">No charts found</p>
          ) : (
            filtered.map((type) => (
              <TypeItem
                key={type}
                type={type}
                active={value === type}
                onClick={() => onChange(type)}
              />
            ))
          )
        ) : (
          /* Categorized list */
          Object.entries(CATEGORIES).map(([cat, types]) => {
            const available = types.filter((t) => sampleData[t]);
            if (available.length === 0) return null;
            const isCollapsed = collapsed[cat];

            return (
              <div key={cat}>
                <button
                  onClick={() => toggleCollapse(cat)}
                  className="w-full flex items-center justify-between px-2 py-1.5 text-[10px] font-mono muted-text uppercase tracking-wider hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  <span>{cat}</span>
                  <svg
                    className={`w-3 h-3 transition-transform ${isCollapsed ? "" : "rotate-90"}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                {!isCollapsed && (
                  <div className="space-y-0.5">
                    {available.map((type) => (
                      <TypeItem
                        key={type}
                        type={type}
                        active={value === type}
                        onClick={() => onChange(type)}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

function TypeItem({ type, active, onClick }: { type: string; active: boolean; onClick: () => void }) {
  const name = chartDisplayNames[type] ?? type;
  const thumb = getThumbnail(type);

  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-left transition-all cursor-pointer ${
        active
          ? "bg-cyan-500/10 border border-cyan-500/30"
          : "border border-transparent hover:bg-white/[0.03]"
      }`}
    >
      {thumb ? (
        <div
          className="w-10 h-6 flex-shrink-0 rounded overflow-hidden opacity-70"
          style={{ background: "var(--c-bg)" }}
          dangerouslySetInnerHTML={{ __html: thumb }}
        />
      ) : (
        <div
          className="w-10 h-6 flex-shrink-0 rounded"
          style={{ background: "var(--c-card-bg)" }}
        />
      )}
      <span
        className={`text-xs truncate ${
          active ? "text-cyan-400 font-medium" : "body-text"
        }`}
      >
        {name}
      </span>
    </button>
  );
}
