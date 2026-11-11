import { getTranslations } from "next-intl/server";

import { aboutMotion } from "@/animations/about";
import { Columns, Section } from "@/components/layout";
import { FadeIn } from "@/components/motion";
import { CompactHeading } from "@/components/typography";

import { ApproachCard } from "./ApproachCard";
import { pillars } from "./pillars";

export async function ApproachSection() {
  const t = await getTranslations("about.approach");

  return (
    <Section id="about-approach" label={t("label")} spacing="compact">
      <Columns
        alignItems={{ lg: "center" }}
        gap={{ xs: 3, lg: 2.5 }}
        columns={{ lg: "minmax(220px, 1.05fr) minmax(0, 3fr)" }}
        sx={{
          p: { xs: 2, md: 2.5 },
          borderRadius: { xs: "24px", md: "32px" },
          border: "1px solid rgba(255, 255, 255, 0.14)",
          backgroundColor: "rgba(255, 255, 255, 0.02)",
        }}
      >
        <FadeIn from="top">
          <CompactHeading
            eyebrow={t("eyebrow")}
            line1={t("line1")}
            line2={t("line2")}
            description={t("description")}
            sx={{
              minWidth: 0,
              maxWidth: { md: 460, lg: "none" },
              "& h2": { fontSize: "clamp(2rem, 2.6vw, 2.65rem)" },
            }}
          />
        </FadeIn>
        <Columns
          component="ul"
          columns={{ sm: 3 }}
          gap={{ xs: 1.5, md: 2 }}
          sx={{ minWidth: 0 }}
        >
          {pillars.map((pillar, index) => (
            <ApproachCard
              key={pillar.id}
              title={t(`pillars.${pillar.id}.title`)}
              description={t(`pillars.${pillar.id}.description`)}
              image={pillar.image}
              delay={aboutMotion.lead + index * aboutMotion.stagger}
              index={index}
            />
          ))}
        </Columns>
      </Columns>
    </Section>
  );
}
