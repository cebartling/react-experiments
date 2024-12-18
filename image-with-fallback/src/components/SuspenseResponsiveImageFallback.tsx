import { useEffect, useState } from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div<{ width: number; height: number }>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  background-color: #e0e0e0;
  border-radius: 4px;
  animation: pulse 1.5s infinite;
`;

const getFallbackSize = (srcSet: string, viewportWidth: number): number => {
  const breakpoints = srcSet
    .split(',')
    .map((entry) => {
      const [url, width] = entry.trim().split(' ');
      return { url, width: parseInt(width.replace('w', ''), 10) };
    })
    .sort((a, b) => a.width - b.width);

  // Find the closest width breakpoint, using the largest if none match
  const appropriateBreakpoint =
    breakpoints.find((bp) => bp.width >= viewportWidth) ||
    breakpoints[breakpoints.length - 1];

  return appropriateBreakpoint.width;
};

type SuspenseResponsiveImageFallbackProps = {
  srcSet: string;
};

const SuspenseResponsiveImageFallback = ({
  srcSet,
}: SuspenseResponsiveImageFallbackProps) => {
  const [fallbackWidth, setFallbackWidth] = useState(300);
  const [fallbackHeight, setFallbackHeight] = useState(200);

  useEffect(() => {
    const updateFallbackSize = () => {
      const viewportWidth = window.innerWidth;
      const width = getFallbackSize(srcSet, viewportWidth);
      setFallbackWidth(width);
      setFallbackHeight((width * 9) / 16); // Assuming a 16:9 aspect ratio
    };

    updateFallbackSize();
    window.addEventListener('resize', updateFallbackSize);

    return () => window.removeEventListener('resize', updateFallbackSize);
  }, [srcSet]);

  return <StyledDiv height={fallbackHeight} width={fallbackWidth} />;
};

export default SuspenseResponsiveImageFallback;
