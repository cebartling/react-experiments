import { render, screen, fireEvent } from '@testing-library/react';
import { Mock, describe, it, expect, vi } from 'vitest';
import { useFoobar } from '~hooks/Foobar';
import { FooEditor } from './index';

vi.mock('~hooks/Foobar');

describe('FooEditor', () => {
    it('calls setFoo with a timestamped message when the button is clicked', () => {
        const setFoo = vi.fn();
        (useFoobar as Mock).mockReturnValue({ setFoo });

        render(<FooEditor />);

        const button = screen.getByText('Update Foo');
        fireEvent.click(button);

        expect(setFoo).toHaveBeenCalledWith(expect.stringMatching(/^Hello \d+$/));
    });

    it('renders the button with the correct text', () => {
        (useFoobar as Mock).mockReturnValue({ setFoo: vi.fn() });

        render(<FooEditor />);

        expect(screen.getByText('Update Foo')).toBeInTheDocument();
    });
});
