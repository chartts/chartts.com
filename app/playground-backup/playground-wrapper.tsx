"use client";

import dynamic from "next/dynamic";

const PlaygroundApp = dynamic(() => import("./playground-app"), { ssr: false });

export default function PlaygroundWrapper() {
  return <PlaygroundApp />;
}
