import { useState } from 'react';
import { useLocationStore } from '../../stores/locationStore';
import type { BaseLayerType } from '../../config/mapStyles';

export function LocationSearchForm() {
   const { latInput, lonInput, setLatInput, setLonInput, setLocation, baseLayer, setBaseLayer } = useLocationStore();
   const [isExpanded, setIsExpanded] = useState(true);
   const [isSubmitted, setIsSubmitted] = useState(false);

   const layers: { type: BaseLayerType; label: string; icon: string }[] = [
      { type: 'street', label: 'Street', icon: '🗺️' },
      { type: 'satellite', label: 'Satellite', icon: '🛰️' },
      { type: 'hybrid', label: 'Hybrid', icon: '🌍' },
   ];

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const lat = parseFloat(latInput);
      const lon = parseFloat(lonInput);

      // Validate inputs
      if (isNaN(lat) || lat < -90 || lat > 90) {
         alert('Latitude must be between -90 and 90');
         return;
      }
      if (isNaN(lon) || lon < -180 || lon > 180) {
         alert('Longitude must be between -180 and 180');
         return;
      }

      // Update location in Zustand store (will persist to IndexedDB)
      setLocation(lat, lon);

      // Trigger green transition
      setIsSubmitted(true);
      setTimeout(() => {
         setIsSubmitted(false);
      }, 800);
   };

   return (
      <div className="absolute top-20 left-4 bg-black/60 backdrop-blur-md rounded-lg shadow-lg max-w-sm border border-white/30">
         <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full px-4 py-3 flex items-center justify-center hover:bg-white/10 rounded-t-lg transition-colors text-white"
            aria-expanded={isExpanded}
            aria-controls="location-form-content"
         >
            <svg
               className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
               fill="none"
               stroke="currentColor"
               viewBox="0 0 24 24"
            >
               <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
               />
            </svg>
         </button>

         <div
            id="location-form-content"
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
               isExpanded ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
            }`}
         >
            <div className="px-4 pb-4 space-y-4">
               <h3 className="font-semibold text-lg text-white">Search Location</h3>
               <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                     <label htmlFor="latitude" className="block text-sm font-medium text-white mb-1">
                        Latitude
                     </label>
                     <input
                        type="text"
                        id="latitude"
                        value={latInput}
                        onChange={(e) => setLatInput(e.target.value)}
                        className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-md text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/30"
                        placeholder="44.7975"
                     />
                  </div>
                  <div>
                     <label htmlFor="longitude" className="block text-sm font-medium text-white mb-1">
                        Longitude
                     </label>
                     <input
                        type="text"
                        id="longitude"
                        value={lonInput}
                        onChange={(e) => setLonInput(e.target.value)}
                        className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-md text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/30"
                        placeholder="-93.5272"
                     />
                  </div>
                  <button
                     type="submit"
                     className={`w-full py-2 px-4 rounded-md text-white focus:outline-none focus:ring-2 backdrop-blur-sm transition-all duration-300 ${
                        isSubmitted
                           ? 'bg-green-600 shadow-[0_0_20px_rgba(34,197,94,0.6)]'
                           : 'bg-blue-600 hover:bg-blue-700 hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] hover:animate-pulse focus:ring-blue-400'
                     }`}
                  >
                     Search
                  </button>
               </form>

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
            </div>
         </div>
      </div>
   );
}
