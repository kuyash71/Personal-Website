import type { ContactPayload } from "@/types/content";
import { defaultLocale, type Locale } from "@/i18n/config";

export type ContactValidationResult =
  | { ok: true; data: ContactPayload }
  | { ok: false; errors: string[] };

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CONTROL_CHAR_REGEX = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/;
const SINGLE_LINE_INJECTION_REGEX = /[\r\n]/;

const NAME_MIN_LENGTH = 2;
const NAME_MAX_LENGTH = 100;
const EMAIL_MAX_LENGTH = 254;
const SUBJECT_MIN_LENGTH = 3;
const SUBJECT_MAX_LENGTH = 150;
const MESSAGE_MIN_LENGTH = 10;
const MESSAGE_MAX_LENGTH = 4000;

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
    invalidName: "Geçerli bir ad girin.",
    invalidEmail: "Geçerli bir e-posta adresi girin.",
    invalidSubject: "Konu en az 3 karakter olmalıdır.",
    invalidMessage: "Mesaj en az 10 karakter olmalıdır.",
    invalidRequest: "Geçersiz istek."
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

function toRawString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function normalizeSingleLine(value: unknown): string {
  return normalize(value).replace(/\s+/g, " ");
}

function normalizeMessage(value: unknown): string {
  if (typeof value !== "string") {
    return "";
  }

  return value.replace(/\r\n?/g, "\n").trim();
}

function hasUnsafeSingleLineChars(value: string): boolean {
  return SINGLE_LINE_INJECTION_REGEX.test(value) || CONTROL_CHAR_REGEX.test(value);
}

function hasUnsafeMultilineChars(value: string): boolean {
  return CONTROL_CHAR_REGEX.test(value);
}

export function validateContactPayload(
  input: Record<string, unknown>,
  locale: Locale = defaultLocale
): ContactValidationResult {
  const rawName = toRawString(input.name);
  const rawEmail = toRawString(input.email);
  const rawSubject = toRawString(input.subject);
  const rawMessage = toRawString(input.message);
  const rawWebsite = toRawString(input.website);

  const data: ContactPayload = {
    name: normalizeSingleLine(input.name),
    email: normalizeSingleLine(input.email).toLowerCase(),
    subject: normalizeSingleLine(input.subject),
    message: normalizeMessage(input.message),
    website: normalizeSingleLine(input.website)
  };

  const errors: string[] = [];
  const dictionary = validationMessages[locale];

  if (
    hasUnsafeSingleLineChars(rawName) ||
    hasUnsafeSingleLineChars(rawEmail) ||
    hasUnsafeSingleLineChars(rawSubject) ||
    hasUnsafeSingleLineChars(rawWebsite) ||
    hasUnsafeMultilineChars(rawMessage)
  ) {
    return { ok: false, errors: [dictionary.invalidRequest] };
  }

  if (!data.name || data.name.length < NAME_MIN_LENGTH || data.name.length > NAME_MAX_LENGTH) {
    errors.push(dictionary.invalidName);
  }

  if (!data.email || data.email.length > EMAIL_MAX_LENGTH || !EMAIL_REGEX.test(data.email)) {
    errors.push(dictionary.invalidEmail);
  }

  if (
    !data.subject ||
    data.subject.length < SUBJECT_MIN_LENGTH ||
    data.subject.length > SUBJECT_MAX_LENGTH
  ) {
    errors.push(dictionary.invalidSubject);
  }

  if (
    !data.message ||
    data.message.length < MESSAGE_MIN_LENGTH ||
    data.message.length > MESSAGE_MAX_LENGTH
  ) {
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
