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

const title = 'dashboard-language-toggle';
const details = {
  annotation: [
    {
      type: 'objective',
      description: `Verify the language toggle works. Change language to Japanese. Assert that the dashboard shows up in Japanese.`,
    },
  ],
};
test(title, details, async ({ page }) => {
  // Initializing web navigation.
  await page.goto('https://staging-dashboard.immerse.online/dashboard');
  // Waiting for the page to load.
  await page.waitForTimeout(5000);
  // Clicking the language dropdown to change the display language to Japanese.
  await page.clickElement({
    selector: {
      element: ["[aria-label='Display\\ Language']"],
      frame: null,
    },
  });
  // Selecting 'Japanese' from the language dropdown to change the display language.
  await page.clickElement({
    selector: {
      element: ['#mantine-r1-1'],
      frame: null,
    },
  });
  // Asserting that the dashboard text is in Japanese to confirm the language change was successful.
  await page.visuallyAssert({
    assertionToTestFor:
      "Assert that the text 'ダッシュボード' is present on the page.",
    retries: 3,
    retryWaitSeconds: 10,
  });
});
