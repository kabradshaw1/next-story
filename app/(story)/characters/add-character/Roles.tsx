'use client';
import type { Dispatch, SetStateAction } from 'react';

import CheckBoxList from '@/components/CheckBoxList/CheckBoxList';
import { useOrganizationsQuery } from '@/generated/graphql';

type RolesProps = {
  selectedRoles: number[];
  setSelectedRoles: Dispatch<SetStateAction<number[]>>;
};

type ProcessedRoles = Array<{
  id: number;
  title: string;
  organization: string;
}>;

export default function Roles({
  selectedRoles,
  setSelectedRoles,
}: RolesProps): JSX.Element {
  const { data, loading, error } = useOrganizationsQuery();

  const organizations = data?.organizations;

  if (loading) return <p>Loading...</p>;
  if (error !== null && error !== undefined) {
    return <p>Error: {error?.message}</p>;
  }

  const roles: ProcessedRoles =
    organizations?.reduce((acc, org) => {
      const processedRoles =
        org?.roles?.map((role) => ({
          id: role?.id ?? 0,
          title: role?.title ?? '',
          organization: org?.title ?? '',
        })) ?? [];
      return acc.concat(processedRoles);
    }, [] as ProcessedRoles) ?? [];

  return (
    <CheckBoxList
      data={roles}
      selected={selectedRoles}
      setSelected={setSelectedRoles}
      idPrefix="role"
    />
  );
}
