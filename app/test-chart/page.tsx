"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { renderToString, barChartType } from "@chartts/core/all";
import { sampleData, chartDisplayNames, chartTypes } from "@/lib/charts";

const CHART_TYPES = Object.keys(sampleData);

function cloneData(type: string) {
  const d = sampleData[type];
  if (!d) return { labels: ["A", "B", "C"], series: [{ name: "Value", values: [10, 20, 30] }] };
  return {
    labels: [...(d.labels ?? [])] as string[],
    series: d.series.map((s) => ({ name: s.name, values: [...s.values] })),
  };
}

export default function TestChart() {
  const [chartType, setChartType] = useState("bar");
  const [labels, setLabels] = useState<string[]>(() => cloneData("bar").labels);
  const [series, setSeries] = useState(() => cloneData("bar").series);

  const svg = useMemo(() => {
    const plugin = chartTypes[chartType];
    if (!plugin || !labels.length || !series.length) return null;
    try {
      let result = renderToString(plugin, { labels, series }, {
        width: 600, height: 400, theme: "dark" as const,
      });
      return result.replace('class="chartts"', 'class="chartts chartts-skip-anim"');
    } catch {
      return null;
    }
  }, [chartType, labels, series]);

  const switchType = useCallback((type: string) => {
    setChartType(type);
    const d = cloneData(type);
    setLabels(d.labels);
    setSeries(d.series);
  }, []);

  return (
    <div style={{ padding: 40, background: "#0a0a0f", minHeight: "100vh", color: "#fff" }}>
      <h1 style={{ marginBottom: 16, fontSize: 18 }}>Static import test</h1>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
        {CHART_TYPES.map((t) => (
          <button
            key={t}
            onClick={() => switchType(t)}
            style={{
              padding: "4px 10px", fontSize: 11, fontFamily: "monospace", borderRadius: 6,
              border: t === chartType ? "1px solid #06b6d4" : "1px solid #333",
              background: t === chartType ? "rgba(6,182,212,0.15)" : "#111",
              color: t === chartType ? "#06b6d4" : "#aaa", cursor: "pointer",
            }}
          >
            {chartDisplayNames[t] ?? t}
          </button>
        ))}
      </div>

      {svg ? (
        <div
          style={{ maxWidth: 600, border: "1px solid #333", borderRadius: 8 }}
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      ) : (
        <p style={{ color: "red" }}>No chart</p>
      )}
    </div>
  );
}
