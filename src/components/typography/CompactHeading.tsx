import type { ReactNode } from "react";
import Box from "@mui/material/Box";
import type { SxProps, Theme } from "@mui/material/styles";

import { Eyebrow } from "./Eyebrow";
import type { HeadingLevel } from "./Heading";
import { MarkedHeading } from "./MarkedHeading";
import { Text } from "./Text";

type CompactHeadingProps = {
  eyebrow: string;
  line1: string;
  line2: string;
  level?: HeadingLevel;
  description?: ReactNode;
  sx?: SxProps<Theme>;
};

export function CompactHeading({
  eyebrow,
  line1,
  line2,
  level = 2,
  description,
  sx,
}: CompactHeadingProps) {
  return (
    <Box sx={sx}>
      <Box sx={{ mb: 2 }}>
        <Eyebrow variant="rule">{eyebrow}</Eyebrow>
      </Box>
      <MarkedHeading level={level} variant="compact">
        <MarkedHeading.Line>{line1}</MarkedHeading.Line>
        <MarkedHeading.Line>
          <MarkedHeading.Mark>{line2}</MarkedHeading.Mark>
        </MarkedHeading.Line>
      </MarkedHeading>
      {description ? (
        <Text tone="secondary" sx={{ mt: 2 }}>
          {description}
        </Text>
      ) : null}
    </Box>
  );
}
