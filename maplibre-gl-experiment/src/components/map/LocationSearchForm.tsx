import { useLocationStore } from '../../stores/locationStore';

export function LocationSearchForm() {
   const { latInput, lonInput, setLatInput, setLonInput, setLocation } = useLocationStore();

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
      <div className="absolute top-4 left-4 bg-white p-4 rounded-lg shadow-lg max-w-sm">
         <form onSubmit={handleSubmit} className="space-y-3">
            <h3 className="font-semibold text-lg mb-2">Search Location</h3>
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
   );
}
