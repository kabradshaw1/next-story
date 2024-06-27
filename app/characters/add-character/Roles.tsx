'use client';
import type { Dispatch, SetStateAction } from 'react';

import { useQuery } from '@tanstack/react-query';

import getRoles from '@/requests/queryRoles';

type RolesProps = {
  selectedRoles: number[];
  setSelectedRoles: Dispatch<SetStateAction<number[]>>;
};

export default function Roles({
  selectedRoles,
  setSelectedRoles,
}: RolesProps): JSX.Element {
  const { data, isLoading, isError, error } = useQuery({
    queryFn: async () => await getRoles(),
    queryKey: ['roles'],
  });
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error?.message}</p>;

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
      {data !== null &&
        data?.map((role) => (
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
