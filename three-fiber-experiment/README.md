# Three Fiber Experiment

An experimental React application for exploring 3D graphics with React Three Fiber and Three.js.

## Features

- **React 19** with TypeScript for type-safe development
- **React Router DOM** for client-side routing
- **React Three Fiber** for declarative 3D graphics with Three.js
- **Tailwind CSS** for utility-first styling
- **Vite** (rolldown-vite) for fast development and optimized builds
- **Dual Linting** with oxlint (fast) and ESLint (comprehensive)
- **Prettier** for consistent code formatting

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
```

### Code Quality

```bash
npm run lint         # Run oxlint + ESLint on all files
npm run lint:ox      # Run oxlint only (fast Rust-based linter)
npm run lint:eslint  # Run ESLint only
npm run format       # Format all files with Prettier
npm run format:check # Check if files are formatted correctly
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

### Core Framework
- React 19.2.0
- TypeScript 5.9.3
- React Router DOM 7.9.6

### 3D Graphics
- Three.js 0.181.2
- @react-three/fiber 9.4.0

### Build & Development
- Vite (rolldown-vite 7.2.6)
- PostCSS 8.5.6
- Autoprefixer 10.4.22

### Styling
- Tailwind CSS 4.1.17

### Code Quality
- oxlint 1.29.0 (Rust-based fast linter)
- ESLint 9.39.1 with TypeScript, React Hooks, React Refresh plugins
- Prettier 3.6.2

## Development Notes

### React Compiler

The React Compiler is not enabled on this project because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

### Tailwind CSS

Tailwind CSS is configured and ready to use. The utility classes are available throughout the application:

```tsx
// Example usage
<div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-600">
  <h1 className="text-4xl font-bold text-white">Hello Tailwind!</h1>
</div>
```

Configuration files:
- `tailwind.config.js` - Tailwind configuration (content paths, theme, plugins)
- `postcss.config.js` - PostCSS with Tailwind and Autoprefixer
- `src/index.css` - Includes Tailwind directives (`@tailwind base/components/utilities`)

### Linting Strategy

The project uses a dual-linting approach:

1. **oxlint** - Fast Rust-based linter that runs first for quick feedback
2. **ESLint** - Comprehensive linting with TypeScript and React-specific rules

When you run `npm run lint`, both linters execute in sequence. This provides:
- Speed from oxlint (written in Rust)
- Comprehensive checks from ESLint
- Prettier integration (no formatting conflicts)

### Code Formatting

Prettier is configured with:
- Single quotes
- Semicolons
- 2-space indentation
- 80 character line width

Run `npm run format` before committing to ensure consistent formatting.

## Expanding the ESLint Configuration

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
