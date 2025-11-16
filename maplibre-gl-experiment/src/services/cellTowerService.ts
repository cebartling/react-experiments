import useSWR from 'swr'

export interface CellTower {
  lat: number
  lon: number
  mcc: number
  mnc: number
  lac: number
  cellid: number
  radio: string
  range: number
  samples: number
  changeable: number
  created: number
  updated: number
  averageSignal: number
}

export interface BoundingBox {
  latMin: number
  lonMin: number
  latMax: number
  lonMax: number
}

const API_BASE_URL = 'https://opencellid.org/cell'

/**
 * Fetches cell towers within a geographic bounding box from OpenCelliD API
 * @param bbox - The bounding box to query
 * @param limit - Maximum number of towers to return (max 50)
 * @returns Promise<CellTower[]>
 */
export async function fetchCellTowersInArea(
  bbox: BoundingBox,
  limit: number = 50
): Promise<CellTower[]> {
  const apiKey = import.meta.env.VITE_OPENCELLID_API_KEY

  if (!apiKey) {
    console.warn('OpenCelliD API key not configured. Please add VITE_OPENCELLID_API_KEY to your .env file')
    return []
  }

  // BBOX format: latmin,lonmin,latmax,lonmax
  const bboxParam = `${bbox.latMin},${bbox.lonMin},${bbox.latMax},${bbox.lonMax}`

  const url = new URL(`${API_BASE_URL}/getInArea`)
  url.searchParams.append('key', apiKey)
  url.searchParams.append('BBOX', bboxParam)
  url.searchParams.append('format', 'json')
  url.searchParams.append('limit', Math.min(limit, 50).toString())

  try {
    const response = await fetch(url.toString())

    if (!response.ok) {
      if (response.status === 429) {
        throw new Error('API rate limit exceeded. Daily limit is 1000 requests.')
      }
      throw new Error(`API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()

    // The API returns either an object with a 'cells' array or directly an array
    const towers = data.cells || data

    if (!Array.isArray(towers)) {
      console.warn('Unexpected API response format:', data)
      return []
    }

    return towers
  } catch (error) {
    console.error('Failed to fetch cell towers:', error)
    throw error
  }
}

/**
 * Calculates a bounding box around a center point
 * @param lat - Center latitude
 * @param lon - Center longitude
 * @param radiusKm - Radius in kilometers
 * @returns BoundingBox
 */
export function calculateBoundingBox(
  lat: number,
  lon: number,
  radiusKm: number = 10
): BoundingBox {
  // Approximate conversion: 1 degree latitude ≈ 111 km
  // Longitude varies by latitude
  const latDelta = radiusKm / 111
  const lonDelta = radiusKm / (111 * Math.cos((lat * Math.PI) / 180))

  return {
    latMin: lat - latDelta,
    lonMin: lon - lonDelta,
    latMax: lat + latDelta,
    lonMax: lon + lonDelta
  }
}

/**
 * Custom SWR hook for fetching cell towers in an area
 * @param latitude - Center latitude
 * @param longitude - Center longitude
 * @param radiusKm - Radius in kilometers (default: 0.9)
 * @param limit - Maximum number of towers to return (default: 50)
 * @returns SWR response with cell towers data
 */
export function useCellTowers(
  latitude: number,
  longitude: number,
  radiusKm: number = 0.9,
  limit: number = 50
) {
  const key = latitude && longitude
    ? `cell-towers-${latitude.toFixed(4)}-${longitude.toFixed(4)}-${radiusKm}-${limit}`
    : null

  return useSWR(
    key,
    async () => {
      const bbox = calculateBoundingBox(latitude, longitude, radiusKm)
      return fetchCellTowersInArea(bbox, limit)
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 60000 // Dedupe requests within 60 seconds
    }
  )
}
