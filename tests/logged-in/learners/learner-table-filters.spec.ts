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

const title = 'learner-table-filters';
const details = {
  annotation: [
    {
      type: 'objective',
      description: `Go to learners tab. Edit Column/Filters. Uncheck emails. Scroll down on the modal and Save. Verify that the email column is no longer visible on the table.`,
    },
  ],
};
test(title, details, async ({ page }) => {
  // Initializing web navigation.
  await page.goto('https://staging-dashboard.immerse.online/dashboard');
  // Clicking on the 'Learners' tab to navigate to the learners page.
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
  // Clicking on the 'Edit Columns/Filters' button to open the column and filter settings.
  await page.clickElement({
    selector: {
      element: [
        '#__next > div > div > div:nth-of-type(2) > div > div:nth-of-type(2) > div:nth-of-type(1) > button:nth-of-type(3)',
        ".//button[normalize-space(.)='Edit Columns/Filters']",
        'div.mantine-1rlbqtv > div:nth-of-type(1) > button:nth-of-type(3)',
        'div.mantine-1hv2vg > div:nth-of-type(2) > div:nth-of-type(1) > button:nth-of-type(3)',
        'div.mantine-1ywgif7 > div > div:nth-of-type(2) > div:nth-of-type(1) > button:nth-of-type(3)',
        'div.mantine-le2skq > div:nth-of-type(2) > div > div:nth-of-type(2) > div:nth-of-type(1) > button:nth-of-type(3)',
        'div.c-ejwOqd > div > div:nth-of-type(2) > div > div:nth-of-type(2) > div:nth-of-type(1) > button:nth-of-type(3)',
        'body > div:nth-of-type(1) > div > div > div:nth-of-type(2) > div > div:nth-of-type(2) > div:nth-of-type(1) > button:nth-of-type(3)',
        "[data-button='true']",
        'button.mantine-UnstyledButton-root',
      ],
      frame: null,
    },
  });
  // Unchecking the 'Email' checkbox to hide the email column from the table.
  await page.clickElement({
    selector: {
      element: [
        '#mantine-r2t',
        '#mantine-ri-body > div:nth-of-type(1) > div:nth-of-type(2) > div > div > div:nth-of-type(1) > input',
        'div:nth-of-type(2) > div > div > div:nth-of-type(1) > input.mantine-1137jyz',
        'div.mantine-nmgv2p > div:nth-of-type(2) > div > div > div:nth-of-type(1) > input',
        "[role='dialog'] > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(2) > div > div > div:nth-of-type(1) > input",
        'body > div:nth-of-type(6) > div > div > div:nth-of-type(2) > div > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(2) > div > div > div:nth-of-type(1) > input',
        'input.mantine-1137jyz',
      ],
      frame: null,
    },
  });
  // Scrolling down the modal to reveal the 'Save' button.
  await page.scroll({
    direction: 'DOWN',
    selector: {
      element: [
        '#mantine-ri > div:nth-of-type(2)',
        "[role='presentation']",
        'div.mantine-144aj37',
        'body > div:nth-of-type(6) > div > div > div:nth-of-type(2)',
      ],
      frame: null,
    },
  });
  // Scrolling down the modal to reveal the 'Save' button.
  await page.scroll({
    direction: 'DOWN',
    selector: {
      element: [
        '#mantine-ri > div:nth-of-type(2)',
        "[role='presentation']",
        'div.mantine-144aj37',
        'body > div:nth-of-type(6) > div > div > div:nth-of-type(2)',
      ],
      frame: null,
    },
  });
  // Clicking the 'Save' button to apply the changes to the column visibility.
  await page.clickElement({
    selector: {
      element: [
        '#mantine-ri-body > div:nth-of-type(2) > button:nth-of-type(3)',
        '#mantine-ri > div:nth-of-type(2) > div > div:nth-of-type(2) > div:nth-of-type(2) > button:nth-of-type(3)',
        ".//button[normalize-space(.)='Save']",
        'div.mantine-gwpqz3 > button:nth-of-type(3)',
        "[role='dialog'] > div:nth-of-type(2) > div:nth-of-type(2) > button:nth-of-type(3)",
        "[role='presentation'] > div > div:nth-of-type(2) > div:nth-of-type(2) > button:nth-of-type(3)",
        'body > div:nth-of-type(6) > div > div > div:nth-of-type(2) > div > div:nth-of-type(2) > div:nth-of-type(2) > button:nth-of-type(3)',
        "[data-button='true']",
        'button.mantine-UnstyledButton-root',
      ],
      frame: null,
    },
  });
  // Verifying that the email column header is no longer visible on the table after unchecking the email checkbox and saving the changes, aligning with the overall objective's intent.
  await page.visuallyAssert({
    assertionToTestFor:
      'Assert that the table headers do not contain the text "Email".',
  });
});
