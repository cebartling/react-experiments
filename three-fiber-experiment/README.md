# Three Fiber Experiment

An experimental React application for exploring 3D graphics with React Three Fiber and Three.js.

## Features

- **React 19** with TypeScript for type-safe development
- **React Router DOM** for client-side routing
- **React Three Fiber** for declarative 3D graphics with Three.js
- **@react-three/drei** for 3D scene helpers and utilities
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

## Routes

### `/` - Home
Default Vite + React template with navigation links

### `/first` - Rotating Cube Scene
Simple interactive 3D scene demonstrating:
- Animated rotating 3D cube using `useFrame`
- Interactive hover effects (color changes)
- Click to scale animation
- Basic lighting setup (ambient + spot + point lights)
- Full viewport 3D canvas

### `/second` - Downtown Cityscape
Complex 3D downtown scene featuring:
- **12 Buildings** with varying heights (5-15 units) and colors
- **Procedurally generated windows** on each building facade
- **Street system** with road markings (north-south and east-west streets)
- **Interactive hover effects** - buildings turn white and windows glow yellow
- **OrbitControls** for camera manipulation:
  - Click and drag to rotate view
  - Scroll to zoom in/out
  - Smooth damping for natural movement
- **Advanced lighting**:
  - Ambient light for base illumination
  - Directional light (sun-like)
  - Orange and blue point lights for atmospheric effects
- **Emissive materials** for realistic window glow
- **Tailwind CSS UI** with instructions overlay

### `/third` - Oil Refinery Complex
Industrial 3D refinery scene showcasing:
- **5 Storage Tanks** with realistic details:
  - Cylindrical bodies (2.5-3.2 radius, 5-7 height)
  - Spherical domed tops
  - Vertical ladders
  - Horizontal metal bands (torus geometry)
  - Metallic materials with high reflectivity
- **3 Distillation Towers** (most complex structures):
  - Tall cylindrical bodies (16-20 units)
  - 8 processing trays/platforms each
  - Side pipes extending from trays
  - Conical tops with exhaust pipes
  - **Animated flames** with emissive glow
  - **Dynamic point lights** from flames
  - Gentle rotation animation
  - Enhanced flame on hover
- **2 Cooling Towers**:
  - Hyperboloid shape (10 stacked cylinders)
  - Rising steam effects (semi-transparent spheres)
  - Concrete-like material
- **Pipeline Network**:
  - 6 major pipelines connecting structures
  - Ground-level and elevated pipes
  - Dynamic orientation calculations
- **Environmental Effects**:
  - Atmospheric fog for depth
  - Shadow casting enabled
  - Multiple light sources (directional + point lights)
  - Dark industrial atmosphere
- **Interactive Features**:
  - Hover effects on tanks (turn white)
  - Hover effects on towers (brighter flames)
  - OrbitControls with constraints
- **Tailwind CSS UI** with controls and feature list

## Tech Stack

### Core Framework
- React 19.2.0
- TypeScript 5.9.3
- React Router DOM 7.9.6

### 3D Graphics
- Three.js 0.181.2
- @react-three/fiber 9.4.0
- @react-three/drei 9.119.2 (OrbitControls, helpers, abstractions)

### Build & Development
- Vite (rolldown-vite 7.2.6)
- PostCSS 8.5.6

### Styling
- Tailwind CSS 4.1.17
- @tailwindcss/postcss (required for Tailwind v4)

### Code Quality
- oxlint 1.29.0 (Rust-based fast linter)
- ESLint 9.39.1 with TypeScript, React Hooks, React Refresh plugins
- Prettier 3.6.2

## Development Notes

### React Compiler

The React Compiler is not enabled on this project because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

### Tailwind CSS

Tailwind CSS v4 is configured and ready to use. The utility classes are available throughout the application:

```tsx
// Example usage (see /second route for real-world example)
<div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-600">
  <h1 className="text-4xl font-bold text-white">Hello Tailwind!</h1>
</div>
```

Configuration files:
- `tailwind.config.js` - Tailwind configuration (content paths, theme, plugins)
- `postcss.config.js` - PostCSS with `@tailwindcss/postcss` (required for v4)
- `src/index.css` - Includes Tailwind directives (`@tailwind base/components/utilities`)

**Note:** Tailwind v4 uses a different PostCSS plugin (`@tailwindcss/postcss`) instead of the standard `tailwindcss` plugin.

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
