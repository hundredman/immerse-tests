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
Extract number of learners card value and remember that value in numLearners variable
Click the All Contracts dropdown and Select the first contract from the list.
Verify that the dashboard updates automatically to reflect data for the selected contract by validating that current number of learners value is not equal to numLearners variable value.
Verify that at least one major metric (e.g., Number of Learners, Logged In %, Attended Classes) updated after selecting the contract.
Click the contract dropdown again and select “All Contracts.”
Verify that the dashboard reverts to its initial data.
Verify that the dashboard updates automatically to reflect data for the All contracts by validating that current number of learners value is equal to numLearners variable value.
Click on the Time Frame dropdown.
Select “Last 7 days” from the list.
Verify that the dashboard updates with a new data set.
Verify that the dashboard updates automatically to reflect data for the selected contract by validating that current number of learners value is not equal to numLearners variable value.
verify the data corresponds to the last 7 days.
Assert that values for these metrics differ between time frames
Click the Time Frame dropdown again and Select “Last 30 days."
Verify that the dashboard reverts to its initial state data range.`,
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
    // Waiting until the text 'Immerse Demo Account' becomes visible on the page.
    await expect(page.getByText('Immerse Demo Account')).toBeVisible();

    // Wait for all components loaded in UI with proper value, also wait until graph is rendered.
    await page.visuallyAssert({
        assertionToTestFor:
            'Assert that all components loaded in UI with proper value, also wait until graph is rendered',
        retries: 5,
        retryWaitSeconds: 5,
    });

    // Extract initial card values and store in variables
    const initialNumLearners = await page
        .locator('[data-testid="dashboard-summary-total-learners-card"] div:nth-of-type(3)')
        .textContent();
    const initialLoggedInPercent = await page
        .locator('[data-testid="dashboard-summary-login-percentage-card"] div:nth-of-type(3) div')
        .textContent();
    const initialAttendedPercent = await page
        .locator('[data-testid="dashboard-summary-attendance-percentage-card"] div:nth-of-type(3) div')
        .textContent();

    // Clicking the All Contracts dropdown to select the first contract from the list.
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
    // Selecting the first contract from the dropdown list to update the dashboard data.
    await page
        .find('#mantine-r31-dropdown > div > button:nth-of-type(1)', {
            failover: [
                "[data-testid='dashboard-header-contract-dropdown-item-9ec24602-5b48-4434-a468-b66eb85180bf']",
                ".//button[normalize-space(.)='42225 Contract - IMMERSE Pro']",
                'div.mantine-wqtrt6 > div:nth-of-type(2) > div:nth-of-type(2) > div > div > button:nth-of-type(1)',
                'div.mantine-1ywgif7 > div > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(2) > div > div > button:nth-of-type(1)',
                'div.mantine-Container-root > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(2) > div > div > button:nth-of-type(1)',
                'body > div:nth-of-type(1) > div > div > div:nth-of-type(2) > div > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(2) > div > div > button:nth-of-type(1)',
                "[role='menuitem']",
                "[data-menu-item='true']",
                'button.mantine-Menu-item',
            ],
        })
        .click();
    // Verify that the dashboard updates automatically to reflect data for the selected contract
    const contractNumLearners = await page
        .locator('[data-testid="dashboard-summary-total-learners-card"] div:nth-of-type(3)')
        .textContent();
    const contractLoggedInPercent = await page
        .locator('[data-testid="dashboard-summary-login-percentage-card"] div:nth-of-type(3) div')
        .textContent();
    const contractAttendedPercent = await page
        .locator('[data-testid="dashboard-summary-attendance-percentage-card"] div:nth-of-type(3) div')
        .textContent();

    // Verify that at least one major metric updated
    const metricsChanged =
        contractNumLearners?.trim() !== initialNumLearners?.trim() ||
        contractLoggedInPercent?.trim() !== initialLoggedInPercent?.trim() ||
        contractAttendedPercent?.trim() !== initialAttendedPercent?.trim();
    expect(metricsChanged).toBe(true);


    // Clicking the contract dropdown again to select 'All Contracts' and revert the dashboard to its initial data.
    await page
        .find('#mantine-r31-target', {
            failover: [
                "[data-testid='dashboard-header-contract-dropdown']",
                ".//button[normalize-space(.)='42225 Contract - IMMERSE Pro']",
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
    // Selecting "All Contracts" from the dropdown to revert the dashboard to its initial data.
    await page
        .find('#mantine-r31-dropdown > div > button:nth-of-type(9)', {
            failover: [
                "[data-testid='dashboard-header-contract-dropdown-item-all']",
                ".//button[normalize-space(.)='All Contracts']",
                'div.mantine-wqtrt6 > div:nth-of-type(2) > div:nth-of-type(2) > div > div > button:nth-of-type(9)',
                'div.mantine-1ywgif7 > div > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(2) > div > div > button:nth-of-type(9)',
                'div.mantine-Container-root > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(2) > div > div > button:nth-of-type(9)',
                'body > div:nth-of-type(1) > div > div > div:nth-of-type(2) > div > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(2) > div > div > button:nth-of-type(9)',
                "[role='menuitem']",
                "[data-menu-item='true']",
                'button.mantine-Menu-item',
            ],
        })
        .click();
    // Wait for dashboard to update
    await page.waitForTimeout(5000);

    // Verify that the dashboard reverts to its initial data
    const revertedNumLearners = await page
        .locator('[data-testid="dashboard-summary-total-learners-card"] div:nth-of-type(3)')
        .textContent();
    const revertedLoggedInPercent = await page
        .locator('[data-testid="dashboard-summary-login-percentage-card"] div:nth-of-type(3) div')
        .textContent();
    const revertedAttendedPercent = await page
        .locator('[data-testid="dashboard-summary-attendance-percentage-card"] div:nth-of-type(3) div')
        .textContent();

    // Verify that current values ARE equal to stored initial values
    expect(revertedNumLearners?.trim()).toBe(initialNumLearners?.trim());
    expect(revertedLoggedInPercent?.trim()).toBe(initialLoggedInPercent?.trim());
    expect(revertedAttendedPercent?.trim()).toBe(initialAttendedPercent?.trim());

    // Clicking on the Time Frame dropdown to open it and select 'Last 7 days'.
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
    // Selecting "Last 7 days" from the Time Frame dropdown to update the dashboard with a new data set.
    await page
        .find('#mantine-r32-0', {
            failover: [
                '#mantine-r32-items > div:nth-of-type(1) > div > div > div:nth-of-type(1)',
                ".//div[normalize-space(.)='Last 7 days']",
                "[data-selected='true']",
                'div.mantine-1325v3c > div:nth-of-type(1)',
                'div.mantine-xlwgkm > div > div > div:nth-of-type(1)',
                'div.mantine-Select-dropdown > div > div > div:nth-of-type(1) > div > div > div:nth-of-type(1)',
                'body > div:nth-of-type(1) > div > div > div:nth-of-type(2) > div > div:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(2) > div:nth-of-type(2) > div > div > div:nth-of-type(1) > div > div > div:nth-of-type(1)',
                "[role='option']",
                'div.mantine-12zgr9',
            ],
        })
        .click();

    // Wait for dashboard to update
    await page.waitForTimeout(5000);

    // Verify that the dashboard updates with a new data set
    const last7DaysNumLearners = await page
        .locator('[data-testid="dashboard-summary-total-learners-card"] div:nth-of-type(3)')
        .textContent();
    const last7DaysLoggedInPercent = await page
        .locator('[data-testid="dashboard-summary-login-percentage-card"] div:nth-of-type(3) div')
        .textContent();
    const last7DaysAttendedPercent = await page
        .locator('[data-testid="dashboard-summary-attendance-percentage-card"] div:nth-of-type(3) div')
        .textContent();


    // Verify that at least one metric differs from initial (time frame changed)
    const timeFrameMetricsChanged =
        last7DaysLoggedInPercent?.trim() !== initialLoggedInPercent?.trim() ||
        last7DaysAttendedPercent?.trim() !== initialAttendedPercent?.trim();
    expect(timeFrameMetricsChanged).toBe(true);
    await page.visuallyAssert({
        assertionToTestFor: 'Assert that the dashboard updates with a new data set with date range of last 7 days',
        retries: 5,
        retryWaitSeconds: 5,
    });

    // Clicking the Time Frame dropdown again to select "Last 30 days" and revert the dashboard to its initial state data range.
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
    // Selecting "Last 30 days" from the Time Frame dropdown to revert the dashboard to its initial state data range.
    await page
        .find('#mantine-r32-1', {
            failover: [
                '#mantine-r32-items > div:nth-of-type(1) > div > div > div:nth-of-type(2)',
                ".//div[normalize-space(.)='Last 30 days']",
                'div.mantine-1325v3c > div:nth-of-type(2)',
                'div.mantine-xlwgkm > div > div > div:nth-of-type(2)',
                'div.mantine-Select-dropdown > div > div > div:nth-of-type(1) > div > div > div:nth-of-type(2)',
                'body > div:nth-of-type(1) > div > div > div:nth-of-type(2) > div > div:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(2) > div:nth-of-type(2) > div > div > div:nth-of-type(1) > div > div > div:nth-of-type(2)',
                "[role='option']",
                'div.mantine-12zgr9',
            ],
        })
        .click();

    // Wait for dashboard to update
    await page.waitForTimeout(5000);

    // Verify that the dashboard reverts to its initial state data range
    const last30DaysNumLearners = await page
        .locator('[data-testid="dashboard-summary-total-learners-card"] div:nth-of-type(3)')
        .textContent();
    const last30DaysLoggedInPercent = await page
        .locator('[data-testid="dashboard-summary-login-percentage-card"] div:nth-of-type(3) div')
        .textContent();
    const last30DaysAttendedPercent = await page
        .locator('[data-testid="dashboard-summary-attendance-percentage-card"] div:nth-of-type(3) div')
        .textContent();

    // Verify that values match initial state
    expect(last30DaysNumLearners?.trim()).toBe(initialNumLearners?.trim());
    expect(last30DaysLoggedInPercent?.trim()).toBe(initialLoggedInPercent?.trim());
    expect(last30DaysAttendedPercent?.trim()).toBe(initialAttendedPercent?.trim());
})