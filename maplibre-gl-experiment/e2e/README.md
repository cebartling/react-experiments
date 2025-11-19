# End-to-End (E2E) Testing

This directory contains acceptance tests using Playwright and Cucumber.js for BDD-style testing.

## Structure

```
e2e/
├── features/           # Gherkin feature files (.feature)
│   ├── map-navigation.feature
│   └── cell-towers.feature
├── steps/              # Step definitions (.steps.ts)
│   ├── common.steps.ts
│   ├── map-navigation.steps.ts
│   └── cell-towers.steps.ts
├── support/            # Test setup and hooks
│   ├── world.ts        # Custom World with Playwright context
│   └── hooks.ts        # Before/After hooks
└── tsconfig.json       # TypeScript config for E2E tests
```

## Running Tests

### Prerequisites

First, install Playwright browsers:

```bash
npm run playwright:install
```

### Run Tests

```bash
# Run E2E tests in headless mode
npm run test:e2e

# Run E2E tests with browser UI (for debugging)
npm run test:e2e:headed
```

## Writing Tests

### Feature Files

Feature files use Gherkin syntax to describe test scenarios:

```gherkin
Feature: Feature Name
  Description of the feature

  Background:
    Given common setup steps

  Scenario: Scenario name
    Given I have a precondition
    When I perform an action
    Then I should see a result
```

### Step Definitions

Step definitions connect Gherkin steps to Playwright actions:

```typescript
import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';
import { expect } from '@playwright/test';

Given('I am on the homepage', async function (this: CustomWorld) {
   if (!this.page) throw new Error('Page not initialized');
   await this.page.goto('http://localhost:5173');
});

When('I click the button', async function (this: CustomWorld) {
   await this.page!.click('button');
});

Then('I should see {string}', async function (this: CustomWorld, text: string) {
   await expect(this.page!.getByText(text)).toBeVisible();
});
```

## Test Features

### Map Navigation (`map-navigation.feature`)

- View default map location
- Search for locations using coordinates
- Drag map with crosshair feedback
- Zoom in/out functionality
- Switch between base layers (Street/Satellite/Hybrid)

### Cell Tower Visualization (`cell-towers.feature`)

- View cell tower markers
- Cell towers update on location change
- Cell tower status indicators (loading, count)

## Configuration

### Playwright Config (`playwright.config.ts`)

- Test directory: `./e2e`
- Base URL: `http://localhost:5173`
- Browsers: Chromium, Firefox, WebKit
- Auto-starts dev server before tests

### Cucumber Config (`cucumber.js`)

- Step definition paths
- Formatter options
- Report generation (HTML)

## Reports

Test reports are generated in:
- `e2e-report.html` - HTML report with test results
- Terminal output with progress formatter

## Debugging

### Run in Headed Mode

```bash
npm run test:e2e:headed
```

### Screenshots

- Automatic screenshots on test failure
- Attached to Cucumber report

### Playwright Inspector

Add `await this.page.pause()` in any step to debug interactively:

```typescript
Then('I debug here', async function (this: CustomWorld) {
   await this.page!.pause(); // Opens Playwright Inspector
});
```

## Best Practices

1. **Keep feature files readable** - Write scenarios from user perspective
2. **Reuse step definitions** - Share common steps across features
3. **Use Page Object pattern** - For complex page interactions
4. **Wait for elements** - Use Playwright's auto-waiting features
5. **Independent scenarios** - Each scenario should run independently
6. **Meaningful assertions** - Use expect with clear failure messages
