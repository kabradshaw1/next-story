import Link from 'next/link';

import { createSlug } from '@/lib/createSlug';

type LinksCardProps = {
  title: string;
  items: Array<{ title: string }>;
  routePrefix: string;
};

const LinksCard: React.FC<LinksCardProps> = ({ title, items }) => {
  return (
    <div className="card">
      <h3>{title}</h3>
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
