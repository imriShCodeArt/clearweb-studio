import CalendarMonthOutlined from "@mui/icons-material/CalendarMonthOutlined";
import GroupsOutlined from "@mui/icons-material/GroupsOutlined";
import WorkOutlineOutlined from "@mui/icons-material/WorkOutlineOutlined";
import type { SvgIconProps } from "@mui/material/SvgIcon";
import type { ComponentType } from "react";

export const stats = [
  { id: "projects", Icon: WorkOutlineOutlined },
  { id: "clients", Icon: GroupsOutlined },
  { id: "years", Icon: CalendarMonthOutlined },
] as const;

export type HeroStatId = (typeof stats)[number]["id"];
export type HeroStatIcon = ComponentType<SvgIconProps>;
