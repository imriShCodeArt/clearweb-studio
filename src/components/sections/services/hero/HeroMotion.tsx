"use client";

import type { ReactNode } from "react";

import {
  addEntrance,
  armEntranceTimeline,
  createEntranceTimeline,
  motionTarget,
  motionTokens,
} from "@/animations/motion";
import { useMotionPage, useMotionScope } from "@/components/motion";

export function HeroMotion({ children }: { children: ReactNode }) {
  const page = useMotionPage();
  const root = useMotionScope((scope) => {
    const timeline = createEntranceTimeline();
    const cues = [
      ["eyebrow", 0.12, "top"],
      ["line1", 0.28, "top"],
      ["line2", 0.46, undefined],
      ["description", 0.66, undefined],
      ["art", 0.36, "bottom"],
    ] as const;

    for (const [name, at, direction] of cues) {
      const target = motionTarget(scope, name);
      if (target) {
        addEntrance(timeline, target, {
          at,
          direction,
          duration: 0.5,
          ease: "power2.out",
        });
      }
    }

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
