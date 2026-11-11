"use client";

import { useRef } from "react";
import Box, { type BoxProps } from "@mui/material/Box";

import { homeMotion } from "@/animations/home";
import { whenHeroPlays } from "@/animations/heroGate";
import { whenSequenced } from "@/animations/sequences";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

const JUMP = {
  height: 34,
  rise: 0.22,
  fall: 0.3,
  spin: 0.35,
  spinAt: 0.12,
  perspective: 520,
} as const;

/** How long each coin waits after the one before it takes off. */
const coinJumpStagger = 0.12;

type CoinJumpProps = BoxProps & {
  delay?: number;
  order?: number;
};

export function CoinJump({
  delay = 0,
  order = 0,
  sx,
  ...props
}: CoinJumpProps) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const element = root.current;
      if (!element) return;

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduceMotion) return;

      gsap.set(element, {
        transformPerspective: JUMP.perspective,
        transformOrigin: "50% 50%",
        force3D: true,
      });

      const timeline = gsap.timeline({
        paused: true,
        onComplete: () => {
          gsap.set(element, { clearProps: "transform,transformOrigin" });
        },
      });

      timeline.to(
        element,
        { y: -JUMP.height, duration: JUMP.rise, ease: "power2.out" },
        0,
      );
      timeline.to(
        element,
        { y: 0, duration: JUMP.fall, ease: "power2.in" },
        JUMP.rise,
      );
      timeline.to(
        element,
        { rotationY: 360, duration: JUMP.spin, ease: "none" },
        JUMP.spinAt,
      );

      const pending: Array<{ kill: () => void }> = [];
      const begin = (mode?: "group" | "item") => {
        const across = window.matchMedia("(min-width: 900px)").matches;
        const wait =
          mode === "item" ? 0 : delay + (across ? order * coinJumpStagger : 0);
        pending.push(gsap.delayedCall(wait, () => timeline.play()));
      };

      if (element.closest("#hero")) whenHeroPlays(element, () => begin());
      else if (!whenSequenced(element, begin)) {
        ScrollTrigger.create({
          trigger: element,
          start: homeMotion.reveal.start,
          once: homeMotion.reveal.once,
          onEnter: () => begin(),
        });
      }

      return () => {
        for (const call of pending) call.kill();
      };
    },
    { scope: root, dependencies: [delay, order] },
  );

  return (
    <Box
      {...props}
      ref={root}
      sx={[
        { display: "grid", placeItems: "center" },
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
    />
  );
}
