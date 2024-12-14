import styled from 'styled-components';

const StyledContentContainer = styled.div`
  font-size: 1.2rem;
`;

const PageContent = ({ children }: { children: React.ReactNode }) => (
  <StyledContentContainer>{children}</StyledContentContainer>
);

export default PageContent;
