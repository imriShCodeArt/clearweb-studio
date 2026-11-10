import type { useTranslations } from "next-intl";

const routes = {
  home: "/",
  work: "/#work",
  services: "/services",
  process: "/#process",
  features: "/#features",
  about: "/about",
  privacy: "/#privacy",
  terms: "/#terms",
  accessibility: "/#accessibility",
  contact: "/contact",
} as const;

export const site = {
  brandHref: routes.home,
  contactHref: routes.contact,
  mainNav: [
    { id: "home", href: routes.home },
    { id: "work", href: routes.work },
    { id: "services", href: routes.services },
    { id: "about", href: routes.about },
    { id: "contact", href: routes.contact},
  ],
  footerColumns: [
    {
      id: "services",
      links: [
        { id: "websites", href: routes.services },
        { id: "applications", href: routes.services },
        { id: "landing", href: routes.services },
        { id: "ongoing", href: routes.services },
      ],
    },
    {
      id: "process",
      links: [
        { id: "how", href: routes.services },
        { id: "discovery", href: routes.process },
        { id: "architecture", href: routes.services },
        { id: "development", href: routes.process },
        { id: "launch", href: routes.process },
      ],
    },
    {
      id: "company",
      links: [
        { id: "about", href: routes.about },
        { id: "work", href: routes.work },
        { id: "insights", href: routes.features },
        { id: "contact", href: routes.contact },
      ],
    },
  ],
  legal: [
    { id: "privacy", href: routes.privacy },
    { id: "terms", href: routes.terms },
    { id: "accessibility", href: routes.accessibility },
  ],
  social: [{ id: "linkedin" }, { id: "youtube" }, { id: "website" }],
} as const;

type ShellTranslator = ReturnType<typeof useTranslations<"shell">>;

export type SiteLink = {
  id: string;
  label: string;
  href: string;
};

export type SocialId = (typeof site.social)[number]["id"];

export type SiteFooter = {
  navLabel: string;
  tagline: string;
  rights: string;
  columns: { id: string; title: string; links: SiteLink[] }[];
  legal: SiteLink[];
  social: { id: SocialId; label: string }[];
  cta: {
    title: string;
    description: string;
    action: string;
    href: string;
  };
};

export type SiteShell = {
  brand: string;
  brandHref: string;
  nav: SiteLink[];
  navLabel: string;
  menuLabel: string;
  closeLabel: string;
  talkLabel: string;
  footer: SiteFooter;
};

export function shellContent(t: ShellTranslator): SiteShell {
  return {
    brand: t("brand"),
    brandHref: site.brandHref,
    nav: site.mainNav.map((item) => ({
      id: item.id,
      label: t(item.id),
      href: item.href,
    })),
    navLabel: t("navLabel"),
    menuLabel: t("menuLabel"),
    closeLabel: t("closeLabel"),
    talkLabel: t("talk"),
    footer: {
      navLabel: t("navLabel"),
      tagline: t("footer.tagline"),
      rights: t("footer.rights"),
      columns: site.footerColumns.map((column) => ({
        id: column.id,
        title: t(`footer.${column.id}.title`),
        links: column.links.map((link) => ({
          id: link.id,
          label: t(`footer.${column.id}.${link.id}`),
          href: link.href,
        })),
      })),
      legal: site.legal.map((item) => ({
        id: item.id,
        label: t(`footer.${item.id}`),
        href: item.href,
      })),
      social: site.social.map((item) => ({
        id: item.id,
        label: t(`footer.${item.id}`),
      })),
      cta: {
        title: t("footer.cta.title"),
        description: t("footer.cta.description"),
        action: t("footer.cta.action"),
        href: site.contactHref,
      },
    },
  };
}
