import React from 'react';
import { useFoobar } from '~hooks/Foobar';

export const FooEditor: React.FC = () => {
    const { setFoo } = useFoobar();

    return (
        <div>
            <button onClick={() => setFoo(`Hello ${new Date().getTime()}`)}>Update Foo</button>
        </div>
    );
};
