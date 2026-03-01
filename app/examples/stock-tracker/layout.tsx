import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stock Trading Dashboard | Chart.ts Examples",
  description:
    "Live trading terminal built with Chart.ts. Simulated candlestick, volume, kagi, moving averages with real-time price updates.",
};

export default function StockTrackerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
