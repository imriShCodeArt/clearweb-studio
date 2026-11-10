"use client";

import { useRef } from "react";
import Box, { type BoxProps } from "@mui/material/Box";

import { whenHeroPlays } from "@/animations/heroGate";
import { beats, homeMotion } from "@/animations/home";
import {
  resolveHinge,
  swingDuration,
  swingTargets,
  type HingeTransition,
} from "@/animations/hinge";
import { gsap, useGSAP } from "@/lib/gsap";

export type { HingeTransition };

type HingeDropProps = BoxProps & {
  delay?: number;
  transition?: HingeTransition;
};

function hingeMotion(transition?: HingeTransition) {
  return resolveHinge(homeMotion.hinge, transition);
}

export function HingeDrop({
  delay = 0,
  transition,
  ...props
}: HingeDropProps) {
  const root = useRef<HTMLElement>(null);
  const motion = hingeMotion(transition);

  useGSAP(
    () => {
      const element = root.current;
      if (!element) return;

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduceMotion) return;

      const { reveal } = homeMotion;

      gsap.set(element, {
        autoAlpha: 0,
        rotateX: motion.rotateX,
        transformOrigin: "top center",
        transformPerspective: motion.perspective,
      });

      const inHero = Boolean(element.closest("#hero"));
      const timeline = gsap.timeline(
        inHero
          ? { paused: true }
          : {
              scrollTrigger: {
                trigger: element,
                start: reveal.start,
                once: reveal.once,
              },
            },
      );

      const targets = swingTargets(motion.overshoot, motion.rebound);
      let from = motion.rotateX;

      targets.forEach((to, index) => {
        const duration = swingDuration(from, to, index, targets, motion);
        const ease =
          index === 0
            ? "power3.out"
            : index === targets.length - 1
              ? "power2.out"
              : "sine.inOut";

        timeline.to(
          element,
          { rotateX: to, duration, ease },
          index === 0 ? delay : undefined,
        );

        if (index === 0) {
          timeline.to(
            element,
            { autoAlpha: 1, duration: motion.fade, ease: "power2.out" },
            delay,
          );
        }

        from = to;
      });

      if (inHero) whenHeroPlays(element, () => timeline.play());
    },
    {
      scope: root,
      dependencies: [
        delay,
        motion.rotateX,
        motion.overshoot,
        motion.rebound,
        motion.fade,
        motion.drop,
        motion.settle,
        motion.rest,
      ],
    },
  );

  return <Box ref={root} {...props} data-animate={beats.hinge} />;
}
