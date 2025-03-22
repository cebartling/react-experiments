import React from 'react';
import { useFoobar } from '~hooks/Foobar';

export const BarView: React.FC = () => {
    const { bar } = useFoobar();

    return <div>Bar: {bar}</div>;
};
