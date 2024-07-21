'use client';
import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { createSlug } from '@/lib/createSlug';

type FeaturedProps = {
  category: string;
  description: string;
  image: string;
};

type Props = {
  items: FeaturedProps[];
};

const FeaturedHP: React.FC<Props> = ({ items }) => {
  return (
    <>
      {items.map((item, index) => (
        <Link
          key={index}
          href={`${createSlug(item.category)}`}
          className="card mb-2 link"
        >
          <Image
            src={item.image}
            alt={item.category}
            width={200}
            height={200}
          />
          <h3>{item.category.toUpperCase()}</h3>
          <p>{item.description}</p>
        </Link>
      ))}
    </>
  );
};

export default FeaturedHP;
