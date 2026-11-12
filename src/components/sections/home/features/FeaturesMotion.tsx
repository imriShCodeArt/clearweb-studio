"use client";

import type { ReactNode } from "react";

import {
  addCoinJump,
  addEntrance,
  armEntranceTimeline,
  createEntranceTimeline,
  motionTargets,
} from "@/animations/motion";
import { useMotionScope } from "@/components/motion";
import { gsap } from "@/lib/gsap";

export function FeaturesMotion({ children }: { children: ReactNode }) {
  const root = useMotionScope((scope) => {
    const items = motionTargets(scope, "item");
    const section = scope.querySelector<HTMLElement>("section") ?? scope;
    const media = gsap.matchMedia();

    media.add("(min-width: 1200px)", () => {
      const timeline = createEntranceTimeline();
      addEntrance(timeline, items, {
        direction: "bottom",
        distance: 24,
        stagger: 0.08,
      });

      items.forEach((item, index) => {
        const coin = item.querySelector<HTMLElement>('[data-motion="coin"]');
        if (coin) addCoinJump(timeline, coin, { at: index * 0.12 });
      });

      return armEntranceTimeline(timeline, section).cleanup;
    });

    media.add("(max-width: 1199.95px)", () => {
      const cleanups = items.map((item) => {
        const timeline = createEntranceTimeline();
        addEntrance(timeline, item, {
          direction: "bottom",
          distance: 24,
        });
        const coin = item.querySelector<HTMLElement>('[data-motion="coin"]');
        if (coin) addCoinJump(timeline, coin);
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
