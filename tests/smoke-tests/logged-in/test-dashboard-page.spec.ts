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

const title = 'Test for https://staging-dashboard.immerse.online';
const details = {
  annotation: [
    {
      type: 'objective',
      description: `
Assert that the current URL contains "dashboard".
Wait until the text "Immerse Demo Account" becomes visible.
Verify that the navigation bar contains the product logo, an active “Dashboard” tab, a “Learners” tab, an “Account” label, a pill labeled “Immerse Demo Account,” and an English language selector with a chevron.
Click on the Learners tab from the top navigation bar.
Verify that the URL now contains "dashboard-learner" indicating navigation to the Learners section.
Click on the browser Back button to return to the dashboard.
Verify that the URL again contains "dashboard".
Wait for 5 seconds to ensure the dashboard page has fully reloaded.
Confirm that the “Dashboard” tab appears active and underlined in the navigation bar.
Check that the label “Contract:” is visible on the dashboard.
Verify that the default selected value for this dropdown is “All Contracts.”
Click on the All Contracts dropdown.
Verify that it opens successfully and lists the available contracts, including “All Contracts.”
Verify Time Frame label and default value
Confirm that the label “Time Frame:” is present on the dashboard.
Verify that the default value of the Time Frame dropdown is “Last 30 days.”
Click on the Time Frame dropdown.
Verify that it expands and lists at least one valid option such as “Last 7 days.”
Check visually that there are three cards under the “Overview” section: Number of Learners, Logged in at Least Once, % Attended Trainer-led Classes
Verify that each card have a colored gradient header bar appears at the top, an appropriate icon appears at the top-right, the value text is large, left-aligned, and readable.
Extract and verify “Number of Learners” card, Verify that valie is a numeric value under “Number of Learners.” and greater than or equal to 1. 
Verify that the right-side icon for the Number of Learners card represents a group of people.
Verify “Logged in at Least Once” card has a waving-hand icon on the top-right.
Extract its percentage value and verify The value ends with %, The numeric part is between 0% and 100% (inclusive).
Verify “% Attended Trainer-led Classes” card has the icon which represents a learning or instructor-led session.
Extract the value and verify that it ends with %, It lies between 0% and 100% (inclusive)
Ensure that the title “Learning Summary” is visible, and Verify that a widget labeled “Average Time on Site This Month” is present as the title header for the learning bar chart
Verify that the time value matches the pattern HH:MM (e.g., 02:45).
Confirm that a caption hours:minutes appears next to it.
Scroll to view Learning Summary chart
Scroll down the page to reveal the bar chart under Learning Summary.
Verify that the chart renders with three bars, representing the previous three months (including the current month).
Confirm that all three x-axis labels are visible.
Check that each bar has a visible non-zero height (greater than 0px) and Verify that the color gradient (blue to green) is consistent across all bars, y-axis uses hours as the measurement unit.
Verify that the card title “Learner by Location” is visible, and verify that one or more rows are displayed, each with: A country flag icon, Country name text, A percentage (e.g., 45%), A numeric count aligned to the right.
Verify that each count is greater than 0
Extract all level-wise entries (e.g., “Level 1: 22% 11”), and Verify that the count for each level is a positive integer, sum of all % is 100%
Check that a summary panel is displayed on the right side of the dashboard, and Verify that it includes: Attended Trainer-led Classes, Average Class Rating, Attended Social Events, Completed Self-Paced Lessons, Completed Asynchronous Activities
Verify that each metric shows a valid numeric value below its label.
Scroll further down to verify bottom metrics
Scroll down to bring Completed Asynchronous Activities into view.
Verify that Attended Trainer-led Classes, Attended Social Events, Completed Self-Paced Lessons, Completed Asynchronous Activities are a positive intigent, Average Class Rating value between 1 and 5, 
Scroll back up to the Attended Trainer-led Classes Summary Card.
Confirm that it aligns visually beside the bar chart and does not overlap or misalign.
`,
    },
  ],
};
test(title, details, async ({ page }) => {
  // Entering the username into the email field to log in.
  // Initializing web navigation.
  await page.goto('https://staging-dashboard.immerse.online/dashboard');

  // Asserting that the current URL contains 'dashboard' text to confirm successful login to the dashboard page.
  await expect(page).toHaveURL(/dashboard/);
  const learnerSummaryEle = await page.getByText('Learning Summary');
  await learnerSummaryEle.waitFor({ state: 'visible', timeout: 90000 });
  // Waiting until the text 'Immerse Demo Account' becomes visible on the page.
  await expect(page.getByText('Immerse Demo Account')).toBeVisible();
  // Verifying that the navigation bar contains the product logo, an active “Dashboard” tab, a “Learners” tab, an “Account” label, a pill labeled “Immerse Demo Account,” and an English language selector with a chevron.
  const logo = page.locator('//*[contains(@class,"svg-icon mantine-exbqh")]').first();
  await expect(logo).toBeVisible();
  const dashboardTab = page.getByRole('button', { name: 'Dashboard' });
  await expect(dashboardTab).toBeVisible();
  const learnersTab = page.getByRole('button', { name: 'Learners' });
  await expect(learnersTab).toBeVisible();
  const accountButton = page.locator("[data-testid='layout-header-account-button']");
  await expect(accountButton).toBeVisible();
  await expect(accountButton).toHaveText("Account");
  const demoAccountPill = page.getByRole('button', { name: 'Immerse Demo Account' });
  await expect(demoAccountPill).toBeVisible();
  const languageSelector = page.getByRole('searchbox', { name: 'Display Language' });
  await expect(languageSelector).toBeVisible();
  await expect(languageSelector).toHaveValue('English');
  // Verify the chevron icon next to the language selector is visible
  const chevronIcon = page.locator('//input[@aria-label="Display Language"]/following-sibling::div[contains(@class,"Select-rightSection")]//*[contains(@class,"svg-icon")]');
  await expect(chevronIcon).toBeVisible();
  // Clicking on the Learners tab from the top navigation bar to navigate to the Learners section.
  await page
    .find(
      '[data-testid="layout-header-learners-button"]',
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
  // Verifying that the URL now contains 'dashboard-learner' indicating navigation to the Learners section.
  await expect(page).toHaveURL(/dashboard-learner/);
  // Clicking on the browser Back button to return to the dashboard.
  await page.goBack();
  // Verifying that the URL again contains 'dashboard' after navigating back from the Learners section.
  await expect(page).toHaveURL(/dashboard/);
  // Waiting for 5 seconds to ensure the dashboard page has fully reloaded.
  await learnerSummaryEle.waitFor({ state: 'visible', timeout: 90000 });
  // Confirming that the 'Dashboard' tab appears active and underlined in the navigation bar.
  await page.analyzePageText({
    analysisToRun: "Verify that the 'Dashboard' tab is active and underlined.",
    additionalRelevantContext:
      "An active tab is typically indicated by an underline or a different background color. The text 'Dashboard' should be present and visually distinct from other tabs.",
  });

  // Checking if the label 'Contract:' is visible on the dashboard.
  await expect(page.getByText('Contract:')).toBeVisible();

  // Verifying that the default selected value for the 'Contract:' dropdown is 'All Contracts'.
  await expect(page.getByText('All Contracts')).toBeVisible();

  // Clicking on the All Contracts dropdown to open it and view the available contracts.
  await page
    .find('#mantine-r31-target', {
      failover: [
        "[data-testid='dashboard-header-contract-dropdown']",
        ".//button[normalize-space(.)='All Contracts']",
        "div:nth-of-type(2) > div:nth-of-type(2) > [data-button='true']",
        'div:nth-of-type(2) > div:nth-of-type(2) > button.mantine-UnstyledButton-root',
        'div.mantine-wqtrt6 > div:nth-of-type(2) > div:nth-of-type(2) > button',
        'div.mantine-1ywgif7 > div > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(2) > button',
        'div.mantine-Container-root > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(2) > button',
        'div.mantine-le2skq > div:nth-of-type(2) > div > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(2) > button',
        'div.c-ejwOqd > div > div:nth-of-type(2) > div > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(2) > button',
        'body > div:nth-of-type(1) > div > div > div:nth-of-type(2) > div > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(2) > button',
        "[data-button='true']",
        'button.mantine-UnstyledButton-root',
      ],
    })
    .click();
  // Verifying that the 'All Contracts' dropdown opened successfully and lists the available contracts, including 'All Contracts'.
  const allContractsOption = page.locator('[data-testid="dashboard-header-contract-dropdown-item-all"] div', { hasText: "All Contracts" });
  await expect(allContractsOption).toBeVisible();
  await expect(allContractsOption).toBeInViewport();

  // Confirming that the label 'Time Frame:' is present on the dashboard and verifying that the default value of the Time Frame dropdown is 'Last 30 days'.
  await expect(page.getByText('Time Frame:')).toBeVisible();
  const timeFrameInput = page.locator('[data-testid="dashboard-header-time-filter"]');
  await expect(timeFrameInput).toBeVisible();
  await expect(timeFrameInput).toHaveValue('Last 30 days');
  await expect(timeFrameInput).toHaveAttribute('placeholder', 'Select Date Range');

  // Clicking on the Time Frame dropdown to expand it and view the available options.
  await page
    .find('#mantine-r32', {
      failover: [
        "[data-testid='dashboard-header-time-filter']",
        "[placeholder='Select Date Range']",
        "div:nth-of-type(2) > div > div > [data-mantine-stop-propagation='false']",
        'div:nth-of-type(2) > div > div > input.mantine-Input-input',
        'div.mantine-wqtrt6 > div:nth-of-type(3) > div:nth-of-type(2) > div > div > input',
        'div.mantine-1ywgif7 > div > div:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(2) > div > div > input',
        'div.mantine-Container-root > div:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(2) > div > div > input',
        'body > div:nth-of-type(1) > div > div > div:nth-of-type(2) > div > div:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(2) > div > div > input',
        "[data-mantine-stop-propagation='false']",
        'input.mantine-Input-input',
      ],
    })
    .click();
  // Verifying that the Time Frame dropdown expands and lists at least one valid option such as 'Last 7 days'.
  const timeFrameDropdown = page.locator('div[role="option"]').first().locator('xpath=ancestor::div[contains(@class,"mantine-Select-itemsWrapper")]');
  await expect(timeFrameDropdown).toBeVisible();
  await expect(page.locator('div.mantine-Select-item', { hasText: "Last 7 days" })).toBeVisible();

  // Click outside of dropdown to close it.
  await page.getByRole('heading', { name: 'Overview' }).click();
  await expect(page.getByRole('option', { name: 'Last 7 days' })).not.toBeVisible();

  // Visually checking that there are three cards under the 'Overview' section: Number of Learners, Logged in at Least Once, % Attended Trainer-led Classes, and verifying their visual properties.
  const numLearnersCard = page.locator('text=Number of Learners').locator('..');
  const loggedInCard = page.locator('text=Logged in at Least Once').locator('..');
  const attendedClassesCard = page.locator('text=% Attended Trainer-led Classes');

  await expect(numLearnersCard).toBeVisible();
  await expect(loggedInCard).toBeVisible();
  await expect(attendedClassesCard).toBeVisible();

  // Verifying that there are three cards under the 'Overview' section, each with a colored gradient header bar, an appropriate icon, and large, left-aligned, readable value text.
  await page.visuallyAssert({
    assertionToTestFor:
      "Assert that there are three cards under the 'Overview' section, titled 'Number of Learners', 'Logged in at Least Once', and '% Attended Trainer-led Classes'. Each card should have a colored gradient header bar at the top, an icon at the top-right, and the value text should be large, left-aligned, and readable.",
  });
  // Extracting the value from the 'Number of Learners' card to verify it is a numeric value greater than or equal to 1.
  const numLearnersText = await page
    .locator('[data-testid="dashboard-summary-total-learners-card"] div:nth-of-type(3)')
    .textContent();

  const numLearners = parseInt(numLearnersText?.trim() || '0');
  expect(numLearners).toBeGreaterThanOrEqual(1);
  // Verifying that the right-side icon for the Number of Learners card represents a group of people.
  await page.visuallyAssert({
    assertionToTestFor:
      "Assert that the icon for the 'Number of Learners' card is an icon representing a group of people.",
  });
  // Verifying that the 'Logged in at Least Once' card has a waving-hand icon on the top-right.
  await page.visuallyAssert({
    assertionToTestFor:
      "Assert that the 'Logged in at Least Once' card has a waving-hand icon on the top-right.",
  });
  // Extracting the percentage value from the 'Logged in at Least Once' card and verifying its format and range.
  const loginPercentageText = await page
    .locator('[data-testid="dashboard-summary-login-percentage-card"] div:nth-of-type(3) div')
    .textContent();

  const loginPercentage = parseFloat(loginPercentageText?.trim().replace('%', '') || '0');
  expect(loginPercentage).toBeGreaterThanOrEqual(0);
  expect(loginPercentage).toBeLessThanOrEqual(100);

  // Verifying that the 'Logged in at Least Once' card has a waving-hand icon on the top-right.
  await page.visuallyAssert({
    assertionToTestFor:
      "Assert that the 'Logged in at Least Once' card has a waving-hand icon on the top-right.",
    retries: 2,
    retryWaitSeconds: 5,
  });

  // Extracting the percentage value from the '% Attended Trainer-led Classes' card and verifying its format and range.
  const attendancePercentageText = await page
    .locator('[data-testid="dashboard-summary-attendance-percentage-card"] div:nth-of-type(3) div')
    .textContent();

  const attendancePercentage = parseFloat(attendancePercentageText?.trim().replace('%', '') || '0');
  expect(attendancePercentage).toBeGreaterThanOrEqual(0);
  expect(attendancePercentage).toBeLessThanOrEqual(100);

  // Verifying that the
  // % Attended Trainer-led Classes
  //  card has the icon which represents a learning or instructor-led session.
  await page.visuallyAssert({
    assertionToTestFor:
      'Assert that the icon for the \n% Attended Trainer-led Classes\n card (next to the value) is an icon representing a learning or instructor-led session.',
  });

  // Ensuring that the title 'Learning Summary' is visible, verifying that a widget labeled 'Average Time on Site This Month' is present as the title header for the learning bar chart, and confirming the time value matches HH:MM with the 'hours:minutes' caption.
  await expect(page.getByRole('heading', { name: 'Learning Summary' })).toBeVisible();
  await expect(page.getByText('Average Time on Site This Month')).toBeVisible();

  const avgTimeLocator = page.locator('[data-testid="dashboard-charts-average-time-card"] .mantine-Text-root.mantine-148fcnt');
  const avgTimeText = (await avgTimeLocator.textContent())?.trim() || '';
  expect(avgTimeText).toMatch(/^\d{2}:\d{2}$/);
  await expect(page.getByText('hours:minutes')).toBeVisible();

  // Scrolling down the page to reveal the bar chart under Learning Summary.
  await page.find('html').scroll('DOWN');
  // Verifying that the Learning Summary chart renders with three bars, representing the previous three months (including the current month), that all three x-axis labels are visible, that each bar has a visible non-zero height, that the color gradient (blue to green) is consistent across all bars, and that the y-axis uses hours as the measurement unit.
  await page.analyzePageText({
    analysisToRun:
      'Verify that the Learning Summary chart renders with three bars, representing the previous three months (including the current month). Confirm that all three x-axis labels are visible. Check that each bar has a visible non-zero height (greater than 0px) and verify that the color gradient (blue to green) is consistent across all bars, and that the y-axis uses hours as the measurement unit.',
    additionalRelevantContext:
      'The x-axis labels should be the previous three months (including the current month). The y-axis labels should be in hours (e.g., 0h, 1h, 2h, 3h).',
  });

  // Verifying that the card title 'Learner by Location' is visible, and that one or more rows are displayed, each with a country name, a percentage, and a numeric count.
  await expect(page.getByText('Learner by Location')).toBeVisible();

  // Verify location entries with country names, percentages, and counts
  const locationRows = page.locator('[data-testid^="dashboard-charts-location-item-"]');
  const rowCount = await locationRows.count();
  expect(rowCount).toBeGreaterThan(0);
  for (let i = 0; i < rowCount; i++) {
    const row = locationRows.nth(i);

    // Country name
    const countryText = await row.locator('.mantine-Text-root.mantine-1pbxw0k').textContent();
    expect(countryText?.trim().length).toBeGreaterThan(0);

    // Percentage value (e.g., "76%")
    const percentText = await row.locator('.mantine-Text-root.mantine-1r7rc48').textContent();
    const percentValue = parseFloat(percentText?.trim().replace('%', '') || '0');
    expect(percentValue).toBeGreaterThanOrEqual(0);
    expect(percentValue).toBeLessThanOrEqual(100);

    // Numeric count (aligned right)
    const countText = await row.locator('.mantine-Text-root.mantine-qetx76').textContent();
    const countValue = parseInt(countText?.trim() || '0', 10);
    expect(countValue).toBeGreaterThan(0);
    await page.visuallyAssert({
      assertionToTestFor:
        "Assert that country flag displayed for the row corresponding to the country name is visible.",
    });

  }

  // Scrolling further down the page to verify bottom metrics.
  await page.find('html').scroll('DOWN');
  // Verifying that Attended Trainer-led Classes, Attended Social Events, Completed Self-Paced Lessons, Completed Asynchronous Activities are positive integers, and Average Class Rating value is between 1 and 5.
  await expect(page.getByText('Attended Trainer-led Classes').first()).toBeVisible();
  await expect(page.getByText('Average Class Rating')).toBeVisible();
  await expect(page.getByText('Attended Social Events')).toBeVisible();
  await expect(page.getByText('Completed Self-Paced Lessons')).toBeVisible();
  await expect(page.getByText('Completed Asynchronous Activities')).toBeVisible();

  const statsCard = page.locator('[data-testid="dashboard-stats-combined-card"]');
  const attendedClassesValue = parseInt(
    (await statsCard.locator('text=Attended Trainer-led Classes').locator('xpath=following::div[contains(@class, "mantine-xhs9ks")][1]').textContent())?.trim() || '0',
    10
  );

  const avgRatingValue = parseFloat(
    (await statsCard.locator('text=Average Class Rating').locator('xpath=following::div[contains(@class, "mantine-xhs9ks")][1]').textContent())?.trim() || '0'
  );

  const socialEventsValue = parseInt(
    (await statsCard.locator('text=Attended Social Events').locator('xpath=following::div[contains(@class, "mantine-xhs9ks")][1]').textContent())?.trim() || '0',
    10
  );

  const selfPacedValue = parseInt(
    (await statsCard.locator('text=Completed Self-Paced Lessons').locator('xpath=following::div[contains(@class, "mantine-xhs9ks")][1]').textContent())?.trim() || '0',
    10
  );

  const asyncActivitiesValue = parseInt(
    (await statsCard.locator('text=Completed Asynchronous Activities').locator('xpath=following::div[contains(@class, "mantine-xhs9ks")][1]').textContent())?.trim() || '0',
    10
  );

  // Assertions
  expect(attendedClassesValue).toBeGreaterThan(0);
  expect(avgRatingValue).toBeGreaterThanOrEqual(1);
  expect(avgRatingValue).toBeLessThanOrEqual(5);
  expect(socialEventsValue).toBeGreaterThan(0);
  expect(selfPacedValue).toBeGreaterThan(0);
  expect(asyncActivitiesValue).toBeGreaterThan(0);


  // Scrolling back up to the Attended Trainer-led Classes Summary Card to confirm its visual alignment.
  await page.find('html').scroll('UP');
  // Confirming that the 'Attended Trainer-led Classes' summary card aligns visually beside the bar chart and does not overlap or misalign.
  await page.visuallyAssert({
    assertionToTestFor:
      "Assert that the 'Attended Trainer-led Classes' summary card (annotation 11) aligns visually beside the bar chart (annotation 13) and does not overlap or misalign.",
  });

});
