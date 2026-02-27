"use client";

import { useEffect, useRef } from "react";
import type { GLChartData, GLChartOptions, GLChartInstance } from "@chartts/gl";

type GLFactory = (
  container: HTMLElement | string,
  opts: GLChartOptions & { data: GLChartData }
) => GLChartInstance;

const glFactories: Record<string, () => Promise<GLFactory>> = {
  scatter3d: () => import("@chartts/gl").then((m) => m.Scatter3D),
  bar3d: () => import("@chartts/gl").then((m) => m.Bar3D),
  surface3d: () => import("@chartts/gl").then((m) => m.Surface3D),
  globe3d: () => import("@chartts/gl").then((m) => m.Globe3D),
  map3d: () => import("@chartts/gl").then((m) => m.Map3D),
  lines3d: () => import("@chartts/gl").then((m) => m.Lines3D),
  line3d: () => import("@chartts/gl").then((m) => m.Line3D),
  torus3d: () => import("@chartts/gl").then((m) => m.Torus3D),
  "scatter-gl": () => import("@chartts/gl").then((m) => m.ScatterGL),
  "lines-gl": () => import("@chartts/gl").then((m) => m.LinesGL),
  "flow-gl": () => import("@chartts/gl").then((m) => m.FlowGL),
  "graph-gl": () => import("@chartts/gl").then((m) => m.GraphGL),
};

const glSampleData: Record<string, GLChartData> = {
  scatter3d: {
    series: [
      {
        name: "Cluster A",
        values: [45, 72, 38, 91, 56, 83, 29, 67, 54, 76],
        x: [1, 3, 5, 2, 7, 4, 6, 8, 3, 5],
        z: [2, 5, 1, 6, 3, 7, 4, 2, 8, 6],
      },
      {
        name: "Cluster B",
        values: [32, 58, 44, 71, 62, 39, 85, 51, 68, 47],
        x: [8, 6, 4, 7, 3, 5, 1, 6, 2, 4],
        z: [7, 3, 6, 1, 5, 2, 8, 4, 3, 7],
      },
    ],
  },
  bar3d: {
    categories: ["Q1", "Q2", "Q3", "Q4"],
    series: [
      { name: "Product A", values: [42, 55, 72, 65], x: [0, 1, 2, 3], z: [0, 0, 0, 0] },
      { name: "Product B", values: [28, 34, 45, 52], x: [0, 1, 2, 3], z: [1, 1, 1, 1] },
      { name: "Product C", values: [15, 22, 31, 38], x: [0, 1, 2, 3], z: [2, 2, 2, 2] },
    ],
  },
  surface3d: {
    grid: Array.from({ length: 20 }, (_, r) =>
      Array.from({ length: 20 }, (_, c) => {
        const x = (c - 10) / 3;
        const z = (r - 10) / 3;
        return Math.sin(Math.sqrt(x * x + z * z)) * 3;
      })
    ),
    series: [],
  },
  globe3d: {
    series: [
      {
        name: "Cities",
        values: [100, 80, 60, 90, 70, 50, 85, 45],
        x: [-74, -0.12, 139.7, -43.2, 37.6, 77.2, 116.4, 151.2],
        z: [40.7, 51.5, 35.7, -22.9, 55.8, 28.6, 39.9, -33.9],
      },
    ],
  },
  map3d: {
    series: [
      {
        name: "Regions",
        values: [45, 32, 58, 71, 26, 63],
        x: [-2, 0, 2, -1, 1, 3],
        z: [-1, 1, 0, 2, -2, 1],
      },
    ],
  },
  lines3d: {
    series: [
      {
        name: "Path A",
        values: [1, 3, 2, 5, 4, 6],
        x: [0, 1, 2, 3, 4, 5],
        z: [0, 1, 0, -1, 0, 1],
      },
      {
        name: "Path B",
        values: [2, 1, 4, 3, 6, 5],
        x: [0, 1, 2, 3, 4, 5],
        z: [1, 0, -1, 0, 1, 0],
      },
    ],
  },
  line3d: {
    series: [
      {
        name: "Trajectory",
        values: Array.from({ length: 50 }, (_, i) => Math.sin(i / 5) * 3),
        x: Array.from({ length: 50 }, (_, i) => i * 0.2),
        z: Array.from({ length: 50 }, (_, i) => Math.cos(i / 5) * 3),
      },
    ],
  },
  torus3d: {
    series: [
      { name: "Ring", values: [85, 72, 90, 65], x: [0, 1, 2, 3], z: [0, 0, 0, 0] },
    ],
  },
  "scatter-gl": {
    series: [
      {
        name: "Dataset A",
        x: Array.from({ length: 200 }, () => Math.random() * 100),
        y: Array.from({ length: 200 }, () => Math.random() * 100),
      },
      {
        name: "Dataset B",
        x: Array.from({ length: 200 }, () => 30 + Math.random() * 40),
        y: Array.from({ length: 200 }, () => 30 + Math.random() * 40),
      },
    ],
  },
  "lines-gl": {
    series: Array.from({ length: 5 }, (_, i) => ({
      name: `Series ${i + 1}`,
      x: Array.from({ length: 100 }, (_, j) => j),
      y: Array.from({ length: 100 }, (_, j) => Math.sin(j / 10 + i) * 40 + 50 + i * 5),
    })),
  },
  "flow-gl": {
    series: [
      {
        name: "Flow",
        x: Array.from({ length: 500 }, () => Math.random() * 100),
        y: Array.from({ length: 500 }, () => Math.random() * 100),
      },
    ],
  },
  "graph-gl": {
    series: [
      {
        name: "Network",
        x: Array.from({ length: 30 }, () => Math.random() * 100),
        y: Array.from({ length: 30 }, () => Math.random() * 100),
        values: Array.from({ length: 30 }, () => Math.random() * 20 + 5),
      },
    ],
  },
};


export function GLChartPreview({
  slug,
  theme = "dark",
}: {
  slug: string;
  theme?: "dark" | "light";
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<GLChartInstance | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const factory = glFactories[slug];
    const data = glSampleData[slug];
    if (!factory || !data) return;

    let destroyed = false;

    factory().then((create) => {
      if (destroyed || !el) return;
      try {
        instanceRef.current = create(el, {
          data,
          theme,
          animate: true,
          orbit: { autoRotate: true, autoRotateSpeed: 0.3 },
        });
      } catch (e) {
        console.warn(`[GLChartPreview] Failed to render ${slug}:`, e);
      }
    });

    return () => {
      destroyed = true;
      instanceRef.current?.destroy();
      instanceRef.current = null;
    };
  }, [slug, theme]);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: 380, position: "relative", borderRadius: 12, overflow: "hidden" }}
    />
  );
}
