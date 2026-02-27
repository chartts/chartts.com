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
];

const chartSlugs = [
  "line",
  "bar",
  "area",
  "pie",
  "scatter",
  "bubble",
  "radar",
  "candlestick",
  "waterfall",
  "funnel",
  "gauge",
  "sparkline",
  "stacked-bar",
  "horizontal-bar",
  "donut",
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

  return [
    ...staticPages,
    ...docPages,
    ...chartPages,
    ...examplePages,
    ...blogPages,
    ...comparePages,
    ...seoPages,
  ];
}
