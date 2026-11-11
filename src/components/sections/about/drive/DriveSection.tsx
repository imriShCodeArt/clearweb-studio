import { getTranslations } from "next-intl/server";

import { aboutMotion } from "@/animations/about";
import { Columns, Section } from "@/components/layout";
import { FadeIn } from "@/components/motion";
import { CompactHeading } from "@/components/typography";

import { DriveValue } from "./DriveValue";
import { values } from "./values";

export async function DriveSection() {
  const t = await getTranslations("about.drive");

  return (
    <Section id="about-drive" label={t("label")} spacing="compact">
      <Columns
        alignItems={{ lg: "center" }}
        columns={{ lg: "auto minmax(0, 1fr)" }}
        gap={{ xs: 3, lg: 5 }}
      >
        <FadeIn from="top">
          <CompactHeading
            eyebrow={t("eyebrow")}
            line1={t("line1")}
            line2={t("line2")}
            sx={{
              minWidth: 0,
              "& h2": {
                display: "flex",
                flexWrap: "wrap",
                alignItems: "baseline",
                columnGap: "0.35em",
                fontSize: "clamp(2rem, 2.6vw, 2.75rem)",
              },
            }}
          />
        </FadeIn>
        <Columns component="ul" columns={{ md: 3 }} sx={{ minWidth: 0 }}>
          {values.map((value, index) => (
            <DriveValue
              key={value.id}
              Icon={value.Icon}
              title={t(`values.${value.id}.title`)}
              description={t(`values.${value.id}.description`)}
              divided={index > 0}
              delay={aboutMotion.lead + index * aboutMotion.stagger}
            />
          ))}
        </Columns>
      </Columns>
    </Section>
  );
}
