import CalendarMonthOutlined from "@mui/icons-material/CalendarMonthOutlined";
import EmailOutlined from "@mui/icons-material/EmailOutlined";
import PhoneOutlined from "@mui/icons-material/PhoneOutlined";
import Box from "@mui/material/Box";
import { getTranslations } from "next-intl/server";

import { CopyLink, Link } from "@/components/actions";
import { Motion } from "@/components/motion";
import { Eyebrow, MarkedHeading, Text } from "@/components/typography";
import { maskPhone, site } from "@/config/site";
import { getLocaleDirection } from "@/i18n/locale";
import type { Locale } from "@/i18n/routing";

import { ContactChannel } from "./ContactChannel";

const line = { display: "block" } as const;

export async function ContactIntro({ locale }: { locale: Locale }) {
  const t = await getTranslations("contact");
  const direction = getLocaleDirection(locale);
  const phone = site.phone;
  const email = site.email;

  return (
    <Box dir={direction} sx={{ minWidth: 0, maxWidth: 560 }}>
      <Motion motion="eyebrow">
        <Eyebrow>{t("eyebrow")}</Eyebrow>
      </Motion>
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
          <Motion component="span" motion="line1" sx={line}>
            <MarkedHeading.Line>{t("line1")}</MarkedHeading.Line>
          </Motion>
          <Motion component="span" motion="line2" sx={line}>
            <MarkedHeading.Line>
              <MarkedHeading.Mark>{t("emphasis")}</MarkedHeading.Mark>
            </MarkedHeading.Line>
          </Motion>
        </MarkedHeading>
      </Box>
      <Motion motion="description" sx={{ mb: 4 }}>
        <Text
          tone="secondary"
          sx={{
            maxWidth: 460,
            textShadow: "0 1px 14px rgba(0, 0, 0, 0.85)",
          }}
        >
          {t("description")}
        </Text>
      </Motion>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: { xs: 2.5, md: 3.5 },
        }}
      >
        <Motion motion="channel">
          <CopyLink href={`tel:${phone.replace(/[^\d+]/g, "")}`} value={phone}>
            <ContactChannel
              icon={<PhoneOutlined sx={{ fontSize: 18 }} />}
              label={t("channels.phone.label")}
              value={maskPhone(phone)}
            />
          </CopyLink>
        </Motion>
        <Motion motion="channel">
          <CopyLink href={`mailto:${email}`} value={email}>
            <ContactChannel
              icon={<EmailOutlined sx={{ fontSize: 18 }} />}
              label={t("channels.email.label")}
              value={email}
            />
          </CopyLink>
        </Motion>
        <Motion motion="channel">
          <Link href="#contact-form" underline="none" sx={{ color: "inherit" }}>
            <ContactChannel
              icon={<CalendarMonthOutlined sx={{ fontSize: 18 }} />}
              label={t("channels.call.label")}
              value={t("channels.call.value")}
            />
          </Link>
        </Motion>
      </Box>
    </Box>
  );
}
