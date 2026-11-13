import { test, expect } from "@playwright/test";

test("root negotiates browser language and honours a saved choice", async ({
  request,
}) => {
  const es = await request.get("/", {
    headers: { "accept-language": "es-PE,es;q=0.9,en;q=0.8" },
    maxRedirects: 0,
  });
  expect(es.status()).toBe(307);
  expect(es.headers().location).toMatch(/\/es$/);
  expect(es.headers().vary).toContain("Accept-Language");
  const en = await request.get("/", {
    headers: { "accept-language": "es-PE", cookie: "portfolio-locale=en" },
    maxRedirects: 0,
  });
  expect(en.headers().location).toMatch(/\/en$/);
});

test("both locales ship complete SSR content, SEO and working brand assets", async ({
  request,
}) => {
  for (const locale of ["en", "es"]) {
    const response = await request.get(`/${locale}`);
    expect(response.status()).toBe(200);
    const html = await response.text();
    expect(html).toContain(`<html lang="${locale}"`);
    expect(html).toContain('id="experience"');
    expect(html).toContain('id="projects"');
    expect(html).toContain("Grams");
    expect(html).toContain("Yupana");
    expect(html).toContain('type="application/ld+json"');
    expect(html).toContain(
      `rel="canonical" href="https://matiasdiezcanseco.dev/${locale}"`,
    );
    expect(html).toContain('hrefLang="es"');
    expect(html).toContain(`og-${locale}.png`);
    expect(response.headers()["cache-control"]).toContain("no-store");
  }
  expect((await request.get("/fr")).status()).toBe(404);
  expect((await request.get("/en/missing")).status()).toBe(404);
  expect((await request.get("/robots.txt")).status()).toBe(200);
  expect(await (await request.get("/sitemap.xml")).text()).toContain(
    "https://matiasdiezcanseco.dev/es",
  );
  for (const path of [
    "/icon.svg",
    "/favicon.ico",
    "/apple-touch-icon.png",
    "/brand/icon-192.png",
    "/brand/icon-512.png",
    "/brand/og-en.png",
    "/brand/og-es.png",
    "/manifest.webmanifest",
    "/cv/matias-diez-canseco.pdf",
  ]) {
    expect((await request.get(path)).status(), path).toBe(200);
  }
});

test("language switch persists, mobile menu works, and accordions are accessible", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/en");
  await page.getByRole("link", { name: "Switch to Spanish" }).click();
  await expect(page).toHaveURL(/\/es$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "es");
  await expect(
    page.getByRole("heading", { name: "Sobre mí", exact: true }),
  ).toBeVisible();
  await page.goto("/");
  await expect(page).toHaveURL(/\/es$/);
  await page.setViewportSize({ width: 390, height: 844 });
  const menu = page.getByRole("button", { name: "Abrir menú" });
  await menu.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(menu).toBeFocused();
  await menu.click();
  await page
    .getByRole("dialog")
    .getByRole("link", { name: "Proyectos personales", exact: true })
    .click();
  await expect(page.getByRole("dialog")).not.toBeVisible();
  const trigger = page.getByRole("button", { name: /Un framework adoptado/ });
  await trigger.click();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await expect(
    page.getByText(/Diseñé y construí un framework interno/),
  ).toBeVisible();
  await expect(page.locator("#projects .project h3")).toHaveText([
    "Grams",
    "Yupana",
    "Inklab",
  ]);
  expect(errors).toEqual([]);
});

test("both languages fit mobile, tablet and desktop", async ({ page }, testInfo) => {
  for (const locale of ["en", "es"]) {
    await page.goto(`/${locale}`);
    for (const width of [320, 390, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.evaluate(() => document.fonts.ready);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        `${locale} at ${width}px`,
      ).toBe(true);
      if (width === 390 || width === 1440) {
        await page.screenshot({ path: testInfo.outputPath(`${locale}-${width}.png`), fullPage: true });
      }
    }
  }
});

test("the portfolio and all work descriptions remain readable without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:3100/es");
  await expect(
    page.getByRole("heading", { name: "Matías Diez-Canseco." }),
  ).toBeVisible();
  await expect(
    page.getByText(/Diseñé y construí un framework interno/),
  ).toBeVisible();
  await context.close();
});
