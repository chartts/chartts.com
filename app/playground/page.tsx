import type { Metadata } from "next";
import PlaygroundApp from "./playground-app";

export const metadata: Metadata = {
  title: "Playground | Chart.ts",
  description:
    "Visual chart builder. Pick a chart type, edit data, customize styling, and export code for React, Vue, Svelte, Angular, or vanilla JS.",
};

export default function PlaygroundPage() {
  return <PlaygroundApp />;
}
