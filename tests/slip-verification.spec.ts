import { expect, test } from "./../playwright/supports/fixtures";

test.describe("slip-verification", () => {
  const auth = {
    email: process.env.LINE_EMAIL!,
    pw: process.env.LINE_PASSWORD!,
  };

  test("tests line-sign-in -> negative-slip-verification", async ({ page }) => {
    test.setTimeout(60000);

    await page.setViewportSize({
      width: 1122,
      height: 552,
    });
    await page.goto(
      "chrome-extension://ophjlpahpchlmihnnnihgmmeilfjmjjc/index.html#/"
    );
    await page.locator("form > div > div:nth-of-type(1) input").click();
    await page
      .locator("form > div > div:nth-of-type(1) input")
      .type(auth.email);
    await page.locator("div:nth-of-type(2) input").click();
    await page.locator("div:nth-of-type(2) input").type(auth.pw);
    await page
      .locator("button.loginForm-module__button_login__gnKsN > span")
      .click();
    await page.locator("p").click();
    await page.locator("div.chatroom-module__chatroom__eVUaK > div").click();

    await page.goto(
      "chrome-extension://ophjlpahpchlmihnnnihgmmeilfjmjjc/index.html#/"
    );
    await expect(page.locator("body")).toHaveClass("positive_button_first");

    await page.goto(
      "chrome-extension://ophjlpahpchlmihnnnihgmmeilfjmjjc/index.html#/friends"
    );
    await page.locator("div.chatroom-module__chatroom__eVUaK").click();
    await page
      .locator("ul.gnb-module__nav_list__wRO2S > li:nth-of-type(2) path")
      .click();
    await page.locator("input").click();
    await page.locator("input").type("CheckSlip-Bot-2");
    await page.waitForTimeout(500); // Wait for 1 second
    await page.locator("div:nth-of-type(2) > button").click();
    await page.locator("textarea-ex").click();
    await page
      .locator(
        "div.chatroomEditor-module__editor_area__1UsgR button:nth-of-type(1) svg"
      )
      .click();
    await page.waitForTimeout(20000); // Wait for 1 second
    // Verify the text
    const textLocator = page
      .locator(
        "div > div.content > flex-bubble > div > div.flex-body > flex-box > flex-box:nth-child(1) > flex-text > div > span"
      )
      .first(); // Ensure we are selecting the first matching element
    await expect(textLocator).toHaveText("สลิปไม่ถูกต้อง");
  });

  test("tests line-sign-in -> positive-slip-verification", async ({ page }) => {
    await page.setViewportSize({
      width: 1122,
      height: 552,
    });
    await page.goto(
      "chrome-extension://ophjlpahpchlmihnnnihgmmeilfjmjjc/index.html#/"
    );
    await page.locator("form > div > div:nth-of-type(1) input").click();
    await page
      .locator("form > div > div:nth-of-type(1) input")
      .type(auth.email);
    await page.locator("div:nth-of-type(2) input").click();
    await page.locator("div:nth-of-type(2) input").type(auth.pw);
    await page
      .locator("button.loginForm-module__button_login__gnKsN > span")
      .click();
    await page.locator("p").click();
    await page.locator("div.chatroom-module__chatroom__eVUaK > div").click();

    await page.goto(
      "chrome-extension://ophjlpahpchlmihnnnihgmmeilfjmjjc/index.html#/"
    );
    await expect(page.locator("body")).toHaveClass("positive_button_first");

    await page.goto(
      "chrome-extension://ophjlpahpchlmihnnnihgmmeilfjmjjc/index.html#/friends"
    );
    await page.locator("div.chatroom-module__chatroom__eVUaK").click();
    await page
      .locator("ul.gnb-module__nav_list__wRO2S > li:nth-of-type(2) path")
      .click();
    await page.locator("input").click();
    await page.locator("input").type("CheckSlip-Bot-2");
    await page.waitForTimeout(500); // Wait for 1 second
    await page.locator("div:nth-of-type(2) > button").click();
    await page.locator("textarea-ex").click();
    await page
      .locator(
        "div.chatroomEditor-module__editor_area__1UsgR button:nth-of-type(1) svg"
      )
      .click();
    await page.waitForTimeout(20000); // Wait for 1 second
    // Verify the text
    const textLocator = page
      .locator(
        "div > div.content > flex-bubble > div > div.flex-body > flex-box > flex-box:nth-child(1) > flex-text > div > span"
      )
      .first(); // Ensure we are selecting the first matching element
    await expect(textLocator).toHaveText("สลิปถูกต้อง");
  });
});
