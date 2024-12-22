import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Footer from './index';
import testAccessibility from '~/test/testAccessibility';

describe('Footer', () => {
    it('renders children correctly', () => {
        render(<Footer>Test Content</Footer>);
        expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('applies additional props to the footer element', () => {
        render(<Footer id="test-id">Test Content</Footer>);
        expect(
            screen.getByText('Test Content').closest('footer')
        ).toHaveAttribute('id', 'test-id');
    });

    it('has no accessibility violations', async () => {
        await testAccessibility(Footer, {
            id: 'test-id',
            children: 'Accessible Content'
        });
    });
});
