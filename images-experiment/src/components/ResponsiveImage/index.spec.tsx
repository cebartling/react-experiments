import { describe, expect, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import ResponsiveImage, { ImageSource } from './index';

describe('ResponsiveImage', () => {
  const mockSources = [
    { src: '/images/small.jpg', width: 400 },
    { src: '/images/large.jpg', width: 1200 },
  ];

  it('renders with loading state initially', () => {
    render(<ResponsiveImage sources={mockSources} alt="Test image" />);

    const image = screen.getByRole('img');
    const loadingElement = screen.getByTestId('loading-skeleton');

    expect(image).toHaveClass('opacity-0');
    expect(loadingElement).toBeInTheDocument();
  });

  it('handles successful image load', async () => {
    render(<ResponsiveImage sources={mockSources} alt="Test image" />);

    const image = screen.getByRole('img');
    image.dispatchEvent(new Event('load'));

    await waitFor(() => {
      expect(image).toHaveClass('opacity-100');
      expect(screen.queryByTestId('loading-skeleton')).not.toBeInTheDocument();
    });
  });

  it('handles image load error', async () => {
    const fallbackSrc = '/api/placeholder/400/300';
    render(
      <ResponsiveImage
        sources={mockSources}
        alt="Test image"
        fallbackSrc={fallbackSrc}
      />
    );

    const image = screen.getByRole('img');
    image.dispatchEvent(new Event('error'));

    await waitFor(() => {
      expect(image).toHaveAttribute('src', fallbackSrc);
      expect(image).not.toHaveAttribute('srcset');
    });
  });

  it('renders fallback for empty sources', () => {
    const fallbackSrc = '/api/placeholder/400/300';
    render(
      <ResponsiveImage
        sources={[]}
        alt="Test image"
        fallbackSrc={fallbackSrc}
      />
    );

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', fallbackSrc);
  });

  it('generates correct srcset from sources', () => {
    render(<ResponsiveImage sources={mockSources} alt="Test image" />);

    const image = screen.getByRole('img');
    const expectedSrcSet = '/images/small.jpg 400w, /images/large.jpg 1200w';

    expect(image).toHaveAttribute('srcset', expectedSrcSet);
  });

  it('applies correct aspect ratio', () => {
    const aspectRatio = 4 / 3;
    render(
      <ResponsiveImage
        sources={mockSources}
        alt="Test image"
        aspectRatio={aspectRatio}
      />
    );

    const container = screen.getByTestId('image-container');
    const expectedPaddingBottom = `${(1 / aspectRatio) * 100}%`;

    expect(container).toHaveStyle({ paddingBottom: expectedPaddingBottom });
  });

  it('applies custom className', () => {
    const customClass = 'custom-class';
    render(
      <ResponsiveImage
        sources={mockSources}
        alt="Test image"
        className={customClass}
      />
    );

    const container = screen.getByTestId('image-container');
    expect(container).toHaveClass(customClass);
  });

  it('sets correct object-fit style', () => {
    const objectFit = 'contain';
    render(
      <ResponsiveImage
        sources={mockSources}
        alt="Test image"
        objectFit={objectFit}
      />
    );

    const image = screen.getByRole('img');
    expect(image).toHaveStyle({ objectFit });
  });

  it('handles undefined sources gracefully', () => {
    render(
      <ResponsiveImage
        sources={undefined as unknown as ImageSource[]}
        alt="Test image"
      />
    );

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', '/api/placeholder/400/300');
  });

  it('maintains aspect ratio with custom className', () => {
    const aspectRatio = 1;
    const customClass = 'w-64';

    render(
      <ResponsiveImage
        sources={mockSources}
        alt="Test image"
        aspectRatio={aspectRatio}
        className={customClass}
      />
    );

    const container = screen.getByTestId('image-container');
    expect(container).toHaveClass(customClass);
    expect(container).toHaveStyle({ paddingBottom: '100%' });
  });
});
