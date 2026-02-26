import { CodeBlock } from "@/lib/highlight";
import { renderChart } from "@/lib/charts";
import type { ChartData } from "@chartts/core";

export async function CodeExample() {
  const data: ChartData = {
    labels: ["1", "2", "3", "4", "5", "6", "7"],
    series: [{ name: "Data", values: [4, 8, 2, 12, 6, 14, 9] }],
  };

  const svg = renderChart("line", {
    width: 400,
    height: 200,
    theme: "dark",
    data,
  });

  return (
    <section id="examples" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="section-label text-cyan-400 mb-4">Get started</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight heading">
            Five lines of code.
            <br />
            <span className="faint-text">That&apos;s it.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto items-stretch">
          {/* Code side */}
          <div className="flex flex-col">
            <CodeBlock
              filename="app.tsx"
              lang="tsx"
              code={`import { LineChart } from '@chartts/react'

const data = [4, 8, 2, 12, 6, 14, 9]

<LineChart
  data={data}
  className="h-64 text-cyan-500"
  smooth
/>`}
            />
          </div>

          {/* Chart side */}
          <div className="window-frame glow-sm flex flex-col">
            <div className="window-titlebar">
              <div className="window-dot bg-[#ff5f57]" />
              <div className="window-dot bg-[#febc2e]" />
              <div className="window-dot bg-[#28c840]" />
              <span className="ml-3 text-xs muted-text font-mono">
                Preview
              </span>
            </div>
            <div className="p-6 sm:p-8 flex-1 flex items-center">
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
          </div>
        </div>
      </div>
    </section>
  );
}
