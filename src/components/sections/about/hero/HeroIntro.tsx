import Box from "@mui/material/Box";

import { Columns } from "@/components/layout";
import { Motion } from "@/components/motion";
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
  return (
    <Columns
      alignItems="center"
      columnGap={{ md: 4 }}
      rowGap={2}
      columns={{ xs: 1, md: "minmax(0, 1.15fr) minmax(200px, 0.85fr)" }}
    >
      <Box>
        <Motion motion="eyebrow" sx={{ mb: 2 }}>
          <Eyebrow variant="rule">{eyebrow}</Eyebrow>
        </Motion>
        <MarkedHeading level={1} variant="compact">
          <Motion component="span" motion="line1" sx={line}>
            <MarkedHeading.Line>{line1}</MarkedHeading.Line>
          </Motion>
          <Motion component="span" motion="name" sx={line}>
            <MarkedHeading.Line>
              <MarkedHeading.Mark>{name}</MarkedHeading.Mark>
            </MarkedHeading.Line>
          </Motion>
        </MarkedHeading>
        <Motion motion="role">
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
        </Motion>
      </Box>
      <Motion motion="description">
        <Text tone="secondary" sx={{ maxWidth: 360 }}>
          {description}
        </Text>
      </Motion>
    </Columns>
  );
}
