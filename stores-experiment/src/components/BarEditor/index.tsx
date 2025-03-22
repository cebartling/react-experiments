import React from 'react';
import {useFoobar} from "~hooks/Foobar";

export const BarEditor: React.FC = () => {
    const {bar, setBar} = useFoobar();

    return (
        <div>
            <button onClick={() => setBar(bar + 1)}>Increment Bar</button>
        </div>
    );
};

