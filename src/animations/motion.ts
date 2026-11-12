import { gsap, ScrollTrigger } from "@/lib/gsap";

export const motionTokens = {
  entrance: {
    duration: 0.7,
    ease: "power3.out",
    rise: 24,
    distance: 58,
    start: "top 60%",
    end: "bottom 35%",
    heroBypass: "top 35%",
  },
  sequence: {
    lead: 0.22,
    stagger: 0.14,
    wideStagger: 0.22,
  },
} as const;

export type MotionDirection = "left" | "right" | "top" | "bottom";

type EntranceOptions = {
  at?: number | string;
  direction?: MotionDirection;
  distance?: number;
  duration?: number;
  ease?: string;
  stagger?: number;
};

type CountOptions = {
  at?: number | string;
  duration?: number;
};

type ReelOptions = {
  at?: number;
  duration?: number;
  stagger?: number;
};

type CoinOptions = {
  at?: number | string;
};

type MotionTarget = HTMLElement | HTMLElement[];
type Play = () => void;

export type EntrancePosition = "above" | "active" | "below";

type ArmEntranceOptions = {
  end?: string;
  onPosition?: (position: EntrancePosition) => void;
  requestPlay?: (play: Play) => void | (() => void);
};

export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function motionTargets(scope: ParentNode, name: string) {
  return gsap.utils.toArray<HTMLElement>(`[data-motion="${name}"]`, scope);
}

export function motionTarget(scope: ParentNode, name: string) {
  return scope.querySelector<HTMLElement>(`[data-motion="${name}"]`);
}

export function createEntranceTimeline() {
  return gsap.timeline({ paused: true });
}

export function entrancePosition(
  trigger: HTMLElement,
  start: string,
  end: string,
) {
  const startRatio =
    Number(start.match(/(-?\d+(?:\.\d+)?)%/)?.[1] ?? 60) / 100;
  const endRatio =
    Number(end.match(/(-?\d+(?:\.\d+)?)%/)?.[1] ?? 35) / 100;
  const rect = trigger.getBoundingClientRect();

  if (rect.bottom <= window.innerHeight * endRatio) return "above" as const;
  if (rect.top <= window.innerHeight * startRatio) return "active" as const;
  return "below" as const;
}

export function armEntranceTimeline(
  timeline: gsap.core.Timeline,
  trigger: HTMLElement,
  start: string = motionTokens.entrance.start,
  {
    end = motionTokens.entrance.end,
    onPosition,
    requestPlay,
  }: ArmEntranceOptions = {},
) {
  const position = entrancePosition(trigger, start, end);
  let armed = false;
  let requested = false;
  let cancelled = false;
  let cancelRequest: (() => void) | undefined;
  let scrollTrigger: ReturnType<typeof ScrollTrigger.create> | null = null;

  const play = () => {
    if (cancelled) return;
    timeline.play();
  };

  const request = () => {
    if (requested || cancelled) return;
    requested = true;
    scrollTrigger?.kill();

    const cleanup = requestPlay?.(play);
    if (typeof cleanup === "function") cancelRequest = cleanup;
    else if (!requestPlay) play();
  };

  scrollTrigger = ScrollTrigger.create({
    trigger,
    start,
    end,
    onEnter: () => {
      if (armed) request();
    },
    onEnterBack: () => {
      if (armed) request();
    },
  });

  onPosition?.(position);
  if (position === "active") request();

  const frame = requestAnimationFrame(() => {
    armed = true;
  });

  return {
    position,
    cleanup() {
      cancelled = true;
      cancelAnimationFrame(frame);
      cancelRequest?.();
      scrollTrigger?.kill();
    },
  };
}

export function armDownwardThreshold(
  trigger: HTMLElement,
  start: string,
  onCross: () => void,
) {
  let armed = false;
  const scrollTrigger = ScrollTrigger.create({
    trigger,
    start,
    onEnter(self) {
      if (armed && self.direction === 1) onCross();
    },
  });
  const frame = requestAnimationFrame(() => {
    armed = true;
  });

  return () => {
    cancelAnimationFrame(frame);
    scrollTrigger.kill();
  };
}

export function addEntrance(
  timeline: gsap.core.Timeline,
  target: MotionTarget,
  {
    at = 0,
    direction,
    distance = motionTokens.entrance.distance,
    duration = motionTokens.entrance.duration,
    ease = motionTokens.entrance.ease,
    stagger = 0,
  }: EntranceOptions = {},
) {
  const shift =
    direction === "left"
      ? { x: -distance }
      : direction === "right"
        ? { x: distance }
        : direction === "top"
          ? { y: -distance }
          : direction === "bottom"
            ? { y: distance }
            : {};
  const settled =
    direction === "left" || direction === "right"
      ? { x: 0 }
      : direction
        ? { y: 0 }
        : {};

  timeline.fromTo(
    target,
    { autoAlpha: 0, ...shift },
    {
      autoAlpha: 1,
      ...settled,
      duration,
      ease,
      stagger,
      immediateRender: true,
    },
    at,
  );
}

export function addCount(
  timeline: gsap.core.Timeline,
  root: HTMLElement,
  { at = 0, duration }: CountOptions = {},
) {
  const output = root.querySelector<HTMLElement>("[data-count]");
  const target = Number(root.dataset.countValue);
  if (!output || !Number.isFinite(target)) return;

  const suffix = root.dataset.countSuffix ?? "";
  const places = Number(root.dataset.countPlaces ?? 0);
  const proxy = { value: 0 };
  const render = (value: number) => {
    const shown = places === 0 ? Math.round(value) : value.toFixed(places);
    output.textContent = `${shown}${suffix}`;
  };

  render(0);
  timeline.to(
    proxy,
    {
      value: target,
      duration: duration ?? Number(root.dataset.countDuration ?? 1.6),
      ease: "none",
      onUpdate: () => render(proxy.value),
    },
    at,
  );
}

export function addReel(
  timeline: gsap.core.Timeline,
  root: HTMLElement,
  { at = 0, duration = 0.9, stagger = 0.028 }: ReelOptions = {},
) {
  const strips = gsap.utils.toArray<HTMLElement>("[data-reel]", root);

  strips.forEach((strip, index) => {
    const reel = strip.parentElement;
    if (!reel) return;

    timeline.fromTo(
      strip,
      {
        y: () => -(strip.offsetHeight - reel.offsetHeight),
        autoAlpha: 0,
      },
      {
        y: 0,
        autoAlpha: 1,
        duration,
        ease: "power4.out",
        immediateRender: true,
      },
      at + index * stagger,
    );
  });
}

export function addCoinJump(
  timeline: gsap.core.Timeline,
  element: HTMLElement,
  { at = 0 }: CoinOptions = {},
) {
  const rise = 0.22;
  const fall = 0.3;
  const jump = gsap.timeline();

  gsap.set(element, {
    transformPerspective: 520,
    transformOrigin: "50% 50%",
    force3D: true,
  });

  jump.to(element, { y: -34, duration: rise, ease: "power2.out" }, 0);
  jump.to(element, { y: 0, duration: fall, ease: "power2.in" }, rise);
  jump.to(element, { rotationY: 360, duration: 0.35, ease: "none" }, 0.12);
  jump.set(element, { clearProps: "transform,transformOrigin" });
  timeline.add(jump, at);
}
