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

const title = 'sort-columns-by-tos-on-learners-tab';
const details = {
  annotation: [
    {
      type: 'objective',
      description: `Sort columns by TOS on Learners tab

Click on Learners Tab
Change Timeframe to "All Time"
Wait for Learners to load
Change "Per Page" to 50
Wait for Learners to load
Once loaded, click on TOS once
Assert text and verify that the TOS column is sorted in descending order -- 1st Learner's TOS column is higher than the 2nd and so forth to bottom of list or hit 0 or "N/A"`,
    },
  ],
};
test(title, details, async ({ page }) => {
  // Initializing web navigation.
  await page.goto('https://staging-dashboard.immerse.online/dashboard');
  // Clicking on the Learners tab to navigate to the learners section as required by the objective.
  await page.clickElement({
    selector: {
      element: [
        '#__next > div > div > div:nth-of-type(1) > div > div:nth-of-type(1) > button:nth-of-type(2)',
        ".//button[normalize-space(.)='Learners']",
        'div.mantine-xg7kom > button:nth-of-type(2)',
        'div.mantine-yx7xue > div:nth-of-type(1) > button:nth-of-type(2)',
        'div.mantine-2pm4e4 > div > div:nth-of-type(1) > button:nth-of-type(2)',
        'div.mantine-le2skq > div:nth-of-type(1) > div > div:nth-of-type(1) > button:nth-of-type(2)',
        'div.c-ejwOqd > div > div:nth-of-type(1) > div > div:nth-of-type(1) > button:nth-of-type(2)',
        'body > div:nth-of-type(1) > div > div > div:nth-of-type(1) > div > div:nth-of-type(1) > button:nth-of-type(2)',
        "[data-button='true']",
        'button.mantine-UnstyledButton-root',
      ],
      frame: null,
    },
  });
  // Changing the timeframe to "All Time" as required by the objective to see all learners data.
  await page.clickElement({
    selector: {
      element: [
        '#mantine-rg',
        "div:nth-of-type(2) > div > div > [data-mantine-stop-propagation='false']",
        'div:nth-of-type(2) > div > div > input.mantine-Input-input',
        'div.mantine-1rlbqtv > div:nth-of-type(2) > div > div > input',
        'div.mantine-1hv2vg > div:nth-of-type(2) > div:nth-of-type(2) > div > div > input',
        'div.mantine-1ywgif7 > div > div:nth-of-type(2) > div:nth-of-type(2) > div > div > input',
        'div.mantine-le2skq > div:nth-of-type(2) > div > div:nth-of-type(2) > div:nth-of-type(2) > div > div > input',
        'body > div:nth-of-type(1) > div > div > div:nth-of-type(2) > div > div:nth-of-type(2) > div:nth-of-type(2) > div > div > input',
        "[data-mantine-stop-propagation='false']",
        'input.mantine-Input-input',
      ],
      frame: null,
    },
  });
  // Selecting "All Time" from the timeframe dropdown to show all learners data as required by the objective.
  await page.clickElement({
    selector: {
      element: [
        '#mantine-rg-5',
        '#mantine-rg-items > div:nth-of-type(1) > div > div > div:nth-of-type(6)',
        ".//div[normalize-space(.)='All Time']",
        'div.mantine-1325v3c > div:nth-of-type(6)',
        'div.mantine-xlwgkm > div > div > div:nth-of-type(6)',
        'div.mantine-Select-dropdown > div > div > div:nth-of-type(1) > div > div > div:nth-of-type(6)',
        'body > div:nth-of-type(1) > div > div > div:nth-of-type(2) > div > div:nth-of-type(2) > div:nth-of-type(2) > div:nth-of-type(2) > div > div > div:nth-of-type(1) > div > div > div:nth-of-type(6)',
        "[role='option']",
        'div.mantine-12zgr9',
      ],
      frame: null,
    },
  });
  // Waiting for the learners data to load after changing the timeframe to "All Time" as required by the objective.
  await page.waitForTimeout(3000);
  // Scrolling down the page to reveal the "Per page" dropdown, which was not visible in the previous viewport.
  await page.scroll({
    direction: 'DOWN',
    selector: {
      element: [],
      frame: null,
    },
  });
  // Clicking on the "Per page" dropdown to change it from 10 to 50 as required by the objective.
  await page.clickElement({
    selector: {
      element: [
        '#mantine-rl-target',
        '#__next > div > div > div:nth-of-type(2) > div > div:nth-of-type(4) > div:nth-of-type(1) > button',
        ".//button[normalize-space(.)='10']",
        "div:nth-of-type(4) > div:nth-of-type(1) > [data-button='true']",
        'div:nth-of-type(4) > div:nth-of-type(1) > button.mantine-UnstyledButton-root',
        'div.mantine-11argd8 > div:nth-of-type(1) > button',
        'div.mantine-1hv2vg > div:nth-of-type(4) > div:nth-of-type(1) > button',
        'div.mantine-1ywgif7 > div > div:nth-of-type(4) > div:nth-of-type(1) > button',
        'div.mantine-le2skq > div:nth-of-type(2) > div > div:nth-of-type(4) > div:nth-of-type(1) > button',
        'div.c-ejwOqd > div > div:nth-of-type(2) > div > div:nth-of-type(4) > div:nth-of-type(1) > button',
        'body > div:nth-of-type(1) > div > div > div:nth-of-type(2) > div > div:nth-of-type(4) > div:nth-of-type(1) > button',
        "[data-button='true']",
        'button.mantine-UnstyledButton-root',
      ],
      frame: null,
    },
  });
  // Selecting "50" from the "Per page" dropdown to show 50 learners per page as required by the objective.
  await page.clickElement({
    selector: {
      element: [
        '#mantine-rl-dropdown > div > button:nth-of-type(3)',
        ".//button[normalize-space(.)='50']",
        'div.mantine-11argd8 > div:nth-of-type(1) > div > div > button:nth-of-type(3)',
        'div.mantine-1hv2vg > div:nth-of-type(4) > div:nth-of-type(1) > div > div > button:nth-of-type(3)',
        'div.mantine-1ywgif7 > div > div:nth-of-type(4) > div:nth-of-type(1) > div > div > button:nth-of-type(3)',
        'div.mantine-le2skq > div:nth-of-type(2) > div > div:nth-of-type(4) > div:nth-of-type(1) > div > div > button:nth-of-type(3)',
        'body > div:nth-of-type(1) > div > div > div:nth-of-type(2) > div > div:nth-of-type(4) > div:nth-of-type(1) > div > div > button:nth-of-type(3)',
        "[role='menuitem']",
        "[data-menu-item='true']",
        'button.mantine-Menu-item',
      ],
      frame: null,
    },
  });
  // Waiting for the learners data to load after changing the per page setting to 50 as required by the objective.
  await page.waitForTimeout(3000);
  // Clicking on the TOS (HH:MM) column header to sort the learners by TOS as required by the objective.
  await page.clickElement({
    selector: {
      element: [
        'tr.mantine-t52jw9 > th:nth-of-type(8)',
        'table.mantine-k1avq1 > thead > tr > th:nth-of-type(8)',
        'div.mantine-ilrge8 > table > thead > tr > th:nth-of-type(8)',
        'div.mantine-1hv2vg > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(8)',
        'div.mantine-1ywgif7 > div > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(8)',
        'div.mantine-le2skq > div:nth-of-type(2) > div > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(8)',
        'body > div:nth-of-type(1) > div > div > div:nth-of-type(2) > div > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(8)',
        'th.mantine-1lmsj13',
      ],
      frame: null,
    },
  });
  // Waiting for the data to load after clicking on the TOS column header to allow the sorting to complete.
  await page.waitForTimeout(3000);
  // Verifying that the TOS column is sorted in descending order as required by the objective, checking that the first learner's TOS value is higher than subsequent learners.
  await page.visuallyAssert({
    assertionToTestFor:
      'Assert that the TOS column is sorted in descending order with the first learner having a TOS value of 62:00, the second learner having 57:31, and subsequent learners having progressively lower or equal TOS values.',
  });
});
