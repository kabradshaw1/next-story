import ImageList from '@/components/ImageList/ImageList';
import LinksCard from '@/components/LinksCard/LinksCard';
import TreeSvg from '@/components/TreeSVG/TreeSVG';
import { type OrganizationQuery } from '@/generated/graphql';
export default function SingleOrg(props: OrganizationQuery): JSX.Element {
  const organization = props.organization;
  return (
    <div className="card">
      <ImageList images={images} />
      <h2>{organization?.title}</h2>
      <p>{organization?.text}</p>
      <p>Created at: {organization?.createdAt}</p>
      <p>Created by: {organization?.user}</p>
      <LinksCard type="Scenes" items={organization?.scenes} />
      <LinksCard type="Locations" items={organization?.locations} />
      <LinksCard type="Conflicts" items={organization?.conflicts} />
      <TreeSvg roles={organization?.roles} />
    </div>
  );
}
