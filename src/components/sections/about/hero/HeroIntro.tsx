import Box from "@mui/material/Box";

import { Columns } from "@/components/layout";
import { CompactHeading, Text } from "@/components/typography";

type HeroIntroProps = {
  eyebrow: string;
  line1: string;
  name: string;
  role: string;
  description: string;
};

export function HeroIntro({ eyebrow, line1, name, role, description }: HeroIntroProps) {
  return (
    <Columns
      alignItems="center"
      columnGap={{ md: 4 }}
      rowGap={2}
      columns={{ xs: 1, md: "minmax(0, 1.15fr) minmax(200px, 0.85fr)" }}
    >
      <Box>
        <CompactHeading eyebrow={eyebrow} line1={line1} line2={name} level={1} />
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
      </Box>
      <Text tone="secondary" sx={{ maxWidth: 360 }}>
        {description}
      </Text>
    </Columns>
  );
}
