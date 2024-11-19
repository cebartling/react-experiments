# Image Usage in Stories

This component can work with both real images and generated placeholders:

## Real Images
Place your images in the `public/images` directory:
```
public/images/
├── small.jpg  (400×300)
├── medium.jpg (800×600)
└── large.jpg  (1200×900)
```

Use them in stories like this:
```tsx
<ResponsiveImage
  sources={[
    { src: '/images/small.jpg', width: 400 },
    { src: '/images/medium.jpg', width: 800 },
    { src: '/images/large.jpg', width: 1200 },
  ]}
  alt="Description"
/>
```

## Placeholder Images
Generate placeholder images on the fly:
```tsx
<ResponsiveImage
  sources={[
    { src: '/api/placeholder/400/300', width: 400 },
    { src: '/api/placeholder/800/600', width: 800 },
  ]}
  alt="Description"
/>
```

## Mixed Usage
You can mix real images and placeholders:
```tsx
<ResponsiveImage
  sources={[
    { src: '/images/small.jpg', width: 400 },
    { src: '/api/placeholder/800/600', width: 800 },
    { src: '/images/large.jpg', width: 1200 },
  ]}
  alt="Description"
/>
```
