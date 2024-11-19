import { http, HttpResponse } from 'msw';

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
  `.trim();

  return new Blob([svg], { type: 'image/svg+xml' });
};

// List of available real images
const REAL_IMAGES = new Set([
  '/images/small.jpg',
  '/images/medium.jpg',
  '/images/large.jpg',
]);

export const handlers = [
  // Handle placeholder requests
  http.get('/api/placeholder/:width/:height', async ({ params }) => {
    const width = parseInt(params.width as string);
    const height = parseInt(params.height as string);

    const svgBlob = createSVGPlaceholder(width, height);

    return new HttpResponse(svgBlob, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=31536000',
      },
    });
  }),

  // Handle real image requests
  http.get('/images/*', async ({ request }) => {
    const url = new URL(request.url);

    // Check if this is a real image
    if (REAL_IMAGES.has(url.pathname)) {
      // Pass through to the actual file in public directory
      return fetch(request);
    }

    // If not a real image, generate a placeholder
    const dimensions =
      url.pathname.split('/').pop()?.split('.')[0] ?? '400x300';
    const [width, height] = dimensions
      .split('x')
      .map((num) => parseInt(num) || 400);

    return new HttpResponse(createSVGPlaceholder(width, height), {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=31536000',
      },
    });
  }),
];
