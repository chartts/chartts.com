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
  metadataBase: new URL("https://chartts.com"),
  title: {
    default: "Chart.ts - Beautiful charts. Zero config. <15kb.",
    template: "%s | Chart.ts",
  },
  description:
    "The design-native charting library. SVG-first, under 15kb gzipped, Tailwind CSS native. Native packages for React, Vue, Svelte, Solid, Angular. 40+ chart types. TypeScript-first. WCAG accessible. MIT license, free forever.",
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
    "charting library",
    "chart.ts",
    "chartts",
  ],
  openGraph: {
    title: "Chart.ts - Beautiful charts. Zero config.",
    description:
      "SVG-first charting library. Under 15kb. Tailwind native. React, Vue, Svelte, Solid, Angular. 40+ chart types. MIT license.",
    url: "https://chartts.com",
    siteName: "Chart.ts",
    type: "website",
    images: [
      {
        url: "https://chartts.com/og.png",
        width: 1200,
        height: 630,
        alt: "Chart.ts - Beautiful charts. Tiny bundle. Every framework.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chart.ts - Beautiful charts. Zero config.",
    description:
      "The design-native charting library. Under 15kb, SVG-first, Tailwind native, WCAG accessible. Free forever.",
    images: ["https://chartts.com/og.png"],
  },
  alternates: {
    canonical: "https://chartts.com",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Chart.ts",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  url: "https://chartts.com",
  description:
    "Design-native charting library. SVG-first, under 15kb gzipped, Tailwind CSS native. 40+ chart types. React, Vue, Svelte, Solid, Angular.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  license: "https://opensource.org/licenses/MIT",
  codeRepository: "https://github.com/chartts/chartts",
  programmingLanguage: "TypeScript",
};

import { Nav } from "./components/nav";
import { Footer } from "./components/footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${outfit.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <Nav />
        <main className="bg-dots bg-mesh min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
