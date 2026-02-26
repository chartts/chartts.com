import Link from "next/link";

const frameworks = [
  {
    name: "React",
    package: "@chartts/react",
    slug: "react",
    color: "#61dafb",
    icon: (
      <svg viewBox="0 0 32 32" className="w-8 h-8">
        <circle cx="16" cy="16" r="2.5" fill="#61dafb" />
        <ellipse cx="16" cy="16" rx="14" ry="5.5" fill="none" stroke="#61dafb" strokeWidth="1" />
        <ellipse cx="16" cy="16" rx="14" ry="5.5" fill="none" stroke="#61dafb" strokeWidth="1" transform="rotate(60 16 16)" />
        <ellipse cx="16" cy="16" rx="14" ry="5.5" fill="none" stroke="#61dafb" strokeWidth="1" transform="rotate(120 16 16)" />
      </svg>
    ),
  },
  {
    name: "Vue",
    package: "@chartts/vue",
    slug: "vue",
    color: "#42b883",
    icon: (
      <svg viewBox="0 0 32 32" className="w-8 h-8">
        <path d="M2 4h5.6L16 18.4 24.4 4H30L16 28 2 4z" fill="none" stroke="#42b883" strokeWidth="1.2" />
        <path d="M9.6 4L16 14.8 22.4 4" fill="none" stroke="#42b883" strokeWidth="1.2" opacity="0.6" />
      </svg>
    ),
  },
  {
    name: "Svelte",
    package: "@chartts/svelte",
    slug: "svelte",
    color: "#ff3e00",
    icon: (
      <svg viewBox="0 0 32 32" className="w-8 h-8">
        <path d="M24.7 4.8C22 1.5 17.3.8 14 3L7 8a8.5 8.5 0 00-3.8 7.2 8.8 8.8 0 001 4.1A8.6 8.6 0 003 23a8.8 8.8 0 001.5 5 9.7 9.7 0 0010.7 1.8l7-5a8.5 8.5 0 003.8-7.2 8.8 8.8 0 00-1.3-4.8z" fill="none" stroke="#ff3e00" strokeWidth="1.2" />
      </svg>
    ),
  },
  {
    name: "Solid",
    package: "@chartts/solid",
    slug: "solid",
    color: "#4f88c6",
    icon: (
      <svg viewBox="0 0 32 32" className="w-8 h-8">
        <path d="M5 24L2 8l12 4-3 16z" fill="none" stroke="#4f88c6" strokeWidth="1.2" />
        <path d="M14 12l12 4-3 16-12-4z" fill="none" stroke="#4f88c6" strokeWidth="1.2" opacity="0.7" />
        <path d="M18 4l12 4-6 8-12-4z" fill="none" stroke="#4f88c6" strokeWidth="1.2" opacity="0.5" />
      </svg>
    ),
  },
  {
    name: "Vanilla",
    package: "@chartts/core",
    slug: "vanilla",
    color: "#f59e0b",
    icon: (
      <svg viewBox="0 0 32 32" className="w-8 h-8">
        <text x="16" y="22" textAnchor="middle" fill="#f59e0b" fontSize="16" fontWeight="bold" fontFamily="monospace">JS</text>
      </svg>
    ),
  },
];

export function Frameworks() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="section-label text-cyan-400 mb-4">Frameworks</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight heading">
            Native everywhere.
            <br />
            <span className="faint-text">Not wrappers. Native packages.</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 max-w-4xl mx-auto">
          {frameworks.map((fw) => (
            <Link
              key={fw.name}
              href={`/docs/${fw.slug}`}
              className="group p-6 rounded-xl card transition-all text-center cursor-pointer"
            >
              <div className="flex justify-center mb-3 opacity-60 group-hover:opacity-100 transition-opacity">
                {fw.icon}
              </div>
              <p className="text-sm font-semibold heading mb-1">{fw.name}</p>
              <p className="text-xs font-mono muted-text">{fw.package}</p>
            </Link>
          ))}
        </div>

        {/* Same API callout */}
        <div className="mt-12 text-center">
          <p className="text-sm muted-text">
            Same API surface across every framework.{" "}
            <span className="heading">Learn once, use anywhere.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
