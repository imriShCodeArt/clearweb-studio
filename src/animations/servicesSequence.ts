import { createSectionSequence, openingAt } from "@/animations/sectionSequence";
import { servicesHeroSpan, servicesMotion, staggeredSpan } from "@/animations/services";

const SECTIONS = ["services-hero", "services-offerings", "services-work"] as const;

function spanFor(element: HTMLElement) {
  if (element.id === "services-hero") return servicesHeroSpan();

  const count = element.querySelectorAll("li").length;
  const lead = element.id === "services-work" ? servicesMotion.lead : 0;
  return staggeredSpan(count, lead);
}

/** A phone only shows a sliver of the next section, so that sliver waits for a scroll. */
const services = createSectionSequence(SECTIONS, spanFor, openingAt(0.4));

export const resetServicesSequence = services.reset;
export const watchServicesSequence = services.watch;
