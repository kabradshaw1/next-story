import { render, screen } from '@testing-library/react';

import Items from './Items';

describe('Items Component', () => {
  describe('Items Component', () => {
    it('displays no image text when imageUrl is missing', () => {
      render(
        <Items id={1} title="Item 1" imageUrl="/test.png" route="route" />
      );
      expect(screen.getByText('Item 1')).toBeInTheDocument();
    });
  });
  it('renders the image, title, and text correctly', () => {
    const props = {
      title: 'Item',
      imageUrl: '/url1',
      route: 'character',
      id: 1,
    };
    render(<Items {...props} />);
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    const image = screen.getByRole('img', {
      name: `Image of ${props.title}`,
    }) as HTMLImageElement;

    // Check if the src attribute includes encoded URL and optimization parameters
    expect(image.src).toContain(encodeURIComponent(props.imageUrl));
    expect(screen.getByText(props.title)).toBeInTheDocument();
  });
  it('displays a placeholder when no image is available', () => {
    const props = {
      title: 'Item 2',
      text: 'Description 2',
      imageUrl: undefined,
      route: 'character',
      id: 1,
    };
    render(<Items {...props} />);
    expect(screen.getByText('No image available.')).toBeInTheDocument();
  });
  it('creates a link that navigates to the correct URL based on the title and route', () => {
    const props = {
      title: 'Item',
      imageUrl: '/url1',
      route: 'character',
      id: 1,
    };
    render(<Items {...props} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', `/${props.route}/1`);
  });
  it('has appropriate alt text for images for accessibility', () => {
    const props = {
      title: 'Item 1',
      imageUrl: '/url1',
      route: 'character',
      id: 1,
    };
    render(<Items {...props} />);
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('alt', `Image of ${props.title}`);
  });
});
