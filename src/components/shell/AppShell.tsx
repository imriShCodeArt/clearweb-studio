"use client";

import { useState, type ReactNode } from "react";
import Box from "@mui/material/Box";

import { AppBar } from "./AppBar";
import { Footer } from "./Footer";
import { MobileNav } from "./MobileNav";
import { PageFade } from "./PageFade";
import type { SiteFooter } from "@/config/site";

import type { ShellNavItem } from "./nav";

type AppShellProps = {
  brand: string;
  brandHref?: string;
  items: ShellNavItem[];
  navLabel: string;
  menuLabel: string;
  closeLabel: string;
  talkLabel: string;
  footer: SiteFooter;
  children: ReactNode;
};

export function AppShell({
  brand,
  brandHref = "/",
  items,
  navLabel,
  menuLabel,
  closeLabel,
  talkLabel,
  footer,
  children,
}: AppShellProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100dvh",
        flexDirection: "column",
      }}
    >
      <AppBar
        brand={brand}
        brandHref={brandHref}
        items={items}
        navLabel={navLabel}
        menuLabel={menuLabel}
        talkLabel={talkLabel}
        menuOpen={menuOpen}
        onOpenMenu={() => setMenuOpen(true)}
      />
      <MobileNav
        brand={brand}
        brandHref={brandHref}
        items={items}
        navLabel={navLabel}
        closeLabel={closeLabel}
        talkLabel={talkLabel}
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
      />
      <PageFade>{children}</PageFade>
      <Footer brand={brand} brandHref={brandHref} footer={footer} />
    </Box>
  );
}
