import { render, screen } from '@testing-library/react';
import { Mock, describe, it, expect, vi } from 'vitest';
import { useFoobar } from '~hooks/Foobar';
import { FooView } from './index';

vi.mock('~hooks/Foobar');

describe('FooView', () => {
    it('displays the foo value from useFoobar', () => {
        (useFoobar as Mock).mockReturnValue({ foo: 'testFoo' });

        render(<FooView />);

        expect(screen.getByText('Foo: testFoo')).toBeInTheDocument();
    });

    it('displays Foo: when foo is undefined', () => {
        (useFoobar as Mock).mockReturnValue({ foo: undefined });

        render(<FooView />);

        expect(screen.getByText('Foo:')).toBeInTheDocument();
    });
});
