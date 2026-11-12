"use client";

import type { ReactNode } from "react";

import {
  addCoinJump,
  addEntrance,
  armEntranceTimeline,
  createEntranceTimeline,
  motionTarget,
  motionTargets,
} from "@/animations/motion";
import { useMotionScope } from "@/components/motion";
import { gsap } from "@/lib/gsap";

export function DriveMotion({ children }: { children: ReactNode }) {
  const root = useMotionScope((scope) => {
    const heading = motionTarget(scope, "heading");
    const values = motionTargets(scope, "value");
    const section = scope.querySelector<HTMLElement>("section") ?? scope;
    const media = gsap.matchMedia();

    media.add("(min-width: 1200px)", () => {
      const timeline = createEntranceTimeline();
      if (heading) addEntrance(timeline, heading, { direction: "top" });

      values.forEach((value, index) => {
        const at = 0.22 + index * 0.14;
        addEntrance(timeline, value, { at, direction: "bottom" });
        const coin = value.querySelector<HTMLElement>('[data-motion="coin"]');
        if (coin) addCoinJump(timeline, coin, { at });
      });

      return armEntranceTimeline(timeline, section).cleanup;
    });

    media.add("(max-width: 1199.95px)", () => {
      const cleanups: Array<() => void> = [];

      if (heading) {
        const timeline = createEntranceTimeline();
        addEntrance(timeline, heading, { direction: "top" });
        cleanups.push(
          armEntranceTimeline(timeline, heading).cleanup,
        );
      }
      for (const value of values) {
        const timeline = createEntranceTimeline();
        addEntrance(timeline, value, { direction: "bottom" });
        const coin = value.querySelector<HTMLElement>('[data-motion="coin"]');
        if (coin) addCoinJump(timeline, coin);
        cleanups.push(
          armEntranceTimeline(timeline, value).cleanup,
        );
      }

      return () => {
        for (const cleanup of cleanups) cleanup();
      };
    });

    return () => media.revert();
  });

  return <div ref={root}>{children}</div>;
}
