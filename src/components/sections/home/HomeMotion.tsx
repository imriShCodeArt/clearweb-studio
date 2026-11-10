"use client";

import { useRef, type ReactNode } from "react";

import {
  afterScrollSettles,
  beginHeroGate,
  heroEntranceHold,
  resetHeroGate,
  whenHeroPlays,
} from "@/animations/heroGate";
import { beats, homeMotion } from "@/animations/home";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

type HomeMotionProps = {
  children: ReactNode;
};

function targets(scope: ParentNode, beat: string) {
  return gsap.utils.toArray<HTMLElement>(`[data-animate="${beat}"]`, scope);
}

export function HomeMotion({ children }: HomeMotionProps) {
  const root = useRef<HTMLDivElement>(null);
  const safeRef = useRef<((callback: () => void) => () => void) | null>(null);

  const { contextSafe } = useGSAP(
    () => {
      const scope = root.current;
      if (!scope) return;

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduceMotion) return;

      const { ease, rise, hero, reveal, sequence, slide } = homeMotion;

      const heroHold = (element: HTMLElement) => {
        if (!element.closest("#process")) return 0;
        return heroEntranceHold();
      };

      const playWhenReady = (element: HTMLElement, play: () => void) => {
        const wait = heroHold(element);
        if (wait === 0) play();
        else gsap.delayedCall(wait, play);
      };

      const playReveal = (
        items: HTMLElement[],
        trigger: HTMLElement,
        stagger = 0,
        delay = 0,
        postpone?: () => number,
      ) => {
        const tween = gsap.fromTo(
          items,
          { y: rise, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: reveal.duration,
            ease,
            stagger,
            delay,
            paused: true,
            immediateRender: true,
          },
        );

        ScrollTrigger.create({
          trigger,
          start: reveal.start,
          once: reveal.once,
          onEnter: () =>
            playWhenReady(trigger, () => {
              const wait = postpone?.() ?? 0;
              if (wait === 0) tween.play();
              else gsap.delayedCall(wait, () => tween.play());
            }),
        });
      };

      const listSelector = `[data-animate="${beats.revealSequence}"], [data-animate="${beats.revealList}"]`;

      const ownedItems = (list: HTMLElement) =>
        targets(list, beats.reveal).filter(
          (item) => item.parentElement?.closest(listSelector) === list,
        );

      const sequenceStarted = new Map<HTMLElement, number>();

      const markCascade = (list: HTMLElement) => {
        if (!list.hasAttribute("data-cascade")) return 0;

        sequenceStarted.set(list, performance.now());
        return 0;
      };

      const afterCascade = (element: HTMLElement) => {
        const section = element.closest("section");
        const sequenceEl = section?.querySelector<HTMLElement>("[data-cascade]");
        if (!sequenceEl) return 0;
        if (
          (sequenceEl.compareDocumentPosition(element) &
            Node.DOCUMENT_POSITION_FOLLOWING) ===
          0
        ) {
          return 0;
        }

        const count = ownedItems(sequenceEl).length;
        if (count === 0) return 0;

        const span = sequence.stagger * (count - 1) + reveal.duration - 0.4;
        const started = sequenceStarted.get(sequenceEl);
        if (started == null) return span;

        const elapsed = (performance.now() - started) / 1000;
        return Math.max(0, span - elapsed);
      };

      const lists = [
        ...targets(scope, beats.revealSequence).map((list) => ({
          list,
          items: ownedItems(list),
          stagger: sequence.stagger,
          lead: sequence.lead,
          cascade: list.hasAttribute("data-cascade"),
        })),
        ...targets(scope, beats.revealList).map((list) => ({
          list,
          items: ownedItems(list),
          stagger: reveal.stagger,
          lead: 0,
          cascade: false,
        })),
      ].filter((entry) => entry.items.length > 0);

      const intro = gsap.timeline({
        paused: true,
        defaults: { ease, duration: reveal.duration },
      });

      for (const step of Object.values(hero)) {
        if (!("beat" in step)) continue;

        const nodes = targets(scope, step.beat);
        if (nodes.length === 0) continue;

        intro.fromTo(
          nodes,
          step.from ?? { y: rise, autoAlpha: 0 },
          {
            y: 0,
            yPercent: 0,
            autoAlpha: 1,
            stagger: step.stagger ?? 0,
            duration: step.duration ?? reveal.duration,
            immediateRender: true,
          },
          step.at,
        );
      }

      const heroSection = scope.querySelector<HTMLElement>("#hero");
      if (heroSection) whenHeroPlays(heroSection, () => intro.play());
      else intro.play();

      const mountScrollTriggers = () => {
        if (!scope.isConnected) return;
        if (heroSection) beginHeroGate(heroSection);

        const claimed = new Set<HTMLElement>();

        for (const { items } of lists) {
          for (const item of items) claimed.add(item);
        }

        const motion = gsap.matchMedia();
        motion.add(sequence.row, () => {
          for (const { list, items, stagger, lead } of lists) {
            const heading = list.parentElement?.querySelector<HTMLElement>(
              `[data-animate="${beats.slide}"]`,
            );
            const followsHeading = lead > 0 && Boolean(heading);

            playReveal(
              items,
              followsHeading && heading ? heading : list,
              stagger,
              followsHeading ? lead : 0,
              () => (followsHeading ? 0 : markCascade(list) + afterCascade(list)),
            );
          }
        });
        motion.add(sequence.stack, () => {
          for (const { list, items, stagger, cascade } of lists) {
            if (cascade) {
              playReveal(items, list, stagger, 0, () => markCascade(list));
              continue;
            }

            for (const item of items) {
              playReveal([item], item, 0, 0, () => afterCascade(item));
            }
          }
        });

        for (const item of targets(scope, beats.slide)) {
          const distance = item.dataset.from === "left" ? -slide.x : slide.x;

          const tween = gsap.fromTo(
            item,
            { x: distance },
            {
              x: 0,
              duration: slide.duration,
              ease,
              paused: true,
              immediateRender: true,
              onStart() {
                gsap.set(item, { autoAlpha: 1 });
              },
            },
          );

          ScrollTrigger.create({
            trigger: item,
            start: reveal.start,
            once: reveal.once,
            onEnter: () => playWhenReady(item, () => tween.play()),
          });
        }

        for (const item of targets(scope, beats.reveal)) {
          if (claimed.has(item)) continue;

          playReveal([item], item);
        }

        document.fonts?.ready.then(() => {
          if (scope.isConnected) ScrollTrigger.refresh();
        });
      };

      const start = safeRef.current;
      if (start) afterScrollSettles(start(mountScrollTriggers));

      return () => resetHeroGate();
    },
    { scope: root },
  );

  safeRef.current = contextSafe;

  return <div ref={root}>{children}</div>;
}
