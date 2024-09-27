import {describe, expect, it} from 'vitest';
import {render, screen} from "@testing-library/react";
import Heading from "./Heading.tsx";

describe('Heading', () => {

    it('should render', () => {
        render(<Heading>Foobar</Heading>);

        expect(screen.findByText('Foobar')).toBeDefined();
    });
});