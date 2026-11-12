"use client";

import { useRef } from "react";
import Box, { type BoxProps } from "@mui/material/Box";

import { gsap, useGSAP } from "@/lib/gsap";

export function Intro(props: BoxProps) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const page = document.documentElement;
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduceMotion) {
        page.dataset.intro = "1";
        return;
      }

      if (page.dataset.intro === "1" || !root.current) return;

      gsap.fromTo(
        root.current,
        { autoAlpha: 0 },
        {
          autoAlpha: 1,
          duration: 0.45,
          ease: "power2.out",
          immediateRender: true,
          onComplete: () => {
            page.dataset.intro = "1";
          },
        },
      );
    },
    { scope: root },
  );

  return <Box ref={root} {...props} />;
}
