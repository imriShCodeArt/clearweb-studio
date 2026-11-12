"use client";

import type { ElementType } from "react";
import { useSyncExternalStore } from "react";

import ArrowForward from "@mui/icons-material/ArrowForward";
import CalendarMonthOutlined from "@mui/icons-material/CalendarMonthOutlined";
import LinkedIn from "@mui/icons-material/LinkedIn";
import LinkOutlined from "@mui/icons-material/LinkOutlined";
import Facebook from "@mui/icons-material/Facebook";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";

import { Button, Link } from "@/components/actions";
import { Columns } from "@/components/layout";
import { Text } from "@/components/typography";
import type { SiteFooter, SiteLink } from "@/config/site";

import { BrandLockup } from "./BrandLockup";

const hairline = "1px solid rgba(255, 255, 255, 0.1)";

const socialIcons = {
  linkedin: LinkedIn,
  facebook: Facebook,
  website: LinkOutlined,
} as const;

export function Footer({
  brand,
  brandHref = "/",
  footer,
}: {
  brand: string;
  brandHref?: string;
  footer: SiteFooter;
}) {
  const year = useSyncExternalStore(
    () => () => {},
    () => new Date().getFullYear(),
    () => null,
  );

  return (
    <Box
      component="footer"
      sx={{
        position: "relative",
        overflow: "hidden",
        bgcolor: "background.default",
        pt: { xs: 5, md: 7 },
        pb: { xs: 3, md: 4 },
        borderTop:'3px rgba(73, 73, 75, 0.76)',
        borderTopStyle:'solid'
      }}
    >
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url(/footer/footer-bg-image.png)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center bottom",
          backgroundSize: "cover",
          pointerEvents: "none",
          '[dir="rtl"] &': { transform: "scaleX(-1)" },
        }}
      />
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          zIndex: 0,
          inset: 0,
          bgcolor: "rgba(33, 33, 35, 0.76)",
          pointerEvents: "none",
        }}
      />
      <Container sx={{ position: "relative", zIndex: 1 }}>
        <Columns
          alignItems="start"
          columns={{
            xs: "1fr 1fr",
            lg: "minmax(190px, 1.15fr) repeat(3, minmax(0, 0.72fr)) minmax(250px, 1.1fr)",
          }}
          columnGap={{ xs: 3, lg: 4 }}
          rowGap={{ xs: 4, lg: 0 }}
        >
          <FooterBrand
            brand={brand}
            href={brandHref}
            tagline={footer.tagline}
            social={footer.social}
          />
          <Box
            component="nav"
            aria-label={footer.navLabel}
            sx={{ display: "contents" }}
          >
            {footer.columns.map((column) => (
              <FooterColumn
                key={column.id}
                title={column.title}
                links={column.links}
              />
            ))}
          </Box>
          <FooterCall
            title={footer.cta.title}
            description={footer.cta.description}
            action={footer.cta.action}
            href={footer.cta.href}
          />
        </Columns>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "flex-start", sm: "center" },
            justifyContent: "space-between",
            gap: 2,
            mt: { xs: 4, md: 5 },
            pt: { xs: 2.5, md: 3 },
            borderTop: hairline,
          }}
        >
          <Text tone="muted" variant="body2" dir="ltr">
            {year ? `© ${year} ${brand}. ${footer.rights}` : brand}
          </Text>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              columnGap: 2,
              rowGap: 1,
            }}
          >
            {footer.legal.map((item, index) => (
              <Box
                key={item.id}
                sx={{ display: "flex", alignItems: "center", gap: 2 }}
              >
                {index > 0 ? (
                  <Box
                    aria-hidden
                    sx={{
                      width: "1px",
                      height: 12,
                      bgcolor: "rgba(255, 255, 255, 0.22)",
                    }}
                  />
                ) : null}
                <FooterTextLink href={item.href}>{item.label}</FooterTextLink>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

function FooterBrand({
  brand,
  href,
  tagline,
  social,
}: {
  brand: string;
  href: string;
  tagline: string;
  social: SiteFooter["social"];
}) {
  return (
    <Box sx={{ gridColumn: { xs: "1 / -1", lg: "auto" }, maxWidth: 280 }}>
      <BrandLockup brand={brand} href={href} />
      <Text tone="secondary" variant="body2" sx={{ mt: 1.75, maxWidth: 240 }}>
        {tagline}
      </Text>
      <Box sx={{ display: "flex", gap: 1, mt: 2.25 }}>
        {social.map((item) => (
          <SocialButton
            key={item.id}
            label={item.label}
            Icon={socialIcons[item.id]}
          />
        ))}
      </Box>
    </Box>
  );
}

function SocialButton({ label, Icon }: { label: string; Icon: ElementType }) {
  return (
    <IconButton
      aria-label={label}
      sx={{
        width: 40,
        height: 40,
        borderRadius: "12px",
        border: hairline,
        color: "text.primary",
        bgcolor: "rgba(255, 255, 255, 0.04)",
      }}
    >
      <Icon sx={{ fontSize: 18 }} />
    </IconButton>
  );
}

function FooterColumn({ title, links }: { title: string; links: SiteLink[] }) {
  return (
    <Box>
      <Text sx={{ mb: 1.75, fontWeight: 700, fontSize: 15 }}>{title}</Text>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 1.15,
        }}
      >
        {links.map((link) => (
          <FooterTextLink key={link.id} href={link.href}>
            {link.label}
          </FooterTextLink>
        ))}
      </Box>
    </Box>
  );
}

function FooterTextLink({
  href,
  children,
}: {
  href: string;
  children: string;
}) {
  return (
    <Link
      href={href}
      underline="none"
      sx={{
        color: "text.secondary",
        fontSize: 14,
        fontWeight: 500,
        lineHeight: 1.4,
        "&:hover": { color: "text.primary" },
      }}
    >
      {children}
    </Link>
  );
}

function FooterCall({
  title,
  description,
  action,
  href,
}: {
  title: string;
  description: string;
  action: string;
  href: string;
}) {
  return (
    <Columns
      columns="auto 1fr"
      columnGap={1.5}
      rowGap={1.25}
      alignItems="start"
      sx={{
        gridColumn: { xs: "1 / -1", lg: "auto" },
        p: { xs: 2.25, md: 2.5 },
        borderRadius: "22px",
        border: "1px solid rgba(247, 207, 0, 0.32)",
        bgcolor: "rgba(12, 12, 14, 0.55)",
        boxShadow: "0 0 36px rgba(247, 207, 0, 0.1)",
      }}
    >
      <Box
        sx={{
          display: "grid",
          placeItems: "center",
          width: 36,
          height: 36,
          borderRadius: "10px",
          color: "primary.main",
          bgcolor: "rgba(247, 207, 0, 0.12)",
          border: "1px solid rgba(247, 207, 0, 0.28)",
        }}
      >
        <CalendarMonthOutlined sx={{ fontSize: 18 }} />
      </Box>
      <Text
        sx={{
          fontWeight: 800,
          fontSize: "1.15rem",
          lineHeight: 1.2,
          letterSpacing: "-0.02em",
        }}
      >
        {title}
      </Text>
      <Box />
      <Text tone="secondary" variant="body2">
        {description}
      </Text>
      <Box />
      <Button
        href={href}
        variant="contained"
        endIcon={
          <ArrowForward sx={{ '[dir="rtl"] &': { transform: "scaleX(-1)" } }} />
        }
        sx={{ justifySelf: "start", mt: 0.5, px: 2.25 }}
      >
        {action}
      </Button>
    </Columns>
  );
}
