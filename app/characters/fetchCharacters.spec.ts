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
      },
    };

    mock.onPost('').reply(200, mockedResponse);

    const characters = await fetchCharacters();

    console.log('Fetched characters:', characters);

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

  it('should handle empty downloadURLs', async () => {
    const mockedResponse = {
      data: {
        data: {
          characters: [
            {
              title: 'Character 1',
              downloadURLs: [],
            },
            {
              title: 'Character 2',
              downloadURLs: [],
            },
            {
              title: 'Character 3',
              downloadURLs: [],
            },
          ],
        },
      },
    };

    mock.onPost('').reply(200, mockedResponse);

    const characters = await fetchCharacters();

    expect(characters).toEqual([
      { title: 'Character 1', imageUrl: undefined },
      { title: 'Character 2', imageUrl: undefined },
      { title: 'Character 3', imageUrl: undefined },
    ]);
  });

  it('should throw an error for a failed API call', async () => {
    mock.onPost('').reply(500);

    await expect(fetchCharacters()).rejects.toThrow();
  });

  it('should throw an error for invalid response structure', async () => {
    const mockedResponse = {
      data: {
        invalid: 'structure',
      },
    };

    mock.onPost('').reply(200, mockedResponse);

    await expect(fetchCharacters()).rejects.toThrow(
      'Invalid response structure'
    );
  });
});
