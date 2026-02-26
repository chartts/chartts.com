import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import { getAllDocSlugs, getDocBySlug } from "@/lib/docs";
import { mdxComponents } from "@/lib/mdx-components";
import { CodeBlock } from "@/lib/highlight";

const docs: Record<
  string,
  {
    title: string;
    description: string;
    badge?: string;
    content: {
      heading: string;
      body: string;
    }[];
    relatedLinks?: { label: string; href: string }[];
  }
> = {
  performance: {
    title: "Performance",
    description:
      "Chart.ts ships at under 15kb gzipped — smaller than most hero images. Here's how we keep it lean.",
    badge: "<15kb",
    content: [
      {
        heading: "Bundle size",
        body: "The core library is under 15kb gzipped with zero runtime dependencies. Each chart type is tree-shakeable — import only what you use. A typical app with 2-3 chart types adds ~8kb to your bundle.",
      },
      {
        heading: "Tree shaking",
        body: "Every chart type is a separate export. Import { LineChart } and your bundler drops the other 11. Dead code elimination works perfectly because we avoid side effects and circular dependencies.",
      },
      {
        heading: "Rendering performance",
        body: "SVG rendering is fast for typical datasets (under 1,000 points). For larger datasets, Chart.ts automatically switches to Canvas at 10,000+ points and WebGL at 100,000+. This happens transparently — same API, same props, same output.",
      },
      {
        heading: "SSR & streaming",
        body: "Charts render on the server as static SVG. No layout shift, no flash of empty space. Compatible with React Server Components, Next.js streaming, and any SSR framework.",
      },
    ],
    relatedLinks: [
      { label: "Multi-Renderer", href: "/docs/renderers" },
      { label: "SVG Rendering", href: "/docs/svg" },
    ],
  },
  svg: {
    title: "SVG Rendering",
    description:
      "Chart.ts renders real SVG DOM elements. Inspect them. Style them. They're accessible, SSR-ready, and crisp at every zoom level.",
    badge: "Default",
    content: [
      {
        heading: "Real DOM elements",
        body: "Every chart renders as structured SVG inside your document. Open devtools and inspect individual bars, lines, labels, and axes. They're real elements with real attributes — not pixels on a canvas.",
      },
      {
        heading: "CSS styleable",
        body: "SVG elements accept CSS styles. Use Tailwind classes directly on chart elements. Apply dark: variants. Override colors, fonts, strokes, and animations with standard CSS. No proprietary theming API to learn.",
      },
      {
        heading: "Screen reader accessible",
        body: "SVG elements support ARIA attributes natively. Chart.ts adds role, aria-label, and descriptive text to every chart region. Screen readers can navigate chart data points, read values, and understand trends.",
      },
      {
        heading: "Resolution independent",
        body: "SVG scales infinitely without quality loss. Charts look sharp on retina displays, 4K monitors, printed documents, and any zoom level. No blurry edges, no pixelation.",
      },
      {
        heading: "Server rendering",
        body: "SVG is just markup. It renders on the server identically to the client. No hydration mismatch, no flash of unstyled content. Works with React Server Components, Astro, and any SSR framework.",
      },
    ],
    relatedLinks: [
      { label: "Multi-Renderer", href: "/docs/renderers" },
      { label: "Accessibility", href: "/docs/accessibility" },
      { label: "Tailwind CSS", href: "/docs/tailwind" },
    ],
  },
  renderers: {
    title: "Multi-Renderer",
    description:
      "SVG by default. Canvas at 10k+ points. WebGL at 100k+. Zero configuration required.",
    badge: "Auto",
    content: [
      {
        heading: "Automatic switching",
        body: "Chart.ts monitors your dataset size and automatically selects the best renderer. Under 10,000 data points: SVG for perfect quality and accessibility. Over 10,000: Canvas for smooth 60fps performance. Over 100,000: WebGL for GPU-accelerated rendering. Same API. Same props. Same output.",
      },
      {
        heading: "Manual override",
        body: "Need Canvas for a small dataset? Set renderer=\"canvas\" on any chart. Prefer SVG for large datasets where you need CSS styling? Set renderer=\"svg\". The auto-switch is a default, not a constraint.",
      },
      {
        heading: "Feature parity",
        body: "Tooltips, animations, click handlers, and accessibility features work across all three renderers. The Canvas and WebGL renderers synthesize DOM events and ARIA attributes to match SVG behavior.",
      },
    ],
    relatedLinks: [
      { label: "SVG Rendering", href: "/docs/svg" },
      { label: "Performance", href: "/docs/performance" },
    ],
  },
  tailwind: {
    title: "Tailwind CSS",
    description:
      "className prop on every element. dark: variants. Your design tokens, your CSS. Charts that match your app.",
    badge: "Native",
    content: [
      {
        heading: "className everywhere",
        body: "Every chart component and sub-element exposes a className prop. Apply Tailwind utilities directly to chart lines, bars, axes, labels, tooltips, and legends. No wrapper divs, no style objects, no CSS-in-JS.",
      },
      {
        heading: "Dark mode",
        body: "Tailwind's dark: variant works on every chart element. Switch your app to dark mode and charts follow automatically. Or use different color schemes per theme — it's just CSS classes.",
      },
      {
        heading: "Design tokens",
        body: "Chart.ts uses your Tailwind config. Colors, fonts, spacing — everything comes from your design tokens. Charts look like they belong in your app because they use the same design system.",
      },
      {
        heading: "Example",
        body: "<LineChart data={data} x=\"month\" y=\"revenue\" className=\"rounded-xl\" lineClassName=\"stroke-cyan-400 dark:stroke-cyan-300\" axisClassName=\"text-zinc-500 dark:text-zinc-400\" />",
      },
    ],
    relatedLinks: [
      { label: "Themes", href: "/docs/themes" },
      { label: "SVG Rendering", href: "/docs/svg" },
    ],
  },
  themes: {
    title: "Themes",
    description:
      "Beautiful defaults with full customization. Every color, font, spacing value is overridable.",
    content: [
      {
        heading: "Beautiful defaults",
        body: "Chart.ts looks stunning out of the box. Smooth gradients, clean typography, elegant animations, accessible color palettes. You don't need to configure anything to get a professional result.",
      },
      {
        heading: "Global theme",
        body: "Set a global theme object to control colors, fonts, spacing, border radius, and animation timing across all charts. Override per-chart or per-element with props and className.",
      },
      {
        heading: "Color palettes",
        body: "Ships with 8 curated color palettes designed for accessibility and aesthetics. Each palette includes 12 colors that work together and meet WCAG contrast requirements against both light and dark backgrounds.",
      },
      {
        heading: "CSS custom properties",
        body: "Every theme value maps to a CSS custom property. Override them in your stylesheet for complete control. Works with Tailwind's @theme directive in v4.",
      },
    ],
    relatedLinks: [
      { label: "Tailwind CSS", href: "/docs/tailwind" },
      { label: "Accessibility", href: "/docs/accessibility" },
    ],
  },
  typescript: {
    title: "TypeScript",
    description:
      "Strict mode. Zero any. Full type inference on every prop. Autocomplete IS the documentation.",
    badge: "Strict",
    content: [
      {
        heading: "Full type inference",
        body: "Pass data={myData} and Chart.ts infers the available keys for x and y props. Autocomplete shows exactly which fields are available. If it compiles, the chart renders correctly.",
      },
      {
        heading: "Strict mode",
        body: "The entire library is written in TypeScript strict mode with zero any types. Every prop, callback, event handler, and return value is fully typed. No @ts-ignore needed.",
      },
      {
        heading: "Generic components",
        body: "Chart components are generic over your data type. LineChart<MyData> gives you type-safe access to all fields. Refactor a field name and TypeScript catches every chart that references it.",
      },
      {
        heading: "Flat API",
        body: "No nested config objects. No builder patterns. Every option is a top-level prop. This makes TypeScript inference work perfectly — you get autocomplete on every prop without digging through nested types.",
      },
    ],
    relatedLinks: [
      { label: "API Reference", href: "/docs/api" },
      { label: "Getting Started", href: "/docs" },
    ],
  },
  accessibility: {
    title: "Accessibility",
    description:
      "WCAG 2.1 AA by default. Keyboard navigation, screen readers, pattern fills. Accessible by architecture, not afterthought.",
    badge: "WCAG AA",
    content: [
      {
        heading: "Keyboard navigation",
        body: "Navigate between data points with arrow keys. Tab to move between chart regions. Enter to activate tooltips. Escape to dismiss. Full keyboard support on every chart type.",
      },
      {
        heading: "Screen readers",
        body: "Every chart includes ARIA roles, labels, and live regions. Screen readers announce chart type, data summary, individual values, and trends. Data tables are available as an alternative representation.",
      },
      {
        heading: "Pattern fills",
        body: "Enable pattern fills to distinguish data series without relying on color alone. Stripes, dots, crosshatch — each series gets a unique pattern. Essential for color-blind users and printed output.",
      },
      {
        heading: "High contrast",
        body: "All default color palettes meet WCAG AA contrast ratios against both light and dark backgrounds. Focus indicators are clearly visible. No information is conveyed by color alone.",
      },
      {
        heading: "Reduced motion",
        body: "Respects prefers-reduced-motion. When enabled, charts render immediately without animation. Users who experience motion sickness see the same data with zero transitions.",
      },
    ],
    relatedLinks: [
      { label: "SVG Rendering", href: "/docs/svg" },
      { label: "Themes", href: "/docs/themes" },
    ],
  },
  frameworks: {
    title: "Framework Support",
    description:
      "Native packages for React, Vue, Svelte, Solid, and Vanilla JS. Same API surface. Learn once, use anywhere.",
    content: [
      {
        heading: "Native packages",
        body: "Each framework gets a dedicated package built for its reactivity model. @chartts/react uses hooks and refs. @chartts/vue uses the Composition API. @chartts/svelte uses stores. @chartts/solid uses signals. Not wrappers — native implementations.",
      },
      {
        heading: "Same API",
        body: "The prop interface is identical across frameworks. <LineChart data={data} x=\"month\" y=\"revenue\" /> works the same in React, Vue, Svelte, Solid, and Vanilla JS. Documentation applies everywhere.",
      },
      {
        heading: "Vanilla JS",
        body: "@chartts/core works without any framework. Create charts with new LineChart(element, { data, x, y }). Perfect for server-rendered pages, Web Components, or any environment.",
      },
    ],
    relatedLinks: [
      { label: "React", href: "/docs/react" },
      { label: "Vue", href: "/docs/vue" },
      { label: "Svelte", href: "/docs/svelte" },
      { label: "Solid", href: "/docs/solid" },
      { label: "Vanilla JS", href: "/docs/vanilla" },
    ],
  },
  api: {
    title: "API Reference",
    description:
      "Complete prop reference for every Chart.ts component. Flat API — every option is a top-level prop.",
    content: [
      {
        heading: "Common props",
        body: "All chart types share these props: data (array), width, height, className, theme, renderer, animate, accessible, responsive, locale, and onReady. Most are optional with sensible defaults.",
      },
      {
        heading: "Data binding",
        body: "Every chart takes a data prop (array of objects) and x/y props (string keys of your data). For multi-series charts, use series prop with an array of y keys. Type inference ensures you can only reference fields that exist.",
      },
      {
        heading: "Styling props",
        body: "Every visual element has a className prop: lineClassName, barClassName, axisClassName, labelClassName, tooltipClassName, legendClassName. Apply Tailwind classes directly.",
      },
      {
        heading: "Event handlers",
        body: "onClick, onHover, onLeave for data point interactions. onBrush for selection ranges. onZoom for zoom changes. All callbacks receive the data point, index, and chart instance.",
      },
      {
        heading: "Chart-specific props",
        body: "Each chart type has unique props. LineChart: curve, area, dots. BarChart: stacked, horizontal, groupPadding. PieChart: donut, innerRadius, padAngle. See individual chart docs for details.",
      },
    ],
    relatedLinks: [
      { label: "All Chart Types", href: "/docs/charts" },
      { label: "TypeScript", href: "/docs/typescript" },
    ],
  },
  react: {
    title: "React",
    description:
      "Native React package with hooks, refs, and full TypeScript support. Works with Next.js, Remix, Vite, and any React setup.",
    badge: "@chartts/react",
    content: [
      {
        heading: "Installation",
        body: "npm install @chartts/react",
      },
      {
        heading: "Basic usage",
        body: "import { LineChart } from '@chartts/react'\n\nexport function Dashboard() {\n  return <LineChart data={data} x=\"month\" y=\"revenue\" />\n}",
      },
      {
        heading: "Hooks",
        body: "useChartRef() gives you imperative access to the chart instance. useChartData() manages reactive data updates. useChartTheme() provides theme context for nested charts.",
      },
      {
        heading: "Server Components",
        body: "Chart.ts charts are client components (they use refs and effects). Wrap them in a client boundary. Data fetching stays in your server component — pass data as props.",
      },
      {
        heading: "Next.js",
        body: "Works with Next.js App Router and Pages Router. SSR renders static SVG. Client hydration adds interactivity. No special configuration needed.",
      },
    ],
    relatedLinks: [
      { label: "Getting Started", href: "/docs" },
      { label: "API Reference", href: "/docs/api" },
    ],
  },
  vue: {
    title: "Vue",
    description:
      "Native Vue 3 package using the Composition API. Works with Nuxt, Vite, and any Vue setup.",
    badge: "@chartts/vue",
    content: [
      {
        heading: "Installation",
        body: "npm install @chartts/vue",
      },
      {
        heading: "Basic usage",
        body: "<script setup>\nimport { LineChart } from '@chartts/vue'\n</script>\n\n<template>\n  <LineChart :data=\"data\" x=\"month\" y=\"revenue\" />\n</template>",
      },
      {
        heading: "Reactivity",
        body: "Pass reactive data (ref or computed) and charts update automatically. Vue's fine-grained reactivity means only changed data points re-render.",
      },
      {
        heading: "Nuxt",
        body: "Works with Nuxt 3 out of the box. Charts SSR as static SVG and hydrate on the client. No plugin or module needed.",
      },
    ],
    relatedLinks: [
      { label: "Getting Started", href: "/docs" },
      { label: "API Reference", href: "/docs/api" },
    ],
  },
  svelte: {
    title: "Svelte",
    description:
      "Native Svelte package with store-based reactivity. Works with SvelteKit and any Svelte setup.",
    badge: "@chartts/svelte",
    content: [
      {
        heading: "Installation",
        body: "npm install @chartts/svelte",
      },
      {
        heading: "Basic usage",
        body: "<script>\nimport { LineChart } from '@chartts/svelte'\n</script>\n\n<LineChart {data} x=\"month\" y=\"revenue\" />",
      },
      {
        heading: "Stores",
        body: "Pass Svelte stores as data and charts react to changes automatically. Use derived stores for computed datasets.",
      },
      {
        heading: "SvelteKit",
        body: "Works with SvelteKit SSR. Charts render as static SVG on the server. Load data in +page.server.ts and pass to charts.",
      },
    ],
    relatedLinks: [
      { label: "Getting Started", href: "/docs" },
      { label: "API Reference", href: "/docs/api" },
    ],
  },
  solid: {
    title: "Solid",
    description:
      "Native Solid package with signal-based reactivity. Works with SolidStart and any Solid setup.",
    badge: "@chartts/solid",
    content: [
      {
        heading: "Installation",
        body: "npm install @chartts/solid",
      },
      {
        heading: "Basic usage",
        body: "import { LineChart } from '@chartts/solid'\n\nexport function Dashboard() {\n  return <LineChart data={data()} x=\"month\" y=\"revenue\" />\n}",
      },
      {
        heading: "Signals",
        body: "Pass signals as data props. Solid's fine-grained reactivity means chart updates are surgical — only changed elements re-render.",
      },
      {
        heading: "SolidStart",
        body: "Works with SolidStart SSR. Charts render as static SVG on the server and hydrate on the client.",
      },
    ],
    relatedLinks: [
      { label: "Getting Started", href: "/docs" },
      { label: "API Reference", href: "/docs/api" },
    ],
  },
  vanilla: {
    title: "Vanilla JS",
    description:
      "Framework-free. Works with plain HTML, Web Components, or any JavaScript environment.",
    badge: "@chartts/core",
    content: [
      {
        heading: "Installation",
        body: "npm install @chartts/core",
      },
      {
        heading: "Basic usage",
        body: "import { LineChart } from '@chartts/core'\n\nconst chart = new LineChart(document.getElementById('chart'), {\n  data,\n  x: 'month',\n  y: 'revenue'\n})",
      },
      {
        heading: "Updates",
        body: "Call chart.update({ data: newData }) to update the chart. Call chart.destroy() to clean up event listeners and DOM elements.",
      },
      {
        heading: "CDN",
        body: "Use Chart.ts from a CDN without a build step. <script src=\"https://cdn.chartts.com/core.min.js\"> gives you a global Chartts object.",
      },
    ],
    relatedLinks: [
      { label: "Getting Started", href: "/docs" },
      { label: "API Reference", href: "/docs/api" },
    ],
  },
};

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const hardcoded = Object.keys(docs);
  const mdxSlugs = getAllDocSlugs();
  const all = [...new Set([...hardcoded, ...mdxSlugs])];
  return all.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const mdxDoc = getDocBySlug(slug);
  if (mdxDoc) {
    return {
      title: `${mdxDoc.title} — Chart.ts Documentation`,
      description: mdxDoc.description,
    };
  }
  const doc = docs[slug];
  if (!doc) return {};
  return {
    title: `${doc.title} — Chart.ts Documentation`,
    description: doc.description,
  };
}

export default async function DocPage({ params }: PageProps) {
  const { slug } = await params;

  // Check for MDX content first
  const mdxDoc = getDocBySlug(slug);
  if (mdxDoc) {
    return (
      <article className="max-w-3xl">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <p className="section-label text-cyan-400">Documentation</p>
            {mdxDoc.badge && (
              <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                {mdxDoc.badge}
              </span>
            )}
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight heading">
            {mdxDoc.title}
          </h1>
          <p className="mt-4 text-lg body-text leading-relaxed">
            {mdxDoc.description}
          </p>
        </div>

        <div className="prose-chartts">
          <MDXRemote
            source={mdxDoc.content}
            components={mdxComponents}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
                rehypePlugins: [
                  [
                    rehypePrettyCode,
                    {
                      theme: {
                        dark: "github-dark-dimmed",
                        light: "github-light",
                      },
                      keepBackground: false,
                    },
                  ],
                ],
              },
            }}
          />
        </div>
      </article>
    );
  }

  // Fallback to hardcoded content
  const doc = docs[slug];

  if (!doc) {
    notFound();
  }

  return (
    <article className="max-w-3xl">
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-3">
          <p className="section-label text-cyan-400">Documentation</p>
          {doc.badge && (
            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              {doc.badge}
            </span>
          )}
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight heading">
          {doc.title}
        </h1>
        <p className="mt-4 text-lg body-text leading-relaxed">
          {doc.description}
        </p>
      </div>

      {/* Content sections */}
      <div className="space-y-12 mb-16">
        {doc.content.map((section) => (
          <section key={section.heading}>
            <h2 className="text-xl font-bold heading mb-3">
              {section.heading}
            </h2>
            {section.body.includes("\n") ? (
              <CodeBlock code={section.body} lang="tsx" />
            ) : (
              <p className="body-text leading-relaxed">{section.body}</p>
            )}
          </section>
        ))}
      </div>

      {/* Related links */}
      {doc.relatedLinks && doc.relatedLinks.length > 0 && (
        <section>
          <h2 className="text-lg font-bold heading mb-4">Related</h2>
          <div className="flex flex-wrap gap-3">
            {doc.relatedLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-lg text-sm card body-text hover:text-cyan-400 hover:border-cyan-500/20 transition-all cursor-pointer"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
