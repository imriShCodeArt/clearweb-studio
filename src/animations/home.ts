import { hingeSpan, type HingeTransition } from "./hinge";

/**
 * Home-page motion.
 *
 * beats          The data-animate name shared by the markup and HomeMotion.
 * homeMotion     Distances, durations, and eases. `hero` is when each
 *                hero piece starts. HomeMotion plays cues that name a beat.
 *                FadeIn, ReelText, and HingeDrop play the others.
 * motionStartCss The pose elements hold until GSAP runs.
 */

export const beats = {
  appBar: "appbar",
  heroPanel: "hero.panel",
  slide: "slide",
  reveal: "reveal",
  revealList: "reveal-list",
  revealSequence: "reveal-sequence",
  flip: "flip",
  hinge: "hinge",
  fade: "fade",
} as const;

const ease = "power3.out";
const rise = 24;

const appBar = {
  duration: 0.45,
  ease: "power2.out",
};

const slide = {
  x: 88,
  duration: 0.7,
};

const reveal = {
  start: "top 80%",
  duration: 0.7,
  stagger: 0.08,
  once: true,
};

const hinge = {
  perspective: 1000,
  rotateX: -86,
  overshoot: 8,
  rebound: -2.5,
  fade: 0.28,
  drop: 0.78,
  settle: 0.22,
  rest: 0.32,
};

const fade = {
  duration: 0.5,
  ease: "power2.out",
  distance: 28,
};

const sequence = {
  row: "(min-width: 1200px)",
  stack: "(max-width: 1199.95px)",
  stagger: 0.22,
  lead: 0.85,
};

type HeroFrom = {
  y?: number | string;
  yPercent?: number;
  autoAlpha?: number;
};

type Cue = {
  at: number;
  duration?: number;
  hinge?: HingeTransition;
};

type PlayedCue = Cue & {
  beat: (typeof beats)[keyof typeof beats];
  stagger?: number;
  from?: HeroFrom;
};

type HingeCue = Cue & {
  hinge: HingeTransition;
};

const descriptionHinge: HingeTransition = {
  duration: 1.2,
  overshoot: 30,
  rebound: -20,
  drop: 1.02,
  settle: 0.46,
  rest: 0.28,
};

const actionHinge: HingeTransition = {
  duration: 1.2,
  overshoot: 25,
  rebound: -17,
  drop: 0.92,
  settle: 0.36,
  rest: 0.28,
};

/** Hero entrance. `at` is seconds from page load. */
const hero: {
  panel: PlayedCue;
  eyebrow: Cue;
  line1: Cue;
  line2: Cue;
  description: HingeCue;
  start: HingeCue;
  process: HingeCue;
} = {
  panel: {
    beat: beats.heroPanel,
    at: 0.2,
    duration: 0.9,
    from: { yPercent: -100 },
  },
  eyebrow: { at: 0.9 },
  line1: { at: 1.22 },
  line2: { at: 1.25 },
  description: { at: 1.95, hinge: descriptionHinge },
  start: { at: 2.55, hinge: actionHinge },
  process: { at: 2.95, hinge: actionHinge },
};

export const homeMotion = {
  ease,
  rise,
  appBar,
  hero,
  slide,
  reveal,
  hinge,
  fade,
  sequence,
};

/** Seconds from load until the last hero cue has stopped moving. */
export function heroSettledAt() {
  return Math.max(
    ...Object.values(homeMotion.hero).map((cue) => {
      const span = cue.hinge ? hingeSpan(hinge, cue.hinge) : cue.duration ?? 0;
      return cue.at + span;
    }),
  );
}

export const motionStartCss = `
  html:not([data-intro]) [data-animate="${beats.appBar}"] { opacity: 0; }
  [data-animate="${beats.heroPanel}"] { transform: translateY(-100%); }
  [data-animate="${beats.slide}"][data-from="right"] {
    opacity: 0;
    transform: translateX(${slide.x}px);
  }
  [data-animate="${beats.slide}"][data-from="left"] {
    opacity: 0;
    transform: translateX(-${slide.x}px);
  }
  [data-animate="${beats.reveal}"] {
    opacity: 0;
    transform: translateY(${rise}px);
  }
  [data-animate="${beats.hinge}"] {
    opacity: 0;
    transform-origin: top center;
    transform: perspective(${hinge.perspective}px) rotateX(${hinge.rotateX}deg);
  }
  [data-animate="${beats.fade}"] { opacity: 0; }
  [data-animate="${beats.fade}"][data-from="left"] {
    transform: translateX(-${fade.distance}px);
  }
  [data-animate="${beats.fade}"][data-from="right"] {
    transform: translateX(${fade.distance}px);
  }
  [data-animate="${beats.fade}"][data-from="top"] {
    transform: translateY(-${fade.distance}px);
  }
  [data-animate="${beats.fade}"][data-from="bottom"] {
    transform: translateY(${fade.distance}px);
  }
  @media (prefers-reduced-motion: reduce) {
    [data-animate="${beats.appBar}"],
    [data-animate="${beats.heroPanel}"],
    [data-animate="${beats.slide}"],
    [data-animate="${beats.reveal}"],
    [data-animate="${beats.hinge}"],
    [data-animate="${beats.fade}"] {
      opacity: 1;
      transform: none;
    }
  }
`;
