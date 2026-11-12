"use client";

import type { ReactNode } from "react";

import {
  addEntrance,
  armEntranceTimeline,
  createEntranceTimeline,
  motionTargets,
} from "@/animations/motion";
import { useMotionScope } from "@/components/motion";
import { gsap } from "@/lib/gsap";

export function BuildMotion({ children }: { children: ReactNode }) {
  const root = useMotionScope((scope) => {
    const intro = motionTargets(scope, "intro");
    const cards = motionTargets(scope, "card");
    const section = scope.querySelector<HTMLElement>("section") ?? scope;
    const media = gsap.matchMedia();

    media.add("(min-width: 1200px)", () => {
      const timeline = createEntranceTimeline();
      addEntrance(timeline, intro, {
        direction: "bottom",
        distance: 24,
        stagger: 0.22,
      });
      addEntrance(timeline, cards, {
        at: 0.96,
        direction: "bottom",
        distance: 24,
        stagger: 0.08,
      });

      return armEntranceTimeline(timeline, section).cleanup;
    });

    media.add("(max-width: 1199.95px)", () => {
      const cleanups = [...intro, ...cards].map((item) => {
        const timeline = createEntranceTimeline();
        addEntrance(timeline, item, {
          direction: "bottom",
          distance: 24,
        });
        return armEntranceTimeline(timeline, item).cleanup;
      });

      return () => {
        for (const cleanup of cleanups) cleanup();
      };
    });

    return () => media.revert();
  });

  return <div ref={root}>{children}</div>;
}
