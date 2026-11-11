"use client";

import { useActionState, useState, type ChangeEvent } from "react";
import ChatBubbleOutlineOutlined from "@mui/icons-material/ChatBubbleOutlineOutlined";
import EmailOutlined from "@mui/icons-material/EmailOutlined";
import LockOutlined from "@mui/icons-material/LockOutlined";
import ArrowOutwardOutlined from "@mui/icons-material/ArrowOutwardOutlined";
import PersonOutlineOutlined from "@mui/icons-material/PersonOutlineOutlined";
import PhoneOutlined from "@mui/icons-material/PhoneOutlined";
import InputAdornment from "@mui/material/InputAdornment";
import Box from "@mui/material/Box";
import { useTranslations } from "next-intl";

import { sendInquiry } from "@/actions/sendInquiry";
import { Button } from "@/components/actions";
import { TextField } from "@/components/forms";
import { Text } from "@/components/typography";

function fieldStyle(multiline = false) {
  return {
    "& .MuiInputBase-root": {
      minHeight: multiline ? undefined : 52,
      alignItems: multiline ? "flex-start" : "center",
      py: multiline ? 1.25 : undefined,
      borderRadius: "14px",
      bgcolor: "rgba(18, 18, 20, 0.72)",
    },
    "& .MuiInputAdornment-root": {
      color: "text.secondary",
    },
  };
}

const emptyFields = { name: "", email: "", phone: "", message: "" };

export function ContactForm() {
  const t = useTranslations("contact");
  const [fields, setFields] = useState(emptyFields);
  const [state, submit, pending] = useActionState(sendInquiry, {
    status: "idle" as const,
    ticket: 0,
  });
  const [clearedTicket, setClearedTicket] = useState(0);

  if (state.status === "sent" && clearedTicket !== state.ticket) {
    setClearedTicket(state.ticket);
    setFields(emptyFields);
  }

  function onField(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setFields((current) => ({ ...current, [name]: value }));
  }
  const note =
    pending
      ? t("form.sending")
      : state.status === "sent"
        ? t("form.sent")
        : state.status === "error"
          ? t("form.error")
          : t("form.note");

  return (
    <Box
      component="form"
      id="contact-form"
      action={submit}
      aria-busy={pending}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        p: { xs: 2.5, md: 3.5 },
        borderRadius: "28px",
        scrollMarginTop: { xs: 88, md: 108 },
        background:
          "linear-gradient(180deg, rgba(28, 28, 31, 0.78) 0%, rgba(12, 12, 14, 0.86) 100%)",
        border: "1px solid rgba(247, 207, 0, 0.38)",
        boxShadow:
          "0 0 48px rgba(247, 207, 0, 0.14), inset 0 1px 0 rgba(255, 255, 255, 0.06)",
        backdropFilter: "blur(18px)",
      }}
    >
      <Box>
        <Text sx={{ fontWeight: 800, fontSize: { xs: "1.45rem", md: "1.7rem" }, letterSpacing: "-0.03em" }}>
          {t("form.title")}
        </Text>
        <Text tone="secondary" variant="body2" sx={{ mt: 0.75, maxWidth: 360 }}>
          {t("form.description")}
        </Text>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
          gap: 1.5,
        }}
      >
        <TextField
          name="name"
          required
          autoComplete="name"
          value={fields.name}
          onChange={onField}
          placeholder={t("form.name")}
          sx={fieldStyle()}
          slotProps={{
            htmlInput: { "aria-label": t("form.name") },
            input: { startAdornment: adorn(PersonOutlineOutlined) },
          }}
        />
        <TextField
          name="email"
          type="email"
          required
          autoComplete="email"
          value={fields.email}
          onChange={onField}
          placeholder={t("form.email")}
          sx={fieldStyle()}
          slotProps={{
            htmlInput: { "aria-label": t("form.email") },
            input: { startAdornment: adorn(EmailOutlined) },
          }}
        />
      </Box>

      <TextField
        name="phone"
        type="tel"
        autoComplete="tel"
        value={fields.phone}
        onChange={onField}
        placeholder={t("form.phone")}
        sx={{
          ...fieldStyle(),
          "& .MuiInputBase-input": { textAlign: "left" },
        }}
        slotProps={{
          htmlInput: { "aria-label": t("form.phone") },
          input: { startAdornment: adorn(PhoneOutlined) },
        }}
      />

      <TextField
        name="message"
        required
        multiline
        minRows={4}
        value={fields.message}
        onChange={onField}
        placeholder={t("form.message")}
        sx={fieldStyle(true)}
        slotProps={{
          htmlInput: { "aria-label": t("form.message") },
          input: { startAdornment: adorn(ChatBubbleOutlineOutlined) },
        }}
      />

      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={pending}
        endIcon={
          <ArrowOutwardOutlined
            sx={{ '[dir="rtl"] &': { transform: "scaleX(-1)" } }}
          />
        }
        sx={{ minHeight: 52, fontSize: "1rem" }}
      >
        {pending ? t("form.sending") : t("form.submit")}
      </Button>

      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }} aria-live="polite">
        <LockOutlined sx={{ mt: "2px", fontSize: 16, color: "text.disabled" }} />
        <Text tone="muted" variant="body2">
          {note}
        </Text>
      </Box>
    </Box>
  );
}

function adorn(Icon: typeof PersonOutlineOutlined) {
  return (
    <InputAdornment position="start">
      <Icon sx={{ fontSize: 20 }} />
    </InputAdornment>
  );
}
