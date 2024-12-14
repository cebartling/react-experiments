import styled from 'styled-components';

const StyledContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
`;

const ImageContainer = ({ children }: { children: React.ReactNode }) => (
  <StyledContainer>{children}</StyledContainer>
);

export default ImageContainer;
