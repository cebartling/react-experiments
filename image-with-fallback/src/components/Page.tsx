import styled from 'styled-components';


const StyledPage = styled.div`
    padding: 1.0rem;
    margin: 0 auto;
    max-width: 1280px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Page = ({ children }: { children: React.ReactNode }) => (
    <StyledPage>{children}</StyledPage>
);

export default Page;
