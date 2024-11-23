import { Preview, StoryFn } from '@storybook/react';
import { ThemeProvider } from 'styled-components';

import { theme } from '../src/theme';

const withThemeProvider = (Story: StoryFn) => {
  return (
    <ThemeProvider theme={theme}>
      <Story />
    </ThemeProvider>
  );
};

const preview: Preview = {
  decorators: [withThemeProvider],
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
