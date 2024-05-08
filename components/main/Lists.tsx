import React from "react";

import Items from "./Items/Items";
import NoItems from "./Items/NoItems";

export type Props = {
  props: {
    title: string;
    text: string | undefined | null;
    imageUrl: string | undefined;
  }[];
  route: string;
};

const Lists: React.FC<Props> = ({ props, route }) => {
  return (
    <>
      {props.length > 0 ? (
        props.map((prop) => (
          <Items
            key={prop.title}
            title={prop.title}
            text={prop.text}
            imageUrl={prop.imageUrl}
          />
        ))
      ) : (
        <NoItems route={route} />
      )}
    </>
  );
};

export default Lists;
