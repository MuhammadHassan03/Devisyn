"use client";

import dynamic from "next/dynamic";
import { OnVisible } from "@/components/ui/OnVisible";

const Stage = dynamic(() => import("./LiveDemoStage").then((m) => m.LiveDemoStage), { ssr: false });

/** The demo only loads and hydrates when it is about to scroll into view. */
export function LiveDemoLazy() {
  return (
    <OnVisible minHeight="var(--demo-min-height)">
      <Stage />
    </OnVisible>
  );
}
