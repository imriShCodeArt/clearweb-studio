import { gsap } from "@/lib/gsap";

const SWING_DECAY = 0.6;
const MIN_SWING = 2.5;

export type HingeBase = {
  perspective: number;
  rotateX: number;
  overshoot: number;
  rebound: number;
  fade: number;
  drop: number;
  settle: number;
  rest: number;
};

export type HingeTransition = {
  /** Scales fade, drop, settle, and rest when a phase duration is omitted. */
  duration?: number;
  /** Starting fold, in degrees. */
  rotateX?: number;
  /**
   * How far the hinge first swings past flat, in degrees.
   * A larger value also deepens the return, adds more swings,
   * and lengthens any phase duration left unset.
   */
  overshoot?: number;
  /** First swing back, in degrees. Later swings decay from this. */
  rebound?: number;
  fade?: number;
  /** Seconds for the opening swing. */
  drop?: number;
  /** Seconds for the first swing back. Later swings are shorter. */
  settle?: number;
  /** Seconds for the final ease to flat. */
  rest?: number;
};

export type HingeMotion = {
  rotateX: number;
  overshoot: number;
  rebound: number;
  perspective: number;
  fade: number;
  drop: number;
  settle: number;
  rest: number;
};

export function resolveHinge(
  base: HingeBase,
  transition?: HingeTransition,
): HingeMotion {
  const overshoot = transition?.overshoot ?? base.overshoot;
  const energy = Math.abs(overshoot) / Math.abs(base.overshoot);
  const scale = (transition?.duration ?? 1) * Math.sqrt(energy);
  const direction = Math.sign(overshoot) || 1;

  return {
    rotateX: transition?.rotateX ?? base.rotateX,
    overshoot,
    rebound:
      transition?.rebound ?? -direction * Math.abs(overshoot) * SWING_DECAY,
    perspective: base.perspective,
    fade: transition?.fade ?? base.fade * scale,
    drop: transition?.drop ?? base.drop * scale,
    settle: transition?.settle ?? base.settle * scale,
    rest: transition?.rest ?? base.rest * scale,
  };
}

export function swingTargets(overshoot: number, rebound: number) {
  const targets = [overshoot];
  let amplitude = Math.abs(rebound);
  let direction = Math.sign(rebound) || -Math.sign(overshoot) || -1;

  while (amplitude >= MIN_SWING && targets.length < 8) {
    targets.push(direction * amplitude);
    amplitude *= SWING_DECAY;
    direction *= -1;
  }

  targets.push(0);
  return targets;
}

export function swingDuration(
  from: number,
  to: number,
  index: number,
  targets: number[],
  motion: HingeMotion,
) {
  if (index === 0) return motion.drop;
  if (index === targets.length - 1) return motion.rest;

  const openingReturn = Math.abs(targets[1] - targets[0]) || 1;
  const travel = Math.abs(to - from) / openingReturn;

  return Math.max(0.1, motion.settle * Math.max(travel, 0.5));
}

export function addHinge(
  timeline: gsap.core.Timeline,
  element: HTMLElement,
  base: HingeBase,
  transition: HingeTransition | undefined,
  at: number | string,
) {
  const motion = resolveHinge(base, transition);
  const targets = swingTargets(motion.overshoot, motion.rebound);
  const hinge = gsap.timeline();
  let from = motion.rotateX;

  gsap.set(element, {
    autoAlpha: 0,
    rotateX: motion.rotateX,
    transformOrigin: "top center",
    transformPerspective: motion.perspective,
  });

  targets.forEach((to, index) => {
    const duration = swingDuration(from, to, index, targets, motion);
    const ease =
      index === 0
        ? "power3.out"
        : index === targets.length - 1
          ? "power2.out"
          : "sine.inOut";

    hinge.to(element, { rotateX: to, duration, ease });
    if (index === 0) {
      hinge.to(
        element,
        { autoAlpha: 1, duration: motion.fade, ease: "power2.out" },
        0,
      );
    }
    from = to;
  });

  timeline.add(hinge, at);
}
