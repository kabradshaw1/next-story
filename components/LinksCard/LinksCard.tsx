import Link from 'next/link';

import { createSlug } from '@/lib/createSlug';

type LinksCardProps = {
  title: string;
  items: Array<{ title: string }>;
};

const LinksCard: React.FC<LinksCardProps> = ({ title, items }) => {
  return (
    <div className="card">
      <h3>{title}</h3>
      <Link className="btn" href={`/${createSlug(title)}/add`}>
        Add new
      </Link>
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
