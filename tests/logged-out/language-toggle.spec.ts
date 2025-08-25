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
  await page.goto('https://staging-dashboard.immerse.online/');
  // Clicking the language dropdown to change the display language.
  await page.clickElement({
    selector: {
      element: [
        '#mantine-r0-target',
        '#__next > div:nth-of-type(1) > div > div > div:nth-of-type(1) > div:nth-of-type(2)',
        "[aria-label='Display Language']",
        "(.//div[normalize-space(.)='ENGLISH'])[1]",
        'div.css-18wbxrz',
        'div.css-1a47ai3 > div:nth-of-type(2)',
        'div.c-jhyvPY > div:nth-of-type(1) > div:nth-of-type(2)',
        'div.c-gqwkJN > div > div:nth-of-type(1) > div:nth-of-type(2)',
        'div.c-ejwOqd > div > div > div:nth-of-type(1) > div:nth-of-type(2)',
        'html > body > div:nth-of-type(1) > div:nth-of-type(1) > div > div > div:nth-of-type(1) > div:nth-of-type(2)',
        'body > div:nth-of-type(1) > div:nth-of-type(1) > div > div > div:nth-of-type(1) > div:nth-of-type(2)',
        ".//div[normalize-space(.)='ENGLISH']",
      ],
      frame: null,
    },
  });
  // Changing the display language to Japanese.
  await page.clickElement({
    selector: {
      element: [
        '#mantine-r0-dropdown > div > button:nth-of-type(2)',
        '#__next > div:nth-of-type(1) > div > div > div:nth-of-type(1) > div:nth-of-type(3) > div > button:nth-of-type(2)',
        ".//button[normalize-space(.)='日本語']",
        'div.css-1a47ai3 > div:nth-of-type(3) > div > button:nth-of-type(2)',
        'div.c-jhyvPY > div:nth-of-type(1) > div:nth-of-type(3) > div > button:nth-of-type(2)',
        'div.c-gqwkJN > div > div:nth-of-type(1) > div:nth-of-type(3) > div > button:nth-of-type(2)',
        'div.c-ejwOqd > div > div > div:nth-of-type(1) > div:nth-of-type(3) > div > button:nth-of-type(2)',
        'body > div:nth-of-type(1) > div:nth-of-type(1) > div > div > div:nth-of-type(1) > div:nth-of-type(3) > div > button:nth-of-type(2)',
        "[role='menuitem']",
        "[data-menu-item='true']",
        'button.mantine-Menu-item',
      ],
      frame: null,
    },
  });
  // Asserting that the page content is now in Japanese.
  await page.assertPageText({
    text: 'ログイン',
  });
});
