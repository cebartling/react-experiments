const FallbackSkeleton = ({
  width = 300,
  height = 200,
}: {
  width?: number;
  height?: number;
}) => (
  <div
    style={{
      width: `${width}px`,
      height: `${height}px`,
      backgroundColor: '#e0e0e0',
      borderRadius: '4px',
      animation: 'pulse 1.5s infinite',
    }}
  ></div>
);

export default FallbackSkeleton;
