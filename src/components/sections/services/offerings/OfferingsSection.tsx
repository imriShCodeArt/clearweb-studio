import { getTranslations } from "next-intl/server";

import { servicesMotion } from "@/animations/services";
import { Columns, Section } from "@/components/layout";

import { OfferingCard } from "./OfferingCard";
import { offerings } from "./offerings";

export async function OfferingsSection() {
  const t = await getTranslations("services.offerings");

  return (
    <Section id="services-offerings" label={t("label")} spacing="compact">
      <Columns component="ul" columns={{ sm: 2, lg: 3 }} gap={{ xs: 2, md: 2.5 }}>
        {offerings.map((offering, index) => (
          <OfferingCard
            key={offering.id}
            delay={index * servicesMotion.stagger}
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
  );
}
