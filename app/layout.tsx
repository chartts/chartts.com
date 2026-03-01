import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://chartts.com"),
  title: {
    default: "Chart.ts - Beautiful charts. Zero config. <15kb.",
    template: "%s | Chart.ts",
  },
  description:
    "The design-native charting library. SVG-first, under 15kb gzipped, Tailwind CSS native. Native packages for React, Vue, Svelte, Solid, Angular. 65+ chart types. TypeScript-first. WCAG accessible. MIT license, free forever.",
  keywords: [
    "chart library",
    "chart library javascript",
    "javascript chart library",
    "SVG charts",
    "React chart library",
    "React chart component",
    "Vue chart library",
    "Vue chart component",
    "Svelte charts",
    "Solid charts",
    "Angular chart library",
    "Tailwind CSS charts",
    "Tailwind chart component",
    "TypeScript chart library",
    "lightweight chart library",
    "small chart library",
    "fast chart library",
    "accessible charts",
    "WCAG charts",
    "candlestick chart",
    "data visualization",
    "data visualization library",
    "open source charts",
    "free chart library",
    "design-native charts",
    "charting library",
    "chart.ts",
    "chartts",
    "Chart.js alternative",
    "recharts alternative",
    "D3 alternative",
    "ECharts alternative",
    "Highcharts alternative",
    "svg chart library",
    "line chart",
    "bar chart",
    "pie chart",
    "scatter plot",
    "heatmap",
    "treemap",
    "sankey diagram",
    "gauge chart",
    "waterfall chart",
    "financial chart",
    "stock chart",
    "OHLC chart",
    "server side rendering charts",
    "SSR charts",
    "npm chart package",
  ],
  openGraph: {
    title: "Chart.ts - Beautiful charts. Zero config.",
    description:
      "SVG-first charting library. Under 15kb. Tailwind native. React, Vue, Svelte, Solid, Angular. 65+ chart types. MIT license.",
    url: "https://chartts.com",
    siteName: "Chart.ts",
    type: "website",
    images: [
      {
        url: "https://chartts.com/og.png",
        width: 1200,
        height: 630,
        alt: "Chart.ts - Beautiful charts. Tiny bundle. Every framework.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chart.ts - Beautiful charts. Zero config.",
    description:
      "The design-native charting library. Under 15kb, SVG-first, Tailwind native, WCAG accessible. Free forever.",
    images: ["https://chartts.com/og.png"],
  },
  alternates: {
    canonical: "https://chartts.com",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Chart.ts",
  alternateName: ["chartts", "@chartts/core", "@chartts/react", "@chartts/vue", "@chartts/svelte", "@chartts/solid", "@chartts/angular", "@chartts/gl", "@chartts/finance", "@chartts/websocket"],
  applicationCategory: "DeveloperApplication",
  applicationSubCategory: "Data Visualization Library",
  operatingSystem: "Any",
  url: "https://chartts.com",
  description:
    "Chart.ts is an enterprise-grade JavaScript charting library with 65+ chart types (52 core + 13 WebGL/3D), triple-renderer architecture (SVG/Canvas/WebGL), GPU-accelerated rendering for 100k+ data points, real-time streaming via WebSocket/SSE, financial indicators (SMA, EMA, RSI, MACD, Bollinger Bands), full plugin system, network/graph charts, geographic maps, sankey diagrams, treemaps, 3D surface/globe/scatter charts, zoom/pan/brush interactions, 100+ theme presets, WCAG AA accessibility, and native packages for React, Vue, Svelte, Solid, and Angular. Under 15kb gzipped. MIT licensed.",
  featureList: [
    "65+ chart types (52 core + 13 WebGL/3D)",
    "Triple renderer: SVG, Canvas (10k+ points), WebGL (100k+ points) with auto-switching",
    "GPU-accelerated WebGL rendering via @chartts/gl",
    "3D charts: Bar3D, Line3D, Scatter3D, Surface3D, Globe3D, Map3D",
    "Real-time streaming: createStreamingChart() with rolling buffers and pause/resume",
    "WebSocket, SSE, and HTTP polling adapters via @chartts/websocket",
    "Financial indicators: SMA, EMA, WMA, RSI, MACD, Bollinger Bands, ATR, VWAP, Sharpe ratio via @chartts/finance",
    "Full plugin system: defineChartType() for custom chart types with render context and hit testing",
    "Network/graph charts with force-directed, hierarchical, and circular layouts",
    "Geographic maps with 220 world regions, scatter overlay, and zoom",
    "Advanced charts: sankey, treemap, sunburst, chord, parallel coordinates, violin, voronoi",
    "Zoom, pan, brush selection, and crosshair interaction system",
    "100+ theme presets including Nord, Dracula, Catppuccin, Tokyo Night, Material, Solarized, Rose Pine, Gruvbox",
    "WCAG AA accessible: keyboard navigation, screen readers, ARIA labels, pattern fills",
    "Native packages for React, Vue, Svelte, Solid, Angular, and vanilla JS",
    "Under 15kb gzipped with full tree-shaking (ESM + CJS)",
    "Server-side rendering with @chartts/ssr (SVG, PNG, JPEG export)",
    "CLI tool: chartts render --type line --data data.csv -o chart.svg",
    "TypeScript-first with strict mode, zero any types, full inference",
    "25 npm packages: core, 5 frameworks, gl, finance, websocket, ssr, cli, regression, statistics, test-utils, themes, and more",
  ],
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  license: "https://opensource.org/licenses/MIT",
  codeRepository: "https://github.com/chartts/chartts",
  programmingLanguage: ["TypeScript", "JavaScript"],
  runtimePlatform: ["Node.js", "Bun", "Deno", "Browser"],
  author: {
    "@type": "Organization",
    name: "Chart.ts",
    url: "https://chartts.com",
  },
  hasPart: [
    { "@type": "SoftwareApplication", name: "@chartts/gl", description: "WebGL/3D chart types: Bar3D, Scatter3D, Surface3D, Globe3D, Map3D. GPU-accelerated rendering for 100k+ data points." },
    { "@type": "SoftwareApplication", name: "@chartts/finance", description: "Financial indicators: SMA, EMA, WMA, RSI, MACD, Bollinger Bands, ATR, VWAP, OBV, Sharpe ratio, drawdown analysis." },
    { "@type": "SoftwareApplication", name: "@chartts/websocket", description: "Real-time streaming adapters: WebSocket, Server-Sent Events, HTTP polling with auto-reconnect." },
    { "@type": "SoftwareApplication", name: "@chartts/ssr", description: "Server-side rendering: SVG string output, PNG/JPEG rasterization, file export." },
    { "@type": "SoftwareApplication", name: "@chartts/regression", description: "Regression analysis: linear, polynomial, exponential, logarithmic, power. Trend lines and forecasting." },
    { "@type": "SoftwareApplication", name: "@chartts/statistics", description: "Statistical functions: mean, median, mode, variance, percentile, quartiles, outliers, KDE, bootstrap." },
  ],
  keywords: "chart library, javascript chart library, react chart library, react chart component, vue chart library, svelte charts, angular chart library, solid charts, data visualization, data visualization library, svg chart library, typescript chart library, tailwind charts, WebGL charts, GPU accelerated charts, 3D charts javascript, real-time charts, streaming charts, financial chart library, trading chart library, candlestick chart, OHLC chart, network graph javascript, sankey diagram, treemap, geographic map charts, enterprise chart library, chart plugin system, custom chart types, chart.js alternative, echarts alternative, highcharts alternative, d3 alternative, recharts alternative, lightweight chart library, small chart library, fast chart library, npm chart package, server side rendering charts",
};

import { Nav } from "./components/nav";
import { Footer } from "./components/footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="48x48" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${outfit.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <Nav />
        <main className="bg-dots bg-mesh min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
