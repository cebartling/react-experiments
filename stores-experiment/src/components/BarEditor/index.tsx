import React from 'react';
import { useFoobar } from '~hooks/Foobar';

export const BarEditor: React.FC = () => {
    const { bar, setBar } = useFoobar();

    return (
        <div>
            <button
                onClick={() => setBar(bar + 1)}
                className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            >
                Increment Bar
            </button>
        </div>
    );
};
