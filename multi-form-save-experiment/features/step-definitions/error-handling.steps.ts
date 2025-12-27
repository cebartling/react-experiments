import { Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { PlaywrightWorld } from '../support/world.ts';

Then(
  'the error summary should contain at least one form error',
  async function (this: PlaywrightWorld) {
    const errorSummary = this.page!.locator('[data-testid="error-summary"]');
    await expect(errorSummary).toBeVisible();

    // Check that there is at least one form error item in the summary
    const errorItems = this.page!.locator('[data-testid^="error-summary-"]');
    const count = await errorItems.count();
    expect(count).toBeGreaterThan(0);
  }
);

Then('the email field should have an error indicator', async function (this: PlaywrightWorld) {
  // The email error message being visible indicates the field has an error
  const errorElement = this.page!.locator('[data-testid="email-error"]');
  await expect(errorElement).toBeVisible({ timeout: 10000 });
});

Then('the name field should have an error indicator', async function (this: PlaywrightWorld) {
  const errorElement = this.page!.locator('[data-testid="name-error"]');
  await expect(errorElement).toBeVisible({ timeout: 10000 });
});

Then('the street field should have an error indicator', async function (this: PlaywrightWorld) {
  const errorElement = this.page!.locator('[data-testid="street-error"]');
  await expect(errorElement).toBeVisible({ timeout: 10000 });
});

Then('the city field should have an error indicator', async function (this: PlaywrightWorld) {
  const errorElement = this.page!.locator('[data-testid="city-error"]');
  await expect(errorElement).toBeVisible({ timeout: 10000 });
});
