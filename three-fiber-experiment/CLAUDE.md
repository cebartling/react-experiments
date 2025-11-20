# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React + TypeScript + Vite experiment project for exploring Three.js/React Three Fiber implementations. The project uses:
- React 19.2.0 with TypeScript
- React Router DOM for client-side routing
- Three.js and @react-three/fiber for 3D graphics
- @react-three/drei for 3D helpers (OrbitControls, etc.)
- Vite (using rolldown-vite@7.2.6 build tool)
- Tailwind CSS 4.1.17 for utility-first styling
- Strict TypeScript configuration
- Dual linting with oxlint and ESLint
- Prettier for code formatting

## Node Version

This project uses Node.js LTS/Krypton (Node 18). Use `nvm use` to switch to the correct version if you have nvm installed.

## Common Commands

### Development
```bash
npm run dev          # Start Vite dev server with HMR
npm run build        # TypeScript compilation + Vite production build
npm run preview      # Preview production build locally
```

### Code Quality
```bash
npm run lint         # Run oxlint + ESLint on all files
npm run lint:ox      # Run oxlint only (fast Rust-based linter)
npm run lint:eslint  # Run ESLint only
npm run format       # Format all files with Prettier
npm run format:check # Check if files are formatted correctly
```

## Build System

**Important:** This project uses `rolldown-vite@7.2.6` instead of standard Vite, configured via package.json overrides. The Rolldown bundler is used for better performance with React Fast Refresh via Babel/oxc.

When the build command runs, it performs:
1. TypeScript compilation with project references (`tsc -b`)
2. Vite production build

## TypeScript Configuration

The project uses TypeScript project references:
- `tsconfig.json` - Root configuration with references
- `tsconfig.app.json` - Application code configuration (src/)
- `tsconfig.node.json` - Node/build tools configuration

Key compiler options in tsconfig.app.json:
- Strict mode enabled
- `noUnusedLocals` and `noUnusedParameters` enforced
- `erasableSyntaxOnly` enabled (React 19 feature)
- `noUncheckedSideEffectImports` enabled
- JSX mode: `react-jsx`

## Code Quality Tools

### Linting (Dual Strategy)

The project uses a dual-linting approach for optimal speed and coverage:

1. **oxlint** (`.oxlintrc.json`) - Fast Rust-based linter that runs first
   - TypeScript rules
   - React rules
   - Import statement rules
   - JSX accessibility (a11y) rules
   - Correctness, performance, and suspicious code detection

2. **ESLint** (`eslint.config.js`) - Comprehensive linting with flat config
   - TypeScript ESLint recommended rules
   - React Hooks plugin (flat config)
   - React Refresh plugin for Vite
   - Prettier integration (disables conflicting rules)
   - Global ignores for `dist/`

### Formatting

**Prettier** (`.prettierrc`) - Consistent code formatting
- Single quotes
- Semicolons enabled
- 2-space indentation
- 80 character line width
- ES5 trailing commas
- LF line endings

### Styling

**Tailwind CSS** - Utility-first CSS framework (v4)
- Configuration: `tailwind.config.js`
- PostCSS integration: `postcss.config.js` (uses `@tailwindcss/postcss` for v4)
- Content paths: `index.html` and all files in `src/**/*.{js,ts,jsx,tsx}`
- Note: Tailwind v4 requires the `@tailwindcss/postcss` package instead of the standard postcss plugin

## Project Structure

```
src/
  main.tsx        # Application entry point with React 19 createRoot
  App.tsx         # Main application component with React Router setup
  App.css         # Application styles
  index.css       # Global styles with Tailwind directives
  assets/         # Static assets (images, etc.)
  routes/
    First.tsx     # Demo route: Simple rotating cube with interactions
    Second.tsx    # Demo route: Downtown scene with 12 buildings
```

**Configuration files:**
- `.prettierrc` - Prettier formatting rules
- `.prettierignore` - Files to exclude from formatting
- `.oxlintrc.json` - Oxlint linting configuration
- `eslint.config.js` - ESLint flat config
- `tailwind.config.js` - Tailwind CSS configuration
- `postcss.config.js` - PostCSS with Tailwind and Autoprefixer
- `tsconfig.json` - TypeScript root configuration
- `tsconfig.app.json` - App-specific TypeScript config
- `tsconfig.node.json` - Build tools TypeScript config
- `vite.config.ts` - Vite configuration with React plugin

## Key Architectural Notes

- **React 19**: Uses React 19.2.0 with latest features (createRoot from react-dom/client)
- **StrictMode**: Application is wrapped in StrictMode in main.tsx
- **React Router**: BrowserRouter setup in App.tsx with route-based navigation
- **React Three Fiber**:
  - Canvas component wraps 3D scenes
  - useFrame hook for animation loops
  - Standard Three.js mesh, geometry, and material components as JSX
  - Interactive 3D objects with onClick/onPointerOver events
- **@react-three/drei**: Provides useful helpers and abstractions
  - OrbitControls for camera manipulation
  - Other utilities for common 3D patterns
- **Vite Plugin**: Uses @vitejs/plugin-react with Babel for Fast Refresh (via rolldown)
- **Module System**: ESM-only (type: "module" in package.json)
- **Import Extensions**: TypeScript allows importing .tsx/.ts extensions directly due to `allowImportingTsExtensions`
- **Styling**: Tailwind CSS utility classes are available throughout the application. The `index.css` file includes the three required Tailwind directives (`@tailwind base/components/utilities`)
- **Code Quality**: Runs oxlint before ESLint for fast initial checks. Prettier is configured to work alongside ESLint without conflicts.

## React Three Fiber Patterns

When working with 3D scenes:
- Components inside `<Canvas>` are part of the Three.js scene graph
- Use `useFrame` for per-frame animations (receives state and delta time)
- Mesh refs should be typed as `Mesh` from 'three'
- Geometry args are passed as arrays (e.g., `<boxGeometry args={[1, 1, 1]} />`)
- Material properties like color can be set directly as props
- Scene requires lighting (ambientLight, spotLight, pointLight, etc.) for materials to be visible

## 3D Scene Examples

### First Route (`/first`)
Simple interactive 3D scene demonstrating:
- Rotating cube animation using `useFrame`
- Hover state changes (color)
- Click interactions (scaling)
- Basic lighting setup

### Second Route (`/second`)
Complex downtown cityscape demonstrating:
- Multiple buildings (12 total) with varying heights and colors
- Procedurally generated building windows
- Street system with road markings
- Interactive hover effects (buildings glow, windows light up)
- OrbitControls for camera manipulation (click-drag to rotate, scroll to zoom)
- Multiple light sources for realistic rendering
- Emissive materials for window glow effects
- Tailwind CSS for UI overlay
