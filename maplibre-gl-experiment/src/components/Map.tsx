import { useEffect, useRef } from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'

function Map() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<maplibregl.Map | null>(null)

  useEffect(() => {
    if (map.current) return // Initialize map only once

    if (mapContainer.current) {
      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style: 'https://demotiles.maplibre.org/style.json',
        center: [-74.5, 40],
        zoom: 9
      })

      // Add navigation controls
      map.current.addControl(new maplibregl.NavigationControl(), 'top-right')
    }

    return () => {
      map.current?.remove()
    }
  }, [])

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-4">MapLibre GL Map</h1>
      <div
        ref={mapContainer}
        className="w-full h-[600px] rounded-lg shadow-lg"
      />
    </div>
  )
}

export default Map
