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
    const pathToExtension =
      "/Users/phakh/Library/Application Support/Google/Chrome/Default/Extensions/ophjlpahpchlmihnnnihgmmeilfjmjjc/3.6.0_0";
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
    // for manifest v2:
    // let [background] = context.backgroundPages()
    // if (!background)
    //   background = await context.waitForEvent('backgroundpage')

    // for manifest v3:
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