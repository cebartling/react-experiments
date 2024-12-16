import { useEffect, useState } from 'react';

type AsyncImageLoaderProps = {
  alt: string;
  sizes: string;
  src: string;
  srcSet: string;
};

const AsyncImageLoader = ({
  alt,
  sizes,
  src,
  srcSet,
}: AsyncImageLoaderProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setIsLoaded(true);
    img.onerror = () => setIsLoaded(true);
    if (srcSet) {
      img.srcset = srcSet; // Set srcSet for responsive image loading
      img.sizes = sizes; // Set sizes for responsive loading
    } else {
      img.src = src; // Fallback for standard src
    }
  }, [src, srcSet, sizes]);

  if (!isLoaded) {
    // Throw a promise to suspend rendering until the image is loaded
    throw new Promise((resolve) => {
      const img = new Image();
      if (srcSet) {
        img.srcset = srcSet;
        img.sizes = sizes;
      } else {
        img.src = src;
      }
      img.onload = resolve;
    });
  }

  return <img src={src} srcSet={srcSet} sizes={sizes} alt={alt} />;
};

export default AsyncImageLoader;
