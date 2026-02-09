import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import { sendContactEmail } from "@/lib/email/send-contact-email";
import { isAllowedByRateLimit } from "@/lib/security/rate-limit";
import { validateContactPayload } from "@/lib/validation/contact";

function parseFormData(formData: FormData): Record<string, unknown> {
  return {
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
    website: formData.get("website"),
    locale: formData.get("locale")
  };
}

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");

  if (forwarded) {
    return forwarded.split(",")[0]?.trim() ?? "unknown";
  }

  return "unknown";
}

function isJsonContentType(contentType: string): boolean {
  return contentType.includes("application/json");
}

function isFormContentType(contentType: string): boolean {
  return (
    contentType.includes("multipart/form-data") ||
    contentType.includes("application/x-www-form-urlencoded")
  );
}

const apiMessages: Record<
  Locale,
  {
    tooManyRequests: string;
    payloadTooLarge: string;
    unsupportedContentType: string;
    invalidBody: string;
    validationError: string;
    deliveryFailed: string;
    accepted: string;
  }
> = {
  tr: {
    tooManyRequests: "Cok fazla istek. Lutfen daha sonra tekrar deneyin.",
    payloadTooLarge: "Istek govdesi cok buyuk. Daha kisa bir mesaj deneyin.",
    unsupportedContentType:
      "Desteklenmeyen Content-Type. application/json, multipart/form-data veya application/x-www-form-urlencoded kullanin.",
    invalidBody: "Gecersiz istek govdesi formati.",
    validationError: "Dogrulama hatasi",
    deliveryFailed: "Mesaj alindi ancak e-posta teslimi basarisiz oldu.",
    accepted: "Mesaj alindi ve e-posta olarak iletildi."
  },
  en: {
    tooManyRequests: "Too many requests. Please try again later.",
    payloadTooLarge: "Request payload is too large. Please send a shorter message.",
    unsupportedContentType:
      "Unsupported Content-Type. Use application/json, multipart/form-data, or application/x-www-form-urlencoded.",
    invalidBody: "Invalid request body format.",
    validationError: "Validation error",
    deliveryFailed: "Message accepted, but email delivery failed.",
    accepted: "Message accepted and forwarded by email."
  }
};

const RATE_LIMIT_WINDOW_DEFAULT_MS = 600000;
const RATE_LIMIT_WINDOW_MIN_MS = 60000;
const RATE_LIMIT_WINDOW_MAX_MS = 3600000;
const RATE_LIMIT_MAX_DEFAULT = 5;
const RATE_LIMIT_MAX_MIN = 1;
const RATE_LIMIT_MAX_MAX = 20;
const PAYLOAD_LIMIT_DEFAULT_BYTES = 10000;
const PAYLOAD_LIMIT_MIN_BYTES = 1024;
const PAYLOAD_LIMIT_MAX_BYTES = 100000;

function getBoundedIntegerEnv(
  key: string,
  fallback: number,
  minValue: number,
  maxValue: number
): number {
  const raw = process.env[key];
  const parsed = Number(raw ?? fallback);

  if (!Number.isFinite(parsed)) {
    return fallback;
  }

  const normalized = Math.trunc(parsed);

  if (normalized < minValue) {
    return minValue;
  }

  if (normalized > maxValue) {
    return maxValue;
  }

  return normalized;
}

function normalizeLocale(value: unknown): Locale | null {
  if (typeof value !== "string") {
    return null;
  }

  const normalized = value.trim().toLowerCase();
  return isLocale(normalized) ? normalized : null;
}

function getLocaleFromReferer(request: NextRequest): Locale | null {
  const referer = request.headers.get("referer");
  if (!referer) {
    return null;
  }

  try {
    const pathname = new URL(referer).pathname;
    const [segment] = pathname.split("/").filter(Boolean);
    return segment && isLocale(segment) ? segment : null;
  } catch {
    return null;
  }
}

function getLocaleFromAcceptLanguage(request: NextRequest): Locale | null {
  const acceptLanguage = request.headers.get("accept-language")?.toLowerCase() ?? "";
  if (acceptLanguage.startsWith("tr")) {
    return "tr";
  }
  if (acceptLanguage.startsWith("en")) {
    return "en";
  }
  return null;
}

function resolveRequestLocale(request: NextRequest, payload?: Record<string, unknown>): Locale {
  const payloadLocale = normalizeLocale(payload?.locale);
  if (payloadLocale) {
    return payloadLocale;
  }

  const queryLocale = normalizeLocale(request.nextUrl.searchParams.get("locale"));
  if (queryLocale) {
    return queryLocale;
  }

  const refererLocale = getLocaleFromReferer(request);
  if (refererLocale) {
    return refererLocale;
  }

  return getLocaleFromAcceptLanguage(request) ?? defaultLocale;
}

function getPayloadLimitBytes(): number {
  return getBoundedIntegerEnv(
    "CONTACT_MAX_PAYLOAD_BYTES",
    PAYLOAD_LIMIT_DEFAULT_BYTES,
    PAYLOAD_LIMIT_MIN_BYTES,
    PAYLOAD_LIMIT_MAX_BYTES
  );
}

function getRateLimitConfig(): { windowMs: number; maxRequests: number } {
  return {
    windowMs: getBoundedIntegerEnv(
      "RATE_LIMIT_WINDOW_MS",
      RATE_LIMIT_WINDOW_DEFAULT_MS,
      RATE_LIMIT_WINDOW_MIN_MS,
      RATE_LIMIT_WINDOW_MAX_MS
    ),
    maxRequests: getBoundedIntegerEnv(
      "RATE_LIMIT_MAX_REQUESTS",
      RATE_LIMIT_MAX_DEFAULT,
      RATE_LIMIT_MAX_MIN,
      RATE_LIMIT_MAX_MAX
    )
  };
}

function getContentLengthBytes(request: NextRequest): number | null {
  const value = request.headers.get("content-length");
  if (!value) {
    return null;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : null;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const { windowMs: rateLimitWindow, maxRequests: rateLimitMax } = getRateLimitConfig();
  const payloadLimitBytes = getPayloadLimitBytes();

  const ipKey = getClientIp(request);
  const allowed = isAllowedByRateLimit(ipKey, rateLimitWindow, rateLimitMax);
  const fallbackLocale = resolveRequestLocale(request);
  const fallbackMessages = apiMessages[fallbackLocale];

  if (!allowed) {
    return NextResponse.json(
      { ok: false, message: fallbackMessages.tooManyRequests },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil(rateLimitWindow / 1000))
        }
      }
    );
  }

  const contentLength = getContentLengthBytes(request);
  if (contentLength !== null && contentLength > payloadLimitBytes) {
    return NextResponse.json(
      { ok: false, message: fallbackMessages.payloadTooLarge },
      { status: 413 }
    );
  }

  const contentType = request.headers.get("content-type") ?? "";
  let payload: Record<string, unknown> = {};

  if (!isJsonContentType(contentType) && !isFormContentType(contentType)) {
    return NextResponse.json(
      {
        ok: false,
        message: fallbackMessages.unsupportedContentType
      },
      { status: 415 }
    );
  }

  try {
    if (isJsonContentType(contentType)) {
      const rawBody = await request.text();
      const rawBodyBytes = new TextEncoder().encode(rawBody).length;

      if (rawBodyBytes > payloadLimitBytes) {
        return NextResponse.json(
          { ok: false, message: fallbackMessages.payloadTooLarge },
          { status: 413 }
        );
      }

      payload = JSON.parse(rawBody) as Record<string, unknown>;
    } else {
      const formData = await request.formData();
      payload = parseFormData(formData);
    }
  } catch {
    return NextResponse.json(
      { ok: false, message: fallbackMessages.invalidBody },
      { status: 400 }
    );
  }

  const locale = resolveRequestLocale(request, payload);
  const dictionary = apiMessages[locale];
  const validation = validateContactPayload(payload, locale);

  if (!validation.ok) {
    return NextResponse.json(
      { ok: false, message: dictionary.validationError, errors: validation.errors },
      { status: 400 }
    );
  }

  const sendResult = await sendContactEmail(validation.data);

  if (!sendResult.ok) {
    return NextResponse.json(
      {
        ok: false,
        message: dictionary.deliveryFailed,
        detail: sendResult.message
      },
      { status: 503 }
    );
  }

  return NextResponse.json(
    {
      ok: true,
      message: dictionary.accepted,
      accepted: true
    },
    { status: 202 }
  );
}
