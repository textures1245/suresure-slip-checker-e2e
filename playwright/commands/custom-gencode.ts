const { chromium } = require("@playwright/test");
const { exec } = require("child_process");
const path = require("path");

(async () => {
  const pathToExtension = path.resolve(
    process.env.LINE_EXTENSION_PATH || "path/to/extension"
  );
  const context = await chromium.launchPersistentContext("", {
    headless: false,
    args: [
      `--disable-extensions-except=${pathToExtension}`,
      `--load-extension=${pathToExtension}`,
    ],
  });

  const page = await context.newPage();
  await page.goto(
    "chrome-extension://ophjlpahpchlmihnnnihgmmeilfjmjjc/index.html"
  );

  // Close the browser context to save the storage state
  //   await context.close();
  //   await context.storageState({ path: "auth.json" });

  // Start the codegen process
  exec(
    "npx playwright codegen chrome-extension://ophjlpahpchlmihnnnihgmmeilfjmjjc/index.html --save-storage=auth.json",
    (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`Stderr: ${stderr}`);
        return;
      }
      console.log(`Stdout: ${stdout}`);
    }
  );
})();
