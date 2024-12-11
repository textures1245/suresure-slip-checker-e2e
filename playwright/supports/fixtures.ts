import {
  test as base,
  //   expect as playwrightExpect,
  chromium,
  type BrowserContext,
} from "@playwright/test";
import path from "path";

export const test = base.extend<{
  context: BrowserContext;
  extensionId: string;
  backgroundPage: any;
}>({
  context: async ({}, use) => {
    const pathToExtension = process.env.LINE_EXTENSION_PATH || "path/to/extension";
    const context = await chromium.launchPersistentContext("", {
      headless: false,
      args: [
        `--disable-extensions-except=${pathToExtension}`,
        `--load-extension=${pathToExtension}`,
      ],
    });
    await use(context);
    await context.close();
  },
  backgroundPage: async ({ context }, use) => {
    let [background] = context.serviceWorkers();
    if (!background) background = await context.waitForEvent("serviceworker");
    await use(background);
  },
  extensionId: async ({ backgroundPage }, use) => {
    const extensionId = backgroundPage.url().split("/")[2];
    await use(extensionId);
  },
});
export const expect = base.expect;
