import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { Eyebrow, Text } from "@/components/typography";

type OfferingCopyProps = {
  index: string;
  title: string;
  description: string;
  wide?: boolean;
};

export function OfferingCopy({
  index,
  title,
  description,
  wide = false,
}: OfferingCopyProps) {
  return (
    <Box
      sx={{
        position: "relative",
        zIndex: 1,
        maxWidth: wide
          ? { xs: "68%", sm: "clamp(20rem, 48%, 24rem)", lg: "68%" }
          : "68%",
        p: { xs: 2.5, md: 3 },
        color: "text.secondary",
      }}
    >
      <Box sx={{ mb: 1.5 }}>
        <Eyebrow variant="rule">{index}</Eyebrow>
      </Box>
      <Typography
        sx={{
          mb: 1.25,
          color: "text.primary",
          fontWeight: 800,
          fontSize: "clamp(1.45rem, 1.6vw, 1.85rem)",
          lineHeight: 1.1,
          letterSpacing: "-0.03em",
        }}
      >
        {title}
      </Typography>
      <Text tone="secondary" variant="body2">
        {description}
      </Text>
    </Box>
  );
}
