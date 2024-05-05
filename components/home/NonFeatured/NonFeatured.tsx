import React from "react";

import Image from "next/image";

type NonFeaturedProps = {
  category: string;
  description: string;
};

interface Props {
  items: NonFeaturedProps[];
}
const NonFeatured: React.FC<Props> = ({ items }) => {
  return (
    <>
      {items.map((item, index) => (
        <div key={index} className="card mb-2 bg-slate-700">
          <h3 className="text-white">{item.category}</h3>
          <p className="text-gray-300">{item.description}</p>
        </div>
      ))}
    </>
  );
};

export default NonFeatured;
