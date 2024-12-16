import ResponsiveImage from '../components/ResponsiveImage.tsx';
import Page from '../components/Page.tsx';
import PageHeading from '../components/PageHeading.tsx';
import ImageContainer from '../components/ImageContainer.tsx';
import PageContent from '../components/PageContent.tsx';
import { pageMetadata } from '../metadata/page-metadata.ts';

const WithoutSuspensePage = () => {
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
      <PageHeading>Responsive Image Without Suspense</PageHeading>
      <PageContent>
        This page does not use Suspense. As a result, the components are
        rendered immediately without any loading state. This should lead to a
        higher Cumulative Layout Shift (CLS) score. Use this as the baseline
        score.
      </PageContent>
      <ImageContainer>
        <ResponsiveImage
          src={imageUrl}
          srcSet={imageSrcSet}
          sizes={sizes}
          alt="Wind turbines on rolling hills under a blue sky"
        />
      </ImageContainer>
    </Page>
  );
};

export default WithoutSuspensePage;
