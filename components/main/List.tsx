import React from 'react';

import Items from './Items/Items';
import NoItems from './Items/NoItems';

export type Props = {
  props: Array<{
    title: string;
    imageUrl: string | undefined;
    id: number;
  }>;
  route: string;
};

const List: React.FC<Props> = ({ props, route }) => {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {props.length > 0 ? (
        props.map((prop) => (
          <Items
            key={prop.title}
            title={prop.title}
            imageUrl={prop.imageUrl}
            route={route}
            id={prop.id}
          />
        ))
      ) : (
        <NoItems route={route} />
      )}
    </div>
  );
};

export default List;
