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
      description: `Verify Nvidia integration is working:
	Navigate to the home page for d2c learners (https://app.immerse.online/home)
	Click on "Launch in browser" or "Launch Immerse"
	Verify that clicking the button triggers the Nvidia browser compatibility check (modal appears)`,
    },
  ],
};
test(title, details, async ({ page }) => {
  // Navigate to the d2c learner home page
  await page.goto('https://app.immerse.online/home');
  await page.waitForTimeout(3000);

  // Scrolling down to reveal the launch buttons
  await page
    .find("[data-testid='home-page']", {
      failover: [
        'div.css-fdz8n5',
        'div.c-ejwOqd > div',
        'html > body > div:nth-of-type(1) > div:nth-of-type(1) > div',
        'body > div:nth-of-type(1) > div:nth-of-type(1) > div',
      ],
    })
    .scroll('DOWN');

  await page.waitForTimeout(2000);

  // Try to find and click "Launch in browser" button first, fallback to "Launch Immerse" button
  await page
    .find("[data-testid='paragraph-level-2']", {
      failover: [
        ".//p[contains(normalize-space(.), 'Launch in browser')]",
        ".//p[normalize-space(.)='Launch in browser']",
        ".//div[contains(normalize-space(.), 'Launch Immerse')]",
        ".//button[contains(normalize-space(.), 'Launch Immerse')]",
        'p.css-c57s2q',
        'div.css-dy29xn',
      ],
    })
    .click();

  await page.waitForTimeout(2000);

  // Verify that clicking the button triggers the browser compatibility check
  // This proves the Nvidia integration is working
  await page.run('assert', {
    assertionToTestFor: 'A browser compatibility message or modal appears with text about the web browser not being supported',
  });
});
