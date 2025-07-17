import { test } from "donobu";

const title = "Login to the website";
const details = {
  annotation: {
    type: "objective",
    description: `Login to the website.`,
  },
};
test(title, details, async ({ page }) => {
  throw new Error("TODO: Implement the login test logic here");
  await page.context().storageState({ path: "caregiver-login.json" });
});
