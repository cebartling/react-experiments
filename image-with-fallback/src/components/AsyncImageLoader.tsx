import React from 'react';

interface ImageLoaderProps {
  src: string;
  srcSet?: string;
  sizes?: string;
  alt: string;
  className?: string;
}

interface ImageCache {
  [key: string]: {
    promise?: Promise<void>;
    status: 'pending' | 'fulfilled' | 'rejected';
    result?: HTMLImageElement;
    error?: Error;
  };
}

// Generate a unique cache key for the image including srcSet
const getCacheKey = (src: string, srcSet?: string): string => {
  if (!srcSet) return src;
  return `${src}::${srcSet}`;
};

// Image cache to prevent multiple loads of the same image
const imageCache: ImageCache = {};

const loadImage = (
  src: string,
  srcSet?: string,
  sizes?: string
): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    // Set srcSet and sizes before src to ensure proper resource selection
    if (srcSet) {
      img.srcset = srcSet;
    }
    if (sizes) {
      img.sizes = sizes;
    }
    img.src = src;

    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
  });
};

const preloadImage = (src: string, srcSet?: string, sizes?: string) => {
  const cacheKey = getCacheKey(src, srcSet);

  if (!imageCache[cacheKey]) {
    imageCache[cacheKey] = {
      status: 'pending',
      promise: loadImage(src, srcSet, sizes)
        .then((img) => {
          imageCache[cacheKey].status = 'fulfilled';
          imageCache[cacheKey].result = img;
        })
        .catch((error) => {
          imageCache[cacheKey].status = 'rejected';
          imageCache[cacheKey].error = error;
        }),
    };
  }

  if (imageCache[cacheKey].status === 'pending') {
    // Trigger Suspense fallback
    throw imageCache[cacheKey].promise;
  } else if (imageCache[cacheKey].status === 'rejected') {
    throw imageCache[cacheKey].error;
  }

  return imageCache[cacheKey].result!;
};

const ImageLoaderComponent = ({
  src,
  srcSet,
  sizes,
  alt,
  className,
}: ImageLoaderProps) => {
  const img = preloadImage(src, srcSet, sizes);
  return (
    <img
      src={img.src}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      className={className}
      width={img.width}
      height={img.height}
    />
  );
};

// Wrap with React.lazy for code splitting and Suspense support
export const AsyncImageLoader = React.lazy(() =>
  Promise.resolve({ default: ImageLoaderComponent })
);

export default AsyncImageLoader;
