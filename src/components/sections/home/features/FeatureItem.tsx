import type { ReactNode } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { CoinJump, Reveal } from "@/components/motion";

function FeatureDivider() {
  return (
    <Box
      aria-hidden
      sx={{
        flexShrink: 0,
        alignSelf: "stretch",
        bgcolor: "rgba(22, 22, 22, 0.28)",
        width: { xs: "auto", md: "1px" },
        height: { xs: "1px", md: "auto" },
        mx: { xs: 1, md: 0 },
        my: { md: 0.5 },
      }}
    />
  );
}

type FeatureItemProps = {
  icon: ReactNode;
  title: string;
  description: string;
  divided: boolean;
  order?: number;
};

export function FeatureItem({
  icon,
  title,
  description,
  divided,
  order = 0,
}: FeatureItemProps) {
  return (
    <Reveal
      component="li"
      sx={{
        display: "flex",
        flex: 1,
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        minWidth: 0,
      }}
    >
      {divided ? <FeatureDivider /> : null}
      <Box
        sx={{
          display: "flex",
          flex: 1,
          alignItems: "center",
          gap: 1.75,
          width: { xs: "100%", md: "auto" },
          minWidth: 0,
          px: { xs: 1, md: 3 },
          py: { xs: 2.25, md: 1 },
          justifyContent: "flex-start",
        }}
      >
        <CoinJump order={order}>{icon}</CoinJump>
        <Box sx={{ minWidth: 0 }}>
          <Typography
            sx={{
              color: "#161616",
              fontWeight: 800,
              fontSize: "1.05rem",
              lineHeight: 1.15,
            }}
          >
            {title}
          </Typography>
          <Typography
            sx={{
              mt: 0.35,
              color: "rgba(22, 22, 22, 0.72)",
              fontSize: "0.92rem",
              lineHeight: 1.35,
            }}
          >
            {description}
          </Typography>
        </Box>
      </Box>
    </Reveal>
  );
}
