import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { PlaywrightWorld } from '../support/world.ts';

const BASE_URL = 'http://localhost:5173';

Given('I am on the dirty state demo page', async function (this: PlaywrightWorld) {
  await this.page!.goto(BASE_URL);
  await this.page!.waitForSelector('[data-testid="dirty-state-demo"]');
});

When('I type {string} in the name field', async function (this: PlaywrightWorld, text: string) {
  await this.page!.fill('[data-testid="name-input"]', text);
});

When('I type {string} in the email field', async function (this: PlaywrightWorld, text: string) {
  await this.page!.fill('[data-testid="email-input"]', text);
});

When('I type {string} in the street field', async function (this: PlaywrightWorld, text: string) {
  await this.page!.fill('[data-testid="street-input"]', text);
});

When('I type {string} in the city field', async function (this: PlaywrightWorld, text: string) {
  await this.page!.fill('[data-testid="city-input"]', text);
});

When('I click the user form reset button', async function (this: PlaywrightWorld) {
  await this.page!.click('[data-testid="user-reset-button"]');
});

When('I click the address form reset button', async function (this: PlaywrightWorld) {
  await this.page!.click('[data-testid="address-reset-button"]');
});

When('I click the save all button', async function (this: PlaywrightWorld) {
  await this.page!.click('[data-testid="save-all-button"]');
});

Then('the save button should be disabled', async function (this: PlaywrightWorld) {
  const button = this.page!.locator('[data-testid="save-all-button"]');
  await expect(button).toBeDisabled();
});

Then('the save button should be enabled', async function (this: PlaywrightWorld) {
  const button = this.page!.locator('[data-testid="save-all-button"]');
  await expect(button).toBeEnabled();
});

Then('the status should show {string}', async function (this: PlaywrightWorld, expectedStatus: string) {
  const statusElement = this.page!.locator('[data-testid="dirty-status"]');
  await expect(statusElement).toContainText(expectedStatus);
});

Then('the dirty forms should include {string}', async function (this: PlaywrightWorld, formId: string) {
  const dirtyFormsElement = this.page!.locator('[data-testid="dirty-forms"]');
  await expect(dirtyFormsElement).toContainText(formId);
});

Then('the dirty forms should not include {string}', async function (this: PlaywrightWorld, formId: string) {
  const dirtyFormsElement = this.page!.locator('[data-testid="dirty-forms"]');
  // Check if element exists and doesn't contain the formId
  const count = await dirtyFormsElement.count();
  if (count > 0) {
    await expect(dirtyFormsElement).not.toContainText(formId);
  }
  // If element doesn't exist (no dirty forms), the assertion passes
});
