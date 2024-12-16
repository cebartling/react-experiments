import Page from '../components/Page.tsx';
import PageHeading from '../components/PageHeading.tsx';
import PageContent from '../components/PageContent.tsx';
import { Link } from 'react-router';

const HomePage = () => {
  return (
    <Page>
      <PageHeading>Home</PageHeading>
      <PageContent>
        <ul>
          <li><Link to="/withSuspense">Responsive image with Suspense</Link></li>
          <li><Link to="/withoutSuspense">Responsive image without Suspense</Link></li>
        </ul>
      </PageContent>
    </Page>
  );
};

export default HomePage;
