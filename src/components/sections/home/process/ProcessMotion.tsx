"use client";

import type { ReactNode } from "react";

import {
  addEntrance,
  armDownwardThreshold,
  armEntranceTimeline,
  createEntranceTimeline,
  motionTarget,
  motionTargets,
  motionTokens,
} from "@/animations/motion";
import { useMotionPage, useMotionScope } from "@/components/motion";
import { gsap } from "@/lib/gsap";

export function ProcessMotion({ children }: { children: ReactNode }) {
  const page = useMotionPage();
  const root = useMotionScope((scope) => {
    const heading = motionTarget(scope, "heading");
    const items = motionTargets(scope, "item");
    const section = scope.querySelector<HTMLElement>("section") ?? scope;
    const media = gsap.matchMedia();
    const removeBypass = page
      ? armDownwardThreshold(
          section,
          motionTokens.entrance.heroBypass,
          page.releaseHeroWaiters,
        )
      : undefined;

    media.add("(min-width: 1200px)", () => {
      const timeline = createEntranceTimeline();
      if (heading) {
        addEntrance(timeline, heading, {
          direction: "right",
          distance: 88,
        });
      }
      addEntrance(timeline, items, {
        at: 0.85,
        direction: "bottom",
        distance: 24,
        stagger: 0.22,
      });

      return armEntranceTimeline(timeline, section, undefined, {
        requestPlay: page?.waitForHero,
      }).cleanup;
    });

    media.add("(max-width: 1199.95px)", () => {
      const cleanups: Array<() => void> = [];

      if (heading) {
        const timeline = createEntranceTimeline();
        addEntrance(timeline, heading, {
          direction: "right",
          distance: 88,
        });
        cleanups.push(
          armEntranceTimeline(timeline, heading, undefined, {
            requestPlay: page?.waitForHero,
          }).cleanup,
        );
      }
      for (const item of items) {
        const timeline = createEntranceTimeline();
        addEntrance(timeline, item, {
          direction: "bottom",
          distance: 24,
        });
        cleanups.push(
          armEntranceTimeline(timeline, item, undefined, {
            requestPlay: page?.waitForHero,
          }).cleanup,
        );
      }

      return () => {
        for (const cleanup of cleanups) cleanup();
      };
    });

    return () => {
      removeBypass?.();
      media.revert();
    };
  });

  return <div ref={root}>{children}</div>;
}
