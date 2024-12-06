import type { Preview } from '@storybook/react';
import { createGlobalStyle } from 'styled-components';
import { withThemeFromJSXProvider } from '@storybook/addon-themes';

const GlobalStyles = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        font-family: 'Arial', sans-serif;
        background-color: #f5f5f5;
    }

    h1 {
        color: #333;
    }

    a {
        text-decoration: none;
        color: inherit;
    }
`;

export const decorators = [
  withThemeFromJSXProvider({
    GlobalStyles,
  }),
];

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
