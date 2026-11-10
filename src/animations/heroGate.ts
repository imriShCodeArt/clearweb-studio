import { heroSettledAt } from "@/animations/home";

/**
 * The hero entrance plays on load only when the hero is the section in view.
 * A refresh that lands lower on the page plays that section immediately and
 * holds the hero until the reader scrolls back up to it.
 */

type Play = () => void;

const HERO = "#hero";

let generation = 0;
let decision: "pending" | "now" | "later" = "pending";
let startedAt = 0;
let settleFrame = 0;
let unlisten: (() => void) | null = null;
let waiters: Play[] = [];

function heroHasFocus(hero: HTMLElement) {
  const rect = hero.getBoundingClientRect();
  const mid = window.innerHeight / 2;
  return rect.top < mid && rect.bottom > mid;
}

function flush() {
  const queued = waiters.splice(0);
  for (const play of queued) play();
}

function release() {
  if (decision === "now") return;

  unlisten?.();
  unlisten = null;
  decision = "now";
  startedAt = performance.now();
  flush();
}

function watchForReturn(hero: HTMLElement) {
  let lastY = window.scrollY;

  const onScroll = () => {
    const y = window.scrollY;
    const scrollingUp = y < lastY;
    lastY = y;
    if (!scrollingUp || !hero.isConnected) return;

    const token = generation;
    requestAnimationFrame(() => {
      if (token !== generation || decision === "now" || !hero.isConnected) return;
      if (heroHasFocus(hero)) release();
    });
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  unlisten = () => window.removeEventListener("scroll", onScroll);
}

export function resetHeroGate() {
  generation += 1;
  cancelAnimationFrame(settleFrame);
  unlisten?.();
  unlisten = null;
  waiters = [];
  decision = "pending";
  startedAt = 0;
}

/** Wait until scroll restoration has landed, then run. */
export function afterScrollSettles(run: () => void) {
  const token = generation;
  let y = window.scrollY;
  let stable = 0;
  let elapsed = 0;

  const tick = () => {
    if (token !== generation) return;

    elapsed += 1;
    const next = window.scrollY;
    if (next === y) stable += 1;
    else {
      y = next;
      stable = 0;
    }

    if (stable >= 2 || elapsed >= 8) run();
    else settleFrame = requestAnimationFrame(tick);
  };

  settleFrame = requestAnimationFrame(tick);
}

/** Call once scroll has settled, before any hero tween plays. */
export function beginHeroGate(hero: HTMLElement) {
  if (decision !== "pending") return;

  if (heroHasFocus(hero)) {
    decision = "now";
    startedAt = performance.now();
    flush();
    return;
  }

  decision = "later";
  watchForReturn(hero);
}

export function whenHeroPlays(element: HTMLElement, play: Play) {
  if (!element.closest(HERO)) {
    play();
    return;
  }

  if (decision === "now") {
    play();
    return;
  }

  waiters.push(play);
}

/** Seconds the process section should wait while the hero entrance is running. */
export function heroEntranceHold() {
  if (decision !== "now") return 0;

  const elapsed = (performance.now() - startedAt) / 1000;
  return Math.max(0, heroSettledAt() - elapsed);
}
