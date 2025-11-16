# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MapLibre GL experiment - A React + TypeScript + Vite project for experimenting with MapLibre GL mapping library. This is a minimal Vite-based React application using React 19.2.0 and TypeScript.

## Build Tool

This project uses **rolldown-vite** (version 7.2.2), not standard Vite. Rolldown is a Rust-powered bundler that replaces standard Vite. The project explicitly overrides the standard vite package with `npm:rolldown-vite@7.2.2` in package.json.

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

### Linting
```bash
npm run lint         # Run ESLint on the codebase
```

## Project Structure

- **src/main.tsx** - Application entry point that renders the root App component in React StrictMode
- **src/App.tsx** - Main application component (currently a basic Vite + React template)
- **src/assets/** - Static assets (images, icons, etc.)
- **public/** - Public static files served at root

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

Based on git history mentioning "adding vitest", this project was set up to use Vitest for testing, though no test configuration files or test files currently exist in the repository.

## ESLint Configuration

The project uses ESLint 9.x with the new flat config format (eslint.config.js). Configuration includes:
- TypeScript ESLint
- React Hooks plugin
- React Refresh plugin

For production applications, the README suggests enabling type-aware lint rules by using `tseslint.configs.recommendedTypeChecked` or `strictTypeChecked`.
