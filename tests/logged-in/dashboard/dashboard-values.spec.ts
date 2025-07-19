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

const title = 'dashboard-verify-values';
const details = {
  annotation: [
    {
      type: 'objective',
      description: `Verify that the key elements of the dashboard are populated. Also, change the time frame to last quarter and verify that the data changes.`,
    },
  ],
};
test(title, details, async ({ page }) => {
  // Initializing web navigation.
  await page.goto('https://staging-dashboard.immerse.online/dashboard');
  // Waiting for the dashboard to load completely.
  await page.waitForTimeout(5000);
  // Verifying that the 'Number of Learners' element is populated on the dashboard.
  await page.visuallyAssert({
    assertionToTestFor:
      "Assert that 'Number of Learners' is present and has a value.",
  });
  // Verifying that the 'Logged in at Least Once' element is populated on the dashboard.
  await page.visuallyAssert({
    assertionToTestFor:
      "Assert that 'Logged in at Least Once' is present and has a value.",
  });
  // Verifying that the '% Attended Trainer-led Classes' element is populated on the dashboard.
  await page.visuallyAssert({
    assertionToTestFor:
      "Assert that '% Attended Trainer-led Classes' is present and has a value.",
  });
  // Verifying that the 'Attended Trainer-led classes' element is populated on the dashboard.
  await page.visuallyAssert({
    assertionToTestFor:
      "Assert that 'Attended Trainer-led classes' is present and has a value.",
  });
  // Verifying that the 'Average Class Rating' element is populated on the dashboard.
  await page.visuallyAssert({
    assertionToTestFor:
      "Assert that 'Average Class Rating' is present and has a value.",
  });
  // Verifying that the 'Attended Social Events' element is populated on the dashboard.
  await page.visuallyAssert({
    assertionToTestFor:
      "Assert that 'Attended Social Events' is present and has a value.",
  });
  // Verifying that the 'Completed Self-Paced Lessons' element is populated on the dashboard.
  await page.visuallyAssert({
    assertionToTestFor:
      "Assert that 'Completed Self-Paced Lessons' is present and has a value.",
  });
  // Changing the time frame to 'Last quarter' to observe data changes.
  await page.clickElement({
    selector: {
      element: [
        '#mantine-r4',
        "[placeholder='Select\\ Date\\ Range']",
        'html > body > div:nth-of-type(1) > div > div > div:nth-of-type(2) > div > div:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(2) > div > div > input',
        "[data-mantine-stop-propagation='false']",
        "input[data-mantine-stop-propagation='false']",
        'div > input:nth-of-type(1)',
        'input',
        'div > :nth-child(1)',
      ],
      frame: null,
    },
  });
  // Selecting 'Last Quarter' from the time frame dropdown to change the dashboard's data view.
  await page.clickElement({
    selector: {
      element: [
        '#mantine-r4-4',
        "//div[normalize-space(.)='Last Quarter']",
        'html > body > div:nth-of-type(1) > div > div > div:nth-of-type(2) > div > div:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(2) > div:nth-of-type(2) > div > div > div:nth-of-type(1) > div > div > div:nth-of-type(5)',
        'div > :nth-child(5)',
        'div > div:nth-of-type(5)',
        'div',
      ],
      frame: null,
    },
  });
  // Verifying that the 'Number of Learners' value has changed after updating the time frame.
  await page.visuallyAssert({
    assertionToTestFor: "Assert that the value for 'Number of Learners' is 46.",
  });
  // Verifying that the 'Logged in at Least Once' value has changed after updating the time frame.
  await page.visuallyAssert({
    assertionToTestFor:
      "Assert that the value for 'Logged in at Least Once' is 107%.",
  });
  // Verifying that the '% Attended Trainer-led Classes' value has changed after updating the time frame.
  await page.visuallyAssert({
    assertionToTestFor:
      "Assert that the value for '% Attended Trainer-led Classes' is 104%.",
  });
  // Verifying that the 'Attended Trainer-led classes' value has changed after updating the time frame.
  await page.visuallyAssert({
    assertionToTestFor:
      "Assert that the value for 'Attended Trainer-led classes' is 668.",
  });
  // Verifying that the 'Average Class Rating' value has changed after updating the time frame.
  await page.visuallyAssert({
    assertionToTestFor:
      "Assert that the value for 'Average Class Rating' is 5.",
  });
  // Verifying that the 'Attended Social Events' value has changed after updating the time frame.
  await page.visuallyAssert({
    assertionToTestFor:
      "Assert that the value for 'Attended Social Events' is 660.",
  });
  // Verifying that the 'Completed Self-Paced Lessons' value has changed after updating the time frame.
  await page.visuallyAssert({
    assertionToTestFor:
      "Assert that the value for 'Completed Self-Paced Lessons' is 2660.",
  });
});
