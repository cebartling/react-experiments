import React from 'react';
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import testAccessibility from '~/test/testAccessibility';
import Heading1 from './index';

describe('Heading1', () => {
    it('renders children correctly', () => {
        const { getByText } = render(<Heading1>Test Heading</Heading1>);
        expect(getByText('Test Heading')).toBeInTheDocument();
    });

    it('applies correct class names', () => {
        const { container } = render(<Heading1>Test Heading</Heading1>);
        expect(container.querySelector('h1')).toHaveClass('text-3xl font-bold');
    });

    it('renders without children', () => {
        const { container } = render(<Heading1 />);
        expect(container.querySelector('h1')).toBeInTheDocument();
    });

    it('has no accessibility violations', async () => {
        await testAccessibility(Heading1, {
            children: 'Accessible Content'
        });
    });
});
