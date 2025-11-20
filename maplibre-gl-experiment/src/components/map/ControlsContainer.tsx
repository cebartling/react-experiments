import { useState, type ReactNode } from 'react';

interface ControlsContainerProps {
   children: ReactNode;
}

export function ControlsContainer({ children }: ControlsContainerProps) {
   const [isExpanded, setIsExpanded] = useState(true);

   return (
      <div className="absolute top-20 left-4 bg-black/60 backdrop-blur-md rounded-lg shadow-lg max-w-sm border border-white/30">
         <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full px-4 py-3 flex items-center justify-center hover:bg-white/10 rounded-t-lg transition-colors text-white"
            aria-expanded={isExpanded}
            aria-controls="controls-content"
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
            id="controls-content"
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
               isExpanded ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
            }`}
         >
            <div className="px-4 pb-4 space-y-4">
               {children}
            </div>
         </div>
      </div>
   );
}
