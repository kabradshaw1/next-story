import React from 'react';

import { render } from '@testing-library/react';

import ImageList from './ImageList';

describe('ImageList Component', () => {
  const mockDownloadURLs = [
    'http://example.com/image1.jpg',
    'http://example.com/image2.jpg',
  ];

  test('renders ImageList correctly', () => {
    const { container } = render(
      <ImageList downloadURLs={mockDownloadURLs} alt="Test Image" />
    );
    expect(container).toMatchSnapshot();
  });

  test('renders all images', () => {
    const { getAllByAltText } = render(
      <ImageList downloadURLs={mockDownloadURLs} alt="Test Image" />
    );

    const imgElements = getAllByAltText('Test Image');
    expect(imgElements).toHaveLength(mockDownloadURLs.length);
    imgElements.forEach((imgElement, index) => {
      expect(imgElement).toBeInTheDocument();
      expect(imgElement).toHaveAttribute(
        'src',
        expect.stringContaining(encodeURIComponent(mockDownloadURLs[index]))
      );
    });
  });

  test('renders without images', () => {
    const { container } = render(
      <ImageList downloadURLs={[]} alt="No Image" />
    );
    expect(container.firstChild).toBeEmptyDOMElement();
  });

  test('images have alt text', () => {
    const { getAllByAltText } = render(
      <ImageList downloadURLs={mockDownloadURLs} alt="Test Image" />
    );

    const imgElements = getAllByAltText('Test Image');
    expect(imgElements).toHaveLength(mockDownloadURLs.length);
    imgElements.forEach((imgElement) => {
      expect(imgElement).toBeInTheDocument();
    });
  });
});
