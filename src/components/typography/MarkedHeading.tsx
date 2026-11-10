import type { ReactNode } from "react";
import Box from "@mui/material/Box";
import type { SxProps, Theme } from "@mui/material/styles";

import { Heading, type HeadingLevel, type HeadingVariant } from "./Heading";

export type MarkedHeadingVariant = "mark" | "compact";

type MarkedHeadingProps = {
  children: ReactNode;
  level?: HeadingLevel;
  variant?: MarkedHeadingVariant;
};

const tiltedText = {
  transform: "rotate(-5deg)",
  '[dir="rtl"] &': {
    transform: "rotate(5deg)",
  },
} as const;

const tiltedLine = {
  ...tiltedText,
  transformOrigin: "left center",
};

type MarkedHeadingLineProps = {
  children: ReactNode;
  nowrap?: boolean;
  tilt?: boolean;
};

type MarkedHeadingMarkProps = {
  children: ReactNode;
};

function MarkedHeadingRoot({
  children,
  level = 2,
  variant = "mark",
}: MarkedHeadingProps) {
  return (
    <Box sx={rootSx(variant)}>
      <Heading level={level} variant={headingVariant(variant)}>
        {children}
      </Heading>
    </Box>
  );
}

function headingVariant(variant: MarkedHeadingVariant): HeadingVariant {
  switch (variant) {
    case "mark":
      return "display";
    case "compact":
      return "compact";
  }
}

function rootSx(variant: MarkedHeadingVariant): SxProps<Theme> {
  switch (variant) {
    case "mark":
      return {
        "& h1, & h2, & h3, & h4": {
          m: 0,
          lineHeight: 0.92,
          letterSpacing: "-0.04em",
        },
        '[dir="rtl"] & h1, [dir="rtl"] & h2, [dir="rtl"] & h3, [dir="rtl"] & h4':
          {
            letterSpacing: "-0.02em",
          },
      };
    case "compact":
      return {
        "& h1, & h2, & h3, & h4": {
          m: 0,
        },
        "&& [data-marked-heading-mark]": {
          display: "block",
          py: 0,
          color: "primary.main",
          whiteSpace: "normal",
          transform: "none",
        },
        "&& [dir='rtl'] [data-marked-heading-mark]": {
          transform: "none",
        },
        "&& [data-marked-heading-mark-bg]": {
          display: "none",
        },
      };
  }
}

function MarkedHeadingLine({
  children,
  nowrap = false,
  tilt = false,
}: MarkedHeadingLineProps) {
  return (
    <Box
      component="span"
      sx={{
        display: "block",
        whiteSpace: nowrap ? "nowrap" : "normal",
        ...(tilt ? { width: "fit-content", ...tiltedLine } : null),
      }}
    >
      {children}
    </Box>
  );
}

function MarkedHeadingMark({ children }: MarkedHeadingMarkProps) {
  return (
    <Box
      component="span"
      data-marked-heading-mark=""
      sx={{
        position: "relative",
        display: "inline-block",
        color: "#0B0C0D",
        whiteSpace: "nowrap",
        py: 1,
        ...tiltedText,
      }}
    >
      <Box
        aria-hidden
        data-marked-heading-mark-bg=""
        sx={{
          position: "absolute",
          zIndex: 0,
          top: "0.08em",
          right: "-0.42em",
          bottom: "0.04em",
          left: "-0.16em",
          backgroundColor: "primary.main",
          transform: "skewX(-18deg)",
          '[dir="rtl"] &': {
            transform: "skewX(18deg)",
          },
        }}
      />
      <Box component="span" sx={{ position: "relative", zIndex: 1 }}>
        {children}
      </Box>
    </Box>
  );
}

export const MarkedHeading = Object.assign(MarkedHeadingRoot, {
  Line: MarkedHeadingLine,
  Mark: MarkedHeadingMark,
});
