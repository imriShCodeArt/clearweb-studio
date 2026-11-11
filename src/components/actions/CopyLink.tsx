"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";
import Box from "@mui/material/Box";
import Portal from "@mui/material/Portal";
import Snackbar from "@mui/material/Snackbar";
import type { SxProps, Theme } from "@mui/material/styles";
import { useTranslations } from "next-intl";

import { Link } from "./Link";

type CopyLinkProps = {
  href: string;
  value: string;
  children: ReactNode;
  sx?: SxProps<Theme>;
};

const control = {
  color: "inherit",
  font: "inherit",
  textAlign: "start",
  cursor: "pointer",
  "&:focus-visible": {
    outline: "2px solid",
    outlineColor: "primary.main",
    outlineOffset: 4,
    borderRadius: "12px",
  },
} as const;

function duplicate(node: ReactNode): ReactNode {
  return Children.map(node, (child) => {
    if (!isValidElement(child)) return child;

    const element = child as ReactElement<{ children?: ReactNode }>;
    const nested = element.props.children;
    if (nested == null) return cloneElement(element);

    return cloneElement(element, undefined, duplicate(nested));
  });
}

export function CopyLink({ href, value, children, sx }: CopyLinkProps) {
  const t = useTranslations("shell");
  const [notice, setNotice] = useState(0);

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setNotice((current) => current + 1);
    } catch {
      setNotice(0);
    }
  }

  return (
    <>
      <Link
        href={href}
        underline="none"
        sx={[
          control,
          { display: { xs: "inline-flex", md: "none" } },
          ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
        ]}
      >
        {children}
      </Link>
      <Box
        component="button"
        type="button"
        onClick={onCopy}
        sx={[
          control,
          {
            display: { xs: "none", md: "inline-flex" },
            p: 0,
            border: 0,
            bgcolor: "transparent",
          },
          ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
        ]}
      >
        {duplicate(children)}
      </Box>
      <Portal>
        <Snackbar
          key={notice}
          open={notice > 0}
          autoHideDuration={2400}
          onClose={() => setNotice(0)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          message={t("copied")}
          sx={{ zIndex: (theme) => theme.zIndex.snackbar }}
          slotProps={{
            content: {
              role: "status",
              "aria-live": "polite",
              sx: {
                bgcolor: "background.paper",
                color: "text.primary",
                border: "1px solid",
                borderColor: "divider",
                fontWeight: 700,
                boxShadow: "0 12px 40px rgba(0, 0, 0, 0.45)",
              },
            },
          }}
        />
      </Portal>
    </>
  );
}
