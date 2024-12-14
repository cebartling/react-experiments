import ResponsiveImage from '../components/ResponsiveImage.tsx';
import Page from '../components/Page.tsx';
import PageHeading from '../components/PageHeading.tsx';

const WithoutSuspensePage = () => {
  return (
    <Page>
      <PageHeading>Without Suspense</PageHeading>
      <p>
        This page does not use Suspense. As a result, the components are rendered
        immediately without any loading state.
      </p>
      <div>
        <ResponsiveImage
          src={'images/1x/wind-turbines.png'}
          srcSet={`images/1x/wind-turbines.png 320w, images/2x/wind-turbines.png 800w, images/3x/wind-turbines.png 1200w`}
          sizes={`(max-width: 480px) 320px, (max-width: 1024px) 800px, 1200px`}
          alt="Wind turbines on rolling hills under a blue sky"/>
      </div>
    </Page>
  );
};

export default WithoutSuspensePage;
