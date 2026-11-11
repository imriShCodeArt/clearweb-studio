import type { ReactNode } from "react";
import Box from "@mui/material/Box";

import { Text } from "@/components/typography";

export function ContactChannel({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.25,
        minWidth: 0,
      }}
    >
      <Box
        sx={{
          display: "grid",
          placeItems: "center",
          width: 40,
          height: 40,
          flexShrink: 0,
          borderRadius: "12px",
          color: "primary.main",
          border: "1px solid rgba(247, 207, 0, 0.35)",
          bgcolor: "rgba(11, 12, 13, 0.35)",
        }}
      >
        {icon}
      </Box>
      <Box sx={{ minWidth: 0 }}>
        <Text variant="body2" tone="muted" sx={{ lineHeight: 1.2 }}>
          {label}
        </Text>
        <Text dir="ltr" sx={{ fontWeight: 700, fontSize: 14 }}>
          {value}
        </Text>
      </Box>
    </Box>
  );
}
