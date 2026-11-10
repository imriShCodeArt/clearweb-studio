"use client";

import type { MouseEventHandler, ReactNode } from "react";
import type { ButtonProps as MuiButtonProps } from "@mui/material/Button";
import MuiButton from "@mui/material/Button";
import type { SxProps, Theme } from "@mui/material/styles";

import { Link as LocaleLink } from "@/i18n/navigation";

type ButtonProps = {
  children?: ReactNode;
  href?: string;
  variant?: MuiButtonProps["variant"];
  color?: MuiButtonProps["color"];
  size?: MuiButtonProps["size"];
  disabled?: boolean;
  fullWidth?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: MouseEventHandler<HTMLElement>;
  startIcon?: MuiButtonProps["startIcon"];
  endIcon?: MuiButtonProps["endIcon"];
  sx?: SxProps<Theme>;
  target?: string;
  rel?: string;
};

function isExternalHref(href: string) {
  return /^(https?:|mailto:|tel:)/.test(href);
}

export function Button({
  href,
  type = "button",
  target,
  rel,
  ...props
}: ButtonProps) {
  if (!href) {
    return <MuiButton type={type} {...props} />;
  }

  if (isExternalHref(href)) {
    return (
      <MuiButton {...props} component="a" href={href} target={target} rel={rel} />
    );
  }

  return <MuiButton {...props} component={LocaleLink} href={href} />;
}
