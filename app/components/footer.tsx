import Link from "next/link";

const columns: {
  title: string;
  links: { label: string; href: string; external?: boolean }[];
}[] = [
  {
    title: "Library",
    links: [
      { label: "Getting Started", href: "/docs" },
      { label: "API Reference", href: "/docs/api" },
      { label: "Themes", href: "/docs/themes" },
      { label: "Accessibility", href: "/docs/accessibility" },
      { label: "Examples", href: "/examples" },
    ],
  },
  {
    title: "Frameworks",
    links: [
      { label: "React", href: "/docs/react" },
      { label: "Vue", href: "/docs/vue" },
      { label: "Svelte", href: "/docs/svelte" },
      { label: "Solid", href: "/docs/solid" },
      { label: "Vanilla JS", href: "/docs/vanilla" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Changelog", href: "/changelog" },
      { label: "Pricing", href: "/pricing" },
      { label: "Compare", href: "/compare" },
      { label: "Playground", href: "/playground" },
    ],
  },
  {
    title: "Community",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/chartts/chartts",
        external: true,
      },
      {
        label: "npm",
        href: "https://www.npmjs.com/package/@chartts/core",
        external: true,
      },
      { label: "Discord", href: "/discord" },
      { label: "Twitter", href: "https://x.com/chartts", external: true },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t adaptive-border py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 mb-16">
          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-xs font-mono muted-text uppercase tracking-wider mb-4">
                {col.title}
              </p>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm nav-link cursor-pointer"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm nav-link cursor-pointer"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t adaptive-border">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 28 28" fill="none">
              <rect x="2" y="16" width="5" height="10" rx="1.5" fill="#06b6d4" opacity="0.4" />
              <rect x="9" y="10" width="5" height="16" rx="1.5" fill="#06b6d4" opacity="0.6" />
              <rect x="16" y="5" width="5" height="21" rx="1.5" fill="#06b6d4" opacity="0.85" />
              <rect x="23" y="2" width="5" height="24" rx="1.5" fill="#22d3ee" />
            </svg>
            <span className="text-sm muted-text">
              Chart<span className="text-cyan-400">.ts</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded text-[11px] font-mono card muted-text">
              MIT License
            </span>
            <span className="text-xs faint-text">
              Free forever. Open source.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
