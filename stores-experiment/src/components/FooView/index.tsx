import React from 'react';
import { useFoobar } from '~hooks/Foobar';

export const FooView: React.FC = () => {
    const { foo } = useFoobar();

    return <div>Foo: {foo}</div>;
};
