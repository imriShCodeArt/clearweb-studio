import Box from "@mui/material/Box";

import { Text } from "@/components/typography";

type ProcessStepCopyProps = {
  number: string;
  title: string;
  description: string;
};

export function ProcessStepCopy({
  number,
  title,
  description,
}: ProcessStepCopyProps) {
  return (
    <Box sx={{ maxWidth: 176 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: { xs: "center", lg: "flex-start" },
          gap: 1,
          mb: 0.75,
        }}
      >
        <Box
          component="span"
          sx={{
            color: "primary.main",
            fontWeight: 800,
            fontSize: "1.05rem",
            lineHeight: 1.2,
          }}
        >
          {number}
        </Box>
        <Box
          component="span"
          sx={{
            fontWeight: 800,
            fontSize: "1.05rem",
            lineHeight: 1.2,
          }}
        >
          {title}
        </Box>
      </Box>
      <Text tone="secondary" variant="body2">
        {description}
      </Text>
    </Box>
  );
}
