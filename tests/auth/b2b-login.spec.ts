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
  await page.goto('https://app.immerse.online');
  // Inputting the provided email address into the email field to log in.
  await page.inputText({
    text: 'sample.hradmin.readonly.6@immerse.online',
    finalizeWithSubmit: false,
    selector: {
      element: [
        '#__next > div:nth-of-type(1) > div > div > div:nth-of-type(2) > div:nth-of-type(1) > input',
        "[placeholder='Email']",
        'div:nth-of-type(1) > input.c-gtNREi',
        'div.c-iGVwqn > div:nth-of-type(2) > div:nth-of-type(1) > input',
        'div.c-gqwkJN > div > div:nth-of-type(2) > div:nth-of-type(1) > input',
        'div.c-ejwOqd > div > div > div:nth-of-type(2) > div:nth-of-type(1) > input',
        'body > div:nth-of-type(1) > div:nth-of-type(1) > div > div > div:nth-of-type(2) > div:nth-of-type(1) > input',
        'input.c-gtNREi',
      ],
      frame: null,
    },
  });
  // Inputting the provided password into the password field to log in.
  await page.inputText({
    text: '6hradminreadonly',
    finalizeWithSubmit: false,
    selector: {
      element: [
        '#__next > div:nth-of-type(1) > div > div > div:nth-of-type(2) > div:nth-of-type(2) > input',
        "[placeholder='Password']",
        'div:nth-of-type(2) > input.c-gtNREi',
        'div.c-iGVwqn > div:nth-of-type(2) > div:nth-of-type(2) > input',
        'div.c-gqwkJN > div > div:nth-of-type(2) > div:nth-of-type(2) > input',
        'div.c-ejwOqd > div > div > div:nth-of-type(2) > div:nth-of-type(2) > input',
        'body > div:nth-of-type(1) > div:nth-of-type(1) > div > div > div:nth-of-type(2) > div:nth-of-type(2) > input',
        'input.c-gtNREi',
      ],
      frame: null,
    },
  });
  // Clicking the 'Login' button to proceed with the login process.
  await page.clickElement({
    selector: {
      element: [
        '#__next > div:nth-of-type(1) > div > div > button',
        ".//button[normalize-space(.)='Login']",
        'button.c-dpWHaL',
        'div.c-iGVwqn > button',
        'div.c-gqwkJN > div > button',
        'div.c-ejwOqd > div > div > button',
        'body > div:nth-of-type(1) > div:nth-of-type(1) > div > div > button',
      ],
      frame: null,
    },
  });
  // Waiting for the login process to complete and the page to redirect to the logged-in page after clicking the Login button.
  await page.waitForTimeout(3000);

  // Asserting that the current URL contains the word "nvidia" to confirm navigation to nvidia page.
  await expect(page).toHaveURL(/nvidia/);

});
