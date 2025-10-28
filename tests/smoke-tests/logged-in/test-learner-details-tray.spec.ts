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
import { test, expect } from 'donobu';

const title = 'Test for https://staging-dashboard.immerse.online/dashboard';
const details = {
  annotation: [
    {
      type: 'objective',
      description: `
Assert that the URL contains the text "dashboard".
Wait until the dashboard header element (e.g., Dashboard, Learner Summary, or similar) is displayed.
Confirm that no error or access-denied message is shown.
Navigate to the Learner tab
Click on the Learner tab displayed after the Dashboard tab.
Wait until the Learner table is fully visible on the UI.
Check that the table or grid is rendered properly with aligned columns and consistent formatting.
Confirm that all key sections (Filters, Search, Columns, etc.) are visible and not overlapping.
Verify that there are no broken icons, empty states, or undefined labels.
Ensure the layout appears clean and demo-ready.
Click on TOS column header to sort the table with ascending order of TOS
Wait for table to render with updated value
Verify that leader table entires are sorted with ascending order of TOS value
Click on the first row learner name to open the Learner Detail Tray (side panel).
Verify Learner Detail Tray opens successfully
Confirm that the tray or side panel slides out smoothly.
Verify the tray header shows the learner’s full name and contract or role details.
Check that all expected fields are populated when applicable (e.g., Name, Email, Manager, Contract, Location, Total Time on System, Last Active Date, etc.).
Verify that no field displays null, undefined, or placeholder text like “N/A” unnecessarily.
Verify that data formatting is consistent (e.g., proper date/time format, comma separators in numbers).
Verify that following labels are visible: Lifetime Total (HH:MM), Asynchronous Activities, Social Events, Trainer-led Classes, Other, Total
Verify that each activity (Asynchronous, Social, Trainer-led, Other) displays time in the HH:MM format.
Verify that sum of “Asynchronous Activities”, “Social Events”, “Trainer-led Classes”, “Other” equal the “Total” displayed on the tray
Close the Learner Detail Tray and confirm the main Learner table remains intact.
Wait for table to render with values
Verify that table sort ( TOS Ascending) is persisted
Click on the TOS column header to sort the table again to make the sort TOS descending
Wait for table to render with updated value
Verify that the learner table data is now displayed with sort order TOS Descending
Click on the first row learner name to open the Learner Detail Tray (side panel).
Check that all expected fields are populated when applicable (e.g., Name, Email, Manager, Contract, Location, Total Time on System, Last Active Date, etc.).
Verify that no field displays null, undefined, or placeholder text like “N/A” unnecessarily.
Verify the data formatting is consistent (e.g., proper date/time format, comma separators in numbers).
Verify that following labels are visible: Lifetime Total (HH:MM), Asynchronous Activities, Social Events, Trainer-led Classes, Other, Total
Verify that each activity (Asynchronous, Social, Trainer-led, Other) displays time in the HH:MM format.
Verify that sum of “Asynchronous Activities”, “Social Events”, “Trainer-led Classes”, “Other” equal the “Total” displayed on the tray
`,
    },
  ],
};
test(title, details, async ({ page }) => {
  // Initializing web navigation.
  await page.goto('https://staging-dashboard.immerse.online/dashboard');

  // Asserting that the current URL contains 'dashboard' text to confirm successful login to the dashboard page.
  await expect(page).toHaveURL(/dashboard/);
  const learnerSummaryEle = await page.getByText('Learning Summary');
  await learnerSummaryEle.waitFor({ state: 'visible', timeout: 90000 });

  // Asserting that the 'Overview' header is displayed on the dashboard, indicating a successful login and dashboard load.
  await page.getByText('Overview').waitFor({ state: 'visible', timeout: 90000 });

  // Navigating to the Learner tab by clicking on the 'Learners' button.
  await page
    .find(
      "[data-testid='layout-header-learners-button']",
      {
        failover: [
          "#__next > div > div > div:nth-of-type(1) > div > div:nth-of-type(1) > button:nth-of-type(2)",
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
      },
    )
    .click();
  // Waiting until the Learner table is fully visible on the UI by asserting for the presence of key text elements like 'Learners' and 'TOS' (Time on System) which are expected to be part of the table header.
  await page.locator('[data-testid="learners-table"]').waitFor({ state: 'visible', timeout: 30000 });

  // Verifying that the Learner table is rendered properly with aligned columns and consistent formatting, and that all key sections (Filters, Search, Columns, etc.) are visible and not overlapping, and that there are no broken icons, empty states, or undefined labels, and that the layout appears clean and demo-ready.
  await page.locator('[data-testid="learners-table-no-results"]').waitFor({ state: 'hidden', timeout: 30000 });
  await page.visuallyAssert({
    assertionToTestFor:
      "Assert that the Learner table headers 'Name', 'Email', 'Location', 'Last Login (PDT)', 'Start', 'Current', 'TOS (HH:MM)', 'Self-Paced Lessons', 'Trainer-led Classes', 'AVG Rating', 'Manager', and 'Status' are visible and aligned, and that the 'Search name, email, etc...', 'Search', 'Edit Columns/Filters', and 'Last 30 days' elements are visible and not overlapping. Also assert that there are no broken icons, empty states, or undefined labels.",
      retries: 5,
      retryWaitSeconds: 5,
  });
  // Clicking on the TOS column header to sort the table in ascending order of TOS value.
  await page
    .find("[data-testid='learners-table-header-total_time_on_site']", {
      failover: [
        'tr.mantine-1c4j1su > th:nth-of-type(8)',
        'div.mantine-kwn0a8 > table > thead > tr > th:nth-of-type(8)',
        "[data-testid='learners-table'] > thead > tr > th:nth-of-type(8)",
        'div.mantine-1hv2vg > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(8)',
        'div.mantine-1ywgif7 > div > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(8)',
        'div.mantine-le2skq > div:nth-of-type(2) > div > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(8)',
        'body > div:nth-of-type(1) > div > div > div:nth-of-type(2) > div > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(8)',
        'th.mantine-1lmsj13',
      ],
    })
    .click();
  // Waiting for the learner table to render with updated values after sorting by TOS, by asserting for the presence of key text elements like 'Name' and 'TOS (HH:MM)' which are expected to be part of the table header.
  await page.visuallyAssert({
    assertionToTestFor:
      "Assert that the text 'Name' and 'TOS (HH:MM)' are visible on the page.",
    retries: 10,
    retryWaitSeconds: 5,
  });
  // Clicking on the TOS column header again to sort the table in ascending order of TOS value, as the previous click resulted in descending order.
  await page
    .find("[data-testid='learners-table-header-total_time_on_site']", {
      failover: [
        'tr.mantine-1c4j1su > th:nth-of-type(8)',
        'div.mantine-kwn0a8 > table > thead > tr > th:nth-of-type(8)',
        "[data-testid='learners-table'] > thead > tr > th:nth-of-type(8)",
        'div.mantine-1hv2vg > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(8)',
        'div.mantine-1ywgif7 > div > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(8)',
        'div.mantine-le2skq > div:nth-of-type(2) > div > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(8)',
        'body > div:nth-of-type(1) > div > div > div:nth-of-type(2) > div > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(8)',
        'th.mantine-1lmsj13',
      ],
    })
    .click();
  // Analyzing the page text to verify that the learner table entries are sorted with ascending order of TOS value.
  await page.analyzePageText({
    analysisToRun:
      'Extract the TOS (HH:MM) values for the first few rows of the table and determine if they are in ascending order. Also, confirm that the TOS column header has an ascending sort indicator.',
    additionalRelevantContext:
      'The TOS (HH:MM) column header was clicked to sort the table in ascending order. The table should now display the lowest TOS values at the top.',
  });
  // Store TOS Value of first row
  const firstRow = page.locator('[data-testid^="learners-table-row-"]').first();
  let rowTestId = await firstRow.getAttribute('data-testid');
  let rowId = rowTestId?.split('-').pop();

  // Store learner data from table for comparison
  let learnerTableData = {
    name: (await page.locator(`[data-testid="learners-table-cell-last_name-${rowId}"]`).textContent())?.trim() || '',
    email: (await page.locator(`[data-testid="learners-table-cell-email-${rowId}"]`).textContent())?.trim() || '',
    location: (await page.locator(`[data-testid="learners-table-cell-location-${rowId}"]`).textContent())?.trim() || '',
    tosValue: (await page.locator(`[data-testid="learners-table-cell-total_time_on_site-${rowId}"]`).textContent())?.trim() || '',
  }
  // Clicking on the first row learner name to open the Learner Detail Tray.
  await page
    .find("[data-testid^='learners-table-row-']", {
      failover: [
        'div.mantine-kwn0a8 > table > tbody > tr:nth-of-type(1)',
        "[data-testid='learners-table'] > tbody > tr:nth-of-type(1)",
        'div.mantine-1hv2vg > div:nth-of-type(3) > table > tbody > tr:nth-of-type(1)',
        'div.mantine-1ywgif7 > div > div:nth-of-type(3) > table > tbody > tr:nth-of-type(1)',
        'div.mantine-le2skq > div:nth-of-type(2) > div > div:nth-of-type(3) > table > tbody > tr:nth-of-type(1)',
        'div.c-ejwOqd > div > div:nth-of-type(2) > div > div:nth-of-type(3) > table > tbody > tr:nth-of-type(1)',
        'body > div:nth-of-type(1) > div > div > div:nth-of-type(2) > div > div:nth-of-type(3) > table > tbody > tr:nth-of-type(1)',
        'tr.mantine-m1telj',
      ],
    })
    .click();
  // Verifying that the Learner Detail Tray opens successfully by asserting for the presence of the close button, which indicates the tray is visible.
  await expect(page.locator('button.mantine-Drawer-closeButton')).toBeVisible();
  // Waiting for the Learner Detail Tray to load and display the learner's full name and contract or role details in the header.
  const drawerModal = page.locator('div.mantine-Drawer-drawer');
  await drawerModal.getByText(`${learnerTableData.name}`).waitFor({ state: 'visible', timeout: 30000 });
  await drawerModal.getByText(`${learnerTableData.email}`).waitFor({ state: 'visible', timeout: 30000 });
  await drawerModal.getByText(`${learnerTableData.tosValue}`).waitFor({ state: 'visible', timeout: 30000 });
  // Waiting for the Learner Detail Tray to fully load and display content by asserting for the presence of the 'Lifetime Total (HH:MM)' label.
  await page.getByText("Lifetime Total (HH:MM)").waitFor({ state: 'visible', timeout: 30000 });
  // Scrolling down the Learner Detail Tray to check all expected fields and labels.
  await page
    .find('div:nth-of-type(8) > div > div > div.mantine-Paper-root', {
      failover: [
        "[role='dialog'] > div:nth-of-type(1)",
        'html > body > div:nth-of-type(8) > div > div > div:nth-of-type(1)',
        'body > div:nth-of-type(8) > div > div > div:nth-of-type(1)',
        'div.mantine-Paper-root',
      ],
    })
    .scroll('DOWN');
  // Extracting the time on site activity details from the Learner Detail Tray to verify data population, formatting, and sum calculation.
  // Grab time values from the four activity rows
  let times = await page.locator('.mantine-fa4a8g div:nth-child(2) .mantine-Text-root.css-1orq7cy').allTextContents();

  // Extract the "Total" time displayed on the right side
  let totalTime = await page.locator('.mantine-fa4a8g .mantine-Text-root.css-1wchubi').first().textContent();
  await page.visuallyAssert({
    assertionToTestFor:
      `Assert that the sum of 'Asynchronous Activities' (${times[0]}), 'Social Events' (${times[1]}), 'Trainer-led Classes' (${times[2]}), and 'Other' (${times[3]}) equals 'Total' (${totalTime})`,
  });
  // Closing the Learner Detail Tray by pressing the 'Escape' key, as there is no explicit close button annotation available.
  await page
    .find('div:nth-of-type(8) > div > div > div.mantine-Paper-root', {
      failover: [
        "[role='dialog'] > div:nth-of-type(1)",
        'html > body > div:nth-of-type(8) > div > div > div:nth-of-type(1)',
        'body > div:nth-of-type(8) > div > div > div:nth-of-type(1)',
        'div.mantine-Paper-root',
      ],
    })
    .pressKey('Escape');
  // Verifying that the table sort (TOS Ascending) is persisted after closing the Learner Detail Tray by analyzing the page text for the order of TOS values.
  await page.analyzePageText({
    analysisToRun:
      'Extract the TOS (HH:MM) values for the first few rows of the table and determine if they are still in ascending order. Also, confirm that the TOS column header still has an ascending sort indicator if visible in the text.',
    additionalRelevantContext:
      'The table was previously sorted by TOS in ascending order.',
  });
  // Clicking on the TOS column header again to sort the table in descending order of TOS value.
  await page
    .find("[data-testid='learners-table-header-total_time_on_site']", {
      failover: [
        'tr.mantine-1c4j1su > th:nth-of-type(8)',
        'div.mantine-kwn0a8 > table > thead > tr > th:nth-of-type(8)',
        "[data-testid='learners-table'] > thead > tr > th:nth-of-type(8)",
        'div.mantine-1hv2vg > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(8)',
        'div.mantine-1ywgif7 > div > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(8)',
        'div.mantine-le2skq > div:nth-of-type(2) > div > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(8)',
        'body > div:nth-of-type(1) > div > div > div:nth-of-type(2) > div > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(8)',
        'th.mantine-1lmsj13',
      ],
    })
    .click();
  // Waiting for the table to render with updated values after sorting by TOS, and then verifying that the learner table data is now displayed with sort order TOS Descending by analyzing the page text for the order of TOS values.
  await page.locator('[data-testid="learners-table-no-results"]').waitFor({ state: 'hidden', timeout: 30000 });
  // Store learner data from table for comparison
  rowTestId = await firstRow.getAttribute('data-testid');
  rowId = rowTestId?.split('-').pop();
  learnerTableData = {
    name: (await page.locator(`[data-testid="learners-table-cell-last_name-${rowId}"]`).textContent())?.trim() || '',
    email: (await page.locator(`[data-testid="learners-table-cell-email-${rowId}"]`).textContent())?.trim() || '',
    location: (await page.locator(`[data-testid="learners-table-cell-location-${rowId}"]`).textContent())?.trim() || '',
    tosValue: (await page.locator(`[data-testid="learners-table-cell-total_time_on_site-${rowId}"]`).textContent())?.trim() || '',
  }


  // Clicking on the first row learner name to open the Learner Detail Tray (side panel).
  await page
    .find("[data-testid^='learners-table-row-']", {
      failover: [
        'div.mantine-kwn0a8 > table > tbody > tr:nth-of-type(1)',
        "[data-testid='learners-table'] > tbody > tr:nth-of-type(1)",
        'div.mantine-1hv2vg > div:nth-of-type(3) > table > tbody > tr:nth-of-type(1)',
        'div.mantine-1ywgif7 > div > div:nth-of-type(3) > table > tbody > tr:nth-of-type(1)',
        'div.mantine-le2skq > div:nth-of-type(2) > div > div:nth-of-type(3) > table > tbody > tr:nth-of-type(1)',
        'div.c-ejwOqd > div > div:nth-of-type(2) > div > div:nth-of-type(3) > table > tbody > tr:nth-of-type(1)',
        'body > div:nth-of-type(1) > div > div > div:nth-of-type(2) > div > div:nth-of-type(3) > table > tbody > tr:nth-of-type(1)',
        'tr.mantine-m1telj',
      ],
    })
    .click();
  // Verifying that the Learner Detail Tray opens successfully by asserting for the presence of the close button, which indicates the tray is visible and loaded.
  await expect(page.locator('button.mantine-Drawer-closeButton')).toBeVisible();
  // Waiting for the Learner Detail Tray to fully load and display content by asserting for the presence of the 'Lifetime Total (HH:MM)' label.
  await page.getByText("Lifetime Total (HH:MM)").waitFor({ state: 'visible', timeout: 30000 });

  times = await page.locator('.mantine-fa4a8g div:nth-child(2) .mantine-Text-root.css-1orq7cy').allTextContents();

  // Extract the "Total" time displayed on the right side
  totalTime = await page.locator('.mantine-fa4a8g .mantine-Text-root.css-1wchubi').first().textContent();
  await page.visuallyAssert({
    assertionToTestFor:
      `Assert that the sum of 'Asynchronous Activities' (${times[0]}), 'Social Events' (${times[1]}), 'Trainer-led Classes' (${times[2]}), and 'Other' (${times[3]}) equals 'Total' (${totalTime})`,
  });
  // Closing the Learner Detail Tray by pressing the 'Escape' key.
  await page.locator('button.mantine-Drawer-closeButton').click();
  // Asserting that the Learner Detail Tray is closed successfully by verifying the absence of the close button.
  await expect(page.locator('button.mantine-Drawer-closeButton')).toBeHidden();
});
