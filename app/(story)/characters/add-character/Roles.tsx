'use client';
import type { Dispatch, SetStateAction } from 'react';

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

  const handleRoleChange = (roleId: number): void => {
    setSelectedRoles((prevSelectedRoles) => {
      if (prevSelectedRoles.includes(roleId)) {
        return prevSelectedRoles.filter((id) => id !== roleId);
      } else {
        return [...prevSelectedRoles, roleId];
      }
    });
  };

  return (
    <>
      {roles?.map((role) => (
        <div key={role?.id} className="mb-2">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="form-checkbox"
              value={role?.id ?? undefined}
              checked={
                role?.id !== undefined &&
                role?.id !== null &&
                selectedRoles.includes(role.id)
              }
              onChange={() => {
                if (role?.id !== undefined && role?.id !== null) {
                  handleRoleChange(role.id);
                }
              }}
            />
            <span className="ml-2">
              {role?.title} of {role?.organization}
            </span>
          </label>
        </div>
      ))}
    </>
  );
}
