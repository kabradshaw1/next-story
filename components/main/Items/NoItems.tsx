import Link from "next/link";

export type Props = {
  route: string;
};

const NoItems: React.FC<Props> = (props) => {
  return (
    <div className="card">
      <h1>No {props.route} found.</h1>
      <Link href="/" className="button">
        Return to Home Page.
      </Link>
    </div>
  );
};

export default NoItems;
