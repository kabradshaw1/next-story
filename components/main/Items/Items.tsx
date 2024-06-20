import Image from 'next/image';
import Link from 'next/link';

import { createSlug } from '@/lib/createSlug';
export type Props = {
  title: string;
  imageUrl?: string;
  route: string;
};

const Items: React.FC<Props> = (props) => {
  const slug = createSlug(props.title);

  return (
    <Link
      href={`/${props.route}/${slug}`}
      key={props.title}
      className="card link"
    >
      {props.imageUrl !== undefined ? (
        <Image
          src={`${props.imageUrl}`}
          alt={`Image of ${props.title}`}
          width={200}
          height={200}
        />
      ) : (
        <p>No image available.</p>
      )}
      <h2 className="mt-4">{props.title}</h2>
    </Link>
  );
};

export default Items;
