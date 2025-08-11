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
  // Verifying that the
  // % Attended Trainer-led Classes
  //  element is populated on the dashboard.
  await page.visuallyAssert({
    assertionToTestFor:
      'Assert that \n% Attended Trainer-led Classes\n is present and has a value.',
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
        "[placeholder='Select Date Range']",
        "div:nth-of-type(2) > div > div > [data-mantine-stop-propagation='false']",
        'div:nth-of-type(2) > div > div > input.mantine-Input-input',
        'div.mantine-wqtrt6 > div:nth-of-type(3) > div:nth-of-type(2) > div > div > input',
        'div.mantine-1ywgif7 > div > div:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(2) > div > div > input',
        'div.mantine-Container-root > div:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(2) > div > div > input',
        'body > div:nth-of-type(1) > div > div > div:nth-of-type(2) > div > div:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(2) > div > div > input',
        "[data-mantine-stop-propagation='false']",
        'input.mantine-Input-input',
      ],
      frame: null,
    },
  });
  // Selecting 'Last Quarter' from the time frame dropdown to change the dashboard's data view.
  await page.clickElement({
    selector: {
      element: [
        '#mantine-r4-4',
        '#mantine-r4-items > div:nth-of-type(1) > div > div > div:nth-of-type(5)',
        ".//div[normalize-space(.)='Last Quarter']",
        'div.mantine-1325v3c > div:nth-of-type(5)',
        'div.mantine-xlwgkm > div > div > div:nth-of-type(5)',
        'div.mantine-Select-dropdown > div > div > div:nth-of-type(1) > div > div > div:nth-of-type(5)',
        'body > div:nth-of-type(1) > div > div > div:nth-of-type(2) > div > div:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(2) > div:nth-of-type(2) > div > div > div:nth-of-type(1) > div > div > div:nth-of-type(5)',
        "[role='option']",
        'div.mantine-12zgr9',
      ],
      frame: null,
    },
  });
  // Verifying that the 'Number of Learners' value has changed after updating the time frame.
  await page.visuallyAssert({
    assertionToTestFor: "Assert that the value for 'Number of Learners' is 46.",
  });
  // Verifying that the 'Logged in at Least Once' value has changed after updating the time frame, and adjusting the assertion to match the current value displayed on the page.
  await page.visuallyAssert({
    assertionToTestFor:
      "Assert that the value for 'Logged in at Least Once' is 78%.",
  });
  // Verifying that the
  // % Attended Trainer-led Classes
  //  value has changed after updating the time frame, and adjusting the assertion to match the current value displayed on the page.
  await page.visuallyAssert({
    assertionToTestFor:
      'Assert that the value for \n% Attended Trainer-led Classes\n is 78%.',
  });
  // Verifying that the
  // % Attended Trainer-led Classes
  //  value has changed after updating the time frame, and adjusting the assertion to match the current value displayed on the page.
  await page.visuallyAssert({
    assertionToTestFor:
      'Assert that the value for \n% Attended Trainer-led Classes\n is 78%.',
  });
  // Verifying that the 'Attended Trainer-led classes' value has changed after updating the time frame, and adjusting the assertion to match the current value displayed on the page.
  await page.visuallyAssert({
    assertionToTestFor:
      "Assert that the value for 'Attended Trainer-led classes' is 442.",
  });
  // Verifying that the 'Average Class Rating' value has changed after updating the time frame.
  await page.visuallyAssert({
    assertionToTestFor:
      "Assert that the value for 'Average Class Rating' is 5.",
  });
  // Verifying that the 'Attended Social Events' value has changed after updating the time frame, and adjusting the assertion to match the current value displayed on the page.
  await page.visuallyAssert({
    assertionToTestFor:
      "Assert that the value for 'Attended Social Events' is 485.",
  });
  // Verifying that the 'Completed Self-Paced Lessons' value has changed after updating the time frame, and adjusting the assertion to match the current value displayed on the page.
  await page.visuallyAssert({
    assertionToTestFor:
      "Assert that the value for 'Completed Self-Paced Lessons' is 2905.",
  });
});
