import { Given, setDefaultTimeout } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world.js';
import { devServerPort } from '../support/server.js';

// Set default timeout to 30 seconds
setDefaultTimeout(30000);

Given('I am on the map application', async function (this: CustomWorld) {
   if (!this.page) {
      throw new Error('Page is not initialized');
   }

   const url = `http://localhost:${devServerPort}/map`;

   await this.page.goto(url, {
      waitUntil: 'networkidle',
      timeout: 30000,
   });

   // Wait for the map to be initialized
   await this.page.waitForSelector('.maplibregl-canvas', { timeout: 15000 });

   // Wait a bit more for the map to fully render
   await this.page.waitForTimeout(1000);
});
