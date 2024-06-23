import '@testing-library/jest-dom';

import Image, { type ImageProps } from 'next/image';

import { server } from '@/mocks/node';

Object.defineProperty(Image, 'default', {
  configurable: true,
  value: (props: ImageProps) => <Image {...props} alt={props.alt} />, // Simplified mock of the Next.js Image component
});

beforeAll(() => {
  server.listen();
});
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => {
  server.close();
});
