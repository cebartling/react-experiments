# Three Fiber Experiment

An experimental React application for exploring 3D graphics with React Three Fiber and Three.js.

## Features

- **React 19** with TypeScript for type-safe development
- **React Router DOM** for client-side routing
- **React Three Fiber** for declarative 3D graphics with Three.js
- **Vite** (rolldown-vite) for fast development and optimized builds
- **ESLint** configured with TypeScript, React Hooks, and React Refresh rules

## Getting Started

### Prerequisites

This project uses Node.js LTS/Krypton (Node 18). If you have nvm installed:

```bash
nvm use
```

### Installation

```bash
npm install
```

### Development

```bash
npm run dev          # Start dev server with HMR at http://localhost:5173
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## Project Structure

- **/** - Home route with the default Vite + React template
- **/first** - Demo route featuring an interactive 3D scene with a rotating box

## 3D Scene Features

The `/first` route demonstrates:
- Animated rotating 3D cube
- Interactive hover effects (color changes)
- Click to scale animation
- Multiple light sources for realistic rendering
- Full viewport 3D canvas

## Tech Stack

- React 19.2.0
- TypeScript 5.9.3
- React Router DOM
- Three.js
- @react-three/fiber
- Vite (rolldown-vite 7.2.2)

## React Compiler

The React Compiler is not enabled on this project because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
