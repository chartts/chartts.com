import { renderChart } from "@/lib/charts";
import type { ChartData } from "@chartts/core";

export function HeroChart() {
  const data: ChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    series: [
      { name: "Revenue", values: [4200, 5800, 7100, 6400, 8200, 9600, 11200, 14800, 18200, 24600, 36400, 48200] },
    ],
  };

  const svg = renderChart("line", {
    width: 720,
    height: 300,
    theme: "dark",
    data,
  });

  return (
    <div className="relative">
      {/* Chart label */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm muted-text font-mono">Monthly Revenue</p>
          <p className="text-2xl font-bold heading mt-1">
            $48,200
            <span className="text-sm font-normal text-emerald-400 ml-2">
              +24.3%
            </span>
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs muted-text">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
            Revenue
          </span>
        </div>
      </div>

      {svg ? (
        <div
          className="w-full [&>svg]:w-full [&>svg]:h-auto"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      ) : (
        <div className="w-full h-48 flex items-center justify-center muted-text text-sm">
          Chart preview
        </div>
      )}
    </div>
  );
}
