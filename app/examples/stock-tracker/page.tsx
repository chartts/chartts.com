"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Link from "next/link";
import {
  createChart,
  type ChartInstance,
  type ChartData,
} from "@chartts/core";
import { chartTypes, renderChart } from "@/lib/charts";
import { CodeBlock } from "@/lib/highlight";

/* ═══════════════════════════════════════════════════════════════
   SIMULATED MARKET DATA
   ═══════════════════════════════════════════════════════════════ */

const TICKERS_INIT = [
  { sym: "AAPL", price: 194.2, change: 2.4, pct: 1.25 },
  { sym: "MSFT", price: 412.5, change: 4.62, pct: 1.13 },
  { sym: "GOOGL", price: 174.8, change: -1.24, pct: -0.7 },
  { sym: "AMZN", price: 186.4, change: 3.18, pct: 1.74 },
  { sym: "NVDA", price: 878.4, change: 12.6, pct: 1.46 },
  { sym: "META", price: 502.3, change: -2.1, pct: -0.42 },
  { sym: "TSLA", price: 248.6, change: 5.8, pct: 2.39 },
  { sym: "JPM", price: 198.2, change: 1.4, pct: 0.71 },
  { sym: "V", price: 282.1, change: -0.9, pct: -0.32 },
  { sym: "BRK.B", price: 412.8, change: 2.2, pct: 0.54 },
];

/** Generate realistic intraday price data via random walk */
function generateCandles(
  basePrice: number,
  count: number,
  volatility = 0.015,
) {
  const labels: string[] = [];
  const opens: number[] = [];
  const highs: number[] = [];
  const lows: number[] = [];
  const closes: number[] = [];
  const volumes: number[] = [];

  let price = basePrice;
  const now = new Date();
  for (let i = count - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    // skip weekends
    const dow = d.getDay();
    if (dow === 0 || dow === 6) continue;
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    labels.push(`${mm}/${dd}`);

    const o = price;
    const move = price * volatility * (Math.random() - 0.48);
    const c = +(o + move).toFixed(2);
    const h = +(Math.max(o, c) + Math.abs(move) * Math.random()).toFixed(2);
    const l = +(Math.min(o, c) - Math.abs(move) * Math.random()).toFixed(2);
    opens.push(o);
    highs.push(h);
    lows.push(l);
    closes.push(c);
    volumes.push(+(20 + Math.random() * 60).toFixed(1));
    price = c;
  }

  return { labels, opens, highs, lows, closes, volumes };
}

/** Tick a single candle (simulated live update) */
function tickPrice(
  price: number,
  volatility = 0.003,
): { price: number; move: number } {
  const move = price * volatility * (Math.random() - 0.48);
  return { price: +(price + move).toFixed(2), move: +move.toFixed(2) };
}

/* ═══════════════════════════════════════════════════════════════
   CHART WRAPPERS
   ═══════════════════════════════════════════════════════════════ */

function useChart(
  type: string,
  data: ChartData,
  opts: Record<string, unknown> = {},
) {
  const ref = useRef<HTMLDivElement>(null);
  const instance = useRef<ChartInstance | null>(null);

  // Mount chart
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ct = chartTypes[type];
    if (!ct) return;

    try {
      instance.current = createChart(el, ct, data, {
        theme: "dark",
        tooltip: { enabled: true },
        ...opts,
      });
    } catch (e) {
      console.warn(`[chart] ${type} failed:`, e);
      // Fallback: SSR render
      const svg = renderChart(type, {
        width: (opts.width as number) ?? 600,
        height: (opts.height as number) ?? 300,
        theme: "dark",
        data,
      });
      if (svg) el.innerHTML = svg;
    }

    return () => {
      instance.current?.destroy();
      instance.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  // Update data
  useEffect(() => {
    if (instance.current) {
      try {
        instance.current.setData(data);
      } catch {
        // ignore update errors
      }
    }
  }, [data]);

  return ref;
}

/* ═══════════════════════════════════════════════════════════════
   PERFORMANCE METRICS
   ═══════════════════════════════════════════════════════════════ */

const METRICS = [
  { label: "52-Week High", value: "$204.20" },
  { label: "52-Week Low", value: "$142.80" },
  { label: "P/E Ratio", value: "31.2x" },
  { label: "EPS (TTM)", value: "$6.23" },
  { label: "Div Yield", value: "0.52%" },
  { label: "Beta", value: "1.24" },
  { label: "Avg Volume", value: "44.2M" },
  { label: "Shares Out", value: "15.5B" },
];

/* ═══════════════════════════════════════════════════════════════
   CODE EXAMPLE
   ═══════════════════════════════════════════════════════════════ */

const CODE = `import { createChart, candlestickChartType, volumeChartType, lineChartType } from "@chartts/core"

// Candlestick chart with live updates
const candle = createChart("#candle", candlestickChartType, ohlcData, {
  theme: "dark",
  tooltip: { enabled: true },
  crosshair: { mode: "both" },
  zoom: true,
  pan: true,
})

// Volume bars synced below
const volume = createChart("#volume", volumeChartType, volumeData, {
  theme: "dark",
  tooltip: { enabled: true },
})

// Moving averages overlay
const ma = createChart("#ma", lineChartType, maData, {
  theme: "dark",
  crosshair: { mode: "vertical" },
})

// Simulate live price feed
setInterval(() => {
  const tick = generateTick(lastPrice)
  appendCandle(ohlcData, tick)
  candle.setData(ohlcData)
  volume.setData(volumeData)
}, 2000)`;

/* ═══════════════════════════════════════════════════════════════
   PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════ */

export default function StockTrackerPage() {
  // ── Core state ──
  const [candles, setCandles] = useState(() => generateCandles(180, 40));
  const [tickers, setTickers] = useState(TICKERS_INIT);
  const [lastPrice, setLastPrice] = useState(194.2);
  const [lastChange, setLastChange] = useState(2.4);
  const [tickCount, setTickCount] = useState(0);

  // ── Build chart data from candles ──
  const candleData = useMemo<ChartData>(
    () => ({
      labels: candles.labels,
      series: [
        { name: "Open", values: candles.opens },
        { name: "High", values: candles.highs },
        { name: "Low", values: candles.lows },
        { name: "Close", values: candles.closes },
      ],
    }),
    [candles],
  );

  const volumeData = useMemo<ChartData>(
    () => ({
      labels: candles.labels,
      series: [{ name: "Volume (M)", values: candles.volumes }],
    }),
    [candles],
  );

  const kagiData = useMemo<ChartData>(
    () => ({
      labels: candles.labels.slice(-14),
      series: [
        { name: "Price", values: candles.closes.slice(-14) },
      ],
    }),
    [candles],
  );

  const maData = useMemo<ChartData>(() => {
    const c = candles.closes;
    const sma = c.map((_, i) => {
      const start = Math.max(0, i - 9);
      const slice = c.slice(start, i + 1);
      return +(slice.reduce((a, b) => a + b, 0) / slice.length).toFixed(2);
    });
    const ema: number[] = [];
    const k = 2 / 11;
    c.forEach((v, i) => {
      ema.push(i === 0 ? v : +(v * k + ema[i - 1]! * (1 - k)).toFixed(2));
    });
    return {
      labels: candles.labels,
      series: [
        { name: "Price", values: [...c] },
        { name: "SMA 10", values: sma },
        { name: "EMA 10", values: ema },
      ],
    };
  }, [candles]);

  // ── Sparkline data for KPIs ──
  const priceSparkData = useMemo<ChartData>(
    () => ({
      labels: candles.closes.slice(-12).map((_, i) => String(i)),
      series: [{ name: "p", values: candles.closes.slice(-12) }],
    }),
    [candles],
  );

  const volSparkData = useMemo<ChartData>(
    () => ({
      labels: candles.volumes.slice(-12).map((_, i) => String(i)),
      series: [{ name: "v", values: candles.volumes.slice(-12) }],
    }),
    [candles],
  );

  // ── Chart refs ──
  const candleRef = useChart("candlestick", candleData, {
    crosshair: { mode: "both" },
    zoom: true,
    pan: true,
  });
  const volumeRef = useChart("volume", volumeData, {});
  const kagiRef = useChart("kagi", kagiData, {});
  const maRef = useChart("line", maData, {
    crosshair: { mode: "vertical" },
  });
  const priceSparkRef = useChart("sparkline", priceSparkData, {
    width: 140,
    height: 36,
  });
  const volSparkRef = useChart("sparkline", volSparkData, {
    width: 140,
    height: 36,
  });

  // ── Live simulation ──
  useEffect(() => {
    const iv = setInterval(() => {
      setCandles((prev) => {
        const c = { ...prev };
        const lastIdx = c.closes.length - 1;
        const { price, move } = tickPrice(c.closes[lastIdx]!);

        // Update last candle
        const newCloses = [...c.closes];
        const newHighs = [...c.highs];
        const newLows = [...c.lows];
        const newVolumes = [...c.volumes];
        newCloses[lastIdx] = price;
        newHighs[lastIdx] = Math.max(c.highs[lastIdx]!, price);
        newLows[lastIdx] = Math.min(c.lows[lastIdx]!, price);
        newVolumes[lastIdx] = +(c.volumes[lastIdx]! + Math.random() * 0.5).toFixed(1);

        setLastPrice(price);
        setLastChange(+(price - c.opens[lastIdx]!).toFixed(2));
        setTickCount((t) => t + 1);

        return {
          labels: c.labels,
          opens: c.opens,
          highs: newHighs,
          lows: newLows,
          closes: newCloses,
          volumes: newVolumes,
        };
      });

      // Jiggle tickers
      setTickers((prev) =>
        prev.map((t) => {
          const m = t.price * 0.002 * (Math.random() - 0.48);
          const np = +(t.price + m).toFixed(2);
          const nc = +(t.change + m).toFixed(2);
          return {
            ...t,
            price: np,
            change: nc,
            pct: +((nc / (np - nc)) * 100).toFixed(2),
          };
        }),
      );
    }, 2000);

    return () => clearInterval(iv);
  }, []);

  // ── Derived KPIs ──
  const dayOpen = candles.opens[candles.opens.length - 1] ?? 0;
  const dayHigh = candles.highs[candles.highs.length - 1] ?? 0;
  const dayLow = candles.lows[candles.lows.length - 1] ?? 0;
  const dayVol = candles.volumes[candles.volumes.length - 1] ?? 0;
  const pricePct = dayOpen ? +((lastChange / dayOpen) * 100).toFixed(2) : 0;

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white pt-16 pb-24">
      {/* ── Ticker Tape ── */}
      <div className="relative overflow-hidden border-b border-white/[0.06] bg-[#08080d]">
        <div className="ticker-scroll flex gap-8 py-2.5 px-4 whitespace-nowrap">
          {[...tickers, ...tickers].map((t, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2 text-xs font-mono"
            >
              <span className="text-white/80 font-semibold">{t.sym}</span>
              <span className="text-white/60">
                ${t.price.toFixed(2)}
              </span>
              <span
                className={
                  t.change >= 0 ? "text-emerald-400" : "text-red-400"
                }
              >
                {t.change >= 0 ? "+" : ""}
                {t.change.toFixed(2)} ({t.pct >= 0 ? "+" : ""}
                {t.pct.toFixed(2)}%)
              </span>
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-6">
        {/* ── Header ── */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Link
                href="/examples"
                className="text-cyan-400 hover:text-cyan-300 text-xs font-mono transition-colors"
              >
                Examples
              </Link>
              <span className="text-white/20 text-xs">/</span>
              <span className="text-white/40 text-xs font-mono">
                Stock Trading Dashboard
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              AAPL{" "}
              <span className="text-white/40 font-normal text-lg">
                Apple Inc.
              </span>
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              LIVE
            </div>
            <span className="px-2.5 py-1 rounded text-[10px] font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              NASDAQ
            </span>
          </div>
        </div>

        {/* ── KPI Cards ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          {/* Price */}
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider">
                AAPL
              </span>
              <span
                className={`text-[10px] font-mono ${lastChange >= 0 ? "text-emerald-400" : "text-red-400"}`}
              >
                {lastChange >= 0 ? "+" : ""}
                {lastChange.toFixed(2)} ({pricePct >= 0 ? "+" : ""}
                {pricePct}%)
              </span>
            </div>
            <p className="text-xl font-bold text-white font-mono">
              ${lastPrice.toFixed(2)}
            </p>
            <div
              ref={priceSparkRef}
              className="mt-2 [&>svg]:w-full [&>svg]:h-auto opacity-60"
              style={{ height: 36 }}
            />
          </div>

          {/* Volume */}
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider">
                Volume
              </span>
              <span className="text-[10px] font-mono text-emerald-400">
                +18% avg
              </span>
            </div>
            <p className="text-xl font-bold text-white font-mono">
              {dayVol.toFixed(1)}M
            </p>
            <div
              ref={volSparkRef}
              className="mt-2 [&>svg]:w-full [&>svg]:h-auto opacity-60"
              style={{ height: 36 }}
            />
          </div>

          {/* Day Range */}
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider">
                Day Range
              </span>
              <span className="text-[10px] font-mono text-white/30">
                Spread: ${(dayHigh - dayLow).toFixed(2)}
              </span>
            </div>
            <p className="text-xl font-bold text-white font-mono">
              ${dayLow.toFixed(0)} - ${dayHigh.toFixed(0)}
            </p>
            {/* Range bar */}
            <div className="mt-3 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-red-400 via-yellow-400 to-emerald-400 transition-all duration-500"
                style={{
                  width: `${dayHigh - dayLow > 0 ? Math.min(100, ((lastPrice - dayLow) / (dayHigh - dayLow)) * 100) : 50}%`,
                }}
              />
            </div>
          </div>

          {/* Market Cap */}
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider">
                Market Cap
              </span>
              <span className="text-[10px] font-mono text-emerald-400">
                +1.2%
              </span>
            </div>
            <p className="text-xl font-bold text-white font-mono">
              ${((lastPrice * 15.5) / 1000).toFixed(2)}T
            </p>
            <p className="mt-2 text-[10px] font-mono text-white/30">
              15.5B shares outstanding
            </p>
          </div>
        </div>

        {/* ── Main Candlestick Chart ── */}
        <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] overflow-hidden mb-1">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06]">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-white/60">
                AAPL - Daily
              </span>
              <span className="text-[10px] font-mono text-white/30">|</span>
              <span className="text-[10px] font-mono text-white/30">
                Candlestick
              </span>
              <span className="text-[10px] font-mono text-white/20">
                Tick #{tickCount}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {["1D", "1W", "1M", "3M", "1Y"].map((tf) => (
                <span
                  key={tf}
                  className={`px-2 py-0.5 rounded text-[10px] font-mono cursor-pointer transition-colors ${
                    tf === "1M"
                      ? "bg-cyan-500/15 text-cyan-400 border border-cyan-500/20"
                      : "text-white/30 hover:text-white/50"
                  }`}
                >
                  {tf}
                </span>
              ))}
            </div>
          </div>
          <div
            ref={candleRef}
            className="w-full [&>svg]:w-full [&>svg]:h-auto p-4"
            style={{ minHeight: 380 }}
          />
        </div>

        {/* ── Volume Chart ── */}
        <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] overflow-hidden mb-4">
          <div className="flex items-center px-4 py-2 border-b border-white/[0.06]">
            <span className="text-xs font-mono text-white/60">Volume</span>
            <span className="ml-2 text-[10px] font-mono text-white/30">
              {dayVol.toFixed(1)}M shares
            </span>
          </div>
          <div
            ref={volumeRef}
            className="w-full [&>svg]:w-full [&>svg]:h-auto p-4"
            style={{ minHeight: 130 }}
          />
        </div>

        {/* ── Bottom Charts Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] overflow-hidden">
            <div className="flex items-center px-4 py-2.5 border-b border-white/[0.06]">
              <span className="text-xs font-mono text-white/60">
                Kagi Reversal
              </span>
            </div>
            <div
              ref={kagiRef}
              className="w-full [&>svg]:w-full [&>svg]:h-auto p-4"
              style={{ minHeight: 260 }}
            />
          </div>
          <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] overflow-hidden">
            <div className="flex items-center px-4 py-2.5 border-b border-white/[0.06]">
              <span className="text-xs font-mono text-white/60">
                Moving Averages
              </span>
              <span className="ml-2 text-[10px] font-mono text-emerald-400/60">
                SMA 10
              </span>
              <span className="ml-2 text-[10px] font-mono text-cyan-400/60">
                EMA 10
              </span>
            </div>
            <div
              ref={maRef}
              className="w-full [&>svg]:w-full [&>svg]:h-auto p-4"
              style={{ minHeight: 260 }}
            />
          </div>
        </div>

        {/* ── OHLC Data Table + Performance Metrics ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
          {/* OHLC Table */}
          <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] overflow-hidden">
            <div className="flex items-center px-4 py-2.5 border-b border-white/[0.06]">
              <span className="text-xs font-mono text-white/60">
                OHLC Data
              </span>
              <span className="ml-2 text-[10px] font-mono text-white/30">
                Last 10 sessions
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs font-mono">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    {["Date", "Open", "High", "Low", "Close", "Vol", "Chg"].map(
                      (h) => (
                        <th
                          key={h}
                          className="px-3 py-2 text-left text-white/30 font-normal"
                        >
                          {h}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody>
                  {candles.labels.slice(-10).map((label, i) => {
                    const idx = candles.labels.length - 10 + i;
                    const o = candles.opens[idx]!;
                    const h = candles.highs[idx]!;
                    const l = candles.lows[idx]!;
                    const c = candles.closes[idx]!;
                    const v = candles.volumes[idx]!;
                    const chg = c - o;
                    const up = chg >= 0;
                    return (
                      <tr
                        key={label}
                        className={`border-b border-white/[0.03] transition-colors ${
                          idx === candles.labels.length - 1
                            ? "bg-white/[0.03]"
                            : "hover:bg-white/[0.02]"
                        }`}
                      >
                        <td className="px-3 py-1.5 text-white/50">{label}</td>
                        <td className="px-3 py-1.5 text-white/70">
                          {o.toFixed(2)}
                        </td>
                        <td className="px-3 py-1.5 text-white/70">
                          {h.toFixed(2)}
                        </td>
                        <td className="px-3 py-1.5 text-white/70">
                          {l.toFixed(2)}
                        </td>
                        <td
                          className={`px-3 py-1.5 font-semibold ${up ? "text-emerald-400" : "text-red-400"}`}
                        >
                          {c.toFixed(2)}
                        </td>
                        <td className="px-3 py-1.5 text-white/50">
                          {v.toFixed(1)}M
                        </td>
                        <td
                          className={`px-3 py-1.5 ${up ? "text-emerald-400" : "text-red-400"}`}
                        >
                          {up ? "+" : ""}
                          {chg.toFixed(2)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] overflow-hidden">
            <div className="flex items-center px-4 py-2.5 border-b border-white/[0.06]">
              <span className="text-xs font-mono text-white/60">
                Key Metrics
              </span>
              <span className="ml-2 text-[10px] font-mono text-white/30">
                AAPL
              </span>
            </div>
            <div className="p-4 grid grid-cols-2 gap-x-6 gap-y-4">
              {METRICS.map((m) => (
                <div
                  key={m.label}
                  className="flex justify-between items-baseline"
                >
                  <span className="text-[11px] text-white/40">{m.label}</span>
                  <span className="text-sm font-mono text-white/80 font-medium">
                    {m.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Separator ── */}
        <div className="border-t border-white/[0.06] mb-8" />

        {/* ── Code Section ── */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-xl font-bold text-white">Build this dashboard</h2>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.04] text-white/40 border border-white/[0.06]">
              @chartts/core
            </span>
          </div>
          <p className="text-sm text-white/50 mb-6 max-w-2xl">
            This demo uses live-updating candlestick, volume, kagi, and line
            charts with crosshair, zoom/pan, and sparkline KPIs. Data updates
            every 2 seconds via simulated price ticks.
          </p>
          <CodeBlock code={CODE} lang="typescript" filename="trading-terminal.ts" />
        </div>

        {/* ── Back ── */}
        <div className="pt-6 border-t border-white/[0.06]">
          <Link
            href="/examples"
            className="text-cyan-400 hover:text-cyan-300 text-sm font-mono transition-colors"
          >
            &larr; All examples
          </Link>
        </div>
      </div>

      {/* ── Ticker tape CSS animation ── */}
      <style>{`
        @keyframes ticker-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ticker-scroll {
          animation: ticker-scroll 30s linear infinite;
        }
        .ticker-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
