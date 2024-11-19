import { http, HttpResponse } from 'msw'

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
  `.trim()

  return new Blob([svg], { type: 'image/svg+xml' })
}

export const handlers = [
  http.get('/api/placeholder/:width/:height', async ({ params }) => {
    const width = parseInt(params.width as string)
    const height = parseInt(params.height as string)
    
    const svgBlob = createSVGPlaceholder(width, height)
    
    return new HttpResponse(svgBlob, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=31536000',
      },
    })
  }),

  http.get('/images/:filename', async ({ params }) => {
    const filename = params.filename as string
    const [width, height] = filename.split('x').map(num => parseInt(num))
    
    const svgBlob = createSVGPlaceholder(width || 400, height || 300)
    
    return new HttpResponse(svgBlob, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=31536000',
      },
    })
  })
]
