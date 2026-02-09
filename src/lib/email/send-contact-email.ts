import type { ContactPayload } from "@/types/content";

type SendResult =
  | { ok: true }
  | { ok: false; message: string };

function sanitizeHeaderValue(value: string): string {
  return value.replace(/[\r\n]+/g, " ").replace(/\s+/g, " ").trim();
}

function sanitizeMessageText(value: string): string {
  return value.replace(/\u0000/g, "").replace(/\r\n?/g, "\n").trim();
}

function formatMessage(payload: ContactPayload): string {
  const safeName = sanitizeHeaderValue(payload.name);
  const safeEmail = sanitizeHeaderValue(payload.email);
  const safeSubject = sanitizeHeaderValue(payload.subject);
  const safeMessage = sanitizeMessageText(payload.message);

  return [
    `New website contact message`,
    ``,
    `Name: ${safeName}`,
    `Email: ${safeEmail}`,
    `Subject: ${safeSubject}`,
    ``,
    safeMessage
  ].join("\n");
}

async function sendWithResend(payload: ContactPayload): Promise<SendResult> {
  const apiKey = process.env.EMAIL_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.EMAIL_FROM;

  if (!apiKey || !toEmail || !fromEmail) {
    return {
      ok: false,
      message: "Resend requires EMAIL_API_KEY, CONTACT_TO_EMAIL, and EMAIL_FROM."
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
      subject: `[Website] ${sanitizeHeaderValue(payload.subject)}`,
      reply_to: sanitizeHeaderValue(payload.email),
      text: formatMessage(payload)
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    return {
      ok: false,
      message: `Resend request failed: ${response.status} ${errorText}`
    };
  }

  return { ok: true };
}

export async function sendContactEmail(payload: ContactPayload): Promise<SendResult> {
  const provider = process.env.EMAIL_PROVIDER;

  if (!provider) {
    return { ok: false, message: "EMAIL_PROVIDER is not configured." };
  }

  if (provider === "resend") {
    return sendWithResend(payload);
  }

  return { ok: false, message: `Unsupported EMAIL_PROVIDER: ${provider}` };
}
