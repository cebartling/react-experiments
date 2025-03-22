import { render, screen } from '@testing-library/react';
import { Mock, describe, it, expect, vi } from 'vitest';
import { useFoobar } from '~hooks/Foobar';
import { BarView } from './index';

vi.mock('~hooks/Foobar');

describe('BarView', () => {
    it('displays the bar value from useFoobar', () => {
        (useFoobar as Mock).mockReturnValue({ bar: 'testBar' });

        render(<BarView />);

        expect(screen.getByText('Bar: testBar')).toBeInTheDocument();
    });

    it('displays Bar: when bar is undefined', () => {
        (useFoobar as Mock).mockReturnValue({ bar: undefined });

        render(<BarView />);

        expect(screen.getByText('Bar:')).toBeInTheDocument();
    });
});
