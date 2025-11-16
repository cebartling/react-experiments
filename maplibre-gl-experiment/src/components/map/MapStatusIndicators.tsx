import type { CellTower } from '../../services/cellTowerService';

interface MapStatusIndicatorsProps {
   isLoading: boolean;
   error: Error | null;
   cellTowers: CellTower[] | undefined;
}

export function MapStatusIndicators({ isLoading, error, cellTowers }: MapStatusIndicatorsProps) {
   const errorMessage = error
      ? error instanceof Error
         ? error.message
         : 'Failed to load cell towers'
      : null;

   return (
      <div className="absolute bottom-4 left-4 space-y-2">
         {isLoading && (
            <div className="bg-white px-4 py-2 rounded-lg shadow-lg">Loading cell towers...</div>
         )}
         {errorMessage && (
            <div className="bg-red-100 text-red-800 px-4 py-2 rounded-lg shadow-lg">
               {errorMessage}
            </div>
         )}
         {!isLoading && !errorMessage && cellTowers && cellTowers.length > 0 && (
            <div className="bg-white px-4 py-2 rounded-lg shadow-lg">
               {cellTowers.length} cell towers
            </div>
         )}
      </div>
   );
}
