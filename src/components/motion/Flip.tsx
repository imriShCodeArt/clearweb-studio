"use client";

import { useRef } from "react";
import Box, { type BoxProps } from "@mui/material/Box";

import { beats, homeMotion } from "@/animations/home";
import { gsap, useGSAP } from "@/lib/gsap";

const FLIP = {
  perspective: 1000,
  initialRotation: -88,
  overshoot: 22,
  recoil: -14,
  returnSwing: 7,

  unfoldDuration: 0.72,
  recoilDuration: 0.32,
  returnDuration: 0.28,
  settleDuration: 0.36,
} as const;

function getParentDelay(element: HTMLElement): number | null {
  const parent = element.closest<HTMLElement>(
    `[data-animate="${beats.heroPanel}"]`,
  );

  if (!parent || parent === element) {
    return null;
  }

  const { at, duration } = homeMotion.hero.panel;

  return at + (duration ?? homeMotion.reveal.duration);
}

export function Flip({ sx, ...props }: BoxProps) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const element = root.current;
      if (!element) return;

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reducedMotion) return;

      const delay = getParentDelay(element);

      // Establish a real 3D hinge.
      // Do not squash or fade the element.
      gsap.set(element, {
        rotationX: FLIP.initialRotation,
        transformPerspective: FLIP.perspective,
        transformOrigin: "50% 0%",
        backfaceVisibility: "hidden",
        force3D: true,
        willChange: "transform",
      });

      const timeline = gsap.timeline({
        delay: delay ?? 0,

        scrollTrigger:
          delay === null
            ? {
                trigger: element,
                start: homeMotion.reveal.start,
                once: homeMotion.reveal.once,
                toggleActions: "play none none none",
              }
            : undefined,

        onComplete: () => {
          gsap.set(element, {
            clearProps: "willChange",
          });
        },
      });

      // 1. Unfold past the resting angle.
      timeline.to(element, {
        rotationX: FLIP.overshoot,
        duration: FLIP.unfoldDuration,
        ease: "sine.in",
      });

      // 2. Swing back past center.
      timeline.to(element, {
        rotationX: FLIP.recoil,
        duration: FLIP.recoilDuration,
        ease: "sine.inOut",
      });

      // 3. Rock forward once more, with less travel.
      timeline.to(element, {
        rotationX: FLIP.returnSwing,
        duration: FLIP.returnDuration,
        ease: "sine.inOut",
      });

      // 4. Settle flat.
      timeline.to(element, {
        rotationX: 0,
        duration: FLIP.settleDuration,
        ease: "power2.out",
      });
    },
    { scope: root },
  );

  return (
    <Box
      {...props}
      ref={root}
      data-animate={beats.flip}
      sx={[
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
        {
          transformOrigin: "50% 0%",
          backfaceVisibility: "hidden",

          // Prevent flashing before GSAP initializes.
          // Reduced-motion users see normal content.
          "@media (prefers-reduced-motion: no-preference)": {
            transform: `perspective(${FLIP.perspective}px) rotateX(${FLIP.initialRotation}deg)`,
          },
        },
      ]}
    />
  );
}
