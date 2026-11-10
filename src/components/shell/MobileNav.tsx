"use client";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";

import { Button, Link } from "@/components/actions";
import { usePathname } from "@/i18n/navigation";

import { BrandLockup } from "./BrandLockup";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { isShellItemActive, type ShellNavItem } from "./nav";

function CloseIcon() {
  return (
    <Box
      component="svg"
      viewBox="0 0 24 24"
      aria-hidden
      sx={{ width: 24, height: 24, fill: "currentColor" }}
    >
      <path d="M6.4 5 12 10.6 17.6 5 19 6.4 13.4 12 19 17.6 17.6 19 12 13.4 6.4 19 5 17.6 10.6 12 5 6.4 6.4 5z" />
    </Box>
  );
}

type MobileNavProps = {
  brand: string;
  brandHref?: string;
  items: ShellNavItem[];
  navLabel: string;
  closeLabel: string;
  talkLabel: string;
  open: boolean;
  onClose: () => void;
};

export function MobileNav({
  brand,
  brandHref = "/",
  items,
  navLabel,
  closeLabel,
  talkLabel,
  open,
  onClose,
}: MobileNavProps) {
  const pathname = usePathname();

  return (
    <Drawer
      id="mobile-navigation"
      anchor="left"
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            width: 280,
            maxWidth: "86vw",
            bgcolor: "background.paper",
          },
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Stack
          direction="row"
          spacing={1}
          sx={{ alignItems: "center", justifyContent: "space-between", mb: 2 }}
        >
          <BrandLockup brand={brand} href={brandHref} onClick={onClose} />
          <IconButton color="inherit" aria-label={closeLabel} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Stack>
        <Box
          component="nav"
          aria-label={navLabel}
          sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}
        >
          {items.map((item) => {
            const active = isShellItemActive(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                underline="none"
                color={active ? "primary" : "inherit"}
                aria-current={active ? "page" : undefined}
                onClick={onClose}
                sx={{ fontWeight: 700, fontSize: 18 }}
              >
                {item.label}
              </Link>
            );
          })}
        </Box>
        <Stack spacing={2} sx={{ mt: 3, alignItems: "flex-start" }}>
          <Button fullWidth onClick={onClose}>
            {talkLabel}
          </Button>
          <LocaleSwitcher />
        </Stack>
      </Box>
    </Drawer>
  );
}
