import React from 'react';

export default function Figure({
    children,
    caption,
    ...props
}: React.ComponentPropsWithoutRef<'figure'> & { caption?: string }) {
    return (
        <figure {...props}>
            {children}
            {caption && (
                <figcaption className="text-center italic">
                    {caption}
                </figcaption>
            )}
        </figure>
    );
}
