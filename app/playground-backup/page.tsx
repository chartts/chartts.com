import type { Metadata } from "next";
import PlaygroundWrapper from "./playground-wrapper";

export const metadata: Metadata = {
  title: "Playground | Chart.ts",
  description:
    "Visual chart builder. Pick a chart type, edit data, customize styling, and export code for React, Vue, Svelte, Angular, or vanilla JS.",
};

export default function PlaygroundPage() {
  return <PlaygroundWrapper />;
}
