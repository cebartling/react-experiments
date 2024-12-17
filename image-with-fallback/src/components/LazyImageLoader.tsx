import React, { useEffect, useState } from 'react';

interface ImageLoaderProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  srcSet?: string;
  sizes?: string;
  alt: string;
}

const loadImage = (
  src: string,
  srcSet?: string,
  sizes?: string
): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
    if (srcSet) img.srcset = srcSet;
    if (sizes) img.sizes = sizes;
    img.src = src;
  });
};

const LazyImageLoader = React.lazy(
  (): Promise<{ default: React.FC<ImageLoaderProps> }> =>
    Promise.resolve({
      default: ({ src, srcSet, sizes, alt, ...props }: ImageLoaderProps) => {
        const [loadedImg, setLoadedImg] = useState<HTMLImageElement | null>(
          null
        );

        useEffect(() => {
          let isMounted = true;
          loadImage(src, srcSet, sizes)
            .then((img) => {
              if (isMounted) setLoadedImg(img);
            })
            .catch((err) => {
              if (isMounted) console.error('Image failed to load:', err);
            });

          return () => {
            isMounted = false;
          };
        }, [src, srcSet, sizes]);

        if (!loadedImg) {
          return null;
        }

        return (
          <img
            src={loadedImg.src}
            srcSet={loadedImg.srcset}
            sizes={loadedImg.sizes}
            alt={alt}
            {...props}
          />
        );
      },
    })
);

export default LazyImageLoader;
