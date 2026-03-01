"use client";

import { useState, useMemo, useCallback, useRef } from "react";
import { generateCode, type ExportTarget, type CodeGenState } from "./code-gen";

const TARGETS: { id: ExportTarget; label: string }[] = [
  { id: "vanilla", label: "Vanilla JS" },
  { id: "react", label: "React" },
  { id: "vue", label: "Vue" },
  { id: "svelte", label: "Svelte" },
  { id: "angular", label: "Angular" },
];

interface ExportPanelProps {
  state: CodeGenState;
  svgRef: React.RefObject<HTMLDivElement | null>;
}

export default function ExportPanel({ state, svgRef }: ExportPanelProps) {
  const [target, setTarget] = useState<ExportTarget>("react");
  const [copied, setCopied] = useState(false);
  const [urlCopied, setUrlCopied] = useState(false);

  const code = useMemo(() => generateCode(target, state), [target, state]);

  const copyCode = useCallback(async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  const downloadSVG = useCallback(() => {
    const svgEl = svgRef.current?.querySelector("svg");
    if (!svgEl) return;
    const xml = new XMLSerializer().serializeToString(svgEl);
    const blob = new Blob([xml], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `chart-${state.chartType}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  }, [svgRef, state.chartType]);

  const downloadPNG = useCallback(() => {
    const svgEl = svgRef.current?.querySelector("svg");
    if (!svgEl) return;
    const xml = new XMLSerializer().serializeToString(svgEl);
    const canvas = document.createElement("canvas");
    canvas.width = 2000;
    canvas.height = 1200;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#0a0a0f";
    ctx.fillRect(0, 0, 2000, 1200);
    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0, 2000, 1200);
      const a = document.createElement("a");
      a.href = canvas.toDataURL("image/png");
      a.download = `chart-${state.chartType}.png`;
      a.click();
    };
    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(xml)));
  }, [svgRef, state.chartType]);

  const copyURL = useCallback(async () => {
    const params = new URLSearchParams();
    state.series.forEach((s) => params.append("d", s.values.join(",")));
    if (state.labels.length) params.set("l", state.labels.join(","));
    if (state.series.some((s) => s.name)) {
      params.set("n", state.series.map((s) => s.name).join(","));
    }
    params.set("theme", state.theme);
    const url = `https://i.chartts.com/${state.chartType}.svg?${params.toString()}`;
    await navigator.clipboard.writeText(url);
    setUrlCopied(true);
    setTimeout(() => setUrlCopied(false), 2000);
  }, [state]);

  return (
    <div className="flex flex-col gap-3">
      {/* Target tabs */}
      <div className="flex gap-1 flex-wrap">
        {TARGETS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTarget(t.id)}
            className={`px-3 py-1.5 text-[11px] font-mono rounded-lg transition-all cursor-pointer ${
              target === t.id
                ? "bg-cyan-500/15 text-cyan-400 border border-cyan-500/30"
                : "card hover:border-cyan-500/20 body-text"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Code output */}
      <div className="relative">
        <pre
          className="overflow-x-auto p-4 rounded-xl text-xs font-mono leading-relaxed"
          style={{ background: "var(--c-bg)", border: "1px solid var(--c-border)" }}
        >
          <code className="body-text">{code}</code>
        </pre>
        <button
          onClick={copyCode}
          className="absolute top-2 right-2 px-2 py-1 text-[10px] font-mono rounded bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/25 transition-colors cursor-pointer"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      {/* Action buttons */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={downloadSVG}
          className="px-3 py-1.5 text-[11px] font-mono rounded-lg card hover:border-cyan-500/30 transition-colors cursor-pointer body-text"
        >
          Download SVG
        </button>
        <button
          onClick={downloadPNG}
          className="px-3 py-1.5 text-[11px] font-mono rounded-lg card hover:border-cyan-500/30 transition-colors cursor-pointer body-text"
        >
          Download PNG
        </button>
        <button
          onClick={copyURL}
          className="px-3 py-1.5 text-[11px] font-mono rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors cursor-pointer"
        >
          {urlCopied ? "URL Copied!" : "Copy i.chartts.com URL"}
        </button>
      </div>
    </div>
  );
}
