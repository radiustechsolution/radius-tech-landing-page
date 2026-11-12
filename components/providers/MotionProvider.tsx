"use client";

import { MotionConfig } from "motion/react";
import { DESKTOP_QUERY, useMediaQuery } from "@/lib/useMedia";

/**
 * On phones/tablets every motion animation drops its movement
 * (slide, scale, float) and keeps only simple fades.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  const desktop = useMediaQuery(DESKTOP_QUERY);
  return (
    <MotionConfig reducedMotion={desktop ? "user" : "always"}>
      {children}
    </MotionConfig>
  );
}
