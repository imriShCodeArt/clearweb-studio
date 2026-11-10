"use client";

import type { ReactNode } from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, type Direction } from "@mui/material/styles";
import rtlPlugin from "@mui/stylis-plugin-rtl";
import { prefixer } from "stylis";

import { themes } from "@/theme";

type AppProvidersProps = {
  direction: Direction;
  children: ReactNode;
};

const cacheOptions: Record<
  Direction,
  { key: string; stylisPlugins?: typeof rtlPlugin[] }
> = {
  ltr: { key: "mui" },
  rtl: { key: "muirtl", stylisPlugins: [prefixer, rtlPlugin] },
};

export function AppProviders({ direction, children }: AppProvidersProps) {
  return (
    <AppRouterCacheProvider options={cacheOptions[direction]}>
      <ThemeProvider theme={themes[direction]}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
