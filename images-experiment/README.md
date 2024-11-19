# Responsive Image Component

A React component for handling responsive images with multiple source sets, loading states, and fallbacks.

## Features

- Responsive image loading with srcset support
- Loading skeleton state
- Error handling with customizable fallback
- Configurable aspect ratio
- Flexible object-fit options
- TypeScript support
- MSW integration for testing and development
- Storybook documentation
- Unit tests with Vitest

## Installation

```bash
npm install
```

## Development

```bash
# Start development server
npm run dev

# Run unit tests
npm run test

# Run Storybook
npm run storybook

# Lint code
npm run lint

# Format code
npm run format
```

## Usage

```tsx
import ResponsiveImage from '@/components/ResponsiveImage';

function App() {
  return (
    <ResponsiveImage
      sources={[
        { src: '/images/small.jpg', width: 400 },
        { src: '/images/medium.jpg', width: 800 },
        { src: '/images/large.jpg', width: 1200 },
      ]}
      alt="Description"
      aspectRatio={16 / 9}
      objectFit="cover"
      className="max-w-lg mx-auto"
    />
  );
}
```

## ResponsiveImage Props

| Prop        | Type                                    | Description                        |
|-------------|-----------------------------------------|------------------------------------|
| sources     | `Array<{ src: string, width: number }>` | Array of image sources with widths |
| alt         | string                                  | Alt text for the image             |
| aspectRatio | number                                  | Aspect ratio (default: 16/9)       |
| objectFit   | 'cover' \| 'contain' \| 'fill'          | How image should fit container     |
| className   | string                                  | Additional CSS classes             |
| fallbackSrc | string                                  | Fallback image URL for errors      |

## Testing

The project includes:

- Unit tests with Vitest and React Testing Library
- Storybook integration
- MSW for mocking image requests

## Project Structure

```
├── src/
│   ├── components/
│   │   └── ResponsiveImage/
│   │       ├── index.tsx
│   │       ├── ResponsiveImage.test.tsx
│   │       └── ResponsiveImage.stories.tsx
│   └── mocks/
│       ├── handlers.ts
│       └── browser.ts
├── .storybook/
└── public/
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Run tests and ensure they pass
4. Submit a pull request

## License

MIT
