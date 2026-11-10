import type { ReactNode } from "react";
import Box from "@mui/material/Box";

import { Link } from "./Link";

type PlayLinkProps = {
  children: ReactNode;
  href: string;
};

function PlayIcon() {
  return (
    <Box
      component="svg"
      viewBox="0 0 36 36"
      aria-hidden
      sx={{ width: 36, height: 36, display: "block", flexShrink: 0 }}
    >
      <circle
        cx="18"
        cy="18"
        r="17.25"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
      />
      <path d="M15.2 12.8 23.8 18 15.2 23.2Z" fill="currentColor" />
    </Box>
  );
}

export function PlayLink({ children, href }: PlayLinkProps) {
  return (
    <Link
      href={href}
      underline="none"
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 1.25,
        color: "text.primary",
        fontWeight: 700,
        fontSize: "0.875rem",
        lineHeight: 1,
        "@media (hover: hover)": {
          "&:hover": {
            color: "primary.main",
          },
        },
        "&:focus-visible": {
          outline: "2px solid",
          outlineColor: "primary.main",
          outlineOffset: 3,
          borderRadius: 999,
        },
      }}
    >
      <PlayIcon />
      {children}
    </Link>
  );
}
