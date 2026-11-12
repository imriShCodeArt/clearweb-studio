import Box from "@mui/material/Box";
import { getTranslations } from "next-intl/server";

import { Section } from "@/components/layout";
import { Motion } from "@/components/motion";
import { Eyebrow, MarkedHeading } from "@/components/typography";

import { ProcessMotion } from "./ProcessMotion";
import { ProcessSteps } from "./ProcessSteps";

export async function ProcessSection() {
  const t = await getTranslations("home.process");
  const leadIn = t("leadIn");

  return (
    <ProcessMotion>
      <Section id="process" spacing="compact">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            alignItems: { xs: "center", lg: "flex-start" },
            gap: { xs: 5, lg: 5 },
          }}
        >
          <Box
            sx={{
              overflow: "hidden",
              boxSizing: "content-box",
              width: { xs: "auto", lg: 280 },
              maxWidth: { xs: "100%", lg: "none" },
              flexShrink: 0,
              px: "24px",
              mx: "-24px",
              py: "12px",
              my: "-12px",
            }}
          >
            <Motion
              motion="heading"
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: { xs: "center", lg: "flex-start" },
                width: "100%",
                textAlign: { xs: "center", lg: "start" },
                "& h2": {
                  display: "flex",
                  flexDirection: "column",
                  alignItems: { xs: "center", lg: "flex-start" },
                },
              }}
            >
              <Box sx={{ mb: 2.5 }}>
                <Eyebrow variant="rule">{t("eyebrow")}</Eyebrow>
              </Box>
              <MarkedHeading level={2}>
                <MarkedHeading.Line tilt>{t("line1")}</MarkedHeading.Line>
                <MarkedHeading.Line tilt>{t("line2")}</MarkedHeading.Line>
                <MarkedHeading.Line nowrap>
                  {leadIn ? `${leadIn} ` : null}
                  <MarkedHeading.Mark>{t("emphasis")}</MarkedHeading.Mark>
                </MarkedHeading.Line>
              </MarkedHeading>
            </Motion>
          </Box>

          <ProcessSteps />
        </Box>
      </Section>
    </ProcessMotion>
  );
}
