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
  await page.getByRole("button", { name: "Learners" }).waitFor({ state: "visible" , timeout: 10000 });
  await page
    .find("[data-testid='layout-header-learners-button']", {
      failover: [
        ".//button[normalize-space(.)='Learners']",
        'div.mantine-xg7kom > button:nth-of-type(2)',
      ],
    })
    .click();
  // Clicking on the 'Edit Columns/Filters' button to open the column and filter settings.
  await page
    .find(".//button[normalize-space(.)='Edit Columns/Filters']", {
      failover: [
        'div.mantine-1rlbqtv > div:nth-of-type(1) > button:nth-of-type(3)',
        'div.mantine-1hv2vg > div:nth-of-type(2) > div:nth-of-type(1) > button:nth-of-type(3)',
      ],
    })
    .click();
  // Unchecking the 'Email' checkbox to hide the email column from the table.
  await page
    .find('#mantine-r2t', {
      failover: [
        'div:nth-of-type(2) > div > div > div:nth-of-type(1) > input.mantine-1137jyz',
        'div.mantine-nmgv2p > div:nth-of-type(2) > div > div > div:nth-of-type(1) > input',
      ],
    })
    .click();
  // Scrolling down the modal to reveal the 'Save' button.
  await page
    .find('#mantine-ri > div:nth-of-type(2)', {
      failover: ["[role='presentation']", 'div.mantine-144aj37'],
    })
    .scroll('DOWN');
  // Clicking the 'Save' button to apply the changes made to the column visibility, ensuring the unselected 'Location' column is no longer displayed in the main data table, as required by the overall objective.
  await page
    .find("[data-testid='learners-button-save']", {
      failover: [
        ".//button[normalize-space(.)='Save']",
        'div.mantine-gwpqz3 > button:nth-of-type(3)',
      ],
    })
    .click();
  // Verifying that the email column header is no longer visible on the table after unchecking the email checkbox and saving the changes, aligning with the overall objective's intent.
  await page.visuallyAssert({
    assertionToTestFor:
      'Assert that the table headers do not contain the text "Email".',
  });
});
