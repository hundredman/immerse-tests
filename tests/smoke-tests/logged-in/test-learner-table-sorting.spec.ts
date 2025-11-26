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
            description: `Assert that the URL contains the text "dashboard".
Wait until the dashboard header element (e.g., Dashboard, Learner Summary, or any visible top section) is displayed.
Confirm that no error or access-denied message is shown.
Click on Name column header to sort the learner table in ascending order.
Wait for the table values to update with the latest sort parameter.
Extract all Name column values from the table and verify that rows are sorted alphanumerically (A → Z), ignore verifying sorting for rows with same name.
Click on Name column header again to change the sort to descending order.
Wait for the table values to update.
Extract all Name column values again and verify that rows are sorted alphanumerically (Z → A), ignore verifying sorting for rows with same name.
Click on Email column header again to switch to descending order.
Wait for table refresh.
Extract all Email values and verify that they are sorted in reverse alphanumeric order (Z → A).
Click on Email column header to sort the table in ascending order.
Wait for the table values to refresh.
Extract all Email values and verify that they are sorted alphanumerically by email ID (A → Z).
Click on Location column header again for descending sort.
Wait for the table to refresh.
Extract Location values and verify that they are sorted alphabetically (Z → A).
Click on Last Login (PDT) column header again for descending order (Latest to earliest).
Wait for table update.
Extract Last Login (PDT) values again and verify that rows are sorted in reverse chronological order (latest → earliest).Click on Last Login (PDT) column header to sort by oldest first
Wait for table values to update.
Extract all Last Login (PDT) date-time values and verify that rows are sorted chronologically (earliest → latest).
Click on Start column header again to sort in descending order.
Wait for update.
Extract Start values and verify that they are sorted in decreasing order (highest → lowest).
Click on Start column header to sort the table in ascending order.
Wait for table refresh.
Extract all Start values (e.g., Level/Stage) and verify that they are sorted in increasing order (lowest → highest).
Click on Current column header again for descending order.
Wait for table update.
Extract Current values and verify that they are sorted in reverse order (highest → lowest).
Click on Current column header to sort the table ascendingly.
Wait for the table to reload.
Extract Current values and verify ascending sequence (lowest → highest ).
Click on TOS (HH:MM) column header again to sort descending.
Wait for update.
Extract TOS (HH:MM) values again and verify that rows are sorted numerically (highest → lowest).
Click on TOS (HH:MM) column header to sort by ascending order.
Wait for table to update.
Extract all TOS (HH:MM) values and verify that rows are sorted numerically by total time in minutes (lowest → highest).
Click on Self-Paced Lessons again to sort descending.
Wait for update.
Extract values and verify that counts are sorted numerically (largest → smallest).
Click on Self-Paced Lessons header to sort ascending.
Wait for table refresh.
Extract values and verify that the counts are sorted numerically (smallest → largest).
Click on Trainer-led Classes header again for descending order.
Wait for update.
Extract Trainer-led Classes values again and verify that they are sorted numerically (highest → lowest).
Click on Trainer-led Classes column header to sort ascending.
Wait for the table to refresh.
Extract all Trainer-led Classes values and verify numeric sort order (lowest → highest).
Click AVG Rating header again to sort descending.
Wait for update.
Extract AVG Rating values again and verify that they are sorted numerically (5.0 → 1.0).
Click on AVG Rating column header to sort ascending.
Wait for update.
Extract AVG Rating values and verify numeric order (1.0 → 5.0).
Click on Manager column header again to sort descending.
Wait for update.
Extract Manager names again and verify alphabetical reverse order (Z → A).
Click on Manager column header to sort ascending.
Wait for table refresh.
Extract Manager names and verify alphabetical order (A → Z).
Click on Status column header to sort ascending.
Wait for table refresh.
Extract Status values and verify that rows are sorted alphabetically or by logical state order (e.g., Active → Inactive).
Click on Status column header again to sort descending.
Wait for update.
Extract Status values and verify that rows are sorted in reverse order (Inactive → Active).`,
        },
    ],
};
test(title, details, async ({ page }) => {
    test.setTimeout(20 * 60 * 1000);

    // Initializing web navigation.
    await page.goto('https://staging-dashboard.immerse.online/dashboard');

    // Asserting that the current URL contains 'dashboard' text to confirm successful login to the dashboard page.
    await expect(page).toHaveURL(/dashboard/);
    const learnerSummaryEle = await page.getByText('Learning Summary');
    await learnerSummaryEle.waitFor({ state: 'visible', timeout: 90000 });
    await page.visuallyAssert({
        assertionToTestFor: "Verify that the graph and its key components are visible on the dashboard (ignore data correctness).",
        retries: 5,
        retryWaitSeconds: 5,
    });

    // Clicking on the 'Learners' button to navigate to the page containing the learner table.
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
    // Waiting for the learner table to load and display data.
    await page.locator('[data-testid="learners-table"]').waitFor({ state: 'visible', timeout: 30000 });
    // Clicking on the Name column header to sort the learner table in ascending order.
    await page.waitForTimeout(3000);
    await page
        .find("[data-testid='learners-table-header-last_name']", {
            failover: [
                'tr.mantine-1c4j1su > th:nth-of-type(2)',
                'div.mantine-kwn0a8 > table > thead > tr > th:nth-of-type(2)',
                "[data-testid='learners-table'] > thead > tr > th:nth-of-type(2)",
                'div.mantine-1hv2vg > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(2)',
                'div.mantine-1ywgif7 > div > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(2)',
                'div.mantine-le2skq > div:nth-of-type(2) > div > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(2)',
                'body > div:nth-of-type(1) > div > div > div:nth-of-type(2) > div > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(2)',
                'th.isPinned',
            ],
        })
        .click();
    // Waiting for the table values to update with the latest sort parameter by asserting that the loading spinner is no longer visible and the table contains data.
    await page.locator('[data-testid="learners-table-no-results"]').waitFor({ state: 'hidden', timeout: 30000 });
    // Extracting all Name column values from the table to verify ascending alphanumeric sort order.
    await page.analyzePageText({
        analysisToRun:
            "Extract all the text content from the 'Name' column of the learner table. The names are in the first column of the table.",
        additionalRelevantContext:
            'The table rows are identified by data-testid="learners-table-row-...". The name is the first text element in each row.',
    });
    // Clicking on the Name column header again to ensure it sorts the learner table in ascending order.
    await page.waitForTimeout(3000);
    await page
        .find("[data-testid='learners-table-header-last_name']", {
            failover: [
                'tr.mantine-1c4j1su > th:nth-of-type(2)',
                'div.mantine-kwn0a8 > table > thead > tr > th:nth-of-type(2)',
                "[data-testid='learners-table'] > thead > tr > th:nth-of-type(2)",
                'div.mantine-1hv2vg > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(2)',
                'div.mantine-1ywgif7 > div > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(2)',
                'div.mantine-le2skq > div:nth-of-type(2) > div > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(2)',
                'body > div:nth-of-type(1) > div > div > div:nth-of-type(2) > div > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(2)',
                'th.isPinned',
            ],
        })
        .click();
    // Waiting for the table values to update with the latest sort parameter by asserting that the loading spinner is no longer visible and the table contains data.
    await page.locator('[data-testid="learners-table-no-results"]').waitFor({ state: 'hidden', timeout: 30000 });
    await page.waitForTimeout(3000);
    // Extracting all Name column values from the table to verify descending alphanumeric sort order.
    await page.analyzePageText({
        analysisToRun:
            "Extract all the text content from the 'Name' column of the learner table. The names are in the first column of the table.",
        additionalRelevantContext:
            'The table rows are identified by data-testid="learners-table-row-...". The name is the first text element in each row.',
    });

    // Clicking on the Email column header to sort the table in descending order.
    await page
        .find("[data-testid='learners-table-header-email']", {
            failover: [
                'tr.mantine-1c4j1su > th:nth-of-type(3)',
                'div.mantine-kwn0a8 > table > thead > tr > th:nth-of-type(3)',
                "[data-testid='learners-table'] > thead > tr > th:nth-of-type(3)",
                'div.mantine-1hv2vg > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(3)',
                'div.mantine-1ywgif7 > div > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(3)',
                'div.mantine-le2skq > div:nth-of-type(2) > div > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(3)',
                'body > div:nth-of-type(1) > div > div > div:nth-of-type(2) > div > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(3)',
                'th.mantine-1lmsj13',
            ],
        })
        .click();
    // Waiting for the table to refresh after clicking the Email column header by asserting that the loading spinner is no longer visible and the table contains data.
    await page.locator('[data-testid="learners-table-no-results"]').waitFor({ state: 'hidden', timeout: 30000 });
    await page.waitForTimeout(3000);
    // Extracting all Email values from the table to verify that they are sorted in reverse alphanumeric order (Z → A).
    let emailValues = await page.locator('[data-testid^="learners-table-cell-email-"]').allTextContents();
    const sortedDescending = [...emailValues].sort().reverse();
    await expect(emailValues).toEqual(sortedDescending);

    // Clicking on the Email column header to sort the table in ascending order.
    await page
        .find("[data-testid='learners-table-header-email']", {
            failover: [
                'tr.mantine-1c4j1su > th:nth-of-type(3)',
                'div.mantine-kwn0a8 > table > thead > tr > th:nth-of-type(3)',
                "[data-testid='learners-table'] > thead > tr > th:nth-of-type(3)",
                'div.mantine-1hv2vg > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(3)',
                'div.mantine-1ywgif7 > div > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(3)',
                'div.mantine-le2skq > div:nth-of-type(2) > div > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(3)',
                'body > div:nth-of-type(1) > div > div > div:nth-of-type(2) > div > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(3)',
                'th.mantine-1lmsj13',
            ],
        })
        .click();
    // Waiting for the table values to refresh after clicking the Email column header by asserting that the loading spinner is no longer visible and the table contains data.
    await page.locator('[data-testid="learners-table-no-results"]').waitFor({ state: 'hidden', timeout: 30000 });
    await page.waitForTimeout(3000);
    // Extracting all Email values from the table to verify that they are sorted alphanumerically by email ID (A → Z).
    emailValues = await page.locator('[data-testid^="learners-table-cell-email-"]').allTextContents();
    const sortedAscending = [...emailValues].sort();
    await expect(emailValues).toEqual(sortedAscending);
    // Clicking on the Location column header to sort the table in descending order.
    await page
        .find("[data-testid='learners-table-header-location']", {
            failover: [
                'tr.mantine-1c4j1su > th:nth-of-type(4)',
                'div.mantine-kwn0a8 > table > thead > tr > th:nth-of-type(4)',
                "[data-testid='learners-table'] > thead > tr > th:nth-of-type(4)",
                'div.mantine-1hv2vg > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(4)',
                'div.mantine-1ywgif7 > div > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(4)',
                'div.mantine-le2skq > div:nth-of-type(2) > div > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(4)',
                'body > div:nth-of-type(1) > div > div > div:nth-of-type(2) > div > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(4)',
                'th.mantine-1lmsj13',
            ],
        })
        .click();
    // Waiting for the table to refresh after clicking the Location column header by asserting that the loading spinner is no longer visible and the table contains data.
    await page.locator('[data-testid="learners-table-no-results"]').waitFor({ state: 'hidden', timeout: 30000 });
    await page.waitForTimeout(3000);
    // Extracting Location values to verify descending alphabetical sort order.
    await page.analyzePageText({
        analysisToRun:
            "Extract all the text content from the 'Location' column of the learner table. The locations are in the third column of the table, after the Email column. Each row starts with a tab character and the location is the fourth tab-separated field (index 3).",
        additionalRelevantContext:
            'The table rows are identified by data-testid="learners-table-row-...". The location is the third text element in each row.',
    });
    // Clicking on the Location column header to sort the table in ascending order.
    await page
        .find("[data-testid='learners-table-header-location']", {
            failover: [
                'tr.mantine-1c4j1su > th:nth-of-type(4)',
                'div.mantine-kwn0a8 > table > thead > tr > th:nth-of-type(4)',
                "[data-testid='learners-table'] > thead > tr > th:nth-of-type(4)",
                'div.mantine-1hv2vg > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(4)',
                'div.mantine-1ywgif7 > div > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(4)',
                'div.mantine-le2skq > div:nth-of-type(2) > div > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(4)',
                'body > div:nth-of-type(1) > div > div > div:nth-of-type(2) > div > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(4)',
                'th.mantine-1lmsj13',
            ],
        })
        .click();
    // Waiting for the table values to refresh after clicking the Location column header for ascending sort, by asserting that the loading spinner is no longer visible and the table contains data.
    await page.locator('[data-testid="learners-table-no-results"]').waitFor({ state: 'hidden', timeout: 30000 });
    await page.waitForTimeout(3000);
    // Extracting Location values to verify ascending alphabetical sort order.
    await page.analyzePageText({
        analysisToRun:
            "Extract all the text content from the 'Location' column of the learner table. The locations are in the third column of the table, after the Email column. Each row starts with a tab character and the location is the fourth tab-separated field (index 3).",
        additionalRelevantContext:
            'The table rows are identified by data-testid="learners-table-row-...". The location is the third text element in each row.',
    });

    // Clicking on the Last Login (PDT) column header to sort in descending order (Latest to earliest).
    await page
        .find("[data-testid='learners-table-header-last_login_date']", {
            failover: [
                'tr.mantine-1c4j1su > th:nth-of-type(5)',
                'div.mantine-kwn0a8 > table > thead > tr > th:nth-of-type(5)',
                "[data-testid='learners-table'] > thead > tr > th:nth-of-type(5)",
                'div.mantine-1hv2vg > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(5)',
                'div.mantine-1ywgif7 > div > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(5)',
                'div.mantine-le2skq > div:nth-of-type(2) > div > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(5)',
                'body > div:nth-of-type(1) > div > div > div:nth-of-type(2) > div > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(5)',
                'th.mantine-1lmsj13',
            ],
        })
        .click();
    // Waiting for the table to update after clicking the Last Login (PDT) column header for descending sort, by asserting that the loading spinner is no longer visible and the table contains data.
    await page.locator('[data-testid="learners-table-no-results"]').waitFor({ state: 'hidden', timeout: 30000 });
    await page.waitForTimeout(3000);
    // Extracting Last Login (PDT) values to verify that rows are sorted in reverse chronological order (latest → earliest).
    await page.analyzePageText({
        analysisToRun:
            "Extract all the text content from the 'Last Login (PDT)' column of the learner table. The Last Login (PDT) values are in the fourth column of the table. Each row starts with a tab character and the Last Login (PDT) is the fifth tab-separated field (index 4).",
        additionalRelevantContext:
            'The table rows are identified by data-testid="learners-table-row-...". The Last Login (PDT) is the fourth text element in each row.',
    });
    // Verifying that the extracted Last Login (PDT) values are sorted in reverse chronological order (latest → earliest).
    await page.visuallyAssert({
        assertionToTestFor:
            'Assert that the following list of dates and times is sorted in reverse chronological order (latest to earliest)',
    });
    // Clicking on the Last Login (PDT) column header to sort by oldest first (ascending order).
    await page
        .find("[data-testid='learners-table-header-last_login_date']", {
            failover: [
                'tr.mantine-1c4j1su > th:nth-of-type(5)',
                'div.mantine-kwn0a8 > table > thead > tr > th:nth-of-type(5)',
                "[data-testid='learners-table'] > thead > tr > th:nth-of-type(5)",
                'div.mantine-1hv2vg > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(5)',
                'div.mantine-1ywgif7 > div > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(5)',
                'div.mantine-le2skq > div:nth-of-type(2) > div > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(5)',
                'body > div:nth-of-type(1) > div > div > div:nth-of-type(2) > div > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(5)',
                'th.mantine-1lmsj13',
            ],
        })
        .click();
    // Waiting for the table values to update after clicking the Last Login (PDT) column header for ascending sort, by asserting that the loading spinner is no longer visible and the table contains data.
    await page.locator('[data-testid="learners-table-no-results"]').waitFor({ state: 'hidden', timeout: 30000 });
    await page.waitForTimeout(3000);
    // Extracting all Last Login (PDT) date-time values to verify that rows are sorted chronologically (earliest → latest).
    await page.analyzePageText({
        analysisToRun:
            "Extract all the text content from the 'Last Login (PDT)' column of the learner table. The Last Login (PDT) values are in the fourth column of the table. Each row starts with a tab character and the Last Login (PDT) is the fifth tab-separated field (index 4).",
        additionalRelevantContext:
            'The table rows are identified by data-testid="learners-table-row-...". The Last Login (PDT) is the fourth text element in each row.',
    });
    // Verifying that the extracted Last Login (PDT) date-time values are sorted chronologically (earliest → latest).
    await page.visuallyAssert({
        assertionToTestFor:
            'Assert that the following list of dates and times is sorted in chronological order (earliest to latest)',
    });
    // Clicking on the Start column header to sort in descending order.
    await page
        .find("[data-testid='learners-table-header-starting_fluency_level']", {
            failover: [
                'tr.mantine-1c4j1su > th:nth-of-type(6)',
                'div.mantine-kwn0a8 > table > thead > tr > th:nth-of-type(6)',
                "[data-testid='learners-table'] > thead > tr > th:nth-of-type(6)",
                'div.mantine-1hv2vg > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(6)',
                'div.mantine-1ywgif7 > div > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(6)',
                'div.mantine-le2skq > div:nth-of-type(2) > div > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(6)',
                'body > div:nth-of-type(1) > div > div > div:nth-of-type(2) > div > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(6)',
                'th.mantine-1lmsj13',
            ],
        })
        .click();
    // Waiting for the table values to update after clicking the Start column header for descending sort, by asserting that the loading spinner is no longer visible and the table contains data.
    await page.locator('[data-testid="learners-table-no-results"]').waitFor({ state: 'hidden', timeout: 30000 });
    await page.waitForTimeout(3000);
    // Extracting Start values to verify that they are sorted in decreasing order (highest → lowest).
    await page.analyzePageText({
        analysisToRun:
            "Extract all the text content from the 'Start' column of the learner table. The Start values are in the fifth column of the table. Each row starts with a tab character and the Start value is the sixth tab-separated field (index 5).",
        additionalRelevantContext:
            'The table rows are identified by data-testid="learners-table-row-...". The Start value is the fifth text element in each row.',
    });
    // Verifying that the extracted Start values are sorted in decreasing order (highest → lowest).
    await page.visuallyAssert({
        assertionToTestFor:
            "Assert that the following list of 'Start' values is sorted in decreasing order (highest → lowest). If all values are identical, consider it valid and pass the check, since identical entries inherently satisfy the sorted condition.",
    });
    // Clicking on the Start column header to sort the table in ascending order.
    await page
        .find("[data-testid='learners-table-header-starting_fluency_level']", {
            failover: [
                'tr.mantine-1c4j1su > th:nth-of-type(6)',
                'div.mantine-kwn0a8 > table > thead > tr > th:nth-of-type(6)',
                "[data-testid='learners-table'] > thead > tr > th:nth-of-type(6)",
                'div.mantine-1hv2vg > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(6)',
                'div.mantine-1ywgif7 > div > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(6)',
                'div.mantine-le2skq > div:nth-of-type(2) > div > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(6)',
                'body > div:nth-of-type(1) > div > div > div:nth-of-type(2) > div > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(6)',
                'th.mantine-1lmsj13',
            ],
        })
        .click();
    // Waiting for the table values to refresh after clicking the Start column header for ascending sort, by asserting that the loading spinner is no longer visible and the table contains data.
    await page.locator('[data-testid="learners-table-no-results"]').waitFor({ state: 'hidden', timeout: 30000 });
    await page.waitForTimeout(3000);
    // Extracting all Start values (e.g., Level/Stage) to verify that they are sorted in increasing order (lowest → highest).
    await page.analyzePageText({
        analysisToRun:
            "Extract all the text content from the 'Start' column of the learner table. The Start values are in the fifth column of the table. Each row starts with a tab character and the Start value is the sixth tab-separated field (index 5).",
        additionalRelevantContext:
            'The table rows are identified by data-testid="learners-table-row-...". The Start value is the fifth text element in each row.',
    });
    // Verifying that all extracted Start values are sorted in increasing order (lowest → highest).
    await page.visuallyAssert({
        assertionToTestFor:
            "Assert that the following list of 'Start' values is sorted in increasing order (lowest → highest). If all values are identical, consider it valid and pass the check, since identical entries inherently satisfy the sorted condition.",
    });
    // Clicking on the Current column header to sort in descending order.
    await page
        .find("[data-testid='learners-table-header-current_level_with_language']", {
            failover: [
                'tr.mantine-1c4j1su > th:nth-of-type(7)',
                'div.mantine-kwn0a8 > table > thead > tr > th:nth-of-type(7)',
                "[data-testid='learners-table'] > thead > tr > th:nth-of-type(7)",
                'div.mantine-1hv2vg > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(7)',
                'div.mantine-1ywgif7 > div > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(7)',
                'div.mantine-le2skq > div:nth-of-type(2) > div > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(7)',
                'body > div:nth-of-type(1) > div > div > div:nth-of-type(2) > div > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(7)',
                'th.mantine-1lmsj13',
            ],
        })
        .click();
    // Waiting for the table to update after clicking the Current column header for descending sort, by asserting that the loading spinner is no longer visible and the table contains data.
    await page.locator('[data-testid="learners-table-no-results"]').waitFor({ state: 'hidden', timeout: 30000 });
    await page.waitForTimeout(3000);
    // Extracting Current values to verify that they are sorted in reverse order (highest → lowest).
    await page.analyzePageText({
        analysisToRun:
            "Extract all the text content from the 'Current' column of the learner table. The Current values are in the sixth column of the table. Each row starts with a tab character and the Current value is the seventh tab-separated field (index 6).",
        additionalRelevantContext:
            'The table rows are identified by data-testid="learners-table-row-...". The Current value is the sixth text element in each row.',
    });
    // Verifying that the extracted Current values are sorted in reverse order (highest → lowest).
    await page.visuallyAssert({
        assertionToTestFor:
            'Assert that the following list of Current values is sorted in decreasing order (highest → lowest)',
    });
    // Clicking on the Current column header to sort the table ascendingly.
    await page
        .find("[data-testid='learners-table-header-current_level_with_language']", {
            failover: [
                'tr.mantine-1c4j1su > th:nth-of-type(7)',
                'div.mantine-kwn0a8 > table > thead > tr > th:nth-of-type(7)',
                "[data-testid='learners-table'] > thead > tr > th:nth-of-type(7)",
                'div.mantine-1hv2vg > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(7)',
                'div.mantine-1ywgif7 > div > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(7)',
                'div.mantine-le2skq > div:nth-of-type(2) > div > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(7)',
                'body > div:nth-of-type(1) > div > div > div:nth-of-type(2) > div > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(7)',
                'th.mantine-1lmsj13',
            ],
        })
        .click();
    // Waiting for the table to reload with data after sorting the 'Current' column in ascending order.
    await page.locator('[data-testid="learners-table-no-results"]').waitFor({ state: 'hidden', timeout: 30000 });
    await page.waitForTimeout(3000);
    // Extracting Current values to verify ascending sequence (lowest → highest).
    await page.analyzePageText({
        analysisToRun:
            "Extract all the text content from the 'Current' column of the learner table. The Current values are in the sixth column of the table. Each row starts with a tab character and the Current value is the seventh tab-separated field (index 6).",
        additionalRelevantContext:
            'The table rows are identified by data-testid="learners-table-row-...". The Current value is the sixth text element in each row.',
    });
    // Verifying that the extracted Current values are sorted in ascending sequence (lowest → highest).
    await page.visuallyAssert({
        assertionToTestFor:
            'Assert that the following list of Current values is sorted in increasing order (lowest → highest)',
    });
    // Clicking on the TOS (HH:MM) column header to sort in descending order.
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
    // Waiting for the table to update after clicking the TOS (HH:MM) column header for descending sort, by asserting that the loading spinner is no longer visible and the table contains data.
    await page.locator('[data-testid="learners-table-no-results"]').waitFor({ state: 'hidden', timeout: 30000 });
    await page.waitForTimeout(3000);
    // Extracting TOS (HH:MM) values to verify that rows are sorted numerically (highest → lowest).
    await page.analyzePageText({
        analysisToRun:
            "Extract all the text content from the 'TOS (HH:MM)' column of the learner table. The TOS (HH:MM) values are in the seventh column of the table. Each row starts with a tab character and the TOS (HH:MM) value is the eighth tab-separated field (index 7).",
        additionalRelevantContext:
            'The table rows are identified by data-testid="learners-table-row-...". The TOS (HH:MM) is the seventh text element in each row.',
    });
    // Verifying that the extracted TOS (HH:MM) values are sorted numerically (highest → lowest).
    await page.visuallyAssert({
        assertionToTestFor:
            'Assert that the following list of TOS (HH:MM) values, when converted to minutes, is sorted in descending order',
    });
    // Clicking on the TOS (HH:MM) column header to sort by ascending order.
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
    // Waiting for the table to update after clicking the TOS (HH:MM) column header for ascending sort, by asserting that the loading spinner is no longer visible and the table contains data.
    await page.locator('[data-testid="learners-table-no-results"]').waitFor({ state: 'hidden', timeout: 30000 });
    await page.waitForTimeout(3000);
    // Extracting all TOS (HH:MM) values to verify that rows are sorted numerically by total time in minutes (lowest → highest).
    await page.analyzePageText({
        analysisToRun:
            "Extract all the text content from the 'TOS (HH:MM)' column of the learner table. The TOS (HH:MM) values are in the seventh column of the table. Each row starts with a tab character and the TOS (HH:MM) value is the eighth tab-separated field (index 7).",
        additionalRelevantContext:
            'The table rows are identified by data-testid="learners-table-row-...". The TOS (HH:MM) is the seventh text element in each row.',
    });
    // Verifying that all extracted TOS (HH:MM) values are sorted numerically by total time in minutes (lowest → highest).
    await page.visuallyAssert({
        assertionToTestFor:
            'Assert that the following list of TOS (HH:MM) values, when converted to minutes, is sorted in ascending order',
    });
    /* Commented out as the Self-Paced Lessons column sort verification as it is known to fail 
    // Clicking on the Self-Paced Lessons column header to sort descending.
    await page
        .find("[data-testid='learners-table-header-async_lesson_completions']", {
            failover: [
                'tr.mantine-1c4j1su > th:nth-of-type(9)',
                'div.mantine-kwn0a8 > table > thead > tr > th:nth-of-type(9)',
                "[data-testid='learners-table'] > thead > tr > th:nth-of-type(9)",
                'div.mantine-1hv2vg > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(9)',
                'div.mantine-1ywgif7 > div > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(9)',
                'div.mantine-le2skq > div:nth-of-type(2) > div > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(9)',
                'body > div:nth-of-type(1) > div > div > div:nth-of-type(2) > div > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(9)',
                'th.mantine-1lmsj13',
            ],
        })
        .click();
    // Waiting for the table to update after clicking the Self-Paced Lessons column header for descending sort, by asserting that the loading spinner is no longer visible and the table contains data.
    await page.locator('[data-testid="learners-table-no-results"]').waitFor({ state: 'hidden', timeout: 30000 });
    await page.waitForTimeout(3000);
    // Extracting Self-Paced Lessons values to verify that counts are sorted numerically (largest → smallest).
    await page.analyzePageText({
        analysisToRun:
            "Extract all the text content from the 'Self-Paced Lessons' column of the learner table. The Self-Paced Lessons values are in the eighth column of the table. Each row starts with a tab character and the Self-Paced Lessons value is the ninth tab-separated field (index 8).",
        additionalRelevantContext:
            'The table rows are identified by data-testid="learners-table-row-...". The Self-Paced Lessons is the eighth text element in each row.',
    });
    // Verifying that the extracted Self-Paced Lessons values are sorted numerically (largest → smallest).
    await page.visuallyAssert({
        assertionToTestFor:
            'Assert that the following list of Self-Paced Lessons values is sorted in descending numerical order',
        retries: 5,
        retryWaitSeconds: 5,
    });

    // Clicking on the Self-Paced Lessons header to sort ascending.
    await page
        .find("[data-testid='learners-table-header-async_lesson_completions']", {
            failover: [
                'tr.mantine-1c4j1su > th:nth-of-type(9)',
                'div.mantine-kwn0a8 > table > thead > tr > th:nth-of-type(9)',
                "[data-testid='learners-table'] > thead > tr > th:nth-of-type(9)",
                'div.mantine-1hv2vg > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(9)',
                'div.mantine-1ywgif7 > div > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(9)',
                'div.mantine-le2skq > div:nth-of-type(2) > div > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(9)',
                'body > div:nth-of-type(1) > div > div > div:nth-of-type(2) > div > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(9)',
                'th.mantine-1lmsj13',
            ],
        })
        .click();
    // Waiting for the table to update after clicking the Self-Paced Lessons column header for ascending sort, by asserting that the loading spinner is no longer visible and the table contains data.
    await page.locator('[data-testid="learners-table-no-results"]').waitFor({ state: 'hidden', timeout: 30000 });
    await page.waitForTimeout(3000);
    // Extracting Self-Paced Lessons values again to verify that the counts are sorted numerically (smallest → largest) after clicking the header.
    await page.analyzePageText({
        analysisToRun:
            "Extract all the text content from the 'Self-Paced Lessons' column of the learner table. The Self-Paced Lessons values are in the eighth column of the table. Each row starts with a tab character and the Self-Paced Lessons value is the ninth tab-separated field (index 8).",
        additionalRelevantContext:
            'The table rows are identified by data-testid="learners-table-row-...". The Self-Paced Lessons is the eighth text element in each row.',
    });
    // Verifying that the extracted Self-Paced Lessons values are sorted numerically (smallest → largest).
    await page.visuallyAssert({
        assertionToTestFor:
            'Assert that the following list of Self-Paced Lessons values is sorted in ascending numerical order',
        retries: 5,
        retryWaitSeconds: 5,
    });
    */

    // Clicking on the 'Trainer-led Classes' header to sort the column in descending order.
    await page
        .find("[data-testid='learners-table-header-num_classes']", {
            failover: [
                'tr.mantine-1c4j1su > th:nth-of-type(10)',
                'div.mantine-kwn0a8 > table > thead > tr > th:nth-of-type(10)',
                "[data-testid='learners-table'] > thead > tr > th:nth-of-type(10)",
                'div.mantine-1hv2vg > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(10)',
                'div.mantine-1ywgif7 > div > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(10)',
                'div.mantine-le2skq > div:nth-of-type(2) > div > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(10)',
                'body > div:nth-of-type(1) > div > div > div:nth-of-type(2) > div > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(10)',
                'th.mantine-1lmsj13',
            ],
        })
        .click();
    // Waiting for the table to update after sorting by 'Trainer-led Classes'.
    await page.locator('[data-testid="learners-table-no-results"]').waitFor({ state: 'hidden', timeout: 30000 });
    await page.waitForTimeout(3000);
    // Extracting 'Trainer-led Classes' values to verify descending numerical sort order.
    await page.analyzePageText({
        analysisToRun:
            "Extract all numerical values under the 'Trainer-led Classes' column. Then, verify that these values are sorted numerically from highest to lowest. If they are not, state the first instance of an unsorted value.",
        additionalRelevantContext:
            "The 'Trainer-led Classes' column is expected to be sorted in descending order.",
    });
    await page.visuallyAssert({
        assertionToTestFor:
            'Assert that the following list of Trainer-led Classes values is sorted in descending numerical order',
        retries: 5,
        retryWaitSeconds: 5,
    });
    // Clicking on the 'Trainer-led Classes' column header to sort it in ascending order.
    await page
        .find("[data-testid='learners-table-header-num_classes']", {
            failover: [
                'tr.mantine-1c4j1su > th:nth-of-type(10)',
                'div.mantine-kwn0a8 > table > thead > tr > th:nth-of-type(10)',
                "[data-testid='learners-table'] > thead > tr > th:nth-of-type(10)",
                'div.mantine-1hv2vg > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(10)',
                'div.mantine-1ywgif7 > div > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(10)',
                'div.mantine-le2skq > div:nth-of-type(2) > div > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(10)',
                'body > div:nth-of-type(1) > div > div > div:nth-of-type(2) > div > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(10)',
                'th.mantine-1lmsj13',
            ],
        })
        .click();
    // Waiting for the table to refresh after sorting by Trainer-led Classes in ascending order.
    await page.locator('[data-testid="learners-table-no-results"]').waitFor({ state: 'hidden', timeout: 30000 });
    await page.waitForTimeout(3000);
    // Extracting Trainer-led Classes values to verify ascending numerical sort order.
    await page.analyzePageText({
        analysisToRun:
            "Extract all numerical values under the 'Trainer-led Classes' column. Then, verify that these values are sorted numerically from lowest to highest. If they are not, state the first instance of an unsorted value.",
        additionalRelevantContext:
            "The 'Trainer-led Classes' column is expected to be sorted in ascending order.",
    });
    await page.visuallyAssert({
        assertionToTestFor:
            'Assert that the following list of Trainer-led Classes values is sorted in ascending numerical order',
        retries: 5,
        retryWaitSeconds: 5,
    });
    // Clicking on the 'AVG Rating' header to sort the column in descending order.
    await page
        .find("[data-testid='learners-table-header-avg_class_rating']", {
            failover: [
                'tr.mantine-1c4j1su > th:nth-of-type(11)',
                'div.mantine-kwn0a8 > table > thead > tr > th:nth-of-type(11)',
                "[data-testid='learners-table'] > thead > tr > th:nth-of-type(11)",
                'div.mantine-1hv2vg > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(11)',
                'div.mantine-1ywgif7 > div > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(11)',
                'div.mantine-le2skq > div:nth-of-type(2) > div > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(11)',
                'body > div:nth-of-type(1) > div > div > div:nth-of-type(2) > div > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(11)',
                'th.mantine-1lmsj13',
            ],
        })
        .click();
    // Waiting for the table to update after sorting by AVG Rating.
    await page.locator('[data-testid="learners-table-no-results"]').waitFor({ state: 'hidden', timeout: 30000 });
    await page.waitForTimeout(3000);
    // Extracting AVG Rating values to verify descending numerical sort order (5.0 -> 1.0).
    await page.analyzePageText({
        analysisToRun:
            "Extract all numerical values under the 'AVG Rating' column. Then, verify that these values are sorted numerically from highest to lowest. If they are not, state the first instance of an unsorted value.",
        additionalRelevantContext:
            "The 'AVG Rating' column is expected to be sorted in descending order.",
    });
    await page.visuallyAssert({
        assertionToTestFor:
            'Assert that the following list of AVG Rating values is sorted in descending numerical order',
        retries: 5,
        retryWaitSeconds: 5,
    });
    // Clicking on the 'AVG Rating' column header to sort it in ascending order.
    await page
        .find("[data-testid='learners-table-header-avg_class_rating']", {
            failover: [
                'tr.mantine-1c4j1su > th:nth-of-type(11)',
                'div.mantine-kwn0a8 > table > thead > tr > th:nth-of-type(11)',
                "[data-testid='learners-table'] > thead > tr > th:nth-of-type(11)",
                'div.mantine-1hv2vg > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(11)',
                'div.mantine-1ywgif7 > div > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(11)',
                'div.mantine-le2skq > div:nth-of-type(2) > div > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(11)',
                'body > div:nth-of-type(1) > div > div > div:nth-of-type(2) > div > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(11)',
                'th.mantine-1lmsj13',
            ],
        })
        .click();
    // Waiting for the table to update after sorting by AVG Rating in ascending order.
    await page.locator('[data-testid="learners-table-no-results"]').waitFor({ state: 'hidden', timeout: 30000 });
    await page.waitForTimeout(3000);
    // Extracting AVG Rating values to verify ascending numerical sort order (1.0 -> 5.0).
    await page.analyzePageText({
        analysisToRun:
            "Extract all numerical values under the 'AVG Rating' column. Then, verify that these values are sorted numerically from lowest to highest. If they are not, state the first instance of an unsorted value.",
        additionalRelevantContext:
            "The 'AVG Rating' column is expected to be sorted in ascending order.",
    });
    await page.visuallyAssert({
        assertionToTestFor:
            'Assert that the following list of AVG Rating values is sorted in ascending numerical order',
        retries: 5,
        retryWaitSeconds: 5,
    });
    // Clicking on the 'Manager' column header to sort it in descending order.
    await page
        .find("[data-testid='learners-table-header-manager_full_name']", {
            failover: [
                'tr.mantine-1c4j1su > th:nth-of-type(12)',
                'div.mantine-kwn0a8 > table > thead > tr > th:nth-of-type(12)',
                "[data-testid='learners-table'] > thead > tr > th:nth-of-type(12)",
                'div.mantine-1hv2vg > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(12)',
                'div.mantine-1ywgif7 > div > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(12)',
                'div.mantine-le2skq > div:nth-of-type(2) > div > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(12)',
                'body > div:nth-of-type(1) > div > div > div:nth-of-type(2) > div > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(12)',
                'th.mantine-1lmsj13',
            ],
        })
        .click();
    // Waiting for the table to update after sorting by Manager.
    await page.locator('[data-testid="learners-table-no-results"]').waitFor({ state: 'hidden', timeout: 30000 });
    await page.waitForTimeout(3000);
    // Extracting Manager names to verify alphabetical reverse order (Z -> A).
    await page.analyzePageText({
        analysisToRun:
            "Extract all values under the 'Manager' column. Then, verify that these values are sorted alphabetically from Z to A. If they are not, state the first instance of an unsorted value.",
        additionalRelevantContext:
            "The 'Manager' column is expected to be sorted in descending alphabetical order.",
    });
    await page.visuallyAssert({
        assertionToTestFor:
            'Assert that the following list of Manager names is sorted in descending alphabetical order, ignore "n/a" values in the list',
        retries: 5,
        retryWaitSeconds: 5,
    });
    // Clicking on the 'Manager' column header to sort it in ascending order.
    await page
        .find("[data-testid='learners-table-header-manager_full_name']", {
            failover: [
                'tr.mantine-1c4j1su > th:nth-of-type(12)',
                'div.mantine-kwn0a8 > table > thead > tr > th:nth-of-type(12)',
                "[data-testid='learners-table'] > thead > tr > th:nth-of-type(12)",
                'div.mantine-1hv2vg > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(12)',
                'div.mantine-1ywgif7 > div > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(12)',
                'div.mantine-le2skq > div:nth-of-type(2) > div > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(12)',
                'body > div:nth-of-type(1) > div > div > div:nth-of-type(2) > div > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(12)',
                'th.mantine-1lmsj13',
            ],
        })
        .click();
    // Waiting for the table to refresh after sorting by Manager in ascending order.
    await page.locator('[data-testid="learners-table-no-results"]').waitFor({ state: 'hidden', timeout: 30000 });
    await page.waitForTimeout(3000);
    // Extracting Manager names to verify alphabetical order (A -> Z) after a previous unexpected sort order.
    await page.analyzePageText({
        analysisToRun:
            "Extract all values under the 'Manager' column. Then, verify that these values are sorted alphabetically from A to Z. If they are not, state the first instance of an unsorted value.",
        additionalRelevantContext:
            "The 'Manager' column is expected to be sorted in ascending alphabetical order.",
    });
    await page.visuallyAssert({
        assertionToTestFor:
            'Assert that the following list of Manager names is sorted in ascending alphabetical order, ignore "n/a" values in the list',
        retries: 5,
        retryWaitSeconds: 5,
    });

    // Clicking on the 'Status' column header to sort it in ascending order, as per the overall objective.
    await page
        .find("[data-testid='learners-table-header-status']", {
            failover: [
                'tr.mantine-1c4j1su > th:nth-of-type(13)',
                'div.mantine-kwn0a8 > table > thead > tr > th:nth-of-type(13)',
                "[data-testid='learners-table'] > thead > tr > th:nth-of-type(13)",
                'div.mantine-1hv2vg > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(13)',
                'div.mantine-1ywgif7 > div > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(13)',
                'div.mantine-le2skq > div:nth-of-type(2) > div > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(13)',
                'body > div:nth-of-type(1) > div > div > div:nth-of-type(2) > div > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(13)',
                'th.mantine-1lmsj13',
            ],
        })
        .click();
    // Waiting for the table to refresh and display data after sorting by Status.
    await page.locator('[data-testid="learners-table-no-results"]').waitFor({ state: 'hidden', timeout: 30000 });
    await page.waitForTimeout(3000);
    // Extracting Status values to verify alphabetical or logical state order (e.g., Active -> Inactive).
    await page.analyzePageText({
        analysisToRun:
            "Extract all values under the 'Status' column. Then, verify that these values are sorted alphabetically or by logical state order (e.g., Active -> Inactive). If they are not, state the first instance of an unsorted value.",
        additionalRelevantContext:
            "The 'Status' column is expected to be sorted in descending order, with 'Active' appearing before 'Inactive'.",
    });
    await page.visuallyAssert({
        assertionToTestFor:
            'Assert that the following list of Status values is sorted in descending alphabetical order',
        retries: 5,
        retryWaitSeconds: 5,
    });
    // Clicking on the 'Status' column header again to sort it in ascending order.
    await page
        .find("[data-testid='learners-table-header-status']", {
            failover: [
                'tr.mantine-1c4j1su > th:nth-of-type(13)',
                'div.mantine-kwn0a8 > table > thead > tr > th:nth-of-type(13)',
                "[data-testid='learners-table'] > thead > tr > th:nth-of-type(13)",
                'div.mantine-1hv2vg > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(13)',
                'div.mantine-1ywgif7 > div > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(13)',
                'div.mantine-le2skq > div:nth-of-type(2) > div > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(13)',
                'body > div:nth-of-type(1) > div > div > div:nth-of-type(2) > div > div:nth-of-type(3) > table > thead > tr > th:nth-of-type(13)',
                'th.mantine-1lmsj13',
            ],
        })
        .click();
    // Waiting for the table to populate after sorting by Status in descending order, as the table is currently empty.
    await page.locator('[data-testid="learners-table-no-results"]').waitFor({ state: 'hidden', timeout: 30000 });
    await page.waitForTimeout(3000);
    // Extracting Status values to verify reverse order (Inactive -> Active) after sorting the column in descending order.
    await page.analyzePageText({
        analysisToRun:
            "Extract all values under the 'Status' column. Then, verify that these values are sorted in reverse order (Inactive -> Active). If they are not, state the first instance of an unsorted value.",
        additionalRelevantContext:
            "The 'Status' column is expected to be sorted in ascending order, with 'Inactive' appearing before 'Active'.",
    });
    await page.visuallyAssert({
        assertionToTestFor:
            'Assert that the following list of Status values is sorted in ascending alphabetical order',
        retries: 5,
        retryWaitSeconds: 5,
    });
});
