import { homeMotion } from "@/animations/home";

/** Services-page entrance. Times are seconds after that section starts. */
export const servicesMotion = {
  hero: {
    eyebrow: 0.12,
    line1: 0.28,
    line2: 0.46,
    description: 0.66,
    art: 0.36,
  },
  lead: 0.22,
  stagger: 0.14,
} as const;

const fade = homeMotion.fade.duration;

export function servicesHeroSpan() {
  return Math.max(...Object.values(servicesMotion.hero).map((at) => at + fade));
}

/** Seconds until the last staggered item in a section has finished. */
export function staggeredSpan(count: number, lead = 0) {
  if (count <= 0) return fade;

  const lastStart = lead + (count - 1) * servicesMotion.stagger;
  return Math.max(fade, lastStart + fade);
}
