const ResponsiveImage = ({
  src,
  srcSet,
  sizes,
  alt,
}: {
  src: string;
  srcSet: string;
  sizes: string;
  alt: string;
}) => {
  return <img src={src} alt={alt} srcSet={srcSet} sizes={sizes}/>;
};

export default ResponsiveImage;
