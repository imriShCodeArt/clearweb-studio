import type { ReactNode } from "react";
import Box from "@mui/material/Box";

import { Section } from "@/components/layout";

import { HeroScreens } from "./HeroScreens";

function HeroShade() {
  return (
    <Box
      aria-hidden
      style={{
        backgroundImage:
          "radial-gradient(ellipse 130% 55% at 50% 100%, " +
          "rgba(11, 12, 13, 0.72) 0%, " +
          "rgba(11, 12, 13, 0.18) 46%, " +
          "rgba(11, 12, 13, 0) 72%), " +
          "radial-gradient(ellipse 100% 85% at 50% 40%, " +
          "rgba(11, 12, 13, 0.04) 0%, " +
          "rgba(11, 12, 13, 0.1) 52%, " +
          "rgba(11, 12, 13, 0.38) 100%)",
      }}
      sx={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 1,
      }}
    />
  );
}

export function HeroContainer({ children }: { children: ReactNode }) {
  return (
    <Section
      id="hero"
      spacing="none"
      contained
      fullWidth
      sx={{
        position: "relative",
        zIndex: 0,
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "stretch",
        overflow: "hidden",
        mt: { xs: "-72px", md: "-84px" },
        minHeight: { xs: "900px", sm: "100svh", md: "72svh" },
        backgroundColor: "#0B0C0D",
        backgroundImage: {
          xs: "url(/homepage/hero/hero-section-bg-desk-rtl-xs.png)",
          sm: "url(/homepage/hero/hero-section-bg-desk-rtl-sm.png)",
          md: "url(/homepage/hero/hero-section-bg-desk-rtl-md.png)",
          lg: "url(/homepage/hero/hero-section-bg-desk-rtl-lg.png)",
          xl: "url(/homepage/hero/hero-section-bg-desk-rtl-xl.png)",
          xxl: "url(/homepage/hero/hero-section-bg-desk-rtl-xxl.png)",
          xxxl: "url(/homepage/hero/hero-section-bg-desk-rtl-xxxl.png)",
        },
        backgroundSize: "cover",
        backgroundPosition: {
          xs: "bottom",
          sm: "center",
          md: "0% 0",
          lg: "0% 50%",
          xxl: "90% 60%",
          xxxl: "90% 10%",
        },
        backgroundRepeat: "no-repeat",
      }}
    >
      <HeroShade />
      <HeroScreens />
      {children}
    </Section>
  );
}
