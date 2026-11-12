"use client";

import type { ReactNode } from "react";

import {
  addEntrance,
  armEntranceTimeline,
  createEntranceTimeline,
  motionTargets,
  motionTokens,
  type MotionDirection,
} from "@/animations/motion";

import { useMotionScope } from "./useMotionScope";

type CascadeMotionProps = {
  children: ReactNode;
  start?: string;
  end?: string;
  stagger?: number;
  direction?: MotionDirection;
  distance?: number;
};

export function CascadeMotion({
  children,
  start = motionTokens.entrance.start,
  end = motionTokens.entrance.end,
  stagger = motionTokens.sequence.wideStagger,
  direction = "bottom",
  distance = motionTokens.entrance.rise,
}: CascadeMotionProps) {
  const root = useMotionScope((scope) => {
    const timeline = createEntranceTimeline();
    addEntrance(timeline, motionTargets(scope, "item"), {
      direction,
      distance,
      stagger,
    });

    const trigger = scope.querySelector<HTMLElement>("section") ?? scope;
    return armEntranceTimeline(timeline, trigger, start, { end }).cleanup;
  });

  return <div ref={root}>{children}</div>;
}
