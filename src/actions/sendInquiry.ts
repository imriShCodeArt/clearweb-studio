"use server";

import { getTranslations } from "next-intl/server";
import { Resend } from "resend";

import { site } from "@/config/site";

export type InquiryState = {
  status: "idle" | "sent" | "error";
  ticket: number;
};

const LIMITS = {
  name: 80,
  email: 254,
  phone: 40,
  message: 4000,
} as const;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function sendInquiry(
  _state: InquiryState,
  formData: FormData,
): Promise<InquiryState> {
  const name = text(formData, "name");
  const email = text(formData, "email");
  const phone = text(formData, "phone");
  const message = text(formData, "message");

  if (!valid({ name, email, phone, message })) {
    return { status: "error", ticket: _state.ticket + 1 };
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.RESEND_FROM?.trim();
  const to = process.env.CONTACT_TO?.trim() || site.email;

  if (!apiKey || !from) {
    console.error("[contact] Set RESEND_API_KEY and RESEND_FROM.");
    return { status: "error", ticket: _state.ticket + 1 };
  }

  const t = await getTranslations("contact");
  const subject = t("form.subject", {
    name: name.replace(/[\r\n]+/g, " "),
  });
  const body = [
    `${t("form.labelName")}: ${name}`,
    `${t("form.labelEmail")}: ${email}`,
    `${t("form.labelPhone")}: ${phone || "—"}`,
    "",
    message,
  ].join("\n");

  try {
    const { error } = await new Resend(apiKey).emails.send({
      from,
      to,
      replyTo: email,
      subject,
      text: body,
    });

    if (error) {
      console.error("[contact] delivery failed", error.message);
      return { status: "error", ticket: _state.ticket + 1 };
    }
  } catch (error) {
    console.error("[contact] delivery failed", error);
    return { status: "error", ticket: _state.ticket + 1 };
  }

  return { status: "sent", ticket: _state.ticket + 1 };
}

function text(formData: FormData, name: string) {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

function valid(fields: {
  name: string;
  email: string;
  phone: string;
  message: string;
}) {
  if (!fields.name || fields.name.length > LIMITS.name) return false;
  if (!EMAIL.test(fields.email) || fields.email.length > LIMITS.email) return false;
  if (fields.phone.length > LIMITS.phone) return false;
  if (fields.phone && !/^[+\d][\d\s().-]*$/.test(fields.phone)) return false;
  if (!fields.message || fields.message.length > LIMITS.message) return false;
  return true;
}
