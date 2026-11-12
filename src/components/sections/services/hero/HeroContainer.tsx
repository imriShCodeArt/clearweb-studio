import type { ReactNode } from "react";
import Box from "@mui/material/Box";

import { Columns, Section } from "@/components/layout";

const glow =
  "radial-gradient(ellipse at center, rgba(247, 207, 0, 0.42) 0%, rgba(247, 207, 0, 0.14) 42%, transparent 72%)";

function HeroStones() {
  return (
    <Box
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
      }}
      sx={{
        zIndex: 0,
        backgroundImage: "url(/services/hero/services-hero-bg-stones.png)",
        backgroundRepeat: "no-repeat",
        backgroundSize: { xs: "auto 72%", sm: "auto 90%", lg: "auto 100%" },
        pointerEvents: "none",
        opacity: 0.5,
        backgroundPosition: { xs: "0% 100%", sm: "-25% bottom" },
      }}
    />
  );
}

function HeroStonesAccent() {
  return (
    <Box
      aria-hidden
      style={{
        right: '-5%',
        backgroundPosition: "center",
        transform: "scaleX(-1)",
      }}
      sx={{
        position: "absolute",
        zIndex: 0,
        // top: { xs: -48, md: -30 },
        bottom: { xs: "48%", sm: "40%" },
        width: { xs: "42%", sm: "30%" },
        maxWidth: 300,
        minWidth: { xs: 140, sm: 180 },
        aspectRatio: "1",
        backgroundImage: "url(/services/hero/services-hero-bg-stones.png)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        pointerEvents: "none",
        opacity: 0.5,
      }}
    />
  );
}

function HeroGlow() {
  return (
    <Box
      aria-hidden
      sx={{
        position: "absolute",
        zIndex: 0,
        width: { xs: "78%", md: "46%" },
        height: { xs: 220, md: 340 },
        insetInlineEnd: { xs: "-10%", md: "-4%" },
        bottom: { xs: 12, md: -24 },
        background: glow,
        filter: "blur(10px)",
        pointerEvents: "none",
        overflow: "visible",
      }}
    />
  );
}

export function HeroContainer({
  id,
  children,
}: {
  id?: string;
  children: ReactNode;
}) {
  return (
    <Section
      id={id}
      spacing="compact"
      fullWidth
      contained
      sx={{
        position: "relative",
        overflow: "hidden",
      }}
    >
      <HeroStones />
      <HeroStonesAccent />
      <HeroGlow />
      <Columns
        alignItems="center"
        columnGap={{ sm: 4, lg: 7, xl: 10 }}
        rowGap={{ xs: 3, md: 4 }}
        columns={{
          xs: 1,
          sm: 2,
          lg: "auto minmax(240px, 300px) minmax(420px, 1fr)",
        }}
        areas={{
          xs: `"title" "copy" "art"`,
          sm: `"copy art"`,
          lg: `"title copy art"`,
        }}
        sx={{ position: "relative", zIndex: 1, minWidth: 0 }}
      >
        {children}
      </Columns>
    </Section>
  );
}
