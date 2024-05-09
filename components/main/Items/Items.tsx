import Image from "next/image";
import Link from "next/link";

export type Props = {
  title: string;
  imageUrl?: string;
  route: string;
};

const createSlug = (title: string) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[\s+]/g, "-") // Replace spaces with hyphens
    .replace(/[^\w\-]+/g, ""); // Remove all non-word characters except for hyphens
};

const Items: React.FC<Props> = (props) => {
  const slug = createSlug(props.title);

  return (
    <Link
      href={`/${props.route}/${slug}`}
      key={props.title}
      className="card link"
    >
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
    </Link>
  );
};

export default Items;
