import { test, expect } from "@playwright/test";
import en from "../../src/content/en.json" with { type: "json" };
import es from "../../src/content/es.json" with { type: "json" };

for (const [locale, content] of Object.entries({ en, es })) {
  for (const width of [390, 768]) {
    test(`${locale} mobile navigation stays at each selected section at ${width}px`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 844 });
      await page.goto(`/${locale}`);
      const menu = page.getByRole("button", { name: content.ui.menu });
      const dialog = page.getByRole("dialog");

      await menu.click();
      await dialog
        .getByRole("button", { name: content.ui.close, exact: true })
        .click();
      await expect(dialog).toHaveCount(0);
      await expect(menu).toBeFocused();

      await menu.click();
      await page.keyboard.press("Escape");
      await expect(dialog).toHaveCount(0);
      await expect(menu).toBeFocused();

      for (const [id, label] of Object.entries(content.nav)) {
        await menu.click();
        const link = dialog.getByRole("link", { name: label, exact: true });
        if (width === 768) {
          await link.focus();
          await page.keyboard.press("Enter");
        } else {
          await link.click();
        }
        // Wait for the exit animation and focus cleanup, not just a hidden dialog.
        await expect(dialog).toHaveCount(0);
        await expect(page).toHaveURL(new RegExp(`#${id}$`));
        const heading = page.locator(`#${id}-title`);
        await expect(heading).toBeFocused();
        await expect(heading).toBeInViewport();
      }
    });
  }
}
