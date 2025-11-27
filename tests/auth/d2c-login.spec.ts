import { test } from 'donobu';

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
Verify landing at the home page for d2c learners (https://app.immerse.online/home)
`,
    },
  ],
};
test(title, details, async ({ page, context }) => {
  // Initializing web navigation.
  await page.goto('https://app.immerse.online/login');
  await page.getByRole('heading', { name: 'Log In' }).waitFor({ state: 'visible', timeout: 90000 });
  await page.waitForTimeout(10000);

  // Entering the d2c user's email address into the email input field to log in.
  await page
    .find("[placeholder='Enter your email']", {
      failover: [
        'input.css-111d7as',
        'div.css-1f7apd6 > input',
        'div.css-1fhtl0l > div:nth-of-type(1) > div > input',
        'div.css-11ifkoq > div:nth-of-type(2) > div:nth-of-type(1) > div > input',
        'div.c-ejwOqd > div > div:nth-of-type(2) > div:nth-of-type(1) > div > input',
        'body > div:nth-of-type(1) > div:nth-of-type(1) > div > div:nth-of-type(2) > div:nth-of-type(1) > div > input',
      ],
    })
    .inputText('test_stripe_v3_user@immerse.online');

  // Entering the d2c user's password into the password input field to complete the login credentials.
  await page
    .find("[data-testid='passwordinput']", {
      failover: [
        "[placeholder='Enter your password']",
        'input.mantine-13e8zn2',
        'div.mantine-PasswordInput-input > input',
        'div.mantine-Input-wrapper > div:nth-of-type(1) > input',
        'div.mantine-InputWrapper-root > div > div:nth-of-type(1) > input',
        'div.css-1jv8527 > div:nth-of-type(2) > div > div:nth-of-type(1) > input',
        'div.css-1fhtl0l > div:nth-of-type(2) > div > div:nth-of-type(2) > div > div:nth-of-type(1) > input',
        'div.css-11ifkoq > div:nth-of-type(2) > div:nth-of-type(2) > div > div:nth-of-type(2) > div > div:nth-of-type(1) > input',
        'body > div:nth-of-type(1) > div:nth-of-type(1) > div > div:nth-of-type(2) > div:nth-of-type(2) > div > div:nth-of-type(2) > div > div:nth-of-type(1) > input',
      ],
    })
    .inputText('49i4EjT&gK53pB!M');

  // Clicking the Login button to complete the login process after entering the email and password.
  await page
    .find(".//button[normalize-space(.)='Login']", {
      failover: [
        'button.css-3wz0nu',
        'div.css-1fhtl0l > button',
        'div.css-11ifkoq > div:nth-of-type(2) > button',
        'div.c-ejwOqd > div > div:nth-of-type(2) > button',
        'html > body > div:nth-of-type(1) > div:nth-of-type(1) > div > div:nth-of-type(2) > button',
        'body > div:nth-of-type(1) > div:nth-of-type(1) > div > div:nth-of-type(2) > button',
      ],
    })
    .click();

  // Waiting for the page to load after attempting to log in.
  await page.waitForTimeout(5000);

  // Verify that we landed at the home page for d2c learners
  await page.waitForURL(/.*\/home/, { timeout: 30000 });

  // Save the authentication state
  await context.storageState({ path: 'd2c-login-state.json' });
});
