import { test, expect } from 'donobu';

const title = 'immerse-b2b-login';
const details = {
  annotation: [
    {
      type: 'objective',
      description: `Log in with b2b account and verify Nvidia loads:

Enter Email: sample.hradmin.readonly.6@immerse.online
Enter Password: 6hradminreadonly
Click on Log In and wait to be redirected.
Assert that the url contains "nvidia"
`,
    },
  ],
};
test(title, details, async ({ page }) => {
  // Initializing web navigation.
  await page.goto('https://app.immerse.online/login');
  await page.getByRole('heading', { name: 'Log In' }).waitFor({ state: 'visible', timeout: 90000 });
  // Inputting the provided email address into the email field to log in.
  await page.waitForTimeout(10000);
  await page
    .find("[placeholder='Enter your email']", {
      failover: ['input.css-111d7as', 'div.css-1f7apd6 > input'],
    })
    .inputText('sample.hradmin.readonly.6@immerse.online');
  // Entering the provided password into the password input field to log in.
  await page
    .find('#mantine-R2kp5aaqm', {
      failover: [
        "[data-testid='passwordinput']",
        "[placeholder='Enter your password']",
      ],
    })
    .inputText('6hradminreadonly');
  // Clicking the 'Login' button to proceed with the login process.
  await page
    .find(".//button[normalize-space(.)='Login']", {
      failover: ['button.css-3wz0nu', 'div.css-1fhtl0l > button'],
    })
    .click();
  // Waiting for the login process to complete and the page to redirect to the logged-in page after clicking the Login button.
  await page.waitForTimeout(3000);

  // Asserting that the current URL contains the word "nvidia" to confirm navigation to nvidia page.
  await expect(page).toHaveURL(/gfn\/desktop/, { timeout: 90000 });

});
