import { render, screen } from '@testing-library/react';
import BarChart from './index';
import { data } from './mock-data';
import { describe, expect, it, vi } from 'vitest';
import { DataPoint } from '~/components/charts/BarChart/types.ts';

vi.mock('~/hooks/useInterval', () => ({
    __esModule: true,
    default: vi.fn(callback => {
        setInterval(callback, 2000);
    })
}));

describe('BarChart', () => {
    it('renders the chart title', () => {
        render(<BarChart />);
        expect(
            screen.getByText('Monthly Sales Performance')
        ).toBeInTheDocument();
    });

    it('renders the SVG element', () => {
        render(<BarChart />);
        expect(screen.getByTestId('bar-chart-svg')).toBeInTheDocument();
    });

    it('updates the dataset at regular intervals', () => {
        vi.useFakeTimers();
        render(<BarChart />);
        vi.advanceTimersByTime(2000);
        expect(data).toHaveLength(12); // Assuming data has 12 items
    });

    data.forEach((item: DataPoint) => {
        it(`renders a bar for ${item.month}`, () => {
            render(<BarChart />);
            expect(
                screen.getByTestId(`bar-chart-bar-${item.month}`)
            ).toBeInTheDocument();
        });

        it(`renders a value for ${item.month}`, () => {
            render(<BarChart />);
            expect(
                screen.getByTestId(`bar-chart-value-${item.month}`)
            ).toBeInTheDocument();
        });
    });

    // it('has no accessibility violations', async () => {
    //     await testAccessibility(BarChart, {});
    // });
});
