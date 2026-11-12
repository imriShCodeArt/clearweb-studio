"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";

import { ScrollTrigger } from "@/lib/gsap";

type HeroState = "pending" | "dormant" | "playing" | "released" | "complete";
type Play = () => void;

type MotionPageContextValue = {
  ready: boolean;
  heroDormant: () => void;
  heroStarted: () => void;
  heroCompleted: () => void;
  releaseHeroWaiters: () => void;
  waitForHero: (play: Play) => () => void;
};

const MotionPageContext = createContext<MotionPageContextValue | null>(null);

export function MotionPage({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return <MotionPageInstance key={pathname}>{children}</MotionPageInstance>;
}

function MotionPageInstance({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const heroState = useRef<HeroState>("pending");
  const heroWaiters = useRef(new Set<Play>());

  const flushHeroWaiters = useCallback(() => {
    const waiting = [...heroWaiters.current];
    heroWaiters.current.clear();
    for (const play of waiting) play();
  }, []);

  const heroDormant = useCallback(() => {
    if (heroState.current === "pending") {
      heroState.current = "dormant";
      flushHeroWaiters();
    }
  }, [flushHeroWaiters]);

  const heroStarted = useCallback(() => {
    if (
      heroState.current !== "released" &&
      heroState.current !== "complete"
    ) {
      heroState.current = "playing";
    }
  }, []);

  const heroCompleted = useCallback(() => {
    heroState.current = "complete";
    flushHeroWaiters();
  }, [flushHeroWaiters]);

  const releaseHeroWaiters = useCallback(() => {
    if (
      heroState.current === "pending" ||
      heroState.current === "playing"
    ) {
      heroState.current = "released";
      flushHeroWaiters();
    }
  }, [flushHeroWaiters]);

  const waitForHero = useCallback((play: Play) => {
    if (
      heroState.current === "pending" ||
      heroState.current === "playing"
    ) {
      heroWaiters.current.add(play);
      return () => heroWaiters.current.delete(play);
    }

    play();
    return () => {};
  }, []);

  useEffect(() => {
    let frame = 0;
    let previousY = window.scrollY;
    let stableFrames = 0;
    let elapsedFrames = 0;

    const settle = () => {
      elapsedFrames += 1;
      const nextY = window.scrollY;

      if (nextY === previousY) stableFrames += 1;
      else {
        previousY = nextY;
        stableFrames = 0;
      }

      if (stableFrames >= 2 || elapsedFrames >= 12) {
        setReady(true);
        return;
      }

      frame = requestAnimationFrame(settle);
    };

    frame = requestAnimationFrame(settle);
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!ready) return;

    const frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(frame);
  }, [ready]);

  const value = useMemo(
    () => ({
      ready,
      heroDormant,
      heroStarted,
      heroCompleted,
      releaseHeroWaiters,
      waitForHero,
    }),
    [
      ready,
      heroDormant,
      heroStarted,
      heroCompleted,
      releaseHeroWaiters,
      waitForHero,
    ],
  );

  return (
    <MotionPageContext.Provider value={value}>
      <div
        data-motion-page={ready ? "ready" : "pending"}
        style={{ display: "contents" }}
      >
        {children}
      </div>
    </MotionPageContext.Provider>
  );
}

export function useMotionPage() {
  return useContext(MotionPageContext);
}
