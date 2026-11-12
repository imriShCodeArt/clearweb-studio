"use client";

import { useRef } from "react";

import { prefersReducedMotion } from "@/animations/motion";
import { useGSAP } from "@/lib/gsap";

import { useMotionPage } from "./MotionPage";

type MotionSetup = (scope: HTMLDivElement) => void | (() => void);

export function useMotionScope(setup: MotionSetup) {
  const root = useRef<HTMLDivElement>(null);
  const page = useMotionPage();
  const ready = page?.ready ?? true;

  useGSAP(
    () => {
      const scope = root.current;
      if (!ready || !scope || prefersReducedMotion()) return;

      return setup(scope);
    },
    { scope: root, dependencies: [ready], revertOnUpdate: true },
  );

  return root;
}
