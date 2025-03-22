import { render, screen, fireEvent } from '@testing-library/react';
import { Mock, describe, it, expect, vi } from 'vitest';
import { useFoobar } from '~hooks/Foobar';
import { BarEditor } from './index';

vi.mock('~hooks/Foobar');

describe('BarEditor', () => {
    it('increments the bar value when the button is clicked', () => {
        const setBar = vi.fn();
        (useFoobar as Mock).mockReturnValue({ bar: 1, setBar });

        render(<BarEditor />);

        const button = screen.getByText('Increment Bar');
        fireEvent.click(button);

        expect(setBar).toHaveBeenCalledWith(2);
    });

    it('renders the button with the correct text', () => {
        (useFoobar as Mock).mockReturnValue({ bar: 1, setBar: vi.fn() });

        render(<BarEditor />);

        expect(screen.getByText('Increment Bar')).toBeInTheDocument();
    });
});
