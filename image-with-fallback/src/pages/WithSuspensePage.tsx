import ResponsiveImage from '../components/ResponsiveImage.tsx';
import Page from '../components/Page.tsx';
import PageHeading from '../components/PageHeading.tsx';
import ImageContainer from '../components/ImageContainer.tsx';
import PageContent from '../components/PageContent.tsx';

const WithoutSuspensePage = () => {
  return (
    <Page>
      <PageHeading>With Suspense</PageHeading>
      <PageContent>
        This page does use Suspense. As a result, the loading state is rendered
        immediately and then the image replaces it.
      </PageContent>
      <ImageContainer>
        <ResponsiveImage
          src={'images/1x/wind-turbines.png'}
          srcSet={`images/1x/wind-turbines.png 320w, images/2x/wind-turbines.png 800w, images/3x/wind-turbines.png 1200w`}
          sizes={`(max-width: 480px) 320px, (max-width: 1024px) 800px, 1200px`}
          alt="Wind turbines on rolling hills under a blue sky"
        />
      </ImageContainer>
    </Page>
  );
};

export default WithoutSuspensePage;
