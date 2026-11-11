"use client";

import { useRef } from "react";
import Box from "@mui/material/Box";

import { gsap, useGSAP } from "@/lib/gsap";

const driftFrom = 80;

export function AboutBackdrop() {
  const layer = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const element = layer.current;
    const page = element?.closest("[data-about-page]");

    if (!element || !page) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.fromTo(
      element,
      { y: driftFrom },
      {
        y: -200,
        ease: "none",
        scrollTrigger: {
          trigger: page,
          start: "bottom 180%",
          end: "bottom 12%",
          scrub: true,
        },
      },
    );
  });

  return (
    <Box
      aria-hidden
      sx={{
        position: "absolute",
        zIndex: 0,
        inset: 0,
        overflow: "hidden",
        overflowAnchor: "none",
        pointerEvents: "none",
        '[dir="ltr"] &': { transform: "scaleX(-1)" },
      }}
    >
      <Box
        ref={layer}
        sx={{
          position: "absolute",
          right: 0,
          bottom: 0,
          left: 0,
          aspectRatio: "2172 / 473",
          overflowAnchor: "none",
          transform: `translateY(${driftFrom}px)`,
          "@media (prefers-reduced-motion: reduce)": {
            transform: "none",
          },
          backgroundImage: "url(/about/drive/about-drive-section-bg-image.png)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center bottom",
          backgroundSize: {xs: "100% auto", xl:"100% auto"},
          opacity:0.75
        }}
      />
    </Box>
  );
}
