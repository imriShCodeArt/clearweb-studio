import LinkedIn from "@mui/icons-material/LinkedIn";
import LinkOutlined from "@mui/icons-material/LinkOutlined";
import LocationOnOutlined from "@mui/icons-material/LocationOnOutlined";
import ScheduleOutlined from "@mui/icons-material/ScheduleOutlined";
import Facebook from "@mui/icons-material/Facebook";
import IconButton from "@mui/material/IconButton";
import { getTranslations } from "next-intl/server";

import { Motion } from "@/components/motion";
import { BrandLockup } from "@/components/shell/BrandLockup";
import { site } from "@/config/site";

import { ContactBarFact } from "./ContactBarFact";

const socialIcons = {
  linkedin: LinkedIn,
  facebook: Facebook,
  website: LinkOutlined,
} as const;

export async function ContactBar() {
  const t = await getTranslations("contact");
  const shell = await getTranslations("shell");

  return (
    <Motion
      motion="bar"
      sx={{
        position: "relative",
        zIndex: 1,
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        gap: { xs: 2, md: 3 },
        px: { xs: 2, md: 4 },
        py: 2,
        borderTop: "1px solid rgba(255, 255, 255, 0.12)",
        bgcolor: "rgba(11, 12, 13, 0.46)",
        backdropFilter: "blur(10px)",
      }}
    >
      <Motion motion="bar-item">
        <BrandLockup brand={shell("brand")} href={site.brandHref} />
      </Motion>
      <Motion
        motion="bar-item"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: { xs: 2, md: 4 },
        }}
      >
        <ContactBarFact
          icon={<LocationOnOutlined sx={{ fontSize: 18 }} />}
          text={t("bar.location")}
        />
        <ContactBarFact
          icon={<ScheduleOutlined sx={{ fontSize: 18 }} />}
          text={t("bar.hours")}
        />
      </Motion>
      <Motion motion="bar-item" sx={{ display: "flex", gap: 1 }}>
        {site.social.map((item) => {
          const Icon = socialIcons[item.id];
          return (
            <IconButton
              key={item.id}
              aria-label={shell(`footer.${item.id}`)}
              sx={{
                width: 40,
                height: 40,
                borderRadius: "12px",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                color: "text.primary",
              }}
            >
              <Icon sx={{ fontSize: 18 }} />
            </IconButton>
          );
        })}
      </Motion>
    </Motion>
  );
}
