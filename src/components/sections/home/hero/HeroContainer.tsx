import type { ReactNode } from "react";
import Box from "@mui/material/Box";

import { Section } from "@/components/layout";

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
        alignItems: { xs: "stretch", md: "center" },
        overflow: "hidden",
        mt: { xs: "-72px", md: "-90px" },
        minHeight: { xs: "900px", sm: "100svh", md: "72svh" },
        backgroundColor: "#0B0C0D",
        backgroundImage: {
          xs: "url(/homepage/hero-section-bg-desk-rtl-MOBILE.png)",
          md: "url(/homepage/hero-section-bg-desk-rtl.png)",
          xl: "url(/homepage/hero-section-bg-desk-rtl-WIDESCREEN.png)",
        },
        backgroundSize: "cover",
        backgroundPosition: { xs: "0 80%", md: "top", lg: "0% 50%" },
        backgroundRepeat: "no-repeat",
      }}
    >
      <HeroShade />
      {children}
    </Section>
  );
}
