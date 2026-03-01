"use client";

import { useMemo } from "react";
import { renderToString } from "@chartts/core";
import { chartTypes } from "@/lib/charts";

interface PreviewProps {
  chartType: string;
  labels: (string | number)[];
  series: { name: string; values: number[]; color?: string }[];
  width: number;
  height: number;
  theme: string;
}

export default function Preview(props: PreviewProps) {
  const { svg, error } = useMemo(() => {
    if (!props.labels.length || !props.series.length) return { svg: null, error: null };

    const plugin = chartTypes[props.chartType];
    if (!plugin) return { svg: null, error: `Unknown type: ${props.chartType}` };

    try {
      let s = renderToString(plugin, {
        labels: props.labels as string[],
        series: props.series,
      }, {
        width: props.width,
        height: props.height,
        theme: props.theme as "dark" | "light",
      });
      // Add skip-anim class so bars/lines aren't stuck at opacity:0
      s = s.replace('class="chartts"', 'class="chartts chartts-skip-anim"');
      return { svg: s, error: null };
    } catch (e: unknown) {
      return { svg: null, error: e instanceof Error ? e.message : String(e) };
    }
  }, [props.chartType, props.labels, props.series, props.width, props.height, props.theme]);

  if (error) {
    return (
      <div className="w-full flex flex-col items-center justify-center rounded-xl p-6"
        style={{ aspectRatio: `${props.width}/${props.height}`, background: "var(--c-card-bg)", border: "1px solid var(--c-border)" }}>
        <p className="text-red-400 font-mono text-xs">{error}</p>
      </div>
    );
  }

  if (!svg) {
    return (
      <div className="w-full flex items-center justify-center rounded-xl muted-text text-sm"
        style={{ aspectRatio: `${props.width}/${props.height}`, background: "var(--c-card-bg)", border: "1px solid var(--c-border)" }}>
        Select a chart type
      </div>
    );
  }

  return (
    <div
      className="w-full rounded-xl overflow-hidden [&>svg]:w-full [&>svg]:h-auto"
      style={{ border: "1px solid var(--c-border)" }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
