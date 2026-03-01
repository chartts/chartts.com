import { HeroChart } from "./components/hero-chart";
import { Features } from "./components/features";
import { BundleSize } from "./components/bundle-size";
import { CodeExample } from "./components/code-example";
import { ChartGallery } from "./components/chart-gallery";
import { Frameworks } from "./components/frameworks";
import { UrlApi } from "./components/url-api";
import { Cta } from "./components/cta";
import Link from "next/link";

const heroPills = [
  { mono: "<15kb gzipped", color: "text-cyan-400", text: "Smaller than a hero image.", bold: "Your Lighthouse score stays green.", href: "/docs/performance" },
  { mono: "SVG-first", color: "text-cyan-400", text: "Real DOM elements.", bold: "CSS, devtools, screen readers - all work.", href: "/docs/svg" },
  { mono: "className=", color: "text-emerald-400", text: "Tailwind on every chart element.", bold: "Dark mode in one class.", href: "/docs/tailwind" },
  { mono: "MIT forever", color: "text-amber-400", text: "Candlestick, waterfall, gauge - 65+ chart types.", bold: "Free. Commercial use included.", href: "/docs/charts" },
  { mono: "WCAG AA", color: "text-cyan-400", text: "Keyboard nav, screen readers, pattern fills.", bold: "Accessible by architecture.", href: "/docs/accessibility" },
  { mono: "Every framework", color: "text-cyan-400", text: "React, Vue, Svelte, Solid, Angular, Vanilla.", bold: "Native packages. Same API.", href: "/docs/frameworks" },
];

export default function Home() {
  return (
    <>
{/* Hero */}
      <section className="pt-32 pb-24 px-6">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-6xl sm:text-7xl font-extrabold tracking-tight text-gradient animate-fade-up">
            Beautiful charts.
          </h1>
          <h2 className="text-6xl sm:text-7xl font-extrabold tracking-tight heading mt-2 animate-fade-up delay-1">
            Zero config.
          </h2>

          {/* Pain-point pills */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-3xl mx-auto animate-fade-up delay-2">
            {heroPills.map((pill) => (
              <Link
                key={pill.mono}
                href={pill.href}
                className="group relative px-4 py-3 rounded-xl card hover:border-cyan-500/20 transition-all text-left cursor-pointer"
              >
                <p className={`text-xs font-mono ${pill.color} mb-0.5`}>{pill.mono}</p>
                <p className="text-[13px] body-text">
                  {pill.text}
                  <span className="heading"> {pill.bold}</span>
                </p>
              </Link>
            ))}
          </div>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up delay-3">
            <Link
              href="/docs"
              className="px-6 py-3 text-sm font-semibold rounded-lg bg-cyan-500 text-white hover:bg-cyan-400 transition-colors cursor-pointer"
            >
              Get Started
            </Link>
            <button
              className="group flex items-center gap-3 px-5 py-3 text-sm font-mono rounded-lg card hover:border-cyan-500/30 transition-all cursor-copy"
            >
              <span className="muted-text">$</span>
              <span className="heading">npm install @chartts/react</span>
              <svg
                className="w-4 h-4 muted-text group-hover:text-cyan-400 transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <rect x="9" y="9" width="13" height="13" rx="2" />
                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
              </svg>
            </button>
          </div>
        </div>

        {/* Hero chart */}
        <div className="mt-20 max-w-4xl mx-auto animate-fade-up delay-5">
          <div className="window-frame glow-cyan">
            <div className="window-titlebar">
              <div className="window-dot bg-[#ff5f57]" />
              <div className="window-dot bg-[#febc2e]" />
              <div className="window-dot bg-[#28c840]" />
              <span className="ml-3 text-xs text-zinc-500 font-mono">
                dashboard.tsx
              </span>
            </div>
            <div className="p-6 sm:p-8">
              <HeroChart />
            </div>
          </div>
        </div>
      </section>

      <Features />
      <BundleSize />
      <CodeExample />
      <ChartGallery />
      <Frameworks />
      <UrlApi />
      <Cta />
</>
  );
}
