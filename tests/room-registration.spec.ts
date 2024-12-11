import { expect, test } from "../playwright/supports/fixtures";

test.describe("room-registration", () => {
  const auth = {
    email: process.env.LINE_EMAIL!,
    pw: process.env.LINE_PASSWORD!,
  };

  const roomConn = {
    name: "CheckSlip-Bot-5",
    botName: "Dev_1",
    friendName: "NarongKiad",
  };

  test("tests create-line-group-chat", async ({ page }) => {
    test.setTimeout(3 * 10000);

    await page.setViewportSize({
      width: 975,
      height: 722,
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

    //- create chat room and invite bot and friend
    await page.goto(
      "chrome-extension://ophjlpahpchlmihnnnihgmmeilfjmjjc/index.html#/friends"
    );
    await page.locator("div.chatroom-module__chatroom__eVUaK").click();

    await page
      .locator("ul.gnb-module__nav_list__wRO2S > li:nth-of-type(2) path")
      .click();
    await page
      .locator("div.chatlist-module__create_chat_button__lADKP > button path")
      .click(); // Click the button

    const [chatCreatePopup] = await Promise.all([
      page.waitForEvent("popup"), // Wait for the popup event
      await page.locator("li:nth-of-type(2) span").click(),
    ]);

    await chatCreatePopup.waitForLoadState(); // Wait for the popup to load

    await chatCreatePopup
      .locator(
        "#root > div > div.selectFriendPopup-module__contents__oa4pD > div.selectFriendPopup-module__friend_list_area__mjlRL > div > div.searchInput-module__input_box__vp6NF > label > input"
      )
      .click();
    await chatCreatePopup
      .locator(
        "#root > div > div.selectFriendPopup-module__contents__oa4pD > div.selectFriendPopup-module__friend_list_area__mjlRL > div > div.searchInput-module__input_box__vp6NF > label > input"
      )
      .type(roomConn.botName);

    await chatCreatePopup.waitForTimeout(1000); // Wait for one second
    await chatCreatePopup
      .locator(
        "div.friendlist-module__list__Z-8nt > div > div > div > div > div:nth-of-type(2) svg"
      )
      .click();
    await chatCreatePopup
      .locator(
        "#root > div > div.selectFriendPopup-module__contents__oa4pD > div.selectFriendPopup-module__friend_list_area__mjlRL > div > div.searchInput-module__input_box__vp6NF > label > input"
      )
      .clear();
    await chatCreatePopup
      .locator(
        "#root > div > div.selectFriendPopup-module__contents__oa4pD > div.selectFriendPopup-module__friend_list_area__mjlRL > div > div.searchInput-module__input_box__vp6NF > label > input"
      )
      .click();
    await chatCreatePopup
      .locator(
        "#root > div > div.selectFriendPopup-module__contents__oa4pD > div.selectFriendPopup-module__friend_list_area__mjlRL > div > div.searchInput-module__input_box__vp6NF > label > input"
      )
      .type(roomConn.friendName);
    await page.waitForTimeout(1000); // Wait for 1 second

    await chatCreatePopup
      .locator(
        "div.friendlist-module__list__Z-8nt > div > div > div > div > div:nth-of-type(2) svg"
      )
      .click();
    await chatCreatePopup
      .locator("div.selectFriendPopup-module__footer__Qn6Yb button")
      .click();
    await chatCreatePopup
      .locator("button.alertModal-module__button_action__URAY-")
      .click();
    await chatCreatePopup
      .locator("div.selectFriendPopup-module__header__-4JlD input")
      .click();
    await chatCreatePopup
      .locator("div.selectFriendPopup-module__header__-4JlD input")
      .type(roomConn.name);

    await chatCreatePopup.locator("button:nth-of-type(2)").click();

    await page.waitForTimeout(1000); // Wait for one second

    await page.locator("textarea-ex").click();
    await page.locator("textarea-ex").type("OK");
    await page.keyboard.press("Enter");

    const textSenderLocator = page
      .locator(
        "div > div.textMessageContent-module__content_wrap__238E1 > pre > span"
      )
      .first();
    await expect(textSenderLocator).toHaveText("OK");

    // await page.keyboard.press("Meta+V");

    // await page.waitForTimeout(500);

    // page.keyboard.down("{Enter}");

    // await page.waitForTimeout(5000);

    // await page.locator("textarea-ex").click();

    // await page
    //   .locator(
    //     "div.chatroomEditor-module__editor_area__1UsgR button:nth-of-type(1) svg"
    //   )
    //   .click();
    // await page.waitForTimeout(15000); // Wait for 15 second
    // // Verify the text
    // const textLocator = page
    //   .locator(
    //     "div > div.content > flex-bubble > div > div.flex-body > flex-box > flex-box:nth-child(1) > flex-text > div > span"
    //   )
    //   .first(); // Ensure we are selecting the first matching element
    // await expect(textLocator).toHaveText("สลิปถูกต้อง");
  });
});
