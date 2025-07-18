/**
 * Note that this test uses tools that require the usage of an LLM, so be
 * sure to have an appropriate LLM API key available. This can be done
 * by providing an environment variable (e.g. OPENAI_API_KEY, ANTHROPIC_API_KEY,
 * or GOOGLE_GENERATIVE_AI_API_KEY) when running the test...
 *
 *    Example: `OPENAI_API_KEY=YOUR_KEY npx playwright test`
 *
 * ...or by configuring a flow runner using the Donobu app.
 */
import { test } from 'donobu';

const title = 'dashboard-learner-dropdown';
const details = {
  annotation: [
    {
      type: 'objective',
      description: `Go to learners tab. Choose "Coach - IMMERSE Coach" from the contract dropdown. Assert that the table shows "5 results" and Licenses show 25/30.`,
    },
  ],
};
test(title, details, async ({ page }) => {
  // Initializing web navigation.
  await page.goto('https://staging-dashboard.immerse.online/dashboard');
  // Waiting for the page to load completely.
  await page.waitForTimeout(5000);
  // Clicking on the 'Learners' tab to navigate to the learners page.
  await page.clickElement({
    selector: {
      element: [
        "//button[normalize-space(.)='Learners']",
        'div > button:nth-of-type(2)',
        'html > body > div:nth-of-type(1) > div > div > div:nth-of-type(1) > div > div:nth-of-type(1) > button:nth-of-type(2)',
        "[data-button='true']",
        "button[data-button='true']",
        'button',
        'div > :nth-child(3)',
      ],
      frame: null,
    },
  });
  // Clicking on the 'All Contracts' dropdown to select 'Coach - IMMERSE Coach'.
  await page.clickElement({
    selector: {
      element: [
        '#mantine-rc-target',
        "//button[normalize-space(.)='All Contracts']",
        'html > body > div:nth-of-type(1) > div > div > div:nth-of-type(2) > div > div:nth-of-type(1) > div:nth-of-type(1) > button',
        'div > button:nth-of-type(1)',
        "[data-button='true']",
        "button[data-button='true']",
        'div > :nth-child(2)',
        'button',
      ],
      frame: null,
    },
  });
  // Choosing "Coach - IMMERSE Coach" from the contract dropdown.
  await page.clickElement({
    selector: {
      element: [
        "//button[normalize-space(.)='Coach - IMMERSE Coach']",
        'html > body > div:nth-of-type(1) > div > div > div:nth-of-type(2) > div > div:nth-of-type(1) > div:nth-of-type(1) > div > div > button:nth-of-type(2)',
        'div > button:nth-of-type(2)',
        "[data-menu-item='true']",
        "button[data-menu-item='true']",
        'div > :nth-child(2)',
        'button',
      ],
      frame: null,
    },
  });
  // Asserting that the table shows "5 results" and Licenses show "25/30" as per the overall objective.
  await page.visuallyAssert({
    assertionToTestFor: 'The table shows "5 results" and "Licenses: 25/30".',
  });
});
