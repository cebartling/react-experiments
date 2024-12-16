import styled from 'styled-components';

const StyledDiv = styled.div<{ width: number; height: number }>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  background-color: #e0e0e0;
  border-radius: 4px;
  animation: pulse 1.5s infinite;
`;

const FallbackSkeleton = ({
  width = 300,
  height = 200,
}: {
  width?: number;
  height?: number;
}) => <StyledDiv width={width} height={height}></StyledDiv>;

export default FallbackSkeleton;
