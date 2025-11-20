import { useLocationStore } from '../../stores/locationStore';
import { useCellTowers } from '../../services/cellTowerService';

export function CellTowerInfo() {
   const { latitude, longitude } = useLocationStore();

   // Fetch cell towers for count display (SWR will dedupe with Map.tsx call)
   const { data: cellTowers, error, isLoading } = useCellTowers(latitude, longitude, 0.9, 50);

   const cellTowerCount = cellTowers?.length ?? 0;
   const errorMessage = error ? (error instanceof Error ? error.message : 'Failed to load cell towers') : null;

   return (
      <div className="border-t border-white/30 pt-4">
         <h3 className="font-semibold text-lg text-white mb-2">Cell Towers</h3>
         {isLoading ? (
            <div className="bg-blue-500/20 border border-blue-500/50 text-blue-100 px-4 py-2 rounded-md text-sm">
               Loading cell towers...
            </div>
         ) : errorMessage ? (
            <div className="bg-red-500/20 border border-red-500/50 text-red-100 px-4 py-2 rounded-md text-sm">
               {errorMessage}
            </div>
         ) : (
            <div className="text-white text-sm">
               <span className="font-bold">{cellTowerCount}</span> cell tower{cellTowerCount !== 1 ? 's' : ''} found
            </div>
         )}
      </div>
   );
}
