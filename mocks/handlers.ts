import { http, graphql, HttpResponse } from 'msw';

export const handlers = [
  graphql.query('characters', () => {
    return HttpResponse.json({
      data: {
        characters: [
          {
            title: 'character1',
            downloadURLs: [
              'http://example.com/image1.jpg',
              'http://example.com/image2.jpg',
            ],
          },
          {
            title: 'character2',
            downloadURLs: ['http://example.com/image3.jpg'],
          },
          {
            title: 'character3',
            downloadURLs: [],
          },
        ],
      },
    });
  }),
];
