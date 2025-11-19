import { Before, After, BeforeAll, AfterAll, Status } from '@cucumber/cucumber';
import { chromium, Browser } from '@playwright/test';
import { CustomWorld } from './world';

let browser: Browser;

BeforeAll(async function () {
   browser = await chromium.launch({
      headless: process.env.HEADLESS !== 'false',
   });
});

Before(async function (this: CustomWorld) {
   this.context = await browser.newContext({
      viewport: { width: 1280, height: 720 },
   });
   this.page = await this.context.newPage();
});

After(async function (this: CustomWorld, { result }) {
   if (result?.status === Status.FAILED && this.page) {
      const screenshot = await this.page.screenshot();
      this.attach(screenshot, 'image/png');
   }
   await this.page?.close();
   await this.context?.close();
});

AfterAll(async function () {
   await browser.close();
});
