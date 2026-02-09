import { describe, expect, it } from "vitest";
import { validateContactPayload } from "../../src/lib/validation/contact";

describe("validateContactPayload", () => {
  it("accepts a valid payload and normalizes string values", () => {
    const result = validateContactPayload(
      {
        name: "  Kuyash  ",
        email: "  test@example.com ",
        subject: "  Portfolio inquiry ",
        message: "  I would like to discuss a collaboration.  ",
        website: ""
      },
      "en"
    );

    expect(result.ok).toBe(true);

    if (result.ok) {
      expect(result.data).toEqual({
        name: "Kuyash",
        email: "test@example.com",
        subject: "Portfolio inquiry",
        message: "I would like to discuss a collaboration.",
        website: ""
      });
    }
  });

  it("returns Turkish validation messages when locale is tr", () => {
    const result = validateContactPayload(
      {
        name: "A",
        email: "invalid-email",
        subject: "ab",
        message: "kisa",
        website: ""
      },
      "tr"
    );

    expect(result.ok).toBe(false);

    if (!result.ok) {
      expect(result.errors).toContain("Gecerli bir ad girin.");
      expect(result.errors).toContain("Gecerli bir e-posta adresi girin.");
      expect(result.errors).toContain("Konu en az 3 karakter olmalidir.");
      expect(result.errors).toContain("Mesaj en az 10 karakter olmalidir.");
    }
  });

  it("returns English anti-bot message when honeypot field is set", () => {
    const result = validateContactPayload(
      {
        name: "Kuyash",
        email: "test@example.com",
        subject: "Hello there",
        message: "This message body has enough characters.",
        website: "bot-filled-value"
      },
      "en"
    );

    expect(result.ok).toBe(false);

    if (!result.ok) {
      expect(result.errors).toContain("Invalid request.");
    }
  });
});
