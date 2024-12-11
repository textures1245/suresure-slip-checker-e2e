import { test, expect } from "./../playwright/supports/fixtures";

test.describe("register-and-slip-verfification", () => {
  const auth = {
    email: process.env.LINE_EMAIL!,
    pw: process.env.LINE_PASSWORD!,
  };

  const roomConn = {
    name: "CheckSlip-Bot-12",
    botName: "Dev_1",
    friendName: "NarongKiad",
  };

  test("tests create-room -> register-room-on-line-chat -> slip-verification", async ({
    page,
  }) => {
    test.setTimeout(4 * 60000);

    await page.setViewportSize({
      width: 975,
      height: 722,
    });

    //- create-room
    await page.goto("https://slippay.paysolutions.io/");
    await page.getByPlaceholder("Email address").click();
    await page.locator('input[name="tid"]').fill("sirprak1245@gmail.com");
    await page.getByPlaceholder("Password").click();
    await page.locator('input[name="tpasswd"]').fill("@Rty0654209589");
    await page.getByRole("button", { name: "Log in" }).click();

    await page.waitForTimeout(10000); // Wait for one second
    await page.goto("https://slippay.paysolutions.io/dashboard");
    await page.getByRole("link", { name: "จัดการบัญชี" }).click();
    await page
      .locator("div:nth-child(2) > .rounded-xl > .pt-0 > .flex > svg")
      .click();
    await page.getByRole("region").getByRole("link").click();
    await page.getByPlaceholder("กรอกข้อมูลที่นี่").click();
    await page.getByPlaceholder("กรอกข้อมูลที่นี่").fill(roomConn.name);
    await page.evaluate(() => {
      const canvas = document.querySelector("canvas");
      if (canvas) {
        canvas.toBlob((blob) => {
          if (!blob) {
            console.error("Canvas is empty");
            return;
          }
          const item = new ClipboardItem({ "image/png": blob });
          navigator.clipboard.write([item]);
        });
      }
    });

    await page.locator("#menuToggle").first().check();
    await page
      .locator("div:nth-child(2) > div:nth-child(3) > #menuToggle")
      .check();
    await page
      .locator("div:nth-child(3) > div:nth-child(3) > #menuToggle")
      .check();
    await page
      .locator("div:nth-child(4) > div:nth-child(3) > #menuToggle")
      .check();
    await page
      .locator("div:nth-child(5) > div:nth-child(3) > #menuToggle")
      .check();
    await page
      .locator("div:nth-child(6) > div:nth-child(3) > #menuToggle")
      .check();
    await page
      .locator("div:nth-child(7) > div:nth-child(3) > #menuToggle")
      .check();
    await page
      .locator("div:nth-child(8) > div:nth-child(3) > #menuToggle")
      .check();
    await page.locator("#paymentAmount").click();
    await page.locator("#paymentAmount").fill("0");
    // await page.locator("canvas").click({
    //   button: "right",
    //   position: {
    //     x: 123,
    //     y: 55,
    //   },
    // });

    await page.getByRole("button", { name: "บันทึกการเปลี่ยนแปลง" }).click();
    await page.getByRole("button", { name: "ไปหน้า แดชบอร์ด" }).click();

    //- go to line and login
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

    //- create chat room and invite bot and friend
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

    //- slip verification
    await page.locator("textarea-ex").click();
    await page.waitForTimeout(3 * 1000); // Wait for one second
    await page.keyboard.press("Meta+V");

    await page.waitForTimeout(500);

    await page.keyboard.press("Enter");

    // await page.waitForTimeout(5000);

    const roomRegisterRespDiv = page
      .locator(
        "div > div.content > flex-bubble > div > div > flex-box > flex-box > flex-text > div > span"
      )
      .first();
    await expect(roomRegisterRespDiv).toBeVisible();
    await expect(roomRegisterRespDiv).toHaveText("ยืนยันการเข้าร่วมสำเร็จ");

    await page.locator("textarea-ex").click();

    await page
      .locator(
        "div.chatroomEditor-module__editor_area__1UsgR button:nth-of-type(1) svg"
      )
      .click();
    await page.waitForTimeout(15000); // Wait for 15 second
    // Verify the text
    const textLocator = page
      .locator(
        "div > div.content > flex-bubble > div > div.flex-body > flex-box > flex-box:nth-child(1) > flex-text > div > span"
      )
      .first(); // Ensure we are selecting the first matching element
    await expect(textLocator).toBeVisible();
    await expect(textLocator).toHaveText("สลิปถูกต้อง");
  });
});
