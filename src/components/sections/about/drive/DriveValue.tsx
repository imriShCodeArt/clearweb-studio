import type { ElementType } from "react";
import Box from "@mui/material/Box";
import type { SvgIconProps } from "@mui/material/SvgIcon";

import { CoinJump, FadeIn } from "@/components/motion";
import { Text } from "@/components/typography";

type DriveValueProps = {
  Icon: ElementType<SvgIconProps>;
  title: string;
  description: string;
  divided: boolean;
  delay?: number;
};

const divider = "1px solid rgba(255, 255, 255, 0.16)";

export function DriveValue({
  Icon,
  title,
  description,
  divided,
  delay = 0,
}: DriveValueProps) {
  return (
    <FadeIn
      component="li"
      delay={delay}
      from="bottom"
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.75,
        minWidth: 0,
        px: { md: 2.5 },
        py: { xs: 2, md: 0.5 },
        borderTop: { xs: divided ? divider : "none", md: "none" },
        borderInlineStart: { md: divided ? divider : "none" },
      }}
    >
      <CoinJump delay={delay}>
        <Box
          sx={{
            display: "grid",
            placeItems: "center",
            flexShrink: 0,
            width: 48,
            height: 48,
            borderRadius: "14px",
            border: "1px solid rgba(255, 255, 255, 0.14)",
            backgroundColor: "rgba(255, 255, 255, 0.04)",
          }}
        >
          <Icon sx={{ fontSize: 26, color: "primary.main" }} />
        </Box>
      </CoinJump>
      <Box sx={{ minWidth: 0 }}>
        <Text sx={{ fontWeight: 800, fontSize: "1.05rem", lineHeight: 1.2 }}>
          {title}
        </Text>
        <Text tone="secondary" variant="body2" sx={{ mt: 0.35 }}>
          {description}
        </Text>
      </Box>
    </FadeIn>
  );
}
