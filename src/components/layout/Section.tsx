import type { ReactNode } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import type { SxProps, Theme } from "@mui/material/styles";

type SectionSpacing = "none" | "compact" | "regular" | "loose" | "page";

type SectionProps = {
  id?: string;
  label?: string;
  children: ReactNode;
  spacing?: SectionSpacing;
  fullWidth?: boolean;
  contained?: boolean;
  sx?: SxProps<Theme>;
  containerSX?: SxProps<Theme>;
};

const spacingPadding = {
  compact: { xs: 4, md: 6 },
  regular: { xs: 6, md: 10 },
  loose: { xs: 8, md: 14 },
} as const;

const pagePadding = {
  px: { xs: 2, md: 4 },
  pt: { xs: 4, md: 8 },
  pb: { xs: 8, md: 12 },
} as const;

const pageWidth = 1440;

export function Section({
  id,
  label,
  children,
  spacing = "page",
  fullWidth = false,
  contained = false,
  sx,
  containerSX,
}: SectionProps) {
  return (
    <Box
      component="section"
      id={id}
      aria-label={label}
      sx={[
        sectionSx(spacing),
        fullWidth ? null : { width: "100%", maxWidth: pageWidth, mx: "auto" },
        id ? { scrollMarginTop: { xs: 72, md: 80 } } : null,
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {contained ? <Container sx={containerSX}>{children}</Container> : children}
    </Box>
  );
}

function sectionSx(spacing: SectionSpacing) {
  const vertical =
    spacing === "none"
      ? null
      : spacing === "page"
        ? { pt: pagePadding.pt, pb: pagePadding.pb }
        : { py: spacingPadding[spacing] };

  return {
    ...vertical,
    px: pagePadding.px,
  };
}
