"use client";

import { useRef } from "react";
import Box, { type BoxProps } from "@mui/material/Box";

import { whenHeroPlays } from "@/animations/heroGate";
import { beats, homeMotion } from "@/animations/home";
import { gsap, useGSAP } from "@/lib/gsap";

const distance = homeMotion.fade.distance;

const shift = {
  left: { x: -distance },
  right: { x: distance },
  top: { y: -distance },
  bottom: { y: distance },
} as const;

export type FadeFrom = keyof typeof shift;

type FadeInProps = BoxProps & {
  delay?: number;
  duration?: number;
  /** Edge the fade travels in from. Omit for an opacity-only fade. */
  from?: FadeFrom;
};

export function FadeIn({
  delay = 0,
  duration = homeMotion.fade.duration,
  from,
  ...props
}: FadeInProps) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const element = root.current;
      if (!element) return;

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduceMotion) return;

      const settled =
        from === "left" || from === "right" ? { x: 0 } : from ? { y: 0 } : {};

      const tween = gsap.fromTo(
        element,
        { autoAlpha: 0, ...(from ? shift[from] : {}) },
        {
          autoAlpha: 1,
          ...settled,
          duration,
          delay,
          ease: homeMotion.fade.ease,
          paused: true,
          immediateRender: true,
        },
      );

      whenHeroPlays(element, () => tween.play());
    },
    { scope: root, dependencies: [delay, duration, from] },
  );

  return (
    <Box
      ref={root}
      {...props}
      data-animate={beats.fade}
      {...(from ? { "data-from": from } : {})}
    />
  );
}
