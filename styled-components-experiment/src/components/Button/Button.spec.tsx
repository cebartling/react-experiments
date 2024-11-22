import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Button } from './index';

describe('Button Component', () => {
    it('renders with correct label', () => {
        render(<Button label="Click Me" />);

        expect(screen.getByText('Click Me')).toBeInTheDocument();
    });
});