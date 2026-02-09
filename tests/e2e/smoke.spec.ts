import { test, expect } from "@playwright/test";

test("redirects root path to default locale and renders Turkish navigation", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveURL(/\/tr$/);
  await expect(page.getByRole("link", { name: "Anasayfa" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Projeler" })).toBeVisible();
});

test("supports language switch while preserving route segment", async ({ page }) => {
  await page.goto("/tr/projects");

  await expect(page.getByRole("heading", { name: "Projeler" })).toBeVisible();
  await page.getByLabel("Language switch").getByRole("link", { name: "EN", exact: true }).click();

  await expect(page).toHaveURL(/\/en\/projects$/);
  await expect(page.getByRole("heading", { name: "Projects" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Home" })).toBeVisible();
});

test("renders localized contact form fields", async ({ page }) => {
  await page.goto("/en/contact");

  await expect(page.getByRole("heading", { name: "Contact" })).toBeVisible();
  await expect(page.getByLabel("Name")).toBeVisible();
  await expect(page.getByLabel("Email")).toBeVisible();
  await expect(page.getByLabel("Subject")).toBeVisible();
  await expect(page.getByLabel("Message")).toBeVisible();
  await expect(page.getByRole("button", { name: "Send Message" })).toBeVisible();
});

test("returns healthy status from API", async ({ request }) => {
  const response = await request.get("/api/health");
  const payload = (await response.json()) as {
    ok: boolean;
    service: string;
    timestamp: string;
  };

  expect(response.status()).toBe(200);
  expect(payload.ok).toBe(true);
  expect(payload.service).toBe("personal-website");
  expect(Number.isNaN(Date.parse(payload.timestamp))).toBe(false);
});
