import Box from "@mui/material/Box";

import { getTranslations } from "next-intl/server";

import { PrimaryButton } from "@/components/actions";
import { Reveal, Sequence } from "@/components/motion";
import { Section } from "@/components/layout";
import { MarkedHeading, Text } from "@/components/typography";

import { ContactBackdrop } from "./ContactBackdrop";
import { ContactHeading } from "./ContactHeading";
import { ContactPitch } from "./ContactPitch";

export async function ContactSection() {
  const t = await getTranslations("home.contact");

  return (
    <Section
      fullWidth
      id="contact"
      sx={{
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        minHeight: { xs: 640, md: 560 },
        mt: "clamp(-48px, -3vw, -32px)",
      }}
    >
      <ContactBackdrop />
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          py: { xs: 6, md: 8 },
        }}
      >
        <Sequence
          cascade
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: { xs: "flex-start", md: "center" },
            gap: { xs: 4, md: 8 },
          }}
        >
          <ContactHeading>
            <MarkedHeading level={2}>
              <Reveal>
                <MarkedHeading.Line tilt>{t("line1")}</MarkedHeading.Line>
              </Reveal>
              <Reveal>
                <MarkedHeading.Line tilt>{t("line2")}</MarkedHeading.Line>
              </Reveal>
              <MarkedHeading.Line>
                <Reveal>
                  <MarkedHeading.Mark>{t("emphasis")}</MarkedHeading.Mark>
                </Reveal>
              </MarkedHeading.Line>
            </MarkedHeading>
          </ContactHeading>
          <ContactPitch>
            <Reveal>
              <Text tone="secondary">{t("description")}</Text>
            </Reveal>
            <Reveal>
              <Box sx={{ mt: 3 }}>
                <PrimaryButton>{t("talk")}</PrimaryButton>
              </Box>
            </Reveal>
          </ContactPitch>
        </Sequence>
      </Box>
    </Section>
  );
}
