import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Sections play in page order. A section already on screen waits until the
 * one above it finishes. On a phone, scrolling to a section starts the items
 * already in view; items still below wait until the reader reaches them.
 * A hero plays every item once that hero starts.
 */

type PlayMode = "group" | "item";
type Play = (mode: PlayMode) => void;

type Waiter = {
  element: HTMLElement;
  play: Play;
  played: boolean;
};

type SectionSequence = {
  sections: readonly string[];
  spanFor: (element: HTMLElement) => number;
  generation: number;
  settleFrame: number;
  start: string;
  arming: boolean;
  started: Set<string>;
  waiters: Map<string, Waiter[]>;
  cleanups: Array<() => void>;
  listening: boolean;
  whenPlays: (element: HTMLElement, play: Play) => void;
};

const sequences: SectionSequence[] = [];

function selector(sequence: SectionSequence) {
  return sequence.sections.map((id) => `#${id}`).join(", ");
}

function sectionOf(sequence: SectionSequence, element: HTMLElement) {
  return element.closest<HTMLElement>(selector(sequence));
}

function onScreen(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  return rect.bottom > 0 && rect.top < window.innerHeight;
}

/** Share of the viewport the section currently occupies. */
export function shownShare(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  const view = window.innerHeight;
  if (view <= 0) return 0;

  const visible = Math.min(rect.bottom, view) - Math.max(rect.top, 0);
  return Math.max(0, visible) / view;
}

/**
 * Join the opening once `share` of the screen is already showing the section.
 * The scroll line is the same moment for a section still coming up the page.
 */
export function openingAt(share: number) {
  const line = Math.round((1 - share) * 100);

  return {
    inOpening(element: HTMLElement) {
      return shownShare(element) >= share;
    },
    start: `top ${line}%`,
  };
}

/** Phones reveal stacked items one by one. A hero plays its whole entrance together. */
function itemByItem(sectionId?: string) {
  if (sectionId === "hero" || sectionId?.endsWith("-hero")) return false;
  return window.matchMedia("(max-width: 599.95px)").matches;
}

function entered(element: HTMLElement, start: string) {
  const ratio = Number(start.match(/(\d+(?:\.\d+)?)%/)?.[1] ?? 80) / 100;
  const rect = element.getBoundingClientRect();
  return rect.bottom > 0 && rect.top <= window.innerHeight * ratio;
}

function finish(waiter: Waiter, mode: PlayMode) {
  if (waiter.played) return;
  waiter.played = true;
  waiter.play(mode);
}

function releaseWaiting(sequence: SectionSequence) {
  for (const [id, queued] of sequence.waiters) {
    if (!itemByItem(id) || !sequence.started.has(id)) continue;

    const rest: Waiter[] = [];
    for (const waiter of queued) {
      if (!waiter.played && entered(waiter.element, sequence.start)) finish(waiter, "item");
      if (!waiter.played) rest.push(waiter);
    }
    sequence.waiters.set(id, rest);
  }
}

function ensureScroll(sequence: SectionSequence) {
  if (sequence.listening) return;
  sequence.listening = true;

  const onScroll = () => releaseWaiting(sequence);
  window.addEventListener("scroll", onScroll, { passive: true });
  sequence.cleanups.push(() => {
    window.removeEventListener("scroll", onScroll);
    sequence.listening = false;
  });
}

function flush(sequence: SectionSequence, id: string) {
  if (sequence.started.has(id)) return;

  sequence.started.add(id);
  const queued = sequence.waiters.get(id) ?? [];

  if (!itemByItem(id)) {
    sequence.waiters.set(id, []);
    for (const waiter of queued) finish(waiter, "group");
    return;
  }

  const rest: Waiter[] = [];
  for (const waiter of queued) {
    if (entered(waiter.element, sequence.start)) finish(waiter, "group");
    else rest.push(waiter);
  }
  sequence.waiters.set(id, rest);
  releaseWaiting(sequence);
}

function armScroll(sequence: SectionSequence, element: HTMLElement, start: string) {
  const trigger = ScrollTrigger.create({
    trigger: element,
    start,
    onEnter() {
      if (sequence.arming) return;
      flush(sequence, element.id);
      trigger.kill();
    },
    onEnterBack() {
      if (sequence.arming) return;
      flush(sequence, element.id);
      trigger.kill();
    },
  });

  sequence.cleanups.push(() => trigger.kill());
}

export function createSectionSequence(
  sections: readonly string[],
  spanFor: (element: HTMLElement) => number,
  opening: { inOpening: (element: HTMLElement) => boolean; start: string } = {
    inOpening: onScreen,
    start: "top 80%",
  },
) {
  const sequence = {
    sections,
    spanFor,
    generation: 0,
    settleFrame: 0,
    start: opening.start,
    arming: false,
    listening: false,
    started: new Set<string>(),
    waiters: new Map<string, Waiter[]>(),
    cleanups: [] as Array<() => void>,
  } as SectionSequence;

  sequence.whenPlays = (element, play) => {
    const section = sectionOf(sequence, element);
    if (!section) {
      play("group");
      return;
    }

    const waiter: Waiter = { element, play, played: false };
    if (itemByItem(section.id)) ensureScroll(sequence);

    if (sequence.started.has(section.id)) {
      if (!itemByItem(section.id) || entered(element, sequence.start)) {
        finish(waiter, itemByItem(section.id) ? "item" : "group");
      } else {
        const queued = sequence.waiters.get(section.id) ?? [];
        queued.push(waiter);
        sequence.waiters.set(section.id, queued);
      }
      return;
    }

    const queued = sequence.waiters.get(section.id) ?? [];
    queued.push(waiter);
    sequence.waiters.set(section.id, queued);
  };

  sequences.push(sequence);

  function reset() {
    sequence.generation += 1;
    cancelAnimationFrame(sequence.settleFrame);
    for (const cleanup of sequence.cleanups) cleanup();
    sequence.cleanups.length = 0;
    sequence.started.clear();
    sequence.waiters.clear();
    sequence.arming = false;
    sequence.listening = false;
  }

  function settle(run: () => void) {
    const token = sequence.generation;
    let y = window.scrollY;
    let stable = 0;
    let elapsed = 0;

    const tick = () => {
      if (token !== sequence.generation) return;

      elapsed += 1;
      const next = window.scrollY;
      if (next === y) stable += 1;
      else {
        y = next;
        stable = 0;
      }

      if (stable >= 2 || elapsed >= 8) run();
      else sequence.settleFrame = requestAnimationFrame(tick);
    };

    sequence.settleFrame = requestAnimationFrame(tick);
  }

  function begin(scope: ParentNode) {
    const found = sections
      .map((id) => scope.querySelector<HTMLElement>(`#${id}`))
      .filter((section): section is HTMLElement => Boolean(section));

    if (found.length === 0) return;

    const spans = new Map(found.map((section) => [section.id, spanFor(section)]));
    const visible = found.filter(opening.inOpening);

    sequence.arming = true;
    for (const section of found) {
      if (!visible.includes(section)) armScroll(sequence, section, opening.start);
    }
    sequence.arming = false;

    if (visible.length === 0) return;

    let cursor = 0;
    for (const section of visible) {
      const wait = cursor;
      cursor += spans.get(section.id) ?? 0;

      if (wait === 0) {
        flush(sequence, section.id);
        continue;
      }

      const call = gsap.delayedCall(wait, () => flush(sequence, section.id));
      sequence.cleanups.push(() => call.kill());
    }
  }

  function watch(scope: ParentNode) {
    const token = sequence.generation;
    settle(() => {
      if (token !== sequence.generation || !scope.isConnected) return;
      begin(scope);
    });
  }

  return { reset, whenPlays: sequence.whenPlays, watch, begin };
}

export function whenSequenced(element: HTMLElement, play: Play) {
  for (const sequence of sequences) {
    if (!sectionOf(sequence, element)) continue;
    sequence.whenPlays(element, play);
    return true;
  }

  return false;
}
