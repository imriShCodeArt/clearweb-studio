import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";

import en from "../messages/en.json";
import he from "../messages/he.json";

import { routing } from "./routing";

const messages = { he, en } as const;

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: messages[locale],
  };
});
