import type { ReactNode } from "react";
import Box from "@mui/material/Box";

import { Text } from "@/components/typography";

export function ContactBarFact({ icon, text }: { icon: ReactNode; text: string }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        color: "text.secondary",
      }}
    >
      <Box sx={{ display: "grid", color: "primary.main" }}>{icon}</Box>
      <Text variant="body2">{text}</Text>
    </Box>
  );
}
