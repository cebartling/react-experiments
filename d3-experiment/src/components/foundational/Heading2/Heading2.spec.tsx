import React from 'react';
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import Heading2 from './index';
import testAccessibility from '~/test/testAccessibility';

describe('Heading2', () => {
    it('renders children correctly', () => {
        const { getByText } = render(<Heading2>Test Heading</Heading2>);
        expect(getByText('Test Heading')).toBeInTheDocument();
    });

    it('applies correct class names', () => {
        const { container } = render(<Heading2>Test Heading</Heading2>);
        expect(container.querySelector('h2')).toHaveClass('text-2xl font-bold');
    });

    it('renders without children', () => {
        const { container } = render(<Heading2 />);
        expect(container.querySelector('h2')).toBeInTheDocument();
    });

    it('has no accessibility violations', async () => {
        await testAccessibility(Heading2, {
            children: 'Accessible Content'
        });
    });
});
