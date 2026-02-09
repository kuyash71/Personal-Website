import { expect, test } from "@playwright/test";
import type { APIResponse } from "@playwright/test";

type LocaleNavCase = {
  locale: "tr" | "en";
  links: Array<{
    label: string;
    path: string;
    heading: string;
  }>;
};

const localeNavCases: LocaleNavCase[] = [
  {
    locale: "tr",
    links: [
      { label: "Anasayfa", path: "/tr", heading: "Kuyash" },
      { label: "Gunes Uclemesi", path: "/tr/sun-trilogy", heading: "Gunes Uclemesi" },
      { label: "Projeler", path: "/tr/projects", heading: "Projeler" },
      { label: "Iletisim", path: "/tr/contact", heading: "Iletisim" }
    ]
  },
  {
    locale: "en",
    links: [
      { label: "Home", path: "/en", heading: "Kuyash" },
      { label: "Sun Trilogy", path: "/en/sun-trilogy", heading: "Sun Trilogy" },
      { label: "Projects", path: "/en/projects", heading: "Projects" },
      { label: "Contact", path: "/en/contact", heading: "Contact" }
    ]
  }
];

function assertPublicResponse(response: APIResponse | null, path: string) {
  if (!response) {
    throw new Error(`No response received for ${path}.`);
  }

  const status = response.status();
  if (status === 401 || status === 403) {
    throw new Error(
      `Deployment returned ${status} for ${path}. URL is protected (Vercel authentication/deployment protection). Use a public production URL or disable protection for QA.`
    );
  }
}

for (const navCase of localeNavCases) {
  test(`validates navbar links for ${navCase.locale}`, async ({ page }) => {
    const initialResponse = await page.goto(`/${navCase.locale}`);
    assertPublicResponse(initialResponse, `/${navCase.locale}`);

    for (const link of navCase.links) {
      await page.getByRole("link", { name: link.label }).click();
      await expect(page).toHaveURL(new RegExp(`${link.path.replace("/", "\\/")}$`));
      await expect(page.getByRole("heading", { name: link.heading })).toBeVisible();
    }
  });
}

test("returns 404 for unknown localized page", async ({ page }) => {
  const response = await page.goto("/tr/does-not-exist");
  assertPublicResponse(response, "/tr/does-not-exist");

  expect(response?.status()).toBe(404);
  await expect(page).toHaveURL(/\/tr\/does-not-exist$/);
  await expect(page.getByText("404", { exact: false })).toBeVisible();
});

test("returns 404 for unsupported locale", async ({ page }) => {
  const response = await page.goto("/fr");
  assertPublicResponse(response, "/fr");

  expect(response?.status()).toBe(404);
  await expect(page).toHaveURL(/\/fr$/);
  await expect(page.getByText("404", { exact: false })).toBeVisible();
});

test("returns API failure statuses for unsupported contact requests", async ({ request }) => {
  const methodResponse = await request.get("/api/contact");
  assertPublicResponse(methodResponse, "/api/contact (GET)");
  expect(methodResponse.status()).toBe(405);

  const unsupportedBodyResponse = await request.post("/api/contact", {
    headers: { "content-type": "text/plain" },
    data: "invalid-body"
  });
  assertPublicResponse(unsupportedBodyResponse, "/api/contact (POST text/plain)");
  expect(unsupportedBodyResponse.status()).toBe(415);
});
