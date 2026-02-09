import type { Locale } from "@/i18n/config";

type ContactApiLogEvent =
  | "rate_limited"
  | "payload_too_large"
  | "unsupported_content_type"
  | "invalid_body"
  | "validation_failed"
  | "delivery_failed"
  | "accepted";

type ContactApiLogContext = {
  requestId: string;
  status: number;
  ip: string;
  locale: Locale;
  contentType?: string;
  validationErrorCount?: number;
  rateLimitWindowMs?: number;
  rateLimitMaxRequests?: number;
  detail?: string;
};

function isLoggingEnabled(): boolean {
  const value = (process.env.CONTACT_LOGGING_ENABLED ?? "").trim().toLowerCase();
  if (value === "true") {
    return true;
  }
  if (value === "false") {
    return false;
  }
  return process.env.NODE_ENV === "production";
}

function anonymizeIp(ip: string): string {
  const value = ip.trim();
  if (!value || value === "unknown") {
    return "unknown";
  }

  if (value.includes(":")) {
    const segments = value.split(":");
    return `${segments.slice(0, 4).join(":")}::`;
  }

  const parts = value.split(".");
  if (parts.length === 4) {
    return `${parts[0]}.${parts[1]}.${parts[2]}.x`;
  }

  return "masked";
}

function sanitizeDetail(value: string): string {
  return value.replace(/\s+/g, " ").trim().slice(0, 200);
}

export function logContactApiEvent(event: ContactApiLogEvent, context: ContactApiLogContext): void {
  if (!isLoggingEnabled()) {
    return;
  }

  const payload = {
    type: "contact_api_event",
    event,
    requestId: context.requestId,
    status: context.status,
    locale: context.locale,
    ip: anonymizeIp(context.ip),
    contentType: context.contentType,
    validationErrorCount: context.validationErrorCount,
    rateLimitWindowMs: context.rateLimitWindowMs,
    rateLimitMaxRequests: context.rateLimitMaxRequests,
    detail: context.detail ? sanitizeDetail(context.detail) : undefined,
    timestamp: new Date().toISOString()
  };

  const serialized = JSON.stringify(payload);

  if (event === "accepted") {
    console.info(serialized);
    return;
  }

  if (event === "delivery_failed") {
    console.error(serialized);
    return;
  }

  console.warn(serialized);
}
