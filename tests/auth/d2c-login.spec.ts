import { test, expect } from 'donobu';

const title = 'immerse-d2c-login';
const details = {
  annotation: [
    {
      type: 'objective',
      description: `Log in with d2c account and save authentication state:

Navigate to app.immerse.online
Enter the email of a d2c user: test_stripe_v3_user@immerse.online
Enter the password for that d2c user: 49i4EjT&gK53pB!M
Click on Login
Verify landing at the home page for d2c learners`
    },
  ],
};
test(title, details, async ({ page, context }) => {
  // Initializing web navigation.
  await page.goto('https://app.immerse.online/login');
  // Wait for the login page to load
  await page.getByRole('heading', { name: 'Log In' }).waitFor({ state: 'visible', timeout: 90000 });
  await page.waitForTimeout(10000);

  // Entering the user's email address as part of the login process.
  await page
    .find("[placeholder='Enter your email']", {
      failover: ['input.css-111d7as', 'div.css-1f7apd6 > input'],
    })
    .inputText('test_stripe_v3_user@immerse.online');

  // Entering the password and submitting the login form.
  await page
    .find('#mantine-R2kp5aaqm', {
      failover: [
        "[data-testid='passwordinput']",
        "[placeholder='Enter your password']",
      ],
    })
    .inputText('49i4EjT&gK53pB!M', { finalizeWithSubmit: true });

  // Clicking the login button to proceed with the authentication.
  await page
    .find(".//button[normalize-space(.)='Login']", {
      failover: ['button.css-3wz0nu', 'div.css-1fhtl0l > button'],
    })
    .click();

  // Verify navigation to GFN desktop after login
  await expect(page).toHaveURL(/.*gfn\/desktop/);

  // Save the authentication state
  await context.storageState({ path: 'd2c-login-state.json' });
});
