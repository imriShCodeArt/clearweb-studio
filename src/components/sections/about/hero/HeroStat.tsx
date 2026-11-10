import Box from "@mui/material/Box";

import { homeMotion } from "@/animations/home";
import { FadeIn, ReelText } from "@/components/motion";
import { Text } from "@/components/typography";

import type { HeroStatIcon } from "./stats";

type HeroStatProps = {
  icon: HeroStatIcon;
  value: string;
  label: string;
  divided: boolean;
  delay?: number;
};

export function HeroStat({ icon: Icon, value, label, divided, delay = 0 }: HeroStatProps) {
  return (
    <FadeIn
      component="li"
      delay={delay}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        minWidth: 0,
        paddingInlineStart: { sm: divided ? 2.5 : 0 },
        borderInlineStart: {
          sm: divided ? "1px solid rgba(255, 255, 255, 0.16)" : "none",
        },
      }}
    >
      <Box
        aria-hidden
        sx={{
          display: "grid",
          placeItems: "center",
          flex: "0 0 auto",
          width: 48,
          height: 48,
          borderRadius: "14px",
          color: "primary.main",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          bgcolor: "rgba(255, 255, 255, 0.03)",
        }}
      >
        <Icon sx={{ fontSize: 22 }} />
      </Box>
      <Box sx={{ minWidth: 0 }}>
        <Box
          sx={{
            color: "text.primary",
            fontWeight: 800,
            fontSize: { xs: "1.45rem", md: "1.7rem" },
            lineHeight: 1,
            letterSpacing: "-0.03em",
            display: "flex",
            gap: .75,
            alignItems: "baseline",
          }}
        >
          <ReelText
            text={value}
            variant="count"
            delay={delay + homeMotion.fade.duration - 0.4}
          />
          <Text
            variant="body2"
            tone="secondary"
            sx={{ mt: 0.5, fontSize: "1.25rem" }}
          >
            +
          </Text>
        </Box>
        <Text variant="body2" tone="secondary" sx={{ mt: 0.5 }}>
          {label}
        </Text>
      </Box>
    </FadeIn>
  );
}
