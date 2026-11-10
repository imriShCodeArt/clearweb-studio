"use client";

import ArrowOutwardOutlined from "@mui/icons-material/ArrowOutwardOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Stack from "@mui/material/Stack";

import { Button, Link } from "@/components/actions";
import { Intro } from "@/components/motion";
import { usePathname } from "@/i18n/navigation";

import { BrandLockup } from "./BrandLockup";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { isShellItemActive, type ShellNavItem } from "./nav";

type AppBarProps = {
  brand: string;
  brandHref?: string;
  items: ShellNavItem[];
  navLabel: string;
  menuLabel: string;
  talkLabel: string;
  menuOpen: boolean;
  onOpenMenu: () => void;
};

export function AppBar({
  brand,
  brandHref = "/",
  items,
  navLabel,
  menuLabel,
  talkLabel,
  menuOpen,
  onOpenMenu,
}: AppBarProps) {
  const pathname = usePathname();

  return (
    <Intro
      component={MuiAppBar}
      sx={{
        position: "sticky",
        color: "transparent",
        bgcolor: "transparent",
        backgroundImage: "none",
        boxShadow: "none",
        border: "none",
      }}
    >
      <Toolbar
        sx={{
          position: "relative",
          minHeight: { xs: 72, md: 84 },
          px: { xs: 2, md: 4 },
          gap: 2,
          justifyContent: "space-between",
        }}
      >
        <BrandLockup brand={brand} href={brandHref} />
        <Box
          component="nav"
          aria-label={navLabel}
          sx={{
            display: { xs: "none", md: "flex" },
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            alignItems: "center",
            gap: { md: 3.5, lg: 5 },
          }}
        >
          {items.map((item) => {
            const active = isShellItemActive(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                underline="none"
                color="inherit"
                aria-current={active ? "page" : undefined}
                sx={{
                  position: "relative",
                  color: "text.primary",
                  fontWeight: 600,
                  fontSize: 15,
                  lineHeight: 1,
                  "&::after": active
                    ? {
                        content: '""',
                        position: "absolute",
                        left: 0,
                        right: 0,
                        bottom: -10,
                        height: 2,
                        borderRadius: 999,
                        bgcolor: "primary.main",
                      }
                    : undefined,
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </Box>
        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
          <LocaleSwitcher />
          <Button
            endIcon={
              <ArrowOutwardOutlined
                sx={{ '[dir="rtl"] &': { transform: "scaleX(-1)" } }}
              />
            }
            sx={{ display: { xs: "none", sm: "inline-flex" }, px: 2.5 }}
          >
            {talkLabel}
          </Button>
          <IconButton
            color="inherit"
            aria-label={menuLabel}
            aria-controls="mobile-navigation"
            aria-expanded={menuOpen}
            onClick={onOpenMenu}
            sx={{ display: { md: "none" } }}
          >
            <MenuIcon color="primary" />
          </IconButton>
        </Stack>
      </Toolbar>
    </Intro>
  );
}
