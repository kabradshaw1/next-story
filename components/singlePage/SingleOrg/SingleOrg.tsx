import ImageList from '@/components/ImageList/ImageList';
import LinksCard from '@/components/LinksCard/LinksCard';
import TreeSvg from '@/components/TreeSVG/TreeSVG';

type Props = {
  scenes: Array<{ title: string }>;
  locations: Array<{ title: string }>;
  conflicts: Array<{ title: string }>;
  roles: Array<{ roleTitle: string; superiorTitle: string; text: string }>;
  images: Array<{ imageUrl: string; alt: string }>;
  title: string;
  text: string;
  createdAt: string;
  user: string;
};

export default function SingleOrg({
  scenes,
  locations,
  conflicts,
  roles,
  images,
  title,
  text,
  createdAt,
  user,
}: Props): JSX.Element {
  return (
    <div className="card">
      <ImageList images={images} />
      <h2>{title}</h2>
      <p>{text}</p>
      <p>Created at: {createdAt}</p>
      <p>Created by: {user}</p>
      <LinksCard title="Scenes" items={scenes} />
      <LinksCard title="Locations" items={locations} />
      <LinksCard title="Conflicts" items={conflicts} />
      <TreeSvg roles={roles} />
    </div>
  );
}
