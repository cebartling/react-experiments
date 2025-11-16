# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MapLibre GL experiment - A React + TypeScript + Vite application for interactive mapping with cell tower visualization, persistent location state using IndexedDB, and comprehensive test coverage. This project demonstrates best practices for building modern React applications with state management, data fetching, and testing.

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

```bash
npm run test              # Run Vitest in watch mode
npm run test:ui           # Run Vitest with interactive UI
npm run test:coverage     # Run tests with coverage report (100% coverage expected)
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
│       ├── CellTowerLayer.tsx     # Cell tower visualization (MapLibre Source/Layer)
│       ├── LocationSearchForm.tsx # Coordinate input form with validation
│       └── MapStatusIndicators.tsx # Loading/error/success UI states
├── hooks/
│   └── useMapLocation.ts          # Map interaction logic (drag, fly-to)
├── stores/
│   └── locationStore.ts           # Zustand store with IndexedDB persistence
├── services/
│   └── cellTowerService.ts        # SWR-based data fetching from OpenCelliD API
├── config/
│   └── mapStyles.ts               # MapLibre style configurations
└── test/
    └── setup.ts                   # Vitest test environment setup
```

### State Management

- **Zustand Store** (`locationStore.ts`): Centralized location state with IndexedDB persistence
   - Uses `localforage` for IndexedDB abstraction
   - Automatically persists location changes
   - Hydrates from storage on app load
   - Manages both actual location (lat/lon) and form input state (latInput/lonInput)

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
- **CellTowerLayer.tsx** - Converts cell tower data to GeoJSON and renders MapLibre Source/Layer components
- **LocationSearchForm.tsx** - Self-contained form with validation and glass morphism UI. Features:
   - Translucent frosted glass background using Tailwind's backdrop-blur
   - Blue button with pulsating glow on hover
   - Green success feedback (800ms timeout) on valid submission
   - Collapsible accordion interface
   - Connected directly to Zustand store
- **MapStatusIndicators.tsx** - Pure presentational component for displaying loading/error/success states

### State & Data

- **locationStore.ts** - Single source of truth for location state. Never duplicate this state elsewhere.
- **cellTowerService.ts** - Uses SWR for data fetching. API has a 4,000,000 sq.m (4 km²) area limit.

### Hooks

- **useMapLocation.ts** - Handles map ref interactions, flying to coordinates, and map drag events

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

### Test Framework

- **Vitest 4.0.9** with jsdom environment
- **@testing-library/react** for component testing
- **@testing-library/user-event** for user interaction simulation
- **100% code coverage** across all components, hooks, and stores

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

- Map styles are in `config/mapStyles.ts`
- Use MapRef for imperative map operations (flyTo, getCenter, etc.)
- Layer-specific logic goes in dedicated layer components (e.g., CellTowerLayer)
- Always check if mapRef.current exists before calling methods

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

## Future Considerations

When extending this project, consider:

- Additional map styles (street, terrain) - add to `config/mapStyles.ts`
- Cell tower filtering - extend CellTowerLayer with filter props
- Multiple locations/bookmarks - extend locationStore schema
- Offline support - consider service worker and map tile caching
- Popup details on click - add MapLibre popup component
- Route planning - new component + service layer

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
