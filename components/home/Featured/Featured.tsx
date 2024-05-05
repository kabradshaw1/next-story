"use client";
import React from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";

type FeaturedProps = {
  category: string;
  description: string;
  image: string;
};

interface Props {
  items: FeaturedProps[];
}

const FeaturedHP: React.FC<Props> = ({ items }) => {
  const router = useRouter();

  const handleClick = (category: string) => () => {
    router.push(`${category}`);
  };
  return (
    <>
      {items.map((item, index) => (
        <div key={index} className="card mb-2 link">
          <Image
            src={item.image}
            alt={item.category}
            width={200}
            height={200}
          />
          <h3 className="text-white">{item.category}</h3>
          <p className="text-gray-300">{item.description}</p>
        </div>
      ))}
    </>
  );
};

export default FeaturedHP;
