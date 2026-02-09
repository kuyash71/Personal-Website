import type { ContactPayload } from "@/types/content";

export type ContactValidationResult =
  | { ok: true; data: ContactPayload }
  | { ok: false; errors: string[] };

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalize(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export function validateContactPayload(input: Record<string, unknown>): ContactValidationResult {
  const data: ContactPayload = {
    name: normalize(input.name),
    email: normalize(input.email),
    subject: normalize(input.subject),
    message: normalize(input.message),
    website: normalize(input.website)
  };

  const errors: string[] = [];

  if (!data.name || data.name.length < 2) {
    errors.push("Please provide a valid name.");
  }

  if (!data.email || !EMAIL_REGEX.test(data.email)) {
    errors.push("Please provide a valid email address.");
  }

  if (!data.subject || data.subject.length < 3) {
    errors.push("Subject must be at least 3 characters.");
  }

  if (!data.message || data.message.length < 10) {
    errors.push("Message must be at least 10 characters.");
  }

  if (data.website) {
    errors.push("Invalid request.");
  }

  if (errors.length > 0) {
    return { ok: false, errors };
  }

  return { ok: true, data };
}
