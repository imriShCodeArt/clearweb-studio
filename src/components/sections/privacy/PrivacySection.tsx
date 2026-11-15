import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { getTranslations } from "next-intl/server";

import { Link } from "@/components/actions";
import { Section } from "@/components/layout";
import { Eyebrow, Heading, Text } from "@/components/typography";
import { maskPhone, site } from "@/config/site";

const sectionIds = [
  "controller",
  "data",
  "purpose",
  "sharing",
  "retention",
  "rights",
  "security",
  "contact",
] as const;

export async function PrivacySection() {
  const t = await getTranslations("privacy");
  const phone = maskPhone(site.phone);
  const email = site.email;

  return (
    <Section
      id="privacy"
      spacing="page"
      sx={{
        maxWidth: 820,
        pt: { xs: 5, md: 8 },
      }}
    >
      <Eyebrow variant="rule">{t("eyebrow")}</Eyebrow>
      <Box sx={{ mt: 2, mb: 1.5 }}>
        <Heading level={1} variant="compact">
          {t("title")}
        </Heading>
      </Box>
      <Text tone="muted" variant="body2" sx={{ mb: 4 }}>
        {t("updated")}
      </Text>
      <Text tone="secondary" sx={{ mb: 5, maxWidth: 640 }}>
        {t("intro")}
      </Text>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: { xs: 4, md: 5 },
        }}
      >
        {sectionIds.map((id) => (
          <Box key={id} component="article">
            <Typography
              component="h2"
              sx={{
                m: 0,
                fontWeight: 800,
                fontSize: { xs: "1.2rem", md: "1.35rem" },
                letterSpacing: "-0.02em",
              }}
            >
              {t(`sections.${id}.title`)}
            </Typography>
            <Text tone="secondary" sx={{ mt: 1.5 }}>
              {t(`sections.${id}.body`)}
            </Text>
            {id === "contact" ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: 1,
                  mt: 2,
                }}
              >
                <Link href={`mailto:${email}`}>{email}</Link>
                <Link
                  href={`tel:${site.phone.replace(/[^\d+]/g, "")}`}
                  dir="ltr"
                >
                  {phone}
                </Link>
                <Link href={site.contactHref}>{t("contactPage")}</Link>
              </Box>
            ) : null}
          </Box>
        ))}
      </Box>
    </Section>
  );
}
