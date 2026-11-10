"use client";

import { useRef } from "react";
import Box from "@mui/material/Box";

import { whenHeroPlays } from "@/animations/heroGate";
import { gsap, useGSAP } from "@/lib/gsap";

const HEBREW = "אבגדהוזחטיכלמנסעפצקרשת";
const LATIN = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const DIGITS = "0123456789";
const MARKS = ",.;:!?…—-\"'";

export type ReelTextVariant = "reel" | "count";

export const reelCountDuration = 1.6;

type ReelTextProps = {
  text: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  variant?: ReelTextVariant;
};

function logarithmicEase(progress: number) {
  const base = 10;
  return Math.log(1 + progress * (base - 1)) / Math.log(base);
}

function parseCount(text: string) {
  const match = /^(\d+(?:\.\d+)?)(.*)$/.exec(text);
  if (!match) return null;

  const target = Number(match[1]);
  if (!Number.isFinite(target)) return null;

  return { target, suffix: match[2] ?? "" };
}

function hash(input: string) {
  let value = 2166136261;
  for (let index = 0; index < input.length; index += 1) {
    value ^= input.charCodeAt(index);
    value = Math.imul(value, 16777619);
  }
  return value >>> 0;
}

function random(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let next = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    next = (next + Math.imul(next ^ (next >>> 7), 61 | next)) ^ next;
    return ((next ^ (next >>> 14)) >>> 0) / 4294967296;
  };
}

function graphemes(text: string) {
  if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
    return [...new Intl.Segmenter(undefined, { granularity: "grapheme" }).segment(text)].map(
      (part) => part.segment,
    );
  }

  return Array.from(text);
}

function isSpace(char: string) {
  return /^\s$/u.test(char);
}

function poolFor(char: string) {
  if (HEBREW.includes(char)) return HEBREW;
  if (DIGITS.includes(char)) return DIGITS;
  if (/^\p{P}$/u.test(char)) return MARKS;
  return LATIN;
}

function reelGlyphs(char: string, index: number) {
  const next = random(hash(`${index}:${char}`));
  const pool = poolFor(char);
  const length = 6 + Math.floor(next() * 5);
  const glyphs = [char];

  for (let step = 0; step < length - 1; step += 1) {
    glyphs.push(pool[Math.floor(next() * pool.length)] ?? char);
  }

  return glyphs;
}

const reelSx = {
  display: "inline-block",
  position: "relative",
  lineHeight: "inherit",
  verticalAlign: "baseline",
  "@media (prefers-reduced-motion: reduce)": {
    "& > span:first-of-type": { visibility: "visible" },
    "& > span:last-of-type": { display: "none" },
  },
} as const;

const cellSx = {
  display: "block",
  height: "1lh",
  lineHeight: "inherit",
  textAlign: "center",
  width: "100%",
} as const;

function LetterReel({ char, index }: { char: string; index: number }) {
  const glyphs = reelGlyphs(char, index);

  return (
    <Box component="span" sx={reelSx}>
      <Box component="span" sx={{ visibility: "hidden" }}>
        {char}
      </Box>
      <Box
        component="span"
        aria-hidden
        sx={{ position: "absolute", inset: 0, overflow: "hidden" }}
      >
        <Box
          component="span"
          data-reel=""
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            opacity: 0,
            transform: "translateY(calc(-100% + 1lh))",
          }}
        >
          {glyphs.map((glyph, glyphIndex) => (
            <Box component="span" key={`${glyph}-${glyphIndex}`} sx={cellSx}>
              {glyph}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

function CountReel({
  text,
  delay,
  duration,
}: {
  text: string;
  delay: number;
  duration: number;
}) {
  const root = useRef<HTMLSpanElement>(null);
  const parsed = parseCount(text);

  useGSAP(
    () => {
      const scope = root.current;
      const node = scope?.querySelector<HTMLElement>("[data-count]");
      if (!scope || !node || !parsed) return;

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduceMotion) return;

      const places = parsed.target.toString().split(".")[1]?.length ?? 0;
      const render = (value: number) => {
        const shown = places === 0 ? Math.round(value) : value.toFixed(places);
        node.textContent = `${shown}${parsed.suffix}`;
      };
      const proxy = { value: 0 };
      render(0);
      gsap.to(proxy, {
        value: parsed.target,
        duration,
        delay,
        ease: logarithmicEase,
        onUpdate() {
          render(proxy.value);
        },
      });
    },
    { scope: root, dependencies: [text, delay, duration] },
  );

  return (
    <Box
      component="span"
      ref={root}
      dir="ltr"
      sx={{
        display: "inline-grid",
        verticalAlign: "top",
        "@media (prefers-reduced-motion: reduce)": {
          "& > span:first-of-type": { color: "inherit" },
          "& > span:last-of-type": { display: "none" },
        },
      }}
    >
      <Box component="span" sx={{ gridArea: "1 / 1", color: "transparent" }}>
        {text}
      </Box>
      <Box component="span" aria-hidden data-count="" sx={{ gridArea: "1 / 1" }}>
        {parsed ? `0${parsed.suffix}` : text}
      </Box>
    </Box>
  );
}

export function ReelText({
  text,
  delay = 0,
  duration,
  stagger = 0.028,
  variant = "reel",
}: ReelTextProps) {
  if (variant === "count") {
    return <CountReel text={text} delay={delay} duration={duration ?? reelCountDuration} />;
  }

  return (
    <Reel text={text} delay={delay} duration={duration ?? 0.9} stagger={stagger} />
  );
}

function Reel({
  text,
  delay,
  duration,
  stagger,
}: {
  text: string;
  delay: number;
  duration: number;
  stagger: number;
}) {
  const root = useRef<HTMLSpanElement>(null);
  const chars = graphemes(text);
  const safeRef = useRef<((callback: () => void) => () => void) | null>(null);

  const { contextSafe } = useGSAP(
    () => {
      const scope = root.current;
      if (!scope) return;

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduceMotion) return;

      const track = safeRef.current;
      const spin = () => {
        const strips = gsap.utils.toArray<HTMLElement>("[data-reel]", scope);

        strips.forEach((strip, index) => {
          const reel = strip.parentElement;
          if (!reel) return;

          const distance = strip.offsetHeight - reel.offsetHeight;
          const start = delay + index * stagger;
          gsap.fromTo(
            strip,
            { y: -distance },
            {
              y: 0,
              duration,
              delay: start,
              ease: "power4.out",
              onStart() {
                gsap.set(strip, { opacity: 1 });
              },
            },
          );
        });
      };
      const trackedSpin = track ? track(spin) : spin;

      const start = () => {
        if (document.fonts?.ready) {
          document.fonts.ready.then(() => {
            if (scope.isConnected) trackedSpin();
          });
          return;
        }

        trackedSpin();
      };

      whenHeroPlays(scope, start);
    },
    { scope: root, dependencies: [text, delay, duration, stagger] },
  );

  safeRef.current = contextSafe;

  const words: { chars: string[]; start: number }[] = [];
  chars.forEach((char, index) => {
    const word = words.at(-1);
    if (!word || isSpace(char) || isSpace(word.chars.at(-1) ?? "")) {
      words.push({ chars: [char], start: index });
      return;
    }
    word.chars.push(char);
  });

  return (
    <Box
      component="span"
      ref={root}
      sx={{
        position: "relative",
        display: "inline-block",
        maxWidth: "100%",
        verticalAlign: "top",
      }}
    >
      <Box
        component="span"
        sx={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          color: "transparent",
        }}
      >
        {text}
      </Box>
      <Box component="span" aria-hidden>
        {words.map((word) => {
          const content = word.chars.map((char, offset) => {
            const index = word.start + offset;
            if (isSpace(char)) return char;
            return <LetterReel key={`${char}-${index}`} char={char} index={index} />;
          });

          if (isSpace(word.chars[0] ?? "")) return content;

          return (
            <Box
              component="span"
              key={word.start}
              sx={{ whiteSpace: "nowrap" }}
            >
              {content}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
