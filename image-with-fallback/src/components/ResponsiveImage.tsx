const ResponsiveImage = ({ src }: { src: string }) => {
  return (
    <img
      src={src}
      alt="Responsive image"
      srcSet={`${src} 1x, ${src} 2x, ${src} 3x`}
    />
  );
};

export default ResponsiveImage;
