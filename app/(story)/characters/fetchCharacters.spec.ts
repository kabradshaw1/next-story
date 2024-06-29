import MockAdapter from 'axios-mock-adapter';

import axiosInstance from '@/lib/serverAxios';

import fetchCharacters from './fetchCharacters';

describe('fetchCharacters', () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(axiosInstance);
  });

  afterEach(() => {
    mock.restore();
  });

  it('should fetch and return characters with images', async () => {
    const mockedResponse = {
      data: {
        characters: [
          {
            title: 'Character 1',
            downloadURLs: [
              'http://example.com/image1.jpg',
              'http://example.com/image2.jpg',
            ],
          },
          {
            title: 'Character 2',
            downloadURLs: ['http://example.com/image3.jpg'],
          },
        ],
      },
    };

    mock.onPost('').reply(200, mockedResponse);

    const characters = await fetchCharacters();

    expect(characters).toEqual([
      {
        title: 'Character 1',
        imageUrl: expect.stringMatching(
          /http:\/\/example\.com\/image[12]\.jpg/
        ),
      },
      { title: 'Character 2', imageUrl: 'http://example.com/image3.jpg' },
    ]);
  });

  it('should handle characters with empty downloadURLs arrays', async () => {
    const mockedResponse = {
      data: {
        characters: [
          {
            title: 'Character 1',
            downloadURLs: [],
          },
          {
            title: 'Character 2',
            downloadURLs: ['http://example.com/image3.jpg'],
          },
        ],
      },
    };

    mock.onPost('').reply(200, mockedResponse);

    const characters = await fetchCharacters();

    expect(characters).toEqual([
      {
        title: 'Character 1',
        imageUrl: undefined,
      },
      { title: 'Character 2', imageUrl: 'http://example.com/image3.jpg' },
    ]);
  });

  it('should handle characters with null downloadURLs', async () => {
    const mockedResponse = {
      data: {
        characters: [
          {
            title: 'Character 1',
            downloadURLs: null,
          },
          {
            title: 'Character 2',
            downloadURLs: ['http://example.com/image3.jpg'],
          },
        ],
      },
    };

    mock.onPost('').reply(200, mockedResponse);

    const characters = await fetchCharacters();

    expect(characters).toEqual([
      {
        title: 'Character 1',
        imageUrl: undefined,
      },
      { title: 'Character 2', imageUrl: 'http://example.com/image3.jpg' },
    ]);
  });

  it('should handle errors when the request fails', async () => {
    mock.onPost('').reply(500);

    await expect(fetchCharacters()).rejects.toThrow();
  });
});
