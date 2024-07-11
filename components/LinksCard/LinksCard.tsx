import Link from 'next/link';

import { createSlug } from '@/lib/createSlug';

type LinksCardProps = {
  items:
    | Array<{
        title: string;
      } | null>
    | null
    | undefined;
  type: string;
};

const LinksCard: React.FC<LinksCardProps> = ({ items, type }) => {
  if (items === null || items === undefined || items.length === 0) return null;
  return (
    <div className="card">
      <h3>{type}</h3>
      <div>
        {items.map(
          (item) =>
            item !== null && (
              <Link
                className="mr-1"
                href={`/${createSlug(type)}/${createSlug(item.title)}`}
                key={item.title}
              >
                {item.title}
              </Link>
            )
        )}
      </div>
    </div>
  );
};

export default LinksCard;
