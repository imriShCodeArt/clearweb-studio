import type { ElementType } from "react";
import AdjustOutlined from "@mui/icons-material/AdjustOutlined";
import LanguageOutlined from "@mui/icons-material/LanguageOutlined";
import LayersOutlined from "@mui/icons-material/LayersOutlined";
import PersonOutlined from "@mui/icons-material/PersonOutlined";
import RocketLaunchOutlined from "@mui/icons-material/RocketLaunchOutlined";
import SettingsOutlined from "@mui/icons-material/SettingsOutlined";
import ShieldOutlined from "@mui/icons-material/ShieldOutlined";
import ShoppingCartOutlined from "@mui/icons-material/ShoppingCartOutlined";
import SyncOutlined from "@mui/icons-material/SyncOutlined";
import type { SvgIconProps } from "@mui/material/SvgIcon";

export type OfferingIcon = ElementType<SvgIconProps>;

export type OfferingPicture = {
  src: string;
  width: number;
  height: number;
};

export const offerings = [
  {
    id: "websites",
    index: "01",
    image: {
      src: "/services/services-products-01-websites-development.png",
      width: 1478,
      height: 995,
    },
    tags: [
      { id: "sites", Icon: LanguageOutlined },
      { id: "commerce", Icon: ShoppingCartOutlined },
      { id: "landing", Icon: AdjustOutlined },
    ],
    wide: false,
  },
  {
    id: "applications",
    index: "02",
    image: {
      src: "/services/services-products-02-web-apps-development.png",
      width: 1134,
      height: 836,
    },
    tags: [
      { id: "systems", Icon: LayersOutlined },
      { id: "portals", Icon: PersonOutlined },
      { id: "tools", Icon: SettingsOutlined },
    ],
    wide: false,
  },
  {
    id: "ongoing",
    index: "03",
    image: {
      src: "/services/services-products-03-ongoing-development.png",
      width: 1192,
      height: 1116,
    },
    tags: [
      { id: "improvements", Icon: RocketLaunchOutlined },
      { id: "integrations", Icon: SyncOutlined },
      { id: "maintenance", Icon: ShieldOutlined },
    ],
    wide: true,
  },
] as const;
