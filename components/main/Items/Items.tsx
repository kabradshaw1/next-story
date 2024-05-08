import Image from "next/image";
import Link from "next/link";

export type Props = {
  title: string;
  text?: string | null;
  imageUrl?: string;
  route: string;
};
const Items: React.FC<Props> = (props) => {
  return (
    <Link href={`${props.title}`} key={props.title} className="card link">
      {props.imageUrl ? (
        <Image
          src={`${props.imageUrl}`}
          alt={`Image of ${props.title}`}
          width={200}
          height={200}
        />
      ) : (
        <p>No image available.</p>
      )}
      <h2>{props.title}</h2>
      <p>{props.text || "No text available"}</p>
    </Link>
  );
};

export default Items;
