import { test, expect } from 'donobu';
import { getBrowserStorageStateFixture } from 'donobu';

const title = 'language-toggle-test';
const details = {
  annotation: [
    {
      type: 'objective',
      description: `Swap Languages on these screens and scan the page to verify the language swap occurs.

Log in page
Forgot password

Navigate to dashboard at https://staging-dashboard.immerse.online/dashboard and verify language swap occurs on the following logged in pages:
Dashboard
Learners
Learner details
Learner actions
Filters
Edit Columns/Filters`,
    },
  ],
};
test(title, details, async ({ page }) => {
  // Initializing web navigation.
  await page.goto('https://staging-dashboard.immerse.online/login');
  // Clicking the language dropdown to change the display language on the login page.
  await page
    .find("[aria-label='Display Language']", {
      failover: [
        "(.//div[normalize-space(.)='ENGLISH'])[1]",
        'div.css-18wbxrz',
        'div.css-1a47ai3 > div:nth-of-type(2)',
        'div.c-jhyvPY > div:nth-of-type(1) > div:nth-of-type(2)',
        'div.c-gqwkJN > div > div:nth-of-type(1) > div:nth-of-type(2)',
        'div.c-ejwOqd > div > div > div:nth-of-type(1) > div:nth-of-type(2)',
        'html > body > div:nth-of-type(1) > div:nth-of-type(1) > div > div > div:nth-of-type(1) > div:nth-of-type(2)',
        'body > div:nth-of-type(1) > div:nth-of-type(1) > div > div > div:nth-of-type(1) > div:nth-of-type(2)',
        ".//div[normalize-space(.)='ENGLISH']",
      ],
    })
    .click();
  // Selecting 'Español' from the language dropdown to change the display language on the login page.
  await page
    .find(".//button[normalize-space(.)='Español']", {
      failover: [
        'div.css-1a47ai3 > div:nth-of-type(3) > div > button:nth-of-type(3)',
        'div.c-jhyvPY > div:nth-of-type(1) > div:nth-of-type(3) > div > button:nth-of-type(3)',
        'div.c-gqwkJN > div > div:nth-of-type(1) > div:nth-of-type(3) > div > button:nth-of-type(3)',
        'div.c-ejwOqd > div > div > div:nth-of-type(1) > div:nth-of-type(3) > div > button:nth-of-type(3)',
        'body > div:nth-of-type(1) > div:nth-of-type(1) > div > div > div:nth-of-type(1) > div:nth-of-type(3) > div > button:nth-of-type(3)',
        "[role='menuitem']",
        "[data-menu-item='true']",
        'button.mantine-Menu-item',
      ],
    })
    .click();
  // Verifying that the language on the login page has been successfully swapped to Spanish by checking for key Spanish phrases.
  await expect(page.getByText('Acceso')).toBeVisible();
  // Navigating to the 'Forgot password' page to verify language swap.
  await page
    .find("[data-testid='login-form-forgot-password-link']", {
      failover: [
        ".//a[normalize-space(.)='¿Olvidaste tu contraseña?']",
        "[href='/forgot-password']",
        'div.c-kYaZkY > a',
        'div.c-jhyvPY > div:nth-of-type(2) > div:nth-of-type(3) > a',
        'div.c-gqwkJN > div > div:nth-of-type(2) > div:nth-of-type(3) > a',
        'div.c-ejwOqd > div > div > div:nth-of-type(2) > div:nth-of-type(3) > a',
        'body > div:nth-of-type(1) > div:nth-of-type(1) > div > div > div:nth-of-type(2) > div:nth-of-type(3) > a',
      ],
    })
    .click();
  // Verifying that the language on the 'Forgot password' page has been successfully swapped to Spanish by checking for key Spanish phrases.
  await expect(page.getByText('¿Olvidé mi contraseña?')).toBeVisible();
  // Navigating directly to the dashboard as the login attempt failed and the objective requires verifying language swap on dashboard pages.
  await page.goto('https://staging-dashboard.immerse.online/dashboard');
  // Waiting for the dashboard page to load completely before verifying the language.
  await page.waitForTimeout(5000);
  // Verifying that the language on the dashboard page has been successfully swapped to Spanish by checking for key Spanish phrases.
  await expect(page.getByText('Panel de control')).toBeVisible();
  // Navigating to the Learners page to verify language swap.
  await page
    .find("[data-testid='layout-header-learners-button']", {
      failover: [
        ".//button[normalize-space(.)='Estudiantes']",
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
  // Verifying that the language on the Learners page has been successfully swapped to Spanish by checking for key Spanish phrases.
  await expect(page.getByText('Estudiantes').first()).toBeVisible();
  // Navigating to the Learner details page to verify language swap.
  // Waiting for the table rows to load completely before verifying the language.
  await page.waitForTimeout(4000);
  await page
    .find("[data-testid^='learners-table-row-']:nth-of-type(1)", {
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
  // Waiting for the Learner details page to load completely before verifying the language.
  await page.waitForTimeout(2000);
  // Verifying that the language on the Learner details page has been successfully swapped to Spanish by checking for a key Spanish phrase.
  await page.getByText('Última actividad').first().waitFor({ state: 'visible', timeout: 30000 });
  await expect(page.getByText('Última actividad').first()).toBeVisible();
  // Closing the learner details drawer to access other elements on the Learners page.
  await page
    .find(
      'div:nth-of-type(7) > div > div > div:nth-of-type(1) > div:nth-of-type(1) > button.mantine-UnstyledButton-root',
      {
        failover: [
          'div.mantine-w29q45 > button',
          "[role='dialog'] > div:nth-of-type(1) > div:nth-of-type(1) > button",
          'html > body > div:nth-of-type(7) > div > div > div:nth-of-type(1) > div:nth-of-type(1) > button',
          'body > div:nth-of-type(7) > div > div > div:nth-of-type(1) > div:nth-of-type(1) > button',
          'button.mantine-UnstyledButton-root',
        ],
      },
    )
    .click();
  // Clicking the '...' button to access learner actions and verify language swap on the 'Learner actions' page.
  await page
    .find("(.//button[normalize-space(.)='...'])[1]", {
      failover: [
        "tr:nth-of-type(1) > td:nth-of-type(15) > [data-button='true']",
        'tr:nth-of-type(1) > td:nth-of-type(15) > button.mantine-UnstyledButton-root',
        "[data-testid='learners-table-cell-edit-227768'] > button",
        "[data-testid='learners-table-row-227768'] > td:nth-of-type(15) > button",
        'div.mantine-kwn0a8 > table > tbody > tr:nth-of-type(1) > td:nth-of-type(15) > button',
        "[data-testid='learners-table'] > tbody > tr:nth-of-type(1) > td:nth-of-type(15) > button",
        'div.mantine-1hv2vg > div:nth-of-type(3) > table > tbody > tr:nth-of-type(1) > td:nth-of-type(15) > button',
        'div.mantine-1ywgif7 > div > div:nth-of-type(3) > table > tbody > tr:nth-of-type(1) > td:nth-of-type(15) > button',
        'body > div:nth-of-type(1) > div > div > div:nth-of-type(2) > div > div:nth-of-type(3) > table > tbody > tr:nth-of-type(1) > td:nth-of-type(15) > button',
        ".//button[normalize-space(.)='...']",
        "[data-button='true']",
        'button.mantine-UnstyledButton-root',
      ],
    })
    .click();
  // Verifying that the language on the Learner actions menu has been successfully swapped to Spanish by checking for key Spanish phrases.
  await expect(page.getByText('Inactivar')).toBeVisible();
  await expect(page.getByText('Editar aprendiz')).toBeVisible();
  await expect(page.getByText('Cambiar contrato')).toBeVisible();
  // Closing the learner actions menu to access other elements on the Learners page.
  await page
    .find("[data-testid='learners-edit-dropdown-menu']", {
      failover: [
        "(.//div[normalize-space(.)='Ver enlace de registroReenviar invitaciónInactivarEditar aprendizCambiar contrato'])[1]",
        "[role='menu']",
        "[data-position='bottom']",
        'div.mantine-Menu-dropdown',
        "[data-testid='learners-table-cell-edit-227768'] > div",
        "[data-testid='learners-table-row-227768'] > td:nth-of-type(15) > div",
        'div.mantine-kwn0a8 > table > tbody > tr:nth-of-type(1) > td:nth-of-type(15) > div',
        "[data-testid='learners-table'] > tbody > tr:nth-of-type(1) > td:nth-of-type(15) > div",
        'div.mantine-1hv2vg > div:nth-of-type(3) > table > tbody > tr:nth-of-type(1) > td:nth-of-type(15) > div',
        'div.mantine-1ywgif7 > div > div:nth-of-type(3) > table > tbody > tr:nth-of-type(1) > td:nth-of-type(15) > div',
        'body > div:nth-of-type(1) > div > div > div:nth-of-type(2) > div > div:nth-of-type(3) > table > tbody > tr:nth-of-type(1) > td:nth-of-type(15) > div',
        ".//div[normalize-space(.)='Ver enlace de registroReenviar invitaciónInactivarEditar aprendizCambiar contrato']",
      ],
    })
    .click();
  // Clicking the 'Filtrar' button to verify language swap on the Filters page.
  await page
    .find(".//button[normalize-space(.)='Filtrar']", {
      failover: [
        'div.mantine-1rlbqtv > div:nth-of-type(1) > button:nth-of-type(2)',
        'div.mantine-1hv2vg > div:nth-of-type(2) > div:nth-of-type(1) > button:nth-of-type(2)',
        'div.mantine-1ywgif7 > div > div:nth-of-type(2) > div:nth-of-type(1) > button:nth-of-type(2)',
        'div.mantine-le2skq > div:nth-of-type(2) > div > div:nth-of-type(2) > div:nth-of-type(1) > button:nth-of-type(2)',
        'div.c-ejwOqd > div > div:nth-of-type(2) > div > div:nth-of-type(2) > div:nth-of-type(1) > button:nth-of-type(2)',
        'body > div:nth-of-type(1) > div > div > div:nth-of-type(2) > div > div:nth-of-type(2) > div:nth-of-type(1) > button:nth-of-type(2)',
        "[data-button='true']",
        'button.mantine-UnstyledButton-root',
      ],
    })
    .click();
  // Verifying that the language on the Filters page has been successfully swapped to Spanish by checking for the 'Ubicación' heading.
  await expect(page.getByText('Ubicación').first()).toBeVisible();
  // Verifying that the language on the Filters page has been successfully swapped to Spanish by checking for the 'Nivel inicial' heading.
  await expect(page.getByText('Nivel inicial').first()).toBeVisible();
  // Closing the filters drawer to access the 'Edit Columns/Filters' button.
  await page
    .find('div.mantine-w29q45 > button > svg', {
      failover: [
        'div.mantine-Paper-root > div:nth-of-type(1) > button > svg',
        "[role='dialog'] > div:nth-of-type(1) > div:nth-of-type(1) > button > svg",
        'body > div:nth-of-type(6) > div > div > div:nth-of-type(1) > div:nth-of-type(1) > button > svg',
      ],
    })
    .click();
  // Clicking the 'Edit Columns/Filters' button to verify language swap on the 'Edit Columns/Filters' page.
  await page
    .find(".//button[normalize-space(.)='Edit Columns/Filters']", {
      failover: [
        'div.mantine-1rlbqtv > div:nth-of-type(1) > button:nth-of-type(3)',
        'div.mantine-1hv2vg > div:nth-of-type(2) > div:nth-of-type(1) > button:nth-of-type(3)',
        'div.mantine-1ywgif7 > div > div:nth-of-type(2) > div:nth-of-type(1) > button:nth-of-type(3)',
        'div.mantine-le2skq > div:nth-of-type(2) > div > div:nth-of-type(2) > div:nth-of-type(1) > button:nth-of-type(3)',
        'div.c-ejwOqd > div > div:nth-of-type(2) > div > div:nth-of-type(2) > div:nth-of-type(1) > button:nth-of-type(3)',
        'body > div:nth-of-type(1) > div > div > div:nth-of-type(2) > div > div:nth-of-type(2) > div:nth-of-type(1) > button:nth-of-type(3)',
        "[data-button='true']",
        'button.mantine-UnstyledButton-root',
      ],
    })
    .click();
  // Verifying that the language on the 'Edit Columns/Filters' modal has been successfully swapped to Spanish by checking for the 'Nombre' heading.
  await expect(page.getByText('Nombre').first()).toBeVisible();
  // Verifying that the language on the 'Edit Columns/Filters' modal has been successfully swapped to Spanish by checking for the 'Correo Electrónico' heading.
  await expect(page.getByText('Correo Electrónico').first()).toBeVisible();
  // Verifying that the language on the 'Edit Columns/Filters' modal has been successfully swapped to Spanish by checking for the 'Ubicación' heading.
  await expect(page.getByText('Ubicación').first()).toBeVisible();
  // Scrolling down the 'Edit Columns/Filters' modal to reveal more content and verify additional language swaps.
  await page
    .find("[role='presentation']", {
      failover: [
        'div.mantine-144aj37',
        'html > body > div:nth-of-type(5) > div > div > div:nth-of-type(2)',
        'body > div:nth-of-type(5) > div > div > div:nth-of-type(2)',
      ],
    })
    .scroll('DOWN');
  // Verifying that the language on the 'Edit Columns/Filters' modal has been successfully swapped to Spanish by checking for the 'Último Inicio De Sesión' heading.
  await expect(page.getByText('Último Inicio De Sesión').first()).toBeVisible();
  // Verifying that the language on the 'Edit Columns/Filters' modal has been successfully swapped to Spanish by checking for the 'Encargado' heading.
  await expect(page.getByText('Encargado').first()).toBeVisible();
  // Verifying that the language on the 'Edit Columns/Filters' modal has been successfully swapped to Spanish by checking for the 'Estado' heading.
  await expect(page.getByText('Estado').first()).toBeVisible();
  // Closing the 'Edit Columns/Filters' modal after verifying language swap.
  await page
    .find("[data-testid='learners-button-save']", {
      failover: [
        ".//button[normalize-space(.)='Guardar']",
        'div.mantine-gwpqz3 > button:nth-of-type(3)',
        "[role='dialog'] > div:nth-of-type(2) > div:nth-of-type(2) > button:nth-of-type(3)",
        "[role='presentation'] > div > div:nth-of-type(2) > div:nth-of-type(2) > button:nth-of-type(3)",
        'body > div:nth-of-type(5) > div > div > div:nth-of-type(2) > div > div:nth-of-type(2) > div:nth-of-type(2) > button:nth-of-type(3)',
        "[data-button='true']",
        'button.mantine-UnstyledButton-root',
      ],
    })
    .click();
});
