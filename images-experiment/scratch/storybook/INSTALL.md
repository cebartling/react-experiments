I'll show you how to add and configure Storybook for a React/Vite project.

First, run the Storybook initialization command:

```bash
npx storybook@latest init
```

After installation, let's update the Storybook configuration for optimal use with Vite and React:

```typescript
import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
    "@storybook/addon-viewport",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  core: {
    builder: "@storybook/builder-vite",
  },
  viteFinal: async (config) => {
    // Add any custom vite config here
    return config;
  },
};

export default config;

```

Create a preview file to set up global decorators and parameters:

```typescript
import type { Preview } from "@storybook/react";
import React from 'react';
import '../src/index.css'; // Your global styles

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
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
  decorators: [
    (Story) => (
      <div className="p-4">
        <Story />
      </div>
    ),
  ],
};

export default preview;

```

Let's also create an example story for your ResponsiveImage component:

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { ResponsiveImage } from './ResponsiveImage';

const meta = {
  title: 'Components/ResponsiveImage',
  component: ResponsiveImage,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    aspectRatio: {
      control: 'number',
      description: 'Aspect ratio of the image container',
      defaultValue: 16/9,
    },
    objectFit: {
      control: 'select',
      options: ['cover', 'contain', 'fill'],
      description: 'How the image should fit within its container',
      defaultValue: 'cover',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
    sources: {
      control: 'object',
      description: 'Array of image sources with their widths',
    },
    alt: {
      control: 'text',
      description: 'Alt text for the image',
      required: true,
    },
    fallbackSrc: {
      control: 'text',
      description: 'Fallback image source if main image fails to load',
    },
  },
} satisfies Meta<typeof ResponsiveImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    sources: [
      { src: '/api/placeholder/400/300', width: 400 },
      { src: '/api/placeholder/800/600', width: 800 },
      { src: '/api/placeholder/1200/900', width: 1200 },
    ],
    alt: 'Example image',
    aspectRatio: 16/9,
  },
};

export const Square: Story = {
  args: {
    ...Default.args,
    aspectRatio: 1,
  },
};

export const WithContainFit: Story = {
  args: {
    ...Default.args,
    objectFit: 'contain',
    className: 'bg-gray-100',
  },
};

export const ErrorState: Story = {
  args: {
    sources: [
      { src: 'nonexistent-image.jpg', width: 400 },
    ],
    alt: 'Image that will fail to load',
  },
};

export const CustomStyling: Story = {
  args: {
    ...Default.args,
    className: 'border-4 border-blue-500 rounded-lg overflow-hidden max-w-md mx-auto',
  },
};

export const Portrait: Story = {
  args: {
    ...Default.args,
    aspectRatio: 3/4,
  },
};

```

Add documentation for your component using MDX:

```markdown
import { Meta, Story, ArgTypes } from '@storybook/blocks';
import * as ResponsiveImageStories from './ResponsiveImage.stories';

<Meta of={ResponsiveImageStories} />

# ResponsiveImage

A flexible, responsive image component that handles different source sets, loading states, and fallbacks.

## Features

- Responsive image loading with srcset
- Loading skeleton state
- Error handling with fallback image
- Configurable aspect ratio
- Custom object-fit settings
- Customizable styling
- TypeScript support

## Usage

```tsx
import { ResponsiveImage } from './ResponsiveImage';

const MyComponent = () => (
  <ResponsiveImage
    sources={[
      { src: '/images/small.jpg', width: 400 },
      { src: '/images/large.jpg', width: 1200 },
    ]}
    alt="Description"
    aspectRatio={16/9}
    objectFit="cover"
    className="max-w-lg mx-auto"
  />
);
```

## Props

<ArgTypes of={ResponsiveImageStories} />

## Examples

### Default Usage

<Story of={ResponsiveImageStories.Default} />

### Square Aspect Ratio

<Story of={ResponsiveImageStories.Square} />

### With Contain Fit

<Story of={ResponsiveImageStories.WithContainFit} />

### Error State

<Story of={ResponsiveImageStories.ErrorState} />

```

Update your package.json scripts:

```json
{
  "scripts": {
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build",
    "test-storybook": "test-storybook"
  }
}

```

To run Storybook:
```bash
npm run storybook
```

For best practices, also add a .storybook/.babelrc:

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "node": "current"
        }
      }
    ],
    "@babel/preset-typescript",
    "@babel/preset-react"
  ]
}

```

Optional: Add test runner for Storybook interaction tests:
```bash
npm install -D @storybook/test-runner jest
```

And add to your package.json:
```json
{
  "scripts": {
    "test-storybook": "test-storybook"
  }
}
```

To ignore Storybook files in your production build, add to .gitignore:
```text
storybook-static
```

Would you like me to:
1. Add more complex story examples?
2. Show how to add custom decorators?
3. Set up visual regression testing?
4. Add Storybook addons for specific features?