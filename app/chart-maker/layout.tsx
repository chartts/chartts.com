import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Chart Maker | Create Charts Online",
  description:
    "Free chart maker online. Create bar charts, line charts, pie charts, scatter plots, area charts and donut charts. Paste your data, preview instantly, and download as SVG or PNG. No sign-up required. The best free graph maker and pie chart maker.",
  keywords: [
    "chart maker",
    "graph maker",
    "pie chart maker",
    "free chart maker online",
    "bar chart maker",
    "line chart maker",
    "scatter plot maker",
    "donut chart maker",
    "area chart maker",
    "create charts online",
  ],
};

export default function ChartMakerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
