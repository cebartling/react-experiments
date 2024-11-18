import {useState} from 'react';

export interface ImageSource {
    src: string;
    width: number;
}

export interface ResponsiveImageProps {
    sources: ImageSource[];
    alt: string;
    className?: string;
    fallbackSrc?: string;
    aspectRatio?: number;
    objectFit?: 'contain' | 'cover' | 'fill';
}

const ResponsiveImage = ({
                             sources = [],
                             alt,
                             className = '',
                             fallbackSrc = '/api/placeholder/400/300',
                             aspectRatio = 16 / 9,
                             objectFit = 'cover'
                         }: ResponsiveImageProps) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    // Guard against empty sources array
    if (!Array.isArray(sources) || sources.length === 0) {
        return (
            <div
                data-testid="image-container"
                className={`relative w-full ${className}`}
                style={{paddingBottom: `${(1 / aspectRatio) * 100}%`}}
            >
                <img
                    src={fallbackSrc}
                    alt={alt}
                    className="absolute inset-0 w-full h-full"
                    style={{objectFit}}
                    loading="lazy"
                />
            </div>
        );
    }

    // Sort sources by width to ensure proper srcset ordering
    const sortedSources = [...sources].sort((a, b) => a.width - b.width);

    // Create srcset string
    const srcset = sortedSources
        .map(({src, width}) => `${src} ${width}w`)
        .join(', ');

    // Create sizes attribute based on the largest image width
    const maxWidth = sortedSources[sortedSources.length - 1]?.width || 1920;
    const sizes = `(max-width: ${maxWidth}px) 100vw, ${maxWidth}px`;

    const handleLoad = () => {
        setIsLoading(false);
        setHasError(false);
    };

    const handleError = () => {
        setIsLoading(false);
        setHasError(true);
    };

    return (
        <div
            data-testid="image-container"
            className={`relative w-full ${className}`}
            style={{paddingBottom: `${(1 / aspectRatio) * 100}%`}}
        >
            {isLoading && (
                <div
                    data-testid="loading-skeleton"
                    className="absolute inset-0 bg-gray-200 animate-pulse"
                />
            )}

            <img
                src={hasError ? fallbackSrc : sortedSources[0].src}
                srcSet={!hasError ? srcset : undefined}
                sizes={!hasError ? sizes : undefined}
                alt={alt}
                onLoad={handleLoad}
                onError={handleError}
                className={`absolute inset-0 w-full h-full transition-opacity duration-300 ${
                    isLoading ? 'opacity-0' : 'opacity-100'
                }`}
                style={{objectFit}}
                loading="lazy"
            />
        </div>
    );
};

export default ResponsiveImage;