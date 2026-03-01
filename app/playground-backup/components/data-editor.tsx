"use client";

import { useState, useCallback, useRef } from "react";

interface DataEditorProps {
  labels: (string | number)[];
  series: { name: string; values: number[]; color?: string }[];
  onLabelsChange: (labels: (string | number)[]) => void;
  onSeriesChange: (series: { name: string; values: number[]; color?: string }[]) => void;
  onReset: () => void;
}

export default function DataEditor({
  labels,
  series,
  onLabelsChange,
  onSeriesChange,
  onReset,
}: DataEditorProps) {
  const [csvOpen, setCsvOpen] = useState(false);
  const [csvText, setCsvText] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const updateLabel = useCallback(
    (idx: number, val: string) => {
      const next = [...labels];
      next[idx] = val;
      onLabelsChange(next);
    },
    [labels, onLabelsChange]
  );

  const updateValue = useCallback(
    (si: number, vi: number, raw: string) => {
      const num = parseFloat(raw);
      if (isNaN(num)) return;
      const next = series.map((s, i) =>
        i === si ? { ...s, values: s.values.map((v, j) => (j === vi ? num : v)) } : s
      );
      onSeriesChange(next);
    },
    [series, onSeriesChange]
  );

  const updateSeriesName = useCallback(
    (si: number, name: string) => {
      const next = series.map((s, i) => (i === si ? { ...s, name } : s));
      onSeriesChange(next);
    },
    [series, onSeriesChange]
  );

  const addRow = useCallback(() => {
    const idx = labels.length;
    onLabelsChange([...labels, `Item ${idx + 1}`]);
    onSeriesChange(series.map((s) => ({ ...s, values: [...s.values, 0] })));
  }, [labels, series, onLabelsChange, onSeriesChange]);

  const deleteRow = useCallback(
    (idx: number) => {
      if (labels.length <= 1) return;
      onLabelsChange(labels.filter((_, i) => i !== idx));
      onSeriesChange(series.map((s) => ({ ...s, values: s.values.filter((_, i) => i !== idx) })));
    },
    [labels, series, onLabelsChange, onSeriesChange]
  );

  const addSeries = useCallback(() => {
    const name = `Series ${series.length + 1}`;
    const values = new Array(labels.length).fill(0);
    onSeriesChange([...series, { name, values }]);
  }, [labels.length, series, onSeriesChange]);

  const deleteSeries = useCallback(
    (idx: number) => {
      if (series.length <= 1) return;
      onSeriesChange(series.filter((_, i) => i !== idx));
    },
    [series, onSeriesChange]
  );

  const parseCSV = useCallback(
    (raw: string) => {
      const lines = raw
        .trim()
        .split("\n")
        .map((l) => l.split(/[,\t]/).map((c) => c.trim().replace(/^"|"$/g, "")));
      if (lines.length < 2) return;

      const headers = lines[0];
      const rows = lines.slice(1);
      const newLabels = rows.map((r) => r[0] ?? "");
      const newSeries = headers.slice(1).map((h, ci) => ({
        name: h,
        values: rows.map((r) => {
          const n = parseFloat(r[ci + 1] ?? "0");
          return isNaN(n) ? 0 : n;
        }),
      }));

      onLabelsChange(newLabels);
      onSeriesChange(newSeries);
      setCsvOpen(false);
      setCsvText("");
    },
    [onLabelsChange, onSeriesChange]
  );

  const handleFile = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") parseCSV(reader.result);
      };
      reader.readAsText(file);
    },
    [parseCSV]
  );

  return (
    <div className="flex flex-col gap-2">
      {/* Toolbar */}
      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={addRow}
          className="px-2 py-1 text-[11px] font-mono rounded card hover:border-cyan-500/30 transition-colors cursor-pointer"
        >
          + Row
        </button>
        <button
          onClick={addSeries}
          className="px-2 py-1 text-[11px] font-mono rounded card hover:border-cyan-500/30 transition-colors cursor-pointer"
        >
          + Series
        </button>
        <button
          onClick={() => setCsvOpen(!csvOpen)}
          className="px-2 py-1 text-[11px] font-mono rounded card hover:border-cyan-500/30 transition-colors cursor-pointer"
        >
          CSV
        </button>
        <input
          ref={fileRef}
          type="file"
          accept=".csv,.tsv,.txt"
          onChange={handleFile}
          className="hidden"
        />
        <button
          onClick={() => fileRef.current?.click()}
          className="px-2 py-1 text-[11px] font-mono rounded card hover:border-cyan-500/30 transition-colors cursor-pointer"
        >
          Import
        </button>
        <button
          onClick={onReset}
          className="px-2 py-1 text-[11px] font-mono rounded text-amber-400 border border-amber-500/20 hover:border-amber-500/40 transition-colors cursor-pointer ml-auto"
        >
          Reset
        </button>
      </div>

      {/* CSV paste area */}
      {csvOpen && (
        <div className="flex flex-col gap-1.5">
          <textarea
            rows={4}
            placeholder={"Label,Series1,Series2\nJan,100,80\nFeb,150,120"}
            value={csvText}
            onChange={(e) => setCsvText(e.target.value)}
            className="w-full px-3 py-2 text-xs font-mono rounded-lg body-text placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-cyan-500/40 resize-none"
            style={{ background: "var(--c-input-bg)", border: "1px solid var(--c-border)" }}
          />
          <button
            onClick={() => parseCSV(csvText)}
            disabled={!csvText.trim()}
            className="self-end px-3 py-1 text-[11px] font-mono rounded-lg bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/25 transition-colors cursor-pointer disabled:opacity-40"
          >
            Apply CSV
          </button>
        </div>
      )}

      {/* Data table */}
      <div className="overflow-x-auto rounded-lg" style={{ border: "1px solid var(--c-border)" }}>
        <table className="w-full text-xs font-mono">
          <thead>
            <tr style={{ background: "var(--c-card-bg)" }}>
              <th className="px-2 py-1.5 text-left muted-text font-normal w-8">#</th>
              <th className="px-2 py-1.5 text-left muted-text font-normal">Label</th>
              {series.map((s, si) => (
                <th key={si} className="px-2 py-1.5 text-left font-normal min-w-[80px]">
                  <div className="flex items-center gap-1">
                    <EditableCell
                      value={s.name}
                      onChange={(v) => updateSeriesName(si, v)}
                      className="text-cyan-400 font-medium"
                    />
                    {series.length > 1 && (
                      <button
                        onClick={() => deleteSeries(si)}
                        className="text-gray-600 hover:text-red-400 transition-colors cursor-pointer flex-shrink-0"
                        title="Remove series"
                      >
                        &times;
                      </button>
                    )}
                  </div>
                </th>
              ))}
              <th className="w-6" />
            </tr>
          </thead>
          <tbody>
            {labels.map((label, ri) => (
              <tr
                key={ri}
                className="border-t"
                style={{ borderColor: "var(--c-border)" }}
              >
                <td className="px-2 py-1 muted-text">{ri + 1}</td>
                <td className="px-2 py-1">
                  <EditableCell
                    value={String(label)}
                    onChange={(v) => updateLabel(ri, v)}
                    className="body-text"
                  />
                </td>
                {series.map((s, si) => (
                  <td key={si} className="px-2 py-1">
                    <EditableCell
                      value={String(s.values[ri] ?? 0)}
                      onChange={(v) => updateValue(si, ri, v)}
                      className="body-text text-right"
                      numeric
                    />
                  </td>
                ))}
                <td className="px-1 py-1">
                  {labels.length > 1 && (
                    <button
                      onClick={() => deleteRow(ri)}
                      className="text-gray-600 hover:text-red-400 transition-colors cursor-pointer text-xs"
                      title="Remove row"
                    >
                      &times;
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function EditableCell({
  value,
  onChange,
  className = "",
  numeric = false,
}: {
  value: string;
  onChange: (v: string) => void;
  className?: string;
  numeric?: boolean;
}) {
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
        type={numeric ? "number" : "text"}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === "Enter") commit();
          if (e.key === "Escape") {
            setDraft(value);
            setEditing(false);
          }
        }}
        className={`w-full bg-transparent outline-none text-xs ${className}`}
        style={{ minWidth: 40 }}
      />
    );
  }

  return (
    <span
      onClick={() => {
        setDraft(value);
        setEditing(true);
      }}
      className={`cursor-text hover:text-cyan-300 transition-colors ${className}`}
    >
      {value}
    </span>
  );
}
