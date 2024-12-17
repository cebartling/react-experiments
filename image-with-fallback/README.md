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

## Running the demo

To run the demo, clone the repository and run the following commands:

```bash
cd image-with-fallback
nvm use   # You may need to install the correct Node.js version via nvm first
npm install
npm run dev
```
This will start the Vite dev server. Navigate to `http://localhost:5173` to see the demo in action.
