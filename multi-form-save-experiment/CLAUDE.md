# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React 19 + TypeScript experiment using Vite (specifically rolldown-vite) for bundling. The project is set up as a minimal React application template.

## Commands

- `npm run dev` - Start development server with HMR
- `npm run build` - Type-check with TypeScript and build for production
- `npm run lint` - Run ESLint on the codebase
- `npm run preview` - Preview production build locally

## Tech Stack

- **React 19** with TypeScript
- **Vite** (using rolldown-vite variant) for dev server and bundling
- **ESLint 9** with flat config (`eslint.config.js`)
- **Node.js**: LTS/Krypton (v24.x) specified in `.nvmrc`

## Architecture

Standard Vite React template structure:

- `src/main.tsx` - Application entry point, renders App in StrictMode
- `src/App.tsx` - Root component
- `vite.config.ts` - Vite configuration with React plugin
- `tsconfig.json` - References app and node TypeScript configs

## TypeScript Configuration

Uses project references with separate configs:

- `tsconfig.app.json` - For source code (ES2022 target, strict mode enabled)
- `tsconfig.node.json` - For Node.js tooling files
