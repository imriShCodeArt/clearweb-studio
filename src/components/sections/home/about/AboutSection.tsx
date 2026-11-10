import Box from "@mui/material/Box";

import { getTranslations } from "next-intl/server";

import { PrimaryButton } from "@/components/actions";
import { Reveal, Sequence } from "@/components/motion";
import { Section } from "@/components/layout";
import { Eyebrow, MarkedHeading, Text } from "@/components/typography";

import { AboutBackdrop } from "./AboutBackdrop";

export async function AboutSection() {
  const t = await getTranslations("home.about");

  return (
    <Section
      fullWidth
      id="about"
      sx={{
        position: "relative",
        display: "flex",
        alignItems: { xs: "flex-start", md: "center" },
        zIndex: 1,
        minHeight: { xs: 720, md: 560 },
      }}
    >
      <AboutBackdrop />
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          py: { xs: 4, md: 8 },
        }}
      >
        <Sequence cascade sx={{ maxWidth: 460 }}>
          <Reveal>
            <Box sx={{ mb: 2.5 }}>
              <Eyebrow variant="rule">{t("eyebrow")}</Eyebrow>
            </Box>
          </Reveal>
          <MarkedHeading level={2}>
            <Reveal>
              <MarkedHeading.Line tilt>{t("line1")}</MarkedHeading.Line>
            </Reveal>
            <MarkedHeading.Line>
              <Reveal>
                <MarkedHeading.Mark>{t("name")}</MarkedHeading.Mark>
              </Reveal>
            </MarkedHeading.Line>
          </MarkedHeading>
          <Reveal>
            <Box sx={{ maxWidth: 420, mt: 3, mb: 3.5 }}>
              <Text tone="secondary">{t("description")}</Text>
            </Box>
          </Reveal>
          <Reveal>
            <PrimaryButton href="/about">{t("more")}</PrimaryButton>
          </Reveal>
        </Sequence>
      </Box>
    </Section>
  );
}
