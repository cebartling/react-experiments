import React from 'react';
import { useFoobar } from '~hooks/Foobar';

export const StateViewer: React.FC = () => {
    const { foo, bar } = useFoobar();

    return (
        <div>
            <div>Foo: {foo}</div>
            <div>Bar: {bar}</div>
        </div>
    );
};
