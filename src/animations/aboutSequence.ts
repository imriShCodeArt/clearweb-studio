import { heroSpanFromCounts, listSpan } from "@/animations/about";
import { createSectionSequence } from "@/animations/sectionSequence";

const SECTIONS = ["about-hero", "about-approach", "about-drive"] as const;

function spanFor(element: HTMLElement) {
  if (element.id === "about-hero") {
    const counts = [...element.querySelectorAll<HTMLElement>("[data-count-duration]")]
      .map((item) => Number(item.dataset.countDuration))
      .filter((count) => Number.isFinite(count));
    return heroSpanFromCounts(counts);
  }

  return listSpan(element.querySelectorAll("li").length);
}

const about = createSectionSequence(SECTIONS, spanFor);

export const resetAboutSequence = about.reset;
export const whenAboutPlays = about.whenPlays;
export const beginAboutSequence = about.begin;
export const watchAboutSequence = about.watch;
