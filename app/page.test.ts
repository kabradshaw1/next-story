import { setupServer } from 'msw/node';
import { http, graphql, HttpResponse } from 'msw'

describe('page', () => {
  const server = setupServer(
    
  );  
  beforeAll(() => server.listen());

  it('should test the page', async () => {
    const value = 1;
    expect(value).toBe(1);
  });
});