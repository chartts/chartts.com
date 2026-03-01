"use client";

import { useRef, useEffect, useCallback } from "react";
import {
  createChart,
  type ChartInstance,
  type ChartData,
  type ChartOptions,
} from "@chartts/core";
import { chartTypes, sampleData } from "@/lib/charts";

// ---------------------------------------------------------------------------
// Interaction presets per chart category
// ---------------------------------------------------------------------------

const financial = new Set(["candlestick", "ohlc", "volume", "kagi", "renko"]);
const composition = new Set([
  "pie", "donut", "treemap", "sunburst", "pack", "funnel", "waterfall",
]);
const relationship = new Set([
  "sankey", "chord", "graph", "flow", "parallel", "lines", "tree", "org", "gantt",
]);
const radial = new Set(["radar", "polar", "radial-bar", "gauge"]);
const specialty = new Set([
  "calendar", "matrix", "geo", "wordcloud", "voronoi", "themeriver", "pictorialbar",
]);
const zoomable = new Set([
  "line", "area", "step", "range", "baseline", "combo",
  "scatter", "bubble", "histogram", "boxplot", "violin", "heatmap",
]);

function getInteractionOptions(type: string): Partial<ChartOptions> {
  if (financial.has(type)) {
    return {
      tooltip: { enabled: true },
      crosshair: { mode: "both" },
      zoom: true,
      pan: true,
    };
  }
  if (composition.has(type) || radial.has(type) || specialty.has(type)) {
    return { tooltip: { enabled: true } };
  }
  if (relationship.has(type)) {
    return { tooltip: { enabled: true } };
  }
  if (zoomable.has(type)) {
    return {
      tooltip: { enabled: true },
      crosshair: { mode: "vertical" },
      zoom: true,
      pan: true,
    };
  }
  // Default: comparison charts (bar, stacked-bar, etc.)
  return {
    tooltip: { enabled: true },
    crosshair: { mode: "vertical" },
  };
}

// ---------------------------------------------------------------------------
// Init queue — stagger chart creation to avoid jank
// ---------------------------------------------------------------------------

const initQueue: (() => void)[] = [];
let initTimer: ReturnType<typeof setTimeout> | null = null;

function queueInit(fn: () => void) {
  initQueue.push(fn);
  if (!initTimer) {
    initTimer = setTimeout(processQueue, 0);
  }
}

function processQueue() {
  const fn = initQueue.shift();
  if (fn) fn();
  if (initQueue.length > 0) {
    initTimer = setTimeout(processQueue, 50);
  } else {
    initTimer = null;
  }
}

// ---------------------------------------------------------------------------
// InteractiveChart component
// ---------------------------------------------------------------------------

export function InteractiveChart({
  type,
  initialSvg,
}: {
  type: string;
  initialSvg: string | null;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<ChartInstance | null>(null);

  const initChart = useCallback(() => {
    const el = containerRef.current;
    if (!el || instanceRef.current) return;

    const chartType = chartTypes[type];
    const data: ChartData | undefined = sampleData[type];
    if (!chartType || !data) return;

    const isDark = document.documentElement.classList.contains("dark");
    const opts: ChartOptions = {
      theme: isDark ? "dark" : "light",
      ...getInteractionOptions(type),
    };

    try {
      el.innerHTML = "";
      instanceRef.current = createChart(el, chartType, data, opts);
      // Show badge via DOM — no React re-render
      if (badgeRef.current) badgeRef.current.style.display = "flex";
    } catch (e) {
      console.warn(`[InteractiveChart] Failed to create ${type}:`, e);
      if (initialSvg) {
        el.innerHTML = initialSvg;
      }
    }
  }, [type, initialSvg]);

  // Lazy init via IntersectionObserver
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          queueInit(initChart);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [initChart]);

  // Theme change: update live chart
  useEffect(() => {
    const observer = new MutationObserver(() => {
      if (!instanceRef.current) return;
      const isDark = document.documentElement.classList.contains("dark");
      instanceRef.current.setOptions({ theme: isDark ? "dark" : "light" });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  // Cleanup
  useEffect(() => {
    return () => {
      instanceRef.current?.destroy();
      instanceRef.current = null;
    };
  }, []);

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className="w-full [&>svg]:w-full [&>svg]:h-auto rounded-lg overflow-hidden"
        style={{ minHeight: 200 }}
        dangerouslySetInnerHTML={
          initialSvg ? { __html: initialSvg } : undefined
        }
      />
      <div
        ref={badgeRef}
        className="absolute top-2 right-2 items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 pointer-events-none"
        style={{ display: "none" }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        Interactive
      </div>
    </div>
  );
}
