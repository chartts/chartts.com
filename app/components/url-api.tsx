import { renderChart } from "@/lib/charts";
import type { ChartData } from "@chartts/core";

export function UrlApi() {
  const exampleUrl =
    "https://i.chartts.com/line/4,8,2,12,6,14,9?title=Revenue&color=cyan";

  const data: ChartData = {
    labels: ["1", "2", "3", "4", "5", "6", "7"],
    series: [{ name: "Revenue", values: [4, 8, 2, 12, 6, 14, 9] }],
  };

  const svg = renderChart("line", {
    width: 500,
    height: 200,
    theme: "dark",
    data,
  });

  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="section-label text-cyan-400 mb-4">Chart API</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight heading">
            Charts from a URL.
          </h2>
          <p className="mt-4 text-lg body-text max-w-2xl mx-auto">
            Embed beautiful charts in emails, Slack, markdown, Notion - anywhere
            images work. No JavaScript required.
          </p>
        </div>

        <div className="window-frame glow-sm">
          <div className="window-titlebar">
            <div className="window-dot bg-[#ff5f57]" />
            <div className="window-dot bg-[#febc2e]" />
            <div className="window-dot bg-[#28c840]" />
            <span className="ml-3 text-xs text-zinc-500 font-mono">
              i.chartts.com
            </span>
          </div>

          <div className="p-6 sm:p-8">
            {/* URL bar */}
            <div className="flex items-center gap-3 px-4 py-2.5 rounded-lg card mb-8">
              <svg className="w-4 h-4 faint-text shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M10.172 13.828a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.102 1.101" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <code className="text-xs sm:text-sm font-mono body-text truncate">
                {exampleUrl}
              </code>
            </div>

            {/* Resulting chart */}
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

        <div className="mt-8 text-center">
          <p className="text-sm muted-text">
            Works with any LLM, email client, or markdown renderer.{" "}
            <span className="heading">Any tool that can display an image can display a chart.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
