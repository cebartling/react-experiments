import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Header from './index';
import React from 'react';
import testAccessibility from '~/test/testAccessibility';

describe('Header', () => {
    it('renders dark logo when in dark mode', () => {
        const { container } = render(<Header />);
        expect(container.querySelector('img.dark\\:block')).toBeInTheDocument();
    });

    it('renders light logo when not in dark mode', () => {
        const { container } = render(<Header />);
        expect(
            container.querySelector('img.dark\\:hidden')
        ).toBeInTheDocument();
    });

    it('has correct class names for dark mode', () => {
        const { container } = render(<Header />);
        expect(container.querySelector('img.dark\\:block')).toHaveClass('h-10');
    });

    it('has correct class names for light mode', () => {
        const { container } = render(<Header />);
        expect(container.querySelector('img.dark\\:hidden')).toHaveClass(
            'h-10'
        );
    });

    it('has no accessibility violations', async () => {
        await testAccessibility(Header, {});
    });
});
