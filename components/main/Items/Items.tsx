import Image from 'next/image';
import Link from 'next/link';

export type Props = {
  title: string;
  imageUrl?: string;
  route: string;
  id: number;
};

const Items: React.FC<Props> = (props) => {
  return (
    <Link
      href={`/${props.route}/${props.id}`}
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
