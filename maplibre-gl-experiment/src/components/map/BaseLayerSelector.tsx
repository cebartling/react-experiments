import { useLocationStore } from '../../stores/locationStore';
import type { BaseLayerType } from '../../config/mapStyles';

export function BaseLayerSelector() {
   const { baseLayer, setBaseLayer } = useLocationStore();

   const layers: { type: BaseLayerType; label: string; icon: string }[] = [
      { type: 'street', label: 'Street', icon: '🗺️' },
      { type: 'satellite', label: 'Satellite', icon: '🛰️' },
      { type: 'hybrid', label: 'Hybrid', icon: '🌍' },
   ];

   return (
      <div className="border-t border-white/30 pt-4">
         <h3 className="font-semibold text-lg text-white mb-2">Map Layer</h3>
         <div className="flex flex-col gap-2">
            {layers.map((layer) => (
               <button
                  key={layer.type}
                  onClick={() => setBaseLayer(layer.type)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                     baseLayer === layer.type
                        ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]'
                        : 'bg-white/20 text-white hover:bg-white/30 hover:shadow-[0_0_10px_rgba(255,255,255,0.3)] hover:animate-pulse'
                  }`}
                  aria-label={`Switch to ${layer.label} view`}
                  aria-pressed={baseLayer === layer.type}
               >
                  <span className="text-lg">{layer.icon}</span>
                  <span>{layer.label}</span>
               </button>
            ))}
         </div>
      </div>
   );
}
