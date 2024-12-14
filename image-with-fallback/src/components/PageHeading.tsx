import styled from 'styled-components';

const StyledHeading1 = styled.h1`
    font-size: 2.0rem;
    margin-bottom: 1.0rem;
`;

const PageHeading = ({ children }: { children: React.ReactNode }) => (
    <StyledHeading1>{children}</StyledHeading1>
);

export default PageHeading;
