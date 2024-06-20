import React from 'react';

import { render } from '@testing-library/react';

import ImageList from './ImageList';

describe('ImageList Component', () => {
  const mockImages = [
    { imageUrl: 'http://example.com/image1.jpg', alt: 'Image 1' },
    { imageUrl: 'http://example.com/image2.jpg', alt: 'Image 2' },
  ];

  test('renders ImageList correctly', () => {
    const { container } = render(<ImageList images={mockImages} />);
    expect(container).toMatchSnapshot();
  });

  test('renders all images', () => {
    const { getByAltText } = render(<ImageList images={mockImages} />);

    mockImages.forEach((image) => {
      const imgElement = getByAltText(image.alt);
      expect(imgElement).toBeInTheDocument();
      expect(imgElement).toHaveAttribute('src');
      expect(imgElement.getAttribute('src')).toContain(image.imageUrl);
    });
  });
});
