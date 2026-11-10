"use client";

import { useRef } from "react";
import Box from "@mui/material/Box";

import { gsap, useGSAP } from "@/lib/gsap";

const driftFrom = -80;

export function ServicesBackdrop() {
  const layer = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const element = layer.current;
    const page = element?.closest("[data-services-page]");

    if (!element || !page) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.fromTo(
      element,
      { y: driftFrom },
      {
        y: 140,
        ease: "none",
        scrollTrigger: {
          trigger: page,
          start: "top top",
          end: "bottom bottom",
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
        '[dir="rtl"] &': { transform: "scaleX(-1)" },
      }}
    >
      <Box
        ref={layer}
        sx={{
          position: "absolute",
          top: "-12%",
          right: 0,
          left: 0,
          height: "124%",
          overflowAnchor: "none",
          transform: `translateY(${driftFrom}px)`,
          "@media (prefers-reduced-motion: reduce)": {
            transform: "none",
          },
          opacity: 0.7,
          backgroundImage:
            "url(/services/services-bg-element-endless-bridge.png)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top",
          backgroundSize: { xs: "100vh", md: "cover" },
        }}
      />
    </Box>
  );
}
