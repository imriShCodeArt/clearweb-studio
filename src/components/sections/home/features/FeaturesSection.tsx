import { getTranslations } from "next-intl/server";

import { Section } from "@/components/layout";
import { RevealGroup } from "@/components/motion";

import { FeatureItem } from "./FeatureItem";
import { features } from "./features";

export async function FeaturesSection() {
  const t = await getTranslations("home.features");

  return (
    <Section
      id="features"
      label={t("label")}
      spacing="none"
      fullWidth
      sx={{
        backgroundColor: "#E7E2DF",
        backgroundImage:
          "linear-gradient(to bottom, rgba(11, 12, 13, 0.38) 0%, rgba(11, 12, 13, 0.05) 34%, rgba(11, 12, 13, 0.05) 66%, rgba(11, 12, 13, 0.38) 100%), url(/homepage/features/features-section-bg.png)",
        backgroundSize: "100% 100%, cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        color: "#161616",
        py: { xs: 1, md: 4.5 },
      }}
    >
      <RevealGroup
        component="ul"
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "stretch",
          m: 0,
          p: 0,
          listStyle: "none",
        }}
      >
        {features.map((feature, index) => (
          <FeatureItem
            key={feature.id}
            icon={
              <feature.Icon
                sx={{ fontSize: 28, color: "inherit", flexShrink: 0 }}
              />
            }
            title={t(`items.${feature.id}.title`)}
            description={t(`items.${feature.id}.description`)}
            divided={index > 0}
          />
        ))}
      </RevealGroup>
    </Section>
  );
}
