import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { getAllDocSlugs } from "@/lib/docs";

export const dynamic = "force-static";

const BASE = "https://chartts.com";

// Hardcoded doc slugs (defined in app/docs/[slug]/page.tsx)
const hardcodedDocSlugs = [
  "performance",
  "svg",
  "renderers",
  "tailwind",
  "themes",
  "typescript",
  "accessibility",
  "frameworks",
  "api",
  "react",
  "vue",
  "svelte",
  "solid",
  "angular",
  "vanilla",
  "cdn",
  "remix",
  "astro",
  "nuxt",
  "sveltekit",
  "streaming",
  "zoom-pan",
  "brush",
  "export",
  "data-adapters",
  "plugins",
  "linked-charts",
  "decimation",
  "annotations",
  "richtext",
  "theme-creation",
  "datazoom",
  "debug",
  "ssr",
  "finance-pkg",
  "annotation-plugin",
  "datalabels",
  "regression",
  "statistics-pkg",
  "test-utils",
  "cli",
  "date-fns-adapter",
  "dayjs-adapter",
  "websocket",
];

const chartSlugs = [
  "line",
  "bar",
  "stacked-bar",
  "horizontal-bar",
  "area",
  "pie",
  "donut",
  "scatter",
  "bubble",
  "radar",
  "candlestick",
  "waterfall",
  "funnel",
  "gauge",
  "sparkline",
  "heatmap",
  "boxplot",
  "histogram",
  "treemap",
  "polar",
  "radial-bar",
  "lollipop",
  "bullet",
  "dumbbell",
  "calendar",
  "combo",
  "sankey",
  "sunburst",
  "tree",
  "graph",
  "parallel",
  "themeriver",
  "pictorialbar",
  "chord",
  "geo",
  "lines",
  "matrix",
  "ohlc",
  "step",
  "volume",
  "range",
  "baseline",
  "kagi",
  "renko",
  "violin",
  "pack",
  "voronoi",
  "wordcloud",
  "scatter3d",
  "bar3d",
  "surface3d",
  "globe3d",
  "map3d",
  "lines3d",
  "line3d",
  "torus3d",
  "scatter-gl",
  "lines-gl",
  "flow-gl",
  "graph-gl",
];

const exampleSlugs = [
  "sales-dashboard",
  "stock-tracker",
  "analytics",
  "conversion-funnel",
  "financial-waterfall",
  "team-performance",
  "realtime-monitor",
  "dark-mode",
  "responsive",
  "scatter-regression",
  "multi-series",
  "kpi-cards",
];

const compareSlugs = [
  "chartjs",
  "recharts",
  "d3",
  "echarts",
  "apexcharts",
  "nivo",
  "visx",
  "highcharts",
  "plotly",
  "victory",
  "tremor",
  "tradingview",
  "shadcn-charts",
  "google-charts",
];

const seoLandingSlugs = [
  "react-line-chart",
  "react-bar-chart",
  "react-pie-chart",
  "vue-chart-library",
  "svelte-chart-library",
  "tailwind-charts",
  "lightweight-chart-library",
  "accessible-charts",
  "nextjs-charts",
  "typescript-chart-library",
  "candlestick-chart",
  "pie-chart",
  "bar-chart",
  "line-chart",
  "waterfall-chart",
  "gantt-chart",
  "org-chart",
  "flow-chart",
  "pareto-chart",
  "graph-maker",
  "gold-price-chart",
  "bitcoin-chart",
  "ai-chart",
  "data-visualization",
  // React chart type landings
  "react-area-chart",
  "react-scatter-plot",
  "react-radar-chart",
  "react-heatmap",
  "react-treemap",
  "react-gauge-chart",
  "react-funnel-chart",
  "react-waterfall-chart",
  "react-candlestick-chart",
  "react-donut-chart",
  "react-bubble-chart",
  "react-sparkline",
  "react-sankey-diagram",
  "react-boxplot",
  // Framework landings
  "angular-chart-library",
  "solid-js-charts",
  "remix-charts",
  "astro-charts",
  "nuxt-chart-library",
  "sveltekit-charts",
  "qwik-charts",
  // Feature landings
  "svg-chart-library",
  "ssr-charts-nextjs",
  "lightweight-react-charts",
  "accessible-chart-library",
  "dark-mode-charts",
  "real-time-charts-react",
  "chart-library-typescript",
  "react-dashboard-charts",
  "react-financial-charts",
  "open-source-charts",
  "free-chart-library",
  // Generic chart type landings
  "sankey-diagram",
  "treemap-chart",
  "radar-chart",
  "heatmap-chart",
  "gauge-chart",
  "funnel-chart",
  "bubble-chart",
  "scatter-plot",
  "donut-chart",
  "stock-chart",
  "area-chart",
  "histogram-chart",
  "boxplot-chart",
  "dashboard-components",
  // Advanced capability landings
  "webgl-charts",
  "3d-charts-javascript",
  "real-time-charts",
  "financial-chart-library",
  "network-graph-javascript",
  "sankey-diagram-javascript",
  "enterprise-chart-library",
  "chart-plugin-system",
  "react-3d-charts",
  "react-real-time-charts",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  // Static top-level pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, changeFrequency: "weekly", priority: 1.0, lastModified: now },
    { url: `${BASE}/docs`, changeFrequency: "weekly", priority: 0.9, lastModified: now },
    { url: `${BASE}/demos`, changeFrequency: "weekly", priority: 0.9, lastModified: now },
    { url: `${BASE}/examples`, changeFrequency: "weekly", priority: 0.9, lastModified: now },
    { url: `${BASE}/blog`, changeFrequency: "weekly", priority: 0.8, lastModified: now },
    { url: `${BASE}/docs/charts`, changeFrequency: "weekly", priority: 0.8, lastModified: now },
    { url: `${BASE}/pricing`, changeFrequency: "monthly", priority: 0.7, lastModified: now },
    { url: `${BASE}/changelog`, changeFrequency: "weekly", priority: 0.7, lastModified: now },
    { url: `${BASE}/compare`, changeFrequency: "monthly", priority: 0.8, lastModified: now },
    { url: `${BASE}/chart-maker`, changeFrequency: "weekly", priority: 0.9, lastModified: now },
    { url: `${BASE}/capabilities`, changeFrequency: "monthly", priority: 0.9, lastModified: now },
    { url: `${BASE}/benchmarks`, changeFrequency: "monthly", priority: 0.8, lastModified: now },
  ];

  // Doc pages (hardcoded + MDX)
  const mdxDocSlugs = getAllDocSlugs();
  const allDocSlugs = [...new Set([...hardcodedDocSlugs, ...mdxDocSlugs])];
  const docPages: MetadataRoute.Sitemap = allDocSlugs.map((slug) => ({
    url: `${BASE}/docs/${slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
    lastModified: now,
  }));

  // Chart doc pages
  const chartPages: MetadataRoute.Sitemap = chartSlugs.map((slug) => ({
    url: `${BASE}/docs/charts/${slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
    lastModified: now,
  }));

  // Example pages
  const examplePages: MetadataRoute.Sitemap = exampleSlugs.map((slug) => ({
    url: `${BASE}/examples/${slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
    lastModified: now,
  }));

  // Blog posts
  const posts = getAllPosts();
  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE}/blog/${post.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
    lastModified: post.date || now,
  }));

  // Comparison pages
  const comparePages: MetadataRoute.Sitemap = compareSlugs.map((slug) => ({
    url: `${BASE}/compare/${slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: now,
  }));

  // SEO landing pages
  const seoPages: MetadataRoute.Sitemap = seoLandingSlugs.map((slug) => ({
    url: `${BASE}/charts/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
    lastModified: now,
  }));

  // Migration guides
  const migrateSlugs = [
    "from-chartjs",
    "from-recharts",
    "from-d3",
    "from-echarts",
    "from-highcharts",
    "from-apexcharts",
  ];
  const migratePages: MetadataRoute.Sitemap = [
    { url: `${BASE}/migrate`, changeFrequency: "monthly", priority: 0.8, lastModified: now },
    ...migrateSlugs.map((slug) => ({
      url: `${BASE}/migrate/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      lastModified: now,
    })),
  ];

  // Use case pages
  const useCaseSlugs = [
    "saas-dashboard",
    "financial-analytics",
    "admin-panel",
    "iot-monitoring",
    "ecommerce",
    "healthcare",
    "startup-mvp",
    "trading-platform",
    "scientific-research",
    "network-monitoring",
    "supply-chain",
    "operations-center",
  ];
  const useCasePages: MetadataRoute.Sitemap = [
    { url: `${BASE}/use-cases`, changeFrequency: "monthly", priority: 0.8, lastModified: now },
    ...useCaseSlugs.map((slug) => ({
      url: `${BASE}/use-cases/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      lastModified: now,
    })),
  ];

  return [
    ...staticPages,
    ...docPages,
    ...chartPages,
    ...examplePages,
    ...blogPages,
    ...comparePages,
    ...seoPages,
    ...migratePages,
    ...useCasePages,
  ];
}
