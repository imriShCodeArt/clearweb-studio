import type { ReactNode } from "react";
import Box from "@mui/material/Box";

export function ContactHeading({ children }: { children: ReactNode }) {
  return (
    <Box
      sx={{
        minWidth: 0,
        textAlign: { xs: "center", md: "start" },
        "& h2": {
          display: "flex",
          flexDirection: "column",
          alignItems: { xs: "center", md: "flex-start" },
        },
      }}
    >
      {children}
    </Box>
  );
}
