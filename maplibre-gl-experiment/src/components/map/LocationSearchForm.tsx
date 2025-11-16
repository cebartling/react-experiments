import { useState } from 'react';
import { useLocationStore } from '../../stores/locationStore';

export function LocationSearchForm() {
   const { latInput, lonInput, setLatInput, setLonInput, setLocation } = useLocationStore();
   const [isExpanded, setIsExpanded] = useState(true);

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
   };

   return (
      <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg max-w-sm">
         <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 rounded-t-lg transition-colors"
            aria-expanded={isExpanded}
            aria-controls="location-form-content"
         >
            <h3 className="font-semibold text-lg">Search Location</h3>
            <svg
               className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
               fill="none"
               stroke="currentColor"
               viewBox="0 0 24 24"
            >
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
         </button>

         <div
            id="location-form-content"
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
               isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
         >
            <form onSubmit={handleSubmit} className="space-y-3 px-4 pb-4">
               <div>
                  <label htmlFor="latitude" className="block text-sm font-medium text-gray-700 mb-1">
                     Latitude
                  </label>
                  <input
                     type="text"
                     id="latitude"
                     value={latInput}
                     onChange={(e) => setLatInput(e.target.value)}
                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                     placeholder="44.7975"
                  />
               </div>
               <div>
                  <label htmlFor="longitude" className="block text-sm font-medium text-gray-700 mb-1">
                     Longitude
                  </label>
                  <input
                     type="text"
                     id="longitude"
                     value={lonInput}
                     onChange={(e) => setLonInput(e.target.value)}
                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                     placeholder="-93.5272"
                  />
               </div>
               <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
               >
                  Search
               </button>
            </form>
         </div>
      </div>
   );
}
