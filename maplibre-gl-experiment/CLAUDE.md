# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MapLibre GL experiment - A React + TypeScript + Vite application for interactive mapping with cell tower visualization featuring intelligent clustering, persistent location state using IndexedDB, drag-to-reposition with visual crosshair feedback, and comprehensive test coverage. This project demonstrates best practices for building modern React applications with state management, data fetching, and testing.

## Build Tool

This project uses **rolldown-vite** (version 7.2.5), not standard Vite. Rolldown is a Rust-powered bundler that replaces standard Vite. The project explicitly overrides the standard vite package with `npm:rolldown-vite@7.2.5` in package.json.

## Common Commands

### Development

```bash
npm run dev          # Start development server with HMR
npm run preview      # Preview production build locally
```

### Building

```bash
npm run build        # Type-check with tsc and build for production
```

### Testing

#### Unit Tests

```bash
npm run test              # Run Vitest in watch mode
npm run test:ui           # Run Vitest with interactive UI
npm run test:coverage     # Run tests with coverage report (100% coverage expected)
```

#### E2E Tests

```bash
npm run playwright:install   # Install Playwright browsers (first time only)
npm run test:e2e             # Run E2E acceptance tests (headless)
npm run test:e2e:headed      # Run E2E tests with browser UI (for debugging)
```

### Code Quality

```bash
npm run lint              # Run ESLint on the codebase
npm run format            # Format code with Prettier
npm run format:check      # Check code formatting without writing
```

## Architecture

### Component Structure

The application follows a modular architecture with clear separation of concerns:

```
src/
├── components/
│   ├── Map.tsx                    # Main orchestrator component (keep minimal)
│   └── map/
│       ├── BaseLayerControl.tsx   # Layer switcher (street/satellite/hybrid) [deprecated]
│       ├── BaseLayerSelector.tsx  # Layer switcher component (modular)
│       ├── CellTowerInfo.tsx      # Cell tower count display with loading/error states
│       ├── CellTowerLayer.tsx     # Cell tower visualization with clustering
│       ├── ControlsContainer.tsx  # Accordion container for all map controls
│       ├── Crosshair.tsx          # Crosshair marker showing map center during drag
│       ├── LocationSearchForm.tsx # Coordinate input form with validation
│       └── MapStatusIndicators.tsx # Loading/error/success UI states [deprecated]
├── hooks/
│   └── useMapLocation.ts          # Map interaction logic (drag, fly-to, drag state)
├── stores/
│   └── locationStore.ts           # Zustand store with IndexedDB persistence
├── services/
│   └── cellTowerService.ts        # SWR-based data fetching from OpenCelliD API
├── config/
│   └── mapStyles.ts               # MapLibre style configurations (street/satellite/hybrid)
└── test/
    └── setup.ts                   # Vitest test environment setup
```

### State Management

- **Zustand Store** (`locationStore.ts`): Centralized location and map preferences state with IndexedDB persistence
   - Uses `localforage` for IndexedDB abstraction
   - Automatically persists location and base layer changes
   - Hydrates from storage on app load
   - Manages both actual location (lat/lon) and form input state (latInput/lonInput)
   - Manages selected base layer (street/satellite/hybrid)

- **SWR** (`cellTowerService.ts`): Data fetching with automatic caching
   - Fetches cell towers from OpenCelliD API
   - Automatic revalidation on focus/reconnect
   - Exponential backoff on errors
   - Deduplicates requests

### Key Patterns

1. **Separation of Concerns**: Components are small and focused on a single responsibility
2. **Custom Hooks**: `useMapLocation` encapsulates map interaction logic
3. **Configuration Files**: Map styles and constants extracted to `config/`
4. **Persistent State**: Location state survives page reloads via IndexedDB
5. **Form vs. Actual State**: Separate input state from committed location state

## Project Structure Details

### Components

- **Map.tsx** - Main container. Keep this minimal - it should only orchestrate child components. Logic should be extracted to hooks or child components.
- **ControlsContainer.tsx** - Accordion container for map controls. Features:
   - Collapsible accordion with expand/collapse toggle
   - Glass morphism styling (translucent background with backdrop blur)
   - Accepts children components for flexible composition
   - Starts expanded by default
   - Smooth transition animations
- **LocationSearchForm.tsx** - Coordinate input form (refactored to be focused). Features:
   - Latitude/longitude input fields with validation (-90 to 90, -180 to 180)
   - Blue submit button with pulsating glow on hover
   - Green success feedback (800ms timeout) on valid submission
   - Connected directly to Zustand store
   - No longer handles accordion or layer switching (moved to separate components)
- **BaseLayerSelector.tsx** - Layer switcher component. Features:
   - Three base layer options: Street, Satellite, Hybrid
   - Active layer highlighted with blue glow
   - Persists selection to IndexedDB via store
   - Icon and label for each layer type
   - Glass morphism interactive buttons
- **CellTowerInfo.tsx** - Cell tower count display. Features:
   - Displays cell tower count with proper pluralization
   - Loading state: "Loading cell towers..." with blue styling
   - Error state: Error message with red styling
   - Success state: Count display in white text
   - Uses SWR hook (deduped with Map.tsx)
- **CellTowerLayer.tsx** - Cell tower visualization with intelligent clustering. Features:
   - **MapLibre Native Clustering**: Uses built-in GeoJSON clustering for performance
   - **Three-Layer System**:
     - `clusters`: Clustered markers with graduated sizing and color-coding
     - `cluster-count`: Text labels showing count in each cluster
     - `unclustered-point`: Individual cell tower markers (red with white border)
   - **Clustering Configuration**:
     - `cluster: true` - Enables clustering
     - `clusterMaxZoom: 14` - Clusters break apart at zoom level 14+
     - `clusterRadius: 50` - Markers within 50 pixels cluster together
   - **Visual Design**:
     - Cluster size: 20px (1-10 towers), 30px (10-30 towers), 40px (30+ towers)
     - Cluster color: Blue (#51bbd6) small, Yellow (#f1f075) medium, Pink (#f28cb1) large
     - Count labels: Black text centered on clusters
     - Individual markers: Red (#FF6B6B) circles with white borders
   - **Zoom Behavior**: Automatically groups nearby towers when zooming out, expands on zoom in
   - Converts cell tower data to GeoJSON format with properties (cellid, radio, mcc, mnc, range)
- **BaseLayerControl.tsx** - [DEPRECATED] Original monolithic layer switcher (replaced by BaseLayerSelector)
- **Crosshair.tsx** - Visual feedback component for map center during drag operations. Features:
   - Red crosshair with center circle
   - Pulsating animation using Tailwind's `animate-pulse` for visual prominence
   - Real-time coordinate popup displaying latitude/longitude (formatted to 4 decimal places)
   - Popup positioned at bottom-right of crosshair with dark semi-transparent background
   - Receives `latitude` and `longitude` props that update in real-time during drag
   - Only visible during map dragging (controlled by `visible` prop)
   - Absolutely positioned at map center with pointer-events-none
   - Simple, pure presentational component
- **MapStatusIndicators.tsx** - [DEPRECATED] Pure presentational component for displaying loading/error/success states (replaced by inline display in CellTowerInfo)

### State & Data

- **locationStore.ts** - Single source of truth for location state. Never duplicate this state elsewhere.
- **cellTowerService.ts** - Uses SWR for data fetching. API has a 4,000,000 sq.m (4 km²) area limit.

### Hooks

- **useMapLocation.ts** - Handles map ref interactions, flying to coordinates, and map drag events. Features:
   - `handleDragStart`: Sets dragging state to show crosshair
   - `handleMove`: Updates `currentCenter` state in real-time during drag for live coordinate display
   - `handleMoveEnd`: Updates location on drag end, hides crosshair
   - `isDragging`: Boolean state indicating if user is currently dragging
   - `currentCenter`: Object with `lat` and `lng` properties tracking real-time map center during drag
   - `isUserDragging` ref: Prevents `flyTo` animation during user drag (avoids conflicts)
   - Uses timeout to reset drag flag after moveEnd to allow programmatic location changes

## TypeScript Configuration

The project uses TypeScript project references with three config files:

- **tsconfig.json** - Root config that references app and node configs
- **tsconfig.app.json** - Application code config (src/ directory)
   - Target: ES2022
   - Module resolution: bundler mode
   - Strict mode enabled with strict linting rules
   - JSX: react-jsx
- **tsconfig.node.json** - Build tooling config (Vite configuration files)

## Testing

### Unit Testing (Vitest)

- **Vitest 4.0.9** with jsdom environment
- **@testing-library/react** for component testing
- **@testing-library/user-event** for user interaction simulation
- **100% code coverage** across all components, hooks, and stores
- **100 passing tests** across 10 test files

### E2E Testing (Playwright + Cucumber)

The project includes comprehensive end-to-end acceptance tests using Playwright for browser automation and Cucumber.js for BDD-style testing.

#### Technology Stack

- **Playwright 1.56.1** - Browser automation library
- **Cucumber.js 12.2.0** - BDD test framework
- **Gherkin syntax** - Human-readable test specifications
- **Cross-browser testing**: Chromium, Firefox, WebKit
- **ts-node 10.9.2** - TypeScript execution for test files

#### Test Structure

```
e2e/
├── features/
│   ├── map-navigation.feature    # Map interaction scenarios
│   └── cell-towers.feature       # Cell tower visualization scenarios
├── steps/
│   ├── common.steps.ts           # Shared step definitions
│   ├── map-navigation.steps.ts  # Map-specific steps
│   └── cell-towers.steps.ts     # Cell tower-specific steps
└── support/
    ├── hooks.ts                  # Before/After hooks, screenshots
    ├── world.ts                  # Custom World with Playwright context
    └── server.ts                 # Dev server lifecycle management
```

#### Test Coverage

**Map Navigation** (`e2e/features/map-navigation.feature`):
- **Default location**: Verifies map centers on Shakopee, MN on initial load
- **Location search**: Tests coordinate input (lat/lon) with form submission and map flyTo animation
- **Drag interactions**:
  - Pulsating crosshair appears during drag
  - Real-time coordinate popup displays current lat/lon
  - Crosshair disappears on drag release
  - Location persists to IndexedDB after drag
- **Zoom controls**: Zoom in/out while maintaining stable map center
- **Layer switching**: Switch between Street, Satellite, and Hybrid layers with visual feedback

**Cell Tower Visualization** (`e2e/features/cell-towers.feature`):
- **Initial render**: Cell tower markers display on map load
- **Tower count**: Display and update tower count in UI
- **Location updates**: Towers refresh when user searches new location
- **Loading states**: "Loading cell towers..." message during fetch
- **Data persistence**: Tower data updates correctly across location changes

#### Test Execution

The E2E test suite runs with the following features:

1. **Dev Server Automation** (`e2e/support/server.ts`):
   - Automatically finds available port using `portfinder`
   - Starts Vite dev server before tests
   - Waits for server readiness (checks `http://localhost:PORT`)
   - Gracefully shuts down after all tests complete
   - Handles cleanup on process exit

2. **Screenshot Capture** (`e2e/support/hooks.ts`):
   - Automatic screenshot on test failure
   - Saved to `e2e/reports/screenshots/`
   - Named with timestamp and scenario name
   - Useful for debugging failing tests

3. **Browser Context** (`e2e/support/world.ts`):
   - Custom Cucumber World extends `IWorld`
   - Manages Playwright browser, context, and page instances
   - Provides typed access to page object for step definitions
   - Ensures proper cleanup between scenarios

4. **Cross-browser Testing**:
   - Configured to run on Chromium, Firefox, and WebKit
   - Parallel execution for faster test runs
   - Configurable via `cucumber.js` configuration

#### Running E2E Tests

```bash
# First time setup - install browsers
npm run playwright:install

# Run all E2E tests (headless mode)
npm run test:e2e

# Run with browser UI visible (debugging)
npm run test:e2e:headed

# Test reports and screenshots
# - Reports: e2e/reports/
# - Screenshots: e2e/reports/screenshots/
```

#### Writing New E2E Tests

When adding new acceptance tests:

1. **Create feature file** in `e2e/features/` using Gherkin syntax:
   ```gherkin
   Feature: Feature Name
     As a user
     I want to perform an action
     So that I can achieve a goal

     Scenario: Scenario description
       Given precondition
       When action
       Then expected outcome
   ```

2. **Implement step definitions** in `e2e/steps/`:
   - Use `this.page` to access Playwright page object
   - Follow existing patterns for element selection
   - Add assertions using Playwright's `expect`
   - Reuse common steps from `common.steps.ts`

3. **Test best practices**:
   - Use data-testid attributes for reliable element selection
   - Wait for elements with `waitForSelector` before interaction
   - Test user journeys, not implementation details
   - Keep scenarios focused and independent
   - Use Background for common preconditions
   - Add meaningful error messages to assertions

Example step definition:
```typescript
When('I click the {string} button', async function (buttonText: string) {
  await this.page.waitForSelector(`button:has-text("${buttonText}")`);
  await this.page.click(`button:has-text("${buttonText}")`);
});

Then('I should see {string}', async function (text: string) {
  await expect(this.page.locator(`text=${text}`)).toBeVisible();
});
```

### Testing Patterns

1. **Mocking**:
   - `localforage` is mocked in test setup (`src/test/setup.ts`)
   - MapLibre components are mocked using simple div wrappers in tests
   - Zustand store is mocked using `vi.mock()` for component tests

2. **Test Organization**:
   - Test files are co-located with source files: `Component.tsx` → `Component.test.tsx`
   - Tests are organized into `describe` blocks by functionality
   - Use `beforeEach` to reset mocks and state

3. **Coverage Configuration** (`vite.config.ts`):
   - Provider: v8
   - Excluded: node_modules, test files, type definitions, config files, dist, main.tsx
   - Reporters: text, json, html

### Writing New Tests

When adding new components or features:

1. Create test file alongside source file
2. Mock external dependencies (APIs, storage, etc.)
3. Test user interactions, not implementation details
4. Aim for 100% coverage
5. Test error states and edge cases
6. Use fake timers (`vi.useFakeTimers()`) for testing timeouts and animations
7. Always reset to real timers in `beforeEach` to prevent test interference

Example test structure:

```typescript
describe('ComponentName', () => {
   beforeEach(() => {
      vi.clearAllMocks();
      vi.useRealTimers(); // Ensure clean slate for each test
   });

   it('should render correctly', () => {
      // Arrange, Act, Assert
   });

   it('should handle user interaction', async () => {
      const user = userEvent.setup();
      // Test interaction
   });

   it('should handle errors gracefully', () => {
      // Test error scenarios
   });

   it('should handle timed transitions', async () => {
      vi.useFakeTimers();
      // Test with fake timers
      act(() => {
         // Trigger state change
      });
      await act(async () => {
         vi.advanceTimersByTime(800);
      });
      // Assert final state
      vi.useRealTimers();
   });
});
```

## ESLint Configuration

The project uses ESLint 9.x with the new flat config format (eslint.config.js). Configuration includes:

- TypeScript ESLint
- React Hooks plugin
- React Refresh plugin
- Prettier integration (via eslint-config-prettier)

## Important Dependencies

### Core

- **React 19.2.0** - Latest React with new features
- **MapLibre GL 5.13.0** - Open-source mapping library
- **@vis.gl/react-maplibre 8.1.0** - React bindings for MapLibre

### State & Data

- **Zustand 5.0.8** - Lightweight state management (prefer over Context API for global state)
- **SWR 2.3.6** - Data fetching and caching (use for all API calls)
- **localforage 1.10.0** - IndexedDB wrapper (easier than raw IndexedDB API)

### Styling

- **Tailwind CSS 4.1.17** - Utility-first CSS (use for all styling)

## API Integration

### OpenCelliD API

- **Endpoint**: `https://opencellid.org/cell/getInArea`
- **Rate Limits**: Area search limited to 4,000,000 sq.m (4 km²)
- **Current Configuration**: 0.9km radius = ~3.24 km² (safely under limit)
- **Response**: Returns cell tower data with cellid, radio type, MCC, MNC, lat, lon, range

### Cell Tower Service

The `cellTowerService.ts` uses SWR with the following configuration:

- Revalidate on focus: true
- Dedupe interval: 2000ms
- Error retry with exponential backoff

## Development Guidelines

### When Adding Features

1. **Create components in `components/map/`** for map-related features
2. **Extract logic to hooks** when it involves multiple stateful operations
3. **Add to Zustand store** if state needs to persist or be shared globally
4. **Use SWR** for all data fetching (don't use raw fetch/axios)
5. **Write tests first** or immediately after implementation
6. **Keep Map.tsx minimal** - it should only compose child components

### When Modifying State

- Location state lives in `locationStore.ts` - always use the store, never duplicate state
- Form inputs have separate state (latInput/lonInput) from committed location (latitude/longitude)
- All location changes should persist to IndexedDB via store actions
- Never directly call localforage outside of the store

### When Working with MapLibre

- Map styles are in `config/mapStyles.ts` - three styles available: street, satellite, hybrid
- Use `getStyleByType()` helper function to get style object from base layer type
- Use MapRef for imperative map operations (flyTo, getCenter, etc.)
- Layer-specific logic goes in dedicated layer components (e.g., CellTowerLayer)
- Always check if mapRef.current exists before calling methods
- Base layer changes trigger automatic map re-render with new style

### When Working with Clustering

- **Use MapLibre Native Clustering**: Set `cluster={true}` on GeoJSON Source for automatic clustering
- **Configure Clustering Parameters**:
  - `clusterMaxZoom`: Zoom level where clusters break into individual points (e.g., 14)
  - `clusterRadius`: Pixel radius for grouping points into clusters (e.g., 50)
- **Three-Layer Pattern** for cluster visualization:
  1. Cluster layer: Circle layer with `filter: ['has', 'point_count']`
  2. Count label layer: Symbol layer showing `{point_count_abbreviated}`
  3. Unclustered layer: Circle layer with `filter: ['!', ['has', 'point_count']]`
- **Data-Driven Styling**: Use `['step', ['get', 'point_count'], ...]` for graduated sizing/coloring
- **TypeScript Filters**: Use `as any` type assertion for MapLibre expression arrays to avoid type errors
- **Performance**: MapLibre's native clustering is optimized for large datasets (thousands of points)
- **Testing**: Mock Source component to accept clustering props (cluster, clusterMaxZoom, clusterRadius)

### Code Style

- Use TypeScript strictly - no `any` types without good reason
- Prefer functional components and hooks
- Use Tailwind for styling (no CSS modules or styled-components)
- **Glass Morphism Pattern**: Use `bg-white/[opacity] backdrop-blur-[size]` for translucent UI elements
- **Interactive Feedback**: Use Tailwind's `hover:` modifiers, `transition-all`, and `animate-pulse` for user feedback
- **Timed State Changes**: Use `setTimeout` with state updates for temporary UI feedback (e.g., success indicators)
- Follow existing patterns for consistency
- Format code with Prettier before committing

## Common Pitfalls

1. **Don't bypass the store** - Always use locationStore for location state
2. **Don't forget IndexedDB persistence** - Location changes should auto-persist via store
3. **Don't ignore test coverage** - Maintain 100% coverage on core logic
4. **Don't duplicate SWR cache keys** - Use consistent keys in cellTowerService
5. **Don't skip validation** - LocationSearchForm validates coordinates (-90 to 90, -180 to 180)
6. **Check for null refs** - Always verify mapRef.current exists before use
7. **Import order** - Mock setup must be before imports in tests
8. **Fake timers in tests** - Always call `vi.useRealTimers()` in `beforeEach` to prevent timer pollution between tests
9. **Act warnings** - Wrap state updates and timer advances in `act()` when testing React components
10. **User drag vs programmatic flyTo** - Use the `isUserDragging` ref flag to prevent `flyTo` conflicts during user drag operations

## Future Considerations

When extending this project, consider:

- Additional map styles (terrain, topographic) - add to `config/mapStyles.ts` and update `BaseLayerType`
- Cell tower filtering - extend CellTowerLayer with filter props (e.g., by radio type)
- Multiple locations/bookmarks - extend locationStore schema
- Offline support - consider service worker and map tile caching
- Popup details on click - add MapLibre popup component showing tower details (cellid, radio, mcc, mnc, range)
- Route planning - new component + service layer
- Custom layer opacity controls - extend BaseLayerSelector with sliders
- Cluster expansion on click - add click handler to fly into cluster and expand
- Custom cluster icons - replace circles with SVG icons or images
- Heatmap visualization - alternative to clustering for density display

## Troubleshooting

### Tests Failing

- Check mock setup in `src/test/setup.ts`
- Ensure mocks are created before imports
- Verify IndexedDB mock is properly configured
- Check for act() warnings - wrap state updates in `act()`
- If tests timeout: Ensure `vi.useRealTimers()` is called in `beforeEach`
- For timer-based tests: Use `vi.useFakeTimers()` at test start, `vi.useRealTimers()` at end
- Wrap timer advances with `await act(async () => { vi.advanceTimersByTime(ms) })`

### Map Not Rendering

- Verify MapLibre CSS is imported in Map.tsx
- Check mapRef is properly initialized
- Ensure satellite style has correct tile URLs
- Verify WebGL support in browser

### State Not Persisting

- Check localforage instance configuration
- Verify store actions call setItem
- Check browser IndexedDB in DevTools
- Ensure hydration is called on mount

### Build Errors

- Remember this uses rolldown-vite, not standard Vite
- Check TypeScript strict mode compliance
- Verify all imports resolve correctly
- Run `npm run lint` to catch issues early
