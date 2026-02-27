import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Chart.ts is free and open source. Pro Themes for $49, Enterprise support for $199/mo. MIT license core, forever free.",
};

function Check() {
  return (
    <svg
      className="w-5 h-5 text-emerald-400 shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

const openSourceFeatures = [
  "40+ chart types",
  "SVG, Canvas, and WebGL renderers",
  "Full Tailwind CSS integration",
  "React, Vue, Svelte, Solid, Angular, Vanilla JS",
  "TypeScript with full type inference",
  "WCAG AA accessibility",
  "Server-side rendering",
  "Dark mode support",
  "Tree-shakeable imports",
  "Under 15kb gzipped",
  "Commercial use",
  "No attribution required",
];

const proThemesList = [
  "8 hand-crafted themes",
  "Neon, Pastel, Monochrome, Luxury",
  "Retro, Minimal, Midnight, Earth",
  "Drop-in theme presets",
  "Dark + light variants",
  "Priority feature requests",
  "All future themes included",
  "Lifetime access",
];

const enterpriseFeatures = [
  "Everything in Pro Themes",
  "SLA with guaranteed response times",
  "VPAT / compliance documentation",
  "Dedicated support channel",
  "Custom chart type development",
  "Architecture review",
  "Priority bug fixes",
  "Invoice billing",
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is the core library really free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Chart.ts is MIT licensed. Every chart type, every framework package, every renderer is free. Use it in personal projects, startups, or enterprise apps. No feature gates, no usage limits.",
      },
    },
    {
      "@type": "Question",
      name: "What do I get with Pro Themes?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "8 professionally designed theme presets (Neon, Pastel, Monochrome, Luxury, Retro, Minimal, Midnight, Earth) with dark and light variants. Drop them into any chart with a single import. Lifetime access includes all future themes.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use it commercially?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The MIT license allows commercial use, modification, and distribution. No attribution is required, though it is appreciated.",
      },
    },
    {
      "@type": "Question",
      name: "How does this compare to Highcharts pricing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Highcharts costs $590 per developer per year. Chart.ts is free and open source with the same chart types, better Tailwind integration, and smaller bundles.",
      },
    },
    {
      "@type": "Question",
      name: "Will there be a paid tier for the library?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The core library will always be free and MIT licensed. Paid offerings are for themes, enterprise support, and hosted services. Library features will never be paywalled.",
      },
    },
  ],
};

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight heading">
            Simple, transparent pricing
          </h1>
          <p className="mt-4 text-lg body-text max-w-2xl mx-auto">
            The core library is free and open source forever. Premium themes and
            enterprise support for teams that need more.
          </p>
        </div>
      </section>

      <section className="pb-16 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          {/* Open Source */}
          <div className="rounded-2xl card p-8 relative overflow-hidden">
            <div className="text-center mb-8">
              <p className="text-xs font-mono muted-text uppercase tracking-wider mb-2">
                Open Source
              </p>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-5xl font-extrabold heading">$0</span>
                <span className="text-lg muted-text">/forever</span>
              </div>
              <p className="mt-2 text-sm body-text">MIT License</p>
            </div>

            <ul className="space-y-3 mb-8">
              {openSourceFeatures.map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm body-text">
                  <Check />
                  {f}
                </li>
              ))}
            </ul>

            <Link
              href="/docs"
              className="block w-full text-center px-6 py-3 text-sm font-semibold rounded-lg card body-text hover:text-cyan-400 transition-colors cursor-pointer"
            >
              Get Started
            </Link>
          </div>

          {/* Pro Themes */}
          <div className="rounded-2xl card p-8 glow-cyan relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-emerald-500" />
            <div className="absolute top-4 right-4">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                POPULAR
              </span>
            </div>

            <div className="text-center mb-8">
              <p className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
                Pro Themes
              </p>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-5xl font-extrabold heading">$49</span>
                <span className="text-lg muted-text">/once</span>
              </div>
              <p className="mt-2 text-sm body-text">One-time payment, lifetime access</p>
            </div>

            <ul className="space-y-3 mb-8">
              {proThemesList.map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm body-text">
                  <Check />
                  {f}
                </li>
              ))}
            </ul>

            <Link
              href="/contact"
              className="block w-full text-center px-6 py-3 text-sm font-semibold rounded-lg bg-cyan-500 text-white hover:bg-cyan-400 transition-colors cursor-pointer"
            >
              Get Pro Themes
            </Link>
          </div>

          {/* Enterprise */}
          <div className="rounded-2xl card p-8 relative overflow-hidden">
            <div className="text-center mb-8">
              <p className="text-xs font-mono muted-text uppercase tracking-wider mb-2">
                Enterprise
              </p>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-5xl font-extrabold heading">$199</span>
                <span className="text-lg muted-text">/mo</span>
              </div>
              <p className="mt-2 text-sm body-text">Per team, billed annually</p>
            </div>

            <ul className="space-y-3 mb-8">
              {enterpriseFeatures.map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm body-text">
                  <Check />
                  {f}
                </li>
              ))}
            </ul>

            <Link
              href="/contact"
              className="block w-full text-center px-6 py-3 text-sm font-semibold rounded-lg card body-text hover:text-cyan-400 transition-colors cursor-pointer"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Cloud API */}
      <section className="pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="rounded-2xl card p-8 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-cyan-500" />
            <p className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-3">
              Free and Live
            </p>
            <h2 className="text-2xl font-bold heading">
              i.chartts.com
            </h2>
            <p className="mt-3 body-text max-w-lg mx-auto">
              Chart images from URLs. Embed charts in emails, Slack, Notion, GitHub READMEs.
              No JavaScript required. Free to use.
            </p>
            <div className="mt-4 inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-gray-800/50 border border-gray-700/50">
              <code className="text-sm font-mono text-purple-300">
                https://i.chartts.com/bar?data=10,20,30&color=cyan
              </code>
            </div>
            <div className="mt-4">
              <a
                href="https://i.chartts.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors font-mono"
              >
                Try it now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="pb-24 px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold heading text-center mb-10">
            Questions
          </h2>
          <div className="space-y-6">
            <div className="card rounded-xl p-6">
              <h3 className="font-semibold heading">
                Is the core library really free?
              </h3>
              <p className="mt-2 text-sm body-text">
                Yes. Chart.ts is MIT licensed. Every chart type, every framework
                package, every renderer is free. Use it in personal projects,
                startups, or enterprise apps. No feature gates, no usage limits.
              </p>
            </div>
            <div className="card rounded-xl p-6">
              <h3 className="font-semibold heading">
                What do I get with Pro Themes?
              </h3>
              <p className="mt-2 text-sm body-text">
                8 professionally designed theme presets (Neon, Pastel, Monochrome,
                Luxury, Retro, Minimal, Midnight, Earth) with dark and light
                variants. Drop them into any chart with a single import. Lifetime
                access includes all future themes.
              </p>
            </div>
            <div className="card rounded-xl p-6">
              <h3 className="font-semibold heading">
                Can I use it commercially?
              </h3>
              <p className="mt-2 text-sm body-text">
                Yes. The MIT license allows commercial use, modification, and
                distribution. No attribution is required, though it is
                appreciated.
              </p>
            </div>
            <div className="card rounded-xl p-6">
              <h3 className="font-semibold heading">
                How does this compare to Highcharts pricing?
              </h3>
              <p className="mt-2 text-sm body-text">
                Highcharts costs $590 per developer per year. Chart.ts is free
                and open source with the same chart types, better Tailwind
                integration, and smaller bundles.{" "}
                <Link
                  href="/compare/highcharts"
                  className="text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  See the full comparison
                </Link>
                .
              </p>
            </div>
            <div className="card rounded-xl p-6">
              <h3 className="font-semibold heading">
                Will there be a paid tier for the library?
              </h3>
              <p className="mt-2 text-sm body-text">
                The core library will always be free and MIT licensed. Paid
                offerings are for themes, enterprise support, and hosted
                services. Library features will never be paywalled.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
