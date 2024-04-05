import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

describe('page', () => {
  const server = setupServer(
    http.post('http://localhost:8080/api/login', ({ request, params, cookies }) => {
      return HttpResponse.json(
        { accessToken: "mockedAccessToken" },
        { status: 200 } // Ensure to send the correct HTTP status code for success
      );
    }),
  );  
  it('should test the page', async () => {
    const value = 1;
    expect(value).toBe(1);
  });
});