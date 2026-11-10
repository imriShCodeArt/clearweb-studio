import type { ReactNode } from "react";
import Box from "@mui/material/Box";

export function ContactPitch({ children }: { children: ReactNode }) {
  return (
    <Box
      sx={{
        maxWidth: 300,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: { xs: "center", md: "flex-start" },
        textAlign: { xs: "center", md: "start" },
      }}
    >
      {children}
    </Box>
  );
}
