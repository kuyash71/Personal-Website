import type { ContactPayload } from "@/types/content";
import { defaultLocale, type Locale } from "@/i18n/config";

export type ContactValidationResult =
  | { ok: true; data: ContactPayload }
  | { ok: false; errors: string[] };

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validationMessages: Record<
  Locale,
  {
    invalidName: string;
    invalidEmail: string;
    invalidSubject: string;
    invalidMessage: string;
    invalidRequest: string;
  }
> = {
  tr: {
    invalidName: "Gecerli bir ad girin.",
    invalidEmail: "Gecerli bir e-posta adresi girin.",
    invalidSubject: "Konu en az 3 karakter olmalidir.",
    invalidMessage: "Mesaj en az 10 karakter olmalidir.",
    invalidRequest: "Gecersiz istek."
  },
  en: {
    invalidName: "Please provide a valid name.",
    invalidEmail: "Please provide a valid email address.",
    invalidSubject: "Subject must be at least 3 characters.",
    invalidMessage: "Message must be at least 10 characters.",
    invalidRequest: "Invalid request."
  }
};

function normalize(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export function validateContactPayload(
  input: Record<string, unknown>,
  locale: Locale = defaultLocale
): ContactValidationResult {
  const data: ContactPayload = {
    name: normalize(input.name),
    email: normalize(input.email),
    subject: normalize(input.subject),
    message: normalize(input.message),
    website: normalize(input.website)
  };

  const errors: string[] = [];
  const dictionary = validationMessages[locale];

  if (!data.name || data.name.length < 2) {
    errors.push(dictionary.invalidName);
  }

  if (!data.email || !EMAIL_REGEX.test(data.email)) {
    errors.push(dictionary.invalidEmail);
  }

  if (!data.subject || data.subject.length < 3) {
    errors.push(dictionary.invalidSubject);
  }

  if (!data.message || data.message.length < 10) {
    errors.push(dictionary.invalidMessage);
  }

  if (data.website) {
    errors.push(dictionary.invalidRequest);
  }

  if (errors.length > 0) {
    return { ok: false, errors };
  }

  return { ok: true, data };
}
