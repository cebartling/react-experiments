import { Map as MapGL, NavigationControl } from '@vis.gl/react-maplibre'
import 'maplibre-gl/dist/maplibre-gl.css'

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
          mapStyle="https://demotiles.maplibre.org/style.json"
          style={{ width: '100%', height: '100%' }}
        >
          <NavigationControl position="top-right" />
        </MapGL>
      </div>
    </div>
  )
}

export default Map
