import React from 'react';
import { useFoobar } from '~hooks/Foobar';

export const FooEditor: React.FC = () => {
    const { setFoo } = useFoobar();

    return (
        <div>
            <button
                onClick={() => setFoo(`Hello ${new Date().getTime()}`)}
                className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            >
                Update Foo
            </button>
        </div>
    );
};
