import Link from "next/link";

export function Cta() {
  return (
    <section id="get-started" className="py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight heading">
          Get started in 30 seconds.
        </h2>
        <p className="mt-4 text-lg body-text">
          Install. Import. Render. That&apos;s it.
        </p>

        {/* Install command */}
        <div className="mt-10 inline-flex items-center gap-3 px-6 py-4 rounded-xl card">
          <span className="muted-text font-mono text-sm">$</span>
          <code className="text-lg font-mono heading">
            npm install @chartts/react
          </code>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            href="/docs"
            className="px-6 py-3 text-sm font-semibold rounded-lg bg-cyan-500 text-white hover:bg-cyan-400 transition-colors cursor-pointer"
          >
            Read the Docs
          </Link>
          <a
            href="https://github.com/chartts/chartts"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 text-sm font-semibold rounded-lg card body-text transition-all cursor-pointer"
          >
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
