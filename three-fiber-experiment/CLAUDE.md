# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React + TypeScript + Vite experiment project intended for exploring Three.js/React Three Fiber implementations. The project uses:
- React 19.2.0 with TypeScript
- Vite (using rolldown-vite@7.2.2 build tool)
- Strict TypeScript configuration
- ESLint with TypeScript, React Hooks, and React Refresh plugins

## Node Version

This project uses Node.js LTS/Krypton (Node 18). Use `nvm use` to switch to the correct version if you have nvm installed.

## Common Commands

### Development
```bash
npm run dev          # Start Vite dev server with HMR
npm run build        # TypeScript compilation + Vite production build
npm run preview      # Preview production build locally
npm run lint         # Run ESLint on all files
```

## Build System

**Important:** This project uses `rolldown-vite@7.2.2` instead of standard Vite, configured via package.json overrides. The Rolldown bundler is used for better performance with React Fast Refresh via Babel/oxc.

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

## ESLint Configuration

Uses flat config (eslint.config.js) with:
- TypeScript ESLint recommended rules
- React Hooks plugin (flat config)
- React Refresh plugin for Vite
- Global ignores for `dist/`

## Project Structure

```
src/
  main.tsx        # Application entry point with React 19 createRoot
  App.tsx         # Main application component
  App.css         # Application styles
  index.css       # Global styles
  assets/         # Static assets (images, etc.)
```

## Key Architectural Notes

- **React 19**: Uses React 19.2.0 with latest features (createRoot from react-dom/client)
- **StrictMode**: Application is wrapped in StrictMode in main.tsx
- **Vite Plugin**: Uses @vitejs/plugin-react with Babel for Fast Refresh (via rolldown)
- **Module System**: ESM-only (type: "module" in package.json)
- **Import Extensions**: TypeScript allows importing .tsx/.ts extensions directly due to `allowImportingTsExtensions`
