import React from 'react';

export default function Section({ children }: { children?: React.ReactNode }) {
    return <section className="p-2">{children}</section>;
}
