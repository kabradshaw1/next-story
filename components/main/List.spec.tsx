import { render, screen } from '@testing-library/react';

import Items from './Items/Items';
import List from './List';

jest.mock('./Items/Items', () => {
  return {
    __esModule: true,
    default: jest.fn(({ title }) => <div>{title}</div>), // Mock as a functional component that renders title
  };
});

describe('Lists Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('givenProps_whenRendered_theRenderComponents', () => {
    const props = [
      { title: 'Item 1', imageUrl: '/url1' },
      { title: 'Item 2', imageUrl: '/url2' },
    ];
    render(<List props={props} route="test-route" />);
    const itemTitles = screen.getAllByText(/Item/);
    expect(itemTitles).toHaveLength(2);
  });

  it('renders NoItems when props array is empty', () => {
    render(<List props={[]} route="test-route" />);
    expect(screen.getByText(/No test-route found./)).toBeInTheDocument();
  });

  it('givenProps_whenRendered_thenPassProps', () => {
    const props = [
      { title: 'Item 1', imageUrl: '/img1', route: 'items' },
      { title: 'Item 2', imageUrl: '/img2', route: 'items' },
    ];
    render(<List props={props} route="items" />);
    props.forEach((prop, index) => {
      expect(Items).toHaveBeenNthCalledWith(
        index + 1,
        {
          title: prop.title,
          imageUrl: prop.imageUrl,
          route: 'items',
        },
        {}
      );
    });
  });
});
