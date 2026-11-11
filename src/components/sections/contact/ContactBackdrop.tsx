import Box from "@mui/material/Box";

export function ContactBackdrop() {
  return (
    <Box
      aria-hidden
      sx={{
        position: "absolute",
        inset: 0,
        backgroundColor: "#0B0C0D",
        backgroundImage: {
          xs: "url(/contact/contact-bg-desk-rtl-xs.png)",
          sm: "url(/contact/contact-bg-desk-rtl-sm.png)",
          md: "url(/contact/contact-bg-desk-rtl-md.png)",
          lg: "url(/contact/contact-bg-desk-rtl-lg.png)",
          xl: "url(/contact/contact-bg-desk-rtl-xl.png)",
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
    </Box>
  );
}
