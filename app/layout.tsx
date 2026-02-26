import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Chart.ts - Beautiful charts. Zero config. <15kb.",
  description:
    "The design-native charting library. SVG-first, <15kb gzipped, Tailwind CSS native. Native packages for React, Vue, Svelte, Solid. TypeScript-first. WCAG accessible. 12 chart types including candlestick, waterfall, funnel, gauge. MIT license, free forever.",
  keywords: [
    "chart library",
    "SVG charts",
    "React chart library",
    "Vue chart library",
    "Svelte charts",
    "Solid charts",
    "Tailwind CSS charts",
    "TypeScript chart library",
    "lightweight chart library",
    "accessible charts",
    "WCAG charts",
    "candlestick chart",
    "data visualization",
    "open source charts",
    "free chart library",
    "design-native charts",
  ],
  openGraph: {
    title: "Chart.ts - Beautiful charts. Zero config.",
    description:
      "SVG-first charting library. <15kb. Tailwind native. React, Vue, Svelte, Solid. 12 chart types. MIT license.",
    url: "https://chartts.com",
    siteName: "Chart.ts",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chart.ts - Beautiful charts. Zero config.",
    description:
      "The design-native charting library. <15kb, SVG-first, Tailwind native, WCAG accessible. Free forever.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${outfit.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
