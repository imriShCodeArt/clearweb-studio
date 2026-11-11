"use client";

import { useEffect, useRef, type ReactNode } from "react";

import { resetAboutSequence, watchAboutSequence } from "@/animations/aboutSequence";
import { useGSAP } from "@/lib/gsap";

type AboutMotionProps = {
  children: ReactNode;
};

export function AboutMotion({ children }: AboutMotionProps) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const scope = root.current;
      if (!scope) return;

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduceMotion) return;

      watchAboutSequence(scope);
    },
    { scope: root },
  );

  useEffect(() => () => resetAboutSequence(), []);

  return <div ref={root}>{children}</div>;
}
