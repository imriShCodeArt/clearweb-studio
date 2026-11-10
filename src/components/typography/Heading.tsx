import type { ReactNode } from "react";
import Typography from "@mui/material/Typography";

export type HeadingLevel = 1 | 2 | 3 | 4;
export type HeadingVariant = "display" | "compact";

type HeadingProps = {
  children: ReactNode;
  level?: HeadingLevel;
  variant?: HeadingVariant;
};

const headingComponent = {
  1: "h1",
  2: "h2",
  3: "h3",
  4: "h4",
} as const;

const displayFontSize = {
  1: "clamp(2.75rem, 15vw, 6rem)",
  2: "clamp(2rem, 9.5vw, 3.75rem)",
  3: "clamp(1.5rem, 1.15rem + 1.4vw, 3rem)",
  4: "clamp(1.25rem, 1.05rem + 0.7vw, 2.125rem)",
} as const;

const compactFontSize: Partial<Record<HeadingLevel, string>> = {
  1: "clamp(2.6rem, 4.8vw, 4.5rem)",
};

export function Heading({
  children,
  level = 2,
  variant = "display",
}: HeadingProps) {
  const component = headingComponent[level];

  return (
    <Typography
      variant={component}
      component={component}
      sx={headingSx(level, variant)}
    >
      {children}
    </Typography>
  );
}

function headingSx(level: HeadingLevel, variant: HeadingVariant) {
  switch (variant) {
    case "display":
      return { fontSize: displayFontSize[level] };
    case "compact":
      return {
        fontSize: compactFontSize[level] ?? displayFontSize[level],
        lineHeight: 0.96,
        letterSpacing: "-0.045em",
        '[dir="rtl"] &': {
          letterSpacing: "-0.02em",
        },
      };
  }
}
