# Asynchronous Image Loading with Suspense Fallback

## Overview

The solution provides a React component that handles asynchronous image loading with built-in support for responsive
images. At its core, it uses `React.lazy` for code splitting and integrates with React Suspense to show fallback content
while images are loading. The component implements a caching mechanism that stores both the loading state and the final
HTMLImageElement, preventing redundant network requests for previously loaded images.

The implementation follows the React Suspense pattern by _throwing promises during the loading phase_, which are caught by
the nearest Suspense boundary. This creates a seamless integration with React's concurrent features. The component
supports modern responsive image techniques through `srcSet` and `sizes` attributes, allowing for optimal image selection
based on device characteristics and viewport size. It also maintains type safety through TypeScript interfaces and
automatically propagates the loaded image's dimensions to the rendered img element. Error handling is built in, with
failed image loads being caught and propagated through the component hierarchy for proper error boundary handling.

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md)
  uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast
  Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or
  `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react';

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
});
```
