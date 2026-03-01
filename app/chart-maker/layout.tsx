import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Chart Maker | 55+ Chart Types, 100+ Themes | Create Charts Online",
  description:
    "Free chart maker online. 55+ chart types: bar, line, pie, scatter, candlestick, sankey, treemap, heatmap, radar, and more. 100+ themes. Paste data or import CSV, preview instantly, download as SVG or PNG. Shareable image URLs via i.chartts.com. No sign-up, no watermarks.",
  keywords: [
    "chart maker",
    "graph maker",
    "pie chart maker",
    "free chart maker online",
    "bar chart maker",
    "line chart maker",
    "scatter plot maker",
    "candlestick chart maker",
    "heatmap maker",
    "sankey diagram maker",
    "create charts online",
    "chart image url",
    "svg chart generator",
    "png chart generator",
  ],
};

export default function ChartMakerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
