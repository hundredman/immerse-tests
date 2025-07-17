import { test, expect } from 'donobu';

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
        "[aria-label='Display\\ Language']",
        'html > body > div:nth-of-type(1) > div:nth-of-type(1) > div > div > div:nth-of-type(1) > div:nth-of-type(2)',
        '#mantine-r2-target',
        "//div[normalize-space(.)='ENGLISH']",
        'div > div:nth-of-type(2)',
        'div > :nth-child(2)',
        'div',
      ],
      frame: null,
    },
  });
  // Changing the display language to Japanese.
  await page.clickElement({
    selector: {
      element: [
        "//button[normalize-space(.)='Japanese']",
        'div > button:nth-of-type(2)',
        'html > body > div:nth-of-type(1) > div:nth-of-type(1) > div > div > div:nth-of-type(1) > div:nth-of-type(3) > div > button:nth-of-type(2)',
        "[data-menu-item='true']",
        "button[data-menu-item='true']",
        'div > :nth-child(2)',
        'button',
      ],
      frame: null,
    },
  });
  // Asserting that the page content is now in Japanese.
  await expect(page.getByText('ログイン')).toBeVisible();
});
