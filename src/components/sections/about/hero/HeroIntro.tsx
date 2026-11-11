import Box from "@mui/material/Box";

import { aboutMotion } from "@/animations/about";
import { Columns } from "@/components/layout";
import { FadeIn } from "@/components/motion";
import { Eyebrow, MarkedHeading, Text } from "@/components/typography";

type HeroIntroProps = {
  eyebrow: string;
  line1: string;
  name: string;
  role: string;
  description: string;
};

const line = { display: "block" } as const;

export function HeroIntro({ eyebrow, line1, name, role, description }: HeroIntroProps) {
  const { hero } = aboutMotion;

  return (
    <Columns
      alignItems="center"
      columnGap={{ md: 4 }}
      rowGap={2}
      columns={{ xs: 1, md: "minmax(0, 1.15fr) minmax(200px, 0.85fr)" }}
    >
      <Box>
        <FadeIn delay={hero.eyebrow} from="top" sx={{ mb: 2 }}>
          <Eyebrow variant="rule">{eyebrow}</Eyebrow>
        </FadeIn>
        <MarkedHeading level={1} variant="compact">
          <FadeIn component="span" delay={hero.line1} from="top" sx={line}>
            <MarkedHeading.Line>{line1}</MarkedHeading.Line>
          </FadeIn>
          <FadeIn component="span" delay={hero.name} sx={line}>
            <MarkedHeading.Line>
              <MarkedHeading.Mark>{name}</MarkedHeading.Mark>
            </MarkedHeading.Line>
          </FadeIn>
        </MarkedHeading>
        <FadeIn delay={hero.role}>
          <Text
            sx={{
              mt: 1.5,
              color: "text.primary",
              fontWeight: 700,
              fontSize: { xs: "1.05rem", md: "1.2rem" },
              lineHeight: 1.35,
            }}
          >
            {role}
          </Text>
        </FadeIn>
      </Box>
      <FadeIn delay={hero.description}>
        <Text tone="secondary" sx={{ maxWidth: 360 }}>
          {description}
        </Text>
      </FadeIn>
    </Columns>
  );
}
