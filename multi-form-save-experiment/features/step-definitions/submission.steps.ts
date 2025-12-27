import { Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { PlaywrightWorld } from '../support/world.ts';

Then(
  'the submission status should be {string}',
  async function (this: PlaywrightWorld, status: string) {
    const statusElement = this.page!.locator('[data-testid="submission-status"]');
    await expect(statusElement).toContainText(status);
  }
);

Then('I should see a success message', async function (this: PlaywrightWorld) {
  const successMessage = this.page!.locator('[data-testid="success-message"]');
  await expect(successMessage).toBeVisible();
});

Then('I should not see a success message', async function (this: PlaywrightWorld) {
  const successMessage = this.page!.locator('[data-testid="success-message"]');
  await expect(successMessage).not.toBeVisible();
});

Then('I should see a submission error', async function (this: PlaywrightWorld) {
  const errorMessage = this.page!.locator('[data-testid="submission-error"]');
  await expect(errorMessage).toBeVisible();
});

Then('I should not see a submission error', async function (this: PlaywrightWorld) {
  const errorMessage = this.page!.locator('[data-testid="submission-error"]');
  await expect(errorMessage).not.toBeVisible();
});
