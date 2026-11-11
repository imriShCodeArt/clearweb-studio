"use client";

import { useEffect, useRef, type ReactNode } from "react";

import {
  resetServicesSequence,
  watchServicesSequence,
} from "@/animations/servicesSequence";
import { useGSAP } from "@/lib/gsap";

type ServicesMotionProps = {
  children: ReactNode;
};

export function ServicesMotion({ children }: ServicesMotionProps) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const scope = root.current;
      if (!scope) return;

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduceMotion) return;

      watchServicesSequence(scope);
    },
    { scope: root },
  );

  useEffect(() => () => resetServicesSequence(), []);

  return <div ref={root}>{children}</div>;
}
