import { createSectionSequence, openingWhenReached } from "@/animations/sectionSequence";
import { servicesHeroSpan, servicesMotion, staggeredSpan } from "@/animations/services";

const SECTIONS = ["services-hero", "services-offerings", "services-work"] as const;

function spanFor(element: HTMLElement) {
  if (element.id === "services-hero") return servicesHeroSpan();

  const count = element.querySelectorAll("li").length;
  const lead = element.id === "services-work" ? servicesMotion.lead : 0;
  return staggeredSpan(count, lead);
}

/** A sliver of the next section waits until its top is scrolled into view. */
const services = createSectionSequence(SECTIONS, spanFor, openingWhenReached(0.65));

export const resetServicesSequence = services.reset;
export const watchServicesSequence = services.watch;
