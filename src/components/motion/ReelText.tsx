import Box from "@mui/material/Box";

const HEBREW = "אבגדהוזחטיכלמנסעפצקרשת";
const LATIN = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const DIGITS = "0123456789";
const MARKS = ",.;:!?…—-\"'";

export type ReelTextVariant = "reel" | "count";

export const reelCountDuration = 1.6;

type ReelTextProps = {
  text: string;
  duration?: number;
  motion?: string;
  stagger?: number;
  variant?: ReelTextVariant;
};

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
  duration,
  motion,
}: {
  text: string;
  duration: number;
  motion?: string;
}) {
  const parsed = parseCount(text);
  const places = parsed?.target.toString().split(".")[1]?.length ?? 0;

  return (
    <Box
      component="span"
      dir="ltr"
      data-motion={motion}
      data-count-value={parsed?.target}
      data-count-suffix={parsed?.suffix}
      data-count-places={places}
      data-count-duration={duration}
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
        {text}
      </Box>
    </Box>
  );
}

export function ReelText({
  text,
  duration,
  motion,
  stagger = 0.028,
  variant = "reel",
}: ReelTextProps) {
  if (variant === "count") {
    return (
      <CountReel
        text={text}
        duration={duration ?? reelCountDuration}
        motion={motion}
      />
    );
  }

  return (
    <Reel
      text={text}
      duration={duration ?? 0.9}
      motion={motion}
      stagger={stagger}
    />
  );
}

function Reel({
  text,
  duration,
  motion,
  stagger,
}: {
  text: string;
  duration: number;
  motion?: string;
  stagger: number;
}) {
  const chars = graphemes(text);

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
      data-motion={motion}
      data-reel-duration={duration}
      data-reel-stagger={stagger}
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
