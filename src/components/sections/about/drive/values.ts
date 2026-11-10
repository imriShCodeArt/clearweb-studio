import type { ElementType } from "react";
import BoltOutlined from "@mui/icons-material/BoltOutlined";
import EnergySavingsLeafOutlined from "@mui/icons-material/EnergySavingsLeafOutlined";
import HandshakeOutlined from "@mui/icons-material/HandshakeOutlined";
import type { SvgIconProps } from "@mui/material/SvgIcon";

type ValueIcon = ElementType<SvgIconProps>;

export const values: { id: "quality" | "partnership" | "impact"; Icon: ValueIcon }[] = [
  { id: "quality", Icon: BoltOutlined },
  { id: "partnership", Icon: HandshakeOutlined },
  { id: "impact", Icon: EnergySavingsLeafOutlined },
];
