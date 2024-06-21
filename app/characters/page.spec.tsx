import React from 'react';

import { render, waitFor } from '@testing-library/react';
import axios from 'axios';

import Lists from '@/components/main/Lists';

import CharactersPage from './page'; // Adjust the import path based on your file structure

// Mock axios instance
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// // Mock Lists component
// jest.mock('@/components/main/Lists', () => (props: any) => (
//   <div data-testid="lists" {...props} />
// ));

describe('CharactersPage', () => {
  const mockResponse = {
    data: {
      data: {
        characters: [
          {
            title: 'Character 1',
            downloadURLs: ['http://example.com/image1.jpg'],
          },
          {
            title: 'Character 2',
            downloadURLs: ['http://example.com/image2.jpg'],
          },
        ],
      },
    },
  };

  beforeEach(() => {
    mockedAxios.post.mockResolvedValue(mockResponse);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders CharactersPage correctly', async () => {
    const { container } = render((<CharactersPage />));
    await waitFor(() => expect(mockedAxios.post).toHaveBeenCalledTimes(1));
    expect(container).toMatchSnapshot();
  });

  test('renders Lists component with correct props', async () => {
    const { getByTestId } = render(<CharactersPage />);
    await waitFor(() => expect(mockedAxios.post).toHaveBeenCalledTimes(1));

    const listsComponent = getByTestId('lists');
    expect(listsComponent).toBeInTheDocument();
    expect(listsComponent).toHaveAttribute('route', 'characters');

    const charactersProps = [
      { title: 'Character 1', imageUrl: 'http://example.com/image1.jpg' },
      { title: 'Character 2', imageUrl: 'http://example.com/image2.jpg' },
    ];
    expect(listsComponent.props.props).toEqual(charactersProps);
  });

  test('handles API errors gracefully', async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error('API Error'));

    const { getByText } = render(<CharactersPage />);
    await waitFor(() => expect(mockedAxios.post).toHaveBeenCalledTimes(1));

    expect(getByText('Error loading characters')).toBeInTheDocument();
  });
});
