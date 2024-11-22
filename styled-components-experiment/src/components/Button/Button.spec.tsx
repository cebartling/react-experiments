import {render, screen} from '@testing-library/react';
import {describe, expect, it} from 'vitest';
import {Button} from './index';
import {ThemeProvider} from "styled-components";
import {theme} from "../../theme.ts";

describe('Button Component', () => {
    const label = 'Test Button';

    it('renders with correct label', () => {
        render(
            <ThemeProvider theme={theme}>
                <Button label={label}/>
            </ThemeProvider>
        );

        expect(screen.getByText(label)).toBeInTheDocument();
    });
});