import type { ContactPayload } from "@/types/content";

type SendResult =
  | { ok: true }
  | { ok: false; message: string };

function formatMessage(payload: ContactPayload): string {
  return [
    `New website contact message`,
    ``,
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Subject: ${payload.subject}`,
    ``,
    payload.message
  ].join("\n");
}

async function sendWithResend(payload: ContactPayload): Promise<SendResult> {
  const apiKey = process.env.EMAIL_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.EMAIL_FROM;

  if (!apiKey || !toEmail || !fromEmail) {
    return {
      ok: false,
      message: "Resend icin EMAIL_API_KEY, CONTACT_TO_EMAIL ve EMAIL_FROM gerekli."
    };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      subject: `[Website] ${payload.subject}`,
      reply_to: payload.email,
      text: formatMessage(payload)
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    return {
      ok: false,
      message: `Resend istegi basarisiz: ${response.status} ${errorText}`
    };
  }

  return { ok: true };
}

export async function sendContactEmail(payload: ContactPayload): Promise<SendResult> {
  const provider = process.env.EMAIL_PROVIDER;

  if (!provider) {
    return { ok: false, message: "EMAIL_PROVIDER tanimli degil." };
  }

  if (provider === "resend") {
    return sendWithResend(payload);
  }

  return { ok: false, message: `Desteklenmeyen EMAIL_PROVIDER: ${provider}` };
}
