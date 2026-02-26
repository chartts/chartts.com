import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Playground",
  description:
    "Try Chart.ts live in the browser. Edit code, see charts render in real time.",
};

export default function PlaygroundPage() {
  return (
    <>
<section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-3 py-1 text-xs font-mono rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-6">
            Coming soon
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight heading">
            Playground
          </h1>
          <p className="mt-4 text-lg body-text max-w-2xl mx-auto">
            A live editor where you can write Chart.ts code and see charts
            render in real time. Edit data, styles, and options with instant
            feedback.
          </p>
        </div>
      </section>

      <section className="pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="rounded-2xl card p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-xl bg-cyan-500/10 flex items-center justify-center">
              <svg className="w-8 h-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
              </svg>
            </div>
            <h2 className="text-xl font-bold heading mb-3">
              Interactive chart editor
            </h2>
            <p className="body-text mb-8 max-w-md mx-auto">
              We are building a browser-based playground with live preview,
              TypeScript support, and shareable URLs. In the meantime, try the
              demos or check out the examples.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link
                href="/demos"
                className="px-6 py-3 text-sm font-semibold rounded-lg bg-cyan-500 text-white hover:bg-cyan-400 transition-colors cursor-pointer"
              >
                See Demos
              </Link>
              <Link
                href="/examples"
                className="px-6 py-3 text-sm font-semibold rounded-lg card body-text transition-all cursor-pointer"
              >
                View Examples
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold heading text-center mb-8">
            What to expect
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="card rounded-xl p-6">
              <h3 className="font-semibold heading mb-2">Live preview</h3>
              <p className="text-sm body-text">
                See your chart update as you type. No build step, no refresh.
              </p>
            </div>
            <div className="card rounded-xl p-6">
              <h3 className="font-semibold heading mb-2">TypeScript</h3>
              <p className="text-sm body-text">
                Full autocomplete, type checking, and error reporting in the
                browser.
              </p>
            </div>
            <div className="card rounded-xl p-6">
              <h3 className="font-semibold heading mb-2">Share</h3>
              <p className="text-sm body-text">
                Get a unique URL for your chart. Share it with your team or
                embed it.
              </p>
            </div>
          </div>
        </div>
      </section>
</>
  );
}
