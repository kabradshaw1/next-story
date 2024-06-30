'use client';
import React from 'react';

import Link from 'next/link';

import { createSlug } from '@/lib/createSlug';

type NonFeaturedProps = {
  category: string;
  description: string;
};

type Props = {
  items: NonFeaturedProps[];
};

const NonFeatured: React.FC<Props> = ({ items }) => {
  return (
    <>
      {items.map((item, index) => (
        <Link
          key={index}
          href={`${createSlug(item.category)}`}
          className="card mb-2 w-40 mr-2 link"
        >
          <h3 className="text-white">{item.category}</h3>
          <p className="text-gray-300">{item.description}</p>
        </Link>
      ))}
    </>
  );
};

export default NonFeatured;
