import { NextRequest, NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/email/send-contact-email";
import { isAllowedByRateLimit } from "@/lib/security/rate-limit";
import { validateContactPayload } from "@/lib/validation/contact";

function parseFormData(formData: FormData): Record<string, unknown> {
  return {
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
    website: formData.get("website")
  };
}

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");

  if (forwarded) {
    return forwarded.split(",")[0]?.trim() ?? "unknown";
  }

  return "unknown";
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const rateLimitWindow = Number(process.env.RATE_LIMIT_WINDOW_MS ?? 600000);
  const rateLimitMax = Number(process.env.RATE_LIMIT_MAX_REQUESTS ?? 5);

  const ipKey = getClientIp(request);
  const allowed = isAllowedByRateLimit(ipKey, rateLimitWindow, rateLimitMax);

  if (!allowed) {
    return NextResponse.json(
      { ok: false, message: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  const contentType = request.headers.get("content-type") ?? "";
  let payload: Record<string, unknown> = {};

  if (contentType.includes("application/json")) {
    payload = (await request.json()) as Record<string, unknown>;
  } else {
    const formData = await request.formData();
    payload = parseFormData(formData);
  }

  const validation = validateContactPayload(payload);

  if (!validation.ok) {
    return NextResponse.json(
      { ok: false, message: "Validation error", errors: validation.errors },
      { status: 400 }
    );
  }

  const sendResult = await sendContactEmail(validation.data);

  if (!sendResult.ok) {
    return NextResponse.json(
      {
        ok: false,
        message: "Message accepted, but email delivery failed.",
        detail: sendResult.message
      },
      { status: 503 }
    );
  }

  return NextResponse.json(
    {
      ok: true,
      message: "Message accepted and forwarded by email.",
      accepted: true
    },
    { status: 202 }
  );
}
