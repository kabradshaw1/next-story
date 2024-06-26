import { graphql, HttpResponse } from 'msw';

export const handlers = [
  graphql.query('characters', ({ query }) => {
    return HttpResponse.json({
      data: {},
    });
  }),
];
