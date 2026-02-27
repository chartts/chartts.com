import Link from "next/link";
const sidebar = [
  {
    title: "Getting Started",
    links: [
      { label: "Introduction", href: "/docs" },
      { label: "Installation", href: "/docs#installation" },
      { label: "Quick Start", href: "/docs#quick-start" },
    ],
  },
  {
    title: "Core Concepts",
    links: [
      { label: "SVG Rendering", href: "/docs/svg" },
      { label: "Multi-Renderer", href: "/docs/renderers" },
      { label: "Tailwind CSS", href: "/docs/tailwind" },
      { label: "Themes", href: "/docs/themes" },
      { label: "TypeScript", href: "/docs/typescript" },
      { label: "Accessibility", href: "/docs/accessibility" },
      { label: "Performance", href: "/docs/performance" },
    ],
  },
  {
    title: "Chart Types",
    links: [
      { label: "Line", href: "/docs/charts/line" },
      { label: "Bar", href: "/docs/charts/bar" },
      { label: "Stacked Bar", href: "/docs/charts/stacked-bar" },
      { label: "Horizontal Bar", href: "/docs/charts/horizontal-bar" },
      { label: "Area", href: "/docs/charts/area" },
      { label: "Pie", href: "/docs/charts/pie" },
      { label: "Donut", href: "/docs/charts/donut" },
      { label: "Scatter", href: "/docs/charts/scatter" },
      { label: "Bubble", href: "/docs/charts/bubble" },
      { label: "Radar", href: "/docs/charts/radar" },
      { label: "Candlestick", href: "/docs/charts/candlestick" },
      { label: "Waterfall", href: "/docs/charts/waterfall" },
      { label: "Funnel", href: "/docs/charts/funnel" },
      { label: "Gauge", href: "/docs/charts/gauge" },
      { label: "Sparkline", href: "/docs/charts/sparkline" },
      { label: "Heatmap", href: "/docs/charts/heatmap" },
      { label: "Box Plot", href: "/docs/charts/boxplot" },
      { label: "Histogram", href: "/docs/charts/histogram" },
      { label: "Treemap", href: "/docs/charts/treemap" },
      { label: "Polar", href: "/docs/charts/polar" },
      { label: "Radial Bar", href: "/docs/charts/radial-bar" },
      { label: "Lollipop", href: "/docs/charts/lollipop" },
      { label: "Bullet", href: "/docs/charts/bullet" },
      { label: "Dumbbell", href: "/docs/charts/dumbbell" },
      { label: "Calendar", href: "/docs/charts/calendar" },
      { label: "Combo", href: "/docs/charts/combo" },
      { label: "Sankey", href: "/docs/charts/sankey" },
      { label: "Sunburst", href: "/docs/charts/sunburst" },
      { label: "Tree", href: "/docs/charts/tree" },
      { label: "Graph", href: "/docs/charts/graph" },
      { label: "Chord", href: "/docs/charts/chord" },
      { label: "Parallel Coords", href: "/docs/charts/parallel" },
      { label: "Theme River", href: "/docs/charts/themeriver" },
      { label: "Pictorial Bar", href: "/docs/charts/pictorialbar" },
      { label: "Geo / Map", href: "/docs/charts/geo" },
      { label: "Lines (Multi)", href: "/docs/charts/lines" },
      { label: "Matrix", href: "/docs/charts/matrix" },
      { label: "OHLC", href: "/docs/charts/ohlc" },
      { label: "Step", href: "/docs/charts/step" },
      { label: "Volume", href: "/docs/charts/volume" },
      { label: "Range", href: "/docs/charts/range" },
      { label: "Baseline", href: "/docs/charts/baseline" },
      { label: "Kagi", href: "/docs/charts/kagi" },
      { label: "Renko", href: "/docs/charts/renko" },
      { label: "Violin Plot", href: "/docs/charts/violin" },
      { label: "Circle Packing", href: "/docs/charts/pack" },
      { label: "Voronoi", href: "/docs/charts/voronoi" },
      { label: "Word Cloud", href: "/docs/charts/wordcloud" },
    ],
  },
  {
    title: "3D / WebGL",
    links: [
      { label: "Scatter 3D", href: "/docs/charts/scatter3d" },
      { label: "Bar 3D", href: "/docs/charts/bar3d" },
      { label: "Surface 3D", href: "/docs/charts/surface3d" },
      { label: "Globe 3D", href: "/docs/charts/globe3d" },
      { label: "Map 3D", href: "/docs/charts/map3d" },
      { label: "Lines 3D", href: "/docs/charts/lines3d" },
      { label: "Line 3D", href: "/docs/charts/line3d" },
      { label: "Torus 3D", href: "/docs/charts/torus3d" },
      { label: "Scatter GL", href: "/docs/charts/scatter-gl" },
      { label: "Lines GL", href: "/docs/charts/lines-gl" },
      { label: "Flow GL", href: "/docs/charts/flow-gl" },
      { label: "Graph GL", href: "/docs/charts/graph-gl" },
    ],
  },
  {
    title: "Frameworks",
    links: [
      { label: "React", href: "/docs/react" },
      { label: "Vue", href: "/docs/vue" },
      { label: "Svelte", href: "/docs/svelte" },
      { label: "Solid", href: "/docs/solid" },
      { label: "Angular", href: "/docs/angular" },
      { label: "Vanilla JS", href: "/docs/vanilla" },
      { label: "CDN Usage", href: "/docs/cdn" },
    ],
  },
  {
    title: "Reference",
    links: [
      { label: "API Reference", href: "/docs/api" },
      { label: "All Charts", href: "/docs/charts" },
      { label: "Framework Support", href: "/docs/frameworks" },
    ],
  },
];

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
<div className="max-w-[90rem] mx-auto pt-16">
        <div className="flex">
          {/* Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0 border-r adaptive-border sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto py-8 px-6">
            <nav className="space-y-8">
              {sidebar.map((section) => (
                <div key={section.title}>
                  <p className="text-xs font-mono muted-text uppercase tracking-wider mb-3">
                    {section.title}
                  </p>
                  <ul className="space-y-1">
                    {section.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="block text-sm body-text hover:text-cyan-400 transition-colors py-1 cursor-pointer"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0 px-6 sm:px-8 lg:px-16 py-12">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
