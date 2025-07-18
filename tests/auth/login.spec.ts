import { test, expect } from 'donobu';

const title = 'immerse-login';
const details = {
  annotation: {
    type: 'objective',
    description: `Log into the website with the given credentials,
Assert that the page shows text "Immerse Demo Account"

email: {{$.env.EMAIL}}
password: {{$.env.PASSWORD}}`
  },
};
test(title, details, async ({ page }) => {
  // Initializing web navigation.
  await page.goto('https://staging-dashboard.immerse.online');
  // Inputting the provided email address into the email field to log in.
  await page.inputText({
    text: "{{$.env.EMAIL}}",
    finalizeWithSubmit: false,
    selector: {
      element: [
        "[placeholder='Email']",
        'html > body > div:nth-of-type(1) > div:nth-of-type(1) > div > div > div:nth-of-type(2) > div:nth-of-type(1) > input',
        'div > input:nth-of-type(1)',
        '.c-gtNREi',
        'input',
        'input.c-gtNREi',
        'div > :nth-child(1)',
      ],
      frame: null,
    },
  });
  // Inputting the provided password into the password field to log in.
  await page.inputText({
    text: "{{$.env.PASSWORD}}",
    finalizeWithSubmit: false,
    selector: {
      element: [
        "[placeholder='Password']",
        'html > body > div:nth-of-type(1) > div:nth-of-type(1) > div > div > div:nth-of-type(2) > div:nth-of-type(2) > input',
        'div > input:nth-of-type(1)',
        '.c-gtNREi',
        'input',
        'input.c-gtNREi',
        'div > :nth-child(1)',
      ],
      frame: null,
    },
  });
  // Clicking the Login button to complete the login process.
  await page.clickElement({
    selector: {
      element: [
        "//button[normalize-space(.)='Login']",
        'div > :nth-child(4)',
        'div > button:nth-of-type(1)',
        'html > body > div:nth-of-type(1) > div:nth-of-type(1) > div > div > button',
        '.c-gNnAWR',
        'button',
        'button.c-gNnAWR',
      ],
      frame: null,
    },
  });
  // Waiting for the page to load after logging in.
  await page.waitForTimeout(5000);
  // Asserting that the page shows the text 'Immerse Demo Account' to confirm successful login.
  await expect(page.getByText('Immerse Demo Account')).toBeVisible();

  await page.context().storageState({ path: "login-state.json" });

});
