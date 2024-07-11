import Link from 'next/link';

import { createSlug } from '@/lib/createSlug';

type LinksCardProps = {
  __typename: string;
  title: string;
};

const LinksCard: React.FC<LinksCardProps> = ({ __typename, title }) => {
  return (
    <div className="card">
      <h3>{__typename}</h3>
      <div>
        {items.map((item) => (
          <Link
            className="mr-1"
            href={`/${createSlug(title)}/${createSlug(item.title)}`}
            key={item.title}
          >
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LinksCard;
