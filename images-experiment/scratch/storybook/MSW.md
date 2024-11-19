I'll help you set up MSW (Mock Service Worker) with Storybook to serve mock images for your stories.

First, install the required dependencies:

```bash
npm install -D msw msw-storybook-addon
```

1. First, let's create the MSW handlers:

```typescript
import { http, HttpResponse } from 'msw'

// Helper function to create a simple SVG placeholder
const createSVGPlaceholder = (width: number, height: number) => {
  const svg = `
    <svg 
      width="${width}" 
      height="${height}" 
      viewBox="0 0 ${width} ${height}" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="100%" height="100%" fill="#e2e8f0"/>
      <text 
        x="50%" 
        y="50%" 
        font-family="Arial" 
        font-size="16" 
        fill="#64748b" 
        text-anchor="middle" 
        dy=".3em"
      >
        ${width} × ${height}
      </text>
    </svg>
  `
  return svg.trim()
}

export const handlers = [
  // Handle placeholder image requests
  http.get('/api/placeholder/:width/:height', ({ params }) => {
    const width = parseInt(params.width as string)
    const height = parseInt(params.height as string)
    
    const svg = createSVGPlaceholder(width, height)
    
    return new HttpResponse(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=31536000',
      },
    })
  }),

  // Handle specific image paths
  http.get('/images/:size.jpg', ({ params }) => {
    const [width, height] = (params.size as string).split('x').map(Number)
    const svg = createSVGPlaceholder(width || 400, height || 300)
    
    return new HttpResponse(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=31536000',
      },
    })
  }),
]

```

2. Create an MSW initialization file:

```typescript
import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

export const worker = setupWorker(...handlers)

```

3. Update your Storybook main configuration:

```typescript
import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
    "msw-storybook-addon",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: true,
  },
  staticDirs: ['../public'], // If you have a public directory
};

export default config;

```

4. Update your Storybook preview file:

```typescript
import type { Preview } from "@storybook/react";
import { initialize, mswLoader } from 'msw-storybook-addon';

// Initialize MSW
initialize();

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    msw: {
      handlers: {
        // You can add story-specific handlers here
      },
    },
  },
  loaders: [mswLoader],
};

export default preview;

```

5. Now update your ResponsiveImage stories to use MSW:

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { handlers } from '../../mocks/handlers';
import { ResponsiveImage } from './ResponsiveImage';

const meta = {
  title: 'Components/ResponsiveImage',
  component: ResponsiveImage,
  parameters: {
    layout: 'centered',
    msw: {
      handlers: handlers,
    },
  },
  tags: ['autodocs'],
  argTypes: {
    aspectRatio: {
      control: 'number',
      description: 'Aspect ratio of the image container',
    },
    objectFit: {
      control: 'select',
      options: ['cover', 'contain', 'fill'],
      description: 'How the image should fit within its container',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
} satisfies Meta<typeof ResponsiveImage>;

export default meta;
type Story = StoryObj<typeof meta>;

// Example stories using MSW-handled images
export const Default: Story = {
  args: {
    sources: [
      { src: '/api/placeholder/400/300', width: 400 },
      { src: '/api/placeholder/800/600', width: 800 },
      { src: '/api/placeholder/1200/900', width: 1200 },
    ],
    alt: 'Responsive placeholder image',
    aspectRatio: 16/9,
  },
};

export const Square: Story = {
  args: {
    sources: [
      { src: '/api/placeholder/400/400', width: 400 },
      { src: '/api/placeholder/800/800', width: 800 },
      { src: '/api/placeholder/1200/1200', width: 1200 },
    ],
    alt: 'Square placeholder image',
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

export const Portrait: Story = {
  args: {
    sources: [
      { src: '/api/placeholder/300/400', width: 300 },
      { src: '/api/placeholder/600/800', width: 600 },
      { src: '/api/placeholder/900/1200', width: 900 },
    ],
    alt: 'Portrait placeholder image',
    aspectRatio: 3/4,
  },
};

export const CustomSizes: Story = {
  args: {
    sources: [
      { src: '/images/400x300.jpg', width: 400 },
      { src: '/images/800x600.jpg', width: 800 },
      { src: '/images/1200x900.jpg', width: 1200 },
    ],
    alt: 'Custom sized placeholder image',
    aspectRatio: 4/3,
  },
};

```

6. For TypeScript support, create a type declaration file:

```typescript
declare namespace MSW {
  interface ResponseComposition {
    new (body?: BodyInit | null, init?: ResponseInit): Response;
  }
}

```

Now you can run Storybook and the images will be served by MSW:

```bash
npm run storybook
```

The setup provides:
1. Placeholder images with customizable dimensions
2. SVG-based placeholders with size information
3. Cached responses for better performance
4. Support for both direct placeholder URLs and image paths
5. TypeScript support
6. Story-specific MSW handlers

You can customize the placeholder images by modifying the `createSVGPlaceholder` function. For example, you could:
- Add different background colors
- Include patterns or gradients
- Add more metadata to the placeholder
- Use different text styles

Would you like me to:
1. Add more complex image handling scenarios?
2. Show how to add different types of placeholders?
3. Add error simulation handlers?
4. Create more sophisticated mock responses?