import { renderChart, sampleData } from "@/lib/charts";

interface ChartPreviewProps {
  type: string;
  width?: number;
  height?: number;
  className?: string;
}

export function ChartPreview({
  type,
  width = 240,
  height = 120,
  className = "",
}: ChartPreviewProps) {
  const svg = renderChart(type, {
    width,
    height,
    theme: "dark",
    data: sampleData[type],
  });

  if (!svg) return null;

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
