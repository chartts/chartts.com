import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Use Cases | Chart.ts",
  description:
    "See how Chart.ts powers dashboards across industries. SaaS analytics, financial reporting, admin panels, IoT monitoring, and more.",
};

const useCases = [
  {
    slug: "saas-dashboard",
    name: "SaaS Dashboard",
    tagline: "MRR, churn, activation funnels, cohort retention",
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
    color: "text-cyan-400",
  },
  {
    slug: "financial-analytics",
    name: "Financial Analytics",
    tagline: "Candlesticks, P&L waterfalls, portfolio allocation, risk gauges",
    icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    color: "text-emerald-400",
  },
  {
    slug: "admin-panel",
    name: "Admin Panel",
    tagline: "User metrics, system health, activity logs, role breakdown",
    icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
    color: "text-amber-400",
  },
  {
    slug: "iot-monitoring",
    name: "IoT Monitoring",
    tagline: "Real-time sensors, device heatmaps, uptime gauges, alerts",
    icon: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z",
    color: "text-rose-400",
  },
  {
    slug: "ecommerce",
    name: "E-Commerce",
    tagline: "Revenue trends, conversion funnels, product mix, geo sales",
    icon: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z",
    color: "text-violet-400",
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    tagline: "Patient metrics, lab results, bed occupancy, trend analysis",
    icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
    color: "text-pink-400",
  },
  {
    slug: "startup-mvp",
    name: "Startup MVP",
    tagline: "Ship fast with pre-built chart components, zero config",
    icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
    color: "text-sky-400",
  },
  {
    slug: "trading-platform",
    name: "Trading Platform",
    tagline: "Candlestick charts, technical indicators, real-time WebSocket streaming",
    icon: "M3 13h2v8H3zm4-4h2v12H7zm4 2h2v10h-2zm4-6h2v16h-2zm4 4h2v12h-2z",
    color: "text-emerald-400",
  },
  {
    slug: "scientific-research",
    name: "Scientific Research",
    tagline: "3D plots, violin distributions, statistical analysis, publication-quality SVG",
    icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
    color: "text-purple-400",
  },
  {
    slug: "network-monitoring",
    name: "Network Monitoring",
    tagline: "Topology graphs, geo maps, real-time streaming, WebGL for 100k+ metrics",
    icon: "M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01",
    color: "text-orange-400",
  },
  {
    slug: "supply-chain",
    name: "Supply Chain Analytics",
    tagline: "Sankey flows, logistics maps, inventory treemaps, cost waterfalls",
    icon: "M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4",
    color: "text-teal-400",
  },
  {
    slug: "operations-center",
    name: "Operations Center",
    tagline: "Mission-critical dashboards, WebGL scatter, real-time KPIs, global maps",
    icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    color: "text-red-400",
  },
];

export default function UseCasesPage() {
  return (
    <>
      <section className="pt-24 sm:pt-32 pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight heading">
            Use Cases
          </h1>
          <p className="mt-4 text-lg body-text max-w-2xl mx-auto">
            See how Chart.ts powers dashboards and data visualization across
            industries. Pre-built chart components, Tailwind CSS styling, under 15kb.
          </p>
        </div>
      </section>

      <section className="pb-24 px-6">
        <div className="max-w-3xl mx-auto grid gap-4">
          {useCases.map((uc) => (
            <Link
              key={uc.slug}
              href={`/use-cases/${uc.slug}`}
              className="group flex items-center gap-5 p-6 rounded-xl card hover:border-cyan-500/20 transition-all cursor-pointer"
            >
              <div className={`w-10 h-10 shrink-0 flex items-center justify-center rounded-lg bg-current/5 ${uc.color}`}>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d={uc.icon} />
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold heading group-hover:text-cyan-400 transition-colors">
                  {uc.name}
                </h2>
                <p className="mt-1 text-sm body-text">{uc.tagline}</p>
              </div>
              <svg
                className="w-5 h-5 muted-text group-hover:text-cyan-400 transition-colors shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
