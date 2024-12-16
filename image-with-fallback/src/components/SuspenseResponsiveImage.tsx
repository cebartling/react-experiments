import { Suspense } from 'react';
import AsyncImageLoader from './AsyncImageLoader.tsx';
import SuspenseResponsiveImageFallback from './SuspenseResponsiveImageFallback.tsx';

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
    <Suspense
      fallback={<SuspenseResponsiveImageFallback srcSet={srcSet} />}
    >
      <AsyncImageLoader
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
      />
    </Suspense>
  );
};

export default SuspenseResponsiveImage;
