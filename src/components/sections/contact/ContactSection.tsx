import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import { getLocaleDirection } from "@/i18n/locale";
import type { Locale } from "@/i18n/routing";

import { ContactBackdrop } from "./ContactBackdrop";
import { ContactBar } from "./ContactBar";
import { ContactForm } from "./ContactForm";
import { ContactIntro } from "./ContactIntro";
import { ContactMotion } from "./ContactMotion";

export async function ContactSection({ locale }: { locale: Locale }) {
  const direction = getLocaleDirection(locale);

  return (
    <ContactMotion>
      <Box
        component="section"
        sx={{
          position: "relative",
          isolation: "isolate",
          display: "flex",
          flexDirection: "column",
          minHeight: { md: "90svh" },
          mt: { xs: "-72px", md: "-90px" },
          overflow: "hidden",
          backgroundColor: "#0B0C0D",
        }}
      >
        <ContactBackdrop />

        <Container
          sx={{
            position: "relative",
            zIndex: 1,
            flex: 1,
            display: "flex",
            alignItems: "center",
            maxWidth: 1200,
            pt: { xs: "104px", md: "128px" },
            pb: { xs: 5, md: 6 },
          }}
        >
          <Box
            dir="ltr"
            sx={{
              display: "grid",
              alignItems: "center",
              width: "100%",
              gap: { xs: 5, lg: 8 },
              gridTemplateColumns: {
                xs: "1fr",
                lg: "minmax(0, 1fr) minmax(320px, 440px)",
              },
            }}
          >
            <ContactIntro locale={locale} />
            <Box dir={direction}>
              <ContactForm />
            </Box>
          </Box>
        </Container>

        <ContactBar />
      </Box>
    </ContactMotion>
  );
}
