import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import testAccessibility from '~/test/testAccessibility';
import Section from './index';

describe('Section', () => {
    it('renders children correctly', () => {
        const { getByText } = render(<Section>Test Content</Section>);
        expect(getByText('Test Content')).toBeInTheDocument();
    });

    it('renders without children', () => {
        const { container } = render(<Section />);
        expect(container.querySelector('section')).toBeInTheDocument();
    });

    it('applies correct class names', () => {
        const { container } = render(<Section>Test Content</Section>);
        expect(container.querySelector('section')).toHaveClass('p-2');
    });

    it('has no accessibility violations', async () => {
        await testAccessibility(Section, {
            caption: 'Accessible Caption',
            children: 'Accessible Content'
        });
    });
});
