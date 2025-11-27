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

const title = 'Test for https://dashboard.immerse.online';
const details = {
  annotation: [
    {
      type: 'objective',
      description: `Add a learner and complete onboarding (this requires some admin/contract setup)

Enter Email: sample.hradmin.readwrite.6@immerse.online
Enter Password: 6hradminreadwrite
Click on Log in
Click on Learners Tab
Navigate to a contract with an available license
Click on Add Learners
Click on "Add Learner" on the dropdown
Enter "Test" into the First Name field
Enter "Learner" into the Last Name field
Select "Andorra" for the Country
Enter the email address used when creating the learner
Click on "Save Changes"
Click on the "Search" field
Locate the search field with placeholder text "Search name, email, etc..."
Click on that search field
Enter the email address used when creating the learner
Click on "Search"
Click on the "..." and select "View Registration Link"
Click on "Copy"
Open a new browser tab
Paste in the link and hit enter
Click "Continue"
Enter a password in the “Password” field (must include uppercase letters, lowercase letters, numbers, and special characters, and must not contain the username)
Enter the same password in the "Confirm password" field
Click on "Continue"
Click on "Skip"
Verify landing at the completed onboarding page
`,
    },
  ],
};
test(title, details, async ({ page }) => {
  await page.waitForTimeout(10000)
  // Generate a unique email address for this test run
  const randomString = Math.random().toString(36).substring(2, 12);
  const generatedEmail = `test.learner+${randomString}@immerse.online`;

  // Generate a secure password that meets requirements (uppercase, lowercase, numbers, special chars)
  const passwordRandomString = Math.random().toString(36).substring(2, 10);
  const passwordRandomNumber = Math.floor(Math.random() * 1000);
  const generatedPassword = `Px${passwordRandomString}!${passwordRandomNumber}`;

  // Navigate to the login page
  await page.goto('https://staging-dashboard.immerse.online/dashboard');
  // Wait for page to load
  await page.waitForLoadState('networkidle');
  // Clicking on the Learners tab to navigate to the learners management section.
  await page.getByRole("button", { name: "Learners" }).waitFor({ state: "visible" , timeout: 10000 });
  await page
    .find("[data-testid='layout-header-learners-button']", {
      failover: [
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
    })
    .click();
  // Wait for learner page to load successfully
  await page.waitForLoadState('networkidle');
  await page.getByRole("heading", { name: "Learners" }).waitFor({ state: "visible" });
  // Clicking on the 'All Contracts' dropdown to view available contracts and select one with an available license.
  await page
    .find(".//button[normalize-space(.)='All Contracts']", {
      failover: [
        "div:nth-of-type(2) > div > div:nth-of-type(1) > div:nth-of-type(1) > [data-button='true']",
        'div:nth-of-type(2) > div > div:nth-of-type(1) > div:nth-of-type(1) > button.mantine-UnstyledButton-root',
        'div.mantine-7khlmp > div:nth-of-type(1) > button',
        'div.mantine-1hv2vg > div:nth-of-type(1) > div:nth-of-type(1) > button',
        'div.mantine-1ywgif7 > div > div:nth-of-type(1) > div:nth-of-type(1) > button',
        'div.mantine-le2skq > div:nth-of-type(2) > div > div:nth-of-type(1) > div:nth-of-type(1) > button',
        'div.c-ejwOqd > div > div:nth-of-type(2) > div > div:nth-of-type(1) > div:nth-of-type(1) > button',
        'body > div:nth-of-type(1) > div > div > div:nth-of-type(2) > div > div:nth-of-type(1) > div:nth-of-type(1) > button',
        "[data-button='true']",
        'button.mantine-UnstyledButton-root',
      ],
    })
    .click();
  // Navigating to a contract with an available license by clicking on '42225 Contract - IMMERSE Pro'.
  await page
    .find(".//button[normalize-space(.)='42225 Contract - IMMERSE Pro']", {
      failover: [
        'div.mantine-7khlmp > div:nth-of-type(1) > div > div > button:nth-of-type(1)',
        'div.mantine-1hv2vg > div:nth-of-type(1) > div:nth-of-type(1) > div > div > button:nth-of-type(1)',
        'div.mantine-1ywgif7 > div > div:nth-of-type(1) > div:nth-of-type(1) > div > div > button:nth-of-type(1)',
        'div.mantine-le2skq > div:nth-of-type(2) > div > div:nth-of-type(1) > div:nth-of-type(1) > div > div > button:nth-of-type(1)',
        'body > div:nth-of-type(1) > div > div > div:nth-of-type(2) > div > div:nth-of-type(1) > div:nth-of-type(1) > div > div > button:nth-of-type(1)',
        "[role='menuitem']",
        "[data-menu-item='true']",
        'button.mantine-Menu-item',
      ],
    })
    .click();
  // Wait for add Learner button
  await page.locator('//button[normalize-space(.)="Add Learners"]').waitFor({ 
  state: 'visible', 
  timeout: 10000 
});
  // Clicking on the 'Add Learners' button to initiate the process of adding a new learner.
  await page
    .find(".//button[normalize-space(.)='Add Learners']", {
      failover: [
        "div:nth-of-type(2) > div > div:nth-of-type(1) > div:nth-of-type(2) > [data-button='true']",
        'div:nth-of-type(2) > div > div:nth-of-type(1) > div:nth-of-type(2) > button.mantine-UnstyledButton-root',
        'div.mantine-7khlmp > div:nth-of-type(2) > button',
        'div.mantine-1hv2vg > div:nth-of-type(1) > div:nth-of-type(2) > button',
        'div.mantine-1ywgif7 > div > div:nth-of-type(1) > div:nth-of-type(2) > button',
        'div.mantine-le2skq > div:nth-of-type(2) > div > div:nth-of-type(1) > div:nth-of-type(2) > button',
        'div.c-ejwOqd > div > div:nth-of-type(2) > div > div:nth-of-type(1) > div:nth-of-type(2) > button',
        'body > div:nth-of-type(1) > div > div > div:nth-of-type(2) > div > div:nth-of-type(1) > div:nth-of-type(2) > button',
        "[data-button='true']",
        'button.mantine-UnstyledButton-root',
      ],
    })
    .click();
  // Clicking on "Add Learner" from the dropdown menu to proceed with adding a new learner.
  await page
    .find(".//button[normalize-space(.)='Add Learner']", {
      failover: [
        'div.mantine-7khlmp > div:nth-of-type(2) > div > div > button:nth-of-type(1)',
        'div.mantine-1hv2vg > div:nth-of-type(1) > div:nth-of-type(2) > div > div > button:nth-of-type(1)',
        'div.mantine-1ywgif7 > div > div:nth-of-type(1) > div:nth-of-type(2) > div > div > button:nth-of-type(1)',
        'div.mantine-le2skq > div:nth-of-type(2) > div > div:nth-of-type(1) > div:nth-of-type(2) > div > div > button:nth-of-type(1)',
        'body > div:nth-of-type(1) > div > div > div:nth-of-type(2) > div > div:nth-of-type(1) > div:nth-of-type(2) > div > div > button:nth-of-type(1)',
        "[role='menuitem']",
        "[data-menu-item='true']",
        'button.mantine-Menu-item',
      ],
    })
    .click();
  // Verify that the Add Learner modal displays all required fields
  await expect(page.locator("[data-testid='learners-form-first-name-input']")).toBeVisible();
  await expect(page.locator("[data-testid='learners-form-last-name-input']")).toBeVisible();
  await expect(page.locator("[data-testid='learners-form-email-input']")).toBeVisible();
  await expect(page.locator("[data-testid='learners-form-country-select']")).toBeVisible();
  // Entering "Test" into the First Name field as specified in the overall objective.
  await page
    .find("[data-testid='learners-form-first-name-input']", {
      failover: [
        "[name='firstName']",
        "[placeholder='Please enter a first name']",
        'div:nth-of-type(2) > div > input.mantine-Input-input',
        "[data-testid='learners-form-new-user'] > div:nth-of-type(2) > div > input",
        "[role='dialog'] > div:nth-of-type(2) > form > div:nth-of-type(2) > div > input",
        "[role='presentation'] > div > div:nth-of-type(2) > form > div:nth-of-type(2) > div > input",
        'body > div:nth-of-type(4) > div > div > div:nth-of-type(2) > div > div:nth-of-type(2) > form > div:nth-of-type(2) > div > input',
        'input.mantine-Input-input',
      ],
    })
    .inputText('Test');
  // Entering "Learner" into the Last Name field as specified in the overall objective.
  await page
    .find("[data-testid='learners-form-last-name-input']", {
      failover: [
        "[name='lastName']",
        "[placeholder='Please enter a last name']",
        'div:nth-of-type(3) > div:nth-of-type(1) > input.mantine-Input-input',
        "[data-testid='learners-form-new-user'] > div:nth-of-type(3) > div:nth-of-type(1) > input",
        "[role='dialog'] > div:nth-of-type(2) > form > div:nth-of-type(3) > div:nth-of-type(1) > input",
        "[role='presentation'] > div > div:nth-of-type(2) > form > div:nth-of-type(3) > div:nth-of-type(1) > input",
        'body > div:nth-of-type(4) > div > div > div:nth-of-type(2) > div > div:nth-of-type(2) > form > div:nth-of-type(3) > div:nth-of-type(1) > input',
        'input.mantine-Input-input',
      ],
    })
    .inputText('Learner');
  // Clicking on the Learner Country input field to open the dropdown and select 'Andorra'.
  await page
    .find("[data-testid='learners-form-country-select']", {
      failover: [
        "[placeholder='Please enter a country']",
        "div:nth-of-type(6) > div:nth-of-type(1) > div > [data-mantine-stop-propagation='false']",
        'div:nth-of-type(6) > div:nth-of-type(1) > div > input.mantine-Input-input',
        "[data-testid='learners-form-new-user'] > div:nth-of-type(6) > div:nth-of-type(1) > div > input",
        "[role='dialog'] > div:nth-of-type(2) > form > div:nth-of-type(6) > div:nth-of-type(1) > div > input",
        "[role='presentation'] > div > div:nth-of-type(2) > form > div:nth-of-type(6) > div:nth-of-type(1) > div > input",
        'body > div:nth-of-type(4) > div > div > div:nth-of-type(2) > div > div:nth-of-type(2) > form > div:nth-of-type(6) > div:nth-of-type(1) > div > input',
        "[data-mantine-stop-propagation='false']",
        'input.mantine-Input-input',
      ],
    })
    .click();
  // Selecting "Andorra" from the country dropdown as specified in the overall objective.
  await page
    .find(".//div[normalize-space(.)='Andorra']", {
      failover: [
        'div.mantine-1325v3c > div:nth-of-type(1)',
        'div.mantine-xlwgkm > div > div > div:nth-of-type(1)',
        'div.mantine-Select-dropdown > div > div > div:nth-of-type(1) > div > div > div:nth-of-type(1)',
        'body > div:nth-of-type(4) > div > div > div:nth-of-type(2) > div > div:nth-of-type(2) > form > div:nth-of-type(6) > div:nth-of-type(2) > div > div > div:nth-of-type(1) > div > div > div:nth-of-type(1)',
        "[role='option']",
        'div.mantine-12zgr9',
      ],
    })
    .click();
  // Entering a randomized email address for the learner as specified in the overall objective.
  await page
    .find("[data-testid='learners-form-email-input']", {
      failover: [
        "[name='email']",
        "[placeholder='Please enter a valid email']",
        'div:nth-of-type(4) > div:nth-of-type(1) > input.mantine-Input-input',
        "[data-testid='learners-form-new-user'] > div:nth-of-type(4) > div:nth-of-type(1) > input",
        "[role='dialog'] > div:nth-of-type(2) > form > div:nth-of-type(4) > div:nth-of-type(1) > input",
        "[role='presentation'] > div > div:nth-of-type(2) > form > div:nth-of-type(4) > div:nth-of-type(1) > input",
        'body > div:nth-of-type(4) > div > div > div:nth-of-type(2) > div > div:nth-of-type(2) > form > div:nth-of-type(4) > div:nth-of-type(1) > input',
        'input.mantine-Input-input',
      ],
    })
    .inputText(generatedEmail);
  // Scrolling down the page to locate the "Save Changes" button.
  await page
    .find("[role='presentation']", {
      failover: [
        'div.mantine-144aj37',
        'html > body > div:nth-of-type(4) > div > div > div:nth-of-type(2)',
        'body > div:nth-of-type(4) > div > div > div:nth-of-type(2)',
      ],
    })
    .scroll('DOWN');
  // Clicking on the "Save Changes" button to save the new learner's information.
  await page
    .find("[data-testid='learners-button-save']", {
      failover: [
        ".//button[normalize-space(.)='Save Changes']",
        'div.mantine-gwpqz3 > button:nth-of-type(2)',
        "[data-testid='learners-form-new-user'] > div:nth-of-type(11) > button:nth-of-type(2)",
        "[role='dialog'] > div:nth-of-type(2) > form > div:nth-of-type(11) > button:nth-of-type(2)",
        "[role='presentation'] > div > div:nth-of-type(2) > form > div:nth-of-type(11) > button:nth-of-type(2)",
        'body > div:nth-of-type(4) > div > div > div:nth-of-type(2) > div > div:nth-of-type(2) > form > div:nth-of-type(11) > button:nth-of-type(2)',
        "[data-button='true']",
        'button.mantine-UnstyledButton-root',
      ],
    })
    .click();
  // Verify that the learner was added successfully by checking for success message or toast
  await page.locator("//*[contains(text(), 'Learner Added') and contains(@class, 'mantine-Notification-title')]").waitFor({ state: 'visible', timeout: 5000 });
  await page.locator("//*[contains(text(), 'Learner Activated') and contains(@class, 'mantine-Notification-title')]").waitFor({ state: 'visible', timeout: 5000 });
  // Waiting for the page to finish loading after saving changes to the new learner.
  await page.waitForTimeout(5000);
  await page.run('acknowledgeUserInstruction', {
    userInstruction: `Search "${generatedEmail}"`,
  });
  // Entering the email address of the newly created learner into the search field to locate them in the table.
  await page
    .find("[placeholder='Search name, email, etc...']", {
      failover: [
        'div:nth-of-type(2) > div:nth-of-type(1) > div > div > input.mantine-Input-input',
        'div.mantine-1rlbqtv > div:nth-of-type(1) > div > div > input',
        'div.mantine-1hv2vg > div:nth-of-type(2) > div:nth-of-type(1) > div > div > input',
        'div.mantine-1ywgif7 > div > div:nth-of-type(2) > div:nth-of-type(1) > div > div > input',
        'div.mantine-le2skq > div:nth-of-type(2) > div > div:nth-of-type(2) > div:nth-of-type(1) > div > div > input',
        'body > div:nth-of-type(1) > div > div > div:nth-of-type(2) > div > div:nth-of-type(2) > div:nth-of-type(1) > div > div > input',
        'input.mantine-Input-input',
      ],
    })
    .inputText(generatedEmail);
  // Acknowledging the user's instruction to search for the learner's email and clicking the 'Search' button to execute the search.
  await page
    .find(".//button[normalize-space(.)='Search']", {
      failover: [
        'div.mantine-1rlbqtv > div:nth-of-type(1) > button:nth-of-type(1)',
        'div.mantine-1hv2vg > div:nth-of-type(2) > div:nth-of-type(1) > button:nth-of-type(1)',
        'div.mantine-1ywgif7 > div > div:nth-of-type(2) > div:nth-of-type(1) > button:nth-of-type(1)',
        'div.mantine-le2skq > div:nth-of-type(2) > div > div:nth-of-type(2) > div:nth-of-type(1) > button:nth-of-type(1)',
        'div.c-ejwOqd > div > div:nth-of-type(2) > div > div:nth-of-type(2) > div:nth-of-type(1) > button:nth-of-type(1)',
        'body > div:nth-of-type(1) > div > div > div:nth-of-type(2) > div > div:nth-of-type(2) > div:nth-of-type(1) > button:nth-of-type(1)',
        "[data-button='true']",
        'button.mantine-UnstyledButton-root',
      ],
    })
    .click();
  // Waiting for the search results to load after searching for the learner's email.
  await page.waitForTimeout(5000);
  // Verify that the search results contain the learner's email
  await expect(page.locator(`//*[contains(text(), '${generatedEmail}')]`)).toBeVisible();
  // Clicking on the "..." button to reveal options for the learner, including "View Registration Link".
  await page
    .find(".//button[normalize-space(.)='...']", {
      failover: [
        "td:nth-of-type(14) > [data-button='true']",
        'td:nth-of-type(14) > button.mantine-UnstyledButton-root',
        "[data-testid='learners-table-cell-edit-235514'] > button",
        'div.mantine-kwn0a8 > table > tbody > tr > td:nth-of-type(14) > button',
        "[data-testid='learners-table-row-235514'] > td:nth-of-type(14) > button",
        "[data-testid='learners-table'] > tbody > tr > td:nth-of-type(14) > button",
        'div.mantine-1hv2vg > div:nth-of-type(3) > table > tbody > tr > td:nth-of-type(14) > button',
        'div.mantine-1ywgif7 > div > div:nth-of-type(3) > table > tbody > tr > td:nth-of-type(14) > button',
        'body > div:nth-of-type(1) > div > div > div:nth-of-type(2) > div > div:nth-of-type(3) > table > tbody > tr > td:nth-of-type(14) > button',
        "[data-button='true']",
        'button.mantine-UnstyledButton-root',
      ],
    })
    .click();
  // Clicking on "View Registration Link" to obtain the registration link for the newly added learner.
  await page
    .find("[data-testid='learners-edit-menu-item-view-registration-link']", {
      failover: [
        ".//button[normalize-space(.)='View Registration Link']",
        "[data-testid='learners-table-cell-edit-235514'] > div > div > button:nth-of-type(1)",
        'div.mantine-kwn0a8 > table > tbody > tr > td:nth-of-type(14) > div > div > button:nth-of-type(1)',
        "[data-testid='learners-table-row-235514'] > td:nth-of-type(14) > div > div > button:nth-of-type(1)",
        "[data-testid='learners-table'] > tbody > tr > td:nth-of-type(14) > div > div > button:nth-of-type(1)",
        'body > div:nth-of-type(1) > div > div > div:nth-of-type(2) > div > div:nth-of-type(3) > table > tbody > tr > td:nth-of-type(14) > div > div > button:nth-of-type(1)',
        "[role='menuitem']",
        "[data-menu-item='true']",
        'button.mantine-Menu-item',
      ],
    })
    .click();
  // Getting the registration link from the dialog before closing it.
  const linkLocator = page.locator("[role='dialog'] a");
  const registrationUrl = await linkLocator.getAttribute('href');
  expect(registrationUrl, 'Registration URL should exist').not.toBeNull();
  expect(registrationUrl).toMatch(/^https:\/\/(staging-)?app\.immerse\.online\/sign-up\/b2b\?.*contract_id=.*&.*activation_key=.*/);
  // Clicking on the "Copy" button to close the dialog.
  await page
    .find("[data-testid='learners-button-copy']", {
      failover: [
        ".//button[normalize-space(.)='Copy']",
        'div.mantine-gwpqz3 > button:nth-of-type(2)',
        "[role='dialog'] > div:nth-of-type(2) > div:nth-of-type(2) > button:nth-of-type(2)",
        "[role='presentation'] > div > div:nth-of-type(2) > div:nth-of-type(2) > button:nth-of-type(2)",
        'body > div:nth-of-type(14) > div > div > div:nth-of-type(2) > div > div:nth-of-type(2) > div:nth-of-type(2) > button:nth-of-type(2)',
        "[data-button='true']",
        'button.mantine-UnstyledButton-root',
      ],
    })
    .click();
  // Navigating to the registration link to complete the learner onboarding.
  await page.goto(registrationUrl!);
  // Wait for the Continue button to be enabled (takes about 3 seconds)
  await page.waitForTimeout(3000);
  // Clicking on the "Continue" button to proceed with the learner onboarding process.
  await page
    .find(".//button[normalize-space(.)='Continue']", {
      failover: [
        "[data-button='true']",
        'button.mantine-UnstyledButton-root',
        'div.css-1tw4fsd > button',
        'div.css-gufwo6 > div:nth-of-type(3) > button',
        'div.c-ejwOqd > div > div:nth-of-type(3) > button',
        'html > body > div:nth-of-type(1) > div:nth-of-type(1) > div > div:nth-of-type(3) > button',
        'body > div:nth-of-type(1) > div:nth-of-type(1) > div > div:nth-of-type(3) > button',
      ],
    })
    .click();
  // Entering a dynamically generated password that meets the specified criteria (uppercase, lowercase, numbers, special characters) into the password field.
  await page
    .find(
      "div:nth-of-type(3) > div:nth-of-type(1) > div:nth-of-type(1) > [data-testid='passwordinput']",
      {
        failover: [
          "[placeholder='Password']",
          'div:nth-of-type(3) > div:nth-of-type(1) > div:nth-of-type(1) > input.mantine-PasswordInput-innerInput',
          'div.css-199fa7t > div:nth-of-type(3) > div:nth-of-type(1) > div:nth-of-type(1) > input',
          'div.css-6klct2 > div:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(1) > div:nth-of-type(1) > input',
          'div.mantine-15lubk5 > div:nth-of-type(1) > div > div:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(1) > div:nth-of-type(1) > input',
          'body > div:nth-of-type(1) > div:nth-of-type(1) > div > div:nth-of-type(1) > div:nth-of-type(2) > div > div > div > div:nth-of-type(1) > div > div:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(1) > div:nth-of-type(1) > input',
          "[data-testid='passwordinput']",
          'input.mantine-PasswordInput-innerInput',
        ],
      },
    )
    .inputText(generatedPassword);
  await page.run('acknowledgeUserInstruction', {
    userInstruction: 'Enter the same password for confirm password',
  });
  // Acknowledging the user's instruction and entering the same generated password into the 'Confirm password' field.
  await page
    .find(
      "div:nth-of-type(4) > div > div:nth-of-type(1) > [data-testid='passwordinput']",
      {
        failover: [
          "[name='confirmPassword']",
          "[placeholder='Confirm password']",
          'div:nth-of-type(4) > div > div:nth-of-type(1) > input.mantine-13e8zn2',
          'div.css-199fa7t > div:nth-of-type(4) > div > div:nth-of-type(1) > input',
          'div.css-6klct2 > div:nth-of-type(1) > div:nth-of-type(4) > div > div:nth-of-type(1) > input',
          'div.mantine-15lubk5 > div:nth-of-type(1) > div > div:nth-of-type(1) > div:nth-of-type(4) > div > div:nth-of-type(1) > input',
          'body > div:nth-of-type(1) > div:nth-of-type(1) > div > div:nth-of-type(1) > div:nth-of-type(2) > div > div > div > div:nth-of-type(1) > div > div:nth-of-type(1) > div:nth-of-type(4) > div > div:nth-of-type(1) > input',
          "[data-testid='passwordinput']",
          'input.mantine-13e8zn2',
        ],
      },
    )
    .inputText(generatedPassword);
  // Clicking on the "Continue" button to proceed after entering and confirming the password.
  await page
    .find(".//button[normalize-space(.)='Continue']", {
      failover: [
        "[data-button='true']",
        'div:nth-of-type(1) > div > div:nth-of-type(2) > button.mantine-UnstyledButton-root',
        'div.css-1tw4fsd > button',
        'div.css-gufwo6 > div:nth-of-type(2) > button',
        'div.c-ejwOqd > div > div:nth-of-type(2) > button',
        'html > body > div:nth-of-type(1) > div:nth-of-type(1) > div > div:nth-of-type(2) > button',
        'body > div:nth-of-type(1) > div:nth-of-type(1) > div > div:nth-of-type(2) > button',
        'button.mantine-UnstyledButton-root',
      ],
    })
    .click();
  // Clicking on the "Skip" button to bypass the optional profile information section and proceed with onboarding.
  await page
    .find(".//button[normalize-space(.)='Skip']", {
      failover: [
        "[data-button='true']",
        'div:nth-of-type(1) > div > div:nth-of-type(2) > button.mantine-UnstyledButton-root',
        'div.css-1tw4fsd > button',
        'div.css-gufwo6 > div:nth-of-type(2) > button',
        'div.c-ejwOqd > div > div:nth-of-type(2) > button',
        'html > body > div:nth-of-type(1) > div:nth-of-type(1) > div > div:nth-of-type(2) > button',
        'body > div:nth-of-type(1) > div:nth-of-type(1) > div > div:nth-of-type(2) > button',
        'button.mantine-UnstyledButton-root',
      ],
    })
    .click();
  await page.run('acknowledgeUserInstruction', {
    userInstruction:
      `stop the work in app.immerse.online and go back to dashboard to check "${generatedEmail}" user status is active`,
  });
  // Acknowledging the user's instruction to stop the current work and navigate back to the dashboard to check the learner's status.
  await page.goto('https://staging-dashboard.immerse.online/dashboard-learner');
  // Re-entering the learner's email address into the search field to check their status, as instructed by the user.
  await page
    .find("[placeholder='Search name, email, etc...']", {
      failover: [
        'div:nth-of-type(2) > div:nth-of-type(1) > div > div > input.mantine-Input-input',
        'div.mantine-1rlbqtv > div:nth-of-type(1) > div > div > input',
        'div.mantine-1hv2vg > div:nth-of-type(2) > div:nth-of-type(1) > div > div > input',
        'div.mantine-1ywgif7 > div > div:nth-of-type(2) > div:nth-of-type(1) > div > div > input',
        'div.mantine-le2skq > div:nth-of-type(2) > div > div:nth-of-type(2) > div:nth-of-type(1) > div > div > input',
        'body > div:nth-of-type(1) > div > div > div:nth-of-type(2) > div > div:nth-of-type(2) > div:nth-of-type(1) > div > div > input',
        'input.mantine-Input-input',
      ],
    })
    .inputText(generatedEmail);
  // Acknowledging the user's instruction and clicking the 'Search' button to filter the learners table by the entered email address.
  await page
    .find(".//button[normalize-space(.)='Search']", {
      failover: [
        'div.mantine-1rlbqtv > div:nth-of-type(1) > button:nth-of-type(1)',
        'div.mantine-1hv2vg > div:nth-of-type(2) > div:nth-of-type(1) > button:nth-of-type(1)',
        'div.mantine-1ywgif7 > div > div:nth-of-type(2) > div:nth-of-type(1) > button:nth-of-type(1)',
        'div.mantine-le2skq > div:nth-of-type(2) > div > div:nth-of-type(2) > div:nth-of-type(1) > button:nth-of-type(1)',
        'div.c-ejwOqd > div > div:nth-of-type(2) > div > div:nth-of-type(2) > div:nth-of-type(1) > button:nth-of-type(1)',
        'body > div:nth-of-type(1) > div > div > div:nth-of-type(2) > div > div:nth-of-type(2) > div:nth-of-type(1) > button:nth-of-type(1)',
        "[data-button='true']",
        'button.mantine-UnstyledButton-root',
      ],
    })
    .click();
  // Waiting for the search results to load after searching for the learner's email.
  await page.waitForTimeout(3000);
  // Verify that the search results contain the learner's email
  await page.find(`//*[contains(text(), '${generatedEmail}')]`, {
    failover: [
      `[data-testid='learners-table'] //*[contains(text(), '${generatedEmail}')]`,
      "table tbody tr td",
    ],
  });
  // Scrolling the table content to the right to reveal the status column using JavaScript
  const tableContainer = await page.locator('div.mantine-kwn0a8').first();
  await page.evaluate(() => {
    document.querySelectorAll('div').forEach(el => {
      if (el.scrollWidth > el.clientWidth) {
        el.scrollLeft = el.scrollWidth;
        el.dispatchEvent(new Event('scroll'));
      }
    });
  });
  await page.waitForTimeout(1000);
  // Verify that the learner's status is "Active"
  const activeElement = await page.find("//*[contains(text(), 'Active')]", {
    failover: [
      "td:has-text('Active')",
      "[data-testid='learners-table'] //*[contains(text(), 'Active')]",
      "table tbody tr td",
    ],
  });
  const activeText = await page.locator("td:has-text('Active')").first().textContent();
  expect(activeText).toBe('Active');
  console.log('Learner status:', activeText?.trim());

  // Cleanup: Make the created learner inactive to free up the license
  await page.run('acknowledgeUserInstruction', {
    userInstruction: `Make the learner "${generatedEmail}" inactive to free up the license`,
  });

  // Click on the "..." button to reveal options for the learner
  await page
    .find(".//button[normalize-space(.)='...']", {
      failover: [
        "td:nth-of-type(14) > [data-button='true']",
        'td:nth-of-type(14) > button.mantine-UnstyledButton-root',
        "[data-testid='learners-table-cell-edit-235514'] > button",
        'div.mantine-kwn0a8 > table > tbody > tr > td:nth-of-type(14) > button',
        "[data-testid='learners-table-row-235514'] > td:nth-of-type(14) > button",
        "[data-testid='learners-table'] > tbody > tr > td:nth-of-type(14) > button",
        'div.mantine-1hv2vg > div:nth-of-type(3) > table > tbody > tr > td:nth-of-type(14) > button',
        'div.mantine-1ywgif7 > div > div:nth-of-type(3) > table > tbody > tr > td:nth-of-type(14) > button',
        'body > div:nth-of-type(1) > div > div > div:nth-of-type(2) > div > div:nth-of-type(3) > table > tbody > tr > td:nth-of-type(14) > button',
        "[data-button='true']",
        'button.mantine-UnstyledButton-root',
      ],
    })
    .click();

  // Click on "Make Inactive" option from the menu
  await page
    .find(".//button[normalize-space(.)='Make Inactive']", {
      failover: [
        "[data-testid='learners-edit-menu-item-make-inactive']",
        ".//button[contains(normalize-space(.), 'Make Inactive')]",
        ".//button[contains(normalize-space(.), 'Inactive')]",
        "[role='menuitem']",
        "[data-menu-item='true']",
        'button.mantine-Menu-item',
      ],
    })
    .click();

  // Verify that the learner was made inactive by checking for success message
  await page.locator("[role='alert']").filter({ hasText: 'Learner Made Inactive' }).first().waitFor({ state: 'visible', timeout: 5000 });

  console.log(`Learner ${generatedEmail} has been made inactive to free up the license`);
});
