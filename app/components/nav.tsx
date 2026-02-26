import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

export function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b adaptive-border">
      <div className="absolute inset-0 nav-bg backdrop-blur-xl" />
      <div className="relative mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <rect
                x="2"
                y="16"
                width="5"
                height="10"
                rx="1.5"
                fill="#06b6d4"
                opacity="0.4"
              />
              <rect
                x="9"
                y="10"
                width="5"
                height="16"
                rx="1.5"
                fill="#06b6d4"
                opacity="0.6"
              />
              <rect
                x="16"
                y="5"
                width="5"
                height="21"
                rx="1.5"
                fill="#06b6d4"
                opacity="0.85"
              />
              <rect
                x="23"
                y="2"
                width="5"
                height="24"
                rx="1.5"
                fill="#22d3ee"
              />
            </svg>
          </div>
          <span className="text-lg font-semibold tracking-tight heading transition-colors">
            Chart<span className="text-cyan-400">.ts</span>
          </span>
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/docs"
            className="text-sm nav-link cursor-pointer"
          >
            Docs
          </Link>
          <Link
            href="/demos"
            className="text-sm nav-link cursor-pointer"
          >
            Demos
          </Link>
          <Link
            href="/blog"
            className="text-sm nav-link cursor-pointer"
          >
            Blog
          </Link>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          {/* GitHub */}
          <a
            href="https://github.com/chartts/chartts"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg icon-btn cursor-pointer"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>

          {/* Get Started button */}
          <Link
            href="/docs"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-1.5 text-sm font-medium rounded-lg bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 hover:bg-cyan-500/20 hover:border-cyan-500/30 transition-all cursor-pointer"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}
