import { Suspense } from 'react';
import SuspenseResponsiveImageFallback from './SuspenseResponsiveImageFallback';
import LazyImageLoader from './LazyImageLoader';

type SuspenseResponsiveImageProps = {
  srcSet: string;
  src: string;
  sizes: string;
  alt: string;
};

const SuspenseResponsiveImage = ({
  srcSet,
  src,
  sizes,
  alt,
}: SuspenseResponsiveImageProps) => {
  return (
    <Suspense fallback={<SuspenseResponsiveImageFallback srcSet={srcSet} />}>
      <LazyImageLoader src={src} srcSet={srcSet} sizes={sizes} alt={alt} />
    </Suspense>
  );
};

export default SuspenseResponsiveImage;
