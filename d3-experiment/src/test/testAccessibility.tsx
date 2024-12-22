import { expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import React from 'react';

export default async function testAccessibility(
    Component: React.ElementType,
    props: Record<string, unknown> = {}
) {
    const { container } = render(<Component {...props} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
}
