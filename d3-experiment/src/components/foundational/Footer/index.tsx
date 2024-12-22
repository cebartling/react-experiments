import React from 'react';

export default function Footer({
    children,
    ...props
}: React.ComponentPropsWithoutRef<'footer'>) {
    return <footer {...props}>{children}</footer>;
}
