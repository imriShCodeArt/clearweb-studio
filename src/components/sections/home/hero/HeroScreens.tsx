import Box from "@mui/material/Box";

import { Motion } from "@/components/motion";

export function HeroScreens() {
  return (
    <Motion
      aria-hidden
      motion="screens"
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
            xs: "url(/homepage/hero/hero-section-bg-screens-rtl-xs.webp)",
            sm: "url(/homepage/hero/hero-section-bg-screens-rtl-sm.webp)",
            md: "url(/homepage/hero/hero-section-bg-screens-rtl-md.webp)",
            lg: "url(/homepage/hero/hero-section-bg-screens-rtl-lg.webp)",
            xl: "url(/homepage/hero/hero-section-bg-screens-rtl-xl.webp)",
            xxl: "url(/homepage/hero/hero-section-bg-screens-rtl-xxl.webp)",
            xxxl: "url(/homepage/hero/hero-section-bg-screens-rtl-xxxl.webp)",
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
    </Motion>
  );
}
