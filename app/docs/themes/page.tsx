import type { Metadata } from "next";
import ThemesApp from "./themes-app";

export const metadata: Metadata = {
  title: "100+ Theme Presets | Chart.ts Documentation",
  description:
    "Browse 100+ theme presets for Chart.ts. Every theme includes colors, typography, spacing, and styling. Preview live charts with Nord, Dracula, Catppuccin, Solarized, and many more.",
};

export default function ThemesPage() {
  return <ThemesApp />;
}
