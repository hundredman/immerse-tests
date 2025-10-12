import { test, expect } from 'donobu';

const title = 'immerse-login';
const details = {
  annotation: [
    {
      type: 'objective',
      description: `Log in to b2b dashboard
Enter Email: {{$.env.EMAIL}}
Enter Password: {{$.env.PASSWORD}}
Click on Log In
Verify user lands on Dashboard home page by asserting the words "Learning Summary" are displayed on the page`,
    },
  ],
};
test(title, details, async ({ page }) => {
  // Navigate to the URL and wait for the network to become idle.
  await page.goto('https://staging-dashboard.immerse.online', { waitUntil: 'networkidle' });
  // Entering the email address as specified in the objective to log in to the b2b dashboard.
  await page.inputText({
    text: 'sample.hradmin.readonly.6@immerse.online',
    finalizeWithSubmit: false,
    selector: {
      element: [
        '#__next > div:nth-of-type(1) > div > div > div:nth-of-type(2) > div:nth-of-type(1) > input',
        "[placeholder='Email']",
        'div:nth-of-type(1) > input.c-gtNREi',
        'div.c-jhyvPY > div:nth-of-type(2) > div:nth-of-type(1) > input',
        'div.c-gqwkJN > div > div:nth-of-type(2) > div:nth-of-type(1) > input',
        'div.c-ejwOqd > div > div > div:nth-of-type(2) > div:nth-of-type(1) > input',
        'body > div:nth-of-type(1) > div:nth-of-type(1) > div > div > div:nth-of-type(2) > div:nth-of-type(1) > input',
        'input.c-gtNREi',
      ],
      frame: null,
    },
  });
  // Entering the password as specified in the objective to complete the login credentials for the b2b dashboard.
  await page.inputText({
    text: '6hradminreadonly',
    finalizeWithSubmit: false,
    selector: {
      element: [
        '#__next > div:nth-of-type(1) > div > div > div:nth-of-type(2) > div:nth-of-type(2) > input',
        "[placeholder='Password']",
        'div:nth-of-type(2) > input.c-gtNREi',
        'div.c-jhyvPY > div:nth-of-type(2) > div:nth-of-type(2) > input',
        'div.c-gqwkJN > div > div:nth-of-type(2) > div:nth-of-type(2) > input',
        'div.c-ejwOqd > div > div > div:nth-of-type(2) > div:nth-of-type(2) > input',
        'body > div:nth-of-type(1) > div:nth-of-type(1) > div > div > div:nth-of-type(2) > div:nth-of-type(2) > input',
        'input.c-gtNREi',
      ],
      frame: null,
    },
  });
  // Clicking the Login button to submit the credentials and proceed to the dashboard as specified in the objective.
  await page.clickElement({
    selector: {
      element: [
        '#__next > div:nth-of-type(1) > div > div > button',
        ".//button[normalize-space(.)='Login']",
        'button.c-gNnAWR',
        'div.c-jhyvPY > button',
        'div.c-gqwkJN > div > button',
        'div.c-ejwOqd > div > div > button',
        'body > div:nth-of-type(1) > div:nth-of-type(1) > div > div > button',
      ],
      frame: null,
    },
  });
  // Waiting for the login process to complete and the page to redirect to the dashboard after clicking the Login button.
  await page.waitForTimeout(3000);
  // Verifying that the user has successfully landed on the Dashboard home page by checking for the presence of "Learning Summary" text as specified in the objective.
  await expect(page.getByText('Learning Summary')).toBeVisible();
  // Saving the browser storage state to a file for future use in tests.
  await page.context().storageState({ path: "login-state.json" });

});
