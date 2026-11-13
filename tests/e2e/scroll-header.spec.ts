import { test, expect } from "@playwright/test";
import en from "../../src/content/en.json" with { type: "json" };
import es from "../../src/content/es.json" with { type: "json" };

for (const [locale, content] of Object.entries({ en, es })) {
  test(`${locale} project rows have consistent space below each divider`, async ({
    page,
  }, testInfo) => {
    for (const width of [390, 1440]) {
      await page.setViewportSize({ width, height: 844 });
      await page.goto(`/${locale}`);
      await page.evaluate(() => document.fonts.ready);
      const rows = await page
        .locator("#projects .project")
        .evaluateAll((projects) =>
          projects.map((project) => ({
            left: project.querySelector("h3")!.getBoundingClientRect().left,
            gap:
              project.querySelector("h3")!.getBoundingClientRect().top -
              project.getBoundingClientRect().top,
          })),
        );
      expect(rows).toHaveLength(3);
      expect(rows[2].left).toBe(rows[1].left);
      expect(rows[1].gap).toBeGreaterThan(16);
      expect(rows[2].gap).toBeCloseTo(rows[1].gap, 0);
      if (width === 390) {
        await page
          .locator("#projects .project")
          .last()
          .scrollIntoViewIfNeeded();
        await expect(page.getByRole("banner")).not.toBeInViewport();
        await page.screenshot({ path: testInfo.outputPath("projects.png") });
      }
    }
  });

  for (const width of [390, 768]) {
    test(`${locale} mobile header returns on upward scroll at ${width}px`, async ({
      page,
    }, testInfo) => {
      await page.setViewportSize({ width, height: 844 });
      await page.goto(`/${locale}`);
      const header = page.getByRole("banner");
      await expect(header).toBeInViewport();
      await page.evaluate(() => window.scrollTo(0, 1600));
      await expect(header).not.toBeInViewport();
      await page.evaluate(() => window.scrollBy(0, -200));
      await expect(header).toBeInViewport();
      await expect
        .poll(async () => (await header.boundingBox())!.y)
        .toBeCloseTo(0, 0);

      await page.getByRole("button", { name: content.ui.menu }).click();
      const dialog = page.getByRole("dialog");
      await dialog
        .getByRole("link", { name: content.nav.projects, exact: true })
        .click();
      await expect(dialog).toHaveCount(0);
      const heading = page.locator("#projects-title");
      await expect(heading).toBeFocused();
      await expect(heading).toBeInViewport();
      // The restored header must not cover the section title.
      await page.evaluate(() => window.scrollBy(0, -80));
      await expect(header).toBeInViewport();
      await expect
        .poll(async () => (await header.boundingBox())!.y)
        .toBeCloseTo(0, 0);
      expect((await heading.boundingBox())!.y).toBeGreaterThan(
        (await header.boundingBox())!.height,
      );
      await page.screenshot({
        path: testInfo.outputPath("header-on-scroll-up.png"),
      });

      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await expect(header).not.toBeInViewport();
      await page.locator('footer a[href="#top"]').click();
      await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
      await expect(header).toBeInViewport();
    });
  }
}
