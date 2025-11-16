import { Map as MapGL, NavigationControl } from '@vis.gl/react-maplibre'
import 'maplibre-gl/dist/maplibre-gl.css'

// Satellite style using free EOX Sentinel-2 cloudless imagery
const satelliteStyle = {
  version: 8 as const,
  sources: {
    'satellite': {
      type: 'raster' as const,
      tiles: [
        'https://tiles.maps.eox.at/wmts/1.0.0/s2cloudless-2020_3857/default/g/{z}/{y}/{x}.jpg'
      ],
      tileSize: 256,
      attribution: '© <a href="https://s2maps.eu" target="_blank">Sentinel-2 cloudless</a> by <a href="https://eox.at/" target="_blank">EOX IT Services GmbH</a>'
    }
  },
  layers: [
    {
      id: 'satellite',
      type: 'raster' as const,
      source: 'satellite',
      minzoom: 0,
      maxzoom: 22
    }
  ]
}

function Map() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-4">MapLibre GL Map</h1>
      <div className="rounded-lg shadow-lg overflow-hidden" style={{ width: '100%', height: '600px' }}>
        <MapGL
          initialViewState={{
            longitude: -93.5272,
            latitude: 44.7975,
            zoom: 12
          }}
          mapStyle={satelliteStyle}
          style={{ width: '100%', height: '100%' }}
        >
          <NavigationControl position="top-right" />
        </MapGL>
      </div>
    </div>
  )
}

export default Map
