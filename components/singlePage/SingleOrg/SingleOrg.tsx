import { Suspense } from 'react';

import { type RoleInput } from '@/app/(story)/organizations/create/RoleForm';
import ButtonAndPopup from '@/components/ButtonAndPopup/ButtonAndPopup';
import ImageList from '@/components/ImageList/ImageList';
import LinksCard from '@/components/LinksCard/LinksCard';
import { type OrganizationQuery } from '@/generated/graphql';

export default function SingleOrg(props: OrganizationQuery): JSX.Element {
  const organization = props.organization;
  let roles: RoleInput[] = [];

  if (organization?.roles !== null && organization?.roles !== undefined) {
    roles = organization.roles.map((role): RoleInput => {
      return {
        roleTitle: role?.title ?? '',
        superiorTitle: role?.superior?.title ?? undefined,
        text: role?.text ?? undefined,
      };
    });
  }

  return (
    <div className="card">
      <ImageList
        alt="Organization"
        downloadURLs={organization?.downloadURLs ?? []}
      />
      <h2>{organization?.title}</h2>
      <p>{organization?.text}</p>
      <p>Created at: {organization?.createdAt}</p>
      <p>Created by: {organization?.user}</p>
      <LinksCard type="Scenes" items={organization?.scenes ?? []} />
      <LinksCard type="Locations" items={organization?.locations ?? []} />
      <LinksCard type="Conflicts" items={organization?.conflicts ?? []} />
      <Suspense fallback={<div>Loading...</div>}>
        <ButtonAndPopup roles={roles} />
      </Suspense>
    </div>
  );
}
