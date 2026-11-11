import { homeMotion } from "@/animations/home";

/** About-page entrance. Times are seconds after that section starts. */
export const aboutMotion = {
  hero: {
    eyebrow: 0.12,
    line1: 0.28,
    name: 0.46,
    role: 0.66,
    description: 0.84,
    portrait: 0.36,
    stats: 1.05,
  },
  lead: 0.22,
  stagger: 0.14,
} as const;

const countScale = 1.6;

export function heroStatPlan(amounts: number[]) {
  const fade = homeMotion.fade.duration;
  const longest = Math.max(...amounts, 1);
  const counts = amounts.map((amount) => (amount / longest) * countScale);

  const items = counts.map((duration, index) => ({
    duration,
    delay:
      aboutMotion.hero.stats +
      counts.slice(0, index).reduce((sum, count) => sum + fade + count, 0),
  }));

  return { items, end: heroSpanFromCounts(counts) };
}

/** Seconds from the hero start until its last item has finished. */
export function heroSpanFromCounts(counts: number[]) {
  const fade = homeMotion.fade.duration;
  let end = Math.max(
    ...Object.values(aboutMotion.hero).map((at) => at + fade),
  );

  let time = aboutMotion.hero.stats;
  for (const count of counts) {
    end = Math.max(end, time + fade, time + fade - 0.4 + count);
    time += fade + count;
  }

  return end;
}

/** Seconds from a list section start until its last card has finished. */
export function listSpan(count: number) {
  const fade = homeMotion.fade.duration;
  if (count <= 0) return fade;

  const lastStart = aboutMotion.lead + (count - 1) * aboutMotion.stagger;
  return Math.max(fade, lastStart + fade);
}
