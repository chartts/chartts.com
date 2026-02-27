import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Chart.ts is free and open source. MIT license, forever. No premium tier, no hidden costs.",
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

const features = [
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

export default function PricingPage() {
  return (
    <>
<section className="pt-32 pb-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight heading">
            Free. Forever.
          </h1>
          <p className="mt-4 text-lg body-text max-w-xl mx-auto">
            Chart.ts is open source under the MIT license. No premium tier, no
            feature gates, no usage limits. The full library, free for
            everyone.
          </p>
        </div>
      </section>

      <section className="pb-16 px-6">
        <div className="max-w-md mx-auto">
          <div className="rounded-2xl card p-8 glow-cyan relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-emerald-500" />

            <div className="text-center mb-8">
              <p className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
                One plan
              </p>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-6xl font-extrabold heading">$0</span>
                <span className="text-lg muted-text">/forever</span>
              </div>
              <p className="mt-2 text-sm body-text">MIT License</p>
            </div>

            <ul className="space-y-3 mb-8">
              {features.map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm body-text">
                  <Check />
                  {f}
                </li>
              ))}
            </ul>

            <Link
              href="/docs"
              className="block w-full text-center px-6 py-3 text-sm font-semibold rounded-lg bg-cyan-500 text-white hover:bg-cyan-400 transition-colors cursor-pointer"
            >
              Get Started
            </Link>
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
                Is there really no paid plan?
              </h3>
              <p className="mt-2 text-sm body-text">
                No. Chart.ts is MIT licensed. Every feature, every chart type,
                every framework package is free. Use it in personal projects,
                startups, or enterprise apps.
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
                How do you sustain development?
              </h3>
              <p className="mt-2 text-sm body-text">
                Chart.ts is built and maintained by developers who believe
                charting libraries should be free and open. We accept{" "}
                <a
                  href="https://github.com/sponsors/chartts"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  GitHub Sponsors
                </a>{" "}
                for those who want to support the project.
              </p>
            </div>
            <div className="card rounded-xl p-6">
              <h3 className="font-semibold heading">
                Will there be a paid tier in the future?
              </h3>
              <p className="mt-2 text-sm body-text">
                The core library will always be free and MIT licensed. If we
                ever offer paid services, they would be for hosting, support,
                or premium tooling, never for library features.
              </p>
            </div>
          </div>
        </div>
      </section>
</>
  );
}
