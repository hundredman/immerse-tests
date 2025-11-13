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

const title = 'Test for https://staging-dashboard.immerse.online/';
const details = {
  annotation: [
    {
      type: 'objective',
      description: `Verify the language toggle works. Change language to Japanese. Assert that the page shows up in Japanese.`,
    },
  ],
};
test(title, details, async ({ page }) => {
  // Initializing web navigation.
  await page.goto('https://app.immerse.online/login');
  // Clicking the language dropdown to change the display language.
  await page
    .find('#mantine-R4qaqm-target', {
      failover: ["(.//div[normalize-space(.)='En'])[2]", 'div.css-1j0a71q'],
    })
    .click();
  // Changing the language to Japanese by clicking on the '日本語' option in the language selection menu.
  await page
    .find('#mantine-R4qaqm-dropdown > div > button:nth-of-type(4)', {
      failover: [
        ".//button[normalize-space(.)='日本語']",
        'html > body > div:nth-of-type(3) > div > div > div > button:nth-of-type(4)',
      ],
    })
    .click();
  // Asserting that the page content is now in Japanese.
  await page.assertPageText({
    text: 'ログイン',
  });
});
