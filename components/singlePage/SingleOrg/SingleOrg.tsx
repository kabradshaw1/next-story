import { Suspense } from 'react';

import ImageList from '@/components/ImageList/ImageList';
import LinksCard from '@/components/LinksCard/LinksCard';
import TreeSvg from '@/components/TreeSVG/TreeSVG';
import { type OrganizationQuery } from '@/generated/graphql';
import { transformRoles } from '@/lib/orgHelper';

export default function SingleOrg(props: OrganizationQuery): JSX.Element {
  const organization = props.organization;

  return (
    <div className="card">
      <ImageList alt="Organization" downloadURLs={organization?.downloadURLs} />
      <h2>{organization?.title}</h2>
      <p>{organization?.text}</p>
      <p>Created at: {organization?.createdAt}</p>
      <p>Created by: {organization?.user}</p>
      <LinksCard type="Scenes" items={organization?.scenes} />
      <LinksCard type="Locations" items={organization?.locations} />
      <LinksCard type="Conflicts" items={organization?.conflicts} />
      <Suspense fallback={<div>Loading...</div>}>
        <div className="">
          <TreeSvg roles={transformRoles(organization?.roles)} />
        </div>
      </Suspense>
    </div>
  );
}
