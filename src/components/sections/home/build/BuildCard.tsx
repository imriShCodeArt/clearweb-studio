import type { ElementType } from "react";
import ArrowOutwardOutlined from "@mui/icons-material/ArrowOutwardOutlined";
import Box from "@mui/material/Box";
import type { SvgIconProps } from "@mui/material/SvgIcon";
import Typography from "@mui/material/Typography";

import { Reveal } from "@/components/motion";
import { Card } from "@/components/surfaces";
import { Text } from "@/components/typography";

type OfferingIcon = ElementType<SvgIconProps>;

type BuildCardProps = {
  Icon: OfferingIcon;
  title: string;
  description: string;
};

export function BuildCard({ Icon, title, description }: BuildCardProps) {
  return (
    <Reveal component="li" sx={{ display: "flex", minWidth: 0 }}>
      <Card
        sx={{
          flex: 1,
          alignItems: "flex-start",
          gap: 2.5,
          width: "100%",
          minHeight: { md: 280 },
          p: { xs: 2.5, md: 3 },
        }}
      >
        <Icon sx={{ fontSize: 32, color: "primary.main" }} />
        <Box>
          <Typography
            sx={{
              mb: 1,
              color: "text.primary",
              fontWeight: 800,
              fontSize: "1.35rem",
              lineHeight: 1.15,
            }}
          >
            {title}
          </Typography>
          <Text tone="secondary" variant="body2">
            {description}
          </Text>
        </Box>
        <Box sx={{ mt: "auto", pt: 1, color: "primary.main" }}>
          <ArrowOutwardOutlined
            sx={{ fontSize: 18, '[dir="rtl"] &': { transform: "scaleX(-1)" } }}
          />
        </Box>
      </Card>
    </Reveal>
  );
}
