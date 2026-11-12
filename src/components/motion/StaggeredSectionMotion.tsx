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
  type MotionDirection,
} from "@/animations/motion";
import { gsap } from "@/lib/gsap";

import { useMotionPage } from "./MotionPage";
import { useMotionScope } from "./useMotionScope";

type StaggeredSectionMotionProps = {
  children: ReactNode;
  start?: string;
  end?: string;
  lead?: number;
  stagger?: number;
  headingDirection?: MotionDirection;
  itemDirection?: MotionDirection;
  waitForHero?: boolean;
  heroBypassStart?: string;
};

export function StaggeredSectionMotion({
  children,
  start = motionTokens.entrance.start,
  end = motionTokens.entrance.end,
  lead = motionTokens.sequence.lead,
  stagger = motionTokens.sequence.stagger,
  headingDirection = "top",
  itemDirection = "bottom",
  waitForHero = false,
  heroBypassStart = motionTokens.entrance.heroBypass,
}: StaggeredSectionMotionProps) {
  const page = useMotionPage();
  const root = useMotionScope((scope) => {
    const heading = motionTarget(scope, "heading");
    const items = motionTargets(scope, "item");
    const section = scope.querySelector<HTMLElement>("section") ?? scope;
    const media = gsap.matchMedia();
    const requestPlay =
      waitForHero && page ? page.waitForHero : undefined;
    const removeBypass =
      waitForHero && page
        ? armDownwardThreshold(
            section,
            heroBypassStart,
            page.releaseHeroWaiters,
          )
        : undefined;

    media.add("(min-width: 1200px)", () => {
      const timeline = createEntranceTimeline();
      if (heading) {
        addEntrance(timeline, heading, { direction: headingDirection });
      }
      addEntrance(timeline, items, {
        at: heading ? lead : 0,
        direction: itemDirection,
        stagger,
      });

      return armEntranceTimeline(timeline, section, start, {
        end,
        requestPlay,
      }).cleanup;
    });

    media.add("(max-width: 1199.95px)", () => {
      const cleanups: Array<() => void> = [];

      if (heading) {
        const timeline = createEntranceTimeline();
        addEntrance(timeline, heading, {
          direction: headingDirection,
        });
        cleanups.push(
          armEntranceTimeline(timeline, heading, start, {
            end,
            requestPlay,
          }).cleanup,
        );
      }
      for (const item of items) {
        const timeline = createEntranceTimeline();
        addEntrance(timeline, item, {
          direction: itemDirection,
        });
        cleanups.push(
          armEntranceTimeline(timeline, item, start, {
            end,
            requestPlay,
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
