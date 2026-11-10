"use client";

import type { ComponentProps, ReactNode } from "react";
import MuiLink from "@mui/material/Link";

import { Link as LocaleLink } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

type LinkProps = Omit<ComponentProps<typeof MuiLink>, "href" | "component"> & {
  href: string;
  locale?: Locale;
  children: ReactNode;
};

function isExternalHref(href: string) {
  return /^(https?:|mailto:|tel:)/.test(href);
}

export function Link({ href, locale, children, ...props }: LinkProps) {
  if (isExternalHref(href) || href.startsWith("#")) {
    return (
      <MuiLink underline="hover" {...props} href={href}>
        {children}
      </MuiLink>
    );
  }

  return (
    <MuiLink
      underline="hover"
      {...props}
      component={LocaleLink}
      href={href}
      locale={locale}
    >
      {children}
    </MuiLink>
  );
}
