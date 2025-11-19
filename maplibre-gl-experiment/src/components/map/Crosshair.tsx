interface CrosshairProps {
   visible: boolean;
}

export function Crosshair({ visible }: CrosshairProps) {
   if (!visible) return null;

   return (
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
         <div className="relative w-8 h-8 animate-pulse">
            {/* Horizontal line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-red-500 -translate-y-1/2" />
            {/* Vertical line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-red-500 -translate-x-1/2" />
            {/* Center circle */}
            <div className="absolute top-1/2 left-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 border-2 border-red-500 rounded-full bg-white" />
         </div>
      </div>
   );
}
