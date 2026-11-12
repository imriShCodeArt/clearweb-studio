"use client";

import type { ReactNode } from "react";

import {
  addCount,
  addEntrance,
  armEntranceTimeline,
  createEntranceTimeline,
  motionTarget,
  motionTargets,
  motionTokens,
} from "@/animations/motion";
import { useMotionPage, useMotionScope } from "@/components/motion";

const fade = {
  duration: 0.5,
  ease: "power2.out",
} as const;

export function HeroMotion({ children }: { children: ReactNode }) {
  const page = useMotionPage();
  const root = useMotionScope((scope) => {
    const timeline = createEntranceTimeline();
    const cues = [
      ["eyebrow", 0.12, "top"],
      ["line1", 0.28, "top"],
      ["name", 0.46, undefined],
      ["role", 0.66, undefined],
      ["description", 0.84, undefined],
      ["portrait", 0.36, "bottom"],
    ] as const;

    for (const [name, at, direction] of cues) {
      const target = motionTarget(scope, name);
      if (target) {
        addEntrance(timeline, target, {
          at,
          direction,
          ...fade,
        });
      }
    }

    motionTargets(scope, "stat").forEach((stat, index) => {
      const at = 1.05 + index * 0.14;
      addEntrance(timeline, stat, { at, ...fade });

      const count = stat.querySelector<HTMLElement>('[data-motion="count"]');
      if (count) {
        addCount(timeline, count, {
          at: at + fade.duration - 0.4,
          duration: Number(count.dataset.countDuration),
        });
      }
    });

    if (page) timeline.eventCallback("onComplete", page.heroCompleted);

    const trigger = scope.querySelector<HTMLElement>("section") ?? scope;
    return armEntranceTimeline(timeline, trigger, motionTokens.entrance.start, {
      onPosition(position) {
        if (!page) return;
        if (position === "active") page.heroStarted();
        else page.heroDormant();
      },
      requestPlay: page
        ? (play) => {
            page.heroStarted();
            play();
          }
        : undefined,
    }).cleanup;
  });

  return <div ref={root}>{children}</div>;
}
