import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { PlaywrightWorld } from '../support/world.ts';

When('I clear the name field', async function (this: PlaywrightWorld) {
  await this.page!.fill('[data-testid="name-input"]', '');
});

Then('I should see an error summary', async function (this: PlaywrightWorld) {
  const errorSummary = this.page!.locator('[data-testid="error-summary"]');
  await expect(errorSummary).toBeVisible();
});

Then('I should not see an error summary', async function (this: PlaywrightWorld) {
  const errorSummary = this.page!.locator('[data-testid="error-summary"]');
  await expect(errorSummary).not.toBeVisible();
});

Then(
  'the error summary should include {string}',
  async function (this: PlaywrightWorld, formName: string) {
    const errorSummary = this.page!.locator('[data-testid="error-summary"]');
    await expect(errorSummary).toContainText(formName);
  }
);

Then(
  'I should see an inline error for {string}',
  async function (this: PlaywrightWorld, fieldName: string) {
    const errorElement = this.page!.locator(`[data-testid="${fieldName}-error"]`);
    // Wait for error to appear with a longer timeout since validation is async
    await expect(errorElement).toBeVisible({ timeout: 10000 });
  }
);

Then(
  'I should not see an inline error for {string}',
  async function (this: PlaywrightWorld, fieldName: string) {
    const errorElement = this.page!.locator(`[data-testid="${fieldName}-error"]`);
    await expect(errorElement).not.toBeVisible();
  }
);
