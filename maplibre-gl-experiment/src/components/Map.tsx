import { useEffect, useRef } from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'

function Map() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<maplibregl.Map | null>(null)
  const initialized = useRef(false)

  useEffect(() => {
    // Prevent double initialization in React StrictMode
    if (initialized.current) return

    if (mapContainer.current) {
      initialized.current = true

      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style: 'https://demotiles.maplibre.org/style.json',
        center: [-93.5272, 44.7975], // Zip code 55379 - Shakopee, MN
        zoom: 12
      })

      // Add navigation controls
      map.current.addControl(new maplibregl.NavigationControl(), 'top-right')
    }

    return () => {
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [])

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-4">MapLibre GL Map</h1>
      <div
        ref={mapContainer}
        style={{ width: '100%', height: '600px' }}
        className="rounded-lg shadow-lg"
      />
    </div>
  )
}

export default Map
