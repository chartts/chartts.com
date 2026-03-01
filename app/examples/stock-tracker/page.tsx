import type { Metadata } from "next";
import Link from "next/link";
import { renderChart } from "@/lib/charts";
import { InteractiveChart } from "@/app/demos/interactive-chart";
import { CodeBlock } from "@/lib/highlight";
import type { ChartData } from "@chartts/core/all";

export const metadata: Metadata = {
  title: "Stock Trading Dashboard | Chart.ts Examples",
  description:
    "Full trading terminal built with Chart.ts. Candlestick, volume, kagi, moving averages, KPI sparklines, and OHLC data table.",
};

/* ── Ticker data ── */
const tickers = [
  { sym: "AAPL", price: "194.20", change: "+2.40", pct: "+1.25%", up: true },
  { sym: "MSFT", price: "412.50", change: "+4.62", pct: "+1.13%", up: true },
  { sym: "GOOGL", price: "174.80", change: "-1.24", pct: "-0.70%", up: false },
  { sym: "AMZN", price: "186.40", change: "+3.18", pct: "+1.74%", up: true },
  { sym: "NVDA", price: "878.40", change: "+12.60", pct: "+1.46%", up: true },
  { sym: "META", price: "502.30", change: "-2.10", pct: "-0.42%", up: false },
  { sym: "TSLA", price: "248.60", change: "+5.80", pct: "+2.39%", up: true },
  { sym: "JPM", price: "198.20", change: "+1.40", pct: "+0.71%", up: true },
  { sym: "V", price: "282.10", change: "-0.90", pct: "-0.32%", up: false },
  { sym: "BRK.B", price: "412.80", change: "+2.20", pct: "+0.54%", up: true },
];

/* ── KPI data ── */
const kpis = [
  { label: "AAPL", value: "$194.20", change: "+2.40 (+1.25%)", up: true, spark: [185, 188, 186, 190, 189, 194, 192, 193, 191, 195, 193, 194] },
  { label: "Volume", value: "52.1M", change: "+18% avg", up: true, spark: [32, 41, 38, 52, 48, 52, 45, 58, 41, 53, 48, 52] },
  { label: "Day Range", value: "$187 - $196", sub: "Spread: $9.00" },
  { label: "Market Cap", value: "$3.01T", change: "+1.2%", up: true },
];

/* ── Chart data ── */
const candleLabels = ["Jan 2", "Jan 3", "Jan 4", "Jan 5", "Jan 8", "Jan 9", "Jan 10", "Jan 11", "Jan 12", "Jan 15", "Jan 16", "Jan 17", "Jan 18", "Jan 19", "Jan 22", "Jan 23", "Jan 24", "Jan 25", "Jan 26", "Jan 29"];
const opens =  [185.2, 188.1, 186.4, 190.2, 189.0, 194.2, 192.8, 193.5, 191.0, 195.2, 193.8, 196.0, 194.5, 197.2, 195.8, 198.5, 196.2, 199.8, 201.0, 198.5];
const highs =  [190.5, 192.0, 191.8, 195.0, 196.2, 197.5, 195.8, 196.2, 195.5, 198.0, 197.5, 199.0, 198.8, 200.5, 199.2, 201.8, 200.5, 203.0, 204.2, 202.5];
const lows =   [183.5, 185.2, 184.8, 188.5, 187.2, 192.0, 190.5, 191.8, 189.2, 193.5, 191.8, 194.2, 192.5, 195.5, 194.0, 196.8, 194.5, 198.2, 199.5, 196.0];
const closes = [188.1, 186.4, 190.2, 189.0, 194.2, 192.8, 193.5, 191.0, 195.2, 193.8, 196.0, 194.5, 197.2, 195.8, 198.5, 196.2, 199.8, 201.0, 198.5, 201.2];
const volumes = [48.2, 52.1, 39.8, 55.1, 42.6, 61.2, 38.9, 45.2, 58.4, 41.5, 53.2, 47.8, 62.1, 44.5, 51.8, 39.2, 56.4, 48.9, 67.2, 52.1];

const candleData: ChartData = {
  labels: candleLabels,
  series: [
    { name: "Open", values: opens },
    { name: "High", values: highs },
    { name: "Low", values: lows },
    { name: "Close", values: closes },
  ],
};

const volumeData: ChartData = {
  labels: candleLabels,
  series: [{ name: "Volume", values: volumes }],
};

const kagiData: ChartData = {
  labels: candleLabels.slice(0, 12),
  series: [{ name: "Price", values: closes.slice(0, 12) }],
};

const maData: ChartData = {
  labels: ["Jan 2", "Jan 5", "Jan 8", "Jan 11", "Jan 15", "Jan 18", "Jan 22", "Jan 25", "Jan 29"],
  series: [
    { name: "Price", values: [188, 189, 194, 191, 193, 197, 198, 201, 201] },
    { name: "SMA 20", values: [186, 187, 189, 190, 192, 194, 196, 197, 199] },
    { name: "EMA 10", values: [187, 188, 191, 191, 193, 195, 197, 199, 200] },
  ],
};

/* ── Performance metrics ── */
const metrics = [
  { label: "52-Week High", value: "$204.20" },
  { label: "52-Week Low", value: "$142.80" },
  { label: "P/E Ratio", value: "31.2x" },
  { label: "EPS (TTM)", value: "$6.23" },
  { label: "Div Yield", value: "0.52%" },
  { label: "Beta", value: "1.24" },
  { label: "Avg Volume", value: "44.2M" },
  { label: "Shares Out", value: "15.5B" },
];

/* ── Code example ── */
const code = `import { CandlestickChart, VolumeChart, LineChart, KagiChart, Sparkline } from "@chartts/react"

export function TradingDashboard({ ticker }: { ticker: string }) {
  const { candles, volume, kagi, sma } = useMarketData(ticker)

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Ticker tape */}
      <TickerTape tickers={watchlist} />

      {/* KPI row */}
      <div className="grid grid-cols-4 gap-3 p-4">
        <KPI label="AAPL" value="$194.20" change="+2.40 (+1.25%)" up>
          <Sparkline data={priceTrend} className="h-8" />
        </KPI>
        <KPI label="Volume" value="52.1M" change="+18% avg" up>
          <Sparkline data={volumeTrend} className="h-8" />
        </KPI>
        <KPI label="Day Range" value="$187 - $196" />
        <KPI label="Market Cap" value="$3.01T" change="+1.2%" up />
      </div>

      {/* Main candlestick chart */}
      <CandlestickChart
        data={candles}
        crosshair={{ mode: "both" }}
        zoom pan
        tooltip={{ enabled: true }}
        className="h-[400px] px-4"
      />

      {/* Volume */}
      <VolumeChart
        data={volume}
        className="h-[120px] px-4"
      />

      {/* Bottom grid */}
      <div className="grid grid-cols-2 gap-4 p-4">
        <KagiChart data={kagi} className="h-64" />
        <LineChart
          data={sma}
          crosshair={{ mode: "vertical" }}
          className="h-64"
        />
      </div>
    </div>
  )
}`;

/* ── Helpers ── */
function renderSparkline(data: number[]): string | null {
  return renderChart("sparkline", {
    width: 140,
    height: 36,
    theme: "dark",
    data: { labels: data.map((_, i) => String(i)), series: [{ name: "s", values: data }] },
  });
}

/* ═══════════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════════ */

export default async function StockTrackerPage() {
  // Pre-render charts as SVG
  const candleSvg = renderChart("candlestick", { width: 1100, height: 400, theme: "dark", data: candleData });
  const volumeSvg = renderChart("volume", { width: 1100, height: 140, theme: "dark", data: volumeData });
  const kagiSvg = renderChart("kagi", { width: 520, height: 280, theme: "dark", data: kagiData });
  const maSvg = renderChart("line", { width: 520, height: 280, theme: "dark", data: maData });

  return (
    <div className="pt-16 pb-24">
      {/* ── Ticker Tape ── */}
      <div className="relative overflow-hidden border-b border-white/[0.06] bg-[#08080d]">
        <div className="ticker-scroll flex gap-8 py-2.5 px-4 whitespace-nowrap">
          {[...tickers, ...tickers].map((t, i) => (
            <span key={i} className="inline-flex items-center gap-2 text-xs font-mono">
              <span className="text-white/80 font-semibold">{t.sym}</span>
              <span className="text-white/60">${t.price}</span>
              <span className={t.up ? "text-emerald-400" : "text-red-400"}>
                {t.change} ({t.pct})
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
              <Link href="/examples" className="text-cyan-400 hover:text-cyan-300 text-xs font-mono transition-colors">
                Examples
              </Link>
              <span className="text-white/20 text-xs">/</span>
              <span className="text-white/40 text-xs font-mono">Stock Trading Dashboard</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              AAPL <span className="text-white/40 font-normal text-lg">Apple Inc.</span>
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded text-[10px] font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              Finance
            </span>
            <span className="px-2.5 py-1 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              NASDAQ
            </span>
          </div>
        </div>

        {/* ── KPI Cards ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          {kpis.map((kpi) => {
            const sparkSvg = kpi.spark ? renderSparkline(kpi.spark) : null;
            return (
              <div key={kpi.label} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider">{kpi.label}</span>
                  {kpi.change && (
                    <span className={`text-[10px] font-mono ${kpi.up ? "text-emerald-400" : "text-red-400"}`}>
                      {kpi.change}
                    </span>
                  )}
                  {kpi.sub && (
                    <span className="text-[10px] font-mono text-white/30">{kpi.sub}</span>
                  )}
                </div>
                <p className="text-xl font-bold text-white font-mono">{kpi.value}</p>
                {sparkSvg && (
                  <div className="mt-2 [&>svg]:w-full [&>svg]:h-auto opacity-60" dangerouslySetInnerHTML={{ __html: sparkSvg }} />
                )}
              </div>
            );
          })}
        </div>

        {/* ── Main Candlestick Chart ── */}
        <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] overflow-hidden mb-1">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06]">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-white/60">AAPL - Daily</span>
              <span className="text-[10px] font-mono text-white/30">|</span>
              <span className="text-[10px] font-mono text-white/30">Candlestick</span>
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
          <div className="p-4">
            <InteractiveChart type="candlestick" initialSvg={candleSvg} />
          </div>
        </div>

        {/* ── Volume Chart ── */}
        <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] overflow-hidden mb-4">
          <div className="flex items-center px-4 py-2 border-b border-white/[0.06]">
            <span className="text-xs font-mono text-white/60">Volume</span>
            <span className="ml-2 text-[10px] font-mono text-white/30">52.1M shares</span>
          </div>
          <div className="p-4">
            <InteractiveChart type="volume" initialSvg={volumeSvg} />
          </div>
        </div>

        {/* ── Bottom Charts Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] overflow-hidden">
            <div className="flex items-center px-4 py-2.5 border-b border-white/[0.06]">
              <span className="text-xs font-mono text-white/60">Kagi Reversal</span>
            </div>
            <div className="p-4">
              <InteractiveChart type="kagi" initialSvg={kagiSvg} />
            </div>
          </div>
          <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] overflow-hidden">
            <div className="flex items-center px-4 py-2.5 border-b border-white/[0.06]">
              <span className="text-xs font-mono text-white/60">Moving Averages</span>
              <span className="ml-2 text-[10px] font-mono text-emerald-400/60">SMA 20</span>
              <span className="ml-2 text-[10px] font-mono text-cyan-400/60">EMA 10</span>
            </div>
            <div className="p-4">
              <InteractiveChart type="line" initialSvg={maSvg} />
            </div>
          </div>
        </div>

        {/* ── OHLC Data Table + Performance Metrics ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
          {/* OHLC Table */}
          <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] overflow-hidden">
            <div className="flex items-center px-4 py-2.5 border-b border-white/[0.06]">
              <span className="text-xs font-mono text-white/60">OHLC Data</span>
              <span className="ml-2 text-[10px] font-mono text-white/30">Last 10 sessions</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs font-mono">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    {["Date", "Open", "High", "Low", "Close", "Vol (M)", "Chg"].map((h) => (
                      <th key={h} className="px-3 py-2 text-left text-white/30 font-normal">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {candleLabels.slice(-10).map((label, i) => {
                    const idx = candleLabels.length - 10 + i;
                    const o = opens[idx]!;
                    const h = highs[idx]!;
                    const l = lows[idx]!;
                    const c = closes[idx]!;
                    const v = volumes[idx]!;
                    const chg = c - o;
                    const up = chg >= 0;
                    return (
                      <tr key={label} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                        <td className="px-3 py-1.5 text-white/50">{label}</td>
                        <td className="px-3 py-1.5 text-white/70">{o.toFixed(2)}</td>
                        <td className="px-3 py-1.5 text-white/70">{h.toFixed(2)}</td>
                        <td className="px-3 py-1.5 text-white/70">{l.toFixed(2)}</td>
                        <td className={`px-3 py-1.5 font-semibold ${up ? "text-emerald-400" : "text-red-400"}`}>
                          {c.toFixed(2)}
                        </td>
                        <td className="px-3 py-1.5 text-white/50">{v.toFixed(1)}</td>
                        <td className={`px-3 py-1.5 ${up ? "text-emerald-400" : "text-red-400"}`}>
                          {up ? "+" : ""}{chg.toFixed(2)}
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
              <span className="text-xs font-mono text-white/60">Key Metrics</span>
              <span className="ml-2 text-[10px] font-mono text-white/30">AAPL</span>
            </div>
            <div className="p-4 grid grid-cols-2 gap-x-6 gap-y-4">
              {metrics.map((m) => (
                <div key={m.label} className="flex justify-between items-baseline">
                  <span className="text-[11px] text-white/40">{m.label}</span>
                  <span className="text-sm font-mono text-white/80 font-medium">{m.value}</span>
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
              @chartts/react
            </span>
          </div>
          <p className="text-sm text-white/50 mb-6 max-w-2xl">
            This dashboard uses candlestick, volume, kagi, and line charts with crosshair sync,
            zoom/pan, and sparkline KPIs. All charts server-render as SVG and upgrade to
            interactive on the client.
          </p>
          <CodeBlock code={code} lang="tsx" filename="trading-dashboard.tsx" />
        </div>

        {/* ── Back ── */}
        <div className="pt-6 border-t border-white/[0.06]">
          <Link href="/examples" className="text-cyan-400 hover:text-cyan-300 text-sm font-mono transition-colors">
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
