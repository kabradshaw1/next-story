import '@testing-library/jest-dom';

import Image, { type ImageProps } from 'next/image';

Object.defineProperty(Image, 'default', {
  configurable: true,
  value: (props: ImageProps) => <Image {...props} alt={props.alt} />, // Simplified mock of the Next.js Image component
});
