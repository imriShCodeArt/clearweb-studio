"use client";

import type { ReactNode } from "react";

import {
  addEntrance,
  armEntranceTimeline,
  createEntranceTimeline,
  motionTarget,
  motionTargets,
  motionTokens,
  type MotionDirection,
} from "@/animations/motion";
import { useMotionPage, useMotionScope } from "@/components/motion";
import { gsap } from "@/lib/gsap";

export function ContactMotion({ children }: { children: ReactNode }) {
  const page = useMotionPage();
  const root = useMotionScope((scope) => {
    const media = gsap.matchMedia();

    const setup = (formDirection: MotionDirection) => {
      const timeline = createEntranceTimeline();
      const backdrop = motionTarget(scope, "backdrop");
      const eyebrow = motionTarget(scope, "eyebrow");
      const line1 = motionTarget(scope, "line1");
      const line2 = motionTarget(scope, "line2");
      const description = motionTarget(scope, "description");
      const channels = motionTargets(scope, "channel");
      const form = motionTarget(scope, "form");
      const bar = motionTarget(scope, "bar");
      const barItems = motionTargets(scope, "bar-item");

      if (backdrop) {
        timeline.fromTo(
          backdrop,
          { autoAlpha: 0, scale: 1.035 },
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.9,
            ease: "power2.out",
            immediateRender: true,
          },
          0,
        );
      }
      if (eyebrow) {
        addEntrance(timeline, eyebrow, {
          at: 0.12,
          direction: "top",
          distance: 18,
          duration: 0.45,
          ease: "power2.out",
        });
      }
      if (line1) {
        addEntrance(timeline, line1, {
          at: 0.26,
          direction: "top",
          distance: 28,
          duration: 0.55,
        });
      }
      if (line2) {
        addEntrance(timeline, line2, {
          at: 0.42,
          direction: "bottom",
          distance: 22,
          duration: 0.55,
        });
      }
      if (description) {
        addEntrance(timeline, description, {
          at: 0.62,
          direction: "bottom",
          distance: 18,
          duration: 0.5,
          ease: "power2.out",
        });
      }
      addEntrance(timeline, channels, {
        at: 0.78,
        direction: "bottom",
        distance: 18,
        duration: 0.45,
        ease: "power2.out",
        stagger: 0.1,
      });
      if (form) {
        addEntrance(timeline, form, {
          at: 0.34,
          direction: formDirection,
          distance: 42,
          duration: 0.75,
        });
      }
      if (bar) {
        addEntrance(timeline, bar, {
          at: 1.02,
          direction: "bottom",
          distance: 24,
          duration: 0.55,
          ease: "power2.out",
        });
      }
      addEntrance(timeline, barItems, {
        at: 1.14,
        direction: "bottom",
        distance: 12,
        duration: 0.42,
        ease: "power2.out",
        stagger: 0.08,
      });

      if (page) timeline.eventCallback("onComplete", page.heroCompleted);

      const trigger = scope.querySelector<HTMLElement>("section") ?? scope;
      return armEntranceTimeline(
        timeline,
        trigger,
        motionTokens.entrance.start,
        {
          onPosition(position) {
            if (!page) return;
            if (position === "active") page.heroStarted();
            else page.heroDormant();
          },
          requestPlay: page
            ? (play) => {
                page.heroStarted();
                play();
              }
            : undefined,
        },
      ).cleanup;
    };

    media.add("(min-width: 1200px)", () => setup("right"));
    media.add("(max-width: 1199.95px)", () => setup("bottom"));

    return () => media.revert();
  });

  return <div ref={root}>{children}</div>;
}
