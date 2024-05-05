"use client";
import React from "react";

import Image from "next/image";
import Link from "next/link";

type FeaturedProps = {
  category: string;
  description: string;
  image: string;
};

interface Props {
  items: FeaturedProps[];
}

const FeaturedHP: React.FC<Props> = ({ items }) => {
  return (
    <>
      {items.map((item, index) => (
        <Link key={index} href={`${item.category}`} className="card mb-2 link">
          <Image
            src={item.image}
            alt={item.category}
            width={200}
            height={200}
          />
          <h3 className="text-white">{item.category}</h3>
          <p className="text-gray-300">{item.description}</p>
        </Link>
      ))}
    </>
  );
};

export default FeaturedHP;
