"use client";

import type { ReactNode } from "react";

import { addHinge, type HingeBase, type HingeTransition } from "@/animations/hinge";
import {
  addEntrance,
  addReel,
  armEntranceTimeline,
  createEntranceTimeline,
  motionTarget,
  motionTokens,
} from "@/animations/motion";
import { useMotionPage, useMotionScope } from "@/components/motion";

const hinge: HingeBase = {
  perspective: 1000,
  rotateX: -86,
  overshoot: 8,
  rebound: -2.5,
  fade: 0.28,
  drop: 0.78,
  settle: 0.22,
  rest: 0.32,
};

const descriptionHinge: HingeTransition = {
  duration: 1.2,
  overshoot: 30,
  rebound: -20,
  drop: 1.02,
  settle: 0.46,
  rest: 0.28,
};

const actionHinge: HingeTransition = {
  duration: 1.2,
  overshoot: 25,
  rebound: -17,
  drop: 0.92,
  settle: 0.36,
  rest: 0.28,
};

export function HeroMotion({ children }: { children: ReactNode }) {
  const page = useMotionPage();
  const root = useMotionScope((scope) => {
    const timeline = createEntranceTimeline();
    const panel = motionTarget(scope, "panel");
    const eyebrow = motionTarget(scope, "eyebrow");
    const line1 = motionTarget(scope, "line1");
    const line2 = motionTarget(scope, "line2");
    const description = motionTarget(scope, "description");
    const start = motionTarget(scope, "start");
    const process = motionTarget(scope, "process");
    const screens = motionTarget(scope, "screens");

    if (panel) {
      timeline.fromTo(
        panel,
        { yPercent: -100 },
        {
          yPercent: 0,
          duration: 0.9,
          ease: "power3.out",
          immediateRender: true,
        },
        0.2,
      );
    }
    if (eyebrow) {
      addEntrance(timeline, eyebrow, {
        at: 0.9,
        direction: "top",
        duration: 0.5,
        ease: "power2.out",
      });
    }
    if (line1) addReel(timeline, line1, { at: 1.22 });
    if (line2) addReel(timeline, line2, { at: 1.25 });
    if (description) {
      addHinge(timeline, description, hinge, descriptionHinge, 1.95);
    }
    if (start) addHinge(timeline, start, hinge, actionHinge, 2.55);
    if (process) addHinge(timeline, process, hinge, actionHinge, 2.95);
    if (screens) {
      addEntrance(timeline, screens, {
        at: 3.85,
        direction: "bottom",
        duration: 2,
        ease: "power2.out",
      });
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
