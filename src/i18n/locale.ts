import type { Direction } from "@mui/material/styles";

import type { Locale } from "./routing";

export function getLocaleDirection(locale: Locale): Direction {
  return locale === "he" ? "rtl" : "ltr";
}
