import type { Metadata } from "next";
import Link from "next/link";
import { CodeBlock } from "@/lib/highlight";

export const metadata: Metadata = {
  title: "Getting Started | Chart.ts Documentation",
  description:
    "Install Chart.ts and render your first chart in under 30 seconds. SVG-first, <15kb, works with React, Vue, Svelte, Solid, Angular, and Vanilla JS.",
};

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="px-1.5 py-0.5 rounded text-cyan-500 text-sm font-mono" style={{ background: 'var(--c-card-bg)' }}>
      {children}
    </code>
  );
}

export default function DocsPage() {
  return (
    <article className="max-w-3xl">
      <div className="mb-12">
        <p className="section-label text-cyan-400 mb-3">Documentation</p>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight heading">
          Getting Started
        </h1>
        <p className="mt-4 text-lg body-text leading-relaxed">
          Install Chart.ts and render your first chart in under 30 seconds.
        </p>
      </div>

      {/* Installation */}
      <section id="installation" className="mb-16 scroll-mt-24">
        <h2 className="text-2xl font-bold heading mb-4">Installation</h2>
        <p className="body-text mb-6 leading-relaxed">
          Chart.ts ships native packages for every major framework. Pick yours:
        </p>

        <div className="space-y-3">
          {[
            { label: "React", cmd: "npm install @chartts/react" },
            { label: "Vue", cmd: "npm install @chartts/vue" },
            { label: "Svelte", cmd: "npm install @chartts/svelte" },
            { label: "Solid", cmd: "npm install @chartts/solid" },
            { label: "Angular", cmd: "npm install @chartts/angular" },
            { label: "Vanilla", cmd: "npm install @chartts/core" },
          ].map((fw) => (
            <div
              key={fw.label}
              className="flex items-center gap-4 px-4 py-3 rounded-lg card"
            >
              <span className="text-xs font-mono muted-text w-16 shrink-0">
                {fw.label}
              </span>
              <code className="text-sm font-mono heading">{fw.cmd}</code>
            </div>
          ))}
        </div>

        <p className="mt-4 text-sm muted-text">
          Using yarn? Replace <Code>npm install</Code> with{" "}
          <Code>yarn add</Code>. Pnpm? <Code>pnpm add</Code>. Bun?{" "}
          <Code>bun add</Code>.
        </p>

        <div className="mt-6 p-4 rounded-lg card">
          <p className="text-sm heading font-semibold mb-2">No build step? Use the CDN</p>
          <CodeBlock
            lang="html"
            code={`<script type="module">
import { LineChart } from 'https://cdn.chartts.com/core'
</script>`}
          />
          <p className="text-xs muted-text mt-2">
            Also available on{" "}
            <a href="https://cdn.jsdelivr.net/npm/@chartts/core/+esm" className="text-cyan-400 hover:text-cyan-300 cursor-pointer" target="_blank" rel="noopener noreferrer">
              jsdelivr
            </a>{" "}
            and{" "}
            <a href="https://unpkg.com/@chartts/core" className="text-cyan-400 hover:text-cyan-300 cursor-pointer" target="_blank" rel="noopener noreferrer">
              unpkg
            </a>.{" "}
            <Link href="/docs/cdn" className="text-cyan-400 hover:text-cyan-300 cursor-pointer">
              Learn more
            </Link>.
          </p>
        </div>
      </section>

      {/* Quick Start */}
      <section id="quick-start" className="mb-16 scroll-mt-24">
        <h2 className="text-2xl font-bold heading mb-4">Quick Start</h2>
        <p className="body-text mb-6 leading-relaxed">
          Three lines. That&apos;s all it takes to render a beautiful chart.
        </p>

        <CodeBlock
          filename="App.tsx"
          lang="tsx"
          code={`import { LineChart } from "@chartts/react"

const data = [
  { month: "Jan", revenue: 4200 },
  { month: "Feb", revenue: 5800 },
  { month: "Mar", revenue: 7100 },
  // ...
];

export default function App() {
  return (
    <LineChart
      data={data}
      x="month"
      y="revenue"
    />
  );
}`}
        />

        <p className="body-text leading-relaxed">
          That&apos;s it. Chart.ts handles labels, axes, tooltips, gradients,
          responsive scaling, dark mode, and accessibility - all automatically.
          Override anything with props or Tailwind classes.
        </p>
      </section>

      {/* Core Principles */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold heading mb-6">
          Core Principles
        </h2>

        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold heading mb-2">
              SVG by default
            </h3>
            <p className="body-text leading-relaxed">
              Every chart renders as real SVG DOM elements. Inspect them in
              devtools. Style them with CSS. They&apos;re accessible to screen
              readers and crisp at every zoom level. When your dataset hits 10k+
              points, Chart.ts automatically switches to Canvas. At 100k+, it
              uses WebGL. Zero configuration.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold heading mb-2">
              Tailwind native
            </h3>
            <p className="body-text leading-relaxed">
              Every chart element exposes a <Code>className</Code> prop. Use
              Tailwind utilities directly. <Code>dark:</Code> variants work out
              of the box. Your design tokens, your CSS. Charts that match your
              app, not the other way around.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold heading mb-2">
              TypeScript-first
            </h3>
            <p className="body-text leading-relaxed">
              Built in strict mode with zero <Code>any</Code> types. Full type
              inference on every prop. Autocomplete in your editor IS the
              documentation. If it compiles, the chart renders correctly.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold heading mb-2">
              Accessible by architecture
            </h3>
            <p className="body-text leading-relaxed">
              WCAG 2.1 AA compliant out of the box. Keyboard navigation,
              screen reader announcements, pattern fills for color-blind users,
              and proper ARIA roles. Accessibility isn&apos;t an afterthought
              - it&apos;s built into every component.
            </p>
          </div>
        </div>
      </section>

      {/* What's next */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold heading mb-6">Next Steps</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              title: "Chart Types",
              desc: "Explore all 65+ chart types with examples and API docs.",
              href: "/docs/charts",
            },
            {
              title: "Tailwind CSS",
              desc: "Learn how to style every chart element with Tailwind.",
              href: "/docs/tailwind",
            },
            {
              title: "API Reference",
              desc: "Full prop reference for every component.",
              href: "/docs/api",
            },
            {
              title: "Examples",
              desc: "Real-world examples you can copy and paste.",
              href: "/examples",
            },
          ].map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="group p-5 rounded-xl card hover:border-cyan-500/20 transition-all cursor-pointer"
            >
              <h3 className="text-sm font-semibold heading group-hover:text-cyan-400 transition-colors mb-1.5">
                {card.title}
              </h3>
              <p className="text-sm muted-text">{card.desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
