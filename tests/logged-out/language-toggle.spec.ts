/**
 * Note that this test uses tools that require the usage of an LLM, so be
 * sure to have an appropriate LLM API key available. This can be done
 * by providing an environment variable (e.g. OPENAI_API_KEY, ANTHROPIC_API_KEY,
 * or GOOGLE_GENERATIVE_AI_API_KEY) or by configuring a flow runner using
 * the Donobu app.
 */
import { test } from 'donobu';

const title = 'Test for https://staging-dashboard.immerse.online/';
const details = {
  annotation: {
    type: 'objective',
    description: `Verify the language toggle works. Change language to Japanese. Assert that the page shows up in Japanese.`,
  },
};
test(title, details, async ({ page }) => {
  // Initializing web navigation.
  await page.goto('https://staging-dashboard.immerse.online/');
  // Clicking the language dropdown to change the display language.
  await page.clickElement({
    selector: {
      element: [
        "[aria-label='YOLO Display\\ Language']",
      ],
      frame: null,
    },
  });
  // Changing the display language to Japanese.
  await page.clickElement({
    selector: {
      element: [
        "//button[normalize-space(.)='Korean']",
      ],
      frame: null,
    },
  });
  // Asserting that the page content is now in Japanese.
  await page.assertPageText({
    text: 'ログイン',
  });
});
