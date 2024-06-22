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
});
