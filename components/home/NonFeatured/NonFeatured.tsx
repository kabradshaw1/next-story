"use client";
import React from "react";

import { useRouter } from "next/navigation";

type NonFeaturedProps = {
  category: string;
  description: string;
};

type Props = {
  items: NonFeaturedProps[];
};

const NonFeatured: React.FC<Props> = ({ items }) => {
  const router = useRouter();

  const handleClick = (category: string) => () => {
    router.push(`${category}`);
  };

  return (
    <>
      {items.map((item, index) => (
        <button
          onClick={handleClick(item.category)}
          key={index}
          className="card mb-2 w-40 mr-2 link"
        >
          <h3 className="text-white">{item.category}</h3>
          <p className="text-gray-300">{item.description}</p>
        </button>
      ))}
    </>
  );
};

export default NonFeatured;
