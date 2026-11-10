import type { ReactNode } from "react";
import Box from "@mui/material/Box";
import type { SxProps, Theme } from "@mui/material/styles";

import { Text } from "./Text";

export type EyebrowVariant = "plain" | "rule";

type EyebrowProps = {
  children: ReactNode;
  variant?: EyebrowVariant;
  sx?: SxProps<Theme>;
};

export function Eyebrow({ children, variant = "plain", sx }: EyebrowProps) {
  switch (variant) {
    case "plain":
      return (
        <Text variant="body2" tone="muted">
          {children}
        </Text>
      );
    case "rule":
      return (
        <Box
          sx={[
            {
              display: "flex",
              alignItems: "center",
              gap: 1.5,
            },
            ...(Array.isArray(sx) ? sx : [sx]),
          ]}
        >
          <Box
            component="p"
            sx={{
              m: 0,
              color: "text.secondary",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.28em",
              lineHeight: 1,
              textTransform: "uppercase",
              '[dir="rtl"] &': {
                fontSize: 14,
                letterSpacing: "0.08em",
                textTransform: "none",
              },
            }}
          >
            {children}
          </Box>
          <Box
            aria-hidden
            sx={{
              width: 64,
              borderTop: "1px solid",
              borderColor: "rgba(255,255,255,0.35)",
            }}
          />
        </Box>
      );
  }
}
