import { test, expect } from "./../playwright/supports/fixtures";

test("popup page", async ({ page, extensionId }) => {
  const maxRetries = 5;
  let retries = 0;
  let success = false;

  while (retries < maxRetries && !success) {
    try {
      await page.goto(`chrome-extension://${extensionId}/index.html`);
      await expect(page.locator("body")).toHaveClass("positive_button_first");
      success = true;
    } catch (error) {
      if (retries === maxRetries - 1) {
        throw error;
      }
      retries++;
      await page.waitForTimeout(1000); // wait for 1 second before retrying
    }
  }
});
