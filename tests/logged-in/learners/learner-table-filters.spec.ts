/**
 * Note that this test uses tools that require the usage of an LLM, so be
 * sure to have an appropriate LLM API key available. This can be done
 * by providing an environment variable (e.g. OPENAI_API_KEY, ANTHROPIC_API_KEY,
 * or GOOGLE_GENERATIVE_AI_API_KEY) or by configuring a flow runner using
 * the Donobu app.
 */
import { test } from 'donobu';

const title = 'learner-table-filters';
const details = {
  annotation: {
    type: 'objective',
    description: `Go to learners tab. Edit Column/Filters. Uncheck emails. Scroll down on the modal and Save. Verify that the email column is no longer visible on the table.`,
  },
};
test(title, details, async ({ page }) => {
  // Initializing web navigation.
  await page.goto('https://staging-dashboard.immerse.online/dashboard');
  // Clicking on the 'Learners' tab to navigate to the learners page.
  await page.clickElement({
    selector: {
      element: [
        "//button[normalize-space(.)='Learners']",
        'div > button:nth-of-type(2)',
        'html > body > div:nth-of-type(1) > div > div > div:nth-of-type(1) > div > div:nth-of-type(1) > button:nth-of-type(2)',
        "[data-button='true']",
        "button[data-button='true']",
        'button',
        'div > :nth-child(3)',
      ],
      frame: null,
    },
  });
  // Clicking on the 'Edit Columns/Filters' button to open the column and filter settings.
  await page.clickElement({
    selector: {
      element: [
        "//button[normalize-space(.)='Edit Columns/Filters']",
        'html > body > div:nth-of-type(1) > div > div > div:nth-of-type(2) > div > div:nth-of-type(2) > div:nth-of-type(1) > button:nth-of-type(3)',
        'div > button:nth-of-type(3)',
        'div > :nth-child(4)',
        "[data-button='true']",
        "button[data-button='true']",
        'button',
      ],
      frame: null,
    },
  });
  // Unchecking the 'Email' checkbox to hide the email column from the table.
  await page.clickElement({
    selector: {
      element: [
        '#mantine-r2t',
        'html > body > div:nth-of-type(6) > div > div > div:nth-of-type(2) > div > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(2) > div > div > div:nth-of-type(1) > input',
        'div > input:nth-of-type(1)',
        'input',
        'div > :nth-child(1)',
      ],
      frame: null,
    },
  });
  // Scrolling down the modal to reveal the 'Save' button.
  await page.scroll({
    direction: 'DOWN',
  });
  // Scrolling down the modal to reveal the 'Save' button.
  await page.scroll({
    direction: 'DOWN',
  });
  // Clicking the 'Save' button to apply the changes to the column visibility.
  await page.clickElement({
    selector: {
      element: [
        "//button[normalize-space(.)='Save']",
        'html > body > div:nth-of-type(6) > div > div > div:nth-of-type(2) > div > div:nth-of-type(2) > div:nth-of-type(2) > button:nth-of-type(3)',
        'div > button:nth-of-type(3)',
        'div > :nth-child(3)',
        "[data-button='true']",
        "button[data-button='true']",
        'button',
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
