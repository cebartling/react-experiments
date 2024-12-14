export type PageMetadata = {
  mediaBreakpoints: {
    small: number;
    medium: number;
    large: number;
  },
  imageFallbackSizes: {
    small: {height: number, width: number},
    medium: {height: number, width: number};
    large: {height: number, width: number};
  }
}

export const pageMetadata: PageMetadata = {
  mediaBreakpoints: {
    small: 320,
    medium: 800,
    large: 1200,
  },
  imageFallbackSizes: {
    small: {height: 180, width: 320},
    medium: {height: 450, width: 800},
    large: {height: 675, width: 1200},
  }
}