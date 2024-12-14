import ResponsiveImage from '../components/ResponsiveImage.tsx';
import Page from '../components/Page.tsx';
import PageHeading from '../components/PageHeading.tsx';
import ImageContainer from '../components/ImageContainer.tsx';
import PageContent from '../components/PageContent.tsx';
import { Suspense, useEffect, useState } from 'react';
import FallbackSkeleton from '../components/FallbackSkeleton.tsx';
import { pageMetadata } from '../metadata/page-metadata.ts';

const getFallbackSize = (srcSet: string, viewportWidth:number): number => {
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

const WithSuspensePage = () => {
  const imageUrl = 'images/1x/wind-turbines.png';
  const imageSrcSet = `
    images/1x/wind-turbines.png ${pageMetadata.mediaBreakpoints.small}w, 
    images/2x/wind-turbines.png ${pageMetadata.mediaBreakpoints.medium}w, 
    images/3x/wind-turbines.png ${pageMetadata.mediaBreakpoints.large}w
  `;
  const sizes = `
    (max-width: 480px) ${pageMetadata.mediaBreakpoints.small}px, 
    (max-width: 1024px) ${pageMetadata.mediaBreakpoints.medium}px, 
    ${pageMetadata.mediaBreakpoints.large}px
  `;
  const [fallbackWidth, setFallbackWidth] = useState(300);
  const [fallbackHeight, setFallbackHeight] = useState(200);

  useEffect(() => {
    const updateFallbackSize = () => {
      const viewportWidth = window.innerWidth;
      const width = getFallbackSize(imageSrcSet, viewportWidth);
      setFallbackWidth(width);
      setFallbackHeight((width * 9) / 16); // Assuming a 16:9 aspect ratio
    };

    updateFallbackSize();
    window.addEventListener('resize', updateFallbackSize);

    return () => window.removeEventListener('resize', updateFallbackSize);
  }, [imageSrcSet]);

  return (
    <Page>
      <PageHeading>With Suspense</PageHeading>
      <PageContent>
        This page does use Suspense. As a result, the loading state is rendered
        immediately and then the image replaces it.
      </PageContent>
      <ImageContainer>
        <Suspense
          fallback={
            <FallbackSkeleton height={fallbackHeight} width={fallbackWidth} />
          }
        >
          <ResponsiveImage
            src={imageUrl}
            srcSet={imageSrcSet}
            sizes={sizes}
            alt="Wind turbines on rolling hills under a blue sky"
          />
        </Suspense>
      </ImageContainer>
    </Page>
  );
};

export default WithSuspensePage;
