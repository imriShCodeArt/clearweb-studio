import { getTranslations } from "next-intl/server";

import { Columns, Section } from "@/components/layout";
import { StaggeredSectionMotion } from "@/components/motion";

import { OfferingCard } from "./OfferingCard";
import { offerings } from "./offerings";

export async function OfferingsSection() {
  const t = await getTranslations("services.offerings");

  return (
    <StaggeredSectionMotion waitForHero>
      <Section id="services-offerings" label={t("label")} spacing="compact">
        <Columns component="ul" columns={{ sm: 2, lg: 3 }} gap={{ xs: 2, md: 2.5 }}>
          {offerings.map((offering) => (
            <OfferingCard
              key={offering.id}
              index={offering.index}
              title={t(`${offering.id}.title`)}
              description={t(`${offering.id}.description`)}
              image={offering.image}
              tags={offering.tags.map((tag) => ({
                label: t(`${offering.id}.${tag.id}`),
                Icon: tag.Icon,
              }))}
              wide={offering.wide}
            />
          ))}
        </Columns>
      </Section>
    </StaggeredSectionMotion>
  );
}
