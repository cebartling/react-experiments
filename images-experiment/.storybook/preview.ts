import type { Preview } from '@storybook/react';
import { initialize, mswLoader } from 'msw-storybook-addon';

// Initialize MSW
initialize({
  serviceWorker: {
    url: '/mockServiceWorker.js',
  },
});

const preview: Preview = {
  decorators: [(Story) => Story()],
  loaders: [mswLoader],
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    msw: {
      handlers: [],
    },
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: {
            width: '360px',
            height: '640px',
          },
        },
        tablet: {
          name: 'Tablet',
          styles: {
            width: '768px',
            height: '1024px',
          },
        },
        desktop: {
          name: 'Desktop',
          styles: {
            width: '1280px',
            height: '1024px',
          },
        },
      },
    },
  },
};

export default preview;
