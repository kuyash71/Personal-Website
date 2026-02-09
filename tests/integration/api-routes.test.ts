import { afterAll, beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import { GET as getHealth } from "@/app/api/health/route";
import { POST as postContact } from "@/app/api/contact/route";
import { sendContactEmail } from "@/lib/email/send-contact-email";

vi.mock("@/lib/email/send-contact-email", () => ({
  sendContactEmail: vi.fn()
}));

const mockedSendContactEmail = vi.mocked(sendContactEmail);

const originalRateLimitWindow = process.env.RATE_LIMIT_WINDOW_MS;
const originalRateLimitMax = process.env.RATE_LIMIT_MAX_REQUESTS;
const originalContactMaxPayloadBytes = process.env.CONTACT_MAX_PAYLOAD_BYTES;

function createJsonContactRequest({
  ip,
  payload,
  localeQuery,
  acceptLanguage,
  contentLength
}: {
  ip: string;
  payload: Record<string, unknown>;
  localeQuery?: "tr" | "en";
  acceptLanguage?: string;
  contentLength?: number;
}): NextRequest {
  const url = new URL("http://localhost:3000/api/contact");
  if (localeQuery) {
    url.searchParams.set("locale", localeQuery);
  }

  const headers = new Headers({
    "content-type": "application/json",
    "x-forwarded-for": ip
  });

  if (acceptLanguage) {
    headers.set("accept-language", acceptLanguage);
  }

  if (typeof contentLength === "number") {
    headers.set("content-length", String(contentLength));
  }

  return new NextRequest(url, {
    method: "POST",
    headers,
    body: JSON.stringify(payload)
  });
}

beforeEach(() => {
  process.env.RATE_LIMIT_WINDOW_MS = "600000";
  process.env.RATE_LIMIT_MAX_REQUESTS = "5";
  process.env.CONTACT_MAX_PAYLOAD_BYTES = "10000";
  mockedSendContactEmail.mockReset();
  mockedSendContactEmail.mockResolvedValue({ ok: true });
});

afterAll(() => {
  if (originalRateLimitWindow === undefined) {
    delete process.env.RATE_LIMIT_WINDOW_MS;
  } else {
    process.env.RATE_LIMIT_WINDOW_MS = originalRateLimitWindow;
  }

  if (originalRateLimitMax === undefined) {
    delete process.env.RATE_LIMIT_MAX_REQUESTS;
  } else {
    process.env.RATE_LIMIT_MAX_REQUESTS = originalRateLimitMax;
  }

  if (originalContactMaxPayloadBytes === undefined) {
    delete process.env.CONTACT_MAX_PAYLOAD_BYTES;
  } else {
    process.env.CONTACT_MAX_PAYLOAD_BYTES = originalContactMaxPayloadBytes;
  }
});

describe("GET /api/health", () => {
  it("returns service health payload", async () => {
    const response = await getHealth();
    const payload = (await response.json()) as {
      ok: boolean;
      service: string;
      timestamp: string;
    };

    expect(response.status).toBe(200);
    expect(payload.ok).toBe(true);
    expect(payload.service).toBe("personal-website");
    expect(Number.isNaN(Date.parse(payload.timestamp))).toBe(false);
  });
});

describe("POST /api/contact", () => {
  it("accepts a valid English payload and forwards normalized data", async () => {
    const response = await postContact(
      createJsonContactRequest({
        ip: "203.0.113.10",
        payload: {
          name: "  Kuyash  ",
          email: "  test@example.com ",
          subject: "  Portfolio Inquiry ",
          message: "  This is a valid message body with enough characters.  ",
          website: "",
          locale: "en"
        }
      })
    );

    const body = (await response.json()) as {
      ok: boolean;
      accepted?: boolean;
      message: string;
    };

    expect(response.status).toBe(202);
    expect(body.ok).toBe(true);
    expect(body.accepted).toBe(true);
    expect(body.message).toBe("Message accepted and forwarded by email.");
    expect(mockedSendContactEmail).toHaveBeenCalledTimes(1);
    expect(mockedSendContactEmail).toHaveBeenCalledWith({
      name: "Kuyash",
      email: "test@example.com",
      subject: "Portfolio Inquiry",
      message: "This is a valid message body with enough characters.",
      website: ""
    });
  });

  it("returns Turkish validation errors when locale is tr", async () => {
    const response = await postContact(
      createJsonContactRequest({
        ip: "203.0.113.11",
        payload: {
          name: "A",
          email: "invalid-email",
          subject: "ab",
          message: "kisa",
          website: "",
          locale: "tr"
        }
      })
    );

    const body = (await response.json()) as {
      ok: boolean;
      message: string;
      errors: string[];
    };

    expect(response.status).toBe(400);
    expect(body.ok).toBe(false);
    expect(body.message).toBe("Doğrulama hatası");
    expect(body.errors).toContain("Geçerli bir ad girin.");
    expect(body.errors).toContain("Geçerli bir e-posta adresi girin.");
    expect(mockedSendContactEmail).not.toHaveBeenCalled();
  });

  it("returns 415 for unsupported content type with locale fallback", async () => {
    const request = new NextRequest("http://localhost:3000/api/contact?locale=en", {
      method: "POST",
      headers: {
        "content-type": "text/plain",
        "x-forwarded-for": "203.0.113.12"
      },
      body: "invalid-body"
    });

    const response = await postContact(request);
    const body = (await response.json()) as { ok: boolean; message: string };

    expect(response.status).toBe(415);
    expect(body.ok).toBe(false);
    expect(body.message).toContain("Unsupported Content-Type");
    expect(mockedSendContactEmail).not.toHaveBeenCalled();
  });

  it("returns 429 when rate limit is exceeded", async () => {
    process.env.RATE_LIMIT_MAX_REQUESTS = "1";

    const firstResponse = await postContact(
      createJsonContactRequest({
        ip: "203.0.113.13",
        localeQuery: "en",
        payload: {
          name: "Kuyash",
          email: "test@example.com",
          subject: "First message",
          message: "This request should pass the rate limiter.",
          website: ""
        }
      })
    );

    const secondResponse = await postContact(
      createJsonContactRequest({
        ip: "203.0.113.13",
        localeQuery: "en",
        payload: {
          name: "Kuyash",
          email: "test@example.com",
          subject: "Second message",
          message: "This request should be blocked by rate limiting.",
          website: ""
        }
      })
    );

    const body = (await secondResponse.json()) as { ok: boolean; message: string };

    expect(firstResponse.status).toBe(202);
    expect(secondResponse.status).toBe(429);
    expect(secondResponse.headers.get("retry-after")).toBe("600");
    expect(body.ok).toBe(false);
    expect(body.message).toBe("Too many requests. Please try again later.");
    expect(mockedSendContactEmail).toHaveBeenCalledTimes(1);
  });

  it("returns 400 for unsafe header-injection payloads", async () => {
    const response = await postContact(
      createJsonContactRequest({
        ip: "203.0.113.16",
        payload: {
          name: "Kuyash",
          email: "test@example.com",
          subject: "Hello\r\nBCC: attacker@example.com",
          message: "This message should be rejected as an unsafe payload.",
          website: "",
          locale: "en"
        }
      })
    );

    const body = (await response.json()) as {
      ok: boolean;
      message: string;
      errors: string[];
    };

    expect(response.status).toBe(400);
    expect(body.ok).toBe(false);
    expect(body.message).toBe("Validation error");
    expect(body.errors).toEqual(["Invalid request."]);
    expect(mockedSendContactEmail).not.toHaveBeenCalled();
  });

  it("returns 413 when JSON payload size exceeds payload limit", async () => {
    process.env.CONTACT_MAX_PAYLOAD_BYTES = "1024";

    const oversizedMessage = "x".repeat(2000);

    const response = await postContact(
      createJsonContactRequest({
        ip: "203.0.113.15",
        localeQuery: "en",
        payload: {
          name: "Kuyash",
          email: "test@example.com",
          subject: "Payload limit test",
          message: oversizedMessage,
          website: ""
        }
      })
    );

    const body = (await response.json()) as { ok: boolean; message: string };

    expect(response.status).toBe(413);
    expect(body.ok).toBe(false);
    expect(body.message).toBe("Request payload is too large. Please send a shorter message.");
    expect(mockedSendContactEmail).not.toHaveBeenCalled();
  });

  it("returns 503 when provider fails", async () => {
    mockedSendContactEmail.mockResolvedValueOnce({
      ok: false,
      message: "Simulated provider failure"
    });

    const response = await postContact(
      createJsonContactRequest({
        ip: "203.0.113.14",
        payload: {
          name: "Kuyash",
          email: "test@example.com",
          subject: "Provider failure",
          message: "This request should return a delivery failure response.",
          website: "",
          locale: "en"
        }
      })
    );

    const body = (await response.json()) as {
      ok: boolean;
      message: string;
      detail: string;
    };

    expect(response.status).toBe(503);
    expect(body.ok).toBe(false);
    expect(body.message).toBe("Message accepted, but email delivery failed.");
    expect(body.detail).toBe("Simulated provider failure");
  });
});
