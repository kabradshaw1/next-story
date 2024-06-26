import { graphql, HttpResponse } from 'msw';

export const handlers = [
  graphql.query('characters', () => {
    return HttpResponse.json({
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
    });
  }),
];
