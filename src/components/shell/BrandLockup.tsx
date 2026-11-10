"use client";

import Box from "@mui/material/Box";

import { Link } from "@/components/actions";

type BrandLockupProps = {
  brand: string;
  href: string;
  onClick?: () => void;
};

export function BrandLockup({ brand, href, onClick }: BrandLockupProps) {
  return (
    <Link
      href={href}
      dir="ltr"
      underline="none"
      onClick={onClick}
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 1.25,
        color: "text.primary",
        fontWeight: 800,
        fontSize: { xs: 20, md: 22 },
        letterSpacing: "-0.03em",
        lineHeight: 1,
        unicodeBidi: "isolate",
      }}
    >
      <Box
        component="img"
        src="/logo_image.svg"
        alt=""
        sx={{ height: 36, width: "auto", display: "block", flexShrink: 0 }}
      />
      {brand}
    </Link>
  );
}
