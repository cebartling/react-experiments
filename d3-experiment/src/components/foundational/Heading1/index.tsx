import React from 'react';

export default function Heading1({ children }: { children?: React.ReactNode }) {
    return <h1 className="text-3xl font-bold">{children}</h1>;
}
