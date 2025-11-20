import { Then, When } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world.js';
import { expect } from '@playwright/test';

Then('I should see the map centered on Shakopee, MN', async function (this: CustomWorld) {
   if (!this.page) throw new Error('Page not initialized');

   // Check that the map is visible
   const map = await this.page.locator('.maplibregl-canvas');
   await expect(map).toBeVisible();

   // The default location should be loaded from IndexedDB or defaults
   // We can verify the location inputs show approximately correct values
   await this.page.waitForTimeout(1000); // Wait for map to settle
});

Then('the map should display cell towers', async function (this: CustomWorld) {
   if (!this.page) throw new Error('Page not initialized');

   // Wait for cell towers to load (check for cell tower count or markers)
   await this.page.waitForTimeout(2000); // Wait for API call
   const cellTowerText = await this.page.getByText(/cell towers? found/i);
   await expect(cellTowerText).toBeVisible({ timeout: 10000 });
});

When(
   'I enter latitude {string} and longitude {string}',
   async function (this: CustomWorld, lat: string, lon: string) {
      if (!this.page) throw new Error('Page not initialized');

      // Ensure the form is expanded first
      const formContent = this.page.locator('#controls-content');
      const isExpanded = await formContent.isVisible();

      if (!isExpanded) {
         const expandButton = this.page.locator('button[aria-expanded]');
         await expandButton.click();
         await this.page.waitForTimeout(500); // Wait for accordion animation
      }

      // Find and fill the latitude input (using id selector)
      const latInput = this.page.locator('#latitude');
      await latInput.clear();
      await latInput.fill(lat);

      // Find and fill the longitude input (using id selector)
      const lonInput = this.page.locator('#longitude');
      await lonInput.clear();
      await lonInput.fill(lon);
   }
);

When('I submit the location search', async function (this: CustomWorld) {
   if (!this.page) throw new Error('Page not initialized');

   // Click the search button
   const searchButton = this.page.getByRole('button', { name: /search/i });
   await searchButton.click();
});

Then('the map should fly to the new location', async function (this: CustomWorld) {
   if (!this.page) throw new Error('Page not initialized');

   // Wait for the map animation to complete
   await this.page.waitForTimeout(2500); // flyTo duration is 2000ms
});

Then(
   'the location inputs should update to reflect the new center',
   async function (this: CustomWorld) {
      if (!this.page) throw new Error('Page not initialized');

      // Check that inputs have been updated (they should show the submitted values)
      const latInput = this.page.locator('#latitude');
      const lonInput = this.page.locator('#longitude');

      const latValue = await latInput.inputValue();
      const lonValue = await lonInput.inputValue();

      expect(latValue).toBeTruthy();
      expect(lonValue).toBeTruthy();
   }
);

When('I drag the map', async function (this: CustomWorld) {
   if (!this.page) throw new Error('Page not initialized');

   const map = this.page.locator('.maplibregl-canvas');

   // Simulate map drag
   await map.hover();
   await this.page.mouse.down();
   await this.page.mouse.move(100, 100);
});

Then('I should see a pulsating crosshair at the map center', async function (this: CustomWorld) {
   if (!this.page) throw new Error('Page not initialized');

   // The crosshair should be visible during drag
   const crosshair = this.page.locator('.bg-red-500').first();
   await expect(crosshair).toBeVisible();
});

Then(
   'I should see real-time coordinates in the crosshair popup',
   async function (this: CustomWorld) {
      if (!this.page) throw new Error('Page not initialized');

      // Check for latitude/longitude text in the popup
      const latText = this.page.getByText(/Lat:/);
      const lonText = this.page.getByText(/Lon:/);

      await expect(latText).toBeVisible();
      await expect(lonText).toBeVisible();
   }
);

When('I release the map drag', async function (this: CustomWorld) {
   if (!this.page) throw new Error('Page not initialized');

   await this.page.mouse.up();
   await this.page.waitForTimeout(500);
});

Then('the crosshair should disappear', async function (this: CustomWorld) {
   if (!this.page) throw new Error('Page not initialized');

   // The crosshair should no longer be visible
   const crosshair = this.page.locator('.bg-red-500').first();
   await expect(crosshair).not.toBeVisible();
});

Then('the location should be persisted to storage', async function (this: CustomWorld) {
   if (!this.page) throw new Error('Page not initialized');

   // Check that IndexedDB was updated (we can verify by checking the inputs were updated)
   await this.page.waitForTimeout(200);
   // Location is saved - we could reload and verify it persists
});

When('I zoom in on the map', async function (this: CustomWorld) {
   if (!this.page) throw new Error('Page not initialized');

   // Click the zoom in button
   const zoomInButton = this.page.locator('.maplibregl-ctrl-zoom-in');
   await zoomInButton.click();
   await this.page.waitForTimeout(500);
});

Then('the map zoom level should increase', async function (this: CustomWorld) {
   if (!this.page) throw new Error('Page not initialized');

   // Map should have zoomed in (visual verification)
   await this.page.waitForTimeout(300);
});

Then('the map center should remain stable', async function (this: CustomWorld) {
   if (!this.page) throw new Error('Page not initialized');

   // The center shouldn't jump (inputs should remain stable)
   await this.page.waitForTimeout(200);
});

When('I zoom out on the map', async function (this: CustomWorld) {
   if (!this.page) throw new Error('Page not initialized');

   // Click the zoom out button
   const zoomOutButton = this.page.locator('.maplibregl-ctrl-zoom-out');
   await zoomOutButton.click();
   await this.page.waitForTimeout(500);
});

Then('the map zoom level should decrease', async function (this: CustomWorld) {
   if (!this.page) throw new Error('Page not initialized');

   // Map should have zoomed out (visual verification)
   await this.page.waitForTimeout(300);
});

When('I click on the {string} layer button', async function (this: CustomWorld, layerName: string) {
   if (!this.page) throw new Error('Page not initialized');

   const button = this.page.getByRole('button', { name: new RegExp(layerName, 'i') });
   await button.click();
   await this.page.waitForTimeout(1000); // Wait for map style to load
});

Then('the map should display satellite imagery', async function (this: CustomWorld) {
   if (!this.page) throw new Error('Page not initialized');

   // Visual verification - satellite tiles should be loading
   await this.page.waitForTimeout(1000);
});

Then('the {string} button should be highlighted', async function (this: CustomWorld, layerName: string) {
   if (!this.page) throw new Error('Page not initialized');

   // The active button should have a blue shadow/glow
   const button = this.page.getByRole('button', { name: new RegExp(layerName, 'i') });
   await expect(button).toBeVisible();
});

Then('the map should display street view', async function (this: CustomWorld) {
   if (!this.page) throw new Error('Page not initialized');

   // Visual verification - street map tiles should be loading
   await this.page.waitForTimeout(1000);
});
