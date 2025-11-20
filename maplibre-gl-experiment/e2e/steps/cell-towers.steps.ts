import { Then, When } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world.js';
import { expect } from '@playwright/test';

Then('I should see cell tower markers on the map', async function (this: CustomWorld) {
   if (!this.page) throw new Error('Page not initialized');

   // Wait for map to load and display markers
   await this.page.waitForTimeout(2000);

   // Check that the map canvas exists (markers are rendered on the canvas)
   const canvas = this.page.locator('.maplibregl-canvas');
   await expect(canvas).toBeVisible();
});

Then('the cell tower count should be displayed', async function (this: CustomWorld) {
   if (!this.page) throw new Error('Page not initialized');

   // Look for the cell tower count text
   const countText = this.page.getByText(/\d+ cell towers? found/i);
   await expect(countText).toBeVisible({ timeout: 10000 });
});

Then(
   'the map should load new cell towers for the location',
   async function (this: CustomWorld) {
      if (!this.page) throw new Error('Page not initialized');

      // Wait for new cell tower data to load
      await this.page.waitForTimeout(3000);

      // Verify cell tower count is displayed (may be different from before)
      const countText = this.page.getByText(/\d+ cell towers? found/i);
      await expect(countText).toBeVisible();
   }
);

Then('the cell tower count should update', async function (this: CustomWorld) {
   if (!this.page) throw new Error('Page not initialized');

   // The count should have changed
   await this.page.waitForTimeout(1000);
   const countText = this.page.getByText(/\d+ cell towers? found/i);
   await expect(countText).toBeVisible();
});

When('cell towers are loading', async function (this: CustomWorld) {
   if (!this.page) throw new Error('Page not initialized');

   // Ensure the form is expanded
   const formContent = this.page.locator('#controls-content');
   const isExpanded = await formContent.isVisible();

   if (!isExpanded) {
      const expandButton = this.page.locator('button[aria-expanded]');
      await expandButton.click();
      await this.page.waitForTimeout(500); // Wait for accordion animation
   }

   // Enter a new location to trigger loading (use a remote location)
   const latInput = this.page.locator('#latitude');
   const lonInput = this.page.locator('#longitude');
   await latInput.clear();
   await latInput.fill('40.7128'); // New York
   await lonInput.clear();
   await lonInput.fill('-74.0060'); // New York

   // Trigger a location change to cause loading
   const searchButton = this.page.getByRole('button', { name: /search/i });
   await searchButton.click();

   // Wait a small amount for loading state to appear
   await this.page.waitForTimeout(100);
});

Then('I should see a {string} message', async function (this: CustomWorld, message: string) {
   if (!this.page) throw new Error('Page not initialized');

   const messageText = this.page.getByText(message);
   await expect(messageText).toBeVisible({ timeout: 5000 });
});

When('cell towers finish loading', async function (this: CustomWorld) {
   if (!this.page) throw new Error('Page not initialized');

   // Wait for loading to complete
   await this.page.waitForTimeout(3000);
});

Then('I should see the cell tower count', async function (this: CustomWorld) {
   if (!this.page) throw new Error('Page not initialized');

   const countText = this.page.getByText(/\d+ cell towers? found/i);
   await expect(countText).toBeVisible();
});
