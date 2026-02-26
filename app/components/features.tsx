import Link from "next/link";

const features = [
  {
    title: "<15kb gzipped",
    description: "Smaller than most hero images. Your Lighthouse score stays green. Your users stay happy.",
    href: "/docs/performance",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path d="M20 12V6.5a2.5 2.5 0 00-2.5-2.5h-11A2.5 2.5 0 004 6.5v11A2.5 2.5 0 006.5 20H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M16 19l2 2 4-4" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 10h8M8 14h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "SVG-first",
    description: "Real DOM elements. Inspect in devtools. Style with CSS. Accessible to screen readers. Crisp at every zoom.",
    href: "/docs/svg",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7 14l3-4 3 2 4-5" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Multi-renderer",
    description: "SVG by default. Auto-switches to Canvas at 10k+ points, WebGL at 100k+. Zero configuration.",
    href: "/docs/renderers",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path d="M4 8l8-4 8 4-8 4-8-4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M4 12l8 4 8-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
        <path d="M4 16l8 4 8-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.3" />
      </svg>
    ),
  },
  {
    title: "Beautiful defaults",
    description: "Looks stunning out of the box. Smooth gradients, clean type, elegant animations. No config needed.",
    href: "/docs/themes",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path d="M12 2L9 9H2l5.5 4.5L5 21l7-5 7 5-2.5-7.5L22 9h-7L12 2z" stroke="#f59e0b" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Tailwind native",
    description: "className prop on every element. dark: variants. Your design tokens, your CSS. Charts that match your app.",
    href: "/docs/tailwind",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path d="M12 6C9.33 6 7.67 7.33 7 10c1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.9 1.35C13.4 10.86 14.6 12 17 12c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.9-1.35C15.6 7.14 14.4 6 12 6zM7 12c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.9 1.35C8.4 16.86 9.6 18 12 18c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.9-1.35C10.6 13.14 9.4 12 7 12z" stroke="#06b6d4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Every framework",
    description: "Native packages for React, Vue, Svelte, Solid, and Vanilla JS. Same API. Learn once, use anywhere.",
    href: "/docs/frameworks",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path d="M7 8l-4 4 4 4M17 8l4 4-4 4M14 4l-4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "TypeScript-first",
    description: "Strict mode, zero any. Full type inference on every prop. Autocomplete IS the documentation.",
    href: "/docs/typescript",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <rect x="3" y="3" width="18" height="18" rx="3" stroke="#3b82f6" strokeWidth="1.5" />
        <text x="12" y="16" textAnchor="middle" fill="#3b82f6" fontSize="10" fontWeight="bold" fontFamily="monospace">TS</text>
      </svg>
    ),
  },
  {
    title: "Accessible",
    description: "WCAG 2.1 AA by default. Keyboard nav, screen readers, pattern fills. Accessible by architecture, not afterthought.",
    href: "/docs/accessibility",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <circle cx="12" cy="4.5" r="2" stroke="#10b981" strokeWidth="1.5" />
        <path d="M12 7.5v5m0 0l-3 5m3-5l3 5M7 10.5h10" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="section-label text-cyan-400 mb-4">Why Chart.ts</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight heading">
            Everything you need.
            <br />
            <span className="faint-text">Nothing you don&apos;t.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature) => (
            <Link
              key={feature.title}
              href={feature.href}
              className="group p-5 rounded-xl card hover:border-cyan-500/20 transition-all cursor-pointer block"
            >
              <div className="muted-text group-hover:text-cyan-400 transition-colors mb-3">
                {feature.icon}
              </div>
              <h3 className="text-sm font-semibold heading mb-1.5">
                {feature.title}
              </h3>
              <p className="text-sm body-text leading-relaxed">
                {feature.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
