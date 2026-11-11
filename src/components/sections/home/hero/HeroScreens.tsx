import Box from "@mui/material/Box";

import { homeMotion } from "@/animations/home";
import { FadeIn } from "@/components/motion";

export function HeroScreens() {
  const { screens } = homeMotion.hero;

  return (
    <FadeIn
      aria-hidden
      delay={screens.at}
      duration={screens.duration}
      from="bottom"
      sx={{
        position: "absolute",
        inset: 0,
        zIndex: 1,
        pointerEvents: "none",
      }}
    >
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          opacity: 0.7,
          backgroundImage: {
            xs: "url(/homepage/hero/hero-section-bg-screens-rtl-xs.png)",
            sm: "url(/homepage/hero/hero-section-bg-screens-rtl-sm.png)",
            md: "url(/homepage/hero/hero-section-bg-screens-rtl-md.png)",
            lg: "url(/homepage/hero/hero-section-bg-screens-rtl-lg.png)",
            xl: "url(/homepage/hero/hero-section-bg-screens-rtl-xl.png)",
            xxl: "url(/homepage/hero/hero-section-bg-screens-rtl-xxl.png)",
            xxxl: "url(/homepage/hero/hero-section-bg-screens-rtl-xxxl.png)",
          },
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: {
            xs: "bottom",
            sm: "center",
            md: "0% 0",
            lg: "0% 50%",
            xxl: "90% 60%",
            xxxl: "90% 10%",
          },
        }}
      />
    </FadeIn>
  );
}
