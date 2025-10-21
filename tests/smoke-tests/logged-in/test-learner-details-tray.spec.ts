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
  await page.visuallyAssert({
    assertionToTestFor:
      "Assert that the text 'Overview' is visible on the page.",
  });
  // Navigating to the Learner tab by clicking on the 'Learners' button.
  await page
    .find(
      '#__next > div > div > div:nth-of-type(1) > div > div:nth-of-type(1) > button:nth-of-type(2)',
      {
        failover: [
          "[data-testid='layout-header-learners-button']",
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
  await page.visuallyAssert({
    assertionToTestFor:
      "Assert that the text 'Learners' and 'TOS' are visible on the page.",
    retries: 10,
    retryWaitSeconds: 5,
  });
  // Verifying that the Learner table is rendered properly with aligned columns and consistent formatting, and that all key sections (Filters, Search, Columns, etc.) are visible and not overlapping, and that there are no broken icons, empty states, or undefined labels, and that the layout appears clean and demo-ready.
  await page.visuallyAssert({
    assertionToTestFor:
      "Assert that the Learner table headers 'Name', 'Email', 'Location', 'Last Login (PDT)', 'Start', 'Current', 'TOS (HH:MM)', 'Self-Paced Lessons', 'Trainer-led Classes', 'AVG Rating', 'Manager', and 'Status' are visible and aligned, and that the 'Search name, email, etc...', 'Search', 'Edit Columns/Filters', and 'Last 30 days' elements are visible and not overlapping. Also assert that there are no broken icons, empty states, or undefined labels.",
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
  // Clicking on the first row learner name to open the Learner Detail Tray.
  await page
    .find("[data-testid='learners-table-row-223518']", {
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
  await page.visuallyAssert({
    assertionToTestFor:
      'Assert that the close button (annotation 0) is visible on the page.',
    retries: 10,
    retryWaitSeconds: 3,
  });
  // Waiting for the Learner Detail Tray to load and display the learner's full name and contract or role details in the header.
  await page.visuallyAssert({
    assertionToTestFor:
      "Assert that the text 'Sample StarterLowerEd-Learner-9' is visible on the page.",
    retries: 10,
    retryWaitSeconds: 5,
  });
  // Waiting for the Learner Detail Tray to fully load and display content by asserting for the presence of the 'Lifetime Total (HH:MM)' label.
  await page.visuallyAssert({
    assertionToTestFor:
      "Assert that the text 'Lifetime Total (HH:MM)' is visible on the page.",
    retries: 10,
    retryWaitSeconds: 5,
  });
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
  await page.analyzePageText({
    analysisToRun:
      "Extract the values for 'Lifetime Total (HH:MM)', 'Asynchronous Activities', 'Social Events', 'Trainer-led Classes', 'Other', and 'Total' from the 'Time on Site' section. Also, identify any fields displaying 'N/A', 'null', or 'undefined' and note their context. Confirm that all time values are in HH:MM format.",
    additionalRelevantContext:
      "The objective requires verifying that all expected fields are populated, no unnecessary 'N/A' values are present, data formatting is consistent (HH:MM for time), and the sum of individual activities equals the 'Total'.",
  });
  // Verifying that the sum of 'Asynchronous Activities', 'Social Events', 'Trainer-led Classes', and 'Other' equals the 'Total' displayed on the tray.
  await page.visuallyAssert({
    assertionToTestFor:
      "Assert that the sum of 'Asynchronous Activities' (01:41), 'Social Events' (00:00), 'Trainer-led Classes' (00:00), and 'Other' (00:20) equals 'Total' (02:01) within a 1-minute tolerance.",
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
  await page.analyzePageText({
    analysisToRun:
      'Extract the TOS (HH:MM) values for the first few rows of the table and determine if they are in descending order. Also, confirm that the TOS column header has a descending sort indicator if visible in the text.',
    additionalRelevantContext:
      'The TOS (HH:MM) column header was clicked to sort the table in descending order. The table should now display the highest TOS values at the top.',
  });
  // Waiting for the table to render with updated values after sorting by TOS, by asserting that the '0 results' message is NOT visible, which would indicate that data has loaded into the table.
  await page.visuallyAssert({
    assertionToTestFor:
      "Assert that the text '0 results' is NOT visible on the page.",
    retries: 10,
    retryWaitSeconds: 5,
  });
  // Verifying that the learner table data is now displayed with sort order TOS Descending by analyzing the page text for the order of TOS values.
  await page.analyzePageText({
    analysisToRun:
      'Extract the TOS (HH:MM) values for the first few visible rows of the table and determine if they are in descending order. Also, confirm if there is any visual indicator for descending sort on the TOS column header.',
    additionalRelevantContext:
      'The table was previously sorted by TOS in ascending order, and then the TOS column header was clicked again to sort in descending order. The table should now display the highest TOS values at the top.',
  });
  // Clicking on the first row learner name to open the Learner Detail Tray (side panel).
  await page
    .find("[data-testid='learners-table-row-189543']", {
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
  await page.visuallyAssert({
    assertionToTestFor:
      'Assert that the close button (annotation 0) is visible on the page.',
    retries: 10,
    retryWaitSeconds: 3,
  });
  // Waiting for the Learner Detail Tray to fully load and display content by asserting for the presence of the 'Lifetime Total (HH:MM)' label.
  await page.visuallyAssert({
    assertionToTestFor:
      "Assert that the text 'Lifetime Total (HH:MM)' is visible on the page.",
    retries: 10,
    retryWaitSeconds: 5,
  });
  // Extracting the time on site activity details from the Learner Detail Tray to verify data population, formatting, and sum calculation.
  await page.analyzePageText({
    analysisToRun:
      "Extract the values for 'Asynchronous Activities', 'Social Events', 'Trainer-led Classes', 'Other', and the 'Total' from the 'Last 30 days (HH:MM)' section. Also, confirm that all time values are in HH:MM format. Then, verify that the sum of 'Asynchronous Activities', 'Social Events', 'Trainer-led Classes', and 'Other' equals the 'Total' displayed on the tray. Additionally, check for any fields displaying 'N/A', 'null', or 'undefined' and note their context, and confirm that all expected fields are populated (e.g., Name, Email, Manager, Contract, Location, Total Time on System, Last Active Date).",
    additionalRelevantContext:
      "The objective requires verifying that all expected fields are populated, no unnecessary 'N/A' values are present, data formatting is consistent (HH:MM for time), and the sum of individual activities equals the 'Total'.",
  });
  // Closing the Learner Detail Tray by pressing the 'Escape' key.
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
  // Clicking on the TOS column header to sort the table in descending order of TOS value.
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
  // Waiting for the table to render with updated values after sorting by TOS, by asserting that learner table is visible, indicating that data has loaded into the table.
  await page.visuallyAssert({
    assertionToTestFor:
      "Assert that the learner table is visible on the page.",
    retries: 10,
    retryWaitSeconds: 5,
  });
  // Clicking on the TOS column header to sort the table in descending order of TOS value.
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
  // Verifying that the learner table data is now displayed with sort order TOS Descending by analyzing the page text for the order of TOS values.
  await page.analyzePageText({
    analysisToRun:
      'Extract the TOS (HH:MM) values for the first few visible rows of the table and determine if they are in descending order. Also, confirm if there is any visual indicator for descending sort on the TOS column header.',
    additionalRelevantContext:
      'The TOS (HH:MM) column header was clicked to sort the table in descending order. The table should now display the highest TOS values at the top.',
  });
  // Clicking on the TOS column header to sort the table in descending order of TOS value.
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
  // Clicking on the TOS column header to sort the table in descending order of TOS value.
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
  // Verifying that the learner table data is now displayed with sort order TOS Descending by analyzing the page text for the order of TOS values.
  await page.analyzePageText({
    analysisToRun:
      'Extract the TOS (HH:MM) values for the first few visible rows of the table and determine if they are in descending order. Also, confirm if there is any visual indicator for descending sort on the TOS column header if visible in the text.',
    additionalRelevantContext:
      'The TOS (HH:MM) column header was clicked to sort the table in descending order. The table should now display the highest TOS values at the top.',
  });
  // Clicking on the TOS column header to sort the table in descending order of TOS value. This is the third click, which should ensure descending order.
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
  // Verifying that the learner table data is now displayed with sort order TOS Descending by analyzing the page text for the order of TOS values.
  await page.analyzePageText({
    analysisToRun:
      'Extract the TOS (HH:MM) values for the first few visible rows of the table and determine if they are in descending order. Also, confirm if there is any visual indicator for descending sort on the TOS column header if visible in the text.',
    additionalRelevantContext:
      'The TOS (HH:MM) column header was clicked to sort the table in descending order. The table should now display the highest TOS values at the top.',
  });
  // Clicking on the first row learner name to open the Learner Detail Tray (side panel).
  await page
    .find("[data-testid='learners-table-row-223518']", {
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
  // Scrolling down the Learner Detail Tray to check all expected fields and labels, and to find the 'Total' for 'Last 30 days (HH:MM)'.
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
  // Extracting the time on site activity details from the Learner Detail Tray to verify data population, formatting, and sum calculation, including checking for 'N/A', 'null', or 'undefined' values and confirming all expected fields are populated.
  await page.analyzePageText({
    analysisToRun:
      "Extract the values for 'Asynchronous Activities', 'Social Events', 'Trainer-led Classes', 'Other', and the 'Total' from the 'Last 30 days (HH:MM)' section. Also, confirm that all time values are in HH:MM format. Then, verify that the sum of 'Asynchronous Activities', 'Social Events', 'Trainer-led Classes', and 'Other' equals the 'Total' displayed on the tray. Additionally, check for any fields displaying 'N/A', 'null', or 'undefined' and note their context, and confirm that all expected fields are populated (e.g., Name, Email, Manager, Contract, Location, Total Time on System, Last Active Date). Also, extract the 'Lifetime Total (HH:MM)' value and the 'Last Active' date and time for the learner. Confirm that the tray header shows the learner’s full name and contract or role details. Confirm that no field displays null, undefined, or placeholder text like “N/A” unnecessarily. Verify the data formatting is consistent (e.g., proper date/time format, comma separators in numbers). Verify that following labels are visible: Lifetime Total (HH:MM), Asynchronous Activities, Social Events, Trainer-led Classes, Other, Total. Verify that each activity (Asynchronous, Social, Trainer-led, Other) displays time in the HH:MM format. Verify that sum of “Asynchronous Activities”, “Social Events”, “Trainer-led Classes”, “Other” equal the “Total” displayed on the tray.",
    additionalRelevantContext:
      "The current learner is 'Sample StarterLowerEd-Learner-9'. The objective requires a comprehensive check of the Learner Detail Tray data.",
  });
  // Closing the Learner Detail Tray by pressing the 'Escape' key to return to the main Learner table.
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
  // Clicking on the TOS column header to sort the table in descending order of TOS value.
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
  // Clicking on the TOS column header to sort the table in descending order of TOS value.
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
  // Verifying that the learner table data is now displayed with sort order TOS Descending by analyzing the page text for the order of TOS values.
  await page.analyzePageText({
    analysisToRun:
      'Extract the TOS (HH:MM) values for the first few visible rows of the table and determine if they are in descending order. Also, confirm if there is any visual indicator for descending sort on the TOS column header if visible in the text.',
    additionalRelevantContext:
      'The TOS (HH:MM) column header was clicked to sort the table in descending order. The table should now display the highest TOS values at the top.',
  });
  // Clicking on the first row learner name to open the Learner Detail Tray (side panel).
  await page
    .find("[data-testid='learners-table-row-223502']", {
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
  await page.visuallyAssert({
    assertionToTestFor:
      'Assert that the close button (annotation 0) is visible on the page.',
    retries: 10,
    retryWaitSeconds: 3,
  });
  // Scrolling down the Learner Detail Tray to ensure all expected fields and labels are visible for analysis.
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
  // Extracting the time on site activity details from the Learner Detail Tray to verify data population, formatting, and sum calculation, including checking for 'N/A', 'null', or 'undefined' values and confirming all expected fields are populated.
  await page.analyzePageText({
    analysisToRun:
      "Extract the values for 'Asynchronous Activities', 'Social Events', 'Trainer-led Classes', 'Other', and the 'Total' from the 'Last 30 days (HH:MM)' section. Also, confirm that all time values are in HH:MM format. Then, verify that the sum of 'Asynchronous Activities', 'Social Events', 'Trainer-led Classes', and 'Other' equals the 'Total' displayed on the tray. Additionally, check for any fields displaying 'N/A', 'null', or 'undefined' and note their context, and confirm that all expected fields are populated (e.g., Name, Email, Manager, Contract, Location, Total Time on System, Last Active Date). Also, extract the 'Lifetime Total (HH:MM)' value and the 'Last Active' date and time for the learner. Confirm that the tray header shows the learner’s full name and contract or role details. Confirm that no field displays null, undefined, or placeholder text like “N/A” unnecessarily. Verify the data formatting is consistent (e.g., proper date/time format, comma separators in numbers). Verify that following labels are visible: Lifetime Total (HH:MM), Asynchronous Activities, Social Events, Trainer-led Classes, Other, Total. Verify that each activity (Asynchronous, Social, Trainer-led, Other) displays time in the HH:MM format. Verify that sum of “Asynchronous Activities”, “Social Events”, “Trainer-led Classes”, “Other” equal the “Total” displayed on the tray.",
    additionalRelevantContext:
      "The current learner is 'Sample Private-Learner-8'. The objective requires a comprehensive check of the Learner Detail Tray data.",
  });
  // Closing the Learner Detail Tray by pressing the 'Escape' key to return to the main Learner table.
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
});
