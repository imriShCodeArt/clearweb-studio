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
  const longest = Math.max(...amounts, 1);
  const counts = amounts.map((amount) => (amount / longest) * countScale);

  const items = counts.map((duration, index) => ({
    duration,
    delay: aboutMotion.hero.stats + index * aboutMotion.stagger,
  }));

  return { items, end: heroSpanFromCounts(counts) };
}

/** Seconds from the hero start until its last item has finished. */
export function heroSpanFromCounts(counts: number[]) {
  const fade = homeMotion.fade.duration;
  const heroEnd = Math.max(
    ...Object.values(aboutMotion.hero).map((at) => at + fade),
  );
  const statEnds = counts.map((count, index) => {
    const start = aboutMotion.hero.stats + index * aboutMotion.stagger;
    return start + fade - 0.4 + count;
  });

  return Math.max(heroEnd, ...statEnds);
}

/** Seconds from a list section start until its last card has finished. */
export function listSpan(count: number) {
  const fade = homeMotion.fade.duration;
  if (count <= 0) return fade;

  const lastStart = aboutMotion.lead + (count - 1) * aboutMotion.stagger;
  return Math.max(fade, lastStart + fade);
}
