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
  // Verifying that the 'Number of Learners' element is populated on the dashboard.
  await page.visuallyAssert({
    assertionToTestFor:
      "Assert that 'Number of Learners' is present and has a value.",
    retries: 3,
    retryWaitSeconds: 7,
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
  // Scrolling down to find the 'Attended Social Events' element.
  await page.scroll({
    direction: 'DOWN',
    selector: {
      element: ['html'],
      frame: null,
    },
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
  // Scrolling up to find the date range input field to change the time frame.
  await page.scroll({
    direction: 'UP',
    selector: {
      element: ['html'],
      frame: null,
    },
  });
  // Changing the time frame to 'Last quarter' to observe data changes.
  await page.clickElement({
    selector: {
      element: [
        '#mantine-r4',
        "[data-testid='dashboard-header-time-filter']",
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
  const learnersCount = await page.locator('text=Number of Learners').locator('xpath=following-sibling::div[1]').textContent();
  const loggedInCount = await page.locator('text=Logged in at Least Once').locator('xpath=following-sibling::div[1]').textContent();
  const attendedClassesPerc = await page.locator('text=% Attended Trainer-led Classes').locator('xpath=following-sibling::div[1]').textContent();
  // Attended Trainer-led Classes
  const attendedClassesCount = await page
    .locator('text=Attended Trainer-led Classes')
    .locator('xpath=following-sibling::div[contains(@class,"mantine-Group-root")]//div[contains(@class,"mantine-Text-root")]')
    .first().textContent();

  // Average Class Rating
  const averageClassRatingCount = await page
    .locator('text=Average Class Rating')
    .locator('xpath=following-sibling::div[contains(@class,"mantine-Text-root")]').first()
    .textContent();

  // Attended Social Events
  const attendedSocialEventsCount = await page
    .locator('text=Attended Social Events')
    .locator('xpath=following-sibling::div[contains(@class,"mantine-Group-root")]//div[contains(@class,"mantine-Text-root")]').first()
    .textContent();

  // Completed Self-Paced Lessons
  const completedSelfPacedLessonsCount = await page
    .locator('text=Completed Self-Paced Lessons')
    .locator('xpath=following-sibling::div[contains(@class,"mantine-Group-root")]//div[contains(@class,"mantine-Text-root")]').first()
    .textContent();
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
    assertionToTestFor: `
    Assert that at least one of the following conditions is true:
    - 'Number of Learners' is not ${learnersCount}
    - 'Logged in at Least Once' is not ${loggedInCount}
    - '% Attended Trainer-led Classes' is not ${attendedClassesPerc}
    - 'Attended Trainer-led Classes' is not ${attendedClassesCount}
    - 'Average Class Rating' is not ${averageClassRatingCount}
    - 'Attended Social Events' is not ${attendedSocialEventsCount}
    - 'Completed Self-Paced Lessons' is not ${completedSelfPacedLessonsCount}.`,
  });
});
