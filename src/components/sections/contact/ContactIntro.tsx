import CalendarMonthOutlined from "@mui/icons-material/CalendarMonthOutlined";
import EmailOutlined from "@mui/icons-material/EmailOutlined";
import PhoneOutlined from "@mui/icons-material/PhoneOutlined";
import Box from "@mui/material/Box";
import { getTranslations } from "next-intl/server";

import { CopyLink, Link } from "@/components/actions";
import { Eyebrow, MarkedHeading, Text } from "@/components/typography";
import { maskPhone, site } from "@/config/site";
import { getLocaleDirection } from "@/i18n/locale";
import type { Locale } from "@/i18n/routing";

import { ContactChannel } from "./ContactChannel";

export async function ContactIntro({ locale }: { locale: Locale }) {
  const t = await getTranslations("contact");
  const direction = getLocaleDirection(locale);
  const phone = site.phone;
  const email = site.email;

  return (
    <Box dir={direction} sx={{ minWidth: 0, maxWidth: 560 }}>
      <Eyebrow>{t("eyebrow")}</Eyebrow>
      <Box
        sx={{
          mt: 2,
          mb: 2.5,
          "& h1": {
            fontSize: "clamp(2.5rem, 5vw, 4.4rem)",
          },
        }}
      >
        <MarkedHeading level={1}>
          <MarkedHeading.Line>{t("line1")}</MarkedHeading.Line>
          <MarkedHeading.Line>
            <MarkedHeading.Mark>{t("emphasis")}</MarkedHeading.Mark>
          </MarkedHeading.Line>
        </MarkedHeading>
      </Box>
      <Text
        tone="secondary"
        sx={{
          maxWidth: 460,
          mb: 4,
          textShadow: "0 1px 14px rgba(0, 0, 0, 0.85)",
        }}
      >
        {t("description")}
      </Text>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: { xs: 2.5, md: 3.5 },
        }}
      >
        <CopyLink href={`tel:${phone.replace(/[^\d+]/g, "")}`} value={phone}>
          <ContactChannel
            icon={<PhoneOutlined sx={{ fontSize: 18 }} />}
            label={t("channels.phone.label")}
            value={maskPhone(phone)}
          />
        </CopyLink>
        <CopyLink href={`mailto:${email}`} value={email}>
          <ContactChannel
            icon={<EmailOutlined sx={{ fontSize: 18 }} />}
            label={t("channels.email.label")}
            value={email}
          />
        </CopyLink>
        <Link href="#contact-form" underline="none" sx={{ color: "inherit" }}>
          <ContactChannel
            icon={<CalendarMonthOutlined sx={{ fontSize: 18 }} />}
            label={t("channels.call.label")}
            value={t("channels.call.value")}
          />
        </Link>
      </Box>
    </Box>
  );
}
