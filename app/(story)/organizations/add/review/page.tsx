'use client';

import SingleOrg from '@/components/singlePage/SingleOrg/SingleOrg';
import type {
  OrganizationQuery,
  CreateOrganizationMutation,
} from '@/generated/graphql';
import { useAppSelector } from '@/lib/store/store';

// Define the mapping function
const mapRoleStateToOrganization = (
  organization: CreateOrganizationMutation['createOrganization'] | null,
  images: string[]
): OrganizationQuery['organization'] | null => {
  if (organization === null || organization === undefined) {
    return null;
  }
  if (organization.title === null || organization.user === null) return null;
  return {
    __typename: 'Organization',
    title: organization.title,
    text: organization.text ?? null,
    createdAt: organization.createdAt ?? null,
    user: organization.user,
    downloadURLs: images.map((url) => url || null),
    conflicts: organization.conflicts ?? null,
    headquarters: organization.headquarters ?? null,
    locations: organization.locations ?? null,
    roles: organization.roles ?? null,
  };
};

export default function OrgCreatedReview(): JSX.Element {
  const { organization, images } = useAppSelector((state) => state.org);
  const mappedOrganization = mapRoleStateToOrganization(organization, images);

  return <SingleOrg organization={mappedOrganization} />;
}
