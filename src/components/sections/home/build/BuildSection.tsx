import type { ReactNode } from "react";
import Box from "@mui/material/Box";
import { getTranslations } from "next-intl/server";

import { Columns, Section } from "@/components/layout";
import { Motion } from "@/components/motion";
import { Eyebrow, MarkedHeading, Text } from "@/components/typography";

import { BuildCard } from "./BuildCard";
import { BuildMotion } from "./BuildMotion";
import { offerings } from "./offerings";

function BuildIntro({ children }: { children: ReactNode }) {
  return <Box sx={{ minWidth: 0 }}>{children}</Box>;
}

function BuildSummary({ children }: { children: ReactNode }) {
  return (
    <Motion
      motion="intro"
      sx={{ maxWidth: 300, flexShrink: 0, mt: { xs: 2, md: 0 } }}
    >
      {children}
    </Motion>
  );
}

export async function BuildSection() {
  const t = await getTranslations("home.build");

  return (
    <BuildMotion>
      <Section id="services" spacing="compact">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "flex-start", md: "center" },
            justifyContent: "space-between",
            mb: { xs: 4, md: 6 },
          }}
        >
          <BuildIntro>
            <Motion motion="intro">
              <Box sx={{ mb: 2.5 }}>
                <Eyebrow variant="rule">{t("eyebrow")}</Eyebrow>
              </Box>
            </Motion>
            <MarkedHeading level={2}>
              <Motion motion="intro">
                <MarkedHeading.Line tilt>{t("line1")}</MarkedHeading.Line>
              </Motion>
              <MarkedHeading.Line>
                <Motion motion="intro">
                  <MarkedHeading.Mark>{t("emphasis")}</MarkedHeading.Mark>
                </Motion>
              </MarkedHeading.Line>
            </MarkedHeading>
          </BuildIntro>
          <BuildSummary>
            <Text tone="secondary">{t("description")}</Text>
          </BuildSummary>
        </Box>

        <Columns component="ul" columns={{ md: 3 }} gap={2}>
          {offerings.map((offering) => (
            <BuildCard
              key={offering.id}
              Icon={offering.Icon}
              title={t(`items.${offering.id}.title`)}
              description={t(`items.${offering.id}.description`)}
            />
          ))}
        </Columns>
      </Section>
    </BuildMotion>
  );
}
