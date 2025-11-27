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

const title = 'Test for https://app.immerse.online';
const details = {
  annotation: [
    {
      type: 'objective',
      description: `Navigate to schedule and check that it populates:
	Navigate to the home page for d2c learners (https://app.immerse.online/home)
	Click on "Schedule"
	Verify that the Schedule populates with at least 1 lesson`,
    },
  ],
};
test(title, details, async ({ page }) => {
  // Navigate to the d2c learner home page
  await page.goto('https://app.immerse.online/home');
  await page.waitForTimeout(3000);
  // Clicking on the 'Schedule' link to navigate to the schedule page, as per the objective.
  await page
    .find("li:nth-of-type(2) > [data-testid='link-primary']", {
      failover: [
        ".//a[normalize-space(.)='Schedule']",
        "[href='/schedule']",
        "li:nth-of-type(2) > [data-active='false']",
        'li:nth-of-type(2) > a.mantine-Text-root',
        'nav.c-kaYfly > div > ul > li:nth-of-type(2) > a',
        'div.c-fGvmyR > div > nav:nth-of-type(1) > div > ul > li:nth-of-type(2) > a',
        "[data-testid='home-page'] > div:nth-of-type(3) > div > nav:nth-of-type(1) > div > ul > li:nth-of-type(2) > a",
        'body > div:nth-of-type(1) > div:nth-of-type(1) > div > div:nth-of-type(3) > div > nav:nth-of-type(1) > div > ul > li:nth-of-type(2) > a',
        "[data-active='false']",
        "[data-testid='link-primary']",
        'a.mantine-Text-root',
      ],
    })
    .click();
  // Waiting for the schedule to populate after navigating to the schedule page.
  await page.waitForTimeout(5000);

  // Verify that the Schedule populates with at least 1 lesson
  await page.run('assert', {
    assertionToTestFor: 'The schedule page displays at least 1 lesson',
  });
});
