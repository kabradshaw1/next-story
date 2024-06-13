import type React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import createSlug from '@/lib/createSlug';

type Props = {
  title: string;
  downloadURLs: string[];
  text: string;
};

const Item: React.FC<Props> = ({ title, downloadURLs, text }) => {};

export default Item;
