import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import testAccessibility from '~/test/testAccessibility';
import Figure from './index';

describe('Figure', () => {
    it('renders children correctly', () => {
        render(<Figure>Test Content</Figure>);
        expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('renders caption when provided', () => {
        render(<Figure caption="Test Caption">Test Content</Figure>);
        expect(screen.getByText('Test Caption')).toBeInTheDocument();
    });

    it('does not render caption when not provided', () => {
        const { container } = render(<Figure>Test Content</Figure>);
        expect(container.querySelector('figcaption')).toBeNull();
    });

    it('applies additional props to the figure element', () => {
        const { container } = render(
            <Figure id="test-id">Test Content</Figure>
        );
        expect(container.querySelector('figure')).toHaveAttribute(
            'id',
            'test-id'
        );
    });

    it('has no accessibility violations', async () => {
        await testAccessibility(Figure, {
            caption: 'Accessible Caption',
            children: 'Accessible Content'
        });
    });
});
