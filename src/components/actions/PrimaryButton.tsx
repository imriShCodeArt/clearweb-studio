import type { MouseEventHandler, ReactNode } from "react";
import ArrowOutwardOutlined from "@mui/icons-material/ArrowOutwardOutlined";

import { Button } from "./Button";

type PrimaryButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: MouseEventHandler<HTMLElement>;
};

export function PrimaryButton({ children, href, onClick }: PrimaryButtonProps) {
  return (
    <Button
      href={href}
      onClick={onClick}
      variant="contained"
      endIcon={
        <ArrowOutwardOutlined
          sx={{ '[dir="rtl"] &': { transform: "scaleX(-1)" } }}
        />
      }
      sx={{
        minHeight: { xs: 46, md: 48 },
        px: 2.75,
        "@media (hover: hover)": {
          "&:hover": {
            transform: "translateY(-2px)",
          },
        },
        "@media (prefers-reduced-motion: reduce)": {
          "&:hover": {
            transform: "none",
          },
        },
      }}
    >
      {children}
    </Button>
  );
}
