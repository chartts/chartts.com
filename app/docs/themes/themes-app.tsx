"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { renderToString, lineChartType, resolveTheme } from "@chartts/core/all";
import type { ThemeConfig } from "@chartts/core";
import { EXTRA_THEMES } from "@chartts/themes";

// ---------------------------------------------------------------------------
// Sample data for chart previews
// ---------------------------------------------------------------------------

const previewData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  series: [
    { name: "Revenue", values: [42, 58, 71, 64, 82, 96] },
    { name: "Costs", values: [35, 42, 48, 45, 55, 62] },
  ],
};

// ---------------------------------------------------------------------------
// Built-in themes (resolved from string names)
// ---------------------------------------------------------------------------

const BUILTIN_NAMES = [
  "dark",
  "light",
  "corporate",
  "saas",
  "startup",
  "editorial",
  "ocean",
] as const;

function getThemeConfig(
  name: string,
): { config: ThemeConfig; isBuiltin: boolean } {
  if ((BUILTIN_NAMES as readonly string[]).includes(name)) {
    return { config: resolveTheme(name), isBuiltin: true };
  }
  const extra = EXTRA_THEMES[name];
  if (extra) return { config: extra, isBuiltin: false };
  return { config: resolveTheme("dark"), isBuiltin: false };
}

// ---------------------------------------------------------------------------
// Category definitions
// ---------------------------------------------------------------------------

interface ThemeCategory {
  name: string;
  description: string;
  themes: string[];
}

const CATEGORIES: ThemeCategory[] = [
  {
    name: "Built-in",
    description: "Ship with @chartts/core. No extra install needed.",
    themes: ["dark", "light", "corporate", "saas", "startup", "editorial", "ocean"],
  },
  {
    name: "Editor",
    description: "Inspired by popular code editors and color schemes.",
    themes: [
      "monokai", "github-light", "github-dark", "ayu-light", "ayu-dark",
      "panda", "cobalt", "night-owl", "palenight", "andromeda",
    ],
  },
  {
    name: "Brand",
    description: "Color palettes inspired by well-known products.",
    themes: [
      "stripe", "vercel", "linear", "figma", "notion", "slack", "spotify", "discord",
    ],
  },
  {
    name: "Popular",
    description: "Community favorites from terminal and editor themes.",
    themes: [
      "nord", "dracula", "catppuccin", "tokyo-night", "gruvbox", "one-dark",
      "rose-pine", "solarized-light", "solarized-dark", "synthwave", "cyberpunk",
    ],
  },
  {
    name: "Data Viz",
    description: "Based on established data visualization standards.",
    themes: [
      "tableau", "d3-category10", "observable", "economist", "bloomberg", "financial-times",
    ],
  },
  {
    name: "Nature",
    description: "Palettes drawn from the natural world.",
    themes: [
      "forest", "ocean-deep", "volcanic", "aurora", "coral-reef", "rainforest",
      "desert-sand", "earth", "arctic", "autumn", "spring", "sunset",
    ],
  },
  {
    name: "Modern UI",
    description: "Contemporary design system aesthetics.",
    themes: [
      "glassmorphism", "neomorphism", "flat-design", "metro", "ios-light",
      "ios-dark", "carbon", "frost", "material", "minimal",
    ],
  },
  {
    name: "Artistic",
    description: "Bold creative styles for standout charts.",
    themes: [
      "art-deco", "bauhaus", "pop-art", "impressionist", "brutalist", "glitch",
      "sketchy", "chalk", "watercolor", "blueprint", "newspaper",
    ],
  },
  {
    name: "Industry",
    description: "Tuned for specific business domains.",
    themes: [
      "healthcare", "fintech", "gaming", "education", "government",
      "saas-dark", "saas-light", "startup-bold",
    ],
  },
  {
    name: "Corporate",
    description: "Professional palettes for enterprise dashboards.",
    themes: [
      "corporate-blue", "corporate-green", "corporate-red", "luxury", "vintage", "retro",
    ],
  },
  {
    name: "Accessibility",
    description: "Optimized for contrast and color vision deficiencies.",
    themes: [
      "high-contrast-light", "high-contrast-dark", "colorblind-safe", "deuteranopia-safe",
    ],
  },
  {
    name: "Seasonal",
    description: "Evoke the mood of the seasons.",
    themes: ["winter", "summer", "harvest", "blossom"],
  },
  {
    name: "Regional",
    description: "Cultural and geographic color inspirations.",
    themes: ["sakura", "terracotta", "jade", "sahara", "fjord", "caribbean"],
  },
  {
    name: "Classic",
    description: "Timeless palettes that always work.",
    themes: ["neon", "pastel", "monochrome", "midnight"],
  },
];

// Total count across all categories (unique)
const ALL_THEME_NAMES = Array.from(
  new Set(CATEGORIES.flatMap((c) => c.themes)),
);

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function renderPreview(
  themeName: string,
  width: number,
  height: number,
): string | null {
  try {
    const { config, isBuiltin } = getThemeConfig(themeName);
    const themeArg: string | ThemeConfig = isBuiltin ? themeName : config;
    const svg = renderToString(lineChartType, previewData, {
      width,
      height,
      theme: themeArg as any,
    });
    return svg;
  } catch {
    return null;
  }
}

function formatThemeName(name: string): string {
  return name
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function getCodeSnippet(name: string, isBuiltin: boolean): string {
  if (isBuiltin) {
    return `import { LineChart } from "@chartts/react"

<LineChart
  data={data}
  theme="${name}"
/>`;
  }
  return `import { LineChart } from "@chartts/react"
import { EXTRA_THEMES } from "@chartts/themes"

<LineChart
  data={data}
  theme={EXTRA_THEMES["${name}"]}
/>`;
}

// ---------------------------------------------------------------------------
// ThemeCard component
// ---------------------------------------------------------------------------

function ThemeCard({
  name,
  isSelected,
  onSelect,
}: {
  name: string;
  isSelected: boolean;
  onSelect: (name: string) => void;
}) {
  const svg = useMemo(() => renderPreview(name, 280, 140), [name]);
  const { config } = useMemo(() => getThemeConfig(name), [name]);
  const colors = config.colors.slice(0, 6);

  return (
    <button
      onClick={() => onSelect(name)}
      className={`group text-left rounded-xl overflow-hidden transition-all duration-200 cursor-pointer ${
        isSelected
          ? "ring-2 ring-cyan-400 ring-offset-2 ring-offset-[var(--c-bg)]"
          : "hover:border-[var(--c-border-hover)]"
      }`}
      style={{
        background: "var(--c-card-bg)",
        border: `1px solid ${isSelected ? "rgba(6,182,212,0.4)" : "var(--c-border)"}`,
      }}
    >
      {/* Chart preview */}
      <div
        className="relative overflow-hidden"
        style={{
          background: config.background === "transparent"
            ? (config.gridColor.startsWith("#")
                ? config.gridColor + "18"
                : "var(--c-bg-surface)")
            : config.background,
        }}
      >
        {svg ? (
          <div
            className="w-full [&>svg]:w-full [&>svg]:h-auto [&>svg]:block"
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        ) : (
          <div className="w-full h-[140px] flex items-center justify-center">
            <span className="muted-text text-xs">Preview unavailable</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="px-3 py-2.5">
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span className="text-sm font-medium heading truncate">
            {formatThemeName(name)}
          </span>
          {(BUILTIN_NAMES as readonly string[]).includes(name) && (
            <span className="shrink-0 px-1.5 py-0.5 rounded text-[10px] font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              built-in
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          {colors.map((c, i) => (
            <span
              key={i}
              className="w-4 h-4 rounded-full shrink-0"
              style={{
                background: c,
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            />
          ))}
        </div>
      </div>
    </button>
  );
}

// ---------------------------------------------------------------------------
// ThemeDetail component (expanded view on selection)
// ---------------------------------------------------------------------------

function ThemeDetail({
  name,
  onClose,
}: {
  name: string;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const detailRef = useRef<HTMLDivElement>(null);

  const { config, isBuiltin } = useMemo(() => getThemeConfig(name), [name]);
  const largeSvg = useMemo(() => renderPreview(name, 600, 300), [name]);
  const snippet = useMemo(() => getCodeSnippet(name, isBuiltin), [name, isBuiltin]);

  useEffect(() => {
    if (detailRef.current) {
      detailRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [name]);

  const copyCode = useCallback(() => {
    navigator.clipboard.writeText(snippet).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [snippet]);

  const allColors = config.colors;

  // Metadata rows
  const meta = [
    { label: "Font", value: config.fontFamily.split(",")[0].replace(/"/g, "") },
    { label: "Grid", value: config.gridStyle },
    { label: "Radius", value: `${config.borderRadius}px` },
    { label: "Line width", value: `${config.lineWidth}px` },
  ];

  return (
    <div
      ref={detailRef}
      className="rounded-xl overflow-hidden animate-fade-in"
      style={{
        background: "var(--c-card-bg)",
        border: "1px solid var(--c-border)",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 py-3"
        style={{ borderBottom: "1px solid var(--c-border)" }}
      >
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-bold heading">{formatThemeName(name)}</h3>
          {isBuiltin && (
            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              built-in
            </span>
          )}
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg muted-text hover:text-[var(--c-text-heading)] hover:bg-[var(--c-card-bg)] transition-colors cursor-pointer"
          aria-label="Close detail"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        {/* Left: Large chart preview */}
        <div
          className="p-4"
          style={{
            background: config.background === "transparent"
              ? (config.gridColor.startsWith("#")
                  ? config.gridColor + "18"
                  : "var(--c-bg-surface)")
              : config.background,
          }}
        >
          {largeSvg ? (
            <div
              className="w-full [&>svg]:w-full [&>svg]:h-auto [&>svg]:block rounded-lg overflow-hidden"
              dangerouslySetInnerHTML={{ __html: largeSvg }}
            />
          ) : (
            <div className="w-full h-[300px] flex items-center justify-center">
              <span className="muted-text">Preview unavailable</span>
            </div>
          )}
        </div>

        {/* Right: Theme details */}
        <div className="p-5 space-y-5" style={{ borderLeft: "1px solid var(--c-border)" }}>
          {/* Full palette */}
          <div>
            <p className="section-label text-cyan-400 mb-2">Color Palette</p>
            <div className="flex flex-wrap gap-1.5">
              {allColors.map((c, i) => (
                <div key={i} className="group/swatch relative">
                  <span
                    className="block w-8 h-8 rounded-lg cursor-pointer transition-transform hover:scale-110"
                    style={{
                      background: c,
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                    title={c}
                  />
                  <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] font-mono muted-text opacity-0 group-hover/swatch:opacity-100 transition-opacity whitespace-nowrap">
                    {c}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Theme metadata */}
          <div>
            <p className="section-label text-cyan-400 mb-2">Properties</p>
            <div className="grid grid-cols-2 gap-2">
              {meta.map((m) => (
                <div key={m.label} className="text-sm">
                  <span className="muted-text">{m.label}: </span>
                  <span className="heading font-mono text-xs">{m.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Code snippet */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="section-label text-cyan-400">Usage</p>
              <button
                onClick={copyCode}
                className="text-xs px-2 py-1 rounded muted-text hover:text-cyan-400 transition-colors cursor-pointer"
                style={{
                  background: "var(--c-input-bg)",
                  border: "1px solid var(--c-border)",
                }}
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <pre
              className="text-xs leading-relaxed font-mono rounded-lg p-3 overflow-x-auto"
              style={{
                background: "var(--c-bg-surface)",
                border: "1px solid var(--c-border)",
                color: "var(--c-text-body)",
              }}
            >
              {snippet}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Search + filter
// ---------------------------------------------------------------------------

function useThemeSearch(query: string) {
  return useMemo(() => {
    if (!query.trim()) return null;
    const q = query.toLowerCase();
    const matched = ALL_THEME_NAMES.filter(
      (name) =>
        name.includes(q) ||
        formatThemeName(name).toLowerCase().includes(q),
    );
    return matched;
  }, [query]);
}

// ---------------------------------------------------------------------------
// Main page component
// ---------------------------------------------------------------------------

export default function ThemesApp() {
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const searchResults = useThemeSearch(searchQuery);
  const isSearching = searchQuery.trim().length > 0;

  const handleSelect = useCallback(
    (name: string) => {
      setSelectedTheme((prev) => (prev === name ? null : name));
    },
    [],
  );

  const totalCount = ALL_THEME_NAMES.length;
  const categoryCount = CATEGORIES.length;

  // Category refs for scrolling
  const categoryRefs = useRef<Record<string, HTMLElement | null>>({});

  const scrollToCategory = useCallback((cat: string) => {
    setActiveCategory(cat);
    setSearchQuery("");
    const el = categoryRefs.current[cat];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <div className="max-w-6xl">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <p className="section-label text-cyan-400">Documentation</p>
          <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            {totalCount}+ themes
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight heading">
          Theme Presets
        </h1>
        <p className="mt-4 text-lg body-text leading-relaxed max-w-2xl">
          Every theme comes with a complete configuration: colors, typography,
          spacing, and styling. Click any theme to see the code.
        </p>
      </div>

      {/* Stats bar */}
      <div
        className="flex flex-wrap items-center gap-4 sm:gap-6 px-5 py-3 rounded-xl mb-8"
        style={{
          background: "var(--c-card-bg)",
          border: "1px solid var(--c-border)",
        }}
      >
        {[
          { label: "Themes", value: `${totalCount}+` },
          { label: "Categories", value: String(categoryCount) },
          { label: "Dark & Light", value: "Yes" },
          { label: "Accessible", value: "WCAG AA" },
        ].map((stat) => (
          <div key={stat.label} className="flex items-center gap-2 text-sm">
            <span className="font-bold heading">{stat.value}</span>
            <span className="muted-text">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Search + category pills */}
      <div className="mb-8 space-y-4">
        {/* Search */}
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 muted-text"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search themes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg text-sm transition-colors outline-none"
            style={{
              background: "var(--c-input-bg)",
              border: "1px solid var(--c-border)",
              color: "var(--c-text)",
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 muted-text hover:text-[var(--c-text-heading)] cursor-pointer"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.name}
              onClick={() => scrollToCategory(cat.name)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeCategory === cat.name
                  ? "bg-cyan-500/15 text-cyan-400 border border-cyan-500/30"
                  : "muted-text hover:text-[var(--c-text-heading)]"
              }`}
              style={
                activeCategory !== cat.name
                  ? {
                      background: "var(--c-card-bg)",
                      border: "1px solid var(--c-border)",
                    }
                  : undefined
              }
            >
              {cat.name}
              <span className="ml-1 opacity-60">{cat.themes.length}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Search results */}
      {isSearching && (
        <div className="mb-12">
          <p className="text-sm muted-text mb-4">
            {searchResults?.length ?? 0} result{(searchResults?.length ?? 0) !== 1 ? "s" : ""} for &ldquo;{searchQuery}&rdquo;
          </p>
          {searchResults && searchResults.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {searchResults.map((name) => (
                  <ThemeCard
                    key={name}
                    name={name}
                    isSelected={selectedTheme === name}
                    onSelect={handleSelect}
                  />
                ))}
              </div>
              {selectedTheme && searchResults.includes(selectedTheme) && (
                <div className="mt-6">
                  <ThemeDetail
                    name={selectedTheme}
                    onClose={() => setSelectedTheme(null)}
                  />
                </div>
              )}
            </>
          ) : (
            <p className="body-text">No themes match your search.</p>
          )}
        </div>
      )}

      {/* Category sections */}
      {!isSearching &&
        CATEGORIES.map((cat) => {
          // Filter to only themes that actually exist
          const available = cat.themes.filter(
            (t) =>
              (BUILTIN_NAMES as readonly string[]).includes(t) ||
              EXTRA_THEMES[t] !== undefined,
          );

          if (available.length === 0) return null;

          return (
            <section
              key={cat.name}
              ref={(el) => { categoryRefs.current[cat.name] = el; }}
              className="mb-14 scroll-mt-24"
            >
              {/* Category header */}
              <div className="mb-5">
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-xl font-bold heading">{cat.name}</h2>
                  <span className="text-xs font-mono muted-text">
                    {available.length} theme{available.length !== 1 ? "s" : ""}
                  </span>
                </div>
                <p className="text-sm body-text">{cat.description}</p>
              </div>

              {/* Theme grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {available.map((name) => (
                  <ThemeCard
                    key={name}
                    name={name}
                    isSelected={selectedTheme === name}
                    onSelect={handleSelect}
                  />
                ))}
              </div>

              {/* Expanded detail (shown below grid for this category) */}
              {selectedTheme && available.includes(selectedTheme) && (
                <div className="mt-6">
                  <ThemeDetail
                    name={selectedTheme}
                    onClose={() => setSelectedTheme(null)}
                  />
                </div>
              )}
            </section>
          );
        })}

      {/* Install callout */}
      <div
        className="rounded-xl p-6 mb-8"
        style={{
          background: "var(--c-card-bg)",
          border: "1px solid var(--c-border)",
        }}
      >
        <h3 className="text-lg font-bold heading mb-2">
          Using extra themes
        </h3>
        <p className="body-text text-sm mb-4">
          The 7 built-in themes ship with <code className="font-mono text-xs px-1.5 py-0.5 rounded" style={{ background: "var(--c-input-bg)", border: "1px solid var(--c-border)" }}>@chartts/core</code>.
          All other themes require the themes package:
        </p>
        <pre
          className="text-sm font-mono rounded-lg p-4 overflow-x-auto"
          style={{
            background: "var(--c-bg-surface)",
            border: "1px solid var(--c-border)",
            color: "var(--c-text-body)",
          }}
        >
{`npm install @chartts/themes`}
        </pre>
        <p className="body-text text-sm mt-4">
          Then import <code className="font-mono text-xs px-1.5 py-0.5 rounded" style={{ background: "var(--c-input-bg)", border: "1px solid var(--c-border)" }}>EXTRA_THEMES</code> and
          pass any theme config directly to your chart&apos;s <code className="font-mono text-xs px-1.5 py-0.5 rounded" style={{ background: "var(--c-input-bg)", border: "1px solid var(--c-border)" }}>theme</code> prop.
          Every theme is tree-shakeable when imported individually.
        </p>
      </div>
    </div>
  );
}
