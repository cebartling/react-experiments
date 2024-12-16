import Page from '../components/Page.tsx';
import PageHeading from '../components/PageHeading.tsx';
import ImageContainer from '../components/ImageContainer.tsx';
import PageContent from '../components/PageContent.tsx';
import { pageMetadata } from '../metadata/page-metadata.ts';
import SuspenseResponsiveImage from '../components/SuspenseResponsiveImage.tsx';


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

  return (
    <Page>
      <PageHeading>Responsive Image With Suspense</PageHeading>
      <PageContent>
        This page uses Suspense with a fallback. As a result, the loading state
        is rendered immediately and then the image replaces it. This should lead
        to a lower Cumulative Layout Shift (CLS) score. Use this as the improved
        score.
      </PageContent>
      <ImageContainer>
        <SuspenseResponsiveImage
          imageSrcSet={imageSrcSet}
          src={imageUrl}
          sizes={sizes}
          alt="Wind turbines on rolling hills under a blue sky"
        />
      </ImageContainer>
    </Page>
  );
};

export default WithSuspensePage;
