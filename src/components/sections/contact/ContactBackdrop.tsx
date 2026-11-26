import Box from "@mui/material/Box";

import { Motion } from "@/components/motion";

export function ContactBackdrop() {
  return (
    <Motion
      aria-hidden
      motion="backdrop"
      sx={{
        position: "absolute",
        inset: 0,
        backgroundColor: "#0B0C0D",
        backgroundImage: {
          xs: "url(/contact/contact-bg-desk-rtl-xs.webp)",
          sm: "url(/contact/contact-bg-desk-rtl-sm.webp)",
          md: "url(/contact/contact-bg-desk-rtl-md.webp)",
          lg: "url(/contact/contact-bg-desk-rtl-lg.webp)",
          xl: "url(/contact/contact-bg-desk-rtl-xl.webp)",
        },
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: { xs: "center bottom", md: "center" },
        pointerEvents: "none",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(11, 12, 13, 0.78) 0%, " +
            "rgba(11, 12, 13, 0.48) 42%, " +
            "rgba(11, 12, 13, 0.55) 100%)",
        }}
      />
    </Motion>
  );
}
